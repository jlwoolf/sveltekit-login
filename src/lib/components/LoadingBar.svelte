<script lang="ts">
	export let indeterminate: boolean = false;
	export let percent: number = 0;
</script>

<div class="progress">
    <div class="{indeterminate ? "indeterminate" : "determinate"}" style="{indeterminate ? "" : `width: ${percent}%`}"></div>
</div>

<style>
	/* Progress Bar */
	.progress {
		position: relative;
		height: 4px;
		display: block;
		width: 100%;
		background-color: var(--border-color);
		/* border-radius: 2px; */
		background-clip: padding-box;
		margin: 0.5rem 0 1rem 0;
		overflow: hidden;
	}
	.progress .determinate {
		position: absolute;
		background-color: inherit;
		top: 0;
		bottom: 0;
		background-color: var(--special-color);
		transition: width 0.3s linear;
	}
	.progress .indeterminate {
		background-color: var(--special-color);
	}
	.progress .indeterminate:before {
		content: '';
		position: absolute;
		background-color: inherit;
		top: 0;
		left: 0;
		bottom: 0;
		will-change: left, right;
		animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
	}
	.progress .indeterminate:after {
		content: '';
		position: absolute;
		background-color: inherit;
		top: 0;
		left: 0;
		bottom: 0;
		will-change: left, right;
		animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
		animation-delay: 1.15s;
	}
	@-webkit-keyframes indeterminate {
		0% {
			left: -35%;
			right: 100%;
		}
		60% {
			left: 100%;
			right: -90%;
		}
		100% {
			left: 100%;
			right: -90%;
		}
	}
	@-moz-keyframes indeterminate {
		0% {
			left: -35%;
			right: 100%;
		}
		60% {
			left: 100%;
			right: -90%;
		}
		100% {
			left: 100%;
			right: -90%;
		}
	}
	@keyframes indeterminate {
		0% {
			left: -35%;
			right: 100%;
		}
		60% {
			left: 100%;
			right: -90%;
		}
		100% {
			left: 100%;
			right: -90%;
		}
	}
	@-webkit-keyframes indeterminate-short {
		0% {
			left: -200%;
			right: 100%;
		}
		60% {
			left: 107%;
			right: -8%;
		}
		100% {
			left: 107%;
			right: -8%;
		}
	}
	@-moz-keyframes indeterminate-short {
		0% {
			left: -200%;
			right: 100%;
		}
		60% {
			left: 107%;
			right: -8%;
		}
		100% {
			left: 107%;
			right: -8%;
		}
	}
	@keyframes indeterminate-short {
		0% {
			left: -200%;
			right: 100%;
		}
		60% {
			left: 107%;
			right: -8%;
		}
		100% {
			left: 107%;
			right: -8%;
		}
	}
</style>
