<script>
	import { goto } from '$app/navigation'

	const selectOption = () => {
		goto('/subscribe/stripe')
	}
</script>

<button class="option" on:click={selectOption}>
	<div>Lifetime Supply</div>
	<div class="flex gap-8">
		<div class="flex flex-col">
			<div>Basic</div>
			<div>$200</div>
		</div>
		<div class="divider"></div>
		<div>
			<div>Pro</div>
			<div>$400</div>
		</div>
	</div>

	<div>Pay once and never think about it again!</div>
	<div>Learn More...</div>
</button>

<!-- TODO - DRY STYLES -->
<style>
	.option {
		height: 20rem;
		width: 18rem;
		box-shadow: 0px 5px 15px var(--secondary-color);
		padding: 2rem;
		margin: 2rem;
		border-radius: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}
	.divider {
		width: 1px;
		background-color: grey;
	}
</style>
