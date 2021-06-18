<template>
	<div id="pirep_strip" class="row" v-if="visible">
		<div class="col s1 center-align">{{info.urgent ? 'UUA' : 'UA'}}</div>
		<div class="col s1 center-align">{{info.location || '—'}}</div>
		<div class="col s1 center-align">{{getTime(info.reportTime)}}</div>
		<div class="col s1 center-align">{{info.flightLevel || '—'}}</div>
		<div class="col s1 center-align">{{info.aircraft || '—'}}</div>
		<div class="col s1 center-align">{{info.skyCond || '—'}}</div>
		<div class="col s1 center-align">{{info.vis || '—'}}</div>
		<div class="col s1 center-align">{{info.temp || '—'}}</div>
		<div class="col s1 center-align">{{info.wind || '—'}}</div>
		<div class="col s2 center-align">{{info.turbulence || '—'}}</div>
		<div class="col s1 center-align">{{info.icing || '—'}}</div>
		<div class="col s12 info">
			Reported {{observedTime(info.reportTime)}} | Expires in {{expireTime(info.reportTime)}} <span v-if="info.manual"> | <span class="delete_pirep" @click="deletePirep(info._id)">Delete</span></span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { zabApi } from '@/helpers/axios';

interface State {
	visible: boolean;
}

export default defineComponent({
	name: 'PirepStrip',
	data(): State {
		return {
			visible: true
		};
	},
	props: {
		info: {
			type: Object as () => Pireps,
			required: true
		}
	},
	methods: {
		async deletePirep(id: string): Promise<void> {
			try {
				// @ts-ignore
				this.visible = false;
				await zabApi.delete(`/ids/pireps/${id}`);
			} catch(e) {
				console.log(e);
			}
		},
		getTime(time: string): string {
			if(time) {
				const d = new Date(time);
				return `${('00' + d.getUTCHours()).slice(-2)}${('00' + d.getUTCMinutes()).slice(-2)}`;
			} else {
				return '—';
			}
		},
		observedTime(time: string): string {
			const unixTime = new Date(time).getTime();
			const now = new Date().getTime();
			let difference = (unixTime / 1000) - (now / 1000);

			const tfn = {
				unitOfTime: '',
				time: 0
			};

			difference = Math.abs(difference);
			if (difference / (60 * 60) > 1) {
				tfn.unitOfTime = 'h';
				tfn.time = Math.floor(difference / (60 * 60));
			} else if (difference / (60) > 1) {
				tfn.unitOfTime = 'm';
				tfn.time = Math.floor(difference / 60);
			} else {
				tfn.unitOfTime = 's';
				tfn.time = Math.floor(difference);
			}
			return `${tfn.time}${tfn.unitOfTime} ago`;
		},
		expireTime(time: string): string {
			const currentTime = new Date().getTime();
			const date = new Date(time);
			const twoHoursLater = date.setHours(date.getHours() + 2);
			let difference = (twoHoursLater / 1000) - (currentTime / 1000);

			const tfn = {
				unitOfTime: '',
				time: 0
			};

			difference = Math.abs(difference);
			if (difference / (60 * 60) > 1) {
				tfn.unitOfTime = 'h';
				tfn.time = Math.round(difference / (60 * 60));
			} else if (difference / (60) > 1) {
				tfn.unitOfTime = 'm';
				tfn.time = Math.round(difference / 60);
			} else {
				tfn.unitOfTime = 's';
				tfn.time = Math.round(difference);
			}
			return `${tfn.time}${tfn.unitOfTime}`;
		}
	}
});
</script>

<style scoped lang="scss">
#pirep_strip {
	background-color: #1E1E1E;
	margin-bottom: .5em;
	padding: .5em 0;
	border-radius: 5px;
	overflow: auto;
	width: 120%;

	.col {
		word-break: break-all;
		text-transform: uppercase;
	}

	.info {
		font-size: .65rem;
		color: #6C6C6C;
		display: block;
		width: 100%;
		text-transform: none;
		margin-top: 1em;

		.delete_pirep {
			user-select: none;
			cursor: pointer;
		}
	}
}
</style>
