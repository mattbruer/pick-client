<script>
	import TabEditor from '$lib/components/TAB/Display/TabEditor.svelte'
	import ChordEditor from '$lib/components/ChordProgression/ChordEditor.svelte'
	import { displayMode } from '$lib/stores/generalStore'
	import NewControlBar from '$lib/components/ControlBar/NewControlBar.svelte'
</script>

<div class="my-4 flex justify-center gap-2">
	<button class="btn bg-white text-black" on:click={() => ($displayMode = 'chords')}>Chords</button>
	<button class="btn bg-white text-black" on:click={() => ($displayMode = 'melody')}>TAB</button>
</div>

<svelte:component this={$displayMode === 'chords' ? ChordEditor : TabEditor} />

<!-- <PlaybackControls /> -->
<!-- <ControlBar /> -->
<NewControlBar />
<!-- {#if $selectedCell}
	<svelte:component this={$isMobile ? MobileKeyboard : EditConsole} />
{/if} -->
