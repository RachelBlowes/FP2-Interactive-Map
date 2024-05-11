<script>
    // Import necessary modules
    import { onMount } from 'svelte';
    import { writable, get } from 'svelte/store';
    import * as d3 from 'd3';

    export let mapData; // Accept mapData as a prop
    // console.log("Received mapData in bar graph component:", mapData);
    // console.log("Year is:", mapData.selectedStyle)

    // Initialize data to null
    let previousHoveredZip = null;
    let previousSelectedStyle = null;
    let data2010 = null;
    let data2022 = null;

    // Declare reactive variable to hold the data
    const data = writable([]);

    var margin = {top: 30, right: 0, bottom: 80, left: 90},
            width = 1200 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

    // Declare colorScale globally
    var colorScale;

    // Watch for changes in hoveredZip and log it
    $: {
        if (mapData && mapData.hoveredZip !== undefined && mapData.hoveredZip !== previousHoveredZip) {
            // console.log("Hovered Zip:", mapData.hoveredZip);
            previousHoveredZip = mapData.hoveredZip;
            // Call a function to update the chart when hoveredZip changes
            updateChartColors();
        }
    }

    // Watch for changes in selectedStyle and update the chart accordingly
$: {
    if (mapData.selectedStyle !== previousSelectedStyle){
        if (mapData && mapData.selectedStyle === 2010 && data2010 && mapData.selectedStyle) {
            // console.log("child component: 2010 selected")
            createChart(data2010, width, height);
            previousSelectedStyle = mapData.selectedStyle;
        } else if (mapData && mapData.selectedStyle === 2022 && data2022) {
            // console.log("child component: 2022 selected")
            createChart(data2022, width, height);
            previousSelectedStyle = mapData.selectedStyle;
        }
    }
}

    // Fetch data for both styles on component mount
    onMount(async () => {
        const fetchData = async (url) => {
            const response = await fetch(url);
            const text = await response.text();
            const rows = text.trim().split('\n').map(row => row.split(','));
            const headers = rows.shift();
            return rows.map(row => {
                const obj = {};
                headers.forEach((header, i) => {
                    obj[header.trim()] = row[i].trim();
                });
                return obj;
            });
        };

        // Fetch data for 2010
        data2010 = await fetchData('https://raw.githubusercontent.com/RachelBlowes/Geodata/main/permit_sales_analysis/zipcode_pricediff_2010.csv');
        // Fetch data for 2022
        data2022 = await fetchData('https://raw.githubusercontent.com/RachelBlowes/Geodata/main/permit_sales_analysis/zipcode_pricediff_2022.csv');
    });

    function createChart(data, width, height) {
    // Define color scale
    var colorScale = d3.scaleLinear()
        .domain([d3.min(data, function(d) { return +d['% renter']; }), d3.max(data, function(d) { return +d['% renter']; })])
        .range(["#f2f2f2", "#595959"]);
    // Select the existing SVG element or append a new one
    var svg = d3.select("#my_dataviz svg");
    if (svg.empty()) {
        svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    } else {
        svg.selectAll("*").remove(); // Remove existing content
    }

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
        .call(d3.axisLeft(y))
        .attr("class", "y-axis"); // Add class for the y-axis

    // Update Y axis label if needed
    svg.select(".y-axis-label").remove(); // Remove existing label
    svg.append("text")
        .attr("class", "y-axis-label")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 20)
        .attr("x", -margin.top)
        .text("Median Profit ($)");

    // Bars
    svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "mybar") // Add the class here
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
        .attr("y", -margin.left + 20)
        .attr("x", -margin.top)
        .text("Median Profit ($)");

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
        .attr("stop-color", "#f2f2f2");

    linearGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#595959");

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

function updateChartColors() {
    // Select all bars and update their color based on hoveredZip
    d3.selectAll("rect.mybar")
        .style("fill", function(d) {
            // Convert d['Zip Code'] to a number for comparison
            const zipCodeNumber = parseInt(d['Zip Code']);

            // Check if the bar's zip code matches the hovered zip code
            if (zipCodeNumber === mapData.hoveredZip) {
                console.log("match found!")
                return "#F6517A"; 
            } else {
                return "url(#gradient-" + d['Zip Code'] + ")"; // Use gradient fill for other bars
            }
        });
}

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