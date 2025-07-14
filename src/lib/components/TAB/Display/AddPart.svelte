<script>
	import { parts } from '$lib/stores/songStore'
	import { mix } from '$lib/stores/audioStore'
	import { selectedPart } from '../tabStore'

	export let close

	let selectedInstrument = ''
	let partName = ''

	const addNewPart = () => {
		if (!partName || !selectedInstrument) return alert('Name and instrument must be completed.')
		$parts[partName] = {
			instrument: selectedInstrument,
			name: partName,
			sequence: [{ notes: {}, duration: 'eighthNote' }],
			position: 0,
			done: false
		}
		$mix[partName] = { volume: 75, balance: 50 }
		$selectedPart = partName
		close()
	}
</script>

<div>
	<div class="mb-4 text-black">
		<div class="mb-2">Instrument:</div>
		<button
			class="btn text-black"
			class:selected={selectedInstrument == 'guitar'}
			on:click={() => (selectedInstrument = 'guitar')}>Guitar</button
		>
		<button
			class="btn text-black"
			class:selected={selectedInstrument == 'mando'}
			on:click={() => (selectedInstrument = 'mando')}>Mandolin</button
		>
	</div>
	<div class="text-black">Part Name:</div>
	<input class="text-black" type="text" bind:value={partName} />

	<div class="mt-4 flex gap-2">
		<button class="btn mt-4 text-black">Cancel</button>
		<button class="btn mt-4 text-black" on:click={addNewPart}>Let's Pick!</button>
	</div>
</div>

<style>
	.selected {
		background-color: var(--primary-color);
		color: white;
	}
</style>
