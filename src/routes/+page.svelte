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

  <section> 
      <!-- This is the 2nd section -->
      <h2> Mapping speculative investment in Boston’s housing market using data on renovation, construction, and sales </h2>
    <DotAnimation />
  </section>

  
      <h3>Between 2010 and 2022, housing prices in Boston have increased by over 200%. </h3>
      <h3>Investment in housing is not confined just to the buying and selling of properties - 
        Boston is an old city with limited new construction, meaning that investment also takes 
        the form of renovation and remodeling.  </h3>

      <!-- This is the 4th section. -->
      <h3> We use public building permit data in addition to sales data from 2010 - 2022 to better 
        understand the relationship between physical and fiscal investment in the housing market.</h3>

    <section>
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
    </section>

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

    <section>
      <!-- Example - intro -->
      <p>Flipping is buying a property to <strong id="physicaltitle">renovate</strong> and then <strong id="fiscaltitle">sell</strong> - in the shortest time possible. In our dataset, within less than two years from the previous sale.</p>
      <br><br> 
      <p id="centered-text"><strong>Let's explore a flipped house.</strong></p>
      <p id="centered-text"><strong>Can you calculate the profit in your head?</strong></p>
    </section>

    <section>
      <!-- Example 01-->
      <div id="definitions" class="collage">
        <div id="physical">
          <h1 id="example_header" style="color: black; text-align: left;">11 Joseph St</h1>
          <h5 id="example_typology_header" style="text-align: left">2 Family Residential House</h5>
          <p id="paragraph_sale1">Mr. O'Malley bought 11 Joseph st. in July 2015 for <strong id="fiscaltitle">$238,000.</strong></p>
          <br>
          <img src="https://github.com/RachelBlowes/FP2-Interactive-Map/blob/main/src/lib/11_JosephSt/11Joseph_2014.png?raw=true" alt="11 Joseph St 2014" class="GSV">
          <p><em>Google Street View, 2014</em></p>
        </div>
        <div id="fiscal">
          <img src="https://github.com/RachelBlowes/FP2-Interactive-Map/blob/main/src/lib/11_JosephSt/1st.png?raw=true" alt="Ground Floor plan" class="arch_plan"  style="margin-top: 5em">
          <p >He then immediately started off with an investment of <strong id="physicaltitle">$12,975</strong> (fees included) installing vinyl sidings on the entire exterior, repaired the front porch, and re-issued a gaz permit.</p>
        </div>  
      </div>
    </section>
    <section>
      <!-- Example 02 - sale + 2nd renovation -->
      <div id="definitions" class="collage">
        <div id="physical" style="margin-top: -3em">
          <p id="paragraph_sale1" style="margin-top: 10em">A year from purchasing, he sold the renovated first floor in August 2015 as a standalone dwelling unit for <strong id="fiscaltitle">$425,000.</strong></p>
          <br>
          <img src="https://github.com/RachelBlowes/FP2-Interactive-Map/blob/main/src/lib/11_JosephSt/11Joseph_2019.png?raw=true" alt="11 Joseph St 2019" class="GSV">
          <p><em>Google Street View, 2019</em></p>
        </div>
        <div id="fiscal" style="margin-top:40em">
          <p style="position: relative; top: -14.5em;">In the next step he invested <strong id="physicaltitle">$17,700</strong> in a Face-Lift for the second and third floors: retiling the 2 bathrooms on both floors, replacing kitchen cabinets, replacing interior doors, and painting.</p>
          <img src="https://github.com/RachelBlowes/FP2-Interactive-Map/blob/main/src/lib/11_JosephSt/3rd.png?raw=true" alt="Second Floor plan" class="arch_plan"  style="margin-top: -29em">
        </div>  
      </div>
    </section>
    <!-- <section>
      <div id="gallery" class="collage">
        <img  src="src/lib/11_JosephSt/reno_img/2017_details_bathroom2.jpeg" alt="retiling of bathroom">
        <img  src="src/lib/11_JosephSt/reno_img/2017details.jpeg" alt="retiling of bathroom">
        <img  src="src/lib/11_JosephSt/reno_img/2017details_kitchen2.jpeg" alt="retiling of bathroom">
        <img src="src/lib/11_JosephSt/reno_img/2017details_kitchen.jpeg" alt="retiling of bathroom">
        <img src="src/lib/11_JosephSt/reno_img/2017details_bathroom.jpeg" alt="retiling of bathroom">
      </div>
    </section> -->
    <section>
      <!-- Example 03 - 2 last sales -->
      <div id="definitions" class="collage">
        <div id="physical" style="margin-top: -3em">
          <p id="paragraph_sale1" style="margin-top: 10em">He sold the apartment on the second floor on March 2017 for <strong id="fiscaltitle">$727,000.</strong>, and the third floor as a studio flat for <strong id="fiscaltitle">$144,641</strong> on Dec 2018. 
            The last sale also converted the property from a two-family residential housing to <strong id="physicaltitle">a 3 family residential housing.</p>
          <br>
          <img src="https://github.com/RachelBlowes/FP2-Interactive-Map/blob/main/src/lib/11_JosephSt/reno_img/2017details_kitchen2.jpeg?raw=true" width=400px>
          <p><em>REDFIN Real Estate</em></p>
          <img src="https://github.com/RachelBlowes/FP2-Interactive-Map/blob/main/src/lib/11_JosephSt/reno_img/2017details.jpeg?raw=true" style="position: relative; top: 2em; left:0em" width=400px>
        </div>
        <div id="fiscal" style="margin-top:40em">
          <p style="position: relative; top: -14.5em; left:-2em;">Between the 2nd and the 3rd sales, he also invested <strong id="physicaltitle">$7,187</strong> in upgrading the electricity infrastructure and adding 1 public meter, as well as replacing 3 windows. </p>
          <img src="https://github.com/RachelBlowes/FP2-Interactive-Map/blob/main/src/lib/11_JosephSt/reno_img/2017details_bathroom.jpeg?raw=true" style="position: relative; top: -13em; left:-8em" width=500px>
        </div>  
      </div>
    </section>
    <section>
      <h3 style="position: relative; top: 30em;"> In less than 4 years, and an initial investment of <b>$250,975</b>, Mr. O'Malley made a profit of</h3> 
      <!-- <br> -->
      <h1 style="position: relative; top: 30em;"><strong id="fiscaltitle">Over $1MM</strong></h1>
    </section>
    <section>
      <h3>What does it mean for the city?</h3>
    </section>
    <section>
      <br>
    </section>
