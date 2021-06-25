<template>
	<div id="chart_list">
		<div class="top_bar">
			<div class="title">
				<span class="back" @click="closeList()">
					<i class="material-icons">keyboard_backspace</i>
					BACK
				</span>
				{{airport.id}}
			</div>
		</div>
		<div class="wrapper">
			<div class="section_title">
				<div>
					IAP
				</div>
				<div>
					SID
				</div>
				<div>
					STAR
				</div>
				<div>
					OTHER
				</div>
			</div>
			<div class="section_content">
				<div>
					<div v-for="chart in filterIapCharts" :key="chart.pdf_name" class="chart" @click="showChart(chart.pdf_path, chart.chart_name, chart.icao_ident)">
						{{chart.chart_name}}
					</div>
				</div>
				<div>
					<div v-for="chart in filterSidCharts" :key="chart.pdf_name" class="chart" @click="showChart(chart.pdf_path, chart.chart_name, chart.icao_ident)">
						{{chart.chart_name}}
					</div>
				</div>
				<div>
					<div v-for="chart in filterStarCharts" :key="chart.pdf_name" class="chart" @click="showChart(chart.pdf_path, chart.chart_name, chart.icao_ident)">
						{{chart.chart_name}}
					</div>
				</div>
				<div>
					<div v-for="chart in filterOtherCharts" :key="chart.pdf_name" class="chart" @click="showChart(chart.pdf_path, chart.chart_name, chart.icao_ident)">
						{{chart.chart_name}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

interface State {
	list: Array<ChartsList>
}

export default defineComponent({
	name: 'ChartsList',
	data(): State {
		return {
			list: []
		}
	},
	props: {
		airport: {
			type: Object,
			required: true
		}
	},
	async mounted() {
		await this.getChartsList();
	},
	methods: {
		async getChartsList() {
			const { data } = await axios.get(`https://api.aviationapi.com/v1/charts?apt=${this.airport.id}`);
			this.list = data[this.airport.id];
		},
		closeList(): void {
			// @ts-ignore
			this.$parent.setOpenedAirport();
		},
		showChart(url: string, name: string, airport: string): void {
			// @ts-ignore
			window.ipc.send('loadPdfWindow', {
				url,
				name,
				airport
			})
		},
	},
	computed: {
		filterIapCharts(): Array<ChartsList> {
			return [...this.list].filter(c => c.chart_code === "IAP")
		},
		filterStarCharts(): Array<ChartsList> {
			return [...this.list].filter(c => c.chart_code === "STAR")
		},
		filterSidCharts(): Array<ChartsList> {
			return [...this.list].filter(c => c.chart_code === "DP")
		},
		filterOtherCharts(): Array<ChartsList> {
			const others = ["IAP", "STAR", "DP"]
			return [...this.list].filter(c => !others.includes(c.chart_code))
		}
	}
});

</script>

<style scoped lang="scss">
#chart_list {
	cursor: auto;
	position: absolute;
	width: calc(100% - 2em);
	height: calc(100% - 2em);
	left: 1em;
	top: 1em;
	z-index: 998;
	background-color: #0F0F0F;
	border-radius: 15px;
	overflow: hidden;
}

.top_bar {
	width: 100%;
	padding: .5em .5em .33em .5em;
	margin-bottom: 5px;

	.title {
		text-align: center;

		.back {
			position: absolute;
			left: .75em;
			cursor: pointer;
			user-select: none;
		}

		.material-icons {
			vertical-align: middle;
			font-size: 18px;
			margin-top: -1px;
		}
	}
}

.wrapper {
	overflow: auto;
	height: calc(100% - 40px);

	.section_title {
		border-top: 1px solid #fff;
		border-bottom: 1px solid #fff;
		margin-bottom: 1em;
		display: flex;
		min-width: 700px;

		div {
			width: 25%;
			text-align: center;
		}
	}

	.section_content {
		display: flex;
		min-width: 700px;
		padding: 0 1em;

		div {
			width: 25%;

			.chart {
				width: calc(100% - 1em);
				color: rgba(209, 209, 209, 0.89);
				cursor: pointer;

				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
}
</style>