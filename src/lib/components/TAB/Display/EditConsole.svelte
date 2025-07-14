<script>
	import Keypad from '../Keypad/Keypad.svelte'
	import { selectedCell, selectedColumn } from '../tabStore'
	import { onMount } from 'svelte'
	let inputEl

	onMount(() => {
		inputEl.focus()
	})
</script>

<div class="custom-keyboard">
	<div class="flex items-center">
		<div class="w-6 text-center">{$selectedCell}</div>
		<input
			id="fret-input"
			type="text"
			bind:this={inputEl}
			pattern="[0-9]*"
			on:keydown={(e) => {
				const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab']
				if (!/^\d$/.test(e.key) && !allowed.includes(e.key)) {
					e.preventDefault()
				}
			}}
		/>

		<button
			on:click={() => {
				$selectedCell = null
				$selectedColumn = null
			}}>Done</button
		>
	</div>

	<Keypad />
</div>

<style>
	.custom-keyboard {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 50%;
		z-index: 1000;
		background-color: aquamarine;
	}
</style>
