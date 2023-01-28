<script lang="ts">
	import LoginHeader from '$lib/components/login/LoginHeader.svelte';
	import LoginWindow from '$lib/components/login/LoginWindow.svelte';
	import { onMount } from 'svelte';
	import LoginInput from '$lib/components/login/LoginInput.svelte';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
	import { applyAction, enhance } from '$app/forms';
	import type { apiLogin, apiSession } from '$lib/pocketbase';
	import TimeoutModal from '$lib/components/TimeoutModal.svelte';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import InvisibleButton from '$lib/components/InvisibleButton.svelte';

	export let data: apiSession;
	let loginData: apiLogin = data.data ?? {};

	export let form: {
		password: string;
		error: boolean;
		message: string;
	};

	let input: HTMLInputElement;
	let duration = 200;
	let disabled = false;
	let progress = false;
	let url = $page.url;

	onMount(async () => {
		setTimeout(() => {
			input.focus();
		}, 500);
	});

	const getHeader = () => {
		if (typeof data.user !== 'string' && data.user?.first_name) {
			return 'Hi ' + data.user.first_name;
		}

		return 'Welcome';
	};

	const getEmail = () => {
		return loginData?.email;
	};
</script>

<LoginWindow {disabled} {duration} {progress}>
	<LoginHeader header={getHeader()} desc={getEmail()} bordered />
	<form
		method="POST"
		action="?/login"
		use:enhance={({ form }) => {
			if (input.value) {
				progress = true;
				disabled = true;
			}

			return async ({ result, update }) => {
				if (result.type === 'redirect') {	
					if(result.location.includes('home'))
						duration = 0;
				} else {
					disabled = false;
					progress = false;
					input.focus();
				}

				update();
			};
		}}
	>
		<LoginInput
			placeholder="Enter your password"
			style="padding-top: 16px"
			type="password"
			name="password"
			bind:input
			value={form?.password ?? loginData.password ?? ''}
			error={form?.error}
			autocomplete="current-password"
		/>
		<input type="email" name="email" style="display: none;" value={getEmail()} />
		<ErrorMessage message={form?.message ?? ''} style="padding-top: 4px;" />
		<div class="lower">
			<Button formaction="?/login&{url.searchParams.toString()}">Next</Button>
			<InvisibleButton formaction="?/forgot&{url.searchParams.toString()}"
				>Forgot password?</InvisibleButton
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
