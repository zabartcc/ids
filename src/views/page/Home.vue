<template>
	<div class="row top">
		<div class="col s12 xl8">
				<div class="map_wrapper">
					<Map />
				</div>
		</div>
		<div class="col s12 xl4">
			<div class="status_wrapper">
				<Status />
			</div>
		</div>
	</div>
	<div class="row bottom">
		<div class="col s12 xl6 push-xl6">
			<div class="atis_wrapper">
				<Atis />
			</div>
		</div>
		<div class="col s12 xl6 pull-xl6">
			<div class="pirep_wrapper">
				<Pirep />
			</div>
		</div>
	</div>
</template>

<script>
import Map from '@/components/Map.vue';
import Atis from '@/components/Atis.vue';
import Pirep from '@/components/Pirep.vue';
import Status from '@/components/Status.vue';

export default {
	name: 'Home',
	data() {
		return {
		};
	},
	components: {
		Map,
		Atis,
		Pirep,
		Status
	}
};
</script>

<style scoped lang="scss">

.bottom {
	height: 35vh;
}

.col {
	height: 100%;
}

.map_wrapper, .status_wrapper {
	padding: 1em;
	width: 100%;
	height: 50vh;
	border-radius: 10px;
	box-sizing: border-box;
}

.status_wrapper {
	height: auto;
}

.atis_wrapper, .pirep_wrapper {
	padding: 1em;
	width: 100%;
	height: 100%;
	box-sizing: border-box;

	::-webkit-scrollbar {
		width: 5px;
		height: 5px;
	}

	::-webkit-scrollbar-track {
		margin-top: 10px;
		margin-bottom: 10px;
		border-radius: 10px;
	}

	::-webkit-scrollbar-thumb {
		background-color: #1E1E1E;
		border-radius: 10px;
	}

	::-webkit-scrollbar-corner {
		background-color: transparent;
	}
}

@media only screen and (max-width: 1200px) {
	.status_wrapper {
		margin-top: 1.75em;
	}

	.top {
		margin-bottom: 0;
	}
}

</style>