const data = [
  {name: "electropop", popularity: 95},
  {name: "dfw rap", popularity: 94},
  {name: "reggaeton", popularity: 93},
  {name: "canadian hip hop", popularity: 92}
];

const width = 800;
const height = 400;
const margin =  {top: 50, bottom: 50, left: 50, right: 50}

const svg = d3.select("#chart")
.append("svg",)
.attr("height", height - margin.top - margin.bottom)
.attr("width", width - margin.top - margin.bottom)
.attr("viewBox", [0, 0 , width, height]);

const x = d3.scaleBand()
.domain(d3.range(data.length))
.range([margin.left, width - margin.right])
.padding(0.1);

const y = d3.scaleLinear()
.domain([0, 100])
.range([height - margin.bottom, margin.top]);

svg
.append("g")
.attr("fill", "#1DB954")
.selectAll("rect")
.data(data.sort((a, b) => d3.descending(a.popularity, b.popularity)))
.join("rect")
.attr("x", (d, i) => x(i))
.attr("y", (d) => y(d.popularity))
.attr("height", d => y(0) - y(d.popularity))
.attr("width", x.bandwidth())
.attr("class", "rectangle")

function xAxis(g) {
  g.attr("transform", "translate(0, ${height - margin.bottom})")
  g.call(d3.axisBottom(x).tickFormat(i => data[i].name))
  .attr("font-size", "20px")
  .attr("color", "#1DB954")
}

function yAxis(g) {
  g.attr("transform", "translate(${margin.left}, 0)")
  .call(d3.axisLeft(y).ticks(null, data.format))
  .attr("font-size", "20px")
  .attr("color", "#1DB954")
}


svg.append("g").call(yAxis);
svg.append("g").call(xAxis);
svg.node();
