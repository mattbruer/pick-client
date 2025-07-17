<script>
	import Fader from './components/Fader.svelte'
	import Strip from './Strip.svelte'
	import { mix } from '$lib/stores/audioStore'
	export let toggleMixer
</script>

<div class="board flex w-full flex-col overflow-scroll">
	<button on:click={toggleMixer} class="btn ml-auto h-[40px] w-[40px] bg-white text-black">X</button
	>
	<div class="flex gap-6">
		{#each Object.keys($mix).filter((k) => k != 'master') as strip (strip)}
			<Strip name={strip} instrument={strip} />
		{/each}

		<div class="flex flex-col items-center justify-end">
			<Fader instrument="master" />
			<div class="label">Master</div>
		</div>
	</div>
</div>

<style>
	.board {
		padding: 10px;
		background-color: rgb(41, 40, 40);
		color: white;
		box-shadow: -5px 5px 5px black;
		overflow: scroll;
		height: 90%;
	}

	.label {
		background-color: rgb(237, 221, 202);
		border-radius: 2px;
		color: black;
		padding: 0px 4px;
		margin: 10px 0px;
	}
</style>
