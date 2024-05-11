<script>
// Import necessary modules
import { onMount } from 'svelte';
import * as d3 from 'd3';

//Owner Linegraph
import Owner_linegraph from '$lib/Owner_linegraph.svelte';

//Owner Linegraph Sales
import OwnerLinegraphSales from '$lib/Owner_linegraph_sales.svelte';

// Define selectedYear variable in component's state
let selectedYear = 2010;

function handleYearChange(event) {
        selectedYear = parseInt(event.target.value);
    }


</script>

<style>
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
</style>

<!-- WHO? -->
<div class="divided">
    <div class="dividedtitle">
      <h5>Change in owner type over time, sales</h5>
    </div>
    <div id="divline"></div>
    <div class="dividedtitle">
      <h5>Change in owner type over time, permits</h5>
    </div>
  </div>
  
  <div class="divided">
    <div class="dividedchart">
    <OwnerLinegraphSales selectedYear={selectedYear} />
    </div>
    <div id="divline"></div>
    <div class="dividedchart">
      <Owner_linegraph selectedYear={selectedYear} />
    </div>
  </div>

  <!-- Time slider -->
  <div id="slider-container">
    <label id="timesliderlabel" for="timeSlider">Filter by Year:</label>
    <input type="range" bind:value="{selectedYear}" min="2010" max="2022" step="1" id="timeSlider" on:input={handleYearChange} />
    <time id="selectedTime" style="display: block;">{selectedYear}</time>
</div>