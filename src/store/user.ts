// @ts-ignore
import M from 'materialize-css';
import { zabApi } from '@/helpers/axios';
import router from '../router/index';
import { Commit } from 'vuex';

export default {
	namespaced: true,
	state: {
		user: {
			data: null,
			isLoggedIn: false
		}
	},
	actions: {
		setData: async ({commit}: {commit: Commit}, userData: Record<string, any>): Promise<void> => {
			if(userData) {
				commit('setUser', userData);
				commit('setLoggedIn', true);
				return;
			}
		},
		getData: async({commit}: {commit: Commit}, token: string): Promise<void> => {
			try {
				if((localStorage.getItem('guest') === 'true' && localStorage.getItem('ids_token') !== '') || (localStorage.getItem('guest') !== 'true' && localStorage.getItem('ids_token') !== undefined)) {
					const {data} = await zabApi.post('/ids/checktoken', {
						token: token
					});
					if(data.ret_det.code === 200) {
						commit('setUser', data.data);
						commit('setLoggedIn', true);
						localStorage.setItem('guest', 'false')
						router.push('/home');
						return;
					} else {
						commit('setUser', null);
						commit('setLoggedIn', false);
						M.toast({
							html: `<i class="material-icons left">error_outline</i> ${data.ret_det.message} <div class="border"></div>`,
							displayLength: 5000,
							classes: 'toast toast_error'
						});
						router.push('/');
					}
				} else {
					return;
				}
			} catch(e) {
				console.log(e);
			}
		}
	},
	mutations: {
		setUser (state: Record<string, any>, user: Record<string, any>): void {
			state.user.data = user;
		},
		setLoggedIn (state: Record<string, any>, loggedIn: boolean): void {
			state.user.isLoggedIn = loggedIn;
		},
	},
	getters: {
		getUserData(state: Record<string, any>): Record<string, any> {
			return state.user.data
		}
	}
};