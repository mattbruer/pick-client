import { tempo } from '$lib/stores/audioStore'
import { get } from 'svelte/store'
import { parts, guitarPart, mandoPart } from '$lib/stores/songStore'
import { getAudioContext } from '../audioContext'

let ctx = getAudioContext()

export const PPQ = 192

export const DURATIONS_IN_TICKS = {
	wholeNote: 4 * PPQ,
	halfNote: 2 * PPQ,
	quarterNote: PPQ,
	eighthNote: PPQ / 2,
	sixteenthNote: PPQ / 4
}

export function sequenceWithTicks(seq) {
	let tick = 0
	return seq.map((event) => {
		const tickDuration = DURATIONS_IN_TICKS[event.duration]
		const enriched = { ...event, tick }
		tick += tickDuration
		return enriched
	})
}

export function tickToSeconds(tick, tempo) {
	return (tick / PPQ) * (60 / tempo)
}

const audioBuffers = new Map()

async function loadSample(url) {
	if (audioBuffers.has(url)) return audioBuffers.get(url)

	const res = await fetch(url)
	const arrayBuffer = await res.arrayBuffer()
	const audioBuffer = await ctx.decodeAudioData(arrayBuffer)

	audioBuffers.set(url, audioBuffer)
	return audioBuffer
}

let notesRinging = {}
export async function scheduleSample(
	url,
	startTime,
	gainValue = 1,
	string,
	fret,
	partName,
	volume = 1,
	balance = 0
) {
	const buffer = await loadSample(url)

	if (!notesRinging[partName]) {
		notesRinging[partName] = {}
	}

	//silencer
	const currentNote = notesRinging[partName][string]
	if (currentNote) {
		const { gainNode, source } = currentNote
		const now = ctx.currentTime

		gainNode.gain.setValueAtTime(gainNode.gain.value, now)
		gainNode.gain.linearRampToValueAtTime(0, now + 0.01)
		source.stop(now + 0.01)
	}

	const source = ctx.createBufferSource()
	source.buffer = buffer

	const gainNode = ctx.createGain()
	gainNode.gain.value = gainValue * volume

	// source.connect(gainNode)
	// gainNode.connect(ctx.destination)
	const panner = ctx.createStereoPanner()
	panner.pan.value = (balance - 50) / 50 // Adjust as needed

	source.connect(panner)
	panner.connect(gainNode)
	gainNode.connect(ctx.destination)

	source.start(startTime)
	notesRinging[partName][string] = { source, gainNode }
	return source
}

//todo vvvv factor out - not needed
export function getParts() {
	let rawParts = get(parts)

	const guitarStrum = get(guitarPart)
	const mandoChop = get(mandoPart)

	let combinedParts = Object.values(rawParts).concat(guitarStrum, mandoChop)
	return combinedParts

	// let enrichedParts = []
	// for (const part in rawParts) {
	// 	enrichedParts.push({
	// 		instrument: rawParts[part].instrument,
	// 		sequence: rawParts[part].sequence,
	// 		done: false,
	// 		position: 0,
	// 		name: part
	// 	})
	// }
	// return enrichedParts
}

export const ENHARMONIC_PITCH_MAP = {
	C: 0,
	'B#': 0,
	Dbb: 0,

	'C#': 1,
	Db: 1,
	'B##': 1,

	D: 2,
	'C##': 2,
	Ebb: 2,

	'D#': 3,
	Eb: 3,
	Fbb: 3,
	'C###': 3,

	E: 4,
	'D##': 4,
	Fb: 4,

	'E#': 5,
	F: 5,
	Gbb: 5,

	'F#': 6,
	Gb: 6,
	'E##': 6,

	G: 7,
	'F##': 7,
	Abb: 7,

	'G#': 8,
	Ab: 8,
	'F###': 8,

	A: 9,
	'G##': 9,
	Bbb: 9,

	'A#': 10,
	Bb: 10,
	Cbb: 10,

	B: 11,
	'A##': 11,
	Cb: 11
}
