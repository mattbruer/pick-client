<script>
	import { key } from '../../../routes/songs/new-song/initSongStore'
	function switchModes() {
		$key.mode = $key.mode === 'major' ? 'minor' : 'major'
	}
</script>

<div class="switch-container flex gap-2">
	Min
	<label class="switch">
		<input type="checkbox" checked={$key.mode == 'major'} on:change={switchModes} />
		<span class="slider"></span>
	</label>
	Maj
</div>

<style>
	/* The switch container */
	.switch-container {
		background-color: transparent;
		color: white;
	}
	.switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 34px;
		background-color: transparent;
	}

	/* Hide the default checkbox */
	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* The slider (round) */
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc; /* Neutral color */
		transition: 0.4s;
		border-radius: 34px;
		box-shadow:
			0px 0px 5px 2px black,
			0px 0px 1px inset var(--secondary-color);
	}

	/* The circle inside the slider */
	.slider:before {
		position: absolute;
		content: '';
		height: 26px;
		width: 26px;
		border-radius: 50%;
		left: 4px;
		bottom: 4px;
		background-color: var(--secondary-color);
		box-shadow:
			inset 0px 0px 5px 1px white,
			0px 0px 10px black;
		transition: 0.4s;
		border: 1px groove white;
	}

	/* When the checkbox is checked, move the slider */
	input:checked + .slider:before {
		transform: translateX(26px);
	}
</style>
