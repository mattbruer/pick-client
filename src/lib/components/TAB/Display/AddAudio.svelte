<script>
	export let close

	let partName = ''

	const addNewPart = () => {
		close()
	}
</script>

<div>
	<div class="mb-4 text-black"></div>
	<div class="text-black">Track Name:</div>
	<input class="text-black" type="text" bind:value={partName} />

	<div class="mt-4 flex gap-2">
		<button class="btn mt-4 text-black" on:click={() => close()}>Cancel</button>
		<button class="btn mt-4 text-black" on:click={addNewPart}>Let's Pick!</button>
	</div>
</div>
