import { nanoid } from 'nanoid'
import { writable, get } from 'svelte/store'
import { key } from './songStore'

const indexToLetter = (index) => String.fromCharCode(65 + index)

export const createSongStore = () => {
	const k = get(key)
	let initSectionId = nanoid(4)
	let initMeasureId = nanoid(4)
	const { subscribe, update, set } = writable({
		sectionOrder: [initSectionId],
		sections: {
			[initSectionId]: {
				name: indexToLetter(0),
				repeat: 1,
				measureOrder: [initMeasureId]
			}
		},
		measures: { [initMeasureId]: { chords: [k.tonic + k.mode, ''] } }
	})

	return {
		subscribe,
		set,
		update,
		addSection: () =>
			update((song) => {
				const k = get(key)
				const sectionId = nanoid(4)
				const measureId = nanoid(4)
				song.sectionOrder.push(sectionId)
				song.sections[sectionId] = {
					name: indexToLetter(song.sectionOrder.indexOf(sectionId)),
					repeat: 1,
					measureOrder: [measureId]
				}
				song.measures[measureId] = {
					chords: [`${k.tonic} ${k.mode == 'major' ? '' : k.mode}`, '']
				}
				return song
			}),
		deleteSection: (sectionId) => {
			update((song) => {
				if (song.sectionOrder.length == 1) return song
				song.sectionOrder = song.sectionOrder.filter((id) => id != sectionId)
				delete song.sections[sectionId]
				return song
			})
		},
		addMeasure: (sectionId) => {
			const id = nanoid(4)
			update((song) => {
				song.sections[sectionId].measureOrder.push(id)
				song.measures[id] = { chords: ['', ''] }
				return song
			})
		},
		deleteMeasure: (measureId) => {
			update((song) => {
				console.log('measureId', measureId)
				console.log('song', song)
			})
		},
		clearChord: (ch, section) => {
			update((song) => {
				if (
					song.sections[song.sectionOrder[section]].measureOrder.indexOf(ch.measureId) == 0 &&
					ch.position == 0
				) {
					return song
				}

				song.measures[ch.measureId].chords[ch.position] = ''
				return song
			})
		}
	}
}
