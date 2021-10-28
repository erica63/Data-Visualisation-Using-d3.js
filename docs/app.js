//d3.select("p")
//.style("color", "brown");
const canvas = d3.select(".canva");

//add an svg element
const svg = canvas.append("svg");
svg.attr('width', "800");


$(document).ready(function () {
  Plot();
});

function Plot() {
  TransformChartData(chartData, opts);
}

function BuildPie(id, chartData, options) {
var xVarName;
var divisionRatio = 2.5;
var legendoffset = 0;

chart = d3.select("#" + id " .innerCont");

var yVarName = options[0].yaxis;
width = $(chart[0]).outerWidth(),
height = $(chart[0]).outerHeight(),
radius = Math.min(width, height) / divisionRatio;

xVarName = options[0].xaxis;

var rcolor = d3.scale.ordinal().range(runningColours);

arc d3.svg.arc()
.outerRadius(radius - 10)
.innerRadius(radius - 200);

chart = chart
.append("svg")
.attr("width", width)
.attr("height", height)
.append("g")
.attr("transform", "translate(" + (width / divisionRatio) + "," + (( height / divisionRatio) + 30) + ")")

var pie = d3.layout.pie()
.sort(null)
.value(function (d) {
  return d.Total;
});

var g = chartSelectAll(".arc")
.data(pie(runningData))
.enter().append("g")
.attr("class", "arc");

var path = g.append("path")
.attr("d", arc)
.attr("id", function (d) { return "arc-" + (count++); })
.style("opacity", function (d) {
  return d.data["op"];
});

path.append("svg:title")
.text(function (d) {
  return d.data["title"] + "(" + d.data[yVarName] + ")";
});

path.style("fill", function (d) {
  return rcolor(d.data[xVarName]);
})
}

function TransformChartData(chartData, opts) {
  var result = [];
  var resultColours = [];
  var counter = 0;
  var hasMatch;
  var xVarName;
  var yVarName = opts[0].yaxis;

  xVarName = opts[0].xaxis;

  for (var i in chartData) {
    hasMatch = false;
    for (var index = 0; index < result.length; ++index) {
      var data = result[index];

      if (data[xVarName] == chartData[i][xVarName]) {
        result[index][yVarName] = result[index][yVarName] + chartData[i][yVarName];
        hasMatch = true;
        break;
      }
    }
    if (hasMatch == false) {
      ditem = {};
      ditem[xVarName] = chartData[i][xVarName];
      ditem[yVarName] = chartData[i][yVarName];
      ditem["Captions"] = opts[0].captions != undefined ? opts[0].captions[0][chartData[i][xVarName]] : "";
      ditem["Title"] = opts[0].captions != undefined ? opts[0].captions[0][chartData[i][xVarName]] : "";
      result.push(ditem);

      resultColours[counter] = opts0.color[0] != undefined ? opts[0].color[0][chartData[i][xVarName]] : "";

      counter += 1;
    }
  }
  runningData = result;
  runningColours = resultColours;
  return;
}

//What colour do we choose to show the differences?
var chartData = [
  {
  "Show": "Movie",
  "Genre": "Documentaries",
  "Release Year": 2020
},
{
  "Show": "TV Show",
  "Genre": "Mystery",
  "Release Year": 2021
},
{
  "Show": "TV Show",
  "Genre": "Crime",
  "Release Year": 2021
},
{
  "Show": "TV Show",
  "Genre:": "Reality TV",
  "Release Year": 2021
}
];

chartOptions = [{
  "Captions": [{"Movie": "TV Show": "TV Show": "TV Show"}],
  "Colour": [{"Movie": "#cf3636", "TV Show": "#421313"}],
  "Xaxis": "Show",
  "Yaxis": "Genre"
}]
