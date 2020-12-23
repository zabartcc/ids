<template>
	<div id="atis-strip" v-if="!deleted">
		<div class="row border_bottom">
			<div class="col s2 title">
				{{info.airport ?? '????'}}
			</div>
			<div class="col s9">
				AREA STATUS INFORMATION
			</div>
			<div class="col s1 delete_atis">
				<i class="material-icons tiny" @click="deleteAtis(info.airport)">clear</i>
			</div>
		</div>
		<div class="row">
			<div class="col s1 atis_code">
				{{info.code ?? '—'}}
			</div>
			<div class="col s3 runways">
				<div class="landing">
					<div class="runway_title">
						Landing
					</div>
					<div class="runway_identifier">
						{{landing}}
					</div>
				</div>
				<div class="departing">
					<div class="runway_title">
						Departing
					</div>
					<div class="runway_identifier">
						{{departing}}
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
								{{('00' + parsedMetar.wind.direction).slice(-3)}}   {{('0' + parsedMetar.wind.speedKt).slice(-2)}} <span v-if="parsedMetar.wind.gust">G{{parsedMetar.wind.gust}}</span>
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

<script>
import parser from 'metar-parser';

export default {
	name: 'AtisStrip',
	props: ['info'],
	data() {
		return {
			deleted: false
		}
	},
	async mounted() {
	},
	methods: {
		async deleteAtis(airport) {
			let stations = JSON.parse(localStorage.getItem('atis_stations'));
			stations = stations.filter(item => item !== airport);
			console.log(stations);
			localStorage.setItem('atis_stations', JSON.stringify(stations));
			this.deleted = true;
		}
	},
	computed: {
		parsedMetar() {
			return parser(this.info.metar);
		},
		departing() {
			if(this.info.text) {
				const info = this.info.text.split('.')[4];
				return info.replace('DEPARTING RWY', '').replace(/\s\s+/g, '');
			} else {
				return '—';
			}
		},
		landing() {
			if(this.info.text) {
				const approaches = [];
				const sentences = this.info.text.split('.');
				for(const sentence of sentences) {
					if(sentence.indexOf('VISUAL') > 0) {
						const runways = sentence.match(/[0-9][0-9]?[LRC]?/g);
						runways.forEach((runway) => {
							approaches.push('VIS ' + runway);
						});
					} else if(sentence.indexOf('ILS') > 0) {
						const runways = sentence.match(/[0-9][0-9]?[LRC]?/g);
						runways.forEach((runway) => {
							approaches.push('ILS ' + runway);
						});
					} else if(sentence.indexOf('RNAV') > 0) {
						const runways = sentence.match(/[0-9][0-9]?[LRC]?/g);
						runways.forEach((runway) => {
							approaches.push('RNAV ' + runway);
						});
					}
				}
				return approaches.join(', ');
			} else {
				return '—';
			}
		}
	}
}
</script>

<style scoped lang="scss">
	#atis-strip {
		background-color: #1E1E1E;
		margin-bottom: .5em;
		border-radius: 5px;
		padding: .5em .5em 0 .5em;
		font-family: inherit;
		overflow-x: hidden;

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
		padding-left: 3%;
		padding-top: 25px;
		color: yellow;
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
		padding: .75rem;

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

</style>