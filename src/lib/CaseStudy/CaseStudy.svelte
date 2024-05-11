<script>
    import CaseStudies from './CaseStudy.json';

  // Define variables for selecting current study case
    let currentCaseStudyIndex = 0;
    let currentCaseStudy = CaseStudies[currentCaseStudyIndex];
    
  // Function to toggle between study cases
  function toggleCaseStudy(index) {
    currentCaseStudyIndex = index;
    currentCaseStudy = CaseStudies[index];
    }
    

//make numbers into $s
  function formatCurrency(number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(number);
  }

//CaseStudy variables that needed transormation
    $: sale1_price_format = formatCurrency(currentCaseStudy.sales[0].sale_price);
    $: sale2_price_format = formatCurrency(currentCaseStudy.sales[1].sale_price);
    $: sale3_price_format = formatCurrency(currentCaseStudy.sales[2]?.sale_price);
    $: sale4_price_format = formatCurrency(currentCaseStudy.sales[3]?.sale_price);
    $: permit1_price_format = formatCurrency(currentCaseStudy.permits[0].valuation + currentCaseStudy.permits[0].fees);
    $: permit2_price_format = formatCurrency(currentCaseStudy.permits[1].valuation);
    $: permit3_price_format = formatCurrency(currentCaseStudy.permits[2]?.valuation + currentCaseStudy.permits[2]?.fees);
    $: intial_investment = formatCurrency(currentCaseStudy.sales[0].sale_price + currentCaseStudy.permits[0].valuation + currentCaseStudy.permits[0].fees);

  </script>

<section class="section-long">
  <!-- Example - intro -->
  <p id="centered-text"><strong>Let's explore a speculated property.</strong></p>
  <p id="centered-text"><strong>How much profit do you think the investor made?</strong></p>
</section>

<!-- Toggle buttons for different study cases -->
<div>
<h5>Add your estimation here:</h5>
<div class="button">
    <button  class:active={currentCaseStudyIndex === 0} on:click={() => toggleCaseStudy(0)}>
        11 Joseph St 
    </button>
    <button class:active={currentCaseStudyIndex === 1} on:click={() => toggleCaseStudy(1)}>
        86 Marlborough St
    </button>
    <button class:active={currentCaseStudyIndex === 2} on:click={() => toggleCaseStudy(2)}>
        381 Park St
    </button>
</div>
</div>



