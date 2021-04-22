<template>
	<div class="footer" v-if="componentsSet">
		<div class="info">
			Version {{version || 'dev'}} | Last updated <span id="show_time">...</span>s ago
		</div>
		<div class="settings">
			<i class="material-icons dropdown-trigger tooltipped" data-target="components_selection" data-tooltip="Toggle Components" data-position="left">add_box</i>
			<i class="material-icons tooltipped" @click="toggleEditing" data-tooltip="Toggle Editing">edit</i>
			<i class="material-icons tooltipped" data-tooltip="Settings">settings</i>
		</div>
		<ul id="components_selection" class="dropdown-content">
			<li @click="toggleComponent('map')">
				<span class="check_box">
					<i class="material-icons" v-if="componentsSet.map && componentsSet.map.enabled">check</i>
				</span>

				MAP
			</li>
			<li @click="toggleComponent('status')">
				<span class="check_box">
					<i class="material-icons" v-if="componentsSet.status && componentsSet.status.enabled">check</i>
				</span>

				NEIGHBORS STATUS
			</li>
			<li @click="toggleComponent('atis')">
				<span class="check_box">
					<i class="material-icons" v-if="componentsSet.atis && componentsSet.atis.enabled">check</i>
				</span>

				ATIS
			</li>
			<li @click="toggleComponent('pirep')">
				<span class="check_box">
					<i class="material-icons" v-if="componentsSet.pirep && componentsSet.pirep.enabled">check</i>
				</span>

				PIREP
			</li>
		</ul>
	</div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import M from 'materialize-css';
import eventBus from '@/assets/js/eventBus.js';

export default {
	name: 'Footer',
	data() {
		return {
			version: process.env.VUE_APP_VERSION_ID,
			componentsSet: null,
			editing: false
		};
	},
	emits: ['reload'],
	async mounted() {
		setInterval(() => {
			const secondsPassed = Math.ceil((Date.now() - this.timestamp) / 1000)
			document.getElementById('show_time').innerHTML = (secondsPassed > 500 ? '...' : secondsPassed);
		}, 1000);

		this.$nextTick(() => { 
			M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {
				alignment: 'right',
				container: '.dropdown_container',
				coverTrigger: false,
				closeOnClick: false
			});
		});

		this.componentsSet = this.components;
	},
	methods: {
		toggleEditing() {
			this.editing === true ? this.editing = false : this.editing = true;
			eventBus.$emit('editToggle', this.editing);
		},
		toggleComponent(name) {
			const component = localStorage.getItem(`${name}Component`);

			if(component !== null) {
				const json = JSON.parse(component);
				json.enabled === true ? json.enabled = false : json.enabled = true;
				localStorage.setItem(`${name}Component`, JSON.stringify(json));
				this.componentsSet[name] = json;
			} else {
				const string = JSON.stringify({"enabled": true});
				localStorage.setItem(`${name}Component`, string);
				this.componentsSet[name] = {
					enabled: true
				};
			}

			this.updateComponent(name, this.componentsSet[name]);
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
};
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

			+i {
				margin-left: .25em;
			}
		}
	}

	#components_selection {
		width: 200px!important;
		position: absolute;
		top: -170px!important;
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
				display: inline-block;
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