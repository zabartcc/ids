<template>
	<div id="map">
		<l-map ref="map" v-model="zoom" v-model:zoom="zoom" :zoomAnimation="true" :center="[33.242837, -107.272256]" :attributionControl="false">
			<l-tile-layer url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}{r}.png"></l-tile-layer>
			<l-polygon
				:lat-lngs="[
					[34.016574, -113.999964],
					[34.665946, -113.999434],
					[34.916616, -113.616658],
					[35.379534, -112.666308],
					[35.417599, -112.152998],
					[35.766548, -111.841243],
					[35.699294, -110.232791],
					[36.033000, -108.215685],
					[36.199431, -107.466103],
					[35.316414, -106.916451],
					[35.316383, -106.699539],
					[35.159349, -106.284559],
					[34.850035, -106.616267],
					[34.262750, -106.674739],
					[33.828935, -106.755681],
					[33.583300, -106.802752],
					[33.583256, -107.599906],
					[33.833196, -107.999876],
					[33.874801, -108.750040],
					[33.490879, -110.761972],
					[33.552303, -111.851726]
				]"
				color="#888888"
				:weight=1
			/> <!-- NW Sector -->
			<l-polygon
				:lat-lngs="[
					[34.016574, -113.999964],
					[33.552303, -111.851726],
					[33.490879, -110.761972],
					[33.874801, -108.750040],
					[33.833196, -107.999876],
					[33.583256, -107.599906],
					[33.583300, -106.802752],
					[33.199511, -106.883130],
					[32.324936, -106.658774],
					[32.324973, -106.567220],
					[32.105435, -106.567192],
					[32.083299, -106.483321],
					[32.083309, -106.305519],
					[32.099969, -106.258843],
					[32.093489, -106.233317],
					[31.749998, -106.233300],
					[31.666590, -106.333193],
					[31.733245, -106.383791],
					[31.749948, -106.500507],
					[31.783309, -106.533887],
					[31.816368, -108.199812],
					[31.332884, -108.199743],
					[31.333085, -111.099683],
					[31.367834, -111.185799],
					[32.099739, -113.507978],
					[32.737095, -113.684462],
					[32.683234, -113.999880]
				]"
				color="#888888"
				:weight=1
			/> <!-- SW Sector -->
			<l-polygon
				:lat-lngs="[
					[31.666590, -106.333193],
					[31.749998, -106.233300],
					[32.093489, -106.233317],
					[32.099969, -106.258843],
					[32.083309, -106.305519],
					[32.083299, -106.483321],
					[32.105435, -106.567192],
					[32.324973, -106.567220],
					[32.324936, -106.658774],
					[33.199511, -106.883130],
					[33.583300, -106.802752],
					[33.828935, -106.755681],
					[33.829061, -106.274944],
					[33.524864, -105.449833],
					[33.966584, -105.449861],
					[34.145829, -105.149994],
					[34.499898, -105.149890],
					[34.716621, -104.549917],
					[34.999997, -104.549961],
					[35.041636, -103.499980],
					[34.549976, -102.324964],
					[34.316639, -102.799780],
					[33.402757, -103.691528],
					[33.383303, -103.799961],
					[32.999966, -103.799945],
					[32.466508, -103.933187],
					[32.033063, -103.799701],
					[31.649968, -103.333308],
					[31.283242, -102.149895],
					[29.766332, -102.558137],
					[29.733487, -102.675515],
					[29.350103, -102.883695],
					[28.949813, -103.150241],
					[29.016537, -103.383102],
					[29.149553, -103.550154],
					[29.185019, -103.708803],
					[29.266826, -103.783779],
					[29.316378, -104.000077],
					[29.648269, -104.517783],
					[29.999385, -104.697059],
					[30.150293, -104.683725],
					[30.358207, -104.833500],					
					[30.550214, -104.900541],
					[30.599381, -104.965876],
					[30.683034, -104.983024],
					[30.683451, -105.050365],					
					[31.466509, -106.200524]
				]"
				color="#888888"
				:weight=1
			/> <!-- SE Sector -->
			<l-polygon
				:lat-lngs="[
					[33.828935, -106.755681],
					[34.262750, -106.674739],
					[34.850035, -106.616267],
					[35.159349, -106.284559],
					[35.316383, -106.699539],
					[35.316414, -106.916451],
					[36.199431, -107.466103],
					[36.716568, -106.083143],
					[36.716537, -104.999678],
					[37.499930, -102.549965],
					[36.499801, -101.749922],
					[35.829124, -99.9999410],
					[35.333220, -99.9998240],
					[34.866389, -100.316169],
					[34.466560, -100.749469],
					[34.599707, -101.999640],
					[34.549976, -102.324964],
					[35.041636, -103.499980],
					[34.999997, -104.549961],
					[34.716621, -104.549917],
					[34.499898, -105.149890],
					[34.145829, -105.149994],
					[33.966584, -105.449861],
					[33.524864, -105.449833],
					[33.829061, -106.274944]
				]"
				color="#888888"
				:weight=1
			/> <!-- NE Sector -->
			<l-wms-tile-layer baseUrl="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi" layers="nexrad-n0r-900913" :transparent="true" format="image/png" :opacity="0.25" :z-index="100"></l-wms-tile-layer>

			<!-- Dynamically draw planes on map here -->
			<span v-if="Object.keys(aircraft).length > 0 && Object.keys(aircraft)[0] !== ''">
				<l-marker v-for="(plane, callsign) in aircraft" :lat-lng="[+plane.lat, +plane.lng]" :key="callsign">
					<l-icon :icon-url="require('@/assets/images/icons/diamond.png').default" :icon-size="[12, 12]" :tooltipAnchor="[50,20]" />
					<l-polyline :lat-lngs="[[plane.lat, plane.lng], newCoord(+plane.lat, +plane.lng, +plane.speed, +plane.heading)]" color="#C8C806" className="p_track" />
					<l-tooltip v-if="showDatablock === true" :options="{permanent: true, sticky: true, offset: ([5,30])}">{{plane.callsign}}<br />{{calcAltitude(+plane.altitude, +plane.cruise)}}<br />412 {{('000' + plane.speed).slice(-3)}}<br /><span class="acft_destination">{{plane.destination}}</span></l-tooltip>
				</l-marker>
			</span>
		</l-map>
		<div class="map_controls">
			<div class="pt">
				<i class="material-icons tooltipped" data-tooltip="Projected Track Length">swap_horiz</i>
				<span class="control_divider"></span>
				<i class="material-icons clickable" @click="decreasePt">chevron_left</i>{{pt}} min<i class="material-icons clickable" @click="increasePt">chevron_right</i>
			</div>
			<div class="db">
				<i class="material-icons tooltipped" data-tooltip="Hide Data Blocks" v-show="showDatablock === true">visibility_off</i>
				<i class="material-icons tooltipped" data-tooltip="Show Data Blocks" v-show="showDatablock === false">visibility</i>
				<span class="control_divider"></span>
				<span class="clickable" v-if="showDatablock === false" @click="showDatablock = true">&nbsp;Show</span>
				<span class="clickable" v-else @click="showDatablock = false">&nbsp;Hide</span>
			</div>
		</div>
		<div class="edit_overlay" v-if="editing">
			<h2 class="component_name">MAP</h2>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// @ts-ignore
