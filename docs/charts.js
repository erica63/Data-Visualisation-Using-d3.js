/* API KEYS
https://imdb-api.com/en/API/Top250Movies/k_32vrhx53
https://imdb-api.com/en/API/Top250Movies/k_2p3rswvr */
let movieYear = [];
let movieRating = [];
let movieRatingCount = [];
let movieRank = [];
const parseDate = d3.timeParse("%Y");

// Highlight/change colour
function changeColor(hexcode){
  d3.selectAll("circle")
    .transition()
    .duration(400)
    .style("fill", hexcode)
}

d3.json("https://imdb-api.com/en/API/Top250Movies/k_u9q94xwl").then(function(d) {
  const data = d.items;
  console.log(data);

  data.forEach((item, i) => {
    movieYear.push(parseDate(item['year']))
    movieRating.push(parseFloat(item['imDbRating']))
    // movieRating.push(item['imDbRating'])
    movieRatingCount.push(parseInt(item['imDbRatingCount']))
    movieRank.push(parseInt(item['rank']))
  });

  let height = 600;
  let width = 800;
  let margin = { left: 50, right: 50, top: 40, bottom: 0 };

  let svg = d3.select("#viz")
  .append("svg")
    .attr("height", "100%")
    .attr("width", "100%");

  let y = d3.scaleLinear()
  .domain([d3.min(movieRating), d3.max(movieRating)])
  .range([height, 0]);

  let yAxis = d3.axisLeft(y);
  // https://github.com/d3/d3-axis/blob/main README.md#axis_ticks

  let x = d3.scaleTime()
  .domain([d3.min(movieYear), d3.max(movieYear)])
  .range([0, width]);

  let xAxis = d3.axisBottom(x);

  // Bubble sizes
  let bubbleScale = d3.scaleLinear()
  .domain([d3.min(movieRatingCount), d3.max(movieRatingCount)])
  .range([3, 10]);

  // Tooltip
  let tooltip = d3.select("#viz")
  .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("padding", "0 10px")
    .style("background", "white")
    .style("border-radius", "5px")
    .style("opacity", 0)
    .style("color", "black")

  // Tooltip functions for mouse hovering, moving, or leaving data point
  const mouseover = function(ev, d) {
    tooltip
    .style("opacity", 1)
    .html('<div class="tooltip"><p>' + d.title + '</p><img class="tooltip-poster" src=' + d.image + '></img></div>')
 };

 const mousemove = function(d) {
  tooltip
      .style("left", (d.pageX + 50) + "px")
      .style("top", (d.pageY - 50) + "px")
}

const mouseleave = function(d) {
  tooltip
    .style("opacity", 0)
    .html("");
}

  // Placing axis and chart within a group so the data is in correct position at all times
  let chartGroup = svg.append("g").attr("transform", "translate("+margin.left+","+margin.top+")");

  chartGroup.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
    .attr("class", "bubbles")
    // The x and y values will need to be adjusted based on linear scale
    .attr("cx", function(d, i) { return x(movieYear[i]); })
    .attr("cy", function(d, i) { return y(movieRating[i]); })
    .attr("r", function (d, i) { return bubbleScale(movieRatingCount[i]); })
    .attr("stroke", "white")
    .attr("fill", "#9cc8e3")
  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseleave", mouseleave);



  chartGroup.append("g")
    .attr("class", "axis y")
    .call(yAxis);

  chartGroup.append("g")
    .attr("class", "axis x")
    .attr("transform", "translate(0,"+height+")")
    .call(xAxis);

});


// Colour picker
document.getElementById("colour-picker").addEventListener("change", ev => {
  changeColor(document.getElementById("colour-picker").value)
});
