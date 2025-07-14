<script>
	import { measureCount, song, selectedMeasure } from '$lib/stores/songStore'
	import { selectedSection } from '$lib/stores/chordProgressionStore'
	import { onMount } from 'svelte'
	import Icon from '@iconify/svelte'
	import { selectedChordInput } from '../TAB/tabStore'
	import { playingBeat } from '$lib/stores/audioStore'
	import { isPlaying } from '$lib/stores/audioStore'

	export let sectionId

	let section

	const handleInputSelect = (position, measureId) => {
		$selectedChordInput = { measureId, position }
		$selectedMeasure = measureId
	}

	const selectSection = () => {
		$selectedSection = $song.sectionOrder.indexOf(sectionId)
	}

	let sectionEl
	onMount(() => {
		sectionEl.addEventListener('click', selectSection)
		return () => sectionEl.removeEventListener('click', selectSection)
		// document.getElementById('children').scrollTo({ top: section.offsetTop, behavior: 'smooth' })
		// $selectedSection = $song.sectionOrder.indexOf(sectionId)
	})
</script>

{#if $song}
	<div
		bind:this={sectionEl}
		class="section h-fit border bg-white py-2"
		id={`${sectionId}`}
		bind:this={section}
		class:selected={$selectedSection === $song.sectionOrder.indexOf(sectionId)}
	>
		<div class="section-bar flex">
			<div class="flex flex-grow items-center gap-8 p-1 px-4">
				<div>
					Section:
					<input class="section-input" type="text" bind:value={$song.sections[sectionId].name} />
				</div>

				<div>
					Repeat
					<input class="repeat-input" type="number" bind:value={$song.sections[sectionId].repeat} />
				</div>
			</div>
			<button class="mr-4" on:click={() => song.deleteSection(sectionId)}>
				<Icon width="20px" icon="iconoir:trash" color="red" />
			</button>
		</div>
		<div class="chords-container mx-1 mt-2 flex flex-wrap rounded border p-1">
			{#each $song.sections[sectionId]?.measureOrder as measureId, measureNumber (measureId)}
				{@const isLastMeasure = measureNumber + 1 == $measureCount[sectionId]}
				<div
					class="measure relative flex h-[40px] w-[25%] border-r"
					class:selectedMeasure={measureId == $selectedMeasure}
					class:border-r-2={isLastMeasure}
					class:playing={measureNumber == Math.floor($playingBeat / 4) && $isPlaying}
				>
					{#if isLastMeasure}
						<div class="barline absolute h-[100%] w-[1px] border-r"></div>
					{/if}

					{#each $song.measures?.[measureId]?.chords as chord, position (measureId + position)}
						<button
							class=" relative w-[50%] rounded"
							class:selectedInput={$selectedChordInput?.measureId == measureId &&
								$selectedChordInput.position == position}
							on:click={() => handleInputSelect(position, measureId)}
						>
							{chord?.scale?.[0]}{chord?.suffix?.replaceAll('b', '♭')}
						</button>
					{/each}
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.selected {
		box-shadow: 0px 0px 4px 4px red !important;
	}
	input {
		margin: 0.5px;
	}

	.section {
		margin-bottom: 1rem;
		box-shadow: 0px 0px 5px black;
	}
	.section-input,
	.repeat-input {
		width: 50px;
		border: none;
		border-radius: 0.5rem;
		background-color: transparent;
	}

	.section:focus {
		background-color: white;
	}
	.section-bar {
		box-shadow: 0px 0px 1px black;
	}
	.measure {
		padding: 0px 0.5px;
		margin: 5px 0px;
	}
	.selectedMeasure {
		box-shadow: 0px 0px 5px red;
	}

	.playing {
		background-color: rgb(145, 181, 212);
	}

	.beat {
	}
	.barline {
		left: calc(100% - 2px);
	}
	.chords-container {
		box-shadow: 0px 0px 2px black inset;
	}
	.selectedInput {
		box-shadow: 0px 0px 2px 1px inset blue;
	}
</style>
