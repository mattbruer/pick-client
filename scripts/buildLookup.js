import fs from 'fs'
import path from 'path'

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

const orderOfSharps = [
	'F',
	'C',
	'G',
	'D',
	'A',
	'E',
	'B',
	'F#',
	'C#',
	'G#',
	'D#',
	'A#',
	'E#',
	'B#',
	'F##',
	'C##',
	'G##',
	'D##',
	'A##',
	'E##',
	'B##'
]
const orderOfFlats = [
	'B',
	'E',
	'A',
	'D',
	'G',
	'C',
	'F',
	'Bb',
	'Eb',
	'Ab',
	'Db',
	'Gb',
	'Cb',
	'Fb',
	'Bbb',
	'Ebb',
	'Abb',
	'Dbb',
	'Gbb',
	'Cbb',
	'Fbb'
]
const circleOfFifths = [
	'C',
	'G',
	'D',
	'A',
	'E',
	'B',
	'F#',
	'C#',
	'G#',
	'D#',
	'A#',
	'E#',
	'B#',
	'F##',
	'C##',
	'G##',
	'D##',
	'A##',
	'E##',
	'B##'
]

const circleOfFourths = [
	'C',
	'F',
	'Bb',
	'Eb',
	'Ab',
	'Db',
	'Gb',
	'Cb',
	'Fb',
	'Bbb',
	'Ebb',
	'Abb',
	'Dbb',
	'Gbb',
	'Cbb',
	'Fbb',
	'Bbbb',
	'Abbb',
	'Dbbb',
	'Gbbb',
	'Cbbb',
	'Fbbbb'
]

export const alphabet = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'A', 'B']
export const chromaticSharp = [
	'C',
	'C#',
	'D',
	'D#',
	'E',
	'F',
	'F#',
	'G',
	'G#',
	'A',
	'A#',
	'B',
	'C',
	'C#',
	'D',
	'D#',
	'E',
	'F',
	'F#',
	'G',
	'G#',
	'A',
	'A#',
	'B'
]

export const chromaticFlat = [
	'C',
	'Db',
	'D',
	'Eb',
	'E',
	'F',
	'Gb',
	'G',
	'Ab',
	'A',
	'Bb',
	'B',
	'C',
	'Db',
	'D',
	'Eb',
	'E',
	'F',
	'Gb',
	'G',
	'Ab',
	'A',
	'Bb',
	'B'
]

const getCorrectLetters = (chordScale, newKey) => {
	let diff = alphabet.indexOf(newKey[0]) - alphabet.indexOf('C')

	const result = chordScale.scale.map((n) => {
		return alphabet[alphabet.indexOf(n[0]) + diff] ?? alphabet[alphabet.indexOf(n[0]) + 7 + diff]
	})

	return result
}

const getTransposeInterval = (newKey) => {
	const CIndex = chromaticFlat.indexOf('C')

	//todo wrong
	const newKeyIndex = Math.max(chromaticFlat.indexOf(newKey), chromaticSharp.indexOf(newKey))

	return newKeyIndex - CIndex
}

