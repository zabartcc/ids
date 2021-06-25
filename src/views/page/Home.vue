<template>
	<div class="wrapper" ref="wrapper" v-if="components">
		<div class="empty" v-if="wrapperIsEmpty">
			<img :src="require('@/assets/images/icons/cactus.svg').default" alt="No components added" height="300" width="300" draggable="false" />
			<h3>It's empty here</h3>
			<h6 class="dropdown-trigger" data-target="components_selection">Try adding a new component</h6>
		</div>
		
		<div class="map" id="map" v-if="components.map && components.map.enabled === true">
			<Map :editing="editing" />
			<div class="margin"></div>
		</div>
		
		<div class="status" id="status" v-if="components.status && components.status.enabled === true">
			<Status :editing="editing" />
			<div class="margin"></div>
		</div>
	
		<div class="atis" id="atis" v-if="components.atis && components.atis.enabled === true">
			<Atis :editing="editing" />
			<div class="margin"></div>
		</div>
	
		<div class="pirep" id="pirep" v-if="components.pirep && components.pirep.enabled === true">
			<Pirep :editing="editing" />
			<div class="margin"></div>
		</div>

		<div class="charts" id="charts" v-if="components.charts && components.charts.enabled === true">
			<Charts :editing="editing" />
			<div class="margin"></div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';
import interact from 'interactjs';
import eventBus from '@/assets/js/eventBus';
import Map from '@/components/Map.vue';
import Atis from '@/components/Atis.vue';
import Pirep from '@/components/Pirep.vue';
import Status from '@/components/Status.vue';
import Charts from '@/components/Charts.vue';

interface State {
	windowSize: {
		x: number;
		y: number;
	};
	editing: boolean;
}

export default defineComponent({
	name: 'Home',
	data(): State {
		return {
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
		Status,
		Charts
	},
	async mounted() {
		await this.setComponents();
		this.initAllComponents();

		window.addEventListener('resize', this.windowResize);

		eventBus.$on('editToggle', (status: boolean) => {
			this.editing = status;
		});
	},
	methods: {
		windowResize(): void {
			this.windowSize.x = document.body.clientWidth;
			if(this.editing) this.initAllComponents();
		},
		initAllComponents(): void {
			if(this.components['atis'] && this.components['atis'].enabled === true) {
				this.setSize('atis');
				if(this.editing) this.initComponent('atis');
			}
			if(this.components['map'] && this.components['map'].enabled === true) {
				this.setSize('map');
				if(this.editing) this.initComponent('map');
			}
			if(this.components['status'] && this.components['status'].enabled === true) {
				this.setSize('status');
				if(this.editing) this.initComponent('status');
			}
			if(this.components['pirep'] && this.components['pirep'].enabled === true) {
				this.setSize('pirep');
				if(this.editing) this.initComponent('pirep');
			}
			if(this.components['charts'] && this.components['charts'].enabled === true) {
				this.setSize('charts');
				if(this.editing) this.initComponent('charts');
			}
		},
		stopAllEditing(): void {
			this.stopEditing('atis');
			this.stopEditing('map');
			this.stopEditing('status');
			this.stopEditing('pirep');
			this.stopEditing('charts');
		},
		setSize(compName: string): void {
			let comp = document.getElementById(compName);
			if(comp) {
				// Set intial position
				comp.style.transform = `translate(${this.components[compName].pos_x || 0}px, ${this.components[compName].pos_y || 0}px)`

				// Set initial height & width
				comp.style.width = `${this.components[compName].size_x || 600}px`;
				comp.style.height = `${this.components[compName].size_y || 290}px`;
			}
		},
		initComponent(compName: string): void {
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
						// @ts-ignore
						x: 0,
						y: 65,
						width: this.windowSize.x,
						height: this.windowSize.y
					}})
				]
			});

			el.resizable({
				preserveAspectRatio: false,
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
						
						position.x += event.deltaRect.left;
						position.y += event.deltaRect.top;

						event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
					}
				},
				modifiers: [
					interact.modifiers.restrictSize({
						min: { width: 600, height: 290 }
					})
				]
			});

			el.on('dragend', () => {
				this.updateComponent({
					name: compName,
					content: {
						...this.components[compName],
						pos_x: position.x,
						pos_y: position.y
					}
				});
			})
			
			el.on('resizeend', (event) => {
				event.interactable.draggable({
					modifiers: [
						interact.modifiers.restrictRect({restriction: {
							// @ts-ignore
							x: 0,
							y: 65,
							width: this.windowSize.x,
							height: this.windowSize.y
						}})
					]
				});

				this.updateComponent({
					name: compName,
					content: {
						...this.components[compName],
						pos_x: position.x,
						pos_y: position.y,
						size_x: event.rect.width,
						size_y: event.rect.height
					}
				});
			});
		},
		stopEditing(compName: string): void {
			if(this.components[compName] && this.components[compName].enabled === true) {
				interact(`.${compName}`).unset();
			}
		},
		...mapActions('components', [
			'setComponents',
			'updateComponent'
		])
	},
	computed: {
		wrapperIsEmpty(): boolean {
			if((this.components['atis'] === null || this.components['atis'].enabled === false) && (this.components['map'] === null || this.components['map'].enabled === false) && (this.components['pirep'] === null || this.components['pirep'].enabled === false) && (this.components['status'] === null || this.components['status'].enabled === false)) return true;
			else return false;
		},
		...mapState('components', [
			'components'
		])
	},
	watch: {
		editing: async function(value: boolean): Promise<void> {
			if(value === true) {
				this.initAllComponents();
			} else {
				this.stopAllEditing();
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
}

.atis, .pirep, .status, .map, .charts {
	box-sizing: border-box;
	max-width: 100vw;
	max-height: calc(100vh - 90px);
	position: absolute;

	.margin {
		width: 100%;
		height: 40px;
	}
}

.atis, .pirep, .charts {
	padding: 1em;

	::-webkit-scrollbar {
		width: 5px;
		height: 5px;
	}

	::-webkit-scrollbar-track {
		margin-top: 0;
		margin-bottom: 0;
		border-radius: 10px;
		background-color: #0F0F0F;
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