import {zabApi} from '@/helpers/axios.js';
import router from '../router/index.js';

export default {
	namespaced: true,
	state: {
		userQueryComplete: false,
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
			commit('setQuery', true);
		},
		getData: async({commit}) => {
			const {data} = await zabApi.post('/ids/checktoken');
			if(data.ret_det.code === 200) {
				commit('setUser', data.data);
				commit('setLoggedIn', true);
				return;
			} else {
				commit('setUser', null);
				commit('setLoggedIn', false);
				router.push('/');
			}
		}
	},
	mutations: {
		setUser (state, user) {
			state.user.data = user;
		},
		setQuery (state, query) {
			state.userQueryComplete = query;
		},
		setLoggedIn (state, loggedIn) {
			state.user.isLoggedIn = loggedIn;
		},
	},
	getters: {
		hasQueryCompleted: state => state.userQueryComplete,
		getUserData: state => state.user.data,
	}
};