<template>
	<div class="header">
		<div class="flex status_bar">
			<div class="bar">
				<div class="title">
					Controller
				</div>
				<div class="text">
					Ur Mom
				</div>
			</div>
			<div class="bar">
				<div class="title">
					Position
				</div>
				<div class="text">
					—
				</div>
			</div>
			<div class="bar">
				<div class="title">
					Uptime
				</div>
				<div class="text">
					—
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

<script>
export default {
	data() {
		return {
			
		};
	},
	mounted() {
		setInterval(function () {
			document.getElementById('zulu_time').innerHTML = new Date().toLocaleString('en-US', {timeZone: 'UTC', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'}) + 'Z';
			document.getElementById('local_time').innerHTML = new Date().toLocaleString('en-US', {timeZone: 'America/Phoenix', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'}) + 'L';
		}, 1000);
	}
};
</script>

<style scoped lang="scss">
	.header {
		padding: .5em 1em;
		background-color: #0F0F0F;
	}

	.flex {
		display: flex;
		flex-wrap: wrap;
	}

	.bar {
		padding-left: 1em;
		width: 250px;
		margin-bottom: 10px;
	}

	.status_bar {
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
</style>