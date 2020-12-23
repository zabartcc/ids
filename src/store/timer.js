export default {
	namespaced: true,
	state: {
		timestamp: null
	},
	mutations: {
		mutateTimestamp(state, stamp) {
			state.timestamp = stamp;
		}
	},
	actions: {
		setTimestamp({commit}, amount) {
			commit('mutateTimestamp', amount);
		}
	},
	getters: {
		getTimestamp(state) {
			return state.timestamp;
		}
	}
}