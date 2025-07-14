<script>
	import { editMode } from '$lib/stores/generalStore'
	import Keypad from '../TAB/Keypad/Keypad.svelte'
</script>

{#if $editMode}
	<Keypad />
{:else}
	<div>Play melody controls</div>
{/if}

<style></style>
