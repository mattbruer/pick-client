import {
	selectedColumn,
	selectedCell,
	selectedInstrument,
	selectedDuration,
	isRest,
	isTie,
	isDotted
} from '../tabStore'
import { TUNINGS } from '$lib/constants'
import { get } from 'svelte/store'

const durationMap = {
	w: 'wholeNote',
	h: 'halfNote',
	q: 'quarterNote',
	e: 'eighthNote',
	s: 'sixteenthNote'
}

const focusKeys = [
	'ArrowLeft',
	'ArrowRight',
	'ArrowUp',
	'ArrowDown',
	'w',
	'h',
	'q',
	'e',
	's',
	't',
	'd',
	'r'
]

export function registerKeyCombos() {}

// export function registerKeyCombos(e) {
// 	if (e?.key?.includes[('ArrowLeft', 'ArrowRight', 'w', 'h', 'q', 'e', 's', 't', 'd', 'r')]) {
// 		document.getElementById('fret-input').focus()
// 	}
// 	const melodyStore = get(melody)
// 	const column = get(selectedColumn)

// 	const setDuration = (duration) => {
// 		melodyStore[column].duration = duration
// 		melody.set(melodyStore)
// 		selectedDuration.set(duration)
// 	}

// 	switch (e.key) {
// 		case 'ArrowLeft':
// 			selectedColumn.update((n) => {
// 				let newN = Math.max(0, n - 1)
// 				selectedDuration.set(get(melody)[newN].duration)
// 				return newN
// 			})
// 			break
// 		case 'ArrowRight':
// 			selectedColumn.update((n) => {
// 				let newN = n + 1
// 				selectedDuration.set(get(melody)[newN].duration)
// 				return newN
// 			})
// 			break
// 		case 'ArrowUp':
// 			selectedCell.update((n = TUNINGS[get(selectedInstrument)][0]) => {
// 				const currStringIndex = TUNINGS[get(selectedInstrument)].indexOf(n)
// 				const newString = TUNINGS[get(selectedInstrument)][currStringIndex - 1]
// 				return newString
// 			})
// 			break
// 		case 'ArrowDown':
// 			selectedCell.update((n = TUNINGS[get(selectedInstrument)][0]) => {
// 				const currStringIndex = TUNINGS[get(selectedInstrument)].indexOf(n)
// 				const newString = TUNINGS[get(selectedInstrument)][currStringIndex + 1]
// 				return newString
// 			})
// 			break
// 		case 'w':
// 			setDuration('wholeNote')
// 			break
// 		case 'h':
// 			setDuration('halfNote')
// 			break
// 		case 'q':
// 			setDuration('quarterNote')
// 			break
// 		case 'e':
// 			setDuration('eighthNote')
// 			break
// 		case 's':
// 			setDuration('sixteenthNote')
// 			break
// 		case 'r':
// 			isRest.update((val) => !val)
// 			break
// 		case 't':
// 			isTie.update((val) => !val)
// 			break
// 		case 'd':
// 			isDotted.update((val) => !val)
// 	}
// }
