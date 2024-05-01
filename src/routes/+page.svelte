<svelte:head>
  <title>Speculation | Renovation</title>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
  <link href="https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css" rel="stylesheet">
  <script src="https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.js"></script>
</svelte:head>

<Scroller top="{0.0}" bottom="{0.7}" bind:index bind:offset bind:progress>
  <div slot="background">
    
    <img id="fadedcoverphoto" src="https://rachelblowes.github.io/Geodata/Images/coverphoto.png" alt="Split picture showing an apartment before and after renovation"> 
    
  </div>

  <div slot="foreground">
    <section> 
      <!-- This is the 1st section -->
      <div id="cover">
        <h1 class="cover_header">Speculation | Renovation</h1>
        <img id="coverphoto" src="https://rachelblowes.github.io/Geodata/Images/coverphoto.png" alt="Split picture showing an apartment before and after renovation"> 
      </div>
    </section>

    <!-- This is the 2nd section -->
    <h2> Mapping speculative investment in Boston’s housing market using data on renovation, construction, and sales </h2>
    
    <DotAnimation />

    <h3>Between 2010 and 2022, housing prices in Boston have increased by over 200%. </h3>

    <h3>Investment in housing is not confined just to the buying and selling of properties - 
      Boston is an old city with limited new construction, meaning that investment also takes 
      the form of renovation and remodeling.  </h3>

    <h3> We use public building permit data in addition to sales data from 2010 - 2022 to better 
      understand the relationship between physical and fiscal investment in the housing market.</h3>

    <div style="height: 40px;"></div>

      <!-- This is the 5th section. -->
      <div id="definitions">
        <div id="fiscal">
          <p id="fiscaltitle">Fiscal (adj)</p>
          <p><em>relating to financial matters</em></p>
          <p>In our analysis, fiscal investments refer to residential real estate transactions</p>
        </div>
        <div id="physical">
          <p id="physicaltitle">Physical (adj)</p>
          <p><em>tangible or concrete</em></p>
          <p>In our analysis, physical investments refer to money spent on physical improvements to a given property</p>
        </div>     
      </div>

      <div style="height: 40px;"></div>

      <!-- Why Permits? -->
      <h3>Why building permits?</h3>

      <div class="text-container">
        <p class="columntext">
          Building permits can give insight on the physical changes that are being made to properties that have sales 
          transactions, helping us understand whether significant improvements are being made to properties that have 
          a wide margin between purchase and sale price, or properties that are classified as "flipped". </p>
        <p class="columntext">
          Almost 90% of sold flipped properties have a documented permit. 
      
          We look at flipped and non-flipped sales transactions, permit declared work 
          valuation and keyword search of the permit’s description to explore how fiscal and physical investment affect speculation.</p>
      </div>
   
</Scroller>

<br>

<h2>Let's explore the spatial distribution of sales and building permits. </h2>

<div style="height: 60px;"></div>

<header id="fiscalvsphysical" style="position: sticky; top: 0; z-index: 1000;">
  <h4>Fiscal</h4>
  <div id="divline"></div>
  <h4>Physical</h4>
</header>

<div style="height: 40px;"></div>

<!-- SLIDEY COMPARISON MAP ------------------------------------------------------------------->
 
<MapComparison class="component"/>
  <div class="divided">
    <div class="dividedtitle">
      <h5>Boston sales 2010-2022, gradient by sale price</h5>
    </div>
    <div id="divline"></div>
    <div class="dividedtitle">
      <h5>Building permits 2010-2022, gradient by permit valuation</h5>
    </div>
  </div>

<h3>Investment in both buying and building has been increasing since 2010, with patterns of 
building foreshadowing patterns of buying. </h3>

<div style="height: 40px;"></div>

<!-- TIME SLIDER MAP ------------------------------------------------------------------->

<TimeSliderMaps class="component"/>

<div style="height: 40px;"></div>

<!-- WHO? ------------------------------------------------------------------->

<h3> While investors only account for a small percentage of sales, the valuation of building 
  permits with corporate owners has increased drastically. </h3>

