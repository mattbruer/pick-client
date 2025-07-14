<script>
	import { goto } from '$app/navigation'
	import { userLoggedIn } from '$lib/stores/user'
	import CreateAccountForm from './components/CreateAccountForm.svelte'
	import SignInForm from './components/SignInForm.svelte'
	//todo cannot remove the following import because it needs to init the app somehow
	import { auth } from '$lib/firebase'
	import { handleSignIn, handleCreateAccount } from './helpers'

	let isNewUser = false

	$: if ($userLoggedIn) {
		goto('/')
	}
	const submit = (e) => {
		e.preventDefault()
		const formData = new FormData(e.target)
		const email = formData.get('email')
		const password = formData.get('password')

		isNewUser ? handleCreateAccount(email, password) : handleSignIn(email, password)
	}
</script>

<div
	class="flex h-full w-full flex-col items-center justify-center gap-4 border border-black pb-[50px]"
>
	{#if isNewUser}
		<CreateAccountForm {submit} />
		<button on:click={() => (isNewUser = false)}>Already have an account?</button>
	{:else}
		<SignInForm {submit} />
		<button on:click={() => (isNewUser = true)}>Don't have an account?</button>
		<button on:click={alert('todo')}>Forgot password?</button>
	{/if}
</div>
