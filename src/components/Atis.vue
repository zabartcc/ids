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
				<form class="add_input" @submit.prevent=addStation>
					<input type="text" ref="new_atis_input" class="browser-default add_input" minlength="4" maxlength="4" v-model="atisInput" />
				</form>
			</div>
		</div>
		<div class="atis_wrapper">
			<AtisStrip v-for="station in userStations" :key=station.airport :info="station" />
		</div>
		<div class="edit_overlay" v-if="editing">
			<h2 class="component_name">ATIS</h2>
		</div>
	</div>
</template>

<script>
import AtisStrip from './AtisStrip.vue';
import {zabApi} from '@/helpers/axios.js';

export default {
	name: 'Atis',
	props: ['editing'],
	components: {
		AtisStrip
	},
	data() {
		return {
			userStations: {},
			allStations: {},
			newAtis: false,
			atisInput: '',
			sse: null
		}
	},
	async mounted() {
		await this.getAllStations();
		this.getUserStations();
		this.sse = new EventSource(`${process.env.VUE_APP_API_URL}/ids/atis`)
		this.sse.onmessage = this.handleAtisUpdate;
	},
	methods: {
		getUserStations() {
			const userStations = JSON.parse(localStorage.getItem('atis_stations')) || [];
			userStations.forEach(station => {
				if(Object.keys(this.allStations).includes(station)) {
					this.userStations[station] = this.allStations[station];
				}
			})
		},
		async getAllStations() {
			const { data } = await zabApi.get('/ids/stations');
			for await(const apt of data) {
				this.allStations[apt] = {
					airport: apt,
					letter: null,
					metar: null,
					dep: null,
					arr: null,
				}
				await this.getStationData(apt);
			}
		},
		async getStationData(station) {
			const {data} = (await zabApi.get(`/ids/stations/${station}`));
			const theStation = this.allStations[station];
			this.allStations[station] = {...theStation, ...data}
		},
		handleAtisUpdate({data}) {
			data = JSON.parse(data);
			const theStation = this.allStations[data.station];
			console.log({data, theStation})
			if(data.type == 'update') {
				this.allStations[data.station] = {...theStation, ...data}
			}
			if(data.type == 'delete') {
				this.allStations[data.station] = {
					...theStation,
					letter: null,
					dep: null,
					arr: null,
				} 
			}
			if(Object.keys(this.userStations).includes(data.station)) {
				this.userStations[data.station] = this.allStations[data.station];
			}
		},
		removeUserStation(station) {
			delete this.userStations[station];
			localStorage.setItem('atis_stations', JSON.stringify(Object.keys(this.userStations)));
		},
		addStation() {
			const station = this.atisInput.toUpperCase();
			if(Object.keys(this.allStations).includes(station)) {
				this.userStations[station] = this.allStations[station];
			}
			localStorage.setItem('atis_stations', JSON.stringify(Object.keys(this.userStations)));
			this.newAtis = !this.newAtis;
			this.atisInput = '';
		},
		// async addStation() {
		// 	if(this.addedStations.indexOf(this.atisInput.toUpperCase()) === -1) {
		// 		this.addedStations.push(this.atisInput.toUpperCase());
		// 		localStorage.removeItem('atis_stations');
		// 		localStorage.setItem('atis_stations', JSON.stringify(this.addedStations));
		// 		this.atisInput = '';
		// 		await this.getAllStations();

		// 	} else {
		// 		return this.atisInput = '';
		// 	}
		// 	await this.openAtis();
		// },
		openAtis() {
			this.newAtis = !this.newAtis;
			if(this.newAtis) {
				this.$nextTick(() => this.$refs.new_atis_input.focus())
			}
		}
	}
}
</script>

<style scoped lang="scss">
#atis {
	height: 100%;
	width: 100%;
	overflow: auto;
	background-color: #0F0F0F;
	border-radius: 15px;
	padding: 0;
	font-family: "Lucida Console", "Lucida Sans Typewriter", monaco;
}

.atis_wrapper {
	padding: 0 1em .5em 1em;
}
.top_bar {
	width: 100%;
	padding: .5em 1em .33em 1em;
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
