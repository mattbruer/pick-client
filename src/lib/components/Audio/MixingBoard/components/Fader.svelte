<script>
	import { mix } from '$lib/stores/audioStore'

	export let instrument
</script>

<div>
	<div>{$mix[instrument].volume}</div>
	<div class="fader-container rounded">
		<input type="range" bind:value={$mix[instrument].volume} />
	</div>
</div>

<style>
	.fader-container {
		box-shadow: 0px 0px 5px inset black;
		width: 30px;
		height: 150px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #c8c6c6;
		border: 2px solid grey;
	}
	input {
		-webkit-appearance: none;
		appearance: none;
		width: 150px;
		height: 4px;
		background: rgb(65, 65, 65);
		transform: rotate(-90deg);
		border: 4px groove black;
	}
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		background-color: rgba(254, 0, 0, 0.838);
		box-shadow: -5px -5px 5px black;
		width: 10px;
		height: 40px;
		border: none;
		border-radius: 3px;
		position: relative;
	}
</style>
