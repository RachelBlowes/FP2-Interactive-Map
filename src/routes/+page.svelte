<svelte:head>
	<title>Interactive Map</title>
</svelte:head>

<h1>Interactive Map</h1>

<div id="map" />

<script>
import mapboxgl from "mapbox-gl";
import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";
mapboxgl.accessToken = "pk.eyJ1IjoicmFjaGVsbWIiLCJhIjoiY2x1bjFtbDUwMHN3YTJrb2EyaDZqcGYzNCJ9.wzfF026YmS7lxeAbQOD_tA";

import { onMount } from "svelte";

  async function loadMap() {
    return new Promise(resolve => {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/rachelmb/cluisi2c0003o01p2c4mdf1k2',
        center: [-71.0589, 42.3601],
        zoom: 12
      });

      map.on('load', () => resolve(map));
    });
  }

  onMount(async () => {
  const map = await loadMap();

  // Once the map is loaded, add the source
  map.addSource("boston_parcels_source", {
    type: 'geojson',
    data: "https://rachelblowes.github.io/Geodata/Boston_sales_since_2010.geojson",
  });

  // After adding the source, add the layer
  map.addLayer({
    id: "boston_parcels_layer", // A unique name for the layer
    type: "fill", // The layer type, in this case, it's a fill layer
    source: "boston_parcels_source", // The id of the source we added earlier
    paint: { 
      "fill-color": "blue", // Fill color for the polygons
      "fill-opacity": 0.5 // Opacity of the fill
    },
  });
});

</script>


