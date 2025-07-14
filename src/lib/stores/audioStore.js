import { writable } from 'svelte/store'
import { updateTempo } from '$lib/audio/audioFunctions/playback'

export const isPlaying = writable(false)
// export const tempo = writable(60)

function createTempo() {
	const { subscribe, set, update } = writable(120)

	return {
		subscribe,
		set, // keep default set if you want
		update,
		setTempo: (newTempo) => {
			// put your updateTempo logic here (e.g., call updateTempo(newTempo))
			updateTempo(newTempo)
			set(newTempo)
		}
	}
}

export const playingBeat = writable()

export const mix = writable({
	master: { volume: 75 },
	guitar: { volume: 75, balance: 50 },
	mando: { volume: 75, balance: 50 }
})

export const tempo = createTempo()

export const audio = writable({})
