<template>
	<div class="header">
		<div class="flex status_bar">
			<div class="bar">
				<div class="title">
					Controller
				</div>
				<div class="text">
					{{controllerName}}
				</div>
			</div>
			<div class="bar">
				<div class="title">
					Position
				</div>
				<div class="text">
					{{online ? online.pos : '—'}}
				</div>
			</div>
			<div class="bar">
				<div class="title">
					Uptime
				</div>
				<div class="text">
					{{uptime}}
				</div>
			</div>
			<div class="bar">
				<div class="title">
					Zulu Time
				</div>
				<div class="text" id="zulu_time">
					—
				</div>
			</div>
			<div class="bar">
				<div class="title">
					AZ Time
				</div>
				<div class="text" id="local_time">
					—
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import { zabApi } from '@/helpers/axios';
import { defineComponent } from 'vue';

interface State {
	online: AtcOnline | null;
	now: number;
}

export default defineComponent({
	data(): State {
		return {
			online: null,
			now: +new Date(Date.now())
		};
	},
	async mounted() {
		await this.getControllersOnline();
		setInterval(() => {
			// @ts-ignore
			document.getElementById('zulu_time').innerHTML = new Date().toLocaleString('en-US', {timeZone: 'UTC', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'});
			// @ts-ignore
			document.getElementById('local_time').innerHTML = new Date().toLocaleString('en-US', {timeZone: 'America/Phoenix', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'});
			this.now = +new Date(Date.now());
		}, 1000);
		setInterval(this.getControllersOnline, 120000);
	},
	methods: {
		async getControllersOnline(): Promise<void> {
			try {
				this.online = null;

				if(this.user.isLoggedIn) {
					const {data} = await zabApi.get('/online');
					data.data.atc.forEach((atc: AtcOnline) => {
						if(atc.cid === this.user.data.cid) {
							this.online = atc;
						}
					});
				}
			} catch(e) {
				console.log(e);
			}
		}
	},
	computed: {
		...mapState('user', [
			'user'
		]),
		controllerName(): string {
			return `${this.user.isLoggedIn ? this.user.data.fname + ' ' + this.user.data.lname : '—'}`;
		},
		uptime(): string {
			if(this.online) {
				const d = +new Date(this.online.timeStart);
				const delta = Math.abs(this.now - d) / 1000;
				
				const hours = ('00' + Math.floor(delta / 3600) % 24).slice(-2);
				const minutes = ('00' + Math.floor(delta / 60) % 60).slice(-2);
				const seconds = ('00' + Math.floor(delta % 60)).slice(-2);

				return `${hours}:${minutes}:${seconds}`;
			} else {
				return '—';
			}
		}
	},
});
</script>

<style scoped lang="scss">
.header {
	padding: .5em 1em;
	background-color: #0F0F0F;
	z-index: 999;
	position: relative;
}

.flex {
	display: flex;
	flex-wrap: wrap;
}

.status_bar {
	.bar {
		min-width: 170px;
		margin-bottom: 10px;

		.title {
			color: #6C6C6C;
			font-size: .8em;
		}
		.text {
			font-size: 1.5em;
			font-weight: 600;
			line-height: 1em;
		}
	}

	&:first-child {
		padding-left: .5em;
	}
}
</style>