import { LMap, LTileLayer, LPolygon, LWmsTileLayer, LMarker, LIcon, LPolyline, LTooltip } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { mapActions } from 'vuex';
import { zabApi } from '@/helpers/axios';
import eventBus from '@/assets/js/eventBus';
// @ts-ignore
import M from 'materialize-css';

interface State {
	sse: EventSource | null;
	aircraft: Record<string, AircraftOnMap>;
	zoom: number;
	pt: number;
	showDatablock: boolean;
	map: any;
}

export default defineComponent({
	name: 'Map',
	props: {
		editing: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	components: {
		LMap,
		LTileLayer,
		LPolygon,
		LWmsTileLayer,
		LMarker,
		LIcon,
		LPolyline,
		LTooltip
	},
	data(): State {
		return {
			sse: null,
			aircraft: {},
			zoom: 6,
			pt: 4,
			showDatablock: true,
			map: null
		}
	},
	async mounted() {
		M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
			margin: 0,
			position: 'top'
		});
		await this.initAircraft();
		this.sse = new EventSource(`${process.env.VUE_APP_API_URL}/ids/aircraft/feed`);
		this.sse.onmessage = this.handleAircraftUpdate;

		eventBus.$on('resizeMap', () => {
			this.resizeMapLayer(); // Resizes map base layer after resizing
		});

		this.$nextTick(() => {
			this.map = this.$refs.map;
		});
	},
	methods: {
		async initAircraft(): Promise<void> {
			const allAircraft = (await zabApi.get('/ids/aircraft')).data;
			for(const callsign of allAircraft) {
				this.getAircraftData(callsign);
			}
			this.setTimestamp(Date.now());
		},
		async getAircraftData(callsign: string): Promise<void> {
			this.aircraft[callsign] = (await zabApi.get(`/ids/aircraft/${callsign}`)).data;
		},
		handleAircraftUpdate({data}: any): void {
			data = JSON.parse(data);
			if(data.type == "update") {
				this.aircraft[data.callsign] = data;
			}
			if(data.type == "delete") {
				delete this.aircraft[data.callsign];
			}
			this.setTimestamp(Date.now());
		},
		newCoord(long: number, lat: number, speed: number, heading: number): Array<number> {
			const radian = heading * (Math.PI / 180);
			const d = ((speed / 60) * this.pt) * 1.15078; // speed to miles (PT length: 4 min by default)
			const dy = Math.cos(radian) * d;
			const dx = Math.sin(radian) * d;
			const coordY = long + (dy / 69.096); // 69.096: one degree of longitude
			const coordX = lat + (dx / 57.27);
			return [coordY, coordX];
		},
		calcAltitude(altitude: number, cruise: number): string {
			const cruiseAbbv = Math.round(+cruise/100);
			const altAbbv = Math.round(+altitude/100);
			const cruiseString = `000${cruiseAbbv}`.slice(-3);
			const altString = `000${altAbbv}`.slice(-3);
			if(Math.abs(cruiseAbbv - altAbbv) <= 4) {
				return `${cruiseString}C`;
			}
			else if(cruiseAbbv > altAbbv) {
				return `${cruiseString}-${altString}`;
			}

			return `${cruiseString}+${altString}`;
		},
		decreasePt(): void {
			if(this.pt !== 1) {
				this.pt = (this.pt / 2);
			}
		},
		increasePt(): void {
			if(this.pt !== 8) {
				this.pt = (this.pt * 2);
			}
		},
		async resizeMapLayer() {			
			this.map.leafletObject.invalidateSize(); // use 'any' workaround because vue-leaflet has no type definitions
		},
		...mapActions('timer', [
			'setTimestamp'
		]),
	},
});
</script>

