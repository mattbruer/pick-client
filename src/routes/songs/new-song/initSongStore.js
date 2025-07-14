import { writable } from 'svelte/store'

export const title = writable('')
export const key = writable({})
export const timeSignature = writable('')

export const reset = () => {
	title.set('')
	key.set({ tonic: '', mode: '' })
	timeSignature.set('')
}