export const transposeScale = (chordScale, newKey) => {
	let result

	const correctLetters = getCorrectLetters(chordScale, newKey)

	const interval = getTransposeInterval(newKey)

	result = chordScale.scale.map((note, i) => {
		let flatIndex =
			chromaticFlat.indexOf(note) == -1 ? null : chromaticFlat.indexOf(note) + interval
		let sharpIndex =
			chromaticSharp.indexOf(note) == -1 ? null : chromaticSharp.indexOf(note) + interval

		if (flatIndex == -1) {
			flatIndex = null
		}

		if (sharpIndex == -1) sharpIndex == null

		const sharpNote = chromaticSharp[sharpIndex] ?? ''
		const flatNote = chromaticFlat[flatIndex] ?? ''

		const enharmSharp = ENHARMONIC_PITCH_MAP[sharpNote]
		const enharmFlat = ENHARMONIC_PITCH_MAP[flatNote]

		if (sharpNote[0] == correctLetters[i]) {
			return sharpNote
		}

		if (flatNote[0] == correctLetters[i]) {
			return flatNote
		}

		let newNote
		Object.entries(ENHARMONIC_PITCH_MAP).forEach((note) => {
			const [n, val] = note
			if (val == enharmSharp) {
				if (n[0] == correctLetters[i]) {
					newNote = n
				}
			}
			if (val == enharmFlat) {
				if (n[0] == correctLetters[i]) {
					newNote = n
				}
			}
		})
		if (newNote) {
			return newNote
		}

		const newChoices = Object.entries(ENHARMONIC_PITCH_MAP)
			.filter((entry) => {
				const [k, v] = entry
				if (v == ENHARMONIC_PITCH_MAP[note]) {
					return true
				}
			})
			.map((en) => en[0])

		let newChoice
		newChoices.forEach((choice) => {
			const flatChoice = chromaticFlat[chromaticFlat.indexOf(choice) + interval] ?? ''
			const sharpChoice = chromaticSharp[chromaticSharp.indexOf(choice) + interval] ?? ''
			if (correctLetters[i] == flatChoice[0]) {
				newChoice = flatChoice
			}
			if (correctLetters[i] == sharpChoice[0]) {
				newChoice = sharpChoice
			}

			if (!newChoice) {
				newChoice = Object.entries(ENHARMONIC_PITCH_MAP)
					.filter((entry) => {
						const [k, v] = entry
						return v == ENHARMONIC_PITCH_MAP[flatChoice] || v == ENHARMONIC_PITCH_MAP[sharpChoice]
					})
					.map((entry) => entry[0])
					.find((n) => n[0] == correctLetters[i])
			}
		})

		if (newChoice) {
			return newChoice
		}

		return 'fix me'
	})

	return result
}

