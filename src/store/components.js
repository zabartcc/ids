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
		setComponents: async ({commit}) => {
			const components = {
                "atis": JSON.parse(localStorage.getItem('atisComponent')) || null,
                "map":  JSON.parse(localStorage.getItem('mapComponent')) || null,
                "pirep": JSON.parse(localStorage.getItem('pirepComponent')) || null,
                "status": JSON.parse(localStorage.getItem('statusComponent')) || null,
				"charts": JSON.parse(localStorage.getItem('chartsComponent')) || null
            }
			commit('setComponentsMutation', components);
			return;
		},
		updateComponent: async ({commit}, {name, content}) => {
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
		setComponentsMutation (state, components) {
			state.components = components;
		},
		updateComponentsMutation (state, {name, content}) {
			state.components[name] = content;
		}
	},
	getters: {
		getComponents: state => state.components,
	}
};