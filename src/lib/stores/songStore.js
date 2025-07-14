import { writable, derived, get } from 'svelte/store'
import { TUNINGS } from '$lib/constants'
import { chromaticFlat, chromaticSharp } from '$lib/components/ControlBar/chords/trasposeScale'
import { lookup } from '$lib/init'
import { createSongStore } from './helpers'
import { ENHARMONIC_PITCH_MAP, sequenceWithTicks } from '$lib/audio/audioFunctions/utility'

export const title = writable('')
export const key = writable({})
export const timeSignature = writable('')

export const selectedMeasure = writable(null)

// export const parts = writable({
// 	part1: {
// 		instrument: 'guitar',
// 		sequence: [{ notes: { e: 3 }, duration: 'eighthNote', key: crypto.randomUUID() }]
// 	},
// 	part2: {
// 		instrument: 'guitar',
// 		sequence: [
// 			{ notes: { ee: 10 }, duration: 'eighthNote', key: crypto.randomUUID() },
// 			{ notes: { ee: 8 }, duration: 'eighthNote', key: crypto.randomUUID() },
// 			{ notes: { ee: 7 }, duration: 'eighthNote', key: crypto.randomUUID() },
// 			{ notes: { ee: 8 }, duration: 'eighthNote', key: crypto.randomUUID() },
// 			{ notes: { ee: 10 }, duration: 'eighthNote', key: crypto.randomUUID() },
// 			{ notes: { ee: 8 }, duration: 'eighthNote', key: crypto.randomUUID() },
// 			{ notes: { ee: 7 }, duration: 'eighthNote', key: crypto.randomUUID() },
// 			{ notes: { ee: 8 }, duration: 'eighthNote', key: crypto.randomUUID() }
// 		]
// 	}
// })

export const parts = writable({})

export const initializeSong = (initTitle, initKey, initTimeSignature) => {
	title.set(initTitle)
	key.set(initKey)
	timeSignature.set(initTimeSignature)

	const tempSong = get(song)
	const measureId = Object.keys(tempSong.measures)[0]
	const firstChord = lookup[initKey.mode].find((cs) => cs.key == initKey.tonic && cs.roman == 'I')
	tempSong.measures[measureId].chords = [firstChord, '']
	song.set(tempSong)
}

export const song = createSongStore()

export const measureCount = derived(song, ($song) => {
	if (!$song?.sections) return {}
	const result = {}
	for (const sectionId in $song.sections) {
		result[sectionId] = $song.sections[sectionId].measureOrder.length
	}
	return result
})

export const chordProgression = derived(song, ($song) => {
	let sections = $song.sectionOrder.map((id) => $song.sections[id])
	let progression = []
	sections.forEach((section) => {
		const measures = section.measureOrder.map((id) => $song.measures[id].chords)
		for (let i = 0; i < section.repeat; i++) {
			progression = [...progression, ...measures]
		}
	})
	let unpacked = []
	progression.forEach((meas) => {
		meas.forEach((ch) => {
			unpacked.push(ch)
		})
	})

	unpacked.forEach((ch, i) => {
		if (ch == '') {
			unpacked[i] = unpacked[i - 1]
		}
	})
	return unpacked
})

