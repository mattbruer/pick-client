<script>
	import { user } from '$lib/stores/user'
	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

	const purchasePlan = async () => {
		const response = await fetch(`${API_BASE_URL}/api/stripe/create-checkout-session`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				customerEmail: $user.email,
				priceId: 'price_1RMtLYRandYd5kB2agDQ9MDQ',
				userId: $user._id
			})
		})
		const data = await response.json()

		if (data.url) {
			window.location.href = data.url
		} else {
			console.error('No URL in response:', data)
		}
	}
</script>

<div>STRIPE WILL TAKE THINGS FROM HERE.</div>
<div>Thank you for your business.</div>

<button on:click={purchasePlan}>purchase</button>
