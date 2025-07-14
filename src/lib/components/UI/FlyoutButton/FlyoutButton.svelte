<script>
	import { onMount } from 'svelte'
	export let buttonText
	export let flyoutOpen = false
	export let toggleFlyout
	export let panelPosition = { top: 0, left: 0, right: 0 }

	let trigger
	let triggerWidth
	let container

	function handleClickOutside(e) {
		if (flyoutOpen && !container.contains(e.target)) {
			toggleFlyout(false)
		}
	}

	onMount(() => {
		triggerWidth = trigger.offsetWidth
		window.addEventListener('click', handleClickOutside)
		return () => window.removeEventListener('click', handleClickOutside)
	})
</script>

<div class="relative flex items-center" bind:this={container}>
	<button bind:this={trigger} on:click={toggleFlyout}>
		<slot name="trigger">
			<!-- fallback trigger -->
			<div class="relative">{buttonText}</div>
		</slot>
	</button>

	<div
		class="absolute text-black"
		class:hidden={!flyoutOpen}
		style={`top:${panelPosition.top}; right:calc(${panelPosition.right} + ${triggerWidth}px); left:calc(${panelPosition.left} + ${triggerWidth}px)`}
	>
		<slot />
	</div>
</div>
