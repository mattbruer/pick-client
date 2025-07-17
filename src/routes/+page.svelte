<script>
	import { onMount } from 'svelte'

	let originalHeight

	onMount(() => {
		const rootStyles = getComputedStyle(document.documentElement)
		originalHeight = rootStyles.getPropertyValue('--controlbar-height').trim()
		document.documentElement.style.setProperty('--controlbar-height', '0rem')

		return () => {
			document.documentElement.style.setProperty('--controlbar-height', originalHeight)
		}
	})
</script>

<h1 class="text-center text-3xl">Welcome to PickPal or Whatever</h1>
<div class="flex h-full w-full items-center justify-center">
	<img src="/landing.png" alt="hero" />
</div>

<style>
	img {
		max-width: 100%;
		height: auto;
		display: block;
	}
</style>
