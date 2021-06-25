<template>
	<div class="home">
		<div class="login_container">
			<div v-if="!loading">
				<div class="top_text">
					<img alt="ZAB logo" :src="require('@/assets/images/icons/zab_icon_new.png').default" class="login_logo" draggable="false">
					<p class="title">Albuquerque ARTCC — Information Display System</p>
					<p class="description">
						Welcome to the ZAB Information Display System (IDS). <br /><br />
						The IDS provides you with information useful when controlling and helps ease communication and coordination with fellow controllers. <br /><br />
						<span class="no_justify">Enter your IDS token to continue as a member. Alternatively, you may continue as a guest with limited functionality.</span><br />
					</p>
				</div>
				<div class="row">
					<div class="col s12 m10">
						<input type="text" class="ids_token" v-model="token" placeholder="Enter your token" :maxlength="36" />
						<div class="help_text modal-trigger" data-target="modal_help">Where do I find my IDS token?</div>
					</div>
					<div class="col s12 m2">
						<button class="btn waves-effect login_button" @click="processLogin">Login</button>
					</div>
					<div class="col s12">
						<div class="or">or</div>
					</div>
					<div class="col s12 center-align">
						<span class="continue_as_guest" @click="continueAsGuest">
							Continue as Guest
						</span>
					</div>
				</div>
			</div>
			<div v-else>
				<div class="spinner">
					<Spinner :width="80"/>
				</div>
			</div>
		</div>
		<div id="modal_help" class="modal">
			<div class="modal-content">
				<h4>Where do I find my IDS token?</h4>
				<p>
					If you are a member of ZAB, you can generate an IDS token from the 'Controller Dashboard' on the ZAB website. <br /><br />If you are not a member of ZAB, you can 'Continue as Guest' in order to access the IDS with limited functionality.
				</p>
			</div>
			<div class="modal-footer">
				<a class="modal-close waves-effect btn-flat">Close</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
// @ts-ignore
import M from 'materialize-css';
import Spinner from '@/components/Spinner.vue';
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

interface State {
	token: string;
	loading: boolean;
}

export default defineComponent({
	name: 'Home',
	data(): State {
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
		await this.verifySession();
	},
	methods: {
		...mapActions('user', [
			'setData',
			'getData'
		]),
		async verifySession(): Promise<void> {
			this.loading = true;

			if(localStorage.getItem('ids_token') !== null) {
				await this.getData(localStorage.getItem('ids_token'));
				this.loading = false;
			} else if(localStorage.getItem('guest') === 'true') {
				this.$router.push('/home');
			} else {
				this.loading = false;
			}
		},
		async processLogin(): Promise<void> {
			localStorage.setItem('ids_token', this.token);
			await this.getData(localStorage.getItem('ids_token'));
		},
		continueAsGuest(): void {
			localStorage.setItem('guest', 'true');
			localStorage.setItem('ids_token', ''); // Remove any previously set (incorrect) IDS token to prevent issues when reloading as a guest
			this.$router.push('/home');
		}
	}
});
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
		margin-top: 1.5em;
		background-color: #D64437;
	}

	.or {
		color: #6C6C6C;
		text-align: center;
		margin: 1em;
	}

	.continue_as_guest {
		text-align: center;
		color: #6C6C6C;
		text-decoration: underline;
		user-select: none;
		cursor: pointer;
		transition: .3s ease;

		&:hover {
			color: rgb(150, 150, 150);
		}
	}

	.help_text  {
		margin-top: -7px;
		margin-left: .75em;
		cursor: pointer;
		color: rgb(68, 68, 68);
		font-size: .9rem;
		transition: .3s ease;
		text-decoration: underline;

		&:hover {
			color: rgb(88, 88, 88);
		}
	}

	.ids_token {
		border-bottom: none;
		margin-top: 1em;
		background: rgba(26, 26, 26, 0.9);
		border-radius: 7px;
		padding-left: .5em;
		color: #fff;

		&:focus {
			border: none!important;
			box-shadow: none!important;
		}

		&::placeholder {
			color: rgb(44, 44, 44);
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
		width: 75%;
		word-break: break-word;
		margin: auto;
		line-height: 1.3rem;
	}
}

#modal_help {
	max-width: 700px;
}
</style>