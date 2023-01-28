<script lang="ts">
	import { onMount } from "svelte";

	export let visible: boolean = true;
</script>

{#if visible}
	<div
		class="full container"
		on:click
		on:keypress
	/>

	<div class="full" style="pointer-events: none;">
		<div class="modal">
			<slot />
		</div>
	</div>
{/if}

<style>
	.full {
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.container {
		background-color: black;
		opacity: 0.2;
	}

	.modal {
		pointer-events: all;
		width: 100%;
		padding: 20px 20px;
		background-color: var(--bg-color);
		border-radius: 4px;
		border: 1px solid var(--border-color);
	}

	@media only screen and (min-width: 480px) {
		.modal {
			width: 480px;
		}
	}

	
</style>
