<script>
	import { isPlaying, tempo } from '$lib/stores/audioStore'
	import { play, stop } from '../../audio/audioFunctions/playback'
	import Record from '../Record/Record.svelte'

	const togglePlay = () => {
		$isPlaying ? stop() : play()
		$isPlaying = !$isPlaying
	}
</script>

<div class="playback-controls gap-2">
	<div>
		<div>TEMPO: {$tempo}</div>
		<input
			type="range"
			value={$tempo}
			max="300"
			on:input={(e) => tempo.setTempo(+e.target.value)}
		/>
	</div>
	<button class="btn mx-2 bg-white text-black" on:click={togglePlay}
		>{$isPlaying ? 'STOP' : 'PLAY'}</button
	>
	<!-- <Record /> -->
</div>

<style>
	.playback-controls {
		width: 100%;

		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
