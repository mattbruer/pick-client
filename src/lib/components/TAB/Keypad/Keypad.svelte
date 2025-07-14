<script>
	import Button from './Button.svelte'
	import Dotted from './Dotted.svelte'
	import Rest from './Rest.svelte'
	import Tied from './Tied.svelte'

	const buttons = ['wholeNote', 'halfNote', 'quarterNote', 'eighthNote', 'sixteenthNote']
</script>

<div class="flex flex-grow flex-col items-center">
	<div class="flex flex-col">
		<div class="flex justify-center">
			{#each buttons as button (button)}
				<Button note={button} />
			{/each}
		</div>

		<div class="flex">
			<Rest />
			<Dotted />
			<Tied />
		</div>
	</div>
</div>
