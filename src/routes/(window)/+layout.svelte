<script lang="ts">
	import LoginInput from '$lib/components/login/LoginInput.svelte';
</script>

<div class="container">
	<div><slot /></div>
</div>

<style>
	.container {
        position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.container div {
		width: 450px;
		height: 500px;
		overflow: hidden;
	}
</style>
