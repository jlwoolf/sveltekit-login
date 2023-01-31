<script lang="ts">
	export let checked: boolean = false;
	export let size: string = '16px';
</script>

<div class="checkbox-container" style="--size: {size}">
	<label class="checkbox-label" style="--size: {size}">
		<input type="checkbox" name="show-password" bind:checked style="--size: {size}" />
		<slot />
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
		grid-template-columns: var(--size) auto;
		align-items: center;
		gap: 16px;

		cursor: pointer;
	}

	input[type='checkbox'] {
		appearance: none;
		margin: 0px;
		font: inherit;
		color: currentColor;
		width: var(--size);
		height: var(--size);
		border: 2px solid currentColor;
		border-radius: 2px;
		transform: translateY(0px);
		display: grid;
		place-content: center;
	}

	input[type='checkbox']::before {
		content: '';
		width: calc(var(--size) * 0.35);
		height: calc(var(--size) * 0.10);

		transform: scale(0) translate(0px, 3px) rotate(45deg);
		transition: 120ms transform ease-in-out;
		background-color: var(--text-soft-color);
	}

	input[type='checkbox']::after {
		content: '';
		width: calc(var(--size) * 0.7);
		height: calc(var(--size) * 0.10);

		transform: scale(0) translate(2px, -0.5px) rotate(-45deg);
		transition: 120ms transform ease-in-out;
		background-color: var(--text-soft-color);
	}

	input[type='checkbox']:checked {
		background-color: var(--special-color);
		border-color: var(--special-color);
	}

	input[type='checkbox']:checked::before {
		transform: scale(1) translate(calc(var(--size) * -0.04), calc(var(--size) * 0.225)) rotate(45deg);
	}

	input[type='checkbox']:checked::after {
		transform: scale(1)  translate(calc(var(--size) * 0.0875), calc(var(--size) * 0)) rotate(-45deg);
	}

	input[type='checkbox']:focus-visible {
		outline: 1px solid var(--special-color);
	}
</style>
