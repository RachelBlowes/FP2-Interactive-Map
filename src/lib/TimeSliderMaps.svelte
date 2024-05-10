<style>
  circle {
    pointer-events: auto;
  }

  #salesTimeMap {
    flex: 1;
    width: 50%; /* Adjust the width of each map */
    height: 100%; /* Set a fixed height for each map */
  }

  #salesTimeMap svg {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  #permitTimeMap {
    flex: 1;
    width: 50%; /* Adjust the width of each map */
    height: 100%; /* Set a fixed height for each map */
  }

  #permitTimeMap svg {
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
    background: white; 
    border-radius: 5px; /*Rounded*/
    outline: none; /* Remove outline */
    opacity: 0.8; /* Set transparency (for mouse-over effects on hover) */
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

<div id="maptitles">
  <h5> Boston Yearly Residential Sales </h5>
  <h5> Boston Yearly Building Permits </h5>
</div>

<div id="mapcontainer">
  <div id="salesTimeMap">
  
    <svg>
      {#key mapViewChanged}
        {#each filteredSales as sale}
          <circle { ...getCoords(sale) }
              r={radiusScale(sale.saleprice)}
              fill={
                (sale.buyer_llc_ind === "1" || sale.buyer_llp_ind === "1" || sale.buyer_bus_ind === "1") ? "#FC96B3" :
                (sale.buyer_trst_ind === "1" ? "#0087EC" :
                (sale.buyer_bnk_ind === "1" || sale.buyer_gse_ind === "1") ? "#F69D2C" :
                (sale.buyer_gov_ind === "1" ? "#8D6E63" : "#EE6553"))
              }
              fill-opacity="0.7"
              stroke="white"
              stroke-width="0.5">
            <title> Sale Price {sale.saleprice}</title>
          </circle>
        {/each}
      {/key}
    </svg>
  </div>

  <div id="permitTimeMap">
    <svg>
      {#key mapViewChanged}
        {#each filteredPermits as permit}
          <circle { ...getPermitCoords(permit) }
              r={permitRadiusScale(permit.valuation)}
              fill={
                (permit.ownerType === "c") ? "#FC96B3" :
                (permit.ownerType === "t" ? "#0087EC" :
                (permit.ownerType === "b" ? "#8D6E63" : "#EE6553"))
              }
              fill-opacity="0.7"
              stroke="white"
              stroke-width="0.5">
            <title> Permit Value {permit.valuation}</title>
          </circle>
        {/each}
      {/key}
    </svg>
  </div>
</div>

<div id="legendcontainer">
  <div class="legend">
    <svg class="legendsvg">
      <circle class="legendcircle" r=5 cx="20" cy="20" fill="#FC96B3" fill-opacity="0.7" stroke="white" stroke-width="0.5"></circle>
      <text x="30" y="25" font-family="Arial" font-size="12" fill="black">Corporate</text>
      <circle class="legendcircle" r=5 cx="20" cy="45" fill="#0087EC" fill-opacity="0.7" stroke="white" stroke-width="0.5"></circle>
      <text x="30" y="50" font-family="Arial" font-size="12" fill="black">Trust</text>
      <circle class="legendcircle" r=5 cx="20" cy="70" fill="#F69D2C" fill-opacity="0.7" stroke="white" stroke-width="0.5"></circle>
      <text x="30" y="75" font-family="Arial" font-size="12" fill="black">Bank</text>
      <circle class="legendcircle" r=5 cx="20" cy="95" fill="#8D6E63" fill-opacity="0.7" stroke="white" stroke-width="0.5"></circle>
      <text x="30" y="100" font-family="Arial" font-size="12" fill="black">Government</text>
      <circle class="legendcircle" r=5 cx="20" cy="120" fill="#EE6553" fill-opacity="0.7" stroke="white" stroke-width="0.5"></circle>
      <text x="30" y="125" font-family="Arial" font-size="12" fill="black">Individual/Other</text>
    </svg>
    <svg class="legendsvg">
      <circle class="legendcircle" r={legendRadius1} cx="40" cy="20" fill="#BBB4B1" fill-opacity="0.7" stroke="white" stroke-width="0.5"></circle>
      <text x="80" y="25" font-family="Arial" font-size="12" fill="black">$500,000</text>
      <circle class="legendcircle" r={legendRadius2} cx="40" cy="45" fill="#BBB4B1" fill-opacity="0.7" stroke="white" stroke-width="0.5"></circle>
      <text x="80" y="50" font-family="Arial" font-size="12" fill="black">$5,000,000</text>
      <circle class="legendcircle" r={legendRadius3} cx="40" cy="70" fill="#BBB4B1" fill-opacity="0.7" stroke="white" stroke-width="0.5"></circle>
      <text x="80" y="75" font-family="Arial" font-size="12" fill="black">$50,000,000</text>
      <circle class="legendcircle" r={legendRadius4} cx="40" cy="95" fill="#BBB4B1" fill-opacity="0.7" stroke="white" stroke-width="0.5"></circle>
      <text x="80" y="100" font-family="Arial" font-size="12" fill="black">$332,000,000</text>
    </svg>
  </div>
  <div class="legend">
    <svg class="legendsvg">
      <circle class="legendcircle" r=5 cx="20" cy="20" fill="#FC96B3" fill-opacity="0.7" stroke="white" stroke-width="0.5"></circle>
      <text x="30" y="25" font-family="Arial" font-size="12" fill="black">Corporate</text>
      <circle class="legendcircle" r=5 cx="20" cy="45" fill="#0087EC" fill-opacity="0.7" stroke="white" stroke-width="0.5"></circle>
      <text x="30" y="50" font-family="Arial" font-size="12" fill="black">Trust</text>
      <circle class="legendcircle" r=5 cx="20" cy="70" fill="#8D6E63" fill-opacity="0.7" stroke="white" stroke-width="0.5"></circle>
      <text x="30" y="75" font-family="Arial" font-size="12" fill="black">Government</text>
      <circle class="legendcircle" r=5 cx="20" cy="95" fill="#EE6553" fill-opacity="0.7" stroke="white" stroke-width="0.5"></circle>
      <text x="30" y="100" font-family="Arial" font-size="12" fill="black">Individual/Other</text>
    </svg>
    <svg class="legendsvg">
      <circle class="legendcircle" r={legendRadius5} cx="40" cy="20" fill="#BBB4B1" fill-opacity="0.7" stroke="white" stroke-width="0.5"></circle>
      <text x="80" y="25" font-family="Arial" font-size="12" fill="black">$50,000</text>
      <circle class="legendcircle" r={legendRadius6} cx="40" cy="45" fill="#BBB4B1" fill-opacity="0.7" stroke="white" stroke-width="0.5"></circle>
      <text x="80" y="50" font-family="Arial" font-size="12" fill="black">$500,000</text>
      <circle class="legendcircle" r={legendRadius7} cx="40" cy="70" fill="#BBB4B1" fill-opacity="0.7" stroke="white" stroke-width="0.5"></circle>
      <text x="80" y="75" font-family="Arial" font-size="12" fill="black">$5,000,000</text>
      <circle class="legendcircle" r={legendRadius8} cx="40" cy="95" fill="#BBB4B1" fill-opacity="0.7" stroke="white" stroke-width="0.5"></circle>
      <text x="80" y="100" font-family="Arial" font-size="12" fill="black">$20,000,000</text>
    </svg>
  </div>
</div>


<div id="slider">
  <label id="timesliderlabel" for="timeSlider">Filter by Year:</label>
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

  let legendRadius1 = 0;
  let legendRadius2 = 0;
  let legendRadius3 = 0;
  let legendRadius4 = 0;
  let legendRadius5 = 0;
  let legendRadius6 = 0;
  let legendRadius7 = 0;
  let legendRadius8 = 0;

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
    sale = await d3.csv('https://rachelblowes.github.io/Geodata/Boston_sales_2021/salesprices_2010-2022.csv');
    sale.forEach(d => {
      d.saleprice = parseFloat(d.saleprice);
    });
    permit = await d3.csv('https://rachelblowes.github.io/Geodata/Boston_sales_2021/permit_valuation_ownertype_2010-2022.csv');
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

    salesTimeMap?.on("move", () => {
      mapViewChanged++;
      const { lng, lat } = salesTimeMap.getCenter();
      permitTimeMap.setCenter([lng, lat]);
    });

    permitTimeMap?.on("move", () => {
      mapViewChanged++;
      const { lng, lat } = permitTimeMap.getCenter();
      salesTimeMap.setCenter([lng, lat]);
    });

    salesTimeMap?.on("zoom", () => {
      const zoom = salesTimeMap.getZoom();
      permitTimeMap.setZoom(zoom);
    });

    permitTimeMap?.on("zoom", () => {
      const zoom = permitTimeMap.getZoom();
      salesTimeMap.setZoom(zoom);
    });

    updateLegendRadius();
  });

  function updateLegendRadius() {
    legendRadius1 = radiusScale(500000);
    legendRadius2 = radiusScale(5000000);
    legendRadius3 = radiusScale(50000000);
    legendRadius4 = radiusScale(332000000);

    legendRadius5 = permitRadiusScale(50000);
    legendRadius6 = permitRadiusScale(500000);
    legendRadius7 = permitRadiusScale(5000000);
    legendRadius8 = permitRadiusScale(20000000);
  }

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