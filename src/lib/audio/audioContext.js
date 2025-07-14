let audioCtx

export function getAudioContext() {
	if (!audioCtx) {
		audioCtx = new (window.AudioContext || window.webkitAudioContext)({
			latencyHint: 'interactive',
			sampleRate: 44100
		})
	}
	return audioCtx
}
