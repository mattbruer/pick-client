<script>
	import { selectedChordInput } from '../TAB/tabStore'
	import { selectedMeasure } from '$lib/stores/songStore'
	import { selectedSection } from '$lib/stores/chordProgressionStore'
	import { song } from '$lib/stores/songStore'
	import { lookup } from '$lib/init'
	import { key } from '$lib/stores/songStore'
	import ChordPicker from './chords/ChordPicker.svelte'
	import { category } from '$lib/stores/chordProgressionStore'

	// $: if (typeof $selectedChordInput?.position == 'number') {
	// 	document.documentElement.style.setProperty('--controlbar-height', '250px')
	// } else {
	// 	document.documentElement.style.setProperty('--controlbar-height', '10rem')
	// }

	let categories
	$: if ($key.mode) {
		categories = [...new Set(lookup[$key.mode].map((cs) => cs.category))]
	}
</script>

{#if typeof $selectedChordInput?.position == 'number'}
	<div class="flex flex-col overflow-scroll px-2 text-white">
		<div class="flex gap-4 overflow-scroll">
			<!-- <button
				class="btn m-1 min-w-fit bg-white text-black"
				on:click={() => {
					$selectedChordInput = null
				}}
				>Make 2nd ending
			</button> -->
			<button
				class="btn min-w-fit bg-white text-black"
				on:click={() => {
					$selectedChordInput = null
				}}
				>Measure {$song.sections[$song.sectionOrder[$selectedSection]].measureOrder.indexOf(
					$selectedMeasure
				) + 1} Options
			</button>

			<button class="btn min-w-fit bg-white text-black" on:click={() => {}}>Delete Measure</button>
			<button
				class="btn min-w-fit bg-white text-black"
				on:click={() => {
					song.clearChord($selectedChordInput, $selectedSection)
				}}
				>Clear Chord
			</button>
			<button
				class="btn min-w-fit bg-white text-black"
				on:click={() => {
					$selectedChordInput = {}
					$selectedMeasure = null
				}}>Done</button
			>
		</div>

		<div class="flex overflow-scroll">
			{#each categories as cat (cat)}
				<button
					class:selected={cat == $category}
					on:click={() => ($category = cat)}
					class="btn m-1 !h-14 bg-white text-sm text-black">{cat}</button
				>
			{/each}
		</div>
		<ChordPicker />
	</div>
{/if}

<style>
	.selected {
		box-shadow: 0px 0px 5px 2px inset red;
		color: red;
	}
	button {
		height: 40px;
	}
</style>
