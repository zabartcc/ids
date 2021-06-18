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
	<div ref="settings_wrap" class="settings_wrap" v-if="showSettings">
		<h6>Settings</h6>
		<div class="input-field">
			<div class="label">IDS Token</div>
			<input id="token" type="text" v-model="settings.token">
		</div>
		<button class="btn waves-effect right" @click="updateSettings">Update</button>
		<button class="btn-flat waves-effect right" @click.prevent="userLogout">Logout</button>
	</div>
</template>

<script lang="ts">
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
}

export default defineComponent({
	data(): State {
		return {
			showSettings: false,
			settings: {
				token: null
			},
			reloadKey: 0
		}
	},
	components: {
		Header,
		Footer
	},
	async mounted() {
		await this.getData(localStorage.getItem('ids_token') || '');

		this.settings.token = localStorage.getItem('ids_token');

		window.addEventListener('keydown', e => {
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
		async updateSettings(): Promise<void> {
			localStorage.setItem('ids_token', (this.settings.token || ''));
			await this.getData(localStorage.getItem('ids_token') || '');
			this.$router.go(0);
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
			color: #6C6C6C;
			text-align: center;
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
</style>