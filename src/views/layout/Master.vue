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
	</div>
</template>

<script>
import Header from '@/views/partial/Header.vue';
export default {
	components: {
		Header
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
</style>