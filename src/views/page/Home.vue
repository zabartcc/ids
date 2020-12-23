<template>
	<div class="row">
		<div class="col s12">
			<div class="map_wrapper">
				<Map />
			</div>
		</div>
	</div>
	<div class="row">
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

export default {
	name: 'Home',
	components: {
		Map,
		Atis,
		Pirep
	}
};
</script>

<style scoped lang="scss">
.map_wrapper {
	padding: 1em;
	width: 100%;
	height: 60vh;
	border-radius: 10px;
}

.atis_wrapper, .pirep_wrapper {
	padding: 1em;
	width: 100%;
	height: 35vh;

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
</style>