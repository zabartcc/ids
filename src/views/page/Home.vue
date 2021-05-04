<template>
	<div class="wrapper" ref="wrapper">
		<div class="empty" v-if="wrapperIsEmpty">
			<img :src="require('@/assets/images/icons/cactus.svg')" alt="No components added" height="300" width="300" draggable="false" />
			<h3>It's empty here</h3>
			<h6 class="dropdown-trigger" data-target="components_selection">Try adding a new component</h6>
		</div>
		
		<div class="map" id="map" v-if="components.map !== null && components.map.enabled">
			<Map :editing="editing" />
			<div class="margin"></div>
		</div>
		
		<div class="status" id="status" v-if="components.status !== null && components.status.enabled">
			<Status :editing="editing" />
			<div class="margin"></div>
		</div>
	
		<div class="atis" id="atis" v-if="components.atis !== null && components.atis.enabled">
			<Atis :editing="editing" />
			<div class="margin"></div>
		</div>
	
		<div class="pirep" id="pirep" v-if="components.pirep !== null && components.pirep.enabled">
			<Pirep :editing="editing" />
			<div class="margin"></div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import interact from 'interactjs';
import eventBus from '@/assets/js/eventBus';
import Map from '@/components/Map.vue';
import Atis from '@/components/Atis.vue';
import Pirep from '@/components/Pirep.vue';
import Status from '@/components/Status.vue';

export default defineComponent({
	name: 'Home',
	data() {
		return {
			components: {
				"atis": null,
				"map": null,
				"pirep": null,
				"status": null
			},
			windowSize: {
				x: document.body.clientWidth,
				y: 5000
			},
			editing: false
		};
	},
	components: {
		Map,
		Atis,
		Pirep,
		Status
	},
	async mounted() {
		await this.getComponents();
		await this.initAllComponents();

		window.addEventListener('resize', this.windowResize);

		eventBus.$on('editToggle', (status) => {
			this.editing = status;
		})
	},
	methods: {
		getComponents() {
			this.components = {
				"atis": JSON.parse(localStorage.getItem('atisComponent') || null),
				"map":  JSON.parse(localStorage.getItem('mapComponent')) || null,
				"pirep": JSON.parse(localStorage.getItem('pirepComponent')) || null,
				"status": JSON.parse(localStorage.getItem('statusComponent')) || null,
			}
			this.setComponents(this.components);
		},
		windowResize() {
			this.windowSize.x = document.body.clientWidth;
			if(this.editing) this.initAllComponents();
		},
		async initAllComponents() {
			if(this.components['atis'] && this.components['atis'].enabled === true) {
				await this.setSize('atis');
				if(this.editing) await this.initComponent('atis');
			}
			if(this.components['map'] && this.components['map'].enabled === true) {
				await this.setSize('map');
				if(this.editing) await this.initComponent('map');
			}
			if(this.components['status'] && this.components['status'].enabled === true) {
				await this.setSize('status');
				if(this.editing) await this.initComponent('status');
			}
			if(this.components['pirep'] && this.components['pirep'].enabled === true) {
				await this.setSize('pirep');
				if(this.editing) await this.initComponent('pirep');
			}
		},
		async destroyAllEditing() {
			if(this.components['atis'] && this.components['atis'].enabled === true) {
				await this.destroyEditing('atis');
			}
			if(this.components['map'] && this.components['map'].enabled === true) {
				await this.destroyEditing('map');
			}
			if(this.components['status'] && this.components['status'].enabled === true) {
				await this.destroyEditing('status');
			}
			if(this.components['pirep'] && this.components['pirep'].enabled === true) {
				await this.destroyEditing('pirep');
			}
		},
		setSize(compName) {
			// Set intial position
			document.getElementById(compName).style.transform = `translate(${this.components[compName].pos_x || 0}px, ${this.components[compName].pos_y || 0}px)`

			// Set initial height & width
			document.getElementById(compName).style.width = `${this.components[compName].size_x || 600}px`;
			document.getElementById(compName).style.height = `${this.components[compName].size_y || 300}px`;
		},
		initComponent(compName) {
			const el = interact(`.${compName}`);
			const position = {x: this.components[compName].pos_x || 0, y: this.components[compName].pos_y || 0};

			el.draggable({
				origin: 'parent',
				listeners: {
					move (event) {
						position.x += event.dx;
						position.y += event.dy;

						event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
					},
				},
				modifiers: [
					interact.modifiers.restrictRect({restriction: {
						x: 0,
						y: 65,
						width: this.windowSize.x,
						height: this.windowSize.y
					}})
				]
			});

			el.resizable({
				edges: {
					top: true,
					left: true,
					bottom: true,
					right: true
				},
				listeners: {
					move: function (event) {
						event.target.style.width = `${event.rect.width}px`;
						event.target.style.height = `${event.rect.height}px`;
					}
				},
				modifiers: [
					interact.modifiers.restrictSize({
						min: { width: 600, height: 300 }
					})
				]
			});

			el.on('dragend', () => {
				this.components[compName].pos_x = position.x;
				this.components[compName].pos_y = position.y;
				localStorage.setItem(`${compName}Component`, JSON.stringify(this.components[compName]));
			})
			
			el.on('resizeend', (event) => {
				console.log('resizeend');
				event.interactable.draggable({
					modifiers: [
						interact.modifiers.restrictRect({restriction: {
							x: 0,
							y: 65,
							width: this.windowSize.x,
							height: this.windowSize.y
						}})
					]
				});
				this.components[compName].size_x = event.rect.width;
				this.components[compName].size_y = event.rect.height;
				localStorage.setItem(`${compName}Component`, JSON.stringify(this.components[compName]));
			});
		},
		destroyEditing(compName) {
			interact(`.${compName}`).unset()
		},
		...mapActions('components', [
			'setComponents'
		]),
	},
	computed: {
		wrapperIsEmpty() {
			if((this.components['atis'] === null || this.components['atis'].enabled === false) && (this.components['map'] === null || this.components['map'].enabled === false) && (this.components['pirep'] === null || this.components['pirep'].enabled === false) && (this.components['status'] === null || this.components['status'].enabled === false)) return true;
			else return false;
		}
	},
	watch: {
		editing: async function(value) { // get new data if route remains the same but parameter changes
			console.log('watcher worked');
			if(value === true) {
				await this.initAllComponents();
			} else {
				await this.destroyAllEditing();
			}
		}
	}
});
</script>

