<svelte:head>
	<title>Renovation | Speculation</title>
</svelte:head>
<h1>Renovation | Speculation</h1>
<h2> Mapping speculative investment in Boston’s housing market using data on renovation, construction, and sales </h2>

<h3>Between 2010 and 2022, housing prices in Boston have increased by xx%</h3>

<p>We use public building permit data from 2010-2023 in addition to sales and assessment data to better understand the relationship between fiscal and physical investment in the housing market.</p>

<h4>Why building permits?</h4>

<div class="text-container">
  <p class="columntext">
    Boston is in the midst of a housing availability and affordability crisis. Its housing stock is relatively static, with few new developments.
    
    While renovation may improve living conditions in a given building, it can also reveal speculation patterns. </p>
  <p class="columntext">
    Almost 90% of sold flipped properties, have a documented permit. 

    We look at flipped sales transactions, declared works valuation and keyword search of the permit’s description to explore how fiscal and physical investment affect speculation.</p>
</div>


<TimeSliderMaps />

<script>
  //TimeSlider Maps
    import TimeSliderMaps from "$lib/TimeSliderMaps.svelte";
    import mapboxgl from "mapbox-gl";
    import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";
    mapboxgl.accessToken = "pk.eyJ1IjoicmFjaGVsbWIiLCJhIjoiY2x1bjFtbDUwMHN3YTJrb2EyaDZqcGYzNCJ9.wzfF026YmS7lxeAbQOD_tA";
    import * as d3 from 'd3';


</script>