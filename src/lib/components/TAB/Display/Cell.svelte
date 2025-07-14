<script>
	import { melody } from '$lib/stores/songStore'
	import { horizontalSpacing, selectedColumn, selectedCell, selectedDuration } from '../tabStore'
	export let fret
	export let column
	export let row

	const multiplier = { sixteenthNote: 1, eighthNote: 2, quarterNote: 4, halfNote: 8, wholeNote: 16 }
</script>

<button
	on:click={() => {
		$selectedColumn = column
		$selectedCell = row
		$selectedDuration = $melody[$selectedColumn].duration
	}}
	class:selected={$selectedColumn == column && $selectedCell == row}
	class="cell"
	style={`width: ${$horizontalSpacing * multiplier[$melody[column].duration]}px`}
>
	{$melody[column].notes[row]}
</button>

<style>
	.cell {
		height: 25px;
		display: flex;
		/* padding-left: 0.5rem; */
		position: relative;
		font-size: 1rem;
		/* justify-content: center;
		align-items: center; */
	}

	.cell::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 0;
		width: 100%;
		height: 1px;
		background: black;
		transform: translateY(-50%);
	}
	.selected {
		background-color: rgba(0, 0, 255, 0.214);
		color: red;
		box-shadow: 0px 0px 1px 1px blue;
	}
</style>