export const guitarPart = derived(chordProgression, ($chordProgression) => {
	let sequence = []
	let lastBass
	$chordProgression.forEach((cs, i) => {
		const nextChord = $chordProgression[i + 1] ?? $chordProgression[0]
		const voicing = createGuitarVoicing(cs)
		if (i == 0) {
			const [lowestRoot, root] = findLowestRoot(cs.scale[0])
			lastBass = root
			sequence.push(
				{
					notes: lowestRoot,
					volume: 1,
					duration: 'quarterNote',
					key: crypto.randomUUID()
				},
				{
					notes: voicing,
					volume: 0.6,
					duration: 'eighthNote',
					key: crypto.randomUUID()
				},
				{
					notes: { B: voicing['B'] },
					volume: 0.3,
					duration: 'eighthNote',
					key: crypto.randomUUID()
				}
				// {
				// 	notes: { B: voicing['B'] },

				// 	duration: 'eighthNote',
				// 	key: crypto.randomUUID()
				// }
			)
		} else {
			const [lowestRoot, root] = findLowestRoot(cs.scale[0])
			if (lastBass != root) {
				lastBass = root
				sequence.push(
					{
						notes: lowestRoot,
						duration: 'quarterNote',
						key: crypto.randomUUID()
					},
					{
						notes: voicing,
						volume: 0.5,
						duration: 'eighthNote',
						key: crypto.randomUUID()
					},
					{
						notes: { B: voicing['B'] },
						volume: 0.3,
						duration: 'eighthNote',
						key: crypto.randomUUID()
					}
				)
			} else {
				const [lowestFifth, fifth] = findLowestFifth(cs)
				const [lowestThird, third] = findLowestThird(cs)

				const note = fifth == nextChord.scale[0] ? lowestThird : lowestFifth
				lastBass = fifth == nextChord.scale[0] ? third : fifth

				const nextBassIndex = getIndex(nextChord.scale[0])
				const thisBassIndex = getIndex(lastBass)

				let chromaticStep
				const arpeggio = (voicing) => {
					sequence.push(
						{
							notes: note,
							duration: 'eighthNote',
							key: crypto.randomUUID()
						},
						{
							notes: { G: voicing['G'] },
							duration: 'eighthNote',
							key: crypto.randomUUID(),
							volume: 0.2
						},
						{
							notes: { B: voicing['B'] },
							duration: 'eighthNote',
							key: crypto.randomUUID(),
							volume: 0.4
						},
						{
							notes: { G: voicing['G'] },
							duration: 'eighthNote',
							key: crypto.randomUUID(),
							volume: 0.2
						}
					)
				}

				if (nextBassIndex - thisBassIndex == -2) {
					chromaticStep = getLowestWhatever(
						chromaticSharp[thisBassIndex - 1] ?? chromaticFlat[thisBassIndex - 1]
					)[0]
				}
				if (nextBassIndex - thisBassIndex == 2) {
					chromaticStep = getLowestWhatever(
						chromaticSharp[thisBassIndex + 1] ?? chromaticFlat[thisBassIndex + 1]
					)[0]
				}

				if (!chromaticStep) {
					arpeggio(voicing)
				} else {
					sequence.push(
						{
							notes: note,
							duration: 'quarterNote',
							key: crypto.randomUUID()
						},
						{
							notes: chromaticStep ? chromaticStep : voicing,
							volume: 0.5,
							duration: 'quarterNote',
							key: crypto.randomUUID()
						}
					)
				}
			}
		}
	})
	return {
		name: 'guitarStrum',
		instrument: 'guitar',
		sequence: sequenceWithTicks(sequence),
		done: false,
		position: 0
	}
})

export const mandoPart = derived(chordProgression, ($chordProgression) => {
	const sequence = []

	$chordProgression.forEach((chordScale, i) => {
		const chop = createChopChord(chordScale)

		sequence.push(
			{ notes: {}, duration: 'quarterNote', volume: 1, key: crypto.randomUUID() },
			{
				notes: chop,
				volume: Object.keys(chop).length == 3 ? 1 : 0.8,
				duration: 'quarterNote',
				key: crypto.randomUUID()
			}
		)
	})

	return {
		instrument: 'mando',
		sequence: sequenceWithTicks(sequence),
		done: false,
		position: 0,
		name: 'mandoChop'
	}
})

const getCanonicalNoteName = (note) => {
	// if (chromaticSharp.includes(note) || chromaticFlat.includes(note)) {
	// 	return note
	// }
	return chromaticSharp[ENHARMONIC_PITCH_MAP[note]]
}

const getLowestWhatever = (note) => {
	const strings = TUNINGS.guitar

	const lowStrings = [strings[5], strings[4], strings[3]]

	let whatever
	let fret = 0
	while (!whatever) {
		lowStrings.forEach((string) => {
			let index = chromaticSharp.indexOf(string) + fret

			if (chromaticFlat[index] == getCanonicalNoteName(note)) {
				whatever = { [string]: fret }
			}
			if (chromaticSharp[index] == getCanonicalNoteName(note)) {
				whatever = { [string]: fret }
			}
		})
		fret++
	}

	return [whatever, note]
}

const findLowestRoot = (root) => {
	const strings = TUNINGS.guitar

	const lowStrings = [strings[5], strings[4], strings[3]]

	let lowestRoot

	let fret = 0
	while (!lowestRoot) {
		lowStrings.forEach((string) => {
			let index = chromaticSharp.indexOf(string) + fret

			if (chromaticFlat[index] == getCanonicalNoteName(root)) {
				lowestRoot = { [string]: fret }
			}
			if (chromaticSharp[index] == getCanonicalNoteName(root)) {
				lowestRoot = { [string]: fret }
			}
		})
		fret++
	}

	return [lowestRoot, root]
}

