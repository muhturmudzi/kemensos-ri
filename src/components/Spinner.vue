<template>
	<div
		class="absolute top-0 left-0 right-0 bottom-0 justify-center items-center flex bg-grey bg-opacity-10 z-50"
	>
		<svg viewBox="25 25 50 50" :width="width">
			<circle r="20" cy="50" cx="50"></circle>
		</svg>
	</div>
</template>

<script setup>
import { defineComponent } from 'vue'

defineComponent({
	name: 'LoaderComponent',
})

const props = defineProps({
	width: {
		type: String,
		default: '3.25em'
	}
})
</script>

<style scoped>
svg {
	/* width: 3.25em; */
	-webkit-transform-origin: center;
	-ms-transform-origin: center;
	transform-origin: center;
	-webkit-animation: rotate4 2s linear infinite;
	animation: rotate4 2s linear infinite;
}

circle {
	fill: none;
	stroke-width: 2;
	stroke-dasharray: 1, 200;
	stroke-dashoffset: 0;
	stroke-linecap: round;
	-webkit-animation: dash4 1.5s ease-in-out infinite;
	animation: dash4 1.5s ease-in-out infinite;
  @apply stroke-[#369AB0];
}

@-webkit-keyframes rotate4 {
	100% {
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}

@keyframes rotate4 {
	100% {
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}

@-webkit-keyframes dash4 {
	0% {
		stroke-dasharray: 1, 200;
		stroke-dashoffset: 0;
	}

	50% {
		stroke-dasharray: 90, 200;
		stroke-dashoffset: -35px;
	}

	100% {
		stroke-dashoffset: -125px;
	}
}

@keyframes dash4 {
	0% {
		stroke-dasharray: 1, 200;
		stroke-dashoffset: 0;
	}

	50% {
		stroke-dasharray: 90, 200;
		stroke-dashoffset: -35px;
	}

	100% {
		stroke-dashoffset: -125px;
	}
}
</style>
