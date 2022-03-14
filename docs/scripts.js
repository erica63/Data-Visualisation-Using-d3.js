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

// breakdown function works through elements in the arrays
async function breakdown() {
  const array = await data;
  array.drinks.forEach((item, i) => {

    console.log(item.strIngredient1);
  });

  // return array;
}
  breakdown();
