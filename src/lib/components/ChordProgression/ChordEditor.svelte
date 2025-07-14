<script>
	import { song } from '$lib/stores/songStore'
	import Section from './Section.svelte'
</script>

<div class="outer p-2">
	{#each $song.sectionOrder as sectionId (sectionId)}
		<Section {sectionId} />
	{/each}
</div>

<style>
	.outer {
		background-color: rgb(219, 220, 222);
	}
</style>
