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

const getCorrectLetters = (scale, newKey) => {
	let diff = alphabet.indexOf(newKey[0]) - alphabet.indexOf('C')

	const result = scale.map((n) => {
		return alphabet[alphabet.indexOf(n[0]) + diff] ?? alphabet[alphabet.indexOf(n[0]) + 7 + diff]
	})
	return result
}

const getTransposeInterval = (newKey) => {
	const CIndex = chromaticFlat.indexOf('C')
	const newKeyIndex = Math.max(chromaticFlat.indexOf(newKey), chromaticSharp.indexOf(newKey))
	return newKeyIndex - CIndex
}

export const transposeScale = (scale, newKey) => {
	let result
	const diff = getTransposeInterval(newKey)
	const correctLetters = getCorrectLetters(scale, newKey)

	result = scale.map((n, i) => {
		let cfNote = chromaticFlat[chromaticFlat.indexOf(n) + diff]
		let csNote = chromaticSharp[chromaticSharp.indexOf(n) + diff]

		if (correctLetters[i] == cfNote) {
			return cfNote
		}

		if (correctLetters[i] == csNote) {
			return csNote
		}

		let csDist = chromaticSharp.indexOf(csNote) - chromaticSharp.indexOf(correctLetters[i])
		let cfDist = chromaticFlat.indexOf(cfNote) - chromaticFlat.indexOf(correctLetters[i])

		if (csDist < 0) {
			csDist += 12
		}
		if (cfDist < 0) {
			cfDist += 12
		}
		if (cfDist > 2) {
			cfDist = 12 - cfDist
		}

		let acc = ''
		for (let i = 0; i < 3; i++) {
			acc
		}
		console.log('custom', csNote, csDist, cfNote, cfDist)
		return correctLetters[i] + acc
	})

	return result
}
