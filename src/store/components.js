export default {
	namespaced: true,
	state: {
		components: {
			"atis": null,
			"map":  null,
			"pirep": null,
			"status": null,
		}
	},
	actions: {
		setComponents: async ({commit}, components) => {
			if(components) {
				commit('setComponentsMutation', components);
				return;
			}
		},
		updateComponent: async ({commit}, name, content) => {
			if(name) {
				commit('updateComponentsMutation', name, content);
				return;
			}
		}
	},
	mutations: {
		setComponentsMutation (state, components) {
			state.components = components;
		},
		updateComponentsMutation (state, name, content) {
			state.components[name] = content;
		}
	},
	getters: {
		getComponents: state => state.components,
	}
};