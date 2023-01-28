<script lang="ts">
	//TODO: finish forgot page
	import Button from '$lib/components/Button.svelte';
import LoginHeader from '$lib/components/login/LoginHeader.svelte';
	import LoginWindow from '$lib/components/login/LoginWindow.svelte';
	import type { apiLogin, apiSession } from '$lib/pocketbase';

    export let data: apiSession;
    let loginData: apiLogin = data.data ?? {};
</script>

<LoginWindow>
	<LoginHeader
		header="Reset Link Sent"
		desc="A password reset link has been sent to {loginData.email}."
	/>

    <a href="/signin">
		<Button>Sign in</Button>
	</a>
</LoginWindow>

<style>
    a {
		text-decoration: none;
		padding-top: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
