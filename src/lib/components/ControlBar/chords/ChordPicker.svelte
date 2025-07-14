<script>
	import { key } from '$lib/stores/songStore'
	import { song } from '$lib/stores/songStore'
	import { selectedChordInput } from '$lib/components/TAB/tabStore'
	import { lookup } from '$lib/init'
	import { category } from '$lib/stores/chordProgressionStore'

	$: chords = lookup.major.filter((ch) => {
		return ch.key == $key.tonic && ch.category == $category
	})
</script>

<div class="flex overflow-scroll">
	{#each chords as chord (chord)}
		<button
			title={JSON.stringify(chord)}
			on:click={() =>
				($song.measures[$selectedChordInput.measureId].chords[$selectedChordInput.position] =
					chord)}
			class="btn m-1 !h-[80px] min-w-[100px] bg-white text-black"
		>
			<div>
				{chord?.roman?.replaceAll('b', '♭')}
			</div>
			<div>
				{chord?.scale[0]?.replaceAll('b', '♭')}{chord?.suffix?.replaceAll('b', '♭')}
			</div>
		</button>
	{/each}
</div>
