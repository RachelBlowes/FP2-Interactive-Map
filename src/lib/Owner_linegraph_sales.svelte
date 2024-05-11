<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  export let dataUrl = "https://raw.githubusercontent.com/RachelBlowes/Geodata/main/owner_data/investor_data.csv";
  export let selectedYear;

  $: {
    if (selectedYear !== undefined) {
      updateChart(selectedYear);
    }
  }

  let margin = { top: 50, right: 100, bottom: 30, left: 60 };
  let width = 500 - margin.left - margin.right;
  let height = 400 - margin.top - margin.bottom;
  let x, y, svg, focus, focusText, bisect, data;

  const legendData = [
    { label: 'Small', color: '#DC143C' },
    { label: 'Non-Investor', color: '#2F4F4F' },
    { label: 'Institutional', color: '#E9967A' },
    { label: 'Large', color: '#8FBC8F' },
    { label: 'Medium', color: '#4682B4' }
  ];

  onMount(() => {
    d3.csv(dataUrl, formatData).then(render);
  });

  function formatData(d) {
    return {
      Year: d3.timeParse("%Y")(d.Year),
      Small: parseInt(d.small),
      NonInvestor: parseInt(d["non-investor"]),
      Institutional: parseInt(d.institutional),
      Large: parseInt(d.large),
      Medium: parseInt(d.medium)
    }
  }

  function render(csvData) {
    data = csvData;

    let filteredData = data.filter(d => d.Year.getFullYear() <= selectedYear);

    const colors = ['#DC143C', '#2F4F4F', '#E9967A', '#8FBC8F', '#4682B4'];

    x = d3.scaleTime()
      .domain(d3.extent(data, d => d.Year))
      .range([0, width]);

    y = d3.scaleLinear()
      .domain([0, d3.max(filteredData, d => Math.max(d.Small, d.NonInvestor, d.Institutional, d.Large, d.Medium))])
      .range([height, 0]);

    svg = d3.select("#slider_line_graph_sales")
      .selectAll("svg")
      .data([null])
      .enter()
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    svg.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(y));

    ["Small", "NonInvestor", "Institutional", "Large", "Medium"].forEach((value, index) => {
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

    svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + 30)
      .text("Year");

    svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", -60)
      .attr("dy", ".9em")
      .attr("transform", "rotate(-90)")
      .text("Number of investors");

    focus = svg.append('g')
      .append('circle')
      .style("fill", "white")
      .style('opacity', 0)
      .attr("stroke", "black")
      .attr('r', 5)

    focusText = svg.append('g')
      .append('text')
      .attr("class", "graph-text")
      .style("opacity", 0)
      .attr("text-anchor", "left")
      .attr("alignment-baseline", "middle");

    svg.append('rect')
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseout', mouseout);

    bisect = d3.bisector(d => d.Year).left;

    createLegend(svg);
  }

  function mouseover() {
    focus.style("opacity", 1);
    focusText.style("opacity", 1);
  }

  function mousemove(event) {
    let filteredData = data.filter(d => d.Year.getFullYear() <= selectedYear);

    if (filteredData.length === 0) {
      return;
    }

    var x0 = x.invert(d3.pointer(event)[0]);
    var i = bisect(filteredData, x0, 1);
    var d0 = filteredData[i - 1];
    var d1 = filteredData[i];
    var closestData = d1 && (x0 - d0.Year > d1.Year - x0) ? d1 : d0;

    if (closestData) {
      let keys = ["Small", "NonInvestor", "Institutional", "Large", "Medium"];
      let closestValue = keys.reduce((closest, key) => {
        let currentValue = closestData[key];
        let currentDistance = Math.abs(currentValue - y.invert(d3.pointer(event)[1]));
        let closestDistance = Math.abs(closest - y.invert(d3.pointer(event)[1]));
        return currentDistance < closestDistance ? currentValue : closest;
      }, closestData[keys[0]]);

      let textWidth = focusText.node().getComputedTextLength();
      let textX = x(closestData.Year) + 15;
      let overflowRight = textX + textWidth > width + margin.left;

      focus
        .attr("cx", x(closestData.Year))
        .attr("cy", y(closestValue));

      focusText
        .html(`Year: ${closestData.Year.getFullYear()} - Count: ${closestValue.toLocaleString()}`)
        .attr("x", overflowRight ? x(closestData.Year) - textWidth - 15 : textX)
        .attr("y", y(closestValue));
    }
  }

  function mouseout() {
    focus.style("opacity", 0);
    focusText.style("opacity", 0);
  }

  function updateChart(value) {
    if (!x || !y || !svg) return;

    let filteredData = data.filter(d => d.Year.getFullYear() <= value);

    x.domain([d3.min(filteredData, d => d.Year), x.domain()[1]]);
    y.domain([0, d3.max(filteredData, d => Math.max(d.Small, d.NonInvestor, d.Institutional, d.Large, d.Medium))]);

    svg.select(".y-axis")
      .transition()
      .duration(1000)
      .call(d3.axisLeft(y));

    ["Small", "NonInvestor", "Institutional", "Large", "Medium"].forEach((value, index) => {
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
  .graph-container-sales {
    position: relative;
    display: inline-block;
    margin: 0 auto;
  }
</style>

<div class="graph-container-sales">
  <div id="slider_line_graph_sales"></div>
</div>