const scalesInC = {
	major: [
		{
			key: 'C',
			name: 'Ionian',
			roman: 'I',
			suffix: '',
			scalePattern: ['1', 'T9', '3', 's4', '5', 'T13', 's7'],
			scale: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
			category: 'Diatonic Major'
		},
		{
			key: 'C',
			name: 'Ionian',
			roman: 'I5',
			suffix: '5',
			scalePattern: ['1', 'T9', 's3', 's4', '5', 'T13', 's7'],
			scale: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
			category: 'Diatonic Major'
		},

		{
			key: 'C',
			name: 'Ionian',
			roman: 'I6',
			suffix: '6',
			scalePattern: ['1', 'T9', '3', 's4', '5', '6', 'T7'],
			scale: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
			category: 'Diatonic Major'
		},
		{
			key: 'C',
			name: 'Ionian',
			roman: 'Imaj7',
			suffix: 'maj7',
			scalePattern: ['1', 'T9', '3', 's4', '5', 'T13', '7'],
			scale: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
			category: 'Diatonic Major'
		},
		{
			key: 'C',
			name: 'Dorian',
			roman: 'II-7',
			suffix: '-7',
			scalePattern: ['1', 'T9', 'b3', 'T11', '5', 's6', 'b7'],
			scale: ['D', 'E', 'F', 'G', 'A', 'B', 'C'],

			category: 'Diatonic Major'
		},
		{
			key: 'C',
			name: 'Phrygian',
			roman: 'III-7',
			suffix: '-7',
			scalePattern: ['1', 'sb2', 'b3', 'T11', '5', 'sb6', 'b7'],
			scale: ['E', 'F', 'G', 'A', 'B', 'C', 'D'],
			category: 'Diatonic Major'
		},
		{
			key: 'C',
			name: 'Lydian',
			roman: 'IV',
			suffix: '',
			scalePattern: ['1', 'T9', '3', 'T#11', '5', 's13', 's7'],
			scale: ['F', 'G', 'A', 'B', 'C', 'D', 'E'],
			category: 'Diatonic Major'
		},
		{
			key: 'C',
			name: 'Lydian',
			roman: 'IVmaj7',
			suffix: 'maj7',
			scalePattern: ['1', 'T9', '3', 'T#11', '5', 'T13', '7'],
			scale: ['F', 'G', 'A', 'B', 'C', 'D', 'E'],
			category: 'Diatonic Major'
		},
		{
			key: 'C',
			name: 'Mixolydian',
			roman: 'V7',
			suffix: '',
			scalePattern: ['1', 'T9', '3', 's4', '5', 'T13', '7'],
			scale: ['G', 'A', 'B', 'C', 'D', 'E', 'F'],
			category: 'Diatonic Major'
		},
		{
			key: 'C',
			name: 'Aeolian',
			roman: 'VI-7',
			suffix: '-7',
			scalePattern: ['1', 'T9', 'b3', 'T11', '5', 'sb13', 'b7'],
			scale: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
			category: 'Diatonic Major'
		},
		{
			key: 'C',
			name: 'Locrian',
			roman: 'VII-7(b5)',
			suffix: '-7(b5)',
			scalePattern: ['1', 'sb2', 'b3', 'T11', 'b5', 'Tb13', 'b7'],
			scale: ['B', 'C', 'D', 'E', 'F', 'G', 'A'],
			category: 'Diatonic Major'
		},
		{
			key: 'C',
			name: 'Mixolydian b13',
			roman: 'V7/II',
			suffix: '7',
			scalePattern: ['1', 'T9', '3', 's4', '5', 'Tb13', 'b7'],
			scale: ['A', 'B', 'C#', 'D', 'E', 'F', 'G'],
			category: 'Secondary Dominants'
		},
		{
			key: 'C',
			name: 'Mixolydian b9, b13',
			roman: 'V7/III',
			suffix: '7',
			scalePattern: ['1', 'Tb9', 'T#9', '3', 's4', '5', 'Tb13', 'b7'],
			scale: ['B', 'C', 'D', 'D#', 'E', 'F#', 'G', 'A'],
			category: 'Secondary Dominants'
		},

		{
			key: 'C',
			name: 'Mixolydian',
			roman: 'V7/IV',
			suffix: '7',
			scalePattern: ['1', 'T9', '3', 's4', '5', 'T13', 'b7'],
			scale: ['C', 'D', 'E', 'F', 'G', 'A', 'Bb'],
			category: 'Secondary Dominants'
		},
		{
			key: 'C',
			name: 'Mixolydian',
			roman: 'V7/V',
			suffix: '7',
			scalePattern: ['1', 'T9', '3', 's4', '5', 'T13', 'b7'],
			scale: ['D', 'E', 'F#', 'G', 'A', 'B', 'C'],
			category: 'Secondary Dominants'
		},
		{
			key: 'C',
			name: 'Mixolydian b9, b13',
			roman: 'V7/V',
			suffix: '7',
			scalePattern: ['1', 'Tb9', 'T#9', '3', 's4', '5', 'Tb13', 'b7'],
			scale: ['E', 'F', 'G', 'G#', 'A', 'B', 'C', 'D'],
			category: 'Secondary Dominants'
		},
		{
			key: 'C',
			name: 'Mixolydian',
			roman: 'V7',
			suffix: '7',
			scalePattern: ['1', 'T9', '3', 's4', '5', 'T13', 'b7'],
			scale: ['G', 'A', 'B', 'C', 'D', 'E', 'F'],
			category: 'Primary Dominants'
		},
		{
			key: 'C',
			name: 'Mixolydian',
			roman: 'V7(sus4)',
			suffix: '7sus4',
			scalePattern: ['1', 'T9', 's3', '4', '5', 'T13', 'b7'],
			scale: ['G', 'A', 'B', 'C', 'D', 'E', 'F'],
			category: 'Primary Dominants'
		},
		{
			key: 'C',
			name: 'Mixolydian (b9, #9)',
			roman: 'V7(b9,♮13)',
			suffix: '7(b9,♮13)',
			scalePattern: ['1', 'Tb9', 'T#9', '3', 's4', '5', 'T13', 'b7'],
			scale: ['G', 'Ab', 'Bb', 'B', 'C', 'D', 'E', 'F'],
			category: 'Primary Dominants'
		},
		{
			key: 'C',
			name: 'Mixolydian (b13)',
			roman: 'V7(9,b13)',
			suffix: '7(9,b13)',
			scalePattern: ['1', 'T9', '3', 's4', '5', 'Tb13', 'b7'],
			scale: ['G', 'A', 'B', 'C', 'D', 'Eb', 'F'],
			category: 'Primary Dominants'
		},
		{
			key: 'C',
			name: 'Mixolydian (b9,b13)',
			roman: 'V7(b9,b13)',
			suffix: '7(b9,b13)',
			scalePattern: ['1', 'Tb9', 'T#9', '3', 's4', '5', 'Tb13', 'b7'],
			scale: ['G', 'Ab', 'Bb', 'B', 'C', 'D', 'Eb', 'F'],
			category: 'Primary Dominants'
		},
		{
			key: 'C',
			name: 'Altered Dominant',
			roman: 'V7(alt)',
			suffix: '7(alt)',
			scalePattern: ['1', 'Tb9', 'T#9', '3', 'b5', 'Tb13', 'b7'],
			scale: ['G', 'Ab', 'Bb', 'B', 'Db', 'Eb', 'F'],
			category: 'Primary Dominants'
		},
		{
			key: 'C',
			name: 'Lydian b7',
			roman: 'V7(#11)',
			suffix: '7(#11)',
			scalePattern: ['1', 'T9', '3', 'T#11', '5', 'T13', 'b7'],
			scale: ['G', 'A', 'B', 'C#', 'D', 'E', 'F'],
			category: 'Primary Dominants'
		},
		{
			key: 'C',
			name: 'Whole Tone',
			roman: 'V+7',
			suffix: '+7',
			scalePattern: ['1', 'T9', '3', 'T#11', '5', 'T13', 'b7'],
			scale: ['G', 'A', 'B', 'C#', 'D#', 'F'],
			category: 'Primary Dominants'
		},
		{
			key: 'C',
			name: 'Dorian',
			roman: 'I-7',
			suffix: '-7',
			scalePattern: ['1', 'T9', 'b3', 'T11', '5', 's6', 'b7'],
			scale: ['C', 'D', 'Eb', 'F', 'G', 'A', 'Bb'],
			category: 'Modal Interchange'
		},
		{
			key: 'C',
			name: 'Lydian',
			roman: 'bIImaj7',
			suffix: 'maj7',
			scalePattern: ['1', 'T9', '3', 'T#11', '5', 'T13', '7'],
			scale: ['Db', 'Eb', 'F', 'G', 'Ab', 'Bb', 'C'],
			category: 'Modal Interchange'
		},
		{
			key: 'C',
			name: 'Lydian',
			roman: 'bIIImaj7',
			suffix: 'maj7',
			scalePattern: ['1', 'T9', '3', 'T#11', '5', 'T13', '7'],
			scale: ['Eb', 'F', 'G', 'A', 'Bb', 'C', 'D'],
			category: 'Modal Interchange'
		},
		{
			key: 'C',
			name: 'Lydian Augmented',
			roman: 'bIII+maj7',
			suffix: '+maj7',
			scalePattern: ['1', 'T9', '3', 'T#11', '#5', 's6', '7'],
			scale: ['Eb', 'F', 'G', 'A', 'B', 'C', 'D'],
			category: 'Modal Interchange'
		},
		{
			key: 'C',
			name: 'Ionian',
			roman: 'IVmaj7',
			suffix: '+maj7',
			scalePattern: ['1', 'T9', '3', 's4', '5', 'T13', '7'],
			scale: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
			category: 'Modal Interchange'
		},
		{
			key: 'C',
			name: 'Melodic minor',
			roman: 'IV-6',
			suffix: '-6',
			scalePattern: ['1', 'T9', 'b3', 'T11', '5', '6', 'T7'],
			scale: ['F', 'G', 'Ab', 'Bb', 'C', 'D', 'E'],
			category: 'Modal Interchange'
		},
		{
			key: 'C',
			name: 'Dorian',
			roman: 'IV-7',
			suffix: '-7',
			scalePattern: ['1', 'T9', 'b3', 'T11', '5', 's6', 'b7'],
			scale: ['F', 'G', 'Ab', 'Bb', 'C', 'D', 'Eb'],
			category: 'Modal Interchange'
		},
		{
			key: 'C',
			name: 'Dorian',
			roman: 'V-7',
			suffix: '-7',
			scalePattern: ['1', 'T9', 'b3', 'T11', '5', 's6', 'b7'],
			scale: ['G', 'A', 'Bb', 'C', 'D', 'E', 'F'],
			category: 'Modal Interchange'
		},
		{
			key: 'C',
			name: 'Lydian',
			roman: 'bVImaj7',
			suffix: 'maj7',
			scalePattern: ['1', 'T9', '3', 'T#11', '5', 'T13', '7'],
			scale: ['Ab', 'Bb', 'C', 'D', 'Eb', 'F', 'G'],
			category: 'Modal Interchange'
		},
		{
			key: 'C',
			name: 'Locrian ♮9',
			roman: 'VI-7(b5)',
			suffix: '-7(b5)',
			scalePattern: ['1', 'T9', 'b3', 'T11', 'b5', 'Tb13', 'b7'],
			scale: ['A', 'B', 'C', 'D', 'Eb', 'F', 'G'],
			category: 'Modal Interchange'
		},
		{
			key: 'C',
			name: 'Lydian',
			roman: 'bVIImaj7',
			suffix: 'maj7',
			scalePattern: ['1', 'T9', '3', 'T#11', '5', 'T13', '7'],
			scale: ['Bb', 'C', 'D', 'E', 'F', 'G', 'A'],
			category: 'Modal Interchange'
		},
		{
			key: 'C',
			name: 'Lydian b7',
			roman: 'bVII7',
			suffix: '7',
			scalePattern: ['1', 'T9', '3', 'T#11', '5', 'T13', 'b7'],
			scale: ['Bb', 'C', 'D', 'E', 'F', 'G', 'Ab'],
			category: 'Modal Interchange'
		},
		{
			key: 'C',
			name: 'Lydian b7',
			roman: 'subV7/II',
			suffix: '7',
			scalePattern: ['1', 'T9', '3', 'T#11', '5', 'T13', 'b7'],
			scale: ['Eb', 'F', 'G', 'A', 'Bb', 'C', 'Db'],
			category: 'Substitute Dominant'
		},
		{
			key: 'C',
			name: 'Lydian b7',
			roman: 'subV7/III',
			suffix: '7',
			scalePattern: ['1', 'T9', '3', 'T#11', '5', 'T13', 'b7'],
			scale: ['F', 'G', 'A', 'B', 'C', 'D', 'Eb'],
			category: 'Substitute Dominant'
		},
		{
			key: 'C',
			name: 'Lydian b7',
			roman: 'subV7/IV',
			suffix: '7',
			scalePattern: ['1', 'T9', '3', 'T#11', '5', 'T13', 'b7'],
			scale: ['Gb', 'Ab', 'Bb', 'C', 'Db', 'Eb', 'Fb'],
			category: 'Substitute Dominant'
		},
		{
			key: 'C',
			name: 'Lydian b7',
			roman: 'subV7/V',
			suffix: '7',
			scalePattern: ['1', 'T9', '3', 'T#11', '5', 'T13', 'b7'],
			scale: ['Ab', 'Bb', 'C', 'D', 'Eb', 'F', 'Gb'],
			category: 'Substitute Dominant'
		},
		{
			key: 'C',
			name: 'Lydian b7',
			roman: 'subV7/VI',
			suffix: '7',
			scalePattern: ['1', 'T9', '3', 'T#11', '5', 'T13', 'b7'],
			scale: ['Bb', 'C', 'D', 'E', 'F', 'G', 'Ab'],
			category: 'Substitute Dominant'
		},
		{
			key: 'C',
			name: 'Mixolydian',
			roman: 'I7(9)',
			suffix: '7',
			scalePattern: ['1', 'T9', '3', 's4', '5', 'T13', 'b7'],
			scale: ['C', 'D', 'E', 'F', 'G', 'A', 'Bb'],
			category: 'Special Function Dominant'
		},
		{
			key: 'C',
			name: 'Blues Scale',
			roman: 'I7(#9)',
			suffix: '7(#9)',
			scalePattern: ['1', 'T#9', '3', 'Tb5', '5', 'T13', 'b7'],
			scale: ['C', 'Eb', 'E', 'Gb', 'G', 'A', 'Bb'],
			category: 'Special Function Dominant'
		},
		{
			key: 'C',
			name: 'Symmetric Diminished',
			roman: 'I7(#9,13)',
			suffix: '7(#9,13)',
			scalePattern: ['1', 'Tb9', 'T#9', '3', 'T#11', '5', 'T13', 'b7'],
			scale: ['C', 'Db', 'Eb', 'E', 'F#', 'G', 'A', 'Bb'],
			category: 'Special Function Dominant'
		},
		{
			key: 'C',
			name: 'Lydian b7',
			roman: 'II7',
			suffix: '7(#11)',
			scalePattern: ['1', 'T9', '3', 'T#11', '5', 'T13', 'b7'],
			scale: ['D', 'E', 'F#', 'G#', 'A', 'B', 'C'],
			category: 'Special Function Dominant'
		},
		{
			key: 'C',
			name: 'Lydian b7',
			roman: 'bIII7',
			suffix: '7(#11)',
			scalePattern: ['1', 'T9', '3', 'T#11', '5', 'T13', 'b7'],
			scale: ['Eb', 'F', 'G', 'A', 'Bb', 'C', 'Db'],
			category: 'Special Function Dominant'
		},
		{
			key: 'C',
			name: 'Mixolydian b13',
			roman: 'III7',
			suffix: '7(#11)',
			scalePattern: ['1', 'T9', '3', 's4', '5', 'Tb13', 'b7'],
			scale: ['E', 'F#', 'G#', 'A', 'B', 'C', 'Db'],
			category: 'Special Function Dominant'
		},
		{
			key: 'C',
			name: 'Lydian b7',
			roman: 'IV7',
			suffix: '7(#11)',
			scalePattern: ['1', 'T9', '3', 'T#11', '5', 'T13', 'b7'],
			scale: ['F', 'G', 'A', 'B', 'C', 'D', 'Eb'],
			category: 'Special Function Dominant'
		},
		{
			key: 'C',
			name: 'Lydian b7',
			roman: 'bV7',
			suffix: '7',
			scalePattern: ['1', 'T9', '3', 'T#11', '5', 'T13', 'b7'],
			scale: ['Gb', 'Ab', 'Bb', 'C', 'Db', 'Eb', 'Fb'],
			category: 'Special Function Dominant'
		},
		{
			key: 'C',
			name: 'Lydian b7',
			roman: 'bVI7',
			suffix: '7',
			scalePattern: ['1', 'T9', '3', 'T#11', '5', 'T13', 'b7'],
			scale: ['Ab', 'Bb', 'C', 'D', 'Eb', 'F', 'Gb'],
			category: 'Special Function Dominant'
		},
		{
			key: 'C',
			name: 'Lydian b7',
			roman: 'VI7',
			suffix: '7',
			scalePattern: ['1', 'T9', '3', 'T#11', '5', 'T13', 'b7'],
			scale: ['A', 'B', 'C#', 'D#', 'E', 'F#', 'G'],
			category: 'Special Function Dominant'
		},
		{
			key: 'C',
			name: 'Lydian b7',
			roman: 'bVII7',
			suffix: '7',
			scalePattern: ['1', 'T9', '3', 'T#11', '5', 'T13', 'b7'],
			scale: ['Bb', 'C', 'D', 'E', 'F', 'G', 'Ab'],
			category: 'Special Function Dominant'
		},
		{
			key: 'C',
			name: 'Lydian b7',
			roman: 'VII7',
			suffix: '7',
			scalePattern: ['1', 'T9', '3', 'T#11', '5', 'T13', 'b7'],
			scale: ['B', 'C#', 'D#', 'E#', 'F#', 'G#', 'A'],
			category: 'Special Function Dominant'
		},
		{
			key: 'C',
			name: 'Symmetric diminished',
			roman: 'I7(b9,13)',
			suffix: '7',
			scalePattern: ['1', 'T9', '3', 'T#11', '5', 'T13', 'b7'],
			scale: ['C', 'Db', 'Eb', 'E', 'F#', 'G#', 'A'],
			category: 'Symmetric Diminished'
		},
		{
			key: 'C',
			name: 'Passing Diminished',
			roman: '#I°7',
			suffix: '°7',
			scalePattern: ['1', 'sb2', 'b3', 's°4', 'b5', 'T', '°7', 'T'],
			scale: ['C#', 'D', 'E', 'F', 'G', 'A', 'Bb', 'C'],
			category: 'Passing Diminished'
		},
		{
			key: 'C',
			name: 'Passing Diminished',
			roman: '#II°7',
			suffix: '°7',
			scalePattern: ['1', 'sb2', 'b3', 's°4', 'b5', 'T', '°7', 'T'],
			scale: ['D#', 'E', 'F#', 'G', 'A', 'B', 'C', 'D'],
			category: 'Passing Diminished'
		},
		{
			key: 'C',
			name: 'Passing Diminished',
			roman: '#IV°7',
			suffix: '°7',
			scalePattern: ['1', 'sb2', 'b3', 's°4', 'b5', 'T', '°7', 'T'],
			scale: ['F#', 'G', 'A', 'B', 'C', 'D', 'Eb', 'E'],
			category: 'Passing Diminished'
		},
		{
			key: 'C',
			name: 'Chromatic Diminished',
			roman: 'bIII°7',
			suffix: '°7',
			scalePattern: ['1', 'T', 'b3', 's3', 'b5', 'T', '°7', 'T'],
			scale: ['Eb', 'F', 'Gb', 'G', 'A', 'B', 'C', 'D'],
			category: 'Chromatic Diminished'
		},
		{
			key: 'C',
			name: 'Auxiliary Diminished',
			roman: 'bIII°7',
			suffix: '°7',
			scalePattern: ['1', 'T', 'b3', 's3', 'b5', 'T', '°7', 'T'],
			scale: ['Eb', 'F', 'Gb', 'G', 'A', 'B', 'C', 'D'],
			category: 'Auxiliary Diminished'
		}
	],
	minor: [
		{
			key: 'C',
			name: 'Harmonic Minor',
			roman: 'I-',
			suffix: '-',
			scalePattern: ['1', 'T9', 'b3', 'T11', '5', 'sb6', '7'],
			scale: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'B'],
			category: 'Diatonic Minor'
		},
		{
			key: 'C',
			name: 'Melodic Minor (ascending)',
			roman: 'I-',
			suffix: '-',
			scalePattern: ['1', 'T9', 'b3', 'T11', '5', '6', 'T7'],
			scale: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'B'],
			category: 'Diatonic Minor'
		},
		{
			key: 'C',
			name: 'Natural Minor',
			roman: 'I-',
			suffix: '-',
			scalePattern: ['1', 'T9', 'b3', 'T11', '5', 'sb6', 'b7'],
			scale: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
			category: 'Diatonic Minor'
		},
		{
			key: 'C',
			name: 'Locrian',
			roman: 'II-7b5',
			suffix: '-',
			scalePattern: ['1', 'T9', 'b3', 'T11', '5', 'sb6', 'b7'],
			scale: ['D', 'Eb', 'F', 'G', 'Ab', 'Bb', 'C'],
			category: 'Diatonic Minor'
		},
		{
			key: 'C',
			name: 'Ionian',
			roman: 'bIIImaj7',
			suffix: 'maj7',
			scalePattern: ['1', 'T9', '3', 's4', '5', 'T13', '7'],
			scale: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
			category: 'Diatonic Minor'
		},
		{
			key: 'C',
			name: 'Lydian Augmented',
			roman: 'bIII+maj7',
			suffix: '+maj7',
			scalePattern: ['1', 'T9', '3', 'T#11', '#5', 's6', '7'],
			scale: ['Eb', 'F', 'G', 'A', 'B', 'C', 'D'],
			category: 'Diatonic Minor'
		},
		{
			key: 'C',
			name: 'Dorian',
			roman: 'IV-7',
			suffix: '-7',
			scalePattern: ['1', 'T9', '3', 'T#11', '#5', 's6', '7'],
			scale: ['F', 'G', 'Ab', 'Bb', 'C', 'D', 'Eb'],
			category: 'Diatonic Minor'
		},
		{
			key: 'C',
			name: 'Mixolydian b13',
			roman: 'V7(9, b13)',
			suffix: '7(9, b13)',
			scalePattern: ['1', 'T9', '3', 's4', '5', 'Tb13', 'b7'],
			scale: ['G', 'Ab', 'Bb', 'C', 'D', 'Eb', 'F'],
			category: 'Diatonic Minor'
		},
		{
			key: 'C',
			name: 'Mixolydian b9, b13',
			roman: 'V7(b9, b13)',
			suffix: '7(b9, b13)',
			scalePattern: ['1', 'Tb9', '3', 's4', '5', 'Tb13', 'b7'],
			scale: ['G', 'Ab', 'B', 'C', 'D', 'Eb', 'F'],
			category: 'Diatonic Minor'
		},
		{
			key: 'C',
			name: 'Lydian',
			roman: 'bVImaj7',
			suffix: 'maj7',
			scalePattern: ['1', 'T9', '3', 'T#11', '5', 'T13', '7'],
			scale: ['Ab', 'Bb', 'C', 'D', 'Eb', 'F', 'G'],
			category: 'Diatonic Minor'
		},
		{
			key: 'C',
			name: 'Mixoydian',
			roman: 'bVII7',
			suffix: '7',
			scalePattern: ['1', 'T9', '3', 's4', '5', 'T13', 'b7'],
			scale: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'Ab'],
			category: 'Diatonic Minor'
		}
	]
}

const keys = [
	'A#',
	'F',
	'Bb',
	'Eb',
	'Ab',
	'Db',
	'G',
	'D',
	'A',
	'E',
	'B',
	'F#',
	'Gb',
	'C#',
	'G#',
	'D#'
]
const outputPath = path.resolve(process.cwd(), 'static', 'chordScaleLookup.json')

// const prevLookup = fs.readFileSync(outputPath, 'utf-8')

let completeScales = JSON.parse(JSON.stringify(scalesInC))

keys.forEach((key) => {
	scalesInC.major.forEach((chordScale, i) => {
		// const prevScale = JSON.parse(prevLookup).major[i].scale
		// if (ch.name == 'mixolydian something') {
		// 	console.log('mixo something', ch.scale, key)
		// 	console.log('transposeScale(ch.scale, key)', transposeScale(ch.scale, key))
		// }
		completeScales.major.push({ ...chordScale, key, scale: transposeScale(chordScale, key) })
	})
})

fs.writeFileSync(outputPath, JSON.stringify(completeScales))
