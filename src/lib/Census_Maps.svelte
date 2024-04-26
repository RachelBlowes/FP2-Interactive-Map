

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

</style>


<div id="mapcontainer">
  <div id="salesCensusMap">
  
    <svg>
      {#key mapViewChanged}
        {#each filteredSales as sale}
          <circle { ...getCoords(sale) }
              r={radiusScale(sale.avg_sales_value)}
              fill="#F6517A"
              fill-opacity="0.6"
              stroke="white"
              stroke-width="0.5">
            <title> Sale Price {sale.avg_sales_value}</title>
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
              r={permitRadiusScale(permit.avg_permit_val)}
              fill="#0087EC"
              fill-opacity="0.6"
              stroke="white"
              stroke-width="0.5">
            <title> Permit Value {permit.avg_permit_val}</title>
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
  sale = await d3.csv('https://rachelblowes.github.io/Geodata/demographic_data/master_census_data_lat_long.csv');
  sale.forEach(d => {
    d.avg_sales_value = parseFloat(d.avg_sales_value);
    d.Lat = parseFloat(d.Lat);
    d.Long = parseFloat(d.Long);
  });
  permit = await d3.csv('https://rachelblowes.github.io/Geodata/demographic_data/master_census_data_lat_long.csv');
  permit.forEach(d => {
    d.avg_permit_val = parseFloat(d.avg_permit_val);  
    d.Lat = parseFloat(d.Lat);
    d.Long = parseFloat(d.Long); 
  });


    let maxavg_sales_value = d3.max(sale, d => d.avg_sales_value);
    let maxavg_permit_val = d3.max(permit, d => d.avg_permit_val);
    

    console.log(maxavg_sales_value);
    console.log(maxavg_permit_val);

    radiusScale = d3.scaleSqrt()
      .domain([0, maxavg_sales_value])
      .range([1, 30]);

    permitRadiusScale = d3.scaleSqrt()
      .domain([0, maxavg_permit_val])
      .range([1, 30]);

    salesCensusMap?.on("move", evt => mapViewChanged++);
    permitCensusMap?.on("move", evt => mapViewChanged++);
  });


  function getCoords(sale) {
  // Create a Mapbox GL JS LngLat object from the sale's longitude and latitude
  let point = new mapboxgl.LngLat(+sale.Long, +sale.Lat);
  
  // Project the LngLat object onto the map to get pixel coordinates
  let { x, y } = salesCensusMap.project(point);

  // Return the pixel coordinates as an object with 'cx' and 'cy' properties
  return { cx: x, cy: y };
}

  function getPermitCoords(permit) {
    let point = new mapboxgl.LngLat(+permit.Long, +permit.Lat);
    let { x, y } = permitCensusMap.project(point);
    return { cx: x, cy: y };
  }


export let filteredSales = sale;
export let filteredPermits = permit; 


</script>
