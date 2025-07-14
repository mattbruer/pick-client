<script>
	export let submit
</script>

<form class="flex flex-col gap-4" action="" on:submit={submit}>
	<input name="email" type="email" placeholder="email" />
	<input name="password" type="password" placeholder="password" />
	<input name="password" type="password" placeholder="verify password" />
	<button type="submit">CREATE ACCOUNT</button>
</form>

<!-- TODO - DRY -->
<style>
	input {
		padding: 10px;
		color: black;
		border-bottom: 1px solid grey;
	}
</style>
