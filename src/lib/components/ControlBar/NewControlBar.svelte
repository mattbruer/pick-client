<script>
	import { selectedMeasure, song } from '$lib/stores/songStore'
	import { selectedSection } from '$lib/stores/chordProgressionStore'
	import { editMode } from '$lib/stores/generalStore'
	import MobileChordInput from './MobileChordInput.svelte'
	import PlaybackControls from './PlaybackControls.svelte'
	import MixingBoard from '../Audio/MixingBoard/MixingBoard.svelte'
	import MobileKeyboard from '../TAB/Display/MobileKeyboard.svelte'
	import Modal from '$lib/components/UI/Modal.svelte'
	import AddPart from '../TAB/Display/AddPart.svelte'

	let showAddPart = false

	const addMeasure = () => {
		const sectionId = $song.sectionOrder[$selectedSection]
		song.addMeasure(sectionId)
	}

	let showMixer = false
	const toggleMixer = () => {
		showMixer = !showMixer
	}
</script>

<div class="control-bar">
	{#if $selectedMeasure}
		<MobileChordInput />
	{:else if $editMode}
		<MobileKeyboard />
	{:else}
		<button on:click={() => song.addSection()} class="btn bg-white text-black">New Section</button>
		<button on:click={addMeasure} class="btn bg-white text-black">Add Measure</button>
		<button class="btn bg-white text-black" on:click={() => (showAddPart = true)}>Add Part</button>

		<button class="btn bg-white text-black" on:click={toggleMixer}>Mixer</button>
		<button class="btn bg-white text-black" on:click={() => ($editMode = true)}>Edit</button>
		<div class="flex">
			<button class="btn bg-white text-black" on:click={() => {}}>Add Audio Track</button>
			<PlaybackControls />
		</div>
	{/if}

	<div class:show-mixer={showMixer} class="mixer-popup pt-8">
		<MixingBoard {toggleMixer} />
	</div>

	{#if showAddPart}
		<Modal close={() => (showAddPart = false)}
			><AddPart close={() => (showAddPart = false)} /></Modal
		>
	{/if}
</div>

<style>
	.control-bar {
		position: fixed;
		bottom: 0;
		width: 100%;
		overflow-x: auto;
		box-shadow: 0px 0px 5px black;
		background-color: var(--primary-color);
		z-index: 1000;
		color: white;
		transition: height 0.3s ease-in-out;
		min-height: var(--controlbar-height);
	}

	.show-mixer {
		display: block !important;
	}

	.mixer-popup {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: rgba(128, 128, 128, 0.756);
		z-index: 2000;
	}
</style>
