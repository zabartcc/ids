<template>
	<div class="footer">
		<div class="info">
			Version {{version || 'dev'}} | Last updated <span id="show_time">...</span>s ago
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex';

export default {
	name: 'Footer',
	data() {
		return {
			version: process.env.VUE_APP_VERSION_ID
		};
	},
	mounted() {
		setInterval(() => {
			document.getElementById('show_time').innerHTML = Math.ceil((Date.now() - this.timestamp)/1000);
		}, 1000);
	},
	computed: {
		...mapState('timer', [
			'timestamp'
		])
	}
};
</script>

<style scoped lang="scss">
.footer {
	font-family: "Lucida Console", "Lucida Sans Typewriter", monaco;
	background-color: #0F0F0F;
	padding: .4em 2em;
	font-size: .80rem;
	color: #6C6C6C;
	display: flex;
	align-items: center;
	height: 28px;

	.info {
		color: #6C6C6C;
	}
}

</style>