<script>
	import { onMount } from 'svelte'
	import { tempo } from '$lib/stores/audioStore'
	import { play, stop } from '$lib/audio/audioFunctions/playback'
	import { getAudioContext } from '$lib/audio/audioContext'
	import { chordProgression } from '$lib/stores/songStore'

	let ctx
	let recording = false
	let playing = false
	let recorderNode
	let micStream
	let audioBuffer = null
	let sourceNode

	let recordStartTime
	let secondsPerLoop
	let interval
	let passes = 0

	const countInBars = 2

	onMount(async () => {
		ctx = getAudioContext()
		await ctx.audioWorklet.addModule('/recorder-worklet-processor.js')
	})

	function scheduleClick(time, isDownbeat = false) {
		const osc = ctx.createOscillator()
		const gain = ctx.createGain()

		osc.type = 'square'
		osc.frequency.setValueAtTime(isDownbeat ? 2000 : 1200, time)
		gain.gain.setValueAtTime(0.3, time)
		gain.gain.linearRampToValueAtTime(0, time + 0.05)

		osc.connect(gain).connect(ctx.destination)
		osc.start(time)
		osc.stop(time + 0.05)
	}

	function scheduleCountIn(startTime) {
		const secondsPerBeat = 60 / $tempo
		for (let i = 0; i < countInBars * 4; i++) {
			const t = startTime + i * secondsPerBeat
			scheduleClick(t, i % 4 === 0)
		}
	}

	let recordedChunks = []
	async function startRecording() {
		recordedChunks = []
		audioBuffer = null

		if (recorderNode) {
			recorderNode.port.onmessage = null
			recorderNode.disconnect()
			recorderNode = null
		}

		if (micStream) {
			micStream.getTracks().forEach((t) => t.stop())
			micStream = null
		}

		micStream = await navigator.mediaDevices.getUserMedia({
			audio: {
				channelCount: 1,
				sampleRate: 44100,
				echoCancellation: false,
				noiseSuppression: false,
				autoGainControl: false
			}
		})

		const micSource = ctx.createMediaStreamSource(micStream)

		recorderNode = new AudioWorkletNode(ctx, 'recorder-worklet', {
			processorOptions: { sampleRate: ctx.sampleRate }
		})

		micSource.connect(recorderNode)
		// micSource.connect(ctx.destination)

		// THIS IS CRITICAL
		recorderNode.port.onmessage = (event) => {
			if (event.data.eventType === 'buffer') {
				recordedChunks.push(event.data.buffer)
			}
		}

		const now = ctx.currentTime
		const countInSeconds = countInBars * 4 * (60 / $tempo)
		const startTime = now + 0.1
		recordStartTime = startTime + countInSeconds

		//todo once time sigs get involved this will need work
		const beatsPerLoop = $chordProgression.length * 2
		console.log('beatsPerLoop', beatsPerLoop)
		secondsPerLoop = beatsPerLoop * (60 / $tempo)

		recorderNode.port.postMessage({
			type: 'start',
			startTime: recordStartTime
		})

		recording = true

		scheduleCountIn(startTime)
		play(recordStartTime)

		setTimeout(() => {
			interval = setInterval(() => {
				passes++
			}, secondsPerLoop * 1000)
		}, countInSeconds * 1000)
	}

	function stopRecording() {
		recorderNode.port.postMessage({ type: 'stop' })
		recording = false
		stop()
		clearInterval(interval)

		if (micStream) micStream.getTracks().forEach((t) => t.stop())
		if (recorderNode) recorderNode.disconnect()

		// Merge the chunks into one big Float32Array
		const totalLength = recordedChunks.reduce((sum, chunk) => sum + chunk.length, 0)
		const fullBuffer = new Float32Array(totalLength)
		let offset = 0
		for (const chunk of recordedChunks) {
			fullBuffer.set(chunk, offset)
			offset += chunk.length
		}

		// Create final audioBuffer
		audioBuffer = ctx.createBuffer(1, fullBuffer.length, ctx.sampleRate)
		audioBuffer.copyToChannel(fullBuffer, 0)

		recordedChunks = [] // Reset
	}

	async function toggleRecord() {
		if (!recording) {
			await startRecording()
		} else {
			stopRecording()
		}
	}

	function togglePlayback() {
		if (!audioBuffer) return

		if (!playing) {
			const startTime = ctx.currentTime + 0.1

			sourceNode = ctx.createBufferSource()
			sourceNode.buffer = audioBuffer
			sourceNode.connect(ctx.destination)
			sourceNode.start(startTime)

			play(startTime)
			playing = true

			sourceNode.onended = () => {
				playing = false
				stop()
			}
		} else {
			if (sourceNode) {
				sourceNode.stop()
				sourceNode.disconnect()
			}
			stop()
			playing = false
		}
	}
</script>

<div>
	<button on:click={toggleRecord} class="btn mx-2 w-24 bg-white text-black">
		{recording ? 'STOP' : 'RECORD'}
	</button>

	<button
		on:click={togglePlayback}
		class="btn mx-2 w-24 bg-white text-black"
		disabled={!audioBuffer}
	>
		{playing ? 'STOP' : 'PLAY'}
	</button>
</div>
<div>
	{#each Array.from({ length: passes }) as pass, i (i)}
		<button class="btn bg-white text-black">Pass {i + 1}</button>
	{/each}
</div>
