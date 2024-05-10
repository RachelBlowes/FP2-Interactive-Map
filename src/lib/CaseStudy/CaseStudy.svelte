<script>
    export let top = 0.0;
    export let bottom = 0.7;
    export let index;
    export let offset;
    export let progress;

    import CaseStudies from './CaseStudy.json';
  // Define variables for selecting current study case
    let currentCaseStudyIndex = 0;
    let currentCaseStudy = CaseStudies[currentCaseStudyIndex];
    console.log(currentCaseStudy);
    
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
    const sale1_price_format = formatCurrency(currentCaseStudy.sales[0].sale_price);
  </script>

{#if currentCaseStudy}

  <section class="section-long">
      <!-- Example - intro -->
      <p id="centered-text"><strong>Let's explore a speculated property.</strong></p>
      <p id="centered-text"><strong>How much profit do you think the investor made?</strong></p>
    </section>

    <section>
      <!-- Example 01-->
      <div id="definitions" class="collage">
        <div id="physical">
          <h1 id="example_header" style="color: black; text-align: left;">{currentCaseStudy.address}</h1>
          <h5 id="example_typology_header" style="text-align: left">What? 2 Family Residential House</h5>
          <p id="paragraph_sale1">An investor bought {currentCaseStudy.address} in {currentCaseStudy.sales[0].sale_date} for <strong id="fiscaltitle">{sale1_price_format}.</strong></p>
          <br>
          <img src="https://github.com/RachelBlowes/FP2-Interactive-Map/blob/main/src/lib/CaseStudy/11_JosephSt/11Joseph_2014.png?raw=true" alt="11 Joseph St 2014" class="GSV">
          <p><em>Google Street View, 2014</em></p>
        </div>
        <div id="fiscal">
          <img src="https://github.com/RachelBlowes/FP2-Interactive-Map/blob/main/src/lib/CaseStudy/11_JosephSt/1st.png?raw=true" alt="Ground Floor plan" class="arch_plan"  style="margin-top: 5em">
          <p >They then immediately started off with an investment of <strong id="physicaltitle">$12,975</strong> (fees included) installing vinyl sidings on the entire exterior, repaired the front porch, and re-issued a gas permit.</p>
        </div>  
      </div>
    </section>
    <section>
      <!-- Example 02 - sale + 2nd renovation -->
      <div id="definitions" class="collage">
        <div id="physical" style="margin-top: -3em">
          <p id="paragraph_sale1" style="margin-top: 10em">A year from purchasing, he sold the renovated first floor in August 2015 as a standalone dwelling unit for <strong id="fiscaltitle">$425,000.</strong></p>
          <br>
          <img src="https://github.com/RachelBlowes/FP2-Interactive-Map/blob/main/src/lib/CaseStudy/11_JosephSt/11Joseph_2019.png?raw=true" alt="11 Joseph St 2019" class="GSV">
          <p><em>Google Street View, 2019</em></p>
        </div>
        <div id="fiscal" style="margin-top:40em">
          <p style="position: relative; top: -14.5em;">In the next step they invested <strong id="physicaltitle">$17,700</strong> in a Face-Lift for the second and third floors: retiling the 2 bathrooms on both floors, replacing kitchen cabinets, replacing interior doors, and painting.</p>
          <img src="https://github.com/RachelBlowes/FP2-Interactive-Map/blob/main/src/lib/CaseStudy/11_JosephSt/3rd.png?raw=true" alt="Second Floor plan" class="arch_plan"  style="margin-top: -29em">
        </div>  
      </div>
    </section>
    <section>
      <!-- Example 03 - 2 last sales -->
      <div id="definitions" class="collage">
        <div id="physical" style="margin-top: -3em">
          <p id="paragraph_sale1" style="margin-top: 10em">The investor sold the apartment on the second floor on March 2017 for <strong id="fiscaltitle">$727,000.</strong>, and the third floor as a studio flat for <strong id="fiscaltitle">$144,641</strong> on Dec 2018. 
            The last sale also converted the property from a two-family residential housing to <strong id="physicaltitle">a 3 family residential housing.</p>
          <br>
          <img src="https://github.com/RachelBlowes/FP2-Interactive-Map/blob/main/src/lib/CaseStudy/11_JosephSt/reno_img/2017details_kitchen2.jpeg?raw=true" width=400px>
          <p><em>REDFIN Real Estate</em></p>
          <img src="https://github.com/RachelBlowes/FP2-Interactive-Map/blob/main/src/lib/CaseStudy/11_JosephSt/reno_img/2017details.jpeg?raw=true" style="position: relative; top: 2em; left:0em" width=400px>
        </div>
        <div id="fiscal" style="margin-top:40em">
          <p style="position: relative; top: -14.5em; left:-2em;">Between the 2nd and the 3rd sales, they also invested <strong id="physicaltitle">$7,187</strong> in upgrading the electricity infrastructure and adding 1 public meter, as well as replacing 3 windows. </p>
          <img src="https://github.com/RachelBlowes/FP2-Interactive-Map/blob/main/src/lib/CaseStudy/11_JosephSt/reno_img/2017details_bathroom.jpeg?raw=true" style="position: relative; top: -13em; left:-8em" width=500px>
        </div>  
      </div>
    </section>
    <section>
      <h3 style="position: relative; top: 30em;"> In less than 4 years, and an initial investment of <b>$250,975</b>, the investor made a profit of</h3> 
      <!-- <br> -->
      <h1 style="position: relative; top: 30em;"><strong id="fiscaltitle">Over $1MM</strong></h1>
    </section>

    <section>
      <br>
    </section>
{/if}

<!-- Toggle buttons for different study cases -->
{#each CaseStudies as CaseStudy, index}
  <button on:click={() => toggleCaseStudy(index)}>Study Case {index + 1}</button>
{/each}

  <style>

  .arch_plan{
    width: 180%;
    z-index: 3;
  }
  .GSV{
    width: 100%;
  }


  </style>