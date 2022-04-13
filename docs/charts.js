/* API KEYS
https://imdb-api.com/en/API/Top250Movies/k_32vrhx53
https://imdb-api.com/en/API/Top250Movies/k_2p3rswvr */

let movieData = [];
let apiUrl = "https://imdb-api.com/en/API/Top250Movies/k_32vrhx53";
var parseDate = d3.timeParse("%Y");

async function getMovieData(url) {
  let response = await fetch(url);
  let movies = await response.json();
  return movies.items;
}

async function storeMovieData() {
  let movieYear = [];
  let movieRating = [];
  let movieRatingCount = [];
  let movieRank = [];
  let movieTitle = [];
  movieData = await getMovieData(apiUrl)
  // The JSON elements are all strings, thus the code below parses each one into their correct data type
  // This allows the d3 calculations to work without a problem.
  movieData.forEach((item, i) => {
    movieYear.push(parseDate(item['year']))
    movieRating.push(parseFloat(item['imDbRating']))
    // movieRating.push(item['imDbRating'])
    movieRatingCount.push(parseInt(item['imDbRatingCount']))
    movieRank.push(parseInt(item['rank']))
  });

  console.log(d3.min(movieYear));
  /* SUPERVISOR: The calculation below works correctly, however in the var y domain it does not.
  It is supposed to return the float value '8.0', but it instead returns the value '600' */
  console.log(d3.min(movieRating));
  console.log(movieRatingCount);
  console.log(movieData[1].rank);
  var height = 600;
  var width = 800;
  var margin = { left: 50, right: 50, top: 40, bottom: 0 };

  var svg = d3.select("body")
    .append("svg")
      .attr("height", "100%")
      .attr("width", "100%");

  var y = d3.scaleLinear()
    .domain([7.9, d3.max(movieRating)])
    .range([height, 0]);

  var yAxis = d3.axisLeft(y); // https://github.com/d3/d3-axis/blob/main/README.md#axis_ticks

  var x = d3.scaleTime()
    .domain([d3.min(movieYear), d3.max(movieYear)])
    .range([0, width]);

  var xAxis = d3.axisBottom(x);

  // Bubble size
  var bubbleScale = d3.scaleLinear()
    .domain([d3.min(movieRatingCount), d3.max(movieRatingCount)])
    .range([5, 20]);

  var tooltip = d3.select("body")
    .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("padding", "0 10px")
      .style("background", "white")
      .style("border-radius", "5px")
      .style("opacity", "0")


  // Placing axis and chart within a group so the data is in correct position at all times
  var chartGroup = svg.append("g").attr("transform", "translate("+margin.left+","+margin.top+")");

  chartGroup.selectAll("circle")
    .data(movieData)
    .enter()
    .append("circle")
      .attr("class", "bubbles")
      // The x and y values will need to be adjusted based on linear scale
      .attr("cx", function(d, i) { return x(movieYear[i]); })
      .attr("cy", function(d, i) { return y(movieRating[i]); })
      .attr("r", function (d, i) { return bubbleScale(movieRatingCount[i]); })
      .attr("stroke", "white")
      .attr("fill", "#9cc8e3")
    .on("mouseover", function(d) {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", "1")

      tooltip
        .html("rank ", function (d, i) {
          return (movieRank[i]);
        })
        .style("left", (d.pageX - 35) + "px")
        .style("top", (d.pageY - 30) + "px")
    });

  chartGroup.append("g")
        .attr("class", "axis y")
        .call(yAxis);

  chartGroup.append("g")
        .attr("class", "axis x")
        .attr("transform", "translate(0,"+height+")")
        .call(xAxis);
}

storeMovieData();

// d3.json("https://imdb-api.com/en/API/Top250Movies/k_32vrhx53", function(d) {
  // })
