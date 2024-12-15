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
	<nav class="w-1/5 bg-gradient-to-b from-gray-800 to-gray-600 p-6 text-white shadow-lg">
		<ul>
			<li class="mb-4">
				<a
					href="#"
					class="flex items-center block rounded-md bg-gray-700 p-2 transition duration-300 ease-in-out hover:bg-gray-600"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
						<path d="M10 20V12H14V20H19V10H22L12 0L2 10H5V20H10Z" />
					</svg>
					Home
				</a>
			</li>
		</ul>
	</nav>

	<!-- Main Content -->
	<div class="right-panel w-4/5 p-4">
		<h3 class="mb-6 text-3xl font-bold text-gray-800">Kindle Dashboard</h3>
		<div class="chart-container rounded-lg bg-white p-6 shadow-md">
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
