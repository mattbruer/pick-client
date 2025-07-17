<script>
	import { selectedDuration, isRest } from '../tabStore'

	export let note

	const selectDuration = () => {
		if (['rest', 'tie', 'dot'].includes(note)) {
			if (note == 'rest') {
				$isRest = !$isRest
			}
		} else {
			$selectedDuration = note
		}
		// document.getElementById('fret-input').focus()
	}
</script>

<button
	on:click={selectDuration}
	class={`h-[40px] min-w-[${note == 'rest' ? 80 : 40}px] m-1`}
	class:selected={$selectedDuration == note || (note == 'rest' && $isRest)}
>
	<img alt={note} src={`/${note}.png`} />
</button>

<style>
	button,
	img {
		border-radius: 10px;
	}
	button {
		box-shadow: 0px 0px 2px black;
	}
	.selected {
		box-shadow: 0px 0px 4px 2px red;
	}
</style>
