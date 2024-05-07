

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

  .salemap-overlay {
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  overflow: auto;
  z-index: 1;
  width: 25%;
  height: 30%;
}


.permitmap-overlay {
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  overflow: auto;
  z-index: 1;
  width: 25%;
  height: 30%;
}

.legend-overlay {
  position: absolute;
  top: 0;
  right: 0;
  background: #fff;
  overflow: auto;
  z-index: 1;
  width: 25%;
  height: 15%;
}


</style>

<div id="mapcontainer">
  <div id="salesMap">
    
    <div class="salemap-overlay" id="features">
      <h2>{salesMapTitle}</h2>
      <div id="pd"><p>Hover over a census tract!</p></div>
    </div>
    <div class="legend-overlay" id="salesLegend"></div> <!-- Add an ID for sales legend -->
  </div>

  <div id="permitMap">
    <div class="permitmap-overlay" id="features">
      <h2>{permitMapTitle}</h2>
      <div id="pd"><p>Hover over a census tract!</p></div>
    </div>
    <div class="legend-overlay" id="permitLegend"></div> <!-- Add an ID for permit legend -->
  </div>
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
      updatesalesLegend(defaultStyle); // Update the legend with default style
      updatepermitLegend(defaultPermitStyle); // Update the legend with default style
    });

  });

  // Define your default map styles
  let defaultStyle = {
    name: 'Average Sale Price', 
    style: 'mapbox://styles/rachelmb/clvg0s77002eo01ql8hq98bsp'
  };

  let defaultPermitStyle = {
    name: 'Average Permit Valuation', 
    style: 'mapbox://styles/rachelmb/clvg1kepc02ez01qlfeoz3xyh'
  }

  let currentStyle = defaultStyle;
  let currentPermitStyle = defaultPermitStyle;
  
  let styles = [
    { name: 'Average Sale Price', style: 'mapbox://styles/rachelmb/clvg0s77002eo01ql8hq98bsp' },
    { name: 'Number of Sales/Population', style: 'mapbox://styles/rachelmb/clvg2b49k02i901pebbil850m' },
    { name: 'Median Income', style: 'mapbox://styles/rachelmb/clvg2c2c205ey01nu88vj97g2' },
    { name: 'Percent Renter Occupied - 2010', style: 'mapbox://styles/rachelmb/clvvcl90d066h01pe3bsm1inl' } ];
  let permitstyles = [
    { name: 'Average Permit Valuation', permitstyle: 'mapbox://styles/rachelmb/clvg1kepc02ez01qlfeoz3xyh' },
    { name: 'Number of Permits/Population', permitstyle: 'mapbox://styles/rachelmb/clvg29i9t02i701pe8v03emw8' },
    { name: 'Median Income', permitstyle: 'mapbox://styles/rachelmb/clvg2c2c205ey01nu88vj97g2' },
    { name: 'Percent Renter Occupied - 2022', style: 'mapbox://styles/rachelmb/clvvcw5hm092301nu9kru48u3' } ];
  let salesMapTitle = 'Average Sale Price by Census Tract';
  let permitMapTitle = 'Average Permit Valuation by Census Tract';

  function setStyle(style) {
  currentStyle = style; // Update currentStyle
  salesMap.setStyle(style.style); // Update map style
  updatesalesLegend(style); // Update legend
  // Update title based on style
  if (style.name === 'Average Sale Price') {
    salesMapTitle = 'Average Sale Price by Census Tract';
  } else if (style.name === 'Number of Sales/Population') {
    salesMapTitle = 'Number of Sales/Population by Census Tract';
  } else if (style.name === 'Median Income') {
    salesMapTitle = 'Median Income by Census Tract';
  } else if (style.name === 'Percent Renter Occupied - 2010') {
    salesMapTitle = 'Percent Renter Occupied - 2010 by Census Tract';
  }
  }
  function setPermitStyle(permitstyle) {
    currentPermitStyle = permitstyle; // Update currentPermitStyle
    permitMap.setStyle(permitstyle.permitstyle); // Update map style
    updatepermitLegend(permitstyle); // Update legend
    // Update title based on style
    if (permitstyle.name === 'Average Permit Valuation') {
        permitMapTitle = 'Average Permit Valuation by Census Tract';
    } else if (permitstyle.name === 'Number of Permits/Population') {
        permitMapTitle = 'Number of Permits/Population by Census Tract';
    } else if (permitstyle.name === 'Median Income') {
        permitMapTitle = 'Median Income by Census Tract';
    } else if (permitstyle.name === 'Percent Renter Occupied - 2022') {
        salesMapTitle = 'Percent Renter Occupied - 2022 by Census Tract';
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
      style: currentStyle.style,
      center: [-71.0955, 42.3314],
      zoom: 10
    });

    salesMap.on('mousemove', 'choropleth-fill', function (e) {
  // Change the cursor style
  salesMap.getCanvas().style.cursor = 'pointer';

  // Get the first feature from the event
  const feature = e.features[0];

  // Display information for the hovered feature based on the current style
  const properties = feature.properties;
  let featureInfo;
  if (currentStyle.name === 'Average Sale Price') {
    featureInfo = `${currentStyle.name}: ${properties.avg_sale}`;
  } else if (currentStyle.name === 'Number of Sales/Population') {
    featureInfo = `${currentStyle.name}: ${properties.norm_num_s}`;
  } else if (currentStyle.name === 'Median Income') {
    featureInfo = `${currentStyle.name}: ${properties.income}`;
  } else if (currentStyle.name === 'Percent Renter Occupied - 2010') {
    featureInfo = `${currentStyle.name}: ${properties.Real_perce}`;
  }

  document.querySelector('.salemap-overlay #pd').innerHTML = featureInfo;
});





    permitMap = new mapboxgl.Map({ 
      container: 'permitMap',
      style: currentPermitStyle.style,
      center: [-71.0955, 42.3314],
      zoom: 10
    });
    permitMap.on('mousemove', 'choropleth-fill', function (e) {
  // Change the cursor style
  permitMap.getCanvas().style.cursor = 'pointer';

  // Get the first feature from the event
  const feature = e.features[0];

  // Display information for the hovered feature based on the current style
  const properties = feature.properties;
  let featureInfo;
  if (currentPermitStyle.name === 'Average Permit Valuation') {
    featureInfo = `${currentPermitStyle.name}: ${properties.avg_permit}`;
  } else if (currentPermitStyle.name === 'Number of Permits/Population') {
    featureInfo = `${currentPermitStyle.name}: ${properties.norm_num_p}`;
  } else if (currentPermitStyle.name === 'Median Income') {
    featureInfo = `${currentPermitStyle.name}: ${properties.income}`;
  } else if (currentPermitStyle.name === 'Percent Renter Occupied - 2022') {
    featureInfo = `${currentPermitStyle.name}: ${properties.Real_perce}`;
  }

  document.querySelector('.permitmap-overlay #pd').innerHTML = featureInfo;
});


    const container = '#mapcontainer';
  }

  function updatesalesLegend(style) {
  const legendElement = document.getElementById('salesLegend');
  legendElement.innerHTML = ''; // Clear the legend content

  let salesLegendContent = '<strong>' + style.name + ':</strong><br>'; // Add legend title

  // Generate linear gradient legend bars based on style
  if (style.name === 'Average Sale Price') {
    salesLegendContent += generateLegendBar(250000, 13000000, '$', '#dee8e1', '#62a779'); // Example range, unit, and colors
  } else if (style.name === 'Number of Sales/Population') {
    salesLegendContent += generateLegendBar(0.0002, 0.4, '', '#dee8e1', '#62a779'); // Example range, unit, and colors
  } else if (style.name === 'Median Income') {
    salesLegendContent += generateLegendBar(12300, 246750, '$', '#c4c4c4', '#4f4f4f'); // Example range, unit, and colors
  } else if (style.name === 'Percent Renter Occupied - 2010') {
    salesLegendContent += generateLegendBar(0, 100, '%', '#c4c4c4', '#4f4f4f'); // Example range, unit, and colors
  }

  legendElement.innerHTML = salesLegendContent;
}

