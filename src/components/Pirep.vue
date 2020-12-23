<template>
	<div id="pireps">
		<div class="top_bar">
			<div class="title">
				PIREPS
			</div>
			<div class="add">
				<i class="material-icons" @click="addNewPirepButton">add_box</i>
			</div>
		</div>
		<div class="pirep_table">
			<div class="table_header row">
				<div class="col s1"><span class="tooltipped" data-tooltip="Urgent">(U)UA</span></div>
				<div class="col s1"><span class="tooltipped" data-tooltip="Location">/OV</span></div>
				<div class="col s1"><span class="tooltipped" data-tooltip="Time (z)">/TM</span></div>
				<div class="col s1"><span class="tooltipped" data-tooltip="Flight Level">/FL</span></div>
				<div class="col s1"><span class="tooltipped" data-tooltip="Type">/TP</span></div>
				<div class="col s1"><span class="tooltipped" data-tooltip="Sky Conditions">/SK</span></div>
				<div class="col s1"><span class="tooltipped" data-tooltip="Visibility">/WX</span></div>
				<div class="col s1"><span class="tooltipped" data-tooltip="Temperature">/TA</span></div>
				<div class="col s1"><span class="tooltipped" data-tooltip="Wind">/WV</span></div>
				<div class="col s2"><span class="tooltipped" data-tooltip="Turbulence">/TB</span></div>
				<div class="col s1"><span class="tooltipped" data-tooltip="Icing">/IC</span></div>
			</div>
			<div class="table_body">
				<div v-if="addNewPirep" class="pirep_strip row">
					<div class="col s1 center-align"><input type="text" v-model="newPirep.ua" maxlength="3" placeholder="—" /></div>
					<div class="col s1 center-align"><input type="text" v-model="newPirep.ov" maxlength="5" placeholder="—" /></div>
					<div class="col s1 center-align"><input type="text" v-model="newPirep.tm" maxlength="4" placeholder="—" /></div>
					<div class="col s1 center-align"><input type="text" v-model="newPirep.fl" maxlength="3" placeholder="—" /></div>
					<div class="col s1 center-align"><input type="text" v-model="newPirep.tp" maxlength="6" placeholder="—" /></div>
					<div class="col s1 center-align"><input type="text" v-model="newPirep.sk" maxlength="10" placeholder="—" /></div>
					<div class="col s1 center-align"><input type="text" v-model="newPirep.wx" maxlength="10" placeholder="—" /></div>
					<div class="col s1 center-align"><input type="text" v-model="newPirep.ta" maxlength="4" placeholder="—" /></div>
					<div class="col s1 center-align"><input type="text" v-model="newPirep.wv" maxlength="10" placeholder="—" /></div>
					<div class="col s2 center-align"><input type="text" v-model="newPirep.tb" maxlength="10" placeholder="—" /></div>
					<div class="col s1 center-align"><input type="text" v-model="newPirep.ic" maxlength="16" placeholder="—" /></div>
					<div class="info">
						<span @click="submitNewPirep">Submit</span> | <span @click="deleteNewPirep">Delete</span>
					</div>
				</div>
				<span v-if="pireps.length == 0" class="no_pirep">No PIREPS reported.</span>
				<div v-for="pirep in pireps" :key="pirep._id">
					<PirepStrip :info="pirep" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PirepStrip from './PirepStrip.vue';
import {zabApi} from '@/helpers/axios.js';
import M from 'materialize-css';

export default {
	name: 'Pireps',
	props: {
	},
	components: {
		PirepStrip,
	},
	data() {
		return {
			pireps: [],
			addNewPirep: false,
			newPirep: {
			}
		}
	},
	async mounted() {
		M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
			margin: 0,
			position: 'top'
		});
		await this.getAllPireps();
		setInterval(this.getAllPireps, 120000); // Two minutes
	},
	methods: {
		async getAllPireps() {
			const {data} = await zabApi.get('/online/pireps');
			this.pireps = data;
		},
		async submitNewPirep() {
			zabApi.post('/online/pireps', this.newPirep).then(async () => {
				await this.getAllPireps();
				this.newPirep = {};
				this.addNewPirep = false;
			}).catch((err) => {
				console.log(err);
				this.newPirep = {};
				this.addNewPirep = false;
			})
		},
		addNewPirepButton() {
			this.addNewPirep = true;
		},
		deleteNewPirep() {
			this.newPirepContent = {};
			this.addNewPirep = false;
		}
	}
}
</script>

<style scoped lang="scss">
	#pireps {
		height: 100%;
		width: 100%;
		background-color: #0F0F0F;
		overflow: auto;
		border-radius: 15px;
		padding: 0;
		font-family: "Lucida Console", "Lucida Sans Typewriter", monaco;
	}

	.top_bar {
		width: 100%;
		padding: .5em 1em .33em 1em;
		.add {
			float: right;
			margin-top: -25px;
			cursor: pointer;
			user-select: none;
		}
	}

	.pirep_table {
		overflow: auto;
		min-height: 90%;
		width: 100%;

		.table_header {
			border-top: 1px solid #3C3C3C;
			border-bottom: 1px solid #3C3C3C;
			width: 120%;
			overflow: auto;
			padding: 0 1em 0 1.5em;

			div {
				font-size: .85rem;
				text-align: center;
				padding: .25em 0;
				border-right: 1px solid #3C3C3C;
			}

			div:last-child {
				border-right: 0;
			}

			.col {
				span {
					cursor: pointer;
				}
			}
		}

		.table_body {
			padding: 0 .5em 0 1.5em;
		}
	}

	.no_pirep {
		font-size: .9rem;
	}

	.pirep_strip {
		background-color: #1E1E1E;
		margin-bottom: .5em;
		padding: .5em 0;
		border-radius: 5px;
		overflow: auto;
		width: 120%;

		.col {
			word-break: break-all;

			input {
				border: none;
				background: #121212;
				border-radius: 5px;
				color: #fff;
				font-family: inherit;
				padding-left: .25em;
				width: calc(100% - .25em);
				text-transform: uppercase;
				text-align: center;

				&::placeholder {
					color: #6C6C6C;
					text-align: center;
				}
				
			}
			input[type=text]:focus {
				border-bottom: none;
				box-shadow: none;
			}
		}

		.info {
			font-size: .65rem;
			color: #6C6C6C;
			margin-left: 1em;
			width: 240px;

			span {
				cursor: pointer;
				user-select: none;
			}
		}
	}
</style>
