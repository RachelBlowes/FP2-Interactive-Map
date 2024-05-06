

<style>
#optionsContainer {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}

.dropbtn {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropbtn:hover, .dropbtn:focus {
  background-color: #3e8e41;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #f1f1f1}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}

  #salesMap {
    flex: 1;
    width: 50%; /* Adjust the width of each map */
    height: 100%; /* Set a fixed height for each map */
  }

  #permitMap {
    flex: 1;
    width: 50%; /* Adjust the width of each map */
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

  #legend {
    display: flex;
    width: 100%;
    height: 100px; /* Set a fixed height for both maps */
    margin-bottom: 20px; /* Add space between the maps */
    justify-content: space-around;
  }

  #salesLegend {
    flex: 1;
    width: 50%; /* Adjust the width of each map */
    height: 100%; /* Set a fixed height for each map */
  }

  #permitLegend {
    flex: 1;
    width: 50%; /* Adjust the width of each map */
    height: 100%; /* Set a fixed height for each map */
  }

</style>

<div id="mapcontainer">
  <div id="salesMap"></div>

  <div id="permitMap"></div>
</div>


<div id="maptitles">
  <h5>{salesMapTitle}</h5>
  <h5>{permitMapTitle}</h5>
</div>

<div id="optionsContainer">
  <div class="dropdown">
    <button class="dropbtn">Sales Map Options</button>
    <div class="dropdown-content">
      {#each styles as style}
        <a href="#" on:click|preventDefault={() => setStyle(style)}>{style.name}</a>
      {/each}
    </div>
  </div>

  <div class="dropdown">
    <button class="dropbtn">Permit Map Options</button>
    <div class="dropdown-content">
      {#each permitstyles as permitstyle}
        <a href="#" on:click|preventDefault={() => setPermitStyle(permitstyle)}>{permitstyle.name}</a>
      {/each}
    </div>
  </div>
</div>

<div id="legend">
  <div id="salesLegend"></div>
  <div id="permitLegend"></div>
</div>


<script>
  import { onMount } from 'svelte';

  let salesMap; // Define salesMap globally
  let permitMap; // Define permitMap globally

  onMount(() => {

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css';
    document.head.appendChild(link);

    const mapboxScript = document.createElement('script');
    mapboxScript.src = 'https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.js';
    mapboxScript.async = true;
    document.head.appendChild(mapboxScript);

    const compareStylesheet = document.createElement('link');
    compareStylesheet.rel = 'stylesheet';
    compareStylesheet.href = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-compare/v0.4.0/mapbox-gl-compare.css';
    document.head.appendChild(compareStylesheet);

    const compareScript = document.createElement('script');
    compareScript.src = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-compare/v0.4.0/mapbox-gl-compare.js';
    compareScript.async = true;
    document.head.appendChild(compareScript);

    Promise.all([loadScript(mapboxScript), loadScript(compareScript)]).then(() => {
      initializeMap();
    });
  });

  let currentStyle = 'mapbox://styles/rachelmb/clvg0s77002eo01ql8hq98bsp';
  let currentPermitStyle = 'mapbox://styles/rachelmb/clvg1kepc02ez01qlfeoz3xyh';
  let styles = [
    { name: 'Average Sale Price', style: 'mapbox://styles/rachelmb/clvg0s77002eo01ql8hq98bsp' },
    { name: 'Total Number of Sales', style: 'mapbox://styles/rachelmb/clvg2b49k02i901pebbil850m' },
    { name: 'Median Income', style: 'mapbox://styles/rachelmb/clvg2c2c205ey01nu88vj97g2' } ];
  let permitstyles = [
    { name: 'Average Permit Valuation', permitstyle: 'mapbox://styles/rachelmb/clvg1kepc02ez01qlfeoz3xyh' },
    { name: 'Total Number of Permits', permitstyle: 'mapbox://styles/rachelmb/clvg29i9t02i701pe8v03emw8' },
    { name: 'Median Income', permitstyle: 'mapbox://styles/rachelmb/clvg2c2c205ey01nu88vj97g2' },];
  let salesMapTitle = 'Average Sale Price by Census Tract';
  let permitMapTitle = 'Average Permit Valuation by Census Tract';


  function setStyle(style) {
    currentStyle = style.style;
    salesMap.setStyle(currentStyle);
    updatesalesLegend(style);
    if (style.name === 'Average Sale Price') {
      salesMapTitle = 'Average Sale Price by Census Tract';
    } else if (style.name === 'Total Number of Sales') {
      salesMapTitle = 'Total Number of Sales/Population by Census Tract';
    } else if (style.name === 'Median Income') {
      salesMapTitle = 'Median Income by Census Tract';
    }
  }

  function setPermitStyle(permitstyle) {
    currentPermitStyle = permitstyle.permitstyle;
    permitMap.setStyle(currentPermitStyle);
    updatepermitLegend(permitstyle);
    if (permitstyle.name === 'Average Permit Valuation') {
      permitMapTitle = 'Average Permit Valuation by Census Tract';
    } else if (permitstyle.name === 'Total Number of Permits') {
      permitMapTitle = 'Total Number of Permits/Population by Census Tract';
    } else if (permitstyle.name === 'Median Income') {
      permitMapTitle = 'Median Income by Census Tract';
    }
  }

  function loadScript(script) {
    return new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = reject;
    });
  }

  function initializeMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoicmFjaGVsbWIiLCJhIjoiY2x1bjFtbDUwMHN3YTJrb2EyaDZqcGYzNCJ9.wzfF026YmS7lxeAbQOD_tA';

    salesMap = new mapboxgl.Map({
      container: 'salesMap',
      style: currentStyle,
      center: [-71.0955, 42.3314],
      zoom: 10
    });

    permitMap = new mapboxgl.Map({ 
      container: 'permitMap',
      style: currentPermitStyle,
      center: [-71.0955, 42.3314],
      zoom: 10
    });

    const container = '#mapcontainer';
  }

  function updatesalesLegend(style) {
  const legendElement = document.getElementById('salesLegend');
  legendElement.innerHTML = ''; 

  let salesLegendContent = '';
  if (style.name === 'Average Sale Price') {
    salesLegendContent = '<strong>Legend for Average Sale Price:</strong><br>' +
  '<div><span style="background-color: #FF80ED; width: 20px; height: 20px; display: inline-block;"></span> $0 - $100k</div>' +
  '<div><span style="background-color: #1d42dc; width: 20px; height: 20px; display: inline-block;"></span> $100k - $200k</div>' 
  } else if (style.name === 'Total Number of Sales') {
    salesLegendContent = '<strong>Legend for Total Number of Sales:</strong><br>Put legend content here.';
  } else if (style.name === 'Median Income') {
    salesLegendContent = '<strong>Legend for Median Income:</strong><br>Put legend content here.';
  }

  legendElement.innerHTML = salesLegendContent;
}


function updatepermitLegend(permitstyle) {
  const legendElement = document.getElementById('permitLegend');
  legendElement.innerHTML = ''; 

  let permitLegendContent = '';
  if (permitstyle.name === 'Average Permit Valuatution') {
    permitLegendContent = '<strong>Legend for Average Permit Valuation:</strong><br>' +
  '<div><span style="background-color: #FF80ED; width: 20px; height: 20px; display: inline-block;"></span> $0 - $100k</div>' +
  '<div><span style="background-color: #1d42dc; width: 20px; height: 20px; display: inline-block;"></span> $100k - $200k</div>' 
  } else if (permitstyle.name === 'Total Number of Permits') {
    permitLegendContent = '<strong>Legend for Total Number of Permits:</strong><br>Put legend content here.';
  } else if (permitstyle.name === 'Median Income') {
    permitLegendContent = '<strong>Legend for Median Income:</strong><br>Put legend content here.';
  }

  legendElement.innerHTML = permitLegendContent;
}



</script>

