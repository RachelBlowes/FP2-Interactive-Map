<script>
  // Import necessary modules
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  // Define your Svelte component
  export let dataUrl = "https://raw.githubusercontent.com/RachelBlowes/Geodata/main/owner_data/corporate_timeseries.csv";

  // Define margin and dimensions for the graph
  let margin = { top: 50, right: 100, bottom: 30, left: 60 };
  let width = 500 - margin.left - margin.right;
  let height = 400 - margin.top - margin.bottom;

  // Define variables for scales, SVG, focus, focusText, bisect, and data
  let x, y, svg, focus, focusText, bisect, data;

  // Define selectedYear variable in component's state
  let selectedYear = 2010;

  // Define legend data
  const legendData = [
    { label: 'Corporate', color: '#DC143C' },
    { label: 'Individual/Other', color: '#2F4F4F' },
    { label: 'Trust', color: '#E9967A' },
    { label: 'City of Boston', color: '#8FBC8F' }
  ];

  // Function to fetch data and render graph
  onMount(() => {
    d3.csv(dataUrl, formatData).then(render);
  });

  // Function to format data
  function formatData(d) {
    return { Year: d3.timeParse("%Y")(d.Year), Value: parseFloat(d.Value), Value1: parseFloat(d.Value1), Value2: parseFloat(d.Value2), Value3: parseFloat(d.Value3) }
  }

// Function to render graph
function render(csvData) {
  console.log("Data:", csvData);
  data = csvData;

  // Filter data based on the initial selected year
  let filteredData = data.filter(d => d.Year.getFullYear() <= selectedYear);

  // Define colors
  const corporate_color = "#DC143C";
  const individual_color = "#2F4F4F";
  const city_color = "#8FBC8F";
  const trust_color = "#E9967A";

  // Create scales
  x = d3.scaleTime()
    .domain(d3.extent(data, d => d.Year)) // Use full data range for x-axis
    .range([0, width]);

  y = d3.scaleLinear()
    .domain([0, d3.max(filteredData, d => Math.max(d.Value, d.Value1, d.Value2, d.Value3))])
    .range([height, 0]);

  // Create SVG element
  svg = d3.select("#slider_line_graph")
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

  // Add title text
  svg.append("text")
    .attr("class", "graph-title")
    .attr("x", width / 2)
    .attr("y", -20)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Who's Building?");

  // Add lines
  ["Value", "Value1", "Value2", "Value3"].forEach((value, index) => {
    svg.append("path")
      .attr("class", `line-${value}`)
      .datum(filteredData)
      .attr("fill", "none")
      .attr("stroke", [corporate_color, individual_color, trust_color, city_color][index])
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
    .attr("y", -40)
    .attr("dy", ".9em")
    .attr("transform", "rotate(-90)")
    .text("% of total declared valuation");

  // Initialize focus and focusText elements
  focus = svg.append('g')
    .append('circle')
    .style("fill", "white")
    .style('opacity', 0)
    .attr("stroke", "black")
    .attr('r', 5)
    .style("opacity", 50);

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
    // Find the closest value among the Value, Value1, Value2, and Value3 properties
    let keys = ["Value", "Value1", "Value2", "Value3"];
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
      .html(`Year: ${closestData.Year.getFullYear()} - Value: ${closestValue}%`)
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
    const legend = d3.select("#legend-container")  // Selecting the legend container div
      .append('svg')  // Appending an SVG element to it
      .attr("width", width)
      .attr("height", 100);  // Increase height to accommodate vertical stacking

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
    y.domain([0, d3.max(filteredData, d => Math.max(d.Value, d.Value1, d.Value2, d.Value3))]);

    // Update the lines on the graph
    ["Value", "Value1", "Value2", "Value3"].forEach((value, index) => {
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
    width: 400px;
  }
  .legend text {
    font-size: 12px;
    font-family: Arial, sans-serif;
  }
</style>

<div id="slider_line_graph"></div>

<!-- Time slider -->
<input type="range" bind:value="{selectedYear}" min="2010" max="2022" step="1" class="custom-slider" on:change={() => updateChart(selectedYear)} />

<!-- Legend container -->
<div id="legend-container"></div>
