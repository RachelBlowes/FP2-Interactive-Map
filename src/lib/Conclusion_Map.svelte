

<style>


  #Map {
    flex: 1;
    width: 100%; /* Adjust the width of each map */
    height: 100%; /* Set a fixed height for each map */
  }


  #mapcontainer {
    display: flex;
    width: 100%;
    height: 400px; /* Set a fixed height for both maps */
    margin-bottom: 20px; /* Add space between the maps */
    justify-content: space-around;
  }

  #maptitles {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }

</style>

<div id="mapcontainer">
  <div id="Map"></div>
</div>


<div id="maptitles">
  <h5>{MapTitle}</h5>
</div>


<script>
  import { onMount } from 'svelte';

  let Map; // Define salesMap globally

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

  let currentStyle = 'mapbox://styles/rachelmb/clvg0s77002eo01ql8hq98bsp';
  let MapTitle = 'Profit by Census Tract';


  function loadScript(script) {
    return new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = reject;
    });
  }

  function initializeMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoicmFjaGVsbWIiLCJhIjoiY2x1bjFtbDUwMHN3YTJrb2EyaDZqcGYzNCJ9.wzfF026YmS7lxeAbQOD_tA';

    Map = new mapboxgl.Map({ // Assign to salesMap variable
      container: 'Map',
      style: currentStyle,
      center: [-71.0955, 42.3314],
      zoom: 10
    });

  }

</script>

