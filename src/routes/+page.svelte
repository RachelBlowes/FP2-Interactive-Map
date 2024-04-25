<svelte:head>
  <title>Renovation | Speculation</title>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
  <link href="https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css" rel="stylesheet">
  <script src="https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.js"></script>
</svelte:head>

<Scroller top="{0.0}" bottom="{0.7}" bind:index bind:offset bind:progress>
  <div slot="background">
    
    <img id="fadedcoverphoto" src="src/lib/coverphoto.png" alt=""> 
    
  </div>

  <div slot="foreground">
    <section> 
      <!-- This is the 1st section -->
      <div id="cover">
        <h1>Renovation | Speculation</h1>
        <img id="coverphoto" src="src/lib/coverphoto.png" alt=""> 
      </div>
    </section>
    <section> 
      <!-- This is the 2nd section -->
      <h2> Mapping speculative investment in Boston’s housing market using data on renovation, construction, and sales </h2>
    </section>
    <section>
      <!-- This is the 3rd section. -->
      <h3>Between 2010 and 2022, housing prices in Boston have increased by xx%</h3>
    </section>
    <section>
      <!-- This is the 4th section. -->
      <p>We use public building permit data from 2010-2023 in addition to sales and assessment data to better understand the relationship between <strong>physical</strong> and <strong>fiscal</strong> investment in the housing market.</p>
    </section>
    <section>
      <!-- This is the 5th section. -->
      <div id="definitions">
        <div id="physical">
          <p id="physicaltitle">Physical (adj)</p>
          <p><em>tangible or concrete</em></p>
          <p>In our analysis, physical investments refer to money spent on physical improvements to a given property</p>
        </div>
        <div id="fiscal">
          <p id="fiscaltitle">Fiscal (adj)</p>
          <p><em>relating to financial matters</em></p>
          <p>In our analysis, fiscal investments refer to residential real estate transactions</p>
        </div>     
      </div>
    </section>
  </div>
</Scroller>




<h4>Why building permits?</h4>

<div class="text-container">
  <p class="columntext">
    Boston is in the midst of a housing availability and affordability crisis. Its housing stock is relatively static, with few new developments.
    
    While renovation may improve living conditions in a given building, it can also reveal speculation patterns. </p>
  <p class="columntext">
    Almost 90% of sold flipped properties have a documented permit. 

    We look at flipped sales transactions, declared works valuation and keyword search of the permit’s description to explore how fiscal and physical investment affect speculation.</p>
</div>


<TimeSliderMaps />
<MapComparison />
<WordCloud />


<script>
  //TimeSlider Maps
    import TimeSliderMaps from "$lib/TimeSliderMaps.svelte";
    import mapboxgl from "mapbox-gl";
    import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";
    mapboxgl.accessToken = "pk.eyJ1IjoicmFjaGVsbWIiLCJhIjoiY2x1bjFtbDUwMHN3YTJrb2EyaDZqcGYzNCJ9.wzfF026YmS7lxeAbQOD_tA";
    import * as d3 from 'd3';

    import WordCloud from "../lib/WordCloud.svelte";


  //Comparison Maps
    import { onMount } from 'svelte';
    import MapComparison from '$lib/MapComparison.svelte';

    //Scroller
    import Scroller from "@sveltejs/svelte-scroller";
    let index, offset, progress;


</script>