<style scoped lang="scss">
.wrapper {
	min-height: 100%;
	height: auto;
}

.bottom {
	height: 35vh;
}

.map, .status {
	padding: 1em;
	width: 100%;
	height: 50vh;
	border-radius: 10px;
	box-sizing: border-box;
}

.atis, .pirep, .status, .map {
	box-sizing: border-box;
	max-width: 100vw;
	max-height: calc(100vh - 90px);
	position: absolute;

	.margin {
		width: 100%;
		height: 40px;
	}
}

.atis, .pirep {
	padding: 1em;

	::-webkit-scrollbar {
		width: 5px;
		height: 5px;
	}

	::-webkit-scrollbar-track {
		margin-top: 0;
		margin-bottom: 0;
		border-radius: 10px;
	}

	::-webkit-scrollbar-thumb {
		background-color: #1E1E1E;
		border-radius: 10px;
	}

	::-webkit-scrollbar-corner {
		background-color: transparent;
	}
}

.empty {
	text-align: center;
	user-select: none;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	h3 {
		color: #2A2A2A;
	}
	
	h6 {
		color: #333333;
		margin-top: -0.5em;
		text-decoration: underline;
		cursor: pointer;
	}
}

.loading_wrapper {
	padding: 2em;
}

@media only screen and (max-width: 1200px) {
	.status {
		margin-top: 1.75em;
	}

	.top {
		margin-bottom: 0;
	}
}

</style>