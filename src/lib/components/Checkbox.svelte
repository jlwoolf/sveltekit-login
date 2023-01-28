<script lang="ts">
    export let checked: boolean = false;
    export let label = '';
</script>

<div class="checkbox-container">
	<label class="checkbox-label" style="position: relative;">
		<input type="checkbox" name="show-password" bind:checked />
		{label}
	</label>
</div>

<style>
	.checkbox-container {
		display: flex;
	}

	.checkbox-label {
		margin-top: 12px;
		font-size: 14px;
		font-weight: 400;
		color: var(--text-soft-color);
		display: grid;
		grid-template-columns: 16px auto;
		gap: 16px;

		cursor: pointer;
	}

	input[type='checkbox'] {
		appearance: none;
		margin: 0px;
		font: inherit;
		color: currentColor;
		width: 16px;
		height: 16px;
		border: 2px solid currentColor;
		border-radius: 2px;
		transform: translateY(0px);
		display: grid;
		place-content: center;
	}

	input[type='checkbox']::before {
		content: '';
		width: 8px;
		height: 2px;

		transform: scale(0) translate(-1.5px, 3px) rotate(50deg);
		transition: 120ms transform ease-in-out;
		background-color: var(--text-soft-color);
	}

	input[type='checkbox']::after {
		content: '';
		width: 12px;
		height: 2px;

		transform: scale(0) translate(2px, -0.5px) rotate(-50deg);
		transition: 120ms transform ease-in-out;
		background-color: var(--text-soft-color);
	}

	input[type='checkbox']:checked {
		background-color: var(--special-color);
		border-color: var(--special-color);
	}

	input[type='checkbox']:checked::before {
		transform: scale(1) translate(-1.5px, 3px) rotate(50deg);
	}

	input[type='checkbox']:checked::after {
		transform: scale(1) translate(2px, -0.5px) rotate(-50deg);
	}

	input[type='checkbox']:focus-visible {
		outline: 1px solid var(--special-color);
	}
</style>
