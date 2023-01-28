<script lang="ts">
	export let option = '';
	export let formactionPrimary = '';
	export let formactionSecondary = '';
	export let primary = 'Next';
</script>

<div>
	<div class="container">
		<button type="submit" class="colored-button" formaction={formactionPrimary}>
			<span class="button-text">{primary}</span>
		</button>
		{#if option}
			<button
				on:click
				class="invisible-button"
				type={formactionSecondary ? 'submit' : 'button'}
				formaction={formactionSecondary}
			>
				<span class="option">{option}</span>
			</button>
		{/if}
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		margin-top: 24px;
		position: relative;
	}

	.option {
		font-weight: 600;
		font-size: 16px;
		color: var(--special-color);
		cursor: pointer;
	}

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
