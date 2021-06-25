<template>
	<div id="atis">
		<div class="top_bar">
			<div class="title">
				ATIS
			</div>
			<div class="add tooltipped" data-tooltip="Add ATIS">
				<i class="material-icons" @click="openAtis">add_box</i>
			</div>
			<div class="add_atis" v-show="newAtis">
				<form class="add_input" @submit.prevent="addStation">
					<input type="text" ref="new_atis_input" class="browser-default add_input" :minlength="4" :maxlength="4" v-model="atisInput" />
				</form>
			</div>
		</div>
		<div class="atis_wrapper">
			<AtisStrip v-for="station in userStations" :key="station.airport" :info="station" />
		</div>
		<div class="edit_overlay" v-if="editing">
			<h2 class="component_name">ATIS</h2>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { zabApi } from '@/helpers/axios';
import { mapActions } from 'vuex';
import AtisStrip from './AtisStrip.vue';

interface State {
	enabledStations: Array<string>;
	allStations: Array<AtisStations>;
	newAtis: boolean;
	atisInput: string;
	sse: EventSource | null;
}

export default defineComponent({
	name: 'Atis',
	props: {
		editing: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	components: {
		AtisStrip
	},
	data(): State {
		return {
			enabledStations: [],
			allStations: [],
			newAtis: false,
			atisInput: '',
			sse: null
		}
	},
	async mounted() {
		await this.getAllStations();
		this.enabledStations = JSON.parse(localStorage.getItem('atis_stations') || "[]");
		this.sse = new EventSource(`${process.env.VUE_APP_API_URL}/ids/atis`);
		this.sse.onmessage = this.handleAtisUpdate;
	},
	methods: {
		async getAllStations(): Promise<void> {
			const { data } = await zabApi.get('/ids/stations');
			for await(const apt of data) {
				this.allStations.push({
					airport: apt
				});
				await this.getStationData(apt);
			}
			this.setTimestamp(Date.now());
		},
		async getStationData(airport: string): Promise<void> {
			const {data} = await zabApi.get(`/ids/stations/${airport}`);
			const i = this.allStations.findIndex(station => station.airport === airport);
			const theStation = this.allStations[i];
			this.allStations[i] = { ...theStation, ... data};
		},
		handleAtisUpdate({data}: any): void {
			data = JSON.parse(data);
			const i = this.allStations.findIndex((s) => s.airport === data.station);
			const theStation = this.allStations[i];
			if(data.type == 'update') {
				this.allStations[i] = {...theStation, ...data}
			}
			if(data.type == 'delete') {
				this.allStations[i] = {
					...theStation
				} 
			}
			this.setTimestamp(Date.now());
		},
		removeUserStation(airport: string): void {
			const i = this.enabledStations.findIndex(station => station === airport);
			delete this.enabledStations[i];
			localStorage.setItem('atis_stations', JSON.stringify(this.enabledStations));
		},
		addStation(): void {
			const station = this.atisInput.toUpperCase();
			if(!this.enabledStations.includes(station)) {
				this.enabledStations.push(station);
			}
			localStorage.setItem('atis_stations', JSON.stringify(this.enabledStations));
			this.newAtis = !this.newAtis;
			this.atisInput = '';
		},
		openAtis(): void {
			this.newAtis = !this.newAtis;
			if(this.newAtis) {
				this.$nextTick(() => (this.$refs.new_atis_input as any).focus())
			}
		},
		...mapActions('timer', [
			'setTimestamp'
		])
	},
	computed: {
		userStations(): Array<AtisStations> {
			let stationsToReturn = [];

			for(const enabledStation of this.enabledStations) {
				for(const station of this.allStations) {
					if(enabledStation === station.airport) {
						stationsToReturn.push(station);
					}
				}
			}
			return stationsToReturn;
		}
	}
});
</script>

<style scoped lang="scss">
#atis {
	height: 100%;
	width: 100%;
	background-color: #0F0F0F;
	border-radius: 15px;
	padding: 0 0 0 0;
	font-family: "Lucida Console", "Lucida Sans Typewriter", monaco;
	overflow: hidden;
}

.atis_wrapper {
	box-sizing: border-box;
	overflow: auto;
	height: calc(100% - 40px);
	padding: 0 1em;
}

.top_bar {
	width: 100%;
	padding: .5em .75em .33em 1em;
	margin-bottom: 5px;
	.add {
		float: right;
		margin-top: -25px;
		cursor: pointer;
		user-select: none;
	}
}

.add_atis {
	margin: 10px 0 0 px;
	width: 200px;
	height: 45px;
	margin-top: -85px;
	z-index: 500;
	position: absolute;
	right: 10px;
	background: #0F0F0F;
	padding: 5px;

	&::before {
		left: 145px;
		content: "";
		display: inline-block;
		position: absolute;
		width: 0;
		height: 0;
		bottom: -10px;
		border-style: solid;
		border-width: 0 10px 10px 10px;
		border-color: transparent transparent #0F0F0F transparent;
		transform: rotate(180deg);
	}

	.add_input {
		background: #212121;
		height: 100%;
		width: 100%;
		border: none;
		color: #fff;
		outline: #121212;
		padding-left: .25em;
		font-size: 1.15rem;
		font-family: inherit;
	}
}

.hidden {
	display: none;
}
</style>
