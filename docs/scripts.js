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

d3.json("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007", function(data) {


});
