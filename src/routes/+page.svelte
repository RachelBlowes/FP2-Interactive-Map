<svelte:head>
	<title>Interactive Map</title>
</svelte:head>


<script>
import mapboxgl from "mapbox-gl";
import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";
mapboxgl.accessToken = "pk.eyJ1IjoicmFjaGVsbWIiLCJhIjoiY2x1bjFtbDUwMHN3YTJrb2EyaDZqcGYzNCJ9.wzfF026YmS7lxeAbQOD_tA";

import { onMount } from "svelte";

onMount(() => {
	let map = new mapboxgl.Map({
		container: 'map';
		style: 'mapbox://styles/mapbox/streets-v12',
		center: [-71.0589, 42.3601], // starting position [lng, lat]
        zoom: 11
	});
})




</script>


<h1>Interactive Map</h1>

<div id="map" />