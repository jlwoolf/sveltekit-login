<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import EmailSvg from '$lib/components/EmailSvg.svelte';
import LoginHeader from '$lib/components/login/LoginHeader.svelte';
	import LoginWindow from '$lib/components/login/LoginWindow.svelte';
</script>

<LoginWindow>
	<LoginHeader
		header="Request Submitted"
		desc="Your request has been submitted. You will receive an email with further instructions if approved."
	/>

    <a href="/signin">
		<Button>Sign in</Button>
	</a>

	<EmailSvg/>
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
