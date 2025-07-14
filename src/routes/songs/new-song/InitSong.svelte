<script>
	import { reset, title, key, timeSignature } from './initSongStore'
	import { goto } from '$app/navigation'
	import { initializeSong } from '$lib/stores/songStore'
	import CircleOfFifths from '$lib/components/ChordProgression/CircleOfFifths.svelte'
	import MajorMinorSwitch from '$lib/components/ChordProgression/MajorMinorSwitch.svelte'
	function handlePickTimeSignature(e) {
		timeSignature.set(e.target.innerText)
	}
	let step = 0
</script>

<div class="flex w-[400px] flex-col gap-24 p-8">
	{#if step == 0}
		<div class="flex flex-col">
			Title
			<input bind:value={$title} />
		</div>
	{/if}
	{#if step == 1}
		<div class="flex flex-col">
			Key
			<CircleOfFifths>
				<MajorMinorSwitch />
			</CircleOfFifths>

			<!-- <div>
				<input bind:value={$key.tonic} />
				<input bind:value={$key.mode} />
			</div> -->
		</div>
	{/if}
	{#if step == 2}
		<div class="flex flex-col">
			Time Signature
			<div>
				{#each ['2/2', '3/4', '4/4', '6/8'] as time (time)}
					<button
						class:selected={$timeSignature == time}
						on:click={handlePickTimeSignature}
						class="regular-button m-2">{time}</button
					>
				{/each}
			</div>
		</div>
	{/if}

	<div class="flex justify-around">
		<button
			class="regular-button"
			on:click={() => {
				reset()
				goto('/songs')
			}}>Cancel</button
		>
		<button
			on:click={() => {
				step++
				if (step == 3) {
					initializeSong($title, $key, $timeSignature)
					reset()
					goto('/songs/new')
				}
			}}
			class="regular-button">Let's Pick!</button
		>
	</div>
</div>

<style>
	.selected {
		background-color: var(--primary-color);
		color: white;
		box-shadow: 0px 0px 10px black;
	}
	input {
		border: none;
		border-bottom: 1px solid rgb(178, 177, 177);
	}
</style>
