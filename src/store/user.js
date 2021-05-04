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
				const {data} = await zabApi.post('/ids/checktoken', {
					token: token
				});
				if(data.ret_det.code === 200) {
					commit('setUser', data.data);
					commit('setLoggedIn', true);
					return;
				} else {
					commit('setUser', null);
					commit('setLoggedIn', false);
					router.push('/');
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