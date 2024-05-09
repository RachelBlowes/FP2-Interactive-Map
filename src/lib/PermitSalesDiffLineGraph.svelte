<script>
    // Import necessary modules
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    // Define your Svelte component
    export let dataUrl = "https://raw.githubusercontent.com/RachelBlowes/Geodata/main/timeseries_pricediff.csv";
  
    // Define margin and dimensions for the graph
    let margin = { top: 50, right: 100, bottom: 30, left: 60 };
    let width = 1000 - margin.left - margin.right;
    let height = 500 - margin.top - margin.bottom;
  
    // Define variables for scales, SVG, focus, focusText, bisect, and data
    let x, y, svg, focus, focusText, bisect, data;
  
    // Define selectedYear variable in component's state
    let selectedYear = 2022;
  
    // Define legend data
    const legendData = [
      { label: 'Permit', color: '#0087EC' },
      { label: 'No Permit', color: '#CABB8B' }
    ];
  
    // Function to fetch data and render graph
    onMount(() => {
      d3.csv(dataUrl, formatData).then(render);
    });
  
    // Function to format data
    function formatData(d) {
      return {
        Year: d3.timeParse("%Y")(d.Year),
        Permit: parseInt(d['Permit adjusted for inflation']),
        NoPermit: parseInt(d["No permit adjusted for inflation"])
      }
    }
  
    // Function to render graph
    function render(csvData) {
      data = csvData;
  
      // Filter data based on the initial selected year
      let filteredData = data.filter(d => d.Year.getFullYear() <= selectedYear);
  
      // Define colors
      const colors = ['#0087EC', '#CABB8B'];
  
      // Create scales
      x = d3.scaleTime()
        .domain(d3.extent(data, d => d.Year)) // Use full data range for x-axis
        .range([0, width]);
  
      y = d3.scaleLinear()
        .domain([0, d3.max(filteredData, d => Math.max(d.Permit, d.NoPermit))])
        .range([height, 0]);
  
      // Create SVG element
      svg = d3.select("#slider_line_graph_permit")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
      // Add X axis
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
  
      // Add Y axis
      svg.append("g")
        .call(d3.axisLeft(y));
  
      // Add lines
      ["Permit", "NoPermit"].forEach((value, index) => {
        svg.append("path")
          .attr("class", `line-${value}`)
          .datum(filteredData)
          .attr("fill", "none")
          .attr("stroke", colors[index])
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(d => x(d.Year))
            .y(d => y(d[value]))
          );
      });
  
      // Add x axis label
      svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + 30)
        .text("Year");
  
      // Add y axis label
      svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -60)
        .attr("dy", ".9em")
        .attr("transform", "rotate(-90)")
        .text("Median Price Difference ($)");
  
      // Initialize focus and focusText elements
      focus = svg.append('g')
        .append('circle')
        .style("fill", "#F6517A")
        .style('opacity', 0)
        // .attr("stroke", "black")
        .attr('r', 5)
  
      focusText = svg.append('g')
        .append('text')
        .attr("class", "graph-text")
        .style("opacity", 0)
        .attr("text-anchor", "left")
        .attr("alignment-baseline", "middle");
  
      // Create a rect on top of the svg area
      svg.append('rect')
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseout', mouseout);
  
      // Initialize bisector
      bisect = d3.bisector(d => d.Year).left;
  
      // Create legend
      createLegend(svg);
    }
  
    // Event listeners for mouse actions
    function mouseover() {
      focus.style("opacity", 1);
      focusText.style("opacity", 1);
    }
  
    function mousemove(event) {
      // Filter data based on the selected year
      let filteredData = data.filter(d => d.Year.getFullYear() <= selectedYear);
  
      // Check if filteredData is empty
      if (filteredData.length === 0) {
        return; // Exit the function if no lines are visible
      }
  
      // Recover coordinate we need
      var x0 = x.invert(d3.pointer(event)[0]);
      var i = bisect(filteredData, x0, 1);
      var d0 = filteredData[i - 1];
      var d1 = filteredData[i];
      var closestData = d1 && (x0 - d0.Year > d1.Year - x0) ? d1 : d0;
  
      if (closestData) {
        // Find the closest value among the Permit and NoPermit properties
        let keys = ["Permit", "NoPermit"];
        let closestValue = keys.reduce((closest, key) => {
          let currentValue = closestData[key];
          let currentDistance = Math.abs(currentValue - y.invert(d3.pointer(event)[1]));
          let closestDistance = Math.abs(closest - y.invert(d3.pointer(event)[1]));
          return currentDistance < closestDistance ? currentValue : closest;
        }, closestData[keys[0]]);
  
        focus
          .attr("cx", x(closestData.Year))
          .attr("cy", y(closestValue));
  
        focusText
          .html(`Year: ${closestData.Year.getFullYear()} - Median Price Difference: ${closestValue} $`)
          .attr("x", x(closestData.Year) + 15)
          .attr("y", y(closestValue));
      }
    }
  
    function mouseout() {
      focus.style("opacity", 0);
      focusText.style("opacity", 0);
    }
  
    // Function to create legend
    function createLegend(svg) {
      const legend = d3.select("#legend-container-permit")  // Selecting the legend container div
        .append('svg')  // Appending an SVG element to it
        .attr("width", width)
        .attr("height", 50);  // Adjust height as needed
  
      const legendItems = legend.selectAll('.legend-item')
        .data(legendData)
        .enter()
        .append('g')
        .attr('class', 'legend-item')
        .attr('transform', (d, i) => `translate(0, ${i * 20})`);
  
      legendItems.append('rect')
        .attr('width', 12)
        .attr('height', 12)
        .attr('fill', d => d.color);
  
      legendItems.append('text')
        .attr('x', 20)
        .attr('y', 10)
        .text(d => d.label)
        .attr('alignment-baseline', 'middle')
        .style('font-size', '12px');
    }
  
    // Function to update chart based on time range
    export function updateChart(value) {
      if (!x || !y || !svg) return;
  
      // Filter the data based on the selected year
      let filteredData = data.filter(d => d.Year.getFullYear() <= value);
  
      // Update the domain of the x-axis and y-axis
      x.domain([d3.min(filteredData, d => d.Year), x.domain()[1]]);
      y.domain([0, d3.max(filteredData, d => Math.max(d.Permit, d.NoPermit))]);
  
      // Update the lines on the graph
      ["Permit", "NoPermit"].forEach((value, index) => {
        svg.select(`.line-${value}`)
          .datum(filteredData)
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(d => x(d.Year))
            .y(d => y(d[value]))
          );
      });
    }
</script>

<style>
    .custom-slider {
      width: 940px;
    }
    .legend text {
      font-size: 12px;
      font-family: Arial, sans-serif;
    }
  
    .graph-container-permit {
      position: relative;
      display: inline-block;
      margin: 0 auto;
    }
  
    .slider-container-permit {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%; /* Ensure slider takes full width */
    }
  
    #legend-container-permit {
      position: absolute;
      bottom: -80px; /* Adjust as needed to position the legend below the slider */
      left: 0;
      width: 100%;
      text-align: left; /* Center the legend */
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


</style>

<div class="graph-container-permit">
    <div id="slider_line_graph_permit"></div>
  
    <!-- Container for the slider and legend -->
    <div class="controls-container">
        <!-- Time slider -->
        <div id="slider-container-permit">
            <label id="timesliderlabel" for="timeSlider">Filter by Year:</label>
            <input type="range" bind:value="{selectedYear}" min="2010" max="2022" step="1" id="timeSlider" on:change={() => updateChart(selectedYear)} />
            <time id="selectedTime" style="display: block;">{selectedYear}</time>
        </div>
        <!-- Legend container -->
        <div id="legend-container-permit"></div>
    </div>
</div>
