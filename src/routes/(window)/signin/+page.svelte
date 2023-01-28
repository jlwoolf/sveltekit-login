<script lang="ts">
	import LoginHeader from '$lib/components/login/LoginHeader.svelte';
	import LoginInput from '$lib/components/login/LoginInput.svelte';
	import LoginWindow from '$lib/components/login/LoginWindow.svelte';
	import { onMount, onDestroy } from 'svelte';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
	import { applyAction, enhance } from '$app/forms';
	import type { apiLogin, apiSession } from '$lib/pocketbase';
	import { page } from '$app/stores';
	import TimeoutModal from '$lib/components/TimeoutModal.svelte';
	import Button from '$lib/components/Button.svelte';
	import InvisibleButton from '$lib/components/InvisibleButton.svelte';


	let input: HTMLInputElement;
	let pass: string;
	let disabled = false;
	let progress = false;
	let url = $page.url;

	export let data: apiSession;
	let loginData: apiLogin = data.data ?? {};

	onMount(async () => {
		setTimeout(() => {
			input.focus();
		}, 500);
	});

	export let form: {
		error: boolean;
		message: string;
		email: string;
	};

	// TODO: On page close, delete SID session
</script>

<LoginWindow {disabled} {progress}>
	<LoginHeader header="Sign in" desc="Use your 'Svelte' Account" />
	<form
		method="POST"
		use:enhance={({ form }) => {
			if (input.value) {
				progress = true;
				disabled = true;
			}

			return async ({ result, update }) => {
			    if (result.type ==='failure') {
					disabled = false;
					progress = false;
					input.focus();
				}

				update();
			};
		}}
	>
		<LoginInput
			placeholder="Enter your email"
			style="padding-top: 16px"
			type="text"
			name="email"
			bind:input
			error={form?.error}
			value={form ? (form.email ?? '') : (loginData.email ?? '')}
			autocomplete="email"
		/>
		<input
			type="password"
			name="password"
			style="display: none;"
			bind:value={pass}
			autocomplete="current-password"
		/>
		<ErrorMessage message={form?.message ?? ''} style="padding-top: 4px;" />
		<div class="lower">
			<Button formaction="?/login&{url.searchParams.toString()}">Next</Button>
			<InvisibleButton formaction="?/request&{url.searchParams.toString()}"
				>Request an account</InvisibleButton
			>
		</div>
	</form>
</LoginWindow>
<TimeoutModal formaction="?/timeout&{url.searchParams.toString()}" />

<style>
	.lower {
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		margin-top: 12px;
		position: relative;
	}
</style>
