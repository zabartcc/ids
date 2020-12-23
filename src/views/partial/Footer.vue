<template>
	<div class="footer flex">
		<div class="version">
			Version {{version || 'dev'}}&nbsp;
		</div>
		<div class="last_updated">
			| Updates every 2 minutes | Last updated <span id="show_time">...</span>s ago
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
			document.getElementById('show_time').innerHTML = Math.round(((new Date() / 1000) - new Date(this.timestamp)));
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
	position: fixed;
	width: 100vw;
	bottom: 0;
	color: #6C6C6C;

	.version {
		color: #6C6C6C;
	}
}

.flex {
	display: flex;
}
</style>