import { Commit } from 'vuex';

export default {
	namespaced: true,
	state: {
		timestamp: null
	},
	mutations: {
		mutateTimestamp(state: Record<string, any>, stamp: number): void {
			state.timestamp = stamp;
		}
	},
	actions: {
		setTimestamp({commit}: {commit: Commit}, amount: number): void {
			commit('mutateTimestamp', amount);
		}
	},
	getters: {
		getTimestamp(state: Record<string, any>): number {
			return state.timestamp;
		}
	}
}