import { Commit } from 'vuex';

export default {
	namespaced: true,
	state: {
		components: {
			"atis": null,
			"map":  null,
			"pirep": null,
			"status": null,
			"charts": null
		}
	},
	actions: {
		setComponents: async ({commit}: {commit: Commit}): Promise<void> => {
			const components = {
                "atis": JSON.parse(localStorage.getItem('atisComponent') || 'null'),
                "map":  JSON.parse(localStorage.getItem('mapComponent') || 'null'),
                "pirep": JSON.parse(localStorage.getItem('pirepComponent') || 'null'),
                "status": JSON.parse(localStorage.getItem('statusComponent') || 'null'),
				"charts": JSON.parse(localStorage.getItem('chartsComponent') || 'null')
            }
			commit('setComponentsMutation', components);
			return;
		},
		updateComponent: async ({commit}: {commit: Commit}, {name, content}: {name: string, content: Record<string, any>}): Promise<void> => {
			if(name) {
				commit('updateComponentsMutation', {
					name,
					content
				});
				localStorage.setItem(`${name}Component`, JSON.stringify(content));
				return;
			}
		}
	},
	mutations: {
		setComponentsMutation (state: Record<string, any>, components: Record<string, any>): void {
			state.components = components;
		},
		updateComponentsMutation (state: Record<string, any>, {name, content}: {name: string, content: Record<string, any>}): void {
			state.components[name] = content;
		}
	},
	getters: {
		getComponents(state: Record<string, any>): Record<string, any> {
			return state.components
		}
	}
};