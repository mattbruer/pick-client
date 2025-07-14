<script>
	import '../app.css'
	import { onMount } from 'svelte'
	import { init } from '$lib/init'
	import TopBar from '$lib/components/TopBar/TopBar.svelte'

	onMount(() => {
		init()
	})

	let { children } = $props()
</script>

<TopBar />
<div class="children" id="children">
	{@render children()}
</div>

<style>
	:global(body) {
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
	}

	.children {
		margin-top: calc(var(--topbar-height));
		height: calc(100dvh - var(--topbar-height) - var(--controlbar-height));
		min-width: 100%;
		overflow-y: auto;
	}
</style>
