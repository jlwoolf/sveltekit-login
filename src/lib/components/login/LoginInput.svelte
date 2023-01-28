<script lang="ts">
	export let placeholder: string = '';
	export let type: string = 'text';
	export let name: string = '';
	export let value: string = '';
	export let style: string = '';
	export let input: HTMLInputElement | null = null;
	export let error: boolean = false;
	export let autocomplete = '';
</script>

<div {style} class={error ? "error" : ""}>
	<div class="main ">
		<input {type} {value} {name} on:input placeholder=" " bind:this={input} {autocomplete}/>
		<label for={name}>{placeholder}</label>
	</div>
</div>

<style>
	.main {
		position: relative;
		width: 100%;
		height: 100%;
		margin-top: 6px;
	}

	input,
	label {
		font-size: 16px;
		font-weight: 400;

		color: var(--text-soft-color);
	}

	input {
		width: 100%;
		background-color: transparent;
		border: 0px;

		outline: 1px solid var(--border-color);
		outline-offset: -1px;
		border-radius: 4px;
		padding: 16px 12px;
		user-select: none;
	}

	label {
		position: absolute;
		left: 0px;
		top: 16px;

		padding: 0px 4px;
		background-color: var(--bg-color);
		transition: transform 200ms;

		transform: translate(-4px, -26px) scale(80%);
		color: rgba(var(--text-color-rgb), 0.5);
	}

	input:placeholder-shown ~ label {
		pointer-events: none;
		background-color: transparent;

		transform: translate(8px, 0px);
	}

	input:focus {
		user-select: none;
		outline-color: var(--special-color);
		outline-width: 2px;
	}

	input:focus ~ label {
		transform: translate(-4px, -26px) scale(80%);
		color: var(--special-color);
		background-color: var(--bg-color);
	}

	input:autofill,
	input:autofill:hover,
	input:autofill:focus,
	input:autofill:active {
		caret-color: var(--text-color);
		background-color: var(--bg-color);
		color: var(--text-color);
		box-shadow: 0 0 0px 1000px var(--bg-color) inset;
	}

	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	input:-webkit-autofill:active {
		caret-color: var(--text-color);
		transition: background-color 5000s ease-in-out 0s;

		-webkit-text-fill-color: var(--text-color);
		-webkit-box-shadow: 0 0 0px 1000px var(--bg-color) inset;
	}

	.error input {
		outline-color: var(--error-color);
	}

	.error input:placeholder-shown ~ label {
		color: rgba(var(--text-color-rgb), 0.5);
	}

	.error label {
		color: var(--error-color);
	}

	.error input:focus ~ label {
		color: var(--error-color);
	}
</style>
