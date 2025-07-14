<script>
	import { song } from '$lib/stores/songStore'
	import { selectedSection } from '$lib/stores/chordProgressionStore'
	import { isMobile } from '$lib/stores/generalStore'

	const addMeasure = () => {
		const sectionId = $song.sectionOrder[$selectedSection]
		song.addMeasure(sectionId)
	}
</script>

{#if $isMobile}
	<div class="">just mobile</div>
{:else}
	<div class="outer">
		<!-- <div class="text-white">
		{JSON.stringify($song)}
	</div> -->

		<!-- <div class="text-white">Section: {$sections[$selectedSection]?.name}</div> -->
		<button on:click={() => song.addSection()} class="btn bg-white">New Section</button>
		<button on:click={addMeasure} class="btn bg-white">Add Measure</button>
		<button class="btn bg-white">SAVE</button>
	</div>
{/if}

<style>
	.outer {
		min-width: 200%;
		color: black;
	}
</style>
