<script>
	import { Canvas, LayerCake, Svg } from 'layercake';
	import { scaleBand } from 'd3';
	import Bar from '../components/Bar.svelte';
    
	// Define some data
	const points = [
		{ x: 25, y: 5 },
		{ x: 5, y: 10 },
		{ x: 10, y: 20 },
		{ x: 15, y: 30 },
		{ x: 20, y: 40 }
	];
</script>

<h3 class="text-3xl">Kindle Dashboard</h3>
<div class="chart-container">
	<LayerCake
		data={points}
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
