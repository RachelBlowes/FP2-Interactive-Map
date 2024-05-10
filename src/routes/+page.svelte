<svelte:head>
  <title>Speculation | Renovation</title>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
  <link href="https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css" rel="stylesheet">
  <script src="https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.js"></script>
</svelte:head>

<Scroller top="{0.18}" bottom="{0.9}" bind:index bind:offset bind:progress>
  <div slot="background">
    <img id="fadedcoverphoto" src="https://rachelblowes.github.io/Geodata/Images/coverphoto.png" alt="Split picture showing an apartment before and after renovation">
       
  </div>

  <div slot="foreground">
   
    <!-- This is the 1st section -->
    <section class="section-long"> 
      <div id="cover">
        <h1 class="cover_header">Speculation | Renovation</h1>
        <h2 class="cover_subtitle"> Mapping speculative investment in Boston’s housing market using data on renovation, construction, and sales </h2>
        <img id="coverphoto" src="https://rachelblowes.github.io/Geodata/Images/coverphoto.png" alt="Split picture showing an apartment before and after renovation"> 
      </div>
    </section>
    <!-- This is the 2nd section -->
    <section class="section-long">
      <h3>Boston’s housing market is under immense pressure, with a shortage of supply for prospective home buyers and with over half of renters being rent burdened. </h3>
    </section>
    <!-- This is the 3rd section -->
    <section class="section-long">
      <div>
        <div id="animation-div">
          <DotAnimation />
        </div>
      </div>
    </section>
      
   <!-- This is the 4th section -->
   <section class="section-long">
    <h3>Since 2010, real estate prices have doubled. According to the MAPC, speculation through investor activity is much to blame…</h3>
   </section>
    <!-- This is the 5th section -->
    <section class="section-long">
      <h3>Property speculation is an approach to real estate investment where anticipated profits are based on predicted changes in local market conditions rather than physical improvements.</h3>
    </section>
    <!-- This is the 6th section -->
    <section class="section-long">
    <div>
      <h3>While sales data can provide information about the value and stakeholders involved in a given transaction, the physical side of speculation can provide insight on whether improvements take place when units exchange hands. </h3>
    </div>
    </section>
    <!-- This is the 7th section -->
    <section class="section-long">
      <h3>Here, public building permit data from 2010-2022 is explored to investigate three questions: </h3>
      <ol id="list-text">
          <li>Who is building and renovating?</li>
          <li>How is improvement distributed?</li>
          <li>How much profit is being made when repair costs are subtracted?</li>
      </ol>
    </section>
    <!-- This is the 8th section. -->
    <section class="section-long">
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
    <!-- This is the 9th section. -->
    <section class="section-long">
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
    </section>
</div>
</Scroller>

<section class="section-short">
  <h2>Let's explore the spatial distribution of sales and building permits. </h2>
</section>

<header id="fiscalvsphysical" style="position: sticky; top: 0; z-index: 1000;">
  <h4>Fiscal</h4>
  <div id="divline"></div>
  <h4>Physical</h4>
</header>

<!-- SLIDEY COMPARISON MAP ------------------------------------------------------------------->
<section class="section-short">
  <h5>Move the slider on the map to compare sales and building permits in the city…</h5>
</section>
<h2>Fiscal vs. Physical Investment</h2>
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

<Scroller top="{0.0}" bottom="{1.0}" bind:index bind:offset bind:progress>
  <div slot="background">
         
  </div>

  <div slot="foreground">
  <section class="section-long" style="position: sticky; top: 0; z-index: 1000;">
    <h3>Boston is a city with a relatively old housing stock, and therefore physical investment usually takes the shape of renovation or remodeling. But who’s doing the investing?  </h3>
  </section>
  <section class="section-short">
    <h5>Move the slider to see the change in investor type over time…</h5>
  </section>
</div>
</Scroller>


<!-- TIME SLIDER MAP ------------------------------------------------------------------->
<h2>Shifting Trends in Investment Behavior</h2>
<TimeSliderMaps class="component"/>

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
 

<div style="height: 40px;"></div>

<Scroller top="{0.0}" bottom="{0.5}" bind:index bind:offset bind:progress>
  <div slot="background">
         
  </div>

  <div slot="foreground">
    <section class="section-long" style="position: sticky; top: 0; z-index: 1000;">
      <h3>While most sales are still done by individuals, building permits for residential properties paint a different picture, with huge physical investments made by corporations and trusts. This trend has been increasing since 2010, with the proportion of corporate investment growing from 13% to 32%. 
      </h3>
    </section>
    <section class="section-short">
      <h3>How is this distributed spatially? Let’s explore the spatial patterns of physical and fiscal investment in they city.  
      </h3>
    </section>      
