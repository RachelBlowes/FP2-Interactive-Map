

<style>
  circle {
    pointer-events: auto;
  }

  #salesCensusMap {
    flex: 1;
    width: 50%; /* Adjust the width of each map */
    height: 100%; /* Set a fixed height for each map */
  }

  #salesCensusMap svg {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  #permitCensusMap {
    flex: 1;
    width: 50%; /* Adjust the width of each map */
    height: 100%; /* Set a fixed height for each map */
  }

  #permitCensusMap svg {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    pointer-events: none;
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

  /* Slider styles */
  #slider {
    width: 100%; /* Width of the outside container */
    margin-bottom: 20px;
  }

  #timeSlider {
    -webkit-appearance: none; /* Override default CSS styles */
    appearance: none;
    width: 100%; /* Full-width */
    height: 10px; /* Specified height */
    background: whitesmoke; /* Grey background */
    border-radius: 5px; /*Rounded*/
    outline: none; /* Remove outline */
    opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: .2s; /* 0.2 seconds transition on hover */
    transition: opacity .2s;
  }

  /* Mouse-over effects */
  #timeSlider:hover {
    opacity: 1; /* Fully shown on mouse-over */
  }

  /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
  #timeSlider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    border-radius: 5cqi;
    width: 20px; /* Set a specific slider handle width */
    height: 10px; /* Slider handle height */
    background: #3a3a3a; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }

  #timeSlider::-moz-range-thumb {
    width: 20px; /* Set a specific slider handle width */
    height: 10px; /* Slider handle height */
    border-radius: 5cqi;
    background: #3a3a3a; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }

 #selectedTime, #timesliderlabel {
  display: block;
  text-align: center; /* Center the text */
  font-weight: bold; /* Make the text bold */
}
</style>


<div id="mapcontainer">
  <div id="salesCensusMap">
  
    <svg>
      {#key mapViewChanged}
        {#each filteredSales as sale}
          <circle { ...getCoords(sale) }
              r={radiusScale(sale.CurrentSalesColumn)}
              fill="#F6517A"
              fill-opacity="0.6"
              stroke="white"
              stroke-width="0.5">
            <title> Sale Price {sale.CurrentSalesColumn}</title>
          </circle>
        {/each}
      {/key}
    </svg>
  </div>

  <div id="permitCensusMap">
    <svg>
      {#key mapViewChanged}
        {#each filteredPermits as permit}
          <circle { ...getPermitCoords(permit) }
              r={permitRadiusScale(permit.CurrentPermitColumn)}
              fill="#0087EC"
              fill-opacity="0.6"
              stroke="white"
              stroke-width="0.5">
            <title> Permit Value {permit.CurrentPermitColumn}</title>
          </circle>
        {/each}
      {/key}
    </svg>
  </div>
</div>

<div id="maptitles">
  <h5>Census Tract Sales</h5>
  <h5> Census Tract Permits </h5>
</div>

<div>
  <!-- Buttons to switch between columns for Sales map -->
  <button on:click={() => switchSalesColumn('avg_sales_value')}>Avg Transaction Value</button>
  <button on:click={() => switchSalesColumn('num_sales_transactions')}>Total Number of Sales</button>

  <!-- Add more buttons for other columns as needed -->
</div>

<div style="display: flex; justify-content: flex-end;">
  <!-- Buttons to switch between columns for Permit map -->
  <button on:click={() => switchPermitColumn('avg_permits_val')}>Avg Permit Value</button>
  <button on:click={() => switchPermitColumn('total_num_permits')}>Total Number of Permits</button>

  <!-- Add more buttons for other columns as needed -->
</div>


<script>
  import mapboxgl from "mapbox-gl";
  import * as d3 from 'd3';
  import { onMount } from "svelte";

  let sale = [];
  let permit = [];
  let salesCensusMap;
  let permitCensusMap;
  let mapViewChanged = 0;
  let radiusScale;
  let permitRadiusScale;
  let currentSalesColumn = 'avg_sales_value'; // Default column names
  let currentPermitColumn = 'avg_permit_val'; // Default column names

  async function loadMaps() {
    return Promise.all([
      new Promise(resolve => {
        salesCensusMap = new mapboxgl.Map({
          container: 'salesCensusMap',
          style: 'mapbox://styles/rachelmb/cluq9tisq01ed01pbebh1c7np',
          center: [-71.0955, 42.3314],
          zoom: 11
        });

        salesCensusMap.on('load', () => resolve(salesCensusMap));
      }),
      new Promise(resolve => {
        permitCensusMap = new mapboxgl.Map({
          container: 'permitCensusMap',
          style: 'mapbox://styles/rachelmb/cluisi2c0003o01p2c4mdf1k2',
          center: [-71.0955, 42.3314],
          zoom: 11
        });

        permitCensusMap.on('load', () => resolve(permitCensusMap));
      })
    ]);
  }

  onMount(async () => {
    [salesCensusMap, permitCensusMap] = await loadMaps();
    const data = await d3.csv('https://raw.githubusercontent.com/your_username/your_repository/your_branch/your_file.csv');

    sale = data.map(d => ({ ...d, CurrentSalesColumn: parseFloat(d.CurrentSalesColumn) }));
    permit = data.map(d => ({ ...d, CurrentPermitColumn: parseFloat(d.CurrentPermitColumn) }));

    let maxCurrentSalesColumn = d3.max(sale, d => d.CurrentSalesColumn);
    let maxCurrentPermitColumn = d3.max(permit, d => d.CurrentPermitColumn);

    radiusScale = d3.scaleSqrt()
      .domain([0, maxCurrentSalesColumn])
      .range([1, 30]);

    permitRadiusScale = d3.scaleSqrt()
      .domain([0, maxCurrentPermitColumn])
      .range([1, 30]);

    salesCensusMap?.on("move", evt => mapViewChanged++);
    permitCensusMap?.on("move", evt => mapViewChanged++);
  });

  function getCoords(sale) {
    let point = new mapboxgl.LngLat(+sale.Long, +sale.Lat);
    let { x, y } = salesCensusMap.project(point);
    return { cx: x, cy: y };
  }

  function getPermitCoords(permit) {
    let point = new mapboxgl.LngLat(+permit.Long, +permit.Lat);
    let { x, y } = permitCensusMap.project(point);
    return { cx: x, cy: y };
  }

  export let filteredSales = [];
  export let filteredPermits = [];

  $: {
    filteredSales = sale.map(sale => ({ ...sale, CurrentSalesColumn: sale[currentSalesColumn] }));
    filteredPermits = permit.map(permit => ({ ...permit, CurrentPermitColumn: permit[currentPermitColumn] }));
  }

  function switchSalesColumn(columnName) {
    currentSalesColumn = columnName;
  }

  function switchPermitColumn(columnName) {
    currentPermitColumn = columnName;
  }
</script>
