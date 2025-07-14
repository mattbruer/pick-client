<script>
	import { nanoid } from 'nanoid'
	import NavMenu from './NavMenu.svelte'
	import PageTitle from './PageTitle.svelte'
	import UserMenu from './UserMenu.svelte'
</script>

<div class="top-bar fixed flex w-screen items-center px-4">
	<!-- todo - replace true with $user when that is set up -->
	{#if true}
		<NavMenu />
	{/if}
	<PageTitle />
	<UserMenu />
</div>

<style>
	.top-bar {
		height: var(--topbar-height);
		box-shadow: 0px 0px 10px var(--primary-color);
		background-color: var(--primary-color);
		color: white;
		z-index: 1000;
	}
</style>
