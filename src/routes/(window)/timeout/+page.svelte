<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import LoginHeader from '$lib/components/login/LoginHeader.svelte';
	import LoginWindow from '$lib/components/login/LoginWindow.svelte';
	import StopwatchSvg from '$lib/components/StopwatchSvg.svelte';
</script>

<LoginWindow>
	<LoginHeader
		header="You're not signed in"
		desc="Your session ended because there was no activity. Try signing in again."
	/>

	<a href="/signin">
		<Button>Try again</Button>
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
