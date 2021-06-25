<template>
	<div id="atis-strip">
		<div class="row border_bottom">
			<div class="col s2 title">
				{{info.airport}}
			</div>
			<div class="col s9">
				AREA STATUS INFORMATION
			</div>
			<div class="col s1 delete_atis">
				<i class="material-icons tiny" @click="delAtis(info.airport)">clear</i>
			</div>
		</div>
		<div class="row">
			<div class="col s1 atis_code" :id="`atis_code_${info.airport}`" @click="confirmUpdateSeen(info.airport)">
				{{info.letter || '—'}}
			</div>
			<div class="col s3 runways">
				<div class="landing">
					<div class="runway_title">
						Landing
					</div>
					<div class="runway_identifier">
						{{info.arr || '-'}}
					</div>
				</div>
				<div class="departing">
					<div class="runway_title">
						Departing
					</div>
					<div class="runway_identifier">
						{{info.dep || '-'}}
					</div>
				</div>
			</div>
			<div class="col s8 weather">
				<div class="wind">
					<div class="row">
						<div class="col s6">
							ALTIMETER
							<span class="display">
								{{parsedMetar.altimeter.inches.toFixed(2)}}
							</span>
						</div>
						<div class="col s6">
							WIND
							<span class="display">
								{{('00' + parsedMetar.wind.direction).slice(-3)}} {{('0' + parsedMetar.wind.speedKt).slice(-2)}}<span v-if="parsedMetar.wind.gust">G{{parsedMetar.wind.gust}}</span>
							</span>
						</div>
					</div>
				</div>
				<div class="metar">
					{{info.metar}}
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
// @ts-ignore
import parser from 'metar-parser';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'AtisStrip',
	props: {
		info: {
			type: Object as () => AtisStations,
			required: true
		}
	},
	methods: {
		delAtis(station: string): void {
			// @ts-ignore
			this.$parent.removeUserStation(station)
		},
		confirmUpdateSeen(station: string): void {
			const el = document.getElementById(`atis_code_${station}`);
			if(el) el.classList.remove("update");
		}
	},
	computed: {
		parsedMetar(): ParsedMetar {
			return parser(this.info.metar);
		}
	},
	watch: {
		info(newVal, oldVal) {
			if(newVal.letter !== oldVal.letter) {
				const el = document.getElementById(`atis_code_${newVal.airport}`);
				if(el) el.classList.add("update");
			}
		}
	}
});
</script>

<style scoped lang="scss">
#atis-strip {
	background-color: #1E1E1E;
	min-width: 700px;
	margin-bottom: .5em;
	border-radius: 5px;
	padding: .5em .5em 0 .5em;
	font-family: inherit;
	overflow: hidden;

	.title {
		padding: 0;
	}

	.row {
		margin-bottom: 0;
	}
	
	.border_bottom {
		border-bottom: 1px solid #6C6C6C;
		margin: 0;
	}
}

.atis_code {
	font-size: 2.5em;
	font-weight: 700;
	padding-top: 25px;
	color: yellow;
	text-align: center;

	&.update {
		cursor: pointer;
		animation-name: atisUpdate;
		animation-duration: 2s;
		animation-iteration-count: infinite;
	}
}

.runways {
	border-right: 1px solid #3C3C3C;
	border-left: 1px solid #3C3C3C;
	padding: 0;
	font-size: .9em;

	.runway_title, .runway_identifier {
		padding: .2em;
		border-bottom: 1px solid #3C3C3C;
	}

	.runway_identifier {
		font-weight: 600;
	}
}
.departing {
	.runway_identifier {
		border-bottom: 0;
	}
}

.metar {
	padding-top: .25em;
	font-size: .85em;
	border-top: 1px solid #3C3C3C;
	padding-left: .75rem;
	width: calc(100% - .33em);
	margin: 0;
}

.display {
	border: 1px solid yellow;
	padding: .25em;
	font-size: 1.3em;
}

.wind {
	padding: .76rem;

	.row {
		margin-bottom: 0;
	}
}

.weather {
	margin: 0;
	padding: 0;
}

.delete_atis {
	text-align: right;
	padding: 0;
	user-select: none;
	cursor: pointer;
}

@keyframes atisUpdate {
	0% { color: yellow; }
	49% { color: yellow; }
	50% { color: #1E1E1E; }
	99% { color: #1E1E1E }
}

</style>
