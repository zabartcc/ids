<template>
	<div id="container">
		<header>
			<Header />
		</header>
		<main>
			<div class="row main-content wrapper">
				<div class="main_content col s12">
					<router-view></router-view>
				</div>
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
	min-height: 100vh;

	.main-content {
		margin: 0!important;
	}
}

footer {
	padding-bottom: 28px;
}
</style>