<script>
    // Import necessary modules
    import { onMount } from 'svelte';
    import { writable, get } from 'svelte/store';
    import * as d3 from 'd3';
  
  // Define your D3 code inside this function
  function createChart(data, width, height) {

    // Create SVG element
    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width+margin.left+margin.right)
        .attr("height", height + margin.top+margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    var x = d3.scaleBand()
          .range([0, width])
          .domain(data.map(function(d) { return d['Zip Code']; }))
          .padding(0.2);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");
        
    svg.append("path")
    .attr("class", "x-axis-line")
    .attr("d", `M0,${height} L${width},${height}`)
    .style("stroke", "black")
    .style("stroke-width", "2px")
    .style("fill", "none");
  
        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return +d['Median Profit']; })])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));
            svg.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
                .attr("x", function(d) { return x(d['Zip Code']); })
                .attr("y", height) // Set initial y position to the bottom of the chart
                .attr("width", x.bandwidth())
                .attr("height", 0) // Set initial height to 0
                .style("fill", "url(#gradient)") // Apply gradient fill
            .transition() // Apply transition to animate bars
            .duration(800)
            .attr("y", function(d) { return y(+d['Median Profit']); })
            .attr("height", function(d) { return height - y(+d['Median Profit']); })
            .delay(function(d, i) { return i * 100; }); // Delay animation for each bar
  
        // Bars
        svg.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
                .attr("x", function(d) { return x(d['Zip Code']); })
                .attr("y", height) // Set initial y position to the bottom of the chart
                .attr("width", x.bandwidth())
                .attr("height", 0) // Set initial height to 0
                .style("fill", function(d) { 
                    // Define the linear gradient for each bar
                    var linearGradient = svg.append("defs")
                        .append("linearGradient")
                        .attr("id", "gradient-" + d['Zip Code'])
                        .attr("x1", "0%")
                        .attr("y1", "0%")
                        .attr("x2", "0%")
                        .attr("y2", "100%");
                    // Add the gradient colors based on % renter
                    linearGradient.append("stop")
                        .attr("offset", "0%")
                        .attr("stop-color", colorScale(d['% renter']));
                    linearGradient.append("stop")
                        .attr("offset", "100%")
                        .attr("stop-color", colorScale(d['% renter']));
                    // Return the gradient fill
                    return "url(#gradient-" + d['Zip Code'] + ")";
                })
                .on('mouseenter', function(event, d) {
                    tooltip
                        .html(`<div>Neighborhood: ${d['Neighbourhood']}</div><div>Median profit: ${d['Median Profit']}$</div><div>% Renter: ${(d['% renter'] * 100).toFixed(0)}%</div>`)
                        .style('visibility', 'visible')
                        .style('top', (event.pageY - y(+d['Median Profit']) - margin.top) + 'px') // Adjust top position relative to the bar
                        .style('left', (event.pageX - margin.left) + 'px'); // Adjust left position relative to the bar
                    d3.select(this).style('fill', hoverColor);
                })
                .on('mousemove', function(event, d) {
                    // Update the position of the tooltip
                    tooltip
                        .style('top', (event.pageY - y(+d['Median Profit']) - margin.top) + 'px') // Adjust top position relative to the bar
                        .style('left', (event.pageX - margin.left) + 'px'); // Adjust left position relative to the bar
                })
                .on('mouseleave', function(event, d) {
                    tooltip.html(``).style('visibility', 'hidden');
                    d3.select(this).transition().attr('fill', null); // Remove fill style to revert to gradient
                    })
            .transition() // Apply transition to animate bars
            .duration(800)
            .attr("y", function(d) { return y(+d['Median Profit']); })
            .attr("height", function(d) { return height - y(+d['Median Profit']); })
            .delay(function(d, i) { return i * 10; }); // Delay animation for each bar
          
        // Add X axis label:
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height + margin.top + 0)
            .text("Zipcode");
           
        // Y axis label:
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left+20)
            .attr("x", -margin.top)
            .text("Median Profit ($)")
  
    // Add legend
    var legendWidth = width,
        legendHeight = 10;

    var legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(0," + (height + margin.bottom - 30) + ")");

    // Add legend gradient
    var defs = legend.append("defs");
    var linearGradient = defs.append("linearGradient")
        .attr("id", "legendGradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");

    // Add gradient stops
    linearGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#78B48C");

    linearGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#FC96B3");

    // Add legend rectangle
    legend.append("rect")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .style("fill", "url(#legendGradient)");

// Add legend text
legend.append("text")
    .attr("class", "legendText")
    .attr("x", 0)
    .attr("y", legendHeight + 20) // Adjust the y-coordinate to move the text below the legend
    .style("text-anchor", "start")
    .text("% Renter: " + d3.min(data, function(d) { return +d['% renter']; }));

legend.append("text")
    .attr("class", "legendText")
    .attr("x", legendWidth)
    .attr("y", legendHeight + 20) // Adjust the y-coordinate to move the text below the legend
    .style("text-anchor", "end")
    .text(d3.max(data, function(d) { return +d['% renter']; }));

}
// Declare reactive variable to hold the data
const data = writable([]);

var margin = {top: 30, right: 30, bottom: 80, left: 60},
        width = 1000 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

// Declare colorScale globally
var colorScale;
var tooltip;
var hoverColor = "#F6517A";

// Fetch data on component mount
onMount(async () => {
    // Fetch CSV data
    const response = await fetch('https://raw.githubusercontent.com/RachelBlowes/Geodata/main/permit_sales_analysis/zipcode_pricediff_2022.csv');
    const text = await response.text();

    // Parse CSV data
    const rows = text.trim().split('\n').map(row => row.split(','));
    const headers = rows.shift();
    const newData = rows.map(row => {
        const obj = {};
        headers.forEach((header, i) => {
            obj[header.trim()] = row[i].trim();
        });
        return obj;
    });

    // Sort data by % renter
    newData.sort((a, b) => +a['% renter'] - +b['% renter']);

    // Update data store
    data.set(newData);

    // Calculate color scale domain
    colorScale = d3.scaleLinear()
        .domain([d3.min(newData, function(d) { return +d['% renter']; }), d3.max(newData, function(d) { return +d['% renter']; })])
        .range(["#78B48C", "#FC96B3"]);

    // Define tooltip, hoverColor, and staticColor
    tooltip = d3.select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background-color", "white")
    .style("border", "1px solid black")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("font-family", "sans-serif")
    .style("font-size", "12px");
    
    // Call createChart function when data is loaded
    if (newData.length > 0) createChart(newData, width, height);
});

</script>

<div id="my_dataviz">
<!-- SVG will be appended here -->
</div>

<style>
#my_dataviz {
    display: flex;
    justify-content: center; /* Horizontally center */
}

</style>