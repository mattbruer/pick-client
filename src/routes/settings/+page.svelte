<script>
	function changePrimaryColor(e) {
		document.documentElement.style.setProperty('--primary-color', e.target.value)
	}
</script>

<div>
	<label for="primary-color">Primary Color </label>
	<input name="primary-color" type="color" on:input={changePrimaryColor} />
</div>
