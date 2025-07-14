import { writable } from 'svelte/store'

export const displayMode = writable('chords')
export const editMode = writable(false)
export const isMobile = writable()
export const deviceType = writable()
