<template>
	<div class="home">
		<div class="login_container">
			<div v-if="!loading">
				<div class="top_text">
					<img alt="ZAB logo" :src="require('@/assets/images/icons/zab_icon_new.png')" class="login_logo">
					<p class="title">Albuquerque ARTCC — Information Display System</p>
					<p class="description">
						Welcome to the ZAB Information Display System (IDS). <br /><br />
						This program provides a platform that shows information useful when controlling and gives you the ability to ease communications and coordination with other controllers. <br /><br />
						Please enter your IDS token to continue. <br />
					</p>
				</div>
				<div class="row">
					<div class="col s12">
						<input type="text" class="ids_token" v-model="token" />
						<div class="help_text modal-trigger" data-target="modal_help">Where do I find my IDS token?</div>
					</div>
					<div class="col s12">
						<button class="btn waves-effect login_button" @click="processLogin">Login</button>
					</div>
				</div>
			</div>
			<div v-else>
				<div class="spinner">
					<Spinner />
				</div>
			</div>
		</div>
		<div id="modal_help" class="modal">
			<div class="modal-content">
				<h4>Where do I find my IDS token?</h4>
				<p>In order to generate an IDS token, please head over to the Albuquerque ARTCC website by visiting www.zabartcc.org<br /> <br />Once there, login and click on your name on the right side of the menu. A dropdown menu should now be visible. Click on the first option, Controller Dashboard.<br /><br />In the Controller Dashboard, you'll be able to see your IDS token. If none is present, click the refresh button to generate one. If your token ever gets comprimised, you can click on the refresh button to generate a new one. <br /><br />Please note that once you've generated a new token, your old token will no longer be valid.</p>
			</div>
			<div class="modal-footer">
				<a class="modal-close waves-effect btn-flat">Close</a>
			</div>
		</div>
	</div>
</template>

<script>
import M from 'materialize-css';
import Spinner from '@/components/Spinner.vue';
import {zabApi} from '@/helpers/axios.js';
import {mapActions} from 'vuex';

export default {
	name: 'Home',
	data() {
		return {
			token: '',
			loading: true
		};
	},
	components: {
		Spinner
	},
	async mounted() {
		M.Modal.init(document.querySelectorAll('.modal'), {
			preventScrolling: false
		});
		await this.checkToken();
	},
	methods: {
		...mapActions('user', [
			'setData'
		]),
		async checkToken() {
			const {data} = await zabApi.post('/ids/checktoken');
			if(data.ret_det.code === 200) {
				await this.setData(data.data);
				this.$router.push('/home');
			} else if(data.ret_det.code === 404) {
				M.toast({
					html: `<i class="material-icons left">error_outline</i> ${data.ret_det.message} <div class="border"></div>`,
					displayLength: 5000,
					classes: 'toast toast_error'
				});
				document.cookie = 'idsToken=; Max-Age=0; path=/;';
				this.loading = false;
			} else {
				this.loading = false;
			}
		},
		async processLogin() {
			document.cookie = `idsToken=${this.token}; max-age=86400; samesite=strict;`;
			await this.checkToken();
		}
	}
}
</script>

<style scoped lang="scss">
.home {
	width: 100%;
}

.login_logo {
	height: 150px;
	display: block;
	width: auto;
	margin: auto;
}

.login_container {
	background-color: #212121;
	box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
	width: 600px;
	margin: auto;
	margin-top: 50px;
	padding: 1em;
	min-height: 500px;

	.spinner {
		padding-top: 33%;
	}

	.login_button {
		display: block;
		margin-top: 1.5em;
		background-color: #D64437;
		margin-left: auto;
		margin-right: auto;
	}

	.help_text  {
		max-width: 400px;
		margin-left: auto;
		margin-right: auto;
		margin-top: -7px;
		cursor: pointer;
		color: rgb(68, 68, 68);
		font-size: .9rem;
		transition: .3s ease;
		text-decoration: underline;

		&:hover {
			color: rgb(78, 78, 78);
		}
	}

	.ids_token {
		display: block;
		border-bottom: none;
		margin-top: 1em;
		background: rgba(26, 26, 26, 0.9);
		max-width: 400px;
		border-radius: 7px;
		margin-left: auto;
		margin-right: auto;
		padding-left: .5em;
		color: #fff;

		&:focus {
			border: none!important;
			box-shadow: none!important;
		}
	}
}

.top_text {
	.title {
		font-size: 1.4em;
		font-weight: 600;
		text-align: center;
	}

	.description {
		width: 70%;
		word-break: break-word;
		margin: auto;
		line-height: 1.3rem;
	}
}

#modal_help {
	max-width: 700px;
}
</style>