<style lang="scss">
@font-face {
	font-family: "ERAM";
	src: url('https://zabartcc.sfo3.digitaloceanspaces.com/ids/ERAM.woff2') format('woff2');
	font-weight: 200;
}

.leaflet-popup-content-wrapper, .leaflet-tooltip {
	background: transparent;
	color: #C8C806;
	border: none;
	font-size: .9rem;
	opacity: 0.9;
	box-shadow: none;
	line-height: 0.95rem;
	font-family: "ERAM";

	&:before {
		margin: 0;
		border: none;
	}
}

.acft_destination {
	opacity: 0.5;
}

.leaflet-control-attribution {
	a {
		display: none;
	}
}

.leaflet-control-zoom {
	display: none;
}

</style>

<style scoped lang="scss">
#map {
	height: 100%;
	width: 100%;
}

.material-icons {
	display: inline-flex;
	vertical-align: top;
}

.map_controls {
	width: 100%;
	background: rgb(9, 9, 9);
	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
	padding: 0 1em;
	display: flex;
	flex-direction: row;
	user-select: none;
	font-family: "Lucida Console", "Lucida Sans Typewriter", monaco;

	.control_divider {
		border-right: 1px solid #3C3C3C;
		margin-left: 7px;
		margin-right: 2px;
	}

	.pt {
		line-height: 1.7em;
		width: 160px;

		i {
			&.clickable {
				line-height: 1.6rem;
			}
		}
	}

	.db {
		line-height: 1.7em;
		i {
			line-height: 1.6rem;
			font-size: 1.3em;
		}
	}

	.clickable {
		cursor: pointer;
	}
}

.material-tooltip {
	background-color: #1E1E1E!important;
}

.edit_overlay {
	height: 100%;
}
</style>
