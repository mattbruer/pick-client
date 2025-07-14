import { writable } from 'svelte/store'

export const root = writable(null)
export const accidental = writable('nat')
export const chordType = writable(null)
