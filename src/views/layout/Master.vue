<template>
	<div id="container">
		<header>
			<Header />
		</header>
		<main>
			<div class="row main_content">
				<router-view></router-view>
			</div>
		</main>
		<footer>
			<Footer />
		</footer>
	</div>
</template>

<script>
import Header from '@/views/partial/Header.vue';
import Footer from '@/views/partial/Footer.vue';
import {mapActions} from 'vuex';

export default {
	components: {
		Header,
		Footer
	},
	async created() {
		await this.getData(localStorage.getItem('ids_token'));
	},
	methods: {
		...mapActions('user', [
			'getData'
		]),
	}
};
</script>

<style scoped lang="scss">
#container {
	display: flex;
	flex-direction: column;
	height: 100vh;

	main {
		padding: 1em 0;
		flex: 1;
	}

	.main_content {
		margin: 0!important;
		height: 100%;
	}
}

.settings_wrap {
	position: absolute;
	top: 20%;
	left: 50%;
	width: 100%;
	max-width: 500px;
	margin: 0 auto;
	background: #333;
	z-index: 1000;
	padding: 0.5em 1em;
	box-sizing: border-box;
	transform: translateX(-50%);
	box-shadow: 0px 0px 10px 0px rgba(#000, 0.5);

	h6 {
		margin-bottom: 2em;
	}

	input {
		color: #fff;
	}

	.btn {
		margin-top: 2em;
	}

	// input {
	// 	background: #333;
	// 	border: 5px solid #222;
	// 	padding: 1em;
	// 	font-size: 20px;
	// 	color: #fff;
	// 	box-shadow: 0px 5px 25px 6px #000;
	// 	width: 100%;
	// 	line-height: 1.5;
	// 	max-width: 650px;
	// 	box-sizing: border-box;
	// }
}

footer {
	padding-bottom: 28px;
}
</style>