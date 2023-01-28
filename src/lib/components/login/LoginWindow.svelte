<script lang="ts">
	import { slide } from '$lib/transition';
	import LoadingBar from '../LoadingBar.svelte';

	export let duration = 200;
	export let disabled = false;
	export let progress = false;
</script>

<div class="card-container">
	<div
		class="card-internals"
		in:slide={{ delay: duration, duration: duration }}
		out:slide={{ reverse: true, duration: duration }}
	>
		<slot />
	</div>

	{#if disabled}
		<div class="disabled-container" />
	{/if}

	{#if progress}
		<div class="progress-bar-container">
			<LoadingBar indeterminate />
		</div>
	{/if}
</div>

<style>
	.card-internals {
		padding: 48px 40px 40px;
		height: 100%;
	}

	.card-container {
		position: relative;
		width: 100%;
		height: 100%;
		border: 1px solid var(--border-color);
		border-radius: 4px;
	}

	.disabled-container {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 4px;
		background-color: black;
		top: 0px;
		left: 0px;
		opacity: 20%;
	}

	.progress-bar-container {
		position: absolute;
		width: 100%;
		top: 0px;
		left: 0px;
	}
</style>
