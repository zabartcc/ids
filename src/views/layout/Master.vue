<template>
	<div id="container">
		<header>
			<Header />
		</header>
		<main>
			<div class="row main_content">
				<router-view :key="reloadKey" />
			</div>
		</main>
		<footer>
			<Footer @reload="reloadView" />
		</footer>
	</div>
	<div id="settings_modal" class="settings_wrap modal">
		<h6>Settings</h6>
		<div class="input-field">
			<div class="label">IDS Token</div>
			<input id="token" type="text" v-model="settings.token" placeholder="Enter your token" :maxlength="36">
		</div>
		<button class="btn waves-effect right modal-close" @click="updateSettings">Update</button>
		<button class="btn-flat waves-effect right modal-close" @click="userLogout">Logout</button>
	</div>
	<div class="update_notification" v-if="versionDownloaded">
		<h6>Update downloaded</h6>
		<p>An update to version {{versionDownloaded.split("-")[0]}} has been downloaded.  Restart the application to install the update.</p>
		<button class="btn btn_restart" @click="installUpdate">Restart now</button>
		<button class="btn-flat btn_later" @click="versionDownloaded = undefined">Restart later</button>
	</div>
</template>

<script lang="ts">
// @ts-ignore
import M from 'materialize-css';
import { defineComponent } from 'vue';
import Header from '@/views/partial/Header.vue';
import Footer from '@/views/partial/Footer.vue';
import { mapActions } from 'vuex';

interface State {
	showSettings: boolean;
	settings: {
		token: string | null;
	};
	reloadKey: number;
	versionDownloaded?: string;
}

export default defineComponent({
	data(): State {
		return {
			showSettings: false,
			settings: {
				token: null
			},
			reloadKey: 0,
			versionDownloaded: undefined
		}
	},
	components: {
		Header,
		Footer
	},
	async mounted() {
		await this.getData(localStorage.getItem('ids_token') || '');

		this.settings.token = localStorage.getItem('ids_token');

		M.Modal.init(document.querySelectorAll('.modal'), {});

		// @ts-ignore
		window.ipc.onReceive('update', (event) => {
			this.versionDownloaded = event;
		})
	},
	methods: {
		async updateSettings(): Promise<void> {
			localStorage.setItem('ids_token', (this.settings.token || ''));
			await this.getData(localStorage.getItem('ids_token') || '');
			this.$router.go(0);
		},
		installUpdate(): void {
			// @ts-ignore
			window.ipc.send('restartToUpdate', {});
		},
		userLogout(): void {
			localStorage.setItem('ids_token', '');
			localStorage.setItem('guest', '');
			this.$router.push('/');
		},
		reloadView(): void {
			this.reloadKey++;
		},
		...mapActions('user', [
			'getData'
		]),
	}
});
</script>

<style scoped lang="scss">
#container {
	display: flex;
	flex-direction: column;
	height: 100vh;

	main {
		flex: 1;
	}

	.main_content {
		margin: 0!important;
		height: 100%;
	}
}

.settings_wrap {
	width: 100%;
	max-width: 600px;
	margin: 0 auto;
	background: #333;
	padding: 0.5em 1em;

	h6 {
		margin-bottom: 2em;
	}

	input {
		color: #fff;
	}

	.btn {
		margin-top: 1em;
		margin-bottom: .5em;
		background-color: #D64437;
	}

	.btn-flat {
		margin-top: 1em;
		margin-bottom: .5em;
		color: #fff;
		margin-right: .5em;
	}

	input {
		border: none;
		background: #121212;
		border-radius: 5px;
		color: #fff;
		font-family: inherit;
		padding: 0 .5em;
		width: calc(100% - 1em);

		&::placeholder {
			color: rgb(44, 44, 44);
		}
		
	}

	input[type=text]:focus {
		border-bottom: none;
		box-shadow: none;
	}

	.label {
		font-size: .85rem;
		position: absolute;
		top: -22px;
		left: .25em;
		color: #6C6C6C;
	}
}

footer {
	padding-bottom: 28px;
}

.update_notification {
	width: 370px;
	height: 160px;
	padding: .25em 1em;
	border-radius: 5px;
	position: fixed;
	left: calc(100% - 370px - 1em);
	bottom: 3em;
	background-color: #090909;
	box-shadow: 0px 0px 3px 1px #090909;

	.btn_restart {
		float: right;
		background-color: #D64437;
	}

	.btn_later {
		color: #fff;
		float: right;
	}
}
</style>