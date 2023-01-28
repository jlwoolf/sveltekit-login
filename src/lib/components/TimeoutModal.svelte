<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import { onMount } from 'svelte';
	import idleTimeout from 'idle-timeout';
	import type IdleTimeout from 'idle-timeout/dist/IdleTimeout';
	import { page } from '$app/stores';

	export let formaction = '?/timeout';
	export let idleTime = 1000 * 60 * 3;
	export let popupTime = 1000 * 60 * 2;

	let url = $page.url

	let form: HTMLFormElement;
	let idleTimer: IdleTimeout;
	let timeoutModal: boolean = false;
	let timeRemaining = idleTime;
	let timerInterval: NodeJS.Timer;
	let timerTimeout: NodeJS.Timeout;

	const getTimeString = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes}:${seconds.toLocaleString('en-US', { minimumIntegerDigits: 2 })}`;
	};

	const onClick = async (event: MouseEvent) => {
		idleTimer.reset();
		timeoutModal = false;

		await fetch(`${url.origin}/api/sessions/${url.searchParams.get('sid')}/update`);

		clearTimeout(timerTimeout);
		clearInterval(timerInterval);
	};

	onMount(() => {
		idleTimer = idleTimeout(
			() => {
				timeoutModal = true;
				timeRemaining = popupTime / 1000;

				timerInterval = setInterval(() => {
					timeRemaining -= 1;
				}, 1000);

				timerTimeout = setTimeout(() => {
					form.submit();
				}, popupTime);
			},
			{
				element: document.body,
				timeout: idleTime,
				loop: false
			}
		);
	});
</script>

<Modal bind:visible={timeoutModal}>
	<form action={formaction} method="POST" bind:this={form}>
		<h1>Are you still there?</h1>
		<p>
			There hasn't been much activity lately. Click "I'm still here" to keep this session open. If
			not, we'll end your session in <span>{getTimeString(timeRemaining)}</span>
		</p>
	</form>
	<div class="button-container">
		<button class="colored-button" on:click={onClick}>
			<span class="button-text">I'm still here!</span>
		</button>
	</div>
</Modal>

<style>
	h1 {
		font-weight: 300;
		font-size: 28px;
		color: var(--text-color);
	}

	p {
		margin: 6px 0px 0px;
		font-size: 16px;
		font-weight: 100;
		color: var(--text-soft-color);
	}

	span {
		font-weight: 700;
	}

	.button-container {
		padding: 8px 0px;
		display: flow-root;
		width: 100%;
	}

	.button-container button {
		float: right;
		padding: 8px 12px;
		border: 0px;
		border-radius: 4px;
	}

	.colored-button {
		cursor: pointer;
		color: var(--bg-color);
		background-color: var(--special-color);
		position: relative;
	}

	.colored-button::before {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;

		content: '';
		background-color: black;
		opacity: 0%;
		border-radius: 4px;
	}

	.colored-button:hover::before {
		opacity: 10%;
	}

	.colored-button:focus-visible {
		outline: 1px solid var(--special-color);
		outline-offset: 2px;
	}

	.button-text {
		font-weight: 600;
		font-size: 16px;
	}
</style>
