<template>
	<div id="status">
		<div class="title">STATUS</div>
		<div class="status_section_title">NEIGHBORS</div>
		<div class="status_section">
			<div class="artcc_grid">
				<div ref="zab" artcc="zab">ZAB</div>
				<div ref="zla" artcc="zla">ZLA</div>
				<div ref="zdv" artcc="zdv">ZDV</div>
				<div ref="zkc" artcc="zkc">ZKC</div>
				<div ref="zfw" artcc="zfw">ZFW</div>
				<div ref="zhu" artcc="zhu">ZHU</div>
				<div ref="mmty" artcc="mmty">MMTY</div>
				<div ref="mmtz" artcc="mmtz">MMTZ</div>
			</div>
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';
import { mapActions } from 'vuex'
export default {
	data() {
		return {
			neighbors: [],
			neighborMap: {
				'lax': 'zla',
				'den': 'zdv',
				'kc': 'zkc',
				'ftw': 'zfw',
				'hou': 'zhu',
				'mmty': 'mmty',
				'mmtz': 'mmtz',
			}
		}
	},
	async mounted() {
		await this.getNeighbors();
		setInterval(this.getNeighbors, 60000);
	},
	methods: {
		async getNeighbors() {
			this.neighbors = (await zabApi.get('/ids/neighbors')).data;
			document.querySelectorAll('.artcc_grid div[artcc]').forEach(artcc => artcc.removeAttribute('online'));
			this.neighbors.forEach(neighbor => this.$refs[this.neighborMap[neighbor.toLowerCase()]].setAttribute('online', true));
			this.setTimestamp(Date.now())
		},
		...mapActions('timer', [
			'setTimestamp'
		]),
	}
}
</script>

<style scoped lang="scss">
	#status {
		height: 100%;
		width: 100%;
		overflow: auto;
		background-color: #0F0F0F;
		border-radius: 15px;
		padding: .75em;
		font-family: "Lucida Console", "Lucida Sans Typewriter", monaco;
	}

	.title {
		font-size: 1.25em;
	}

	.status_section_title {
		text-align: center;
		border-top: 1px solid #fff;
		border-bottom: 1px solid #fff;
		margin-bottom: 1em;
	}

	.status_section + .status_section_title {
		margin-top: 2em;
	}

	.artcc_grid {
		display: grid;
		grid-template-rows: repeat(3, 1fr);
		grid-template-columns: repeat(4, 1fr);
		grid-template-areas: 
			"zla zdv zdv zkc"
			"zla zab zab zfw"
			"mmtz mmtz mmty zhu";

		div {
			border: 2px solid #fff;
			padding: 1em 0.5em;
			display: flex;
			justify-content: center;
			align-items: center;

			&[artcc="zab"] {
				grid-area: zab;
				background: rgba(#fff, 0.25);
				border-width: 1px;
			}

			&[artcc="zla"] {
				grid-area: zla;
			}

			&[artcc="zdv"] {
				grid-area: zdv;
			}

			&[artcc="zkc"] {
				grid-area: zkc;
			}

			&[artcc="zfw"] {
				grid-area: zfw;
			}

			&[artcc="zhu"] {
				grid-area: zhu;
			}

			&[artcc="mmty"] {
				grid-area: mmty;
			}

			&[artcc="mmtz"] {
				grid-area: mmtz;
			}

			&[online] {
				border-color: #208951;
				background: rgba(#208951, 0.25)
			}
		}

	}

</style>