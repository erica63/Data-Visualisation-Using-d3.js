/* Creating a responsive menu */
menuToggler.addEventListener('click', ev => {
  menuToggler.classList.toggle('open');
});

for (const element of document.querySelectorAll('nav a')) {
  element.addEventListener('click', ev => {
    menuToggler.classList.remove('open');
  });
}


/** D3.JS Charts & Code*/
let data = d3.json('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
let datax = [];

// breakdown function works through elements in the arrays
async function breakdown() {
  const array = await data;
  array.drinks.forEach((item, i) => {
    datax.push(item);
  });

  // return array;
}
  breakdown();

  console.log(datax);


// bubble chart
var datay = [
     {source:"Ingredient 1", x: 100, y: 60, val: 1350, color: "#C9D6DF"},
     {source:"Ingredient 2", x: 30, y: 80, val: 2500, color: "#F7EECF"},
     {source:"Ingredient 3", x: 50, y: 40, val: 5700, color: "#E3E1B2"},
     {source:"Ingredient 4", x: 190, y: 100, val: 30000, color: "#F9CAC8"},
     {source:"Ingredient 5", x: 80, y: 170, val: 47500, color: "#D1C2E0"}
   ]

   console.log(datay);

   // Step 3
   var svg = d3.select("svg")
             .attr("width", 500)
             .attr("height", 500);

   // Step 4
   svg.selectAll("circle")
     .data(datay).enter()
     .append("circle")
     .attr("cx", function(d) {return d.x})
     .attr("cy", function(d) {return d.y})
     .attr("r", function(d) {
       return Math.sqrt(d.val)/Math.PI
     })
     .attr("fill", function(d) {
       return d.color;
     });

   // Step 5
   svg.selectAll("text")
     .data(datay).enter()
     .append("text")
     .attr("x", function(d) {return d.x+(Math.sqrt(d.val)/Math.PI)})
     .attr("y", function(d) {return d.y+4})
     .text(function(d) {return d.source})
     .style("font-family", "arial")
     .style("font-size", "12px")
