<script>
	import {
		title as initTitle,
		key as initKey,
		timeSignature as initTimeSignature
	} from '../../../routes/songs/new-song/initSongStore'
	import { title, key, timeSignature } from '$lib/stores/songStore'
	import { user } from '$lib/stores/user'
</script>

{#if $user}
	<div class="absolute left-1/2 -translate-x-1/2 transform">
		<div class="flex flex-col">
			<div class="text-center">{$initTitle || $title || 'PickPal or Whatever'}</div>
			<div class="flex justify-center gap-4">
				<div>
					{$initKey?.tonic || $key?.tonic}
					{$initKey?.mode || $key?.mode}
				</div>
				<div>
					{$initTimeSignature || $timeSignature}
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="absolute left-1/2 -translate-x-1/2 transform">PickPal or Whatever</div>
{/if}
