<script>
	export let open = false
</script>

<button
	class="flex flex-col items-center justify-center gap-1.5"
	aria-label={open ? 'Close menu' : 'Open menu'}
>
	<div class="bar h-0.5 w-8 rounded transition-transform" class:top-open={open}></div>
	<div class="bar h-0.5 w-8 rounded transition-opacity" class:middle-open={open}></div>
	<div class="bar h-0.5 w-8 rounded transition-transform" class:bottom-open={open}></div>
</button>

<style>
	.bar {
		transition: all 0.3s ease;
		transform-origin: center;
		background-color: white;
	}

	.top-open {
		transform: translateY(8px) rotate(45deg);
	}

	.middle-open {
		opacity: 0;
	}

	.bottom-open {
		transform: translateY(-8px) rotate(-45deg);
	}
</style>
