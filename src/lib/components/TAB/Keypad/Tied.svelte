<script>
	import { isTie } from '../tabStore'
</script>

<button class:selected={$isTie} on:click={() => ($isTie = !$isTie)} class="m-1"
	><img alt="tied" src="/tie.png" /></button
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
