<template>
	<div class="footer" v-if="components">
		<div class="info">
			Version {{version}} | Last updated <span id="show_time">...</span>s ago
		</div>
		<div class="settings">
			<i class="material-icons dropdown-trigger tooltipped" data-target="components_selection" data-tooltip="Toggle Components" data-position="left">add_box</i>
			<i class="material-icons tooltipped" @click="toggleEditing" data-tooltip="Toggle Editing">edit</i>
			<a class="modal-trigger" href="#settings_modal"><i class="material-icons tooltipped" data-tooltip="Settings">settings</i></a>
		</div>
		<ul id="components_selection" class="dropdown-content">
			<li @click="toggleComponent('map')">
				<span class="check_box">
					<i class="material-icons" v-if="components.map && components.map.enabled">check</i>
				</span>

				MAP
			</li>
			<li @click="toggleComponent('status')">
				<span class="check_box">
					<i class="material-icons" v-if="components.status && components.status.enabled">check</i>
				</span>

				NEIGHBORS STATUS
			</li>
			<li @click="toggleComponent('atis')">
				<span class="check_box">
					<i class="material-icons" v-if="components.atis && components.atis.enabled">check</i>
				</span>

				ATIS
			</li>
			<li @click="toggleComponent('pirep')">
				<span class="check_box">
					<i class="material-icons" v-if="components.pirep && components.pirep.enabled">check</i>
				</span>

				PIREP
			</li>
			<li @click="toggleComponent('charts')">
				<span class="check_box">
					<i class="material-icons" v-if="components.charts && components.charts.enabled">check</i>
				</span>

				CHARTS
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';
// @ts-ignore
import M from 'materialize-css';
import eventBus from '@/assets/js/eventBus';

interface State {
	version: string | undefined;
	editing: boolean;
}

export default defineComponent({
	name: 'Footer',
	data(): State {
		return {
			version: process.env.VUE_APP_VERSION_ID,
			editing: false
		};
	},
	emits: ['reload'],
	async mounted() {
		setInterval(() => {
			const secondsPassed = Math.ceil((Date.now() - this.timestamp) / 1000)
			if(document !== null) {
				// @ts-ignore
				document.getElementById('show_time').innerHTML = (secondsPassed > 500 ? '...' : secondsPassed.toString());
			}
		}, 1000);
		// @ts-ignore
		this.$nextTick(() => { 
			M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {
				alignment: 'right',
				container: '.dropdown_container',
				coverTrigger: false,
				closeOnClick: false
			});
		});
	},
	methods: {
		toggleEditing(): void {
			this.editing === true ? this.editing = false : this.editing = true;
			eventBus.$emit('editToggle', this.editing);
			if(this.editing === false) {
				eventBus.$emit('resizeMap'); // Resize base map layer after resizing
			}
		},
		toggleComponent(name: string): void {
			if(this.components[name] === null) {
				this.updateComponent({
					name, 
					content: {enabled: true}
				});
			} else {
				this.updateComponent({
					name, 
					content: {
						enabled: this.components[name].enabled === true ? false : true
					}
				});
			}

			this.$emit('reload');
		},
		...mapActions('components', [
			'updateComponent'
		])
	},
	computed: {
		...mapState('timer', [
			'timestamp'
		]),
		...mapState('components', [
			'components'
		])
	}
});
</script>

<style scoped lang="scss">
.footer {
	font-family: "Lucida Console", "Lucida Sans Typewriter", monaco;
	background-color: #0F0F0F;
	padding: .4em 2em;
	font-size: .80rem;
	position: fixed;
	height: 25px;
	width: 100vw;
	bottom: 0;
	color: #6C6C6C;

	.info {
		color: #6C6C6C;
	}

	.settings {
		float: right;

		i {
			font-size: 1.1rem;
			vertical-align: middle;
			margin-top: -2.5rem;
			cursor: pointer;
			user-select: none;
			color: #BFBFBF;

			+i, +a {
				margin-left: .25em;
			}
		}
	}

	#components_selection {
		width: 200px!important;
		position: absolute;
		top: -200px!important;
		left: calc(100% - 270px)!important;
		background: #0D0D0D;
		box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.24), 0 3px 1px 2px rgba(0, 0, 0, 0.22), 0 1px 10px 0 rgba(0, 0, 0, 0.20);
		padding-right: 0;
		margin-right: 0;

		li {
			height: 40px;
			min-height: 0;
			padding: .65em .5em .5em .5em;
			color: #fff;
			font-size: 1rem;

			.check_box {
				float: left;
				margin: 0;
				padding: 0;
				padding-right: 1em;
				width: 35px;
				height: 30px;
				color: #fff;
				margin-top: -3px;
			}

			&:hover {
				background: rgba(255, 255, 255, 0.05);
			}
		}
	}
}

</style>