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

	<div class="menu flex flex-col gap-4 rounded border p-4">
		<a href="/songs" on:click={toggleFlyout}>Songs</a>
		<a href="/songs" on:click={toggleFlyout}>Metronome</a>
		<a href="https://tuner-online.com/" on:click={toggleFlyout}>Tuner</a>
		<a href="/songs" on:click={toggleFlyout}>Bulletin </a>
	</div>
</FlyoutButton>

<style>
	.menu {
		background-color: white;
		box-shadow: 0px 0px 20px black;
	}
</style>
