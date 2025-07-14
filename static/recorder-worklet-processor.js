class RecorderWorkletProcessor extends AudioWorkletProcessor {
	constructor(options) {
		super()
		this._sampleRate = options.processorOptions.sampleRate || sampleRate // fallback
		this._buffer = []
		this._recording = false
		this._startTime = 0
		this._chunkSize = 2048

		this.port.onmessage = (event) => {
			if (event.data.type === 'start') {
				this._startTime = event.data.startTime
				this._recording = false
			} else if (event.data.type === 'stop') {
				this._recording = false
				this.flushBuffer()
			}
		}
	}

	process(inputs) {
		const input = inputs[0]
		if (!input || input.length === 0) return true

		const now = currentTime
		if (!this._recording && now >= this._startTime) {
			this._recording = true
		}

		if (!this._recording) return true

		const inputChannel = input[0]
		for (let i = 0; i < inputChannel.length; i++) {
			this._buffer.push(inputChannel[i])
		}

		if (this._buffer.length >= this._chunkSize) {
			this.flushBuffer()
			this._buffer = []
		}

		return true
	}

	flushBuffer() {
		if (this._buffer.length === 0) return

		this.port.postMessage({
			eventType: 'buffer',
			buffer: new Float32Array(this._buffer),
			sampleRate: this._sampleRate
		})
		this._buffer = [] // Clear after sending
	}
}

registerProcessor('recorder-worklet', RecorderWorkletProcessor)
