<script>
	import { key } from '../../../routes/songs/new-song/initSongStore'

	import { onMount } from 'svelte'

	onMount(() => {
		$key = { tonic: 'C', mode: 'major' }
	})
	const keys = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F']

	const radius = 100

	function getButtonPosition(index, total) {
		const angle = (index / total) * 2 * Math.PI - Math.PI / 2
		const x = radius * Math.cos(angle)
		const y = radius * Math.sin(angle)
		return { x, y }
	}

	let keyIndex = 0
	function selectKey(k) {
		const split = k.split('/')
		// keyIndex = split.includes(key.tonic) ? (split.indexOf(key.tonic) === 0 ? 1 : 0) : 0
		$key.tonic = split[keyIndex] ?? split[0]
	}
</script>

<div
	class="circle relative flex h-[250px] w-[250px] items-center justify-center rounded-full border-2 border-white bg-[var(--secondary-color)] shadow-[0px_0px_5px_5px_black]"
>
	{#each keys as k, i (k)}
		{@const { x, y } = getButtonPosition(i, keys.length)}
		<button
			class="absolute h-15 w-15 -translate-x-1/2 -translate-y-1/2 rounded-full"
			class:selected={k.split('/').includes($key.tonic)}
			style="left: {125 + x}px; top: {125 + y}px"
			on:click={() => selectKey(k)}
		>
			{k}
		</button>
	{/each}
	<slot />
</div>

<style>
	.circle {
		background-color: var(--primary-color);
		color: white;
	}
	button:hover {
		font-size: larger;
	}

	.selected {
		background-color: white;
		font-size: larger;
		font-weight: 600;
		box-shadow:
			0px 0px 5px black,
			0px 0px 5px inset black;
		transition: all 0.5s ease;
		color: black;
	}
</style>
