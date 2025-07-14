<script>
	// import { registerKeyCombos } from './keyCombos'
	// import { onMount } from 'svelte'
	import { parts } from '$lib/stores/songStore'
	import { song } from '$lib/stores/songStore'
	import TabSection from './TabSection.svelte'
	import Modal from '$lib/components/UI/Modal.svelte'
	import AddPart from './AddPart.svelte'
	import { selectedPart } from '../tabStore'

	let showAddPart = false

	// onMount(() => {
	// 	window.addEventListener('keydown', registerKeyCombos)
	// 	return () => {
	// 		window.removeEventListener('keydown', registerKeyCombos)
	// 	}
	// })
</script>

{#if Object.keys($parts).length == 0}
	<div>There are no TAB parts yet. Add one?</div>
	<div>{Object.keys($parts).length}</div>

	<button class="btn" on:click={() => (showAddPart = true)}>Add Part</button>
{:else}
	{@const k = Object.keys($parts)}

	<select name="" id="" on:change={(e) => ($selectedPart = e.target.value)} value={$selectedPart}>
		{#each k as part, i (i)}
			<option>{part}</option>
		{/each}
	</select>
	{#each $song.sectionOrder as sectionId (sectionId)}
		<TabSection {sectionId} />
	{/each}
{/if}

{#if showAddPart}
	<Modal close={() => (showAddPart = false)}><AddPart close={() => (showAddPart = false)} /></Modal>
{/if}
