

<style>
  #optionsContainer {
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
  }
  
  .dropbtn {
    background-color: #c7c7c7;
    color: white;
    padding: 10px;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }
  
  .dropbtn:hover, .dropbtn:focus {
    background-color: #c7c7c7;
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
    background-color: #c7c7c7;
  }
  
    #profitMap {
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
  
    .profitmap-overlay {
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
    <div id="profitMap">
      
      <div class="profitmap-overlay" id="features">
        <h2>{profitMapTitle}</h2>
        <div id="pd"><p>Hover over a zipcode!</p></div>
      </div>
      <div class="legend-overlay" id="profitLegend"></div> <!-- Add an ID for sales legend -->
    </div>
  </div>
  
  
<div id="optionsContainer">
  <!-- Replace dropdown with buttons -->
  <button class="year-button" on:click|preventDefault={() => setYear(2010)}>2010</button>
  <button class="year-button" on:click|preventDefault={() => setYear(2022)}>2022</button>
</div>


  <script>
 import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import ZipRenterBarChart from '$lib/zipRenterBarChart.svelte';

  // Create writable store for selected style and hovered zip code
  export const mapData = writable({ selectedStyle: null, hoveredZip: null });

  let profitMap; // Define salesMap globally
  
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
        updateprofitLegend(defaultStyle); // Update the legend with default style
      });
  
    });
  
    // Define your default map styles
    let defaultStyle = {
      name: '2010 Profit', 
      style: 'mapbox://styles/rachelmb/clvwspq9j06vf01ph2ymvc4kd'
    };
  
  
    let currentStyle = defaultStyle;
   
    let styles = [
      { name: '2010 Profit', style: 'mapbox://styles/rachelmb/clvwspq9j06vf01ph2ymvc4kd', year: 2010 },
      { name: '2022 Profit', style: 'mapbox://styles/rachelmb/clvwt08qp09nh01pk0r946nhd', year:2022 },
     ];
    
    let profitMapTitle = 'Median Profit by Zipcode';

  
    function setStyle(style) {
      mapData.update(data => ({ ...data, selectedStyle: style }));
    currentStyle = style; // Update currentStyle
    profitMap.setStyle(style.style); // Update map style
    updateprofitLegend(style); // Update legend
    // Update title based on style
    if (style.name === '2010 Profit') {
      profitMapTitle = 'Median Profit by Zipcode in 2010';
    } else if (style.name === '2022 Profit') {
      profitMapTitle = 'Median Profit by Zipcode in 2022';
    }
    }
    
    function setYear(year) {
    const selectedStyle = styles.find(style => style.year === year);
    if (selectedStyle) {
      setStyle(selectedStyle);
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
     
      const bounds = [
        [-71.223469, 42.285535], // Southwest coordinates
        [-70.921124, 42.407021] // Northeast coordinates
    ];
      profitMap = new mapboxgl.Map({
        container: 'profitMap',
        style: currentStyle.style,
        center: [-71.0955, 42.3314],
        zoom: 10,
        maxPitch: 0,
        maxBounds: bounds
      });
  
      profitMap.on('mousemove', 'choropleth-fill', function (e) {
    // Change the cursor style
    profitMap.getCanvas().style.cursor = 'pointer';

    // Get the first feature from the event
    const feature = e.features[0];

    // Display information for the hovered feature based on the current style
    const properties = feature.properties;
    let featureInfo;
    if (currentStyle.name === '2010 Profit') {
        featureInfo = `${currentStyle.name}: ${properties.j_m_p_real}<br>`;
        featureInfo += `Zipcode: ${properties.z_real}<br>`;
        featureInfo += `Neighborhood: ${properties.j_n}<br>`;
        featureInfo += `Percent Renters: ${properties.j_p_r}<br>`;

    } else if (currentStyle.name === '2022 Profit') {
        featureInfo = `${currentStyle.name}: ${properties.profit}<br>`;
        featureInfo += `Zipcode: ${properties.z_real}<br>`;
        featureInfo += `Neighborhood: ${properties.j_n}<br>`;
        featureInfo += `Percent Renters: ${properties.j_p_r}<br>`;
    }
    // Update mapData with hovered zip code
    mapData.update(data => ({ ...data, hoveredZip: properties.z_real }));

    // Update the content of the profitmap-overlay
    document.querySelector('.profitmap-overlay #pd').innerHTML = featureInfo;
});
  
  
  
  
      const container = '#mapcontainer';
    }
  
    function updateprofitLegend(style) {
    const legendElement = document.getElementById('profitLegend');
    legendElement.innerHTML = ''; // Clear the legend content
  
    let profitLegendContent = '<strong>' + style.name + ':</strong><br>'; // Add legend title
  
    // Generate linear gradient legend bars based on style
    if (style.name === '2010 Profit') {
      profitLegendContent += generateLegendBar(-40000, 1500000, '$', '#eba94c', '#62a779'); // Example range, unit, and colors
    } else if (style.name === '2022 Profit') {
      profitLegendContent += generateLegendBar(-40000, 1500000, '$', '#eba94c', '#62a779'); // Example range, unit, and colors
    }
  
    legendElement.innerHTML = profitLegendContent;
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
 
  function updateButtonClasses() {
    const buttons = document.querySelectorAll('.year-button');
    buttons.forEach(button => {
      const year = parseInt(button.textContent);
      if (year === currentStyle.year) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  updateButtonClasses();

  </script>

<ZipRenterBarChart mapData = {$mapData} />
