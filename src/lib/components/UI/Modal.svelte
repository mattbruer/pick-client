<script>
	import { onMount, onDestroy } from 'svelte'

	export let close

	function handleBackgroundClick(event) {
		if (event.target === event.currentTarget) {
			close()
		}
	}

	function handleResize() {
		// This triggers a minor reflow; can help realign modal
		window.scrollTo(0, 0)
	}

	onMount(() => {
		window.addEventListener('resize', handleResize)
	})

	onDestroy(() => {
		window.removeEventListener('resize', handleResize)
	})
</script>

<div class="modal-backdrop" on:click={handleBackgroundClick}>
	<div class="modal-content">
		<slot />
	</div>
</div>

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background-color: rgba(128, 128, 128, 0.75);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		height: 100dvh;
	}

	.modal-content {
		background: white;
		padding: 2rem;
		border-radius: 0.5rem;
		max-width: 90%;
		max-height: 90%;
		overflow: auto;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
	}
</style>
