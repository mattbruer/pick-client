<script>
	import { TUNINGS } from '$lib/constants'
	import { parts } from '$lib/stores/songStore'
	import { selectedPart } from '../tabStore'
	import { horizontalSpacing } from '../tabStore'
	import { selectedEvent } from '../tabStore'

	export let event
	export let position

	const tops = { guitar: { E: 5, A: 4, D: 3, G: 2, B: 1, e: 0 }, mando: { G: 0, D: 1, A: 2, E: 3 } }

	const widths = {
		sixteenthNote: $horizontalSpacing,
		eighthNote: 2 * $horizontalSpacing,
		quarterNote: 4 * $horizontalSpacing,
		halfNote: 8 * $horizontalSpacing,
		wholeNote: 16 * $horizontalSpacing
	}

	$: part = $parts[$selectedPart]
	$: notes = event.notes
</script>

<div
	class:selected={position == $selectedEvent}
	class="relative flex h-[100px] w-[36px]"
	style={`height:${TUNINGS[part.instrument].length * 20}px;min-width: ${widths[event.duration]}px;`}
>
	{#each Object.keys(notes) as note (note)}
		<div class="absolute" style={`top:${tops[part.instrument][note] * 20}px`}>
			{notes[note]}
		</div>
	{/each}
</div>

<style>
	.selected {
		border-radius: 0.25rem;
		background-color: rgba(202, 202, 225, 0.618);
	}
</style>
