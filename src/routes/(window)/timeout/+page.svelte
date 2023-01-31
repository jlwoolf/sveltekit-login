<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import LoginHeader from '$lib/components/login/LoginHeader.svelte';
	import LoginWindow from '$lib/components/login/LoginWindow.svelte';
	import StopwatchSvg from '$lib/components/StopwatchSvg.svelte';
</script>

<LoginWindow>
	<LoginHeader
		header="Session Expired"
		desc="Unfortunately, this login session has expired. Click the button below to load a new session."
	/>

	<a href="/signin">
		<Button>Sign in</Button>
	</a>

	<StopwatchSvg/>
</LoginWindow>

<style>
	a {
		text-decoration: none;
		padding-top: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-bottom: 20px;
	}
</style>