{#if currentCaseStudy}


    <section>
      <!-- Example 01-->
      <div id="definitions" class="collage">
        <div id="physical">
          <h1 id="example_header" style="color: Black; text-align: left;">{currentCaseStudy.address}</h1>
          <p id="example_typology_header" style="text-align: left"><strong style="color: var(--pink)">What?</strong> {currentCaseStudy.usage}</p>
          <p id="example_typology_header" style="text-align: left"><strong style="color: var(--pink)">Who?</strong> {currentCaseStudy.investor}</p>
          <p id="example_typology_header" style="text-align: left"><strong style="color: var(--pink)">Where?</strong> {currentCaseStudy.neighborhood}</p>

          <p id="paragraph_sale1">An {currentCaseStudy.investor} bought {currentCaseStudy.address} in {currentCaseStudy.sales[0].sale_date} for <strong id="fiscaltitle">{sale1_price_format}.</strong></p>
          <br>
          <img src={currentCaseStudy.pics[0].GSV_before[0].src} alt="11 Joseph St 2014" class="GSV">
          <p><em>{currentCaseStudy.pics[0].GSV_before[0].captcha}</em></p>
        </div>
        <div id="fiscal">
          <img src={currentCaseStudy.pics[0]?.archPlan[0]?.src} alt="Architectural plan" class="arch_plan"  style="margin-top: 5em">
          <p >They then immediately started off with an investment of <strong id="physicaltitle">{permit1_price_format}</strong> (fees included) {currentCaseStudy.permits[0].description}.</p>
        </div>  
      </div>
    </section>
    <section>
      <!-- Example 02 - sale + 2nd renovation -->
      <div id="definitions" class="collage">
        <div id="physical" style="margin-top: -3em">
          <p id="paragraph_sale1" style="margin-top: 10em">{currentCaseStudy.sales[1].time_dif} from purchasing, they sold {currentCaseStudy.sales[1].description} in {currentCaseStudy.sales[1].sale_date} for <strong id="fiscaltitle">{sale2_price_format}.</strong></p>
          <br>
          <img src={currentCaseStudy.pics[0]?.GSV_after[0]?.src} alt="11 Joseph St 2019" class="GSV">
          <p><em>{currentCaseStudy.pics[0]?.GSV_after[0]?.captcha}</em></p>
        </div>
        {#if currentCaseStudy.permits && currentCaseStudy.permits.length > 1}
        <div id="fiscal" style="margin-top:40em">
          <p style="position: relative; top: -20em;">In the next step they invested <strong id="physicaltitle">{permit2_price_format}</strong> in {currentCaseStudy.permits[1]?.description}.</p>
        </div>  
        {/if}
      </div>
    </section>
    <section>
      <div id="definitions" class="collage">
        <div id="physical" style="background-color: rgba(0, 0, 0, 0)">
        </div>
        <div id="fiscal" style="background-color: rgba(0, 0, 0, 0)">
          <img  src={currentCaseStudy.pics[0]?.archPlan[1]?.src} alt="Second Floor plan" class="arch_plan"  style="margin-top: -50em">
        </div>
      </div>
    </section>
    <section>
      <!-- Example 03 - 2 last sales -->
      <div id="definitions" class="collage">
        <div id="physical" style="margin-top: -3em">
          {#if currentCaseStudy.sales && currentCaseStudy.sales.length > 2}
          <p id="paragraph_sale1" style="margin-top: 0em">The investor sold {currentCaseStudy.sales[2]?.description} on {currentCaseStudy.sales[2]?.sale_date} for <strong id="fiscaltitle">{sale3_price_format}</strong>, and {currentCaseStudy.sales[3]?.description} for <strong id="fiscaltitle">{sale4_price_format}</strong> on {currentCaseStudy.sales[2]?.sale_date}. 
            {currentCaseStudy.sales[3]?.conversion_from} <strong id="physicaltitle">{currentCaseStudy.sales[3]?.conversion_to}</p>
          {/if}
          <br>
          <img src={currentCaseStudy.pics[0].interior[0]?.src} class=interior width=400px>
          <p><em>{currentCaseStudy.pics[0].interior[0]?.captcha}</em></p>
          <img src={currentCaseStudy.pics[0].interior[1]?.src} class=interior style="position: relative; top: 2em; left: 0em" width=400px>
        </div>
        {#if currentCaseStudy.permits && currentCaseStudy.permits.length > 2}
        <div id="fiscal" style="margin-top:20em">
          <p style="position: relative; top: -14.5em; left:0em;">{currentCaseStudy.permits[2]?.time_dif} <strong id="physicaltitle">{permit3_price_format}</strong> {currentCaseStudy.permits[2]?.description} </p>
        </div>  
        {/if}
      </div>
    </section>
    <section>
      <div id="definitions" class="collage">
        <div id="physical" style="margin-top:-10em; background-color: rgba(0, 0, 0, 0)">
        </div>
        <div id="fiscal" style="background-color: rgba(0, 0, 0,0)">
          <img class=interior src={currentCaseStudy.pics[0]?.interior[2]?.src} style="position: relative; top: -40em; left:-3em; background-color: none" width=500px>
        </div>
      </div>
    </section>
    <section>
      <h3 style="position: relative;"> <strong style="color: var(--pink)">How much?</strong> In {currentCaseStudy.overview[0].timeframe}, and an initial investment of <b>{intial_investment}</b>, the investor made a profit of</h3> 
      <!-- <br> -->
      <h1 style="position: relative;"><strong id="fiscaltitle">{currentCaseStudy.overview[0].profit}</strong></h1>
    </section>
    <section>
      <br>
    </section>
{/if}


  <style>
    .interior{
      max-width: 400px;
    }
  .arch_plan{
    width: 180%;
    z-index: 3;
  }
  .GSV{
    width: 100%;
    max-width: 400px;
  }

  </style>