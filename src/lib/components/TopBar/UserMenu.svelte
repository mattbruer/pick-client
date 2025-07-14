<script>
	import FlyoutButton from '../UI/FlyoutButton/FlyoutButton.svelte'
	import { user } from '$lib/stores/user'
	import { goto } from '$app/navigation'
	import { getAuth, signOut } from 'firebase/auth'
	import Icon from '@iconify/svelte'

	let flyoutOpen = false
	let toggleFlyout = () => {
		flyoutOpen = !flyoutOpen
	}

	function signout() {
		flyoutOpen = false
		signOut(getAuth())
	}
</script>

{#if $user}
	<div class="ml-auto">
		<FlyoutButton {flyoutOpen} {toggleFlyout} panelPosition={{ top: '2rem', right: '10px' }}>
			<button class="trigger" slot="trigger">{$user.name[0].toUpperCase()}</button>

			<div class="panel rounded border bg-white p-4">
				<div>{$user.email}</div>
				<hr />
				<button on:click={signout} class="panel">
					<div class="flex gap-4">
						<Icon width="20px" icon="lets-icons:sign-out" />
						<div>Sign Out</div>
					</div>
				</button>
				<a href="/settings" on:click={toggleFlyout}>
					<div class="flex gap-4">
						<Icon width="20px" icon="mdi:settings" />
						<div>Settings</div>
					</div>
				</a>
				<a href="/subscribe" on:click={() => (flyoutOpen = false)}>
					<div class="flex gap-4">
						<Icon width="20px" icon="mdi:dollar" />
						<div>$$</div>
					</div>
				</a>
			</div>
		</FlyoutButton>
	</div>
{:else}
	<div class="ml-auto">
		<button
			on:click={() => {
				goto('/auth')
			}}>Log In/Sign Up</button
		>
	</div>
{/if}

<style>
	.trigger {
		border-radius: 50%;
		box-shadow: 0px 0px 5px black;
		height: 2.5rem;
		width: 2.5rem;
		background-color: white;
		color: black;
	}
	.trigger:hover {
		box-shadow: 0px 0px 10px black;
	}
	/* .panel {
		box-shadow: 0px 0px 5px black;
	} */
</style>
