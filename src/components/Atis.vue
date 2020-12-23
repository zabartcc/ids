<template>
	<div id="atis">
		<div class="top_bar">
			<div class="title">
				ATIS
			</div>
			<div class="add">
				<i class="material-icons" @click="openAtis">add_box</i>
			</div>
			<div class="add_atis" v-if="newAtis">
				<form class="add_input" @submit.prevent=addStation>
					<input type="text" class="browser-default add_input" minlength="4" maxlength="4" v-model="atisInput" />
				</form>
			</div>
		</div>
		<div v-for="station in stations" :key="station._id" class="atis_wrapper">
			<AtisStrip :info="station" />
		</div>
	</div>
</template>

<script>
import AtisStrip from './AtisStrip.vue';
import {zabApi} from '@/helpers/axios.js';

export default {
	name: 'Atis',
	props: {
	},
	components: {
		AtisStrip
	},
	data() {
		return {
			addedStations: null,
			stations: [],
			newAtis: false,
			atisInput: ''
		}
	},
	async mounted() {
		await this.getStations();
		await this.loadStations();
		setInterval(this.loadStations, 120000); // Two minutes
	},
	methods: {
		async getStations() {
			this.addedStations = localStorage.getItem('atis_stations') ? JSON.parse(localStorage.getItem('atis_stations')) : [];
		},
		async loadStations() {
			const {data} = await zabApi.get('/online/atis');
			this.stations = [];
			data.forEach((station) => {
				if(this.addedStations.includes(station.airport)) {
					this.stations.push(station);
				}
			});
		},
		async addStation() {
			if(this.addedStations.indexOf(this.atisInput) === -1) {
				this.addedStations.push(this.atisInput);
				localStorage.removeItem('atis_stations');
				localStorage.setItem('atis_stations', JSON.stringify(this.addedStations));
				this.atisInput = '';
				await this.loadStations();

			} else {
				return this.atisInput = '';
			}
			await this.openAtis();
		},
		openAtis() {
			this.newAtis = !this.newAtis;
		}
	}
}
</script>

<style scoped lang="scss">
	#atis {
		height: 100%;
		width: 100%;
		background-color: #0F0F0F;
		border-radius: 15px;
		padding: 0;
		font-family: "Lucida Console", "Lucida Sans Typewriter", monaco;
	}

	.atis_wrapper {
		min-height: 90%;
		padding: 0 1em;
		width: 100%;
		overflow: auto;
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
