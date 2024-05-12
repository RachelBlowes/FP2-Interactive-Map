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
      <h3>Boston’s housing market is under immense pressure, with a shortage of supply for prospective home buyers 
        and with <span style="color: #F6517A">over half of renters being rent burdened. </span></h3>
    </section>

       <!-- This is the 4th section -->
   <section class="section-long">
    <h3>Since 2010, real estate prices have doubled. According to the MAPC's 2023 
      <a href="https://www.mapc.org/resource-library/homes-for-profit/">Homes for Profit report</a>
      , <span style="color: #F6517A">speculative investment is on the rise in 
      Boston,</span> resulting in increased inaffordability as corporate investors crowd out both homebuyers and renters. 
    </h3>
   </section>

     <!-- This is the 5th section -->
     <section class="section-long">
      <h3>Property speculation is an approach to real estate investment where anticipated profits are based on predicted changes in 
        local market conditions <span style="color: #F6517A">rather than physical improvements.</span></h3>
    </section>

     <!-- This is the 5th section -->
     <section class="section-long">
      <h3>Between 2010 and 2022, there were <span style="color: #F6517A">178,2000 sales transactions</span> in Boston, but the same period of time saw nearly 
        <span style="color: #F6517A">620,000 building permits. </span> Both the declared cost of the work reflected by a building permit, and the sale price of properties in 
          Boston have been growing rapidly, outpacing inflation. 
        </h3>
    </section>

    <!-- This is the 3rd section -->
    <section class="section-long">
      <div>
        <div id="animation-div">
          <h2>Median Sale and Permit Valuation</h2>
          <DotAnimation />
        </div>
      </div>
    </section>

    <!-- This is the 6th section -->
    <section class="section-long">
    <div>
      <h3>While sales data can provide information about the value of a given transaction and the stakeholders involved in it, the physical side of speculation can 
        provide insight on <span style="color: #F6517A">whether improvements take place when units exchange hands.</span> Almost 90% of flipped properties have a building permit.</h3>
    </div>
    </section>

    <!-- This is the 7th section -->
    <section class="section-long">
      <h3>In this project, public building permit data from 2010-2022 is explored to investigate four questions: </h3>
      <ol id="list-text">
          <li>Who is building and renovating?</li>
          <li>How is improvement distributed?</li>
          <li>What kind of work is being done?</li>
          <li>How much more do renovated properties sell for? Is this justified?</li>
      </ol>
    </section>

    <!-- This is the 8th section. -->
    <section class="section-long">
      <h3>We divide types of investment into <span style="color: #F6517A">"fiscal"</span> and <span style="color: #F6517A">"physical"</span>, 
        acknowledging that investment doesn't only take the form of sales transactions.</h3>      
        <div id="definitions">
        <div id="fiscal">
          <p id="fiscaltitle">Fiscal (adj)</p>
          <p><em><span style="color: #F6517A">relating to financial matters</span></em></p>
          <p>In our analysis, fiscal investments refer to residential real estate transactions.</p>
        </div>
        <div id="physical">
          <p id="physicaltitle">Physical (adj)</p>
          <p><em><span style="color: #F6517A">tangible or concrete</span></em></p>
          <p>In our analysis, physical investments refer to money spent on physical improvements to a given property.</p>
        </div>     
      </div>
    </section>

</Scroller>

<section class="section-short">
  <h3>Let's explore the spatial distribution of sales and building permits. </h3>
</section>

<header id="fiscalvsphysical" style="position: sticky; top: 0; z-index: 1000;">
  <h4>Fiscal</h4>
  <div id="divline"></div>
  <h4>Physical</h4>
</header>

<div style="height: 60px;"></div>

<!-- SLIDEY COMPARISON MAP ------------------------------------------------------------------->
<section class="section-short">
  <h5>Move the slider on the map to compare sales and building permits in the city…</h5>
</section>
<h2>Fiscal vs. Physical Investment</h2>
<div class="divided">
  <div class="dividedtitle">
    <h5>Boston residential sales, 2010-2022</h5>
  </div>
  <div id="divline"></div>
  <div class="dividedtitle">
    <h5>Boston residential building permits, 2010-2022</h5>
  </div>
</div>
<MapComparison class="component"/>


