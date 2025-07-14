import { transposeScale } from './trasposeScale'
export const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', 'F', 'G']
export const chromaticSharp = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

export const chromaticFlat = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab']

// export const chordScaleMap = { C: scalesInC }

const scalesInC = {
	major: {
		diatonicChords: [
			{
				name: 'ionian',
				roman: 'I',
				quality: 'maj',
				suffix: '',
				scalePattern: ['1', 'T9', '3', 's4', '5', 'T13', '7'],
				scale: ['C', 'D', 'E', 'F', 'G', 'A', 'B']
			},
			{
				name: 'dorian',
				roman: 'II-',
				quality: 'min',
				suffix: '-',
				scalePattern: ['1', 'T9', 'b3', 'T11', '5', 's6', 'b7'],
				scale: ['D', 'E', 'F', 'G', 'A', 'B', 'C']
			},
			{
				name: 'phrygian',
				roman: 'III-',
				quality: 'min',
				suffix: '-',
				scalePattern: ['1', 'sb2', 'b3', 'T11', '5', 'sb6', 'b7'],
				scale: ['E', 'F', 'G', 'A', 'B', 'C', 'D']
			},
			{
				name: 'lydian',
				roman: 'IV',
				quality: 'maj',
				suffix: '',
				scalePattern: ['1', 'T9', '3', 'T#11', '5', 'T13', '7', '1'],
				scale: ['F', 'G', 'A', 'B', 'C', 'D', 'E']
			},
			{
				name: 'mixolydian',
				roman: 'V',
				quality: 'maj',
				suffix: '',
				scalePattern: ['1', 'T9', '3', 's4', '5', 'T13', '7'],
				scale: ['G', 'A', 'B', 'C', 'D', 'E', 'F']
			},
			{
				name: 'aeolian',
				roman: 'VI-',
				quality: 'min',
				suffix: '-',
				scalePattern: ['1', 'T9', '3', 's4', '5', 'T13', 'b7'],
				scale: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
			},
			{
				name: 'locrian',
				roman: 'VII-(b5)',
				quality: 'dim',
				suffix: 'ø',
				scalePattern: ['1', 'sb2', 'b3', 'T11', 'b5', 'Tb13', 'b7'],
				scale: ['B', 'C', 'D', 'E', 'F', 'G', 'A']
			}
		],
		secondaryDominants: [
			{
				name: 'locrian',
				roman: 'V7/IV',
				quality: 'maj',
				suffix: '7',
				scalePattern: ['1', 'sb2', 'b3', 'T11', 'b5', 'Tb13', 'b7'],
				scale: ['C', 'D', 'E', 'F', 'G', 'A', 'Bb']
			}
		]
	}
}

export const generateDiatonicChordScales = (newKey) => {
	const result = []
	scalesInC.major.diatonicChords.forEach((ch) => {
		console.log('ch', ch)
		const newScale = transposeScale(ch.scale, newKey)
		console.log('newScale', newScale)
		result.push({ ...ch, scale: newScale, displayName: newScale[0] + ch.suffix })
	})

	return result
}
// const COFSharps = () => {
// 	let result = []
// 	const order = ['C', 'G', 'D', 'A', 'E', 'B', 'F#']
// 	const sharps = ['', '#', '##', '###']

// 	sharps.forEach((s) => {
// 		order.forEach((note) => {
// 			result.push(note + s)
// 		})
// 	})

// 	return result
// }

// const COFFlats = () => {
// 	let result = []
// 	const order = ['C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb']
// 	const flats = ['', 'b', 'bb', 'bbb']

// 	flats.forEach((s) => {
// 		order.forEach((note) => {
// 			result.push(note + s)
// 		})
// 	})

// 	return result
// }

// export const chromaticScale = (key) => {
// 	const scale = ['G', 'C', 'D', 'A', 'E', 'B', 'F#'].includes(key.tonic)
// 		? [...chromaticSharp, ...chromaticSharp]
// 		: [...chromaticFlat, ...chromaticFlat]

