import M from 'materialize-css';
import {zabApi} from '@/helpers/axios';
import router from '../router/index';

export default {
	namespaced: true,
	state: {
		user: {
			data: null,
			isLoggedIn: false
		}
	},
	actions: {
		setData: async ({commit}, userData) => {
			if(userData) {
				commit('setUser', userData);
				commit('setLoggedIn', true);
				return;
			}
		},
		getData: async({commit}, token) => {
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
		setUser (state, user) {
			state.user.data = user;
		},
		setLoggedIn (state, loggedIn) {
			state.user.isLoggedIn = loggedIn;
		},
	},
	getters: {
		getUserData: state => state.user.data,
	}
};