function generateLegendBar(minValue, maxValue, unit, color1, color2) {
  const barWidth = 10; // Adjust the width of the legend bar
  const numTicks = 2; // Number of tick marks on the legend bar
  const tickInterval = (maxValue - minValue) / (numTicks - 1);
  let legendBarHTML = '<div class="legend-bar" style="background: linear-gradient(to right, ' + color1 + ', ' + color2 + '); display: flex; justify-content: space-between; align-items: center;">';

  for (let i = 0; i < numTicks; i++) {
    const tickValue = minValue + i * tickInterval;
    legendBarHTML += '<span class="tick-label">' + tickValue + unit + '</span>';
  }

  legendBarHTML += '</div>';
  return legendBarHTML;
}

function updatepermitLegend(permitstyle) {
  const legendElement = document.getElementById('permitLegend');
  legendElement.innerHTML = ''; // Clear the legend content

  let permitLegendContent = '<strong>' + permitstyle.name + ':</strong><br>'; // Add legend title

  // Generate linear gradient legend bars based on permit style
  if (permitstyle.name === 'Average Permit Valuation') {
    permitLegendContent += generatepermitLegendBar(0, 577682, '$', '#c7e7ff', '#0087ec'); // Example range, unit, and colors
  } else if (permitstyle.name === 'Number of Permits/Population') {
    permitLegendContent += generatepermitLegendBar(0.004, 0.3, '', '#c7e7ff', '#0087ec'); // Example range, unit, and colors
  } else if (permitstyle.name === 'Median Income') {
    permitLegendContent += generatepermitLegendBar(12300, 246750, '$', '#c4c4c4', '#4f4f4f'); // Example range, unit, and colors
  } else if (permitstyle.name === 'Percent Renter Occupied - 2022') {
    permitLegendContent += generateLegendBar(0, 100, '%', '#c4c4c4', '#4f4f4f'); // Example range, unit, and colors
  }

  legendElement.innerHTML = permitLegendContent;
}

function generatepermitLegendBar(minValue, maxValue, unit, color1, color2) {
  const barWidth = 10; // Adjust the width of the legend bar
  const numTicks = 2; // Number of tick marks on the legend bar
  const tickInterval = (maxValue - minValue) / (numTicks - 1);
  let legendBarHTML = '<div class="legend-bar" style="background: linear-gradient(to right, ' + color1 + ', ' + color2 + '); display: flex; justify-content: space-between; align-items: center;">';

  for (let i = 0; i < numTicks; i++) {
    const tickValue = minValue + i * tickInterval;
    legendBarHTML += '<span class="tick-label">' + tickValue + unit + '</span>';
  }

  legendBarHTML += '</div>';
  return legendBarHTML;
}

</script>