// 	console.log('chromatic scale', scale)
// 	return scale
// }

// const majorScalePattern = [2, 2, 1, 2, 2, 2]
const majorRomans = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii0']
const qualities = ['', 'min', 'min', '', '', 'min', 'dim']

// const chordScales = {}

// export const generateDiatonicChordScales = (key) => {
// 	// if (key.mode == 'major') {
// 	// 	if (chordScales[key.tonic]) return chordScales[key.tonic]
// 	// 	let parentMajor = [key.tonic]

// 	// 	majorScalePattern.forEach((interval, i) => {
// 	// 		const prevNote = parentMajor[i]
// 	// 		const prevNoteAlphaIndex = alphabet.indexOf(prevNote[0])
// 	// 		const letter = alphabet[prevNoteAlphaIndex + 1]

// 	// 		parentMajor.push()
// 	// 	})
// 	// 	console.log('parentMajor', parentMajor)
// 	// }
// 	const scale = [{ note: key.tonic + qualities[0], roman: majorRomans[0] }]
// 	const chromatic = chromaticScale(key)

// 	const indexOfKey = chromatic.indexOf(key.tonic)
// 	let last = indexOfKey
// 	majorScalePattern.forEach((interval, i) => {
// 		scale.push({ note: chromatic[interval + last] + qualities[i + 1], roman: majorRomans[i + 1] })
// 		last += interval
// 	})
// 	return scale
// }

const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
// const CHROMATIC = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const MAJOR_STEPS = [2, 2, 1, 2, 2, 2, 1]

const letterToNaturalPitch = {
	C: 0,
	D: 2,
	E: 4,
	F: 5,
	G: 7,
	A: 9,
	B: 11
}

function getPitchClass(note) {
	const match = note.match(/^([A-G])([#b]*)$/)
	if (!match) throw new Error('Invalid note: ' + note)
	const [, letter, accidentals] = match
	let pc = letterToNaturalPitch[letter]
	for (const accidental of accidentals) {
		pc += accidental === '#' ? 1 : -1
	}
	return (pc + 12) % 12
}

export function getMajorScale(key) {
	const match = key.match(/^([A-G])([#b]*)$/)
	if (!match) throw new Error('Invalid key: ' + key)
	const [_, rootLetter, acc] = match
	const rootPC = getPitchClass(key)

	let scale = []
	let currentPC = rootPC
	let currentLetterIndex = LETTERS.indexOf(rootLetter)

	for (let i = 0; i < 7; i++) {
		const expectedLetter = LETTERS[(currentLetterIndex + i) % 7]
		const naturalPC = letterToNaturalPitch[expectedLetter]
		let diff = (currentPC - naturalPC + 12) % 12
		if (diff > 6) diff -= 12 // prefer flats if closer

		let accidental = ''
		if (diff > 0) accidental = '#'.repeat(diff)
		else if (diff < 0) accidental = 'b'.repeat(-diff)

		scale.push(expectedLetter + accidental)

		currentPC = (currentPC + MAJOR_STEPS[i]) % 12
	}

	return scale
}

// export function generateDiatonicChordScales(key) {
// 	let result = []
// 	if (key.mode == 'major') {
// 		let parentMajor = getMajorScale(key.tonic)
// 		let doubleParentMajor = [...parentMajor, ...parentMajor]

// 		parentMajor.forEach((note, i) => {
// 			const mode = Array.from(new Set([...doubleParentMajor.slice(i)]))
// 			const root = mode[0]
// 			const third = mode[2]
// 			const fifth = mode[4]
// 			const seventh = mode[6]
// 			const triad = [root, third, fifth]
// 			const roman = majorRomans[i]
// 			const displayName = root + qualities[i]
// 			result.push({
// 				root,
// 				third,
// 				fifth,
// 				seventh,
// 				triad,
// 				mode,
// 				roman,
// 				displayName
// 			})
// 		})
// 	}
// 	console.log('result=>', result)
// 	return result
// }
