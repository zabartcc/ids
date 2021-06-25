<template>
	<div id="charts">
		<div class="top_bar">
			<div class="title">
				CHARTS
			</div>
			<div class="remove tooltipped" data-tooltip="Remove airports">
				<i class="material-icons" @click="toggleRemoving" :class="removing ? `red-text` : ``">delete</i>
			</div>
			<div class="add tooltipped" data-tooltip="Add airport">
				<i class="material-icons" @click="openAddBox">add_box</i>
			</div>
			<div class="add_airport" v-show="newAirport">
				<form class="add_input" @submit.prevent="addAirport">
					<input type="text" ref="new_airport_input" class="browser-default add_input" :minlength="4" :maxlength="4" v-model="airportInput" />
				</form>
			</div>
		</div>
		<div class="charts_wrapper">
			<div class="airports">
				<div v-for="airport in sortedAirports" :key="airport.id">
					<div :class="`airport_button ${airport.class}`" @click="setOpenedAirport(airport.id)" v-if="!removing">
						{{airport.id}}
					</div>
					<div :class="`airport_button ${airport.class}`" @click="removeAirport(airport.id)" v-else>
						{{airport.id}}
					</div>
					<div class="charts_list" v-if="opened === airport.id">
						<ChartList :airport="airport" />
					</div>
				</div>
			</div>
		</div>
		<div class="edit_overlay" v-if="editing">
			<h2 class="component_name">CHARTS</h2>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ChartList from '@/components/ChartList.vue';

interface State {
	airports: Array<Record<string, any>>;
	newAirport: boolean;
	airportInput: string;
	airspace: {
		bravo: Array<string>;
		charlie: Array<string>;
		delta: Array<string>;
	},
	opened?: string;
	removing: boolean;
}

export default defineComponent({
	name: 'Charts',
	props: {
		editing: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	components: {
		ChartList
	},
	data(): State {
		return {
			airports: [],
			newAirport: false,
			airportInput: '',
			airspace: {
				bravo: ['KPHX'],
				charlie: ['KABQ', 'KAMA', 'KDMA', 'KELP', 'KTUS'],
				delta: ['KAEG', 'KBIF', 'KCHD', 'KCVS', 'KDVT', 'KFFZ', 'KFHU', 'KFLG', 'KGEU', 'KGYR', 'KHMN', 'KIWA', 'KLUF', 'KPRC', 'KROW', 'KRYN', 'KSAF', 'KSDL']
			},
			opened: undefined,
			removing: false
		}
	},
	async mounted() {
		this.airports = JSON.parse(localStorage.getItem('chart_airports') || "[]");
	},
	methods: {
		addAirport(): void {
			const airport = this.airportInput.toUpperCase();
			let airportClass = 'other';

			if(this.airspace.bravo.includes(airport)) airportClass = 'bravo';
			else if(this.airspace.charlie.includes(airport)) airportClass = 'charlie';
			else if(this.airspace.delta.includes(airport)) airportClass = 'delta';

			if(!this.airports.some(a => a.id === airport)) {
				this.airports.push({
					id: airport,
					class: airportClass
				});
			}
			localStorage.setItem('chart_airports', JSON.stringify(this.airports));
			this.newAirport = !this.newAirport;
			this.airportInput = '';
		},
		toggleRemoving(): void {
			this.removing = !this.removing;
		},
		removeAirport(id: string): void {
			const i = this.airports.findIndex(a => a.id === id);
			this.airports.splice(i, 1);
			localStorage.setItem('chart_airports', JSON.stringify(this.airports));
		},
		openAddBox(): void {
			this.newAirport = !this.newAirport;
			if(this.newAirport) {
				this.$nextTick(() => (this.$refs.new_airport_input as any).focus())
			}
		},
		setOpenedAirport(id?: string): void {
			this.opened = id;
		}
	},
	computed: {
		sortedAirports(): Array<Record<string, any>> {
			return [...this.airports].sort((a, b) => a.class.localeCompare(b.class) || a.id.localeCompare(b.id));
		}
	}
});
</script>

<style scoped lang="scss">
#charts {
	height: 100%;
	width: 100%;
	background-color: #0F0F0F;
	border-radius: 15px;
	padding: 0 .75em 1em 1em;
	font-family: "Lucida Console", "Lucida Sans Typewriter", monaco;
}


.charts_wrapper {
	box-sizing: border-box;
	height: calc(100% - 40px);
}
.top_bar {
	width: 100%;
	padding: .5em 0 .33em 0;
	margin-bottom: 5px;

	.add, .remove {
		float: right;
		margin-top: -25px;
		cursor: pointer;
		user-select: none;
	}
}

.add_airport {
	margin: 10px 0 0 px;
	width: 200px;
	height: 45px;
	margin-top: -85px;
	z-index: 500;
	position: absolute;
	right: 22px;
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

.airports {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	.airport_button {
		border-radius: 3px;
		background-color: #252525;
		font-size: 1.2rem;
		padding: .5em 1em;
		margin-right: .75em;
		margin-bottom: .75em;
		cursor: pointer;
		user-select: none;

		&.bravo {
			border-bottom: 3px solid #388CDA;
		}

		&.charlie {
			border-bottom: 3px solid #B73D6E;
		}

		&.delta {
			border-bottom: 3px solid #13528C;
		}

		&.other {
			border-bottom: 3px solid #606263;
		}
	}
}
</style>
