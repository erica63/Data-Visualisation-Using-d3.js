/* Creating a responsive menu */
menuToggler.addEventListener('click', ev => {
  menuToggler.classList.toggle('open');
});

for (const element of document.querySelectorAll('nav a')) {
  element.addEventListener('click', ev => {
    menuToggler.classList.remove('open');
  });
}


/* Loop to show multiple images to remove redundancy*/
var container = document.getElementById("graphics");

for (var i =0, len = artists-images.length; i < len; ++i) {
  var img = new Image();
  img.src = artists-images[i];
  container.appendChild(img);
}
