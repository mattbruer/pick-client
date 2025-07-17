import { derived, writable } from 'svelte/store'

export const selectedDuration = writable(null)
export const selectedFret = writable(null)
// rests and ties
export const isRest = writable(false)
export const isTie = writable(false)
export const isDotted = writable(false)

export const selectedInstrument = writable('guitar')
export const selectedString = writable(null)

export const selectedEvent = writable(0)
export const selectedCell = writable(0)

export const editColumn = writable(false)

//spacing stuff
export const horizontalSpacing = writable(18)
export const pixelsPerTick = derived(horizontalSpacing, ($horizontalSpacing) => {
	return $horizontalSpacing / 48
})

//chord selection for mobile
export const selectedChordInput = writable(null)

export const selectedPart = writable(null)
