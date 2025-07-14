<script>
	import { TUNINGS } from '$lib/constants'
	import { parts } from '$lib/stores/songStore'
	import { selectedPart } from '../tabStore'

	$: instrument = $parts[$selectedPart].instrument
</script>

<div class="red h-[100px] w-[20px]" style={`height:${TUNINGS[instrument].length * 20}px`}></div>

<style>
	.selected {
		box-shadow: 0px 0px 5px 1px blue;
		border-radius: 0.25rem;
	}
</style>