</div>
</Scroller>
<section class="section-short">
  <h5>Toggle the maps to explore spatial patterns of building and buying…
  </h5>
</section>
<!-- <h3> Corporate investors are investing heavily in the construction and renovation of single-family units, 
  which are more profitable. </h3>

<div style="height: 40px;"></div>

<h3> Properties owned by corporate owners are more likely to be flipped. </h3>

<div style="height: 40px;"></div> -->
 
<!-- WHERE? ------------------------------------------------------------------->
<h2> What are the spatial patterns of investment around Boston?  </h2>

<div style="height: 40px;"></div>

<Census_Maps class="component"/>



<!-- <div style="height: 100px;"></div>

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
  <p>Hover over the bars to see more information. </p> -->

<div style="height: 40px;"></div>

<h3> Sales are distributed relatively evenly across census tracts, 
whereas building permits are more infrequent for the lowest-income and highest-income census parcels.  </h3>

<div style="height: 40px;"></div>

 <!-- WHAT? ------------------------------------------------------------------->
 <section class="section-short">
  <h3> Permits also give insight on speculation - flipped properties are more likely to have superficial 
    work done, possibly putting further pressure on the market without increasing the quality of the property. </h3>
</section>
<section class="section-short">
  <h5>Toggle the wordcloud to see the keywords for flipped and non-flipped properties…</h5>
</section>

<div calss="component">
  <WordCloud class="component"/>
  <div id="divline"></div>
</div>

<section class="section-long">
  <h3> Is physical investment used by speculative investors to artificially inflate the value of properties?  </h3>
</section>

<Scroller top="{0.0}" bottom="{0.7}" bind:index bind:offset bind:progress>
  <div slot="background">
    
    <img id="fadedcoverphoto" src="https://rachelblowes.github.io/Geodata/Images/coverphoto.png" alt="Split picture showing an apartment before and after renovation"> 
    
  </div>

  <div slot="foreground">
    
    <section class="section-long">
      <!-- Example - intro -->
      <p id="centered-text"><strong>Let’s explore an example property to examine this.</strong></p>
      <p id="centered-text"><strong>How much profit do you think the investor made?</strong></p>
    </section>

    <section class="section-long">
      <!-- Example 01-->
      <div id="definitions" class="collage">
        <div id="physical">
          <h1 id="example_header" style="color: black; text-align: left;">11 Joseph St</h1>
          <h5 id="example_typology_header" style="text-align: left">2 Family Residential House</h5>
          <p id="paragraph_sale1">An investor bought 11 Joseph st. in July 2015 for <strong id="fiscaltitle">$238,000.</strong></p>
          <br>
          <img src="https://github.com/RachelBlowes/FP2-Interactive-Map/blob/main/src/lib/11_JosephSt/11Joseph_2014.png?raw=true" alt="11 Joseph St 2014" class="GSV">
          <p><em>Google Street View, 2014</em></p>
        </div>
        <div id="fiscal">
          <img src="https://github.com/RachelBlowes/FP2-Interactive-Map/blob/main/src/lib/11_JosephSt/1st.png?raw=true" alt="Ground Floor plan" class="arch_plan"  style="margin-top: 5em">
          <p >They then immediately started off with an investment of <strong id="physicaltitle">$12,975</strong> (fees included) installing vinyl sidings on the entire exterior, repaired the front porch, and re-issued a gaz permit.</p>
        </div>  
      </div>
    </section>
    <section class="section-long">
      <!-- Example 02 - sale + 2nd renovation -->
      <div id="definitions" class="collage">
        <div id="physical" style="margin-top: -3em">
          <p id="paragraph_sale1" style="margin-top: 10em">A year from purchasing, he sold the renovated first floor in August 2015 as a standalone dwelling unit for <strong id="fiscaltitle">$425,000.</strong></p>
          <br>
          <img src="https://github.com/RachelBlowes/FP2-Interactive-Map/blob/main/src/lib/11_JosephSt/11Joseph_2019.png?raw=true" alt="11 Joseph St 2019" class="GSV">
          <p><em>Google Street View, 2019</em></p>
        </div>
        <div id="fiscal" style="margin-top:40em">
          <p style="position: relative; top: -14.5em;">In the next step they invested <strong id="physicaltitle">$17,700</strong> in a Face-Lift for the second and third floors: retiling the 2 bathrooms on both floors, replacing kitchen cabinets, replacing interior doors, and painting.</p>
          <img src="https://github.com/RachelBlowes/FP2-Interactive-Map/blob/main/src/lib/11_JosephSt/3rd.png?raw=true" alt="Second Floor plan" class="arch_plan"  style="margin-top: -29em">
        </div>  
      </div>
    </section>
    <section class="section-long">
      <!-- Example 03 - 2 last sales -->
      <div id="definitions" class="collage">
        <div id="physical" style="margin-top: -3em">
          <p id="paragraph_sale1" style="margin-top: 10em">The investor sold the apartment on the second floor on March 2017 for <strong id="fiscaltitle">$727,000.</strong>, and the third floor as a studio flat for <strong id="fiscaltitle">$144,641</strong> on Dec 2018. 
            The last sale also converted the property from a two-family residential housing to <strong id="physicaltitle">a 3 family residential housing.</p>
          <br>
          <img src="https://github.com/RachelBlowes/FP2-Interactive-Map/blob/main/src/lib/11_JosephSt/reno_img/2017details_kitchen2.jpeg?raw=true" width=400px>
          <p><em>REDFIN Real Estate</em></p>
          <img src="https://github.com/RachelBlowes/FP2-Interactive-Map/blob/main/src/lib/11_JosephSt/reno_img/2017details.jpeg?raw=true" style="position: relative; top: 2em; left:0em" width=400px>
        </div>
        <div id="fiscal" style="margin-top:40em">
          <p style="position: relative; top: -14.5em; left:-2em;">Between the 2nd and the 3rd sales, they also invested <strong id="physicaltitle">$7,187</strong> in upgrading the electricity infrastructure and adding 1 public meter, as well as replacing 3 windows. </p>
          <img src="https://github.com/RachelBlowes/FP2-Interactive-Map/blob/main/src/lib/11_JosephSt/reno_img/2017details_bathroom.jpeg?raw=true" style="position: relative; top: -13em; left:-8em" width=500px>
        </div>  
      </div>
    </section>
    <section class="section-long">
      <h3 style="position: relative; top: 30em;"> In less than 4 years, and an initial investment of <b>$250,975</b>, the investor made a profit of</h3> 
      <!-- <br> -->
      <h1 style="position: relative; top: 30em;"><strong id="fiscaltitle">Over $1MM</strong></h1>
    </section>

    <section class="section-long">
      <br>
    </section>
