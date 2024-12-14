<script>
	import { LayerCake, Svg } from 'layercake';
	import { scaleBand, csv } from 'd3';
	import Bar from '../components/Bar.svelte';
	import { fetchCsv } from '$lib/fetchCsv';
	import { onMount } from 'svelte';
	import backgroundSvg from '$lib/assets/background.svg';

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

<div class="flex h-screen">
	<!-- Navigation Bar -->
	<nav class="w-1/4 bg-gradient-to-b from-green-200 to-green-400 p-4 text-white">
		<h3 class="mb-4 text-2xl">Navigation</h3>
		<ul>
			<li class="mb-2"><a href="#" class="block rounded-lg p-2 hover:underline">Home</a></li>
			<li class="mb-2"><a href="#" class="block rounded-lg p-2 hover:underline">Dashboard</a></li>
			<li class="mb-2"><a href="#" class="block rounded-lg p-2 hover:underline">Settings</a></li>
		</ul>
	</nav>

	<!-- Main Content -->
	<div class="right-panel w-3/4 p-4">
		<h3 class="mb-4 text-3xl">Kindle Dashboard</h3>
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
	</div>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 400px;
	}
	.right-panel {
		background-size: cover;
		background-image: url(backgroundSvg);
	}
</style>
