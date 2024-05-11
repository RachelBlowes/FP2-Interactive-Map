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

  #legendcontainer {
  width: 100%; /* Width of the outside container */
  display: flex;
  justify-content: space-around;  
}

.legend {
  width: 50%; /* Width of the outside container */
  flex: 1;
  display: flex;
  justify-content: space-around;
}

.legendsvg {
  flex: 1;
  
}


</style>

<div id="comparison-container">
  <div id="salesComp"></div>
  <div id="permitsComp"></div>
</div>

<div id="legendcontainer">
  <div class="legend">
    <svg class="legendsvg">
      <text x="10" y="25" font-family="Arial" font-size="12" fill="black">Legend: Sales Price per Square Meter</text>
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#aacfb7;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#26402f;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="200" height="20" x="10" y="35" fill="url(#grad1)" />
      <text x="5" y="70" font-family="Arial" font-size="12" fill="black">$1</text>
      <text x="180" y="70" font-family="Arial" font-size="12" fill="black">$445,455</text>
     </svg>
  </div>
  <div class="legend">
    <svg class="legendsvg">
      <text x="10" y="25" font-family="Arial" font-size="12" fill="black">Legend: Permit Valuation per Square Meter</text>
      <defs>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#a6ceed;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#00518f;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="200" height="20" x="10" y="35" fill="url(#grad2)" />
      <text x="5" y="70" font-family="Arial" font-size="12" fill="black">$1</text>
      <text x="180" y="70" font-family="Arial" font-size="12" fill="black">$15,925</text>
     </svg>
  </div>
</div>