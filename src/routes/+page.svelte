<script>
	import { LayerCake, Svg } from 'layercake';
	import { scaleBand, csv } from 'd3';
	import Bar from '../components/Bar.svelte';
	import { fetchCsv } from '$lib/fetchCsv';
	import { onMount } from 'svelte';

	/**
	 * @type {never[] | import("d3-dsv").DSVRowArray<string>}
	 */
	let data = $state([]);

	onMount(async () => {
		const response = await fetchCsv('test.csv');
		data = response;
	});

	// Define some data
</script>

<h3 class="text-3xl">Kindle Dashboard</h3>
<div class="chart-container">
	<LayerCake
		{data}
		x="x"
		y="y"
		padding={{ bottom: 20, left: 35 }}
		yScale={scaleBand().paddingInner(0.05)}
		xDomain={[0, null]}
	>
		<Svg>
			<Bar fill={'lightblue'} />
		</Svg>
	</LayerCake>
</div>

<style>
	/*
      The wrapper div needs to have an explicit width and height in CSS.
      It can also be a flexbox child or CSS grid element.
      The point being it needs dimensions since the <LayerCake> element will
      expand to fill it.
    */
	.chart-container {
		width: 300px;
		height: 300px;
	}
</style>
