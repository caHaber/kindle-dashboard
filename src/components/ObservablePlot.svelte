<script lang="ts">
	import * as Plot from '@observablehq/plot';

	let { onclick, options }: { onclick?: any; options: Plot.PlotOptions } = $props();

	// const hash = $derived(JSON.stringify({ options }));
	let w = $state(200);
	let h = $state(200);

	let div: HTMLElement | undefined = $state();

	let plot: (SVGSVGElement | HTMLElement) & Plot.Plot;

	$effect(() => {
		div?.firstChild?.remove(); // remove old chart, if any
		if (w > 50 && h > 50) {
			div?.append(Plot.plot({ ...options, width: w, height: h })); // add the new chart
		}
	});
</script>

<div class="plot" bind:this={div} bind:clientWidth={w} bind:clientHeight={h}></div>

<style>
	.plot {
		width: 100%;
		height: 100%;
	}
</style>
