/* Loop to show multiple images to remove redundancy*/

var container = document.getElementById("graphics");

for (var i =0, len = artists-images.length; i < len; ++i) {
  var img = new Image();
  img.src = artists-images[i];
  container.appendChild(img);
}
