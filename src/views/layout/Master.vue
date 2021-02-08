<template>
	<div id="container">
		<header>
			<Header :user="user" />
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
	<div ref="settings_wrap" class="settings_wrap" v-show="showSettings">
		<form>
			<h6>Settings</h6>
			<div class="input-field">
				<input id="token" type="text" v-model=settings.token>
				<label for="token">Token</label>
				<button class="btn waves-effect" @click.prevent=updateSettings>Update</button>
			</div>
		</form>
	</div>
</template>

<script>
import Header from '@/views/partial/Header.vue';
import Footer from '@/views/partial/Footer.vue';
import {zabApi} from '@/helpers/axios.js';
import M from 'materialize-css';

export default {
	components: {
		Header,
		Footer
	},
	data() {
		return {
			showSettings: false,
			settings: {
				token: '',
			},
			user: null
		}
	},
	async mounted() {
		if(localStorage.getItem('settings')) {
			this.settings = JSON.parse(localStorage.getItem('settings'));
		}

		await this.getUserData();

		M.updateTextFields();

		window.addEventListener('keydown', e => {
			// console.log(e.key)
			if(e.ctrlKey && e.key === 's') {
				this.showSettings = true;
				e.preventDefault();
				e.stopImmediatePropagation();
			}

			if(e.key === "Escape") {
				this.showSettings = false;
				e.preventDefault();
				e.stopImmediatePropagation();
			}
		});
	},
	methods: {
		updateSettings: async function() {
			localStorage.setItem('settings', JSON.stringify(this.settings));
			await this.getUserData();
		},
		getUserData: async function() {
			if(this.settings.token) {
				const {data} = await zabApi.post('/ids/user', {token: this.settings.token});
				if(data.ret_det.code === 200) {
					this.user = data.data;
				} else {
					this.user = null;
				}
			}
		}
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