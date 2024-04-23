<svelte:head>
	<title>Interactive Map</title>
</svelte:head>
<h1> Mapping speculative investment in Boston’s housing market using data on renovation, construction, and sales </h1>


<h3>Between 2010 and 2022, housing prices in Boston have increased by xx%</h3>
<p>We use public building permit data from 2010-2023 in addition to sales and assessment data to better understand the relationship between fiscal and physical investment in the housing market.</p>

<TimeSliderMaps />

<script>
  //TimeSlider Maps
    import TimeSliderMaps from "$lib/TimeSliderMaps.svelte";
    import mapboxgl from "mapbox-gl";
    import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";
    mapboxgl.accessToken = "pk.eyJ1IjoicmFjaGVsbWIiLCJhIjoiY2x1bjFtbDUwMHN3YTJrb2EyaDZqcGYzNCJ9.wzfF026YmS7lxeAbQOD_tA";
    import * as d3 from 'd3';

    
</script>