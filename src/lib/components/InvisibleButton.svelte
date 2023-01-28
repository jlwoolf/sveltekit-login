<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' | null | undefined = null;
	export let formaction: string | null = null;
</script>

<button on:click on:submit class="invisible-button" {type} {formaction}>
	<span class="button-text"><slot/></span>
</button>

<style>
	button {
		padding: 8px 12px;
		border: 0px;
		border-radius: 4px;
	}

	.invisible-button {
		height: 100%;
		position: absolute;
		background-color: transparent;
		left: -12px;
		top: 0px;
	}

	.invisible-button:focus-visible {
		background-color: var(--subtle-color);
		outline: 1px solid var(--special-color);
		outline-offset: 2px;
	}

    .button-text {
		font-weight: 600;
		font-size: 16px;
		color: var(--special-color);
		cursor: pointer;
	}
</style>
