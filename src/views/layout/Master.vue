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

export default {
	components: {
		Header,
		Footer
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

footer {
	padding-bottom: 28px;
}
</style>