const findLowestFifth = (cs) => {
	let fifth
	cs.scalePattern.forEach((tone, i) => {
		if (tone.includes('5')) {
			fifth = cs.scale[i]
		}
	})

	const strings = TUNINGS.guitar

	const lowStrings = [strings[5], strings[4], strings[3]]

	let lowestFifth

	let fret = 0
	while (!lowestFifth) {
		lowStrings.forEach((string) => {
			let index = chromaticSharp.indexOf(string) + fret

			if (chromaticFlat[index] == getCanonicalNoteName(fifth)) {
				lowestFifth = { [string]: fret }
			}
			if (chromaticSharp[index] == getCanonicalNoteName(fifth)) {
				lowestFifth = { [string]: fret }
			}
		})
		fret++
	}

	return [lowestFifth, fifth]
}

const findLowestThird = (cs) => {
	let third
	cs.scalePattern.forEach((tone, i) => {
		if (!third && tone.includes('3')) {
			third = cs.scale[i]
		}
	})

	const strings = TUNINGS.guitar

	const lowStrings = [strings[5], strings[4], strings[3]]

	let lowestThird

	let fret = 0
	while (!lowestThird) {
		lowStrings.forEach((string) => {
			let index = chromaticSharp.indexOf(string) + fret

			if (chromaticFlat[index] == getCanonicalNoteName(third)) {
				lowestThird = { [string]: fret }
			}
			if (chromaticSharp[index] == getCanonicalNoteName(third)) {
				lowestThird = { [string]: fret }
			}
		})
		fret++
	}

	return [lowestThird, third]
}

const createGuitarVoicing = (chordScale) => {
	let notes = {}

	const strings = TUNINGS.guitar
	const chordTones = chordScale.scale.filter((note, i) => {
		return !['T', 's'].some((prefix) => chordScale.scalePattern[i].startsWith(prefix))
	})

	const adjustedChordTones = chordTones.map((ct) => getCanonicalNoteName(ct))

	// const tensions = chordScale.scale.filter((note, i) => {
	// 	return ['T'].some((prefix) => chordScale.scalePattern[i].startsWith(prefix))
	// })
	const highStrings = [strings[2], strings[1], strings[0]]

	highStrings.forEach((string) => {
		let fret = 0
		let match

		while (!match) {
			const index = chromaticSharp.indexOf(string.toUpperCase()) + fret
			if (
				adjustedChordTones.includes(chromaticFlat[index]) ||
				adjustedChordTones.includes(chromaticSharp[index])
			) {
				notes[string] = fret
				match = true
			}
			fret++
		}
	})
	return notes
}

const getIndex = (note) => {
	let sharpIndex = chromaticSharp.indexOf(getCanonicalNoteName(note))
	let flatIndex = chromaticFlat.indexOf(getCanonicalNoteName(note))
	return Math.max(sharpIndex, flatIndex)
}

const createChopChord = (chordScale) => {
	const strings = ['A', 'D', 'G']
	let third
	let seventh
	let fifth

	// let tensions = chordScale.scale.filter((note, i) => {
	// 	return ['T'].some((prefix) => chordScale.scalePattern[i].startsWith(prefix))
	// })

	let isSeventhChord = chordScale.suffix.includes('7')

	chordScale.scalePattern.forEach((tone, i) => {
		if (!third && tone.includes('3')) {
			third = getCanonicalNoteName(chordScale.scale[i])
		}
	})

	chordScale.scalePattern.forEach((tone, i) => {
		if (!fifth && tone.includes('5')) {
			fifth = getCanonicalNoteName(chordScale.scale[i])
		}
	})

	chordScale.scalePattern.forEach((tone, i) => {
		if (!seventh && tone.includes('7')) {
			seventh = getCanonicalNoteName(chordScale.scale[i])
		}
	})
	let possibleTones = isSeventhChord ? [third, fifth, seventh] : [third, fifth, chordScale.scale[0]]

	let voicing = { G: null, D: null, A: null }

	const usedTones = []

	strings.forEach((str) => {
		let fret = 1
		let match

		while (!match) {
			const index = chromaticSharp.indexOf(str) + fret
			const tone = chromaticSharp[index]

			if (possibleTones.includes(tone) && !usedTones.includes(tone)) {
				voicing[str] = fret

				match = true

				usedTones.push(tone)
			}

			fret++
		}
	})
	return voicing
}