</Scroller>

<br>


<header id="fiscalvsphysical" style="position: sticky; top: 0; z-index: 1000;">
  <h4>Fiscal</h4>
  <div id="divline"></div>
  <h4>Physical</h4>
</header>

<!-- NARRATIVE EXAMPLE -->

<!-- DOT CHART - TOTAL INVESTMENT PHYSICAL VS. FISCAL -->

<!-- SLIDEY MAP -->

<h3>Let's explore the spatial distribution of sales and building permits. </h3>
 
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

<TimeSliderMaps class="component"/>

  <h3> While investors only account for a small percentage of sales, the valuation of building 
    permits with corporate owners has increased drastically. </h3>

  <!-- WHO? -->
  <div class="divided">
    <div class="dividedtitle">
      <h3>WHO IS BUILDING?</h3>
    </div>
    <div id="divline"></div>
    <div class="dividedtitle">
      <h3>WHO IS BUYING?</h3>
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
  <p>Move the slider to see changes in owner over time.</p>

    <h3> Corporate investors are investing heavily in the construction and renovation of single-family units, 
      which are more profitable. </h3>
    <h3> Properties owned by corporate owners are more likely to be flipped. </h3>

  <!-- WHERE? -->

    <h2> What are the spatial patterns of investment around Boston?  </h2>

  <Census_Maps class="component"/>

    <div style="height: 100px;"></div>

  <div class="divided">
    <div class="dividedtitle">
      <h3>WHERE ARE WE BUILDING?</h3>
      <CensusBarChart />
    </div>
    <div id="divline"></div>
    <div class="dividedtitle">
      <h3>WHERE ARE WE BUYING?</h3>
      <CensusBarChartFiscal />
    </div>
  </div>
  <p>Hover over the bars to see more information. </p>

    <h3> Sales are distributed relatively evenly across census tracts, 
      whereas building permits are more infrequent for the lowest-income and highest-income census parcels.  </h3>

  <!-- WHAT? -->
    <h3> Permits also give insight on speculation - flipped properties are more likely to have superficial 
      work done, possibly putting further pressure on the market without increasing the quality of the property. </h3>

<div calss="component">
  <WordCloud class="component"/>
  <div id="divline"></div>
</div>

<img src="https://github.com/RachelBlowes/FP2-Interactive-Map/blob/main/src/lib/raster_graphs/Flipped-01.jpg" alt="line graph" width="500" height="600">

  <h3> We found that physical investment did not have a major impact on the sale price of flipped parcels, although parcels 
    we classified as renovated were always slightly more expensive. In 2020, flipped parcels were less likely to have building 
    permits, indicating a decoupling of fiscal and physical investment.  </h3>

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
