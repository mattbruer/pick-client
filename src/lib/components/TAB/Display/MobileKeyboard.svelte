<script>
	import { editMode } from '$lib/stores/generalStore'
	import { onMount } from 'svelte'
	import Keypad from '../Keypad/Keypad.svelte'
	import { parts } from '$lib/stores/songStore'
	import { selectedPart, selectedEvent } from '../tabStore'
	import { TUNINGS } from '$lib/constants'
	import Icon from '@iconify/svelte'
	import { selectedString, selectedFret, selectedDuration } from '../tabStore'

	$: strings = [...TUNINGS[$parts[$selectedPart].instrument]].reverse()

	let originalHeight

	onMount(() => {
		const rootStyles = getComputedStyle(document.documentElement)
		originalHeight = rootStyles.getPropertyValue('--controlbar-height').trim()
		document.documentElement.style.setProperty('--controlbar-height', '12rem')
	})

	let value
	const updateValue = (num) => {
		if (num == 'DEL') {
			value = value.split('')
			value.pop()
			value = value.join('')
			return
		}
		if (value) {
			value += num
		} else {
			value = num
		}

		$selectedFret = value
	}
</script>

<div class="custom-keyboard flex items-center overflow-scroll">
	<div class="flex w-[135px] min-w-[135px] flex-wrap">
		{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'DEL'] as num (num)}
			<button
				on:click={() => updateValue(String(num))}
				class="custom-keyboard-button m-[2px] rounded-xl border text-black"
				class:!w-21={num == 'DEL'}>{num}</button
			>
		{/each}
	</div>
	<div>
		<Keypad />
	</div>

	<div class="mx-2 flex flex-col">
		<div class="flex gap-1">
			{#each strings as string (string)}
				<button
					class="btn h-[40px] w-[40px] bg-white text-black"
					class:selectedString={$selectedString == string}
					on:click={() => {
						$selectedString = string
					}}>{string}</button
				>
			{/each}
		</div>
		<div class="h-[100px] w-[100px] rounded border bg-white text-black">
			{$selectedString}{value}
		</div>
		<div class="flex gap-1">
			<button
				class="btn bg-white text-black"
				on:click={() => {
					$parts[$selectedPart].sequence.push({
						notes: { [$selectedString]: value },
						duration: $selectedDuration
					})
					$parts = $parts
				}}>Enter</button
			>
			<button
				class="flex w-[40px] items-center justify-center rounded bg-white"
				on:click={() => $selectedEvent--}
			>
				<Icon width="20px" color="black" icon="mdi:arrow-left" />
			</button>
			<button
				class="flex w-[40px] items-center justify-center rounded bg-white"
				on:click={() => $selectedEvent++}
			>
				<Icon width="20px" color="black" icon="mdi:arrow-right" />
			</button>
			<div>{$selectedEvent}</div>
		</div>
	</div>

	<button
		class="btn bg-white text-black"
		on:click={() => {
			$editMode = false
			document.documentElement.style.setProperty('--controlbar-height', originalHeight)
		}}>Done</button
	>
</div>

<style>
	.custom-keyboard {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: var(--controlbar-height);
		z-index: 1000;
	}
	.custom-keyboard-button {
		background-color: white;
		height: 40px;
		width: 40px;
	}

	.selectedString {
		box-shadow: 0px 0px 3px red;
		background-color: red;
		color: white;
	}
</style>
