<template>
	<div id="container">
		<div class="new_item_wrap">
			<a class="btn-floating red">
				<i class="material-icons">change_history</i>
			</a>
			<ul class="btn_container" @click=addComponent>
				<li v-for="cpt in aComponents" :key=cpt.icon>
					<a class="btn" :component="cpt.componentName">
						<span>{{cpt.name}}</span>
						<i class="material-icons">{{cpt.icon}}</i>
					</a>
				</li>
			</ul>
		</div>
		<header>
			<Header />
		</header>
		<main>
			<div class="main_content">
				<div v-for="cpt in aComponents" :key=cpt.componentName>
					<component :is="cpt.componentName" v-if="cpt.show"></component>
				</div>
			</div>
		</main>
		<footer>
			<Footer />
		</footer>
	</div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import Header from '@/views/partial/Header.vue';
import Footer from '@/views/partial/Footer.vue';
import Map from '@/components/Map.vue';
import Pirep from '@/components/Pirep.vue';
import Atis from '@/components/Atis.vue';
// import Map from '@/components/Map.vue';

export default {
	components: {
		Header,
		Footer,
		Map,
		Pirep,
		Atis
	},
	data() {
		return {
			aComponents: {
				'Map': {
					icon: 'track_changes',
					name: 'Flight Map',
					componentName: 'Map',
					show: false,
				},
				'Pirep': {
					icon: 'cloud_download',
					name: 'PIREPs',
					componentName: 'Pirep',
					show: false,
				},
				'Atis': {
					icon: 'satellite',
					name: 'ATIS',
					componentName: 'Atis',
					show: false,
				},
				// {
				// 	icon: 'near_me',
				// 	name: 'Neighbors',
				// 	componentName: 'Neighbors',
				// 	show: false,
				// },
			}
		}
	},
	mounted() {
	},
	methods: {
		addComponent(e) {
			const clickedButton = e.target.closest('.btn');

			if(clickedButton) {
				const isShow = this.aComponents[clickedButton.getAttribute('component')].show;
				this.aComponents[clickedButton.getAttribute('component')].show = !isShow;
			}
		}
	}
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

body {
	background-color: #121212;
	font-family: "Lato", sans-serif!important;
	color: #fff;
}

.tooltip-content {
	font-family: "Lucida Console", "Lucida Sans Typewriter", monaco;
	font-size: .9rem;
}

#container {
	display: flex;
	flex-direction: column;
	height: 100vh;

	main {
		padding: 1em 0;
		flex: 1;
	}

	.main_content {
		padding: .75em;
		height: 100%;
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: repeat(8, 1fr);
		row-gap: .75em;
		column-gap: .75em;
	}
}

.new_item_wrap {
	position: fixed;
	top: 1em;
	right: 1em;
	text-align: right;

	.btn_container {
		padding: 5px;
		background: #333;
		// transform: scaleY(0);
		// transform-origin: top center;
		position: absolute;
		top: 100%;
		right: 0;


		li+li {
			margin-top: 5px;
		}
	}


	.btn {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 0;
		white-space: nowrap;

		i {
			margin-left: 0.5em;
		}
	}
}

::-webkit-scrollbar {
	width: 5px;
	height: 5px;
	margin-top: 10px;
	background-color: #0F0F0F;
}

::-webkit-scrollbar-track {
	margin-bottom: 28px;
	border-radius: 10px;
	background-color: #121212;
}

::-webkit-scrollbar-thumb {
	background-color: #1E1E1E;
	border-radius: 10px;
}

::-webkit-scrollbar-corner {
	background-color: transparent;
}
</style>