<script>
	import { isDotted } from '../tabStore'
</script>

<button class:selected={$isDotted} on:click={() => ($isDotted = !$isDotted)} class="m-1"
	><img alt="dot" src="/dot.png" /></button
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