<div style="height: 40px;"></div>

  <!-- WHO? -->
  <div class="divided">
    <div class="dividedtitle">
      <h5>Who is building?</h5>
    </div>
    <div id="divline"></div>
    <div class="dividedtitle">
      <h5>Who is buying?</h5>
    </div>
  </div>

  <div class="divided">
    <div class="dividedchart">
      <Owner_linegraph />
    </div>
    <div id="divline"></div>
    <div class="dividedchart">
      <OwnerLinegraphSales />
    </div>
  </div>
  <div style="height: 120px;"></div>
  <p>Move the slider to see changes in owner over time.</p>
  <div style="height: 80px;"></div>

  <!-- <h3> Corporate investors are investing heavily in the construction and renovation of single-family units, 
      which are more profitable. </h3>

  <div style="height: 40px;"></div>
  
  <h3> Properties owned by corporate owners are more likely to be flipped. </h3>

  <div style="height: 40px;"></div> -->

<!-- WHERE? ------------------------------------------------------------------->

<h2> What are the spatial patterns of investment around Boston?  </h2>

<div style="height: 40px;"></div>

<Census_Maps class="component"/>

<div style="height: 100px;"></div>

  <div class="divided">
    <div class="dividedtitle">
      <h5>Where are we building?</h5>
      <CensusBarChart />
    </div>
    <div id="divline"></div>
    <div class="dividedtitle">
      <h5>Where are we buying?</h5>
      <CensusBarChartFiscal />
    </div>
  </div>
  <p>Hover over the bars to see more information. </p>

<div style="height: 40px;"></div>

<h3> Sales are distributed relatively evenly across census tracts, 
whereas building permits are more infrequent for the lowest-income and highest-income census parcels.  </h3>

<div style="height: 40px;"></div>

 <!-- WHAT? ------------------------------------------------------------------->
<h3> Permits also give insight on speculation - flipped properties are more likely to have superficial 
  work done, possibly putting further pressure on the market without increasing the quality of the property. </h3>

<div style="height: 40px;"></div>

<div calss="component">
  <WordCloud class="component"/>
  <div id="divline"></div>
</div>

<div style="height: 20px;"></div>

<h3> We found that physical investment always results in a higher sales price difference for residential properties. Since 2010, 
  this price difference has increased from $42,000 to nearly $140,000, demonstratrating a decoupling of investment and value. </h3>

<div style="height: 80px;"></div>

<PermitSalesDiffLineGraph />

<script>

  //Comparison Maps
  import { onMount } from 'svelte';
    import MapComparison from '$lib/MapComparison.svelte';

  //TimeSlider Maps
    import TimeSliderMaps from "$lib/TimeSliderMaps.svelte";
    import mapboxgl from "mapbox-gl";
    import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";
    mapboxgl.accessToken = "pk.eyJ1IjoicmFjaGVsbWIiLCJhIjoiY2x1bjFtbDUwMHN3YTJrb2EyaDZqcGYzNCJ9.wzfF026YmS7lxeAbQOD_tA";
    import * as d3 from 'd3';

  //WordCloud
  import WordCloud from '$lib/WordCloud.svelte';

  //Owner Linegraph
    import Owner_linegraph from '$lib/Owner_linegraph.svelte';

  //Owner Linegraph Sales
    import OwnerLinegraphSales from '$lib/Owner_linegraph_sales.svelte';

    import Scroller from "@sveltejs/svelte-scroller";
    let index, offset, progress;

    //bar chart fiscal
    import CensusBarChart from '$lib/CensusBarChart.svelte';

     //bar chart
    import CensusBarChartFiscal from '$lib/CensusBarChartFiscal.svelte';

    //Census_Maps
    import Census_Maps from '$lib/Census_Maps.svelte';

    //DotAnimation
    import DotAnimation from '$lib/DotAnimation.svelte';

    //permit sales line graph
    import PermitSalesDiffLineGraph from '$lib/PermitSalesDiffLineGraph.svelte';


</script>

<style>
  .cover_header {
    background-color: white;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 7px;
    padding-top: 7px;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);
  }

  .GSV{
    width: 100%;
  }

  .arch_plan{
    width: 180%;
    z-index: 3;
  }

</style>