<Scroller top="{0.0}" bottom="{1.0}" bind:index bind:offset bind:progress>
  <div slot="background">
         
  </div>

  <div slot="foreground">
  <section class="section-long" style="position: sticky; top: 0; z-index: 1000;">
    <h3>Boston is a city with a relatively old housing stock, and therefore physical investment usually takes the shape of renovation or remodeling. 
      <span style="color: #F6517A">But who’s doing the investing?</span></h3>
  </section>
  <section class="section-short">
    <h5>Move the slider to see the change in investor type over time.</h5>
  </section>
</div>
</Scroller>


<!-- TIME SLIDER MAP ------------------------------------------------------------------->
<h2>Shifting Trends in Investor Type</h2>
<TimeSliderMaps class="component"/>

<TimeseriesLinegraphs />
<!-- <OwnerLinegraphSales /> -->

<div style="height: 300px;"></div>


<Scroller top="{0.0}" bottom="{1.0}" bind:index bind:offset bind:progress>
  <div slot="background">
         
  </div>

  <div slot="foreground">
    <section class="section-short">
      <h3>While most sales are still done by individuals, building permits for residential properties paint a different picture, with huge physical investments made by 
        corporations and trusts. This trend has been increasing since 2010, with the <span style="color: #F6517A">proportion of corporate investment growing from 13% to 32%. </span>
      </h3>
    </section>
    <section class="section-long" style="position: sticky; top: 0; z-index: 1000;">
      <h3><span style="color: #F6517A">How is investment distributed spatially?</span> Let’s explore the patterns of physical and fiscal investment in the city. 
        We'll start our exploration in East Boston, an area with a history of disinvestment, but recently, an increase in speculation, and a 
        high percentage of renters.  
      </h3>
    </section>
    <section class="section-short">
      <h5>Toggle the maps to explore spatial patterns of building and buying. Click and drag to explore other neighborhoods. 
      </h5>
    </section>      
</div>
</Scroller>
 
<!-- WHERE? ------------------------------------------------------------------->
<h2> What are the spatial patterns of investment around Boston?  </h2>

<div style="height: 40px;"></div>

<Census_Maps class="component"/>

<div style="height: 40px;"></div>

<h3> Building permits show areas with high physical investment - this could be areas with lots of building activity, but also older
  neighbourhoods where few new builds are happening. Across Boston, areas with more renters have less investment in building permits, and the wealthiest
suburban areas have up to one building permit for every three residents. Areas with more renters also typically have more flipped properties than low percent-renter areas.</h3>

<div style="height: 40px;"></div>

 <!-- WHAT? ------------------------------------------------------------------->
 <section class="section-short">
  <h3> But what kind of work is being done?
    Permits also give insight on speculation - <span style="color: #F6517A">flipped properties are more likely to have superficial 
    work done,</span> possibly putting further pressure on the market without increasing the quality of the property. </h3>
</section>

<h5>Toggle the wordcloud to see the keywords for flipped and non-flipped properties…</h5>
<div calss="component">
  <WordCloud class="component"/>
  <div id="divline"></div>
</div>

<section class="section-long">
  <h3> Finally, looking at sales and permit data together allows us to analyze the profits made by investors who are 
    making physical changes to their properties. We ask: is physical investment used by speculative investors to artificially inflate the value of properties?  </h3>
</section>

<Scroller top="{0.0}" bottom="{0.7}" bind:index bind:offset bind:progress>
  <div slot="background">
    
    <img id="fadedcoverphoto" src="https://rachelblowes.github.io/Geodata/Images/coverphoto.png" alt="Split picture showing an apartment before and after renovation"> 
    
  </div>

  <div slot="foreground">
    <section>
      <br>
    </section>

    <section class="section-long">
      <!-- Example - intro -->
      <h3>Let's explore some properties that have undergone various forms of investment.</h3>
      <h2>How much profit do you think the investor made?</h2>
      <div style="height: 80px;"></div>
      <h5>Click one on the property addresses to explore the investments made.
      </h5>
    </section>

      <CaseStudy class="component"/>

  
</Scroller>

