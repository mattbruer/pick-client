<script>
	import Knob from './components/Knob.svelte'
	import Fader from './components/Fader.svelte'

	export let name
	export let instrument
</script>

<div class="flex flex-col items-center">
	<div class="flex flex-col items-center">
		<Knob {instrument} whatFor="balance" />
		<div class="knob-label">Balance</div>
	</div>
	<div class="flex flex-col items-center">
		<Knob />
		<div class="knob-label">Bus1</div>
	</div>
	<div class="flex flex-col items-center">
		<Knob />
		<div class="knob-label">Bus2</div>
	</div>
	<Fader {instrument} />
	<div class="label">{name.toUpperCase()}</div>
</div>

<style>
	.knob-label {
		font-size: x-small;
	}
	.label,
	.knob-label {
		background-color: rgb(237, 221, 202);
		border-radius: 2px;
		color: black;
		padding: 0px 4px;
		margin: 10px 0px;
	}
</style>
