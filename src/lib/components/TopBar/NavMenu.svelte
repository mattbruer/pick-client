<script>
	import FlyoutButton from '../UI/FlyoutButton/FlyoutButton.svelte'
	import Hamburger from '../UI/Hamburger.svelte'

	let flyoutOpen = false
	let toggleFlyout = () => {
		flyoutOpen = !flyoutOpen
	}
</script>

<FlyoutButton {flyoutOpen} {toggleFlyout} panelPosition={{ top: '2rem', left: '10px' }}>
	<Hamburger open={flyoutOpen} slot="trigger" />

	<div class="rounded border bg-white p-4">
		<a href="/songs" on:click={toggleFlyout}>Songs</a>
	</div>
</FlyoutButton>

<style></style>
