<svelte:head>
	<title>Interactive Map</title>
</svelte:head>
<h1> Mapping speculative investment in Boston’s housing market using data on renovation, construction, and sales </h1>
<style>
  circle {
    pointer-events: auto;
  }
</style>

<h3>Between 2010 and 2022, housing prices in Boston have increased by xx%</h3>
<p>We use public building permit data from 2010-2023 in addition to sales and assessment data to better understand the relationship between fiscal and physical investment in the housing market.</p>

<h3>Boston Yearly Sales</h3>

<div id="salesTimeMap">
  <svg>
    {#key mapViewChanged}
      {#each filteredSales as sale}
        <circle { ...getCoords(sale) }
            r={radiusScale(sale.saleprice)}
            fill="#F6517A"
            fill-opacity="0.6"
            stroke="white"
            stroke-width="0.5">
          <title> Sale Price {sale.saleprice}</title>
        </circle>
      {/each}
    {/key}
  </svg>
</div>

<h3> Boston Yearly Building Permits </h3>
<div id="permitTimeMap">
  <svg>
    {#key mapViewChanged}
      {#each filteredPermits as permit}
        <circle { ...getPermitCoords(permit) }
            r={permitRadiusScale(permit.valuation)}
            fill="#0087EC"
            fill-opacity="0.6"
            stroke="white"
            stroke-width="0.5">
          <title> Permit Value {permit.valuation}</title>
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
let salesTimeMap;
let permitTimeMap;
let mapViewChanged = 0;
let radiusScale;
let permitRadiusScale;
let timeFilter = 2009;

async function loadMaps() {
  return Promise.all([
    new Promise(resolve => {
      salesTimeMap = new mapboxgl.Map({
        container: 'salesTimeMap',
        style: 'mapbox://styles/rachelmb/cluq9tisq01ed01pbebh1c7np',
        center: [-71.0955, 42.3314],
        zoom: 11
      });

      salesTimeMap.on('load', () => resolve(salesTimeMap));
    }),
    new Promise(resolve => {
      permitTimeMap = new mapboxgl.Map({
        container: 'permitTimeMap',
        style: 'mapbox://styles/rachelmb/cluisi2c0003o01p2c4mdf1k2',
        center: [-71.0955, 42.3314],
        zoom: 11
      });

      permitTimeMap.on('load', () => resolve(permitTimeMap));
    })
  ]);
}

onMount(async () => {
  [salesTimeMap, permitTimeMap] = await loadMaps();
  sale = await d3.csv('https://rachelblowes.github.io/Geodata/Boston_sales_2021/sales_parcels_timeseries_pivoted.csv');
  sale.forEach(d => {
    d.saleprice = parseFloat(d.saleprice);
  });
  permit = await d3.csv('https://rachelblowes.github.io/Geodata/Boston_sales_2021/permit_valuation_lat_long_new.csv');
  permit.forEach(d => {
    d.valuation = parseFloat(d.valuation);  
  });

  let maxsaleprice = d3.max(sale, d => d.saleprice);
  console.log("Max sale price is", maxsaleprice);

  let maxvaluation = d3.max(permit, d => d.valuation);
  console.log("Max permit valuation is", maxvaluation);

  radiusScale = d3.scaleSqrt()
    .domain([0, maxsaleprice])
    .range([1, 30]);

  permitRadiusScale = d3.scaleSqrt()
    .domain([0, maxvaluation])
    .range([1, 30]);

  salesTimeMap?.on("move", evt => mapViewChanged++);
  permitTimeMap?.on("move", evt => mapViewChanged++);
});

function getCoords(sale) {
  let point = new mapboxgl.LngLat(+sale.Long, +sale.Lat);
  let { x, y } = salesTimeMap.project(point);
  return { cx: x, cy: y };
}

function getPermitCoords(permit) {
  let point = new mapboxgl.LngLat(+permit.Long, +permit.Lat);
  let { x, y } = permitTimeMap.project(point);
  return { cx: x, cy: y };
   
}

let filteredSales = [];
let filteredPermits = []; 

$: {
  filteredSales = timeFilter === 2009 ? [...sale] : sale.filter(sale => {
    return parseInt(sale.Year) === timeFilter;
  });
  filteredPermits = timeFilter === 2009 ? [...permit] : permit.filter(permit => {
    return parseInt(permit.Year) === timeFilter;
  });
}
</script>
