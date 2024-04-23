<style>
  circle {
    pointer-events: auto;
  }

#salesCensusTimeMap {
    width: 50%; /* Adjust the width of each map */
    height: 400px; /* Set a fixed height for each map */
    margin-bottom: 20px; /* Add space between the maps */
    
  }

#salesCensusTimeMap svg {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

#permitCensusTimeMap {
    width: 50%; /* Adjust the width of each map */
    height: 400px; /* Set a fixed height for each map */
    margin-bottom: 20px; /* Add space between the maps */
        
}

#permitCensusTimeMap svg {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

/* #mapgrid {
    display:grid;
    grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
    justify-content: space-evenly;
    justify-items: center;
    align-content: space-evenly;
    align-items: center;
    gap: 1em;
} */

</style>


<h3>Boston Yearly Sales</h3>

  <div id="salesCensusTimeMap">
  
    <svg>
      {#key mapViewChanged}
        {#each filteredSales as sale}
          <circle { ...getCoords(sale) }
              r={radiusScale(sale.saleprice)}
              fill="#F6517A"
              fill-opacity="0.6"
              stroke="white"
              stroke-width="0.5">
            <title> Average Sale Price {sale.price_avg}</title>
          </circle>
        {/each}
      {/key}
    </svg>
  </div>

  <h3> Boston Yearly Building Permits </h3>
  <div id="permitCensusTimeMap">
    <svg>
      {#key mapViewChanged}
        {#each filteredPermits as permit}
          <circle { ...getPermitCoords(permit) }
              r={permitRadiusScale(permit.permit_value_avg)}
              fill="#0087EC"
              fill-opacity="0.6"
              stroke="white"
              stroke-width="0.5">
            <title> Permit Value {permit.permit_value_avg}</title>
          </circle>
        {/each}
      {/key}
    </svg>
  </div>


<div id="slider">
  <label for="timeSlider">Filter by Year:</label>
  <input type="range" id="timeSlider" min="2009" max="2022" bind:value={timeFilter}>
  <time id="selectedTime" style="display: block;">{timeFilter === 2009 ? "Total" : timeFilter}</time>
</div>

<script>
import mapboxgl from "mapbox-gl";
import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";
mapboxgl.accessToken = "pk.eyJ1IjoicmFjaGVsbWIiLCJhIjoiY2x1bjFtbDUwMHN3YTJrb2EyaDZqcGYzNCJ9.wzfF026YmS7lxeAbQOD_tA";
import * as d3 from 'd3';
import { onMount } from "svelte";

let sale = [];
let permit = [];
let salesCensusTimeMap;
let permitCensusTimeMap;
let mapViewChanged = 0;
let radiusScale;
let permitRadiusScale;
let timeFilter = 2009;

async function loadMaps() {
  return Promise.all([
    new Promise(resolve => {
      salesCensusTimeMap = new mapboxgl.Map({
        container: 'salesTimeMap',
        style: 'mapbox://styles/rachelmb/cluq9tisq01ed01pbebh1c7np',
        center: [-71.0955, 42.3314],
        zoom: 11
      });

      salesCensusTimeMap.on('load', () => resolve(salesCensusTimeMap));
    }),
    new Promise(resolve => {
      permitCensusTimeMap = new mapboxgl.Map({
        container: 'permitTimeMap',
        style: 'mapbox://styles/rachelmb/cluisi2c0003o01p2c4mdf1k2',
        center: [-71.0955, 42.3314],
        zoom: 11
      });

      permitCensusTimeMap.on('load', () => resolve(permitCensusTimeMap));
    })
  ]);
}

onMount(async () => {
  [salesCensusTimeMap, permitCensusTimeMap] = await loadMaps();
  sale = await d3.csv('https://rachelblowes.github.io/Geodata/demographic_data/census_price_permit_spatial.csv');
  sale.forEach(d => {
    d.saleprice = parseFloat(d.price_avg);
  });
  permit = await d3.csv('https://rachelblowes.github.io/Geodata/demographic_data/census_price_permit_spatial.csv');
  permit.forEach(d => {
    d.valuation = parseFloat(d.permit_value_avg);  
  });

  let maxavgsaleprice = d3.max(sale, d => d.price_avg);
  console.log("Max average sale price is", maxavgsaleprice);

  let maxavgvaluation = d3.max(permit, d => d.permit_value_avg);
  console.log("Max average permit valuation is", maxavgvaluation);

  radiusScale = d3.scaleSqrt()
    .domain([0, maxavgsaleprice])
    .range([1, 30]);

  permitRadiusScale = d3.scaleSqrt()
    .domain([0, maxavgvaluation])
    .range([1, 30]);

  salesCensusTimeMap?.on("move", evt => mapViewChanged++);
  permitCensusTimeMap?.on("move", evt => mapViewChanged++);
});

function getCoords(sale) {
  let point = new mapboxgl.LngLat(+sale.Long, +sale.Lat);
  let { x, y } = salesCensusTimeMap.project(point);
  return { cx: x, cy: y };
}

function getPermitCoords(permit) {
  let point = new mapboxgl.LngLat(+permit.Long, +permit.Lat);
  let { x, y } = permitCensusTimeMap.project(point);
  return { cx: x, cy: y };
   
}

export let filteredSales = [];
export let filteredPermits = []; 

$: {
  filteredSales = timeFilter === 2009 ? [...sale] : sale.filter(sale => {
    return parseInt(sale.Year) === timeFilter;
  });
  filteredPermits = timeFilter === 2009 ? [...permit] : permit.filter(permit => {
    return parseInt(permit.Year) === timeFilter;
  });
}


</script>
