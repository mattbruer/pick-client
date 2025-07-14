<script>
	import { displayMode } from '$lib/stores/generalStore'
	import { song } from '$lib/stores/songStore'
	import { mix } from '$lib/stores/audioStore'
	import { selectedSection } from '$lib/stores/chordProgressionStore'
	import MixingBoard from '../Audio/MixingBoard/MixingBoard.svelte'
	import MobileChordInput from './MobileChordInput.svelte'
	import PlaybackControls from './PlaybackControls.svelte'

	const controls = {
		chords: MobileChordInput
	}

	let showMixer = false
	const toggleMixer = () => {
		showMixer = !showMixer
	}

	let showAddAudio = false
	const toggleAddAudio = () => {
		showAddAudio = !showAddAudio
	}

	const addMeasure = () => {
		const sectionId = $song.sectionOrder[$selectedSection]
		song.addMeasure(sectionId)
	}
	let newTrack = ''
</script>

<div class="control-bar flex gap-2">
	<div class="flex flex-col">
		<div class="flex">
			<button on:click={() => song.addSection()} class="btn bg-white text-black">New Section</button
			>
			<button on:click={addMeasure} class="btn bg-white text-black">Add Measure</button>
			<button class="btn bg-white text-black">SAVE</button>
			<button class="bg-white text-black" on:click={() => ($displayMode = 'chords')}>Chords</button>
			<button class="bg-white text-black" on:click={() => ($displayMode = 'melody')}>Melody</button>
			<button class="bg-white text-black" on:click={toggleMixer}>Mixer</button>
			<button class="bg-white text-black" on:click={toggleAddAudio}>Add Audio Track</button>
			<svelte:component this={controls[$displayMode]} />
		</div>

		<div class="absolute bottom-0 w-full">
			<PlaybackControls />
		</div>
	</div>
</div>

<div class:show-mixer={showMixer} class="mixer-popup pt-8">
	<MixingBoard {toggleMixer} />
</div>

<div class:show-add-audio={showAddAudio} class="add-audio-popup pt-8">
	<div>
		<input type="text" bind:value={newTrack} />
		<div class="flex">
			<button on:click={toggleAddAudio}>CANCEL</button>
			<button
				on:click={() => {
					$mix[newTrack] = { volume: 75, balance: 0 }
				}}>LET'S PICK!</button
			>
		</div>
	</div>
</div>

<style>
	.show-add-audio {
		display: block !important;
	}

	.show-mixer {
		display: block !important;
	}

	.mixer-popup,
	.add-audio-popup {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: rgba(128, 128, 128, 0.756);
		z-index: 2000;
	}
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
		min-height: 10rem;
	}
	button {
		font-size: 12px;
		height: 40px;
		border-radius: 0.25rem;
		border: 1px solid white;
		padding: 0px 8px;
		min-width: fit-content;
	}
</style>
