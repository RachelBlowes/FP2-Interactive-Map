<!-- TestMap.svelte -->
<script>
  import { onMount } from 'svelte';

  onMount(() => {
    // Load Mapbox styles
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css';
    document.head.appendChild(link);

    // Load Mapbox GL JS library
    const mapboxScript = document.createElement('script');
    mapboxScript.src = 'https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.js';
    mapboxScript.async = true;
    document.head.appendChild(mapboxScript);

    // Load Mapbox GL Compare plugin stylesheet
    const compareStylesheet = document.createElement('link');
    compareStylesheet.rel = 'stylesheet';
    compareStylesheet.href = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-compare/v0.4.0/mapbox-gl-compare.css';
    document.head.appendChild(compareStylesheet);

    // Load Mapbox GL Compare plugin script
    const compareScript = document.createElement('script');
    compareScript.src = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-compare/v0.4.0/mapbox-gl-compare.js';
    compareScript.async = true;
    document.head.appendChild(compareScript);

    // Initialize maps and compare plugin once both scripts are loaded
    Promise.all([loadScript(mapboxScript), loadScript(compareScript)]).then(() => {
      initializeMap();
    });
  });

  function loadScript(script) {
    return new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = reject;
    });
  }

  function initializeMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoicmFjaGVsbWIiLCJhIjoiY2x1bjFtbDUwMHN3YTJrb2EyaDZqcGYzNCJ9.wzfF026YmS7lxeAbQOD_tA';

    const salesMap = new mapboxgl.Map({
      container: 'salesComp',
      style: 'mapbox://styles/rachelmb/clupvjh7o05c001qq6bmp6ukx',
      center: [-71.0955, 42.3314],
      zoom: 12
    });

    const permitMap = new mapboxgl.Map({
      container: 'permitsComp',
      style: 'mapbox://styles/rachelmb/clupxzulx000t01qn10fl6v61',
      center: [-71.0955, 42.3314],
      zoom: 12
    });

    const container = '#comparison-container';

    const comparemap = new mapboxgl.Compare(salesMap, permitMap, container);
  }
</script>

<style>
  #comparison-container {
    position: relative;
    width: 100%;
    height: 600px; /* Set the desired height */
  }

  #salesComp,
  #permitsComp {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>

<div id="comparison-container">
  <div id="salesComp"></div>
  <div id="permitsComp"></div>
</div>
