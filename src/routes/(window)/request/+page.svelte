<script lang="ts">
	import LowerForm from '$lib/components/LowerForm.svelte';
	import LoginHeader from '$lib/components/login/LoginHeader.svelte';
	import LoginInput from '$lib/components/login/LoginInput.svelte';
	import LoginWindow from '$lib/components/login/LoginWindow.svelte';
	import { onMount } from 'svelte';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
	import { applyAction, enhance } from '$app/forms';
	import type { apiRequest, apiSession } from '$lib/pocketbase';
	import idleTimeout from 'idle-timeout';
	import { redirect } from '@sveltejs/kit';
	import Modal from '$lib/components/Modal.svelte';
	import TimeoutModal from '$lib/components/TimeoutModal.svelte';
	import { page } from '$app/stores';
	import LoadingBar from '$lib/components/LoadingBar.svelte';
	import Button from '$lib/components/Button.svelte';

	let email: HTMLInputElement;
	let firstName: HTMLInputElement;
	let lastName: HTMLInputElement;

	let disabled = false;
	let progress = false;
	let url = $page.url;

	export let data: apiSession;
	let requestData: apiRequest = data.data ?? {};

	onMount(async () => {
		const instance = idleTimeout(() => {}, {
			element: document.body,
			timeout: 1000 * 20,
			loop: false
		});

		// setTimeout(() => {
		// 	input.focus();
		// }, 500);
	});

	export let form: {
		errors: {
			email: string;
			firstName: string;
			lastName: string;
		};
		email: string;
		firstName: string;
		lastName: string;
	};

	const getEmail = () => {
		return requestData.email;
	};
</script>

<LoginWindow {disabled} {progress}>
	<LoginHeader
		header="Request an account"
		desc="'Svelte' Accounts require admin approval. Enter your email below to submit a request."
	/>
	<form
		method="POST"
		use:enhance={({ form }) => {
			if (email.value && firstName.value && lastName.value) {
				progress = true;
				disabled = true;
			}

			return async ({ result, update }) => {
				if (result.type === 'redirect') {
				} else if (result.type === 'failure') {
					disabled = false;
					progress = false;

					if (result.data?.errors.firstName) firstName.focus();
					else if (result.data?.errors.lastName) lastName.focus();
					else if (result.data?.errors.email) email.focus();
				}

				update();
			};
		}}
	>
		<div class="names">
			<div class="first">
				<LoginInput
					placeholder="First name"
					style="padding-top: 16px;"
					type="text"
					name="firstName"
					bind:input={firstName}
					error={Boolean(form?.errors.firstName)}
					value={form?.firstName ?? requestData.firstName ?? ''}
					autocomplete="given-name"
				/>
				<ErrorMessage message={form?.errors.firstName} style="padding-top: 4px;" />
			</div>
			<div class="last">
				<LoginInput
					placeholder="Last name"
					style="padding-top: 16px;"
					type="text"
					name="lastName"
					bind:input={lastName}
					error={Boolean(form?.errors.lastName)}
					value={form?.lastName ?? requestData.lastName ?? ''}
					autocomplete="family-name"
				/>
				<ErrorMessage message={form?.errors.lastName} style="padding-top: 4px;" />
			</div>
		</div>
		<LoginInput
			placeholder="Enter your email"
			style="padding-top: 8px"
			type="text"
			name="email"
			bind:input={email}
			error={Boolean(form?.errors.email)}
			value={form?.email ?? requestData.email ?? ''}
			autocomplete="email"
		/>
		<ErrorMessage message={form?.errors.email} style="padding-top: 4px;" />
		<div class="lower">
			<Button formaction="?/submit&{url.searchParams.toString()}">Submit</Button>
		</div>
	</form>
</LoginWindow>
<TimeoutModal formaction="?/timeout&{url.searchParams.toString()}" />

<style>
	.names {
		display: flex;
	}

	.first {
		padding-right: 7px;
	}

	.last {
		padding-left: 7px;
	}

	.lower {
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		margin-top: 12px;
		position: relative;
	}
</style>
