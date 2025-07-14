<script>
	import { root, accidental, chordType } from './customChordStore'
	import { selectedChordInput } from '$lib/components/TAB/tabStore'
	import { song } from '$lib/stores/songStore'
</script>

<div class="red flex w-full flex-col">
	<div class="flex gap-8 overflow-scroll">
		<div class="flex min-w-fit gap-1">
			{#each ['A', 'B', 'C', 'D', 'E', 'F', 'G'] as r (r)}
				<button
					on:click={() => {
						$root = r
					}}
					class="btn w-[40px] bg-white text-black">{r}</button
				>
			{/each}
		</div>
		<div class="flex min-w-fit gap-1">
			{#each ['#', 'b', 'nat'] as option (option)}
				<button on:click={() => ($accidental = option)} class="btn min-w-[40px] bg-white text-black"
					>{option}</button
				>
			{/each}
		</div>
		<div class="flex min-w-fit gap-1">
			{#each ['Maj', 'min', 'Maj7', 'min7', '7', 'dim', 'aug'] as option (option)}
				<button on:click={() => ($chordType = option)} class="btn min-w-[40px] bg-white text-black"
					>{option}</button
				>
			{/each}
		</div>
	</div>
	<div>{$root}{$accidental == 'nat' ? '' : $accidental}{$chordType}</div>
	<button
		on:click={() => {
			$song.measures[$selectedChordInput.measureId].chords[$selectedChordInput.i] =
				`${$root}${$accidental == 'nat' ? '' : $accidental}${$chordType}`
		}}>done</button
	>
</div>
