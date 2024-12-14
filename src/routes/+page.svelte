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
	<nav class="w-1/4 bg-gray-800 text-white p-4">
		<h3 class="text-2xl mb-4">Navigation</h3>
		<ul>
			<li class="mb-2"><a href="#" class="hover:underline">Home</a></li>
			<li class="mb-2"><a href="#" class="hover:underline">Dashboard</a></li>
			<li class="mb-2"><a href="#" class="hover:underline">Settings</a></li>
		</ul>
	</nav>

	<!-- Main Content -->
	<div class="w-3/4 p-4">
		<h3 class="text-3xl mb-4">Kindle Dashboard</h3>
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
</style>
