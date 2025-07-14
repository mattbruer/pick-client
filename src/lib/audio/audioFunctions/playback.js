import { getAudioContext } from '../audioContext'
import { get } from 'svelte/store'
import { horizontalSpacing } from '$lib/components/TAB/tabStore'
import { DURATIONS_IN_TICKS, scheduleSample, getParts } from '$lib/audio/audioFunctions/utility'
import { PPQ } from '$lib/constants'
import { mix } from '$lib/stores/audioStore'
import { playingBeat } from '$lib/stores/audioStore'

let ctx = getAudioContext()
let parts = []
let scrollableEls = {}
let tempoMap = []
let isRunning = false
let scrollPosition = 0
let lastFrameTime = null

export function setScrollable(el) {
	const key = Object.keys(el)[0]
	const value = Object.values(el)[0]
	scrollableEls[key] = value
}

export function updateTempo(newTempo) {
	tempoMap.push({
		time: ctx.currentTime,
		tempo: newTempo
	})
}

function getTempoAt(time) {
	for (let i = tempoMap.length - 1; i >= 0; i--) {
		if (tempoMap[i].time <= time) return tempoMap[i].tempo
	}
	return tempoMap[0]?.tempo ?? 120
}

function tickToTime(tick, map = tempoMap) {
	let lastTime = map[0]?.time ?? 0
	let lastTick = 0

	for (let i = 1; i < map.length; i++) {
		const segmentTicks = (map[i].time - lastTime) * (map[i - 1].tempo / 60) * PPQ
		if (tick < lastTick + segmentTicks) {
			const dtick = tick - lastTick
			const time = lastTime + dtick / ((map[i - 1].tempo / 60) * PPQ)
			return time
		}
		lastTick += segmentTicks
		lastTime = map[i].time
	}
	// After last tempo change
	const lastTempo = map[map.length - 1].tempo
	const remainingTicks = tick - lastTick
	return lastTime + remainingTicks / ((lastTempo / 60) * PPQ)
}

function getCurrentTick(ctxTime, map = tempoMap) {
	let tick = 0
	for (let i = 1; i < map.length; i++) {
		if (ctxTime < map[i].time) {
			const dt = ctxTime - map[i - 1].time
			return tick + dt * (map[i - 1].tempo / 60) * PPQ
		}
		const dt = map[i].time - map[i - 1].time
		tick += dt * (map[i - 1].tempo / 60) * PPQ
	}
	const last = map[map.length - 1]
	return tick + (ctxTime - last.time) * (last.tempo / 60) * PPQ
}

export function play(startTime) {
	if (ctx.state === 'suspended') ctx.resume()
	isRunning = true
	lastFrameTime = null
	scrollPosition = 0
	tempoMap = [{ time: startTime ?? ctx.currentTime, tempo: getTempoAt(ctx.currentTime) }]
	parts = getParts()
	const nowTick = getCurrentTick(startTime ?? ctx.currentTime)

	for (const part of parts) {
		part.position = 0
		part.currentLoopStartTick = nowTick
		part.nextStepTick = nowTick
	}

	scheduleLoop(startTime)
	drawLoop()
}

export function stop() {
	isRunning = false
	parts = []
	scrollPosition = 0
	lastFrameTime = null
}

// a loop that schedules, not meaning to schedule the loop. two diff loops.
function scheduleLoop(startTime) {
	if (!isRunning) return

	const now = startTime ?? ctx.currentTime
	const aheadTick = getCurrentTick(now + 0.1)

	for (const part of parts) {
		if (!part.totalTicks) {
			part.totalTicks = part.sequence.reduce((sum, ev) => sum + DURATIONS_IN_TICKS[ev.duration], 0)
		}

		// This makes it loop
		if (part.position >= part.sequence.length) {
			// Wait for final note to finish before starting next loop
			const loopEndTime = tickToTime(part.currentLoopStartTick + part.totalTicks)
			if (now >= loopEndTime) {
				part.position = 0
				part.currentLoopStartTick += part.totalTicks
				part.nextStepTick = part.currentLoopStartTick
			}
			continue
		}

		while (part.nextStepTick < aheadTick) {
			const event = part.sequence[part.position]
			const scheduledTime = tickToTime(part.nextStepTick)
			const currentTempo = getTempoAt(scheduledTime)
			const strumDelay = part.instrument == 'guitar' ? 60 / currentTempo / 20 : 0

			const notesArray = Object.entries(event.notes)
			const mixer = get(mix)
			const groupGain = ((mixer.master.volume / 100) * mixer[part.instrument].volume) / 100

			const balance = mixer[part.instrument]['balance']
			for (const [i, [string, fret]] of notesArray.entries()) {
				const url = `/${part.instrument}/${string == 'e' ? 'ee' : string}${fret}.mp3`
				scheduleSample(
					url,
					scheduledTime + i * strumDelay,
					groupGain,
					string,
					fret,
					part.name,
					event.volume,
					balance
				)
			}

			if (part.instrument == 'mando') {
				playingBeat.set(part.position)
			}
			const durationTicks = DURATIONS_IN_TICKS[event.duration] ?? 192
			part.nextStepTick += durationTicks
			part.position++
		}
	}

	setTimeout(scheduleLoop, 0)
}

function drawLoop(time) {
	if (!isRunning) return
	if (!lastFrameTime) {
		lastFrameTime = time
		requestAnimationFrame(drawLoop)
		return
	}

	const nowTick = getCurrentTick(ctx.currentTime)

	// Get loop length to modulo scroll
	const loopTicks = parts[0]?.totalTicks ?? 0
	const tickInLoop = loopTicks ? nowTick % loopTicks : nowTick

	const pixelsPerTick = get(horizontalSpacing) / (PPQ / 4)
	scrollPosition = tickInLoop * pixelsPerTick

	Object.values(scrollableEls).forEach((el) => {
		el.scrollLeft = scrollPosition
	})

	lastFrameTime = time
	requestAnimationFrame(drawLoop)
}
