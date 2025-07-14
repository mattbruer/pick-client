<script>
	import { isRest } from '../tabStore'
</script>

<button class:selected={$isRest} on:click={() => ($isRest = !$isRest)} class="m-1"
	><img alt="rest" src="/rest.png" /></button
>

<style>
	button,
	img {
		border-radius: 10px;
	}
	button {
		box-shadow: 0px 0px 2px black;
	}

	.selected {
		box-shadow: 0px 0px 4px red;
	}
</style>
