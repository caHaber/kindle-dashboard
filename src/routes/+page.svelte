<script>
	import { LayerCake, Svg } from 'layercake';
	import { scaleBand, csv } from 'd3';
	import Bar from '../components/Bar.svelte';
	import { onMount } from 'svelte';
	import ObservablePlot from '../components/ObservablePlot.svelte';

	import * as Plot from '@observablehq/plot';

	/**
	 * @type {never[] | import("d3-dsv").DSVRowArray<string>}
	 */
	let data = $state([]);

	onMount(async () => {
		// const response = await fetchCsv('test.csv');
		const response = await fetch('/api', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		data = await response.json();
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
					class="flex items-center rounded-md bg-gray-700 p-2 transition duration-300 ease-in-out hover:bg-gray-600"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mr-2 h-5 w-5"
						viewBox="0 0 24 24"
						fill="currentColor"
					>
						<path d="M11 2v20c-5-1-9-6-9-11s4-10 9-11zm2 0c5 1 9 6 9 11s-4 10-9 11v-20z" />
					</svg>
					Home
				</a>
			</li>
		</ul>
	</nav>

	<!-- Main Content -->
	<div class="right-panel w-4/5 bg-fixed p-6">
		<h3 class="mb-6 text-3xl font-bold text-gray-800">Kindle Dashboard</h3>
		<div class="grid h-full grid-cols-2 gap-4">
			<div class=" h-full w-full rounded-lg bg-white p-0 shadow-lg">
				<LayerCake
					{data}
					x={'sum(number_of_page_flips)'}
					y={'series-product-name'}
					padding={{ bottom: 20, left: 35, top: 20, right: 20 }}
					yScale={scaleBand().paddingInner(0.05)}
					xDomain={[0, null]}
				>
					<Svg>
						<Bar fill={'lightblue'} />
					</Svg>
				</LayerCake>
			</div>
			<div class="h-2/3 w-full rounded-lg bg-white p-6 shadow-md">
				<ObservablePlot
					options={{
						title: 'Page turns',
						marks: [
							Plot.barX(data, {
								x: 'sum(number_of_page_flips)',
								y: 'series-product-name',
								fill: 'Product Name',
								tip: 'xy'
							})
						],
						marginLeft: 140
					}}
				/>
			</div>
		</div>
	</div>
</div>

<style>
	body {
		background-color: #f4f4f9;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
