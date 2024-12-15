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

<div class="flex h-screen">
	<!-- Navigation Bar -->
	<nav class="w-1/4 p-6 bg-gradient-to-b from-gray-800 to-gray-600 text-white shadow-lg">
		<h3 class="mb-6 text-3xl font-bold">Navigation</h3>
		<ul>
			<li class="mb-4"><a href="#" class="block rounded-md bg-gray-700 hover:bg-gray-600 transition duration-300 ease-in-out p-2">Home</a></li>
		</ul>
	</nav>

	<!-- Main Content -->
	<div class="right-panel w-3/4 p-4">
		<h3 class="mb-6 text-3xl font-bold text-gray-800">Kindle Dashboard</h3>
		<div class="chart-container bg-white shadow-md rounded-lg p-6">
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
	body {
		background-color: #f4f4f9;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}
	.chart-container {
		width: 100%;
		height: 400px;
	}
	nav {
		background-color: #df6c4f;
		color: 'black';
	}
	.right-panel {
		background-size: cover;
		background-color: #f4f4f9;
		/* background-image: url('$li/background.svg?url'); */
	}
</style>