</Scroller>

<!-- 
<h3> We found that units with building permits generally had a higher profit, however this profit has increased from $16,000 to nearly $70,0000 
  since 2010, an over fourfold increase. </h3>

  <div style="height: 20px;"></div> -->

<section class="section-long">
  <h3> Since 2017, the profit from real estate has risen from a few ten thousand dollars to $2-300,000, with physically improved properties decoupling from this trend, demonstrating that physical investment may be being used to inflate the value of real estate. </h3>
</section>
<section class="section-short">
  <h5>Move the slider to see this trend change over time…</h5>
</section>

<h2>Median profit (price diff - permit valuation - permit fees) for residential properties</h2>
<PermitSalesDiffLineGraph />

<div style="height: 80px;"></div>
<!-- 
<Conclusion_Map /> -->

<!-- <ZipRenterBarChart /> -->

<script>

  //Comparison Maps
  import { onMount } from 'svelte';
    import MapComparison from '$lib/MapComparison.svelte';

  //TimeSlider Maps

    import mapboxgl from "mapbox-gl";
    import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";
    mapboxgl.accessToken = "pk.eyJ1IjoicmFjaGVsbWIiLCJhIjoiY2x1bjFtbDUwMHN3YTJrb2EyaDZqcGYzNCJ9.wzfF026YmS7lxeAbQOD_tA";
    import * as d3 from 'd3';
    import TimeSliderMaps from '$lib/TimeSliderMaps.svelte';

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

    //Bar chart 2
    import PermitSalesDiffLineGraph from '$lib/PermitSalesDiffLineGraph.svelte';

     //Conclusion_Map
    //  import Conclusion_Map from '$lib/Conclusion_Map.svelte';

    //  import { mapData } from '$lib/Conclusion_Map.svelte';

    //zip bar chart
    // import ZipRenterBarChart from '$lib/zipRenterBarChart.svelte';

</script>

<style>
  .cover_header {
    background-color: white;
    position:absolute;
    top: 350px; 
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

  .cover_subtitle {
    position: absolute;
    margin:auto;
    top: 380px; 
    z-index: 1; 
    background-color: rgba(255, 255, 255, 0.8); 
    padding: 10px; 
  }

</style>
