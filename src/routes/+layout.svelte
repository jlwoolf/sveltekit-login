<script lang="ts">
</script>

<slot />

<div class="bg"/>

<style>
	.bg {
		background-color: var(--bg-color);
		position: fixed;
		width: 100%;
		height: 100%;
		min-height: 100vh;
		top: 0;
		left: 0;
		z-index: -10000;
	}
</style>
