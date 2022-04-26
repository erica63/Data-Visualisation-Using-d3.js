/* If over 100 API calls have been made under one of the API keys then the imDB
API will no longer return the JSON data. In case this happens, please swap out
either the API key or the URL within the d3.json line (line 34) for the next
available one.
"https://imdb-api.com/API/AdvancedSearch/k_2p3rswvr?groups=top_250&count=250"
"https://imdb-api.com/API/AdvancedSearch/k_32vrhx53?groups=top_250&count=250"
Only do this if you have maxed out the API calls and nothing is showing up for
over 30 seconds. */

// Creating variables
let movieYear = [];
let movieRating = [];
let movieRatingCount = [];

/**
 * Parses the specific string and returns either corresponding date, or null if
 * string can not be parsed due to format.
 */
const parseDate = d3.timeParse("%Y");

/**
 * Change the colour of circles/bubbles based on the seven-character hexadecimal
 * value chosen within the colour picker
 * @param {string} hexcode - The seven-character  hexadecimal value
 */
function changeColor(hexcode) {
  d3.selectAll(".bubbles")
    .transition()
    .duration(400)
    .style("fill", hexcode)
}

// Read the json data
d3.json("https://imdb-api.com/API/AdvancedSearch/k_2p3rswvr?groups=top_250&count=250").then(function(d) {
  const data = d.results;
  const movieGenreList = data

  /* A div with id "loader" has been creating within interact.html, and has
  been styled appropriately to be a loading animation. It's initial state is
  display: block, up until the chart shows up which changes it's state to be
  hidden thus indicating that the chart has loaded in. */
  const loadingAnimation = document.getElementById("loader");
  loadingAnimation.style.display = "none";

  /* Iterating through JSON items and storing the elements within a corresponding
   * array variable. An extra precaution has been taken in parsing the elements
   * into their appropriate data types, as the API returns all data as strings.
   * The movieYear variable must be further extracted using a substring.
   * This is because the structure of the JSON's 'description' is either "(2022)"
   * or "(I) (2019)", which would not allow parseDate to work as intended.
   */
  data.forEach((item, i) => {
    movieRating.push(parseFloat(item['imDbRating']))
    movieRatingCount.push(parseInt(item['imDbRatingVotes']))
    if (item['description'].length > 6) {
      movieYear.push(parseDate(item['description'].substring(5, 9)))
    } else {
      movieYear.push(parseDate(item['description'].substring(1, 5)))
    }
  });

  // Setting the width, height, and margins of the graph
  const height = 600;
  const width = 800;
  const margin = { left: 50, right: 50, top: 40, bottom: 0 };

  // Appending svg object to div with id of #viz-bubble
  let svg = d3.select("#viz-bubble")
    .append("svg")
      .attr("height", "100%")
      .attr("width", "100%");

  /*-----------------------------*\
             AXIS/SCALE
  \*-----------------------------*/
  // Y axis scale is based on what average rating the movies have garnered.
  const y = d3.scaleLinear()
    .domain([7.9, d3.max(movieRating)])
    .range([height, 0]);

  const yAxis = d3.axisLeft(y);
  // https://github.com/d3/d3-axis/blob/main README.md#axis_ticks

  // Y axis label
  svg.append("text")
    .attr("text-anchor", "start")
    .attr("x", 100)
    .attr("y", 20)
    .text("Rating")
    .style("font-size", "1.5em")
    .style("fill", "white");

  // X axis scale is based on what years the movies have been released
  const x = d3.scaleTime()
    .domain([d3.min(movieYear), d3.max(movieYear)])
    .range([0, width]);

  const xAxis = d3.axisBottom(x);

  // X axis label
  svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + 100)
    .text("Years released")
    .style("font-size", "1.5em")
    .style("fill", "white");

  // Bubble radius scale is based on the total number movie ratings
  const bubbleScale = d3.scaleLinear()
    .domain([d3.min(movieRatingCount), d3.max(movieRatingCount)])
    .range([5, 25]);

  // MIGHT REMOVE THIS
  const genreColour = d3.scaleOrdinal()
    .domain(["Comedy", "Horror", "Mystery", "Action", "Fantasy"])
    .range(d3.schemeSet1);

  /*-----------------------------*\
              TOOLTIP
  \*-----------------------------*/
  // The tooltip is hidden by default
  const tooltip = d3.select("#viz-bubble")
    .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("padding", "0 10px")
      .style("background", "white")
      .style("border-radius", "5px")
      .style("opacity", 0)
      .style("color", "black");

  /**
   * showTooltip displays the tooltip when the user hovers over a bubble within
   * the chart. It allows the user to view information about the bubble they are
   * interested in. It specifically displays the full title of the movie and the
   * movie poster.
   * @param  {bubbles#event:mouseover} ev - Mouseover event
   * @param  {array} d - The movie data
   * @return {html} data title and data image
   */
  const showTooltip = function(ev, d) {
    tooltip
      .style("opacity", 1)
      .html('<div class="tooltip"><p>' + d.title + '</p><img class="tooltip-poster" src=' + d.image + '></img></div>')
  }

  /**
   * moveTooltip follows the users cursor as long as they are still hovering over
   * bubble. If param is replaced with just "ev" or "ev, d", then moveTooltip does
   * not work as gracefully.
   */
  const moveTooltip = function(d) {
    tooltip
      .style("left", (d.pageX + 50) + "px")
      .style("top", (d.pageY - 50) + "px")
  }

  /**
   * hideTooltip returns the tooltip to its default hidden state.
   * @param  {bubbles#event:mouseleave} ev - Mouseleave event
   */
  const hideTooltip = function(ev) {
    tooltip
      .style("opacity", 0)
      .html("");
  }

  /*-----------------------------*\
      MOVIE DETAILS ON CLICK
  \*-----------------------------*/
  const selectBubble = function(ev, d) {
    console.log(d);
    d3.select(".movie-container")
      .html('<img class="movie-poster" src=' + d.image + '></img></div>'
        + '<h3>' + d.title + '</h3>'
        + '<h3>Year: ' + d.description + '</h3>'
        + '<h3>IMDB Rating: ' + d.imDbRating + '</h3>'
        + '<h3>Metacritic Rating: ' + d.metacriticRating + '</h3>'
        + '<h3>Plot</h3> <p>' + d.plot + '</p>'
        + '<h3>Cast</h3> <p>' + d.stars + '</p>')
      // .html('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + d.videoId + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
  }

  /*-----------------------------*\
              HIGHLIGHT
  \*-----------------------------*/
  /**
   * highlightGenre uses a switch statement to check for direct string matches.
   * The strings are based on movie genres. I have not included all of the
   * existing genres, just some popular ones. If the case matches the expression
   * then the corresponding bubbles will be at full opacity, and unrelated
   * bubbles opacities are lowered.
   * @param  {bubbles#event:mouseover} ev - Mouseover event
   * @param  {string} d - Genre selection from the cases
   */
  const highlightGenre = function(ev, d) {
    // Lower opacity on bubbles that are not in the genre
    d3.selectAll(".bubbles").style("opacity", 0.1)
    switch (d) {
      case 'Comedy':
      d3.selectAll("." + d).style("opacity", 1)
      d3.selectAll("." + d).style("fill", "red")
        break;
      case 'Horror':
      d3.selectAll("." + d).style("opacity", 1)
      d3.selectAll("." + d).style("fill", "blue")
        break;
      case 'Mystery':
      d3.selectAll("." + d).style("opacity", 1)
      d3.selectAll("." + d).style("fill", "green")
        break;
      case 'Action':
      d3.selectAll("." + d).style("opacity", 1)
      d3.selectAll("." + d).style("fill", "purple")
        break;
      case 'Fantasy':
      d3.selectAll("." + d).style("opacity", 1)
      d3.selectAll("." + d).style("fill", "orange")
        break;
      default:
    }
}

  /**
   * noHiglight is a method of un-doing the highlightGenre function. It returns
   * the bubbles and chart back to their original states.
   * @param  {bubbles#event:mouseleave} ev - Mouseleave event
   * @param  {string} d - Genre selection from the cases
   * @return {[type]} [description]
   */
  const noHighlight = function(ev, d) {
    d3.selectAll(".bubbles").style("opacity", 1)
      // .attr("fill", "#9cc8e3");
      .style("fill", d =>  genreColour(d))
  }

  /*-----------------------------*\
             BUBBLE CHART
  \*-----------------------------*/
  // Placing axis and chart within a group so the data is in correct position at all times
  let chartGroup = svg.append("g")
  .attr("transform", "translate("+margin.left+","+margin.top+")")

/**
 * Create circle for every data point, and then attach each genre from the
 * genreList array as a class name.
 */
  chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
      .attr("class", function(d) {
        let genres = "";
        let done = false;
        d.genreList.forEach((item, i) => {
          genres = genres + " " + item.value
          if (i == (d.genreList.length - 1)) { // So the index and array length match
              done = true;
          }
        });
        if (done == true) {
          return "bubbles" + genres
        }
      })
      .attr("cx", function(d, i) { return x(movieYear[i]); })
      .attr("cy", function(d, i) { return y(movieRating[i]); })
      .attr("r", 0) // Set to 0, size will change during animation
      .attr("stroke", "black")
      .style("fill", d => genreColour(d.genreList[0]))
      // .attr("fill", "#9cc8e3")
    .on("mouseover", showTooltip)
    .on("mousemove", moveTooltip)
    .on("mouseleave", hideTooltip)
    .on("click", selectBubble)


  chartGroup.append("g")
    .attr("class", "axis y")
    .call(yAxis);

  chartGroup.append("g")
    .attr("class", "axis x")
    .attr("transform", "translate(0,"+height+")")
    .call(xAxis);

  /*-----------------------------*\
              ZOOM/PAN
  \*-----------------------------*/
  /* This allows the user to zoom in and see the data points more closely.
  It is useful as some small circles are hidden behind larger ones, the zoom
  ensures that nothing is missed. In addiion, it allows the user to pan around
  the chart. Mobile users cannot make use of touching the screen to pan around,
  but zooming still works without a problem. */
  svg.call(d3.zoom()
    .extent([[0, 0], [width, height]])
      .scaleExtent([.9, 2.5])
      .on("zoom", zoomed));

  function zoomed({transform}) {
    chartGroup.attr("transform", transform);
  }

  /*-----------------------------*\
            ANIMATION
  \*-----------------------------*/
  /* The following code gives a basic animation to the bubbles when it loads.
  This is done by first giving the circle radius an attribute size of 0 so the
  bubbles don't initially appear, and thereafter given their appropriate size.
  A slight delay has been added to give the effect that they are loading in one
  at a time. */
  chartGroup.selectAll("circle")
    .transition()
    .duration(300)
    .attr("r", function (d, i) { return bubbleScale(movieRatingCount[i]); })
    .delay((d, i) => { return i*10});


  /*-----------------------------*\
                LEGEND
  \*-----------------------------*/
  // Adding the circles (Total rating count = bubble radius scale size)
  const legendValues = [20000, 1000000, 2600000]
  const legendCircle = 900
  const legendLabel = 950

  // Adding the legend circles
  chartGroup.selectAll("legend")
    .data(legendValues)
    .join("circle")
      .attr("cx", legendCircle)
      .attr("cy", d => height - 100 - bubbleScale(d))
      .attr("r", d => bubbleScale(d))
      .style("fill", "none")
      .attr("stroke", "white");

  // Adding the legend dotted line segments
  chartGroup.selectAll("legend")
    .data(legendValues)
    .join("line")
      .attr("x1", d => legendCircle + bubbleScale(d))
      .attr("x2", legendLabel)
      .attr("y1", d => height - 100 - bubbleScale(d))
      .attr("y2", d => height - 100 - bubbleScale(d))
      .attr("stroke", "white")
      .style("stroke-dasharray", ("2, 2"))

  // Adding the legend label
  chartGroup.selectAll("legend")
    .data(legendValues)
    .join("text")
      .attr("x", legendLabel)
      .attr("y", d => height - 100 - bubbleScale(d))
      .text(d => d)
      .style("font-size", 10)
      .attr("alignment-baseline", "middle")
      .style("fill", "white");

  // Giving the legend a title
  chartGroup.append("text")
    .attr("x", legendCircle)
    .attr("y", height - 100 +30)
    .text("Rating count")
    .attr("text-anchor", "middle")
    .attr("fill", "white");

  // Adding one dot in the legend for each name.
  const size = 20
  const genres = ["Comedy", "Horror", "Mystery", "Action", "Fantasy"]
  svg.selectAll("myrect")
    .data(genres)
    .join("circle")
      .attr("cx", 900)
      .attr("cy", (d, i) => 10 + i * (size + 5))
      .attr("r", 7)
      .style("fill", d =>  genreColour(d))
    .on("mouseover", highlightGenre)
    .on("mouseleave", noHighlight);

    // Adding labels next to the dots
  svg.selectAll("mylabels")
    .data(genres)
    .enter()
    .append("text")
      .attr("x", 900 + size*.8)
      .attr("y", (d, i) =>  i * (size + 5) + (size / 2))
      .style("fill", d => genreColour(d))
      .text(d => d)
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")
    .on("mouseover", highlightGenre)
    .on("mouseleave", noHighlight);
});

/* This adds an event listener to the colour picker found inside interact.html.
Once the user picks the colour they like and click outside of the colour picker,
that hexadecimal value associated with that colour is applied to all the circles.
 */
document.getElementById("colour-picker").addEventListener("change", ev => {
  changeColor(document.getElementById("colour-picker").value)
});
