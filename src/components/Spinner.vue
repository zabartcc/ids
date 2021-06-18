<template>
	<div class="preloader-wrapper big active" :style="`height: ${width}px; width: ${width}px;`">
		<div class="spinner-layer spinner-blue">
			<div class="circle-clipper left">
			<div class="circle"></div>
			</div><div class="gap-patch">
			<div class="circle"></div>
			</div><div class="circle-clipper right">
			<div class="circle"></div>
			</div>
		</div>
		<div class="spinner-layer spinner-yellow">
			<div class="circle-clipper left">
			<div class="circle"></div>
			</div><div class="gap-patch">
			<div class="circle"></div>
			</div><div class="circle-clipper right">
			<div class="circle"></div>
			</div>
		</div>

		<div class="spinner-layer spinner-green">
			<div class="circle-clipper left">
			<div class="circle"></div>
			</div><div class="gap-patch">
			<div class="circle"></div>
			</div><div class="circle-clipper right">
			<div class="circle"></div>
			</div>
		</div>

		<div class="spinner-layer spinner-red">
			<div class="circle-clipper left">
			<div class="circle"></div>
			</div><div class="gap-patch">
			<div class="circle"></div>
			</div><div class="circle-clipper right">
			<div class="circle"></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Spinner',
	props: {
		width: {
			type: Number,
			default: 200,
			required: false
		}
	}
});
</script>

<style scoped lang="scss">
	.preloader-wrapper {
		display: block;
		margin: auto;
	}
	.spinner-yellow {
		border-color: #d64437;
	}

	.spinner-green {
		border-color: #ed5c30;
	}

	.spinner-red {
		border-color: #faa854;
	}

	.spinner-blue {
		border-color: #e43f30;
	}
</style>