<section class="section-long">
  <h3> Now that we've explored several properties, let's look at how the profits made by residential real estate transactions have changed
    between 2010 and 2022, with attention to transactions that have building permits, especially building permits that hint at <span style="color: #F6517A">renovations or remodels.</span> </h3>
</section>
<section class="section-short">
  <h5>Move the slider to see this trend change over time, hover for details.</h5>
</section>


<h2>Median profit for residential properties 2010-2022</h2>
<h5>(Sale profit - permit valuation - permit fees. Adjusted for 2022 dollars)</h5>
<PermitSalesDiffLineGraph />

<section class="section-long">
  <h3> Since 2017, the profit from real estate has risen from a few ten thousand dollars to $2-300,000, after the cost of the work, and adjusted for inflation. 
    Properties with building permits demonstrated a decoupling from properties without permits, demonstrating that <span style="color: #F6517A">physical investment may be 
    being used to inflate the value of real estate</span>, or, at the very least, home-buyers are willing to overpay for properties that 
    give the impression of having been improved. </h3>
</section>

<section class="section-long">
  <h3> The impact of speculative investment on home buyers is relatively clear, but <span style="color: #F6517A">what does this mean for renters?</span></h3>
</section>

<section class="section-short">
  <h5>Hover over zip codes to see the correlation between percent renter and profit on the bar chart below. 
    Toggle between years to see change over time.</h5>
</section>

<h2>Profit after Improvement and Percent Renter</h2>
<Conclusion_Map />

<section class="section-long">
  <h3> Profits on real estate transactions have increased drastically in the last 12 years. There is a slight correlation between zip codes 
    with a higher percentage of renters and increased profits, <span style="color: #F6517A">suggesting that high-renter areas could be seen as more profitable for 
    speculative investment.</span>
  </h3>
</section>

<section class="section-long">
  <h3> <span style="color: #F6517A"> This analysis shines a light on the complexity of physical and fiscal investment: 
    while the renovation and remodeling is an important part of providing livable housing, it could also be used as an instrument
    of speculation, especially in flipped properties where superficial changes are made in the hope of a higher profit.</span>
  </h3>
</section>

<div style="height: 160px;"></div>

<br>



<div class="middle">
  <div style="margin-top: -6em;">
    <h2 id="share">Share Here! </h2>
  </div>
    <Email class="share-button" subject="{title}" body="{desc} {url}" />
    <Reddit class="share-button" {title} {url} />
    <LinkedIn class="share-button" {url} {title} />
    <Tumblr class="share-button" {title} {url} caption="{title}" />
    <WhatsApp class="share-button" text="{title} {url}" />
    <Facebook class="share-button" quote="{title}" {url} />
    <X class="share-button" text="{title}" {url} hashtags="Boston,urban, data, Data Viz, housing, permits, renovation, speculation, market" via="username" related="other,users" />
</div>


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

  //Owner linegraphs
  import TimeseriesLinegraphs from '$lib/Timeseries_Linegraphs.svelte';

    import Scroller from "@sveltejs/svelte-scroller";
    let index, offset, progress;

    //Census_Maps
    import Census_Maps from '$lib/Census_Maps.svelte';

    //DotAnimation
    import DotAnimation from '$lib/DotAnimation.svelte';

    //Bar chart 2
    import PermitSalesDiffLineGraph from '$lib/PermitSalesDiffLineGraph.svelte';

     //Conclusion_Map
   import Conclusion_Map from '$lib/Conclusion_Map.svelte';


     //CaseStudy
     import CaseStudy from '$lib/CaseStudy/CaseStudy.svelte';

     //share buttons
      import { Email, HackerNews, Reddit, LinkedIn, Pinterest, Telegram, Tumblr, Vk, WhatsApp, Xing, Facebook, X, Line } from 'svelte-share-buttons-component';

      const url = 'https://rachelblowes.github.io/FP2-Interactive-Map/';
      const title = 'Speculation vs. Renovation';
      const desc = 'Mapping speculative investment in Boston’s housing market using data on renovation, construction, and sales';

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

  #share{
    background-color: var(--pink);
    width: 120px;
    height: 25px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 7px;
    padding-top: 7px;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);
    color: white;
    transform: rotate(-30deg);
    float:left;
    margin-left: 20em;
    z-index: 5;
  }

  .GSV{
    width: 100%;
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
