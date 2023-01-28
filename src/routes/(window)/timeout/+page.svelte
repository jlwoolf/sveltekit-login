<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import LoginHeader from '$lib/components/login/LoginHeader.svelte';
	import LoginWindow from '$lib/components/login/LoginWindow.svelte';

	//TODO: finish timeout page
</script>

<LoginWindow>
	<LoginHeader
		header="Session Expired"
		desc="Unfortunately, this login session has expired. Click the button below to load a new session."
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
