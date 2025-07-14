<script>
	import { measureCount, parts, song } from '$lib/stores/songStore'
	import { TUNINGS } from '$lib/constants'
	import { horizontalSpacing, selectedPart } from '../tabStore'
	import { selectedSection } from '$lib/stores/chordProgressionStore'
	import TabChords from './TabChords.svelte'
	import { setScrollable } from '$lib/audio/audioFunctions/playback'
	import { onMount } from 'svelte'
	import { selectedString } from '../tabStore'
	import Event from './Event.svelte'

	export let sectionId

	$: instrument = $parts[$selectedPart].instrument

	onMount(() => {
		setScrollable({ [sectionId]: mainPartEl })
	})

	let mainPartEl

	let sectionIndex = $song.sectionOrder.indexOf(sectionId)
</script>

<div class="mb-12 flex h-fit flex-col">
	<div class="flex">
		<button
			on:click={() => ($selectedSection = sectionIndex)}
			class="mb-2 flex items-center gap-12"
			class:selected={$selectedSection == sectionIndex}
		>
			<div class="text-2xl underline">Section {$song.sections[sectionId].name}</div>
		</button>
	</div>

	<div class="flex">
		<div class="strings z-900 flex h-[200px] w-[30px] flex-col items-center pt-[40px]">
			{#each TUNINGS[instrument] as string (string)}
				<div
					class="string flex h-[20px] w-[20px] items-center justify-center"
					class:selectedString={$selectedString == string}
				>
					{string}
				</div>
			{/each}
		</div>
		<div bind:this={mainPartEl} class="main-part w-[100%] overflow-scroll">
			<TabChords {sectionId} />

			<div
				class="tab-container relative"
				style={`height:${TUNINGS[instrument].length * 20}px;width:${$horizontalSpacing * 16 * $measureCount[sectionId]}px`}
			>
				{#each $song.sections[sectionId].measureOrder as barline, i (barline)}
					<div
						style={`left: ${$horizontalSpacing * 16 * (i + 1)}px; height:${TUNINGS[instrument].length * 20}px`}
						class="barline absolute w-[1px]"
					></div>
				{/each}
				{#each TUNINGS[instrument] as string, i (string)}
					<div class="absolute h-[1px] w-[100%] bg-black" style={`top: ${i * 20 + 10}px;`}></div>
				{/each}
				<div class="flex">
					<Event />
					<Event />
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.string {
		box-shadow: 0px 0px 3px black;
		background-color: var(--primary-color);
		color: white;
		border-radius: 50%;
	}
	.selectedString {
		box-shadow: 0px 0px 3px red;
		background-color: red;
	}
	/* .tab-container {
		background: linear-gradient(
			to right,
			rgba(255, 255, 255, 0.305) 0px,
			rgba(255, 255, 255, 0.305) 288px,
			rgba(95, 190, 238, 0.359) 288px,
			rgba(95, 190, 238, 0.359) 576px,
			rgba(255, 255, 255, 0.359) 576px,
			rgba(255, 255, 255, 0.359) 100%
		);
	} */
	.barline {
		box-shadow: 0px 0px 1px inset black;
		background-color: rgb(55, 55, 55);
	}
	.selected {
		background-color: rgb(195, 239, 239);
	}

	.main-part {
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* IE/Edge */
	}

	.main-part::-webkit-scrollbar {
		display: none; /* Chrome, Safari */
	}
</style>
