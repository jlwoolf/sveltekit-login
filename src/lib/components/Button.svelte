<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' | null | undefined = null;
	export let formaction: string | null = null;
</script>

<button {type} class="colored-button" {formaction} on:click on:submit>
	<span class="button-text"><slot/></span>
</button>

<style>
	button {
		padding: 8px 12px;
		border: 0px;
		border-radius: 4px;
	}

	.colored-button {
		cursor: pointer;
		color: var(--bg-color);
		background-color: var(--special-color);
		position: relative;
	}

	.colored-button::before {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;

		content: '';
		background-color: black;
		opacity: 0%;
		border-radius: 4px;
	}

	.colored-button:hover::before {
		opacity: 10%;
	}

	.colored-button:focus-visible {
		outline: 1px solid var(--special-color);
		outline-offset: 2px;
	}

	.button-text {
		font-weight: 600;
		font-size: 16px;
	}
</style>
