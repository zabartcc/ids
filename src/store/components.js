export default {
	namespaced: true,
	state: {
		components: {
			"atis": {
				enabled: null,
				pos_x: null,
				pos_y: null,
				size_x: null,
				size_y: null
			},
			"map":  null,
			"pirep": null,
			"status": null,
		}
	},
	actions: {
		setComponents: async ({commit}) => {
			const components = {
                "atis": JSON.parse(localStorage.getItem('atisComponent') || null),
                "map":  JSON.parse(localStorage.getItem('mapComponent')) || null,
                "pirep": JSON.parse(localStorage.getItem('pirepComponent')) || null,
                "status": JSON.parse(localStorage.getItem('statusComponent')) || null,
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