<script lang="ts">
	export let message = '';
	export let size: number = 12;
	export let style = '';
</script>

{#if message}
<div style="font-size: {size}px; {style}">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="height: {size / 0.6}px; margin-right: {size/3}px;">
		<g stroke-width="0" />
		<g stroke-linecap="round" stroke-linejoin="round" />
		<g>
			<path
				d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
			/>
		</g>
	</svg>
	<span>{message}</span>
</div>
{/if}


<style>
	div {
		color: var(--error-color);
		display: flex;
		align-items: center;
	}

	div svg {
		fill: var(--error-color);
	}
</style>
