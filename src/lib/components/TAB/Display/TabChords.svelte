<script>
	import { song } from '$lib/stores/songStore'
	import { horizontalSpacing } from '../tabStore'
	export let sectionId
</script>

<div class="mb-[15px] flex">
	{#each $song.sections[sectionId].measureOrder as measureId (measureId)}
		<div style={`width:${$horizontalSpacing * 16}px`} class="flex">
			{#each $song.measures[measureId].chords as chord, i (measureId + i)}
				<button style={`width:${$horizontalSpacing * 8}px;`}
					>{chord?.scale?.[0]}{chord?.suffix}</button
				>
				<!-- <input class="rounded" style={`width:${$horizontalSpacing * 8}px;`} bind:value={chord} /> -->
			{/each}
		</div>
	{/each}
</div>

<style>
	input {
		border: none;
	}
	input:focus {
		box-shadow: 0px 0px 4px inset blue;
	}
	* {
		box-sizing: border-box;
	}
</style>
