<script>
	import { mix } from '$lib/stores/audioStore'
	export let instrument
	export let whatFor

	let value = 50
	let startX
	let startValue

	function onPointerDown(event) {
		startX = event.clientX
		startValue = value

		const onMove = (e) => {
			const delta = e.clientX - startX
			const newValue = Math.min(100, Math.max(0, startValue + delta))
			value = newValue
			$mix[instrument][whatFor] = newValue
		}

		const onUp = () => {
			window.removeEventListener('pointermove', onMove)
			window.removeEventListener('pointerup', onUp)
		}

		window.addEventListener('pointermove', onMove)
		window.addEventListener('pointerup', onUp)
	}
</script>

<div class="knob-wrapper">
	<div class="knob" on:pointerdown={onPointerDown}>
		<div class="indicator" style="transform: rotate({(value - 50) * 2.7}deg);"></div>
	</div>
	<!-- <div class="value-label">{Math.round(value)}</div> -->
</div>

<style>
	.knob-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 40px;
		touch-action: none;
		user-select: none;
	}

	.knob {
		position: relative;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: #c6c6c6;
		border: 2px solid #aaa;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: -5px 5px 5px black;
		touch-action: none;
		cursor: ew-resize;
	}

	.indicator {
		position: absolute;
		width: 2px;
		height: 40%;
		background: red;
		top: 10%;
		left: calc(50% - 1px);
		transform: rotate(0deg);
		transform-origin: 50% 100%;
		pointer-events: none;
	}

	.value-label {
		margin-top: 6px;
		font-size: 12px;
		color: white;
	}
</style>
