/* This JS file is for the carousel inside the index.html page. I decided
to make the carousel dynamic rather than plugging in some static movie information. */
const carouselContainer = document.querySelector('.carousel-container');

// https://imdb-api.com/en/API/ComingSoon/k_2p3rswvr
async function sendApiRequest() {
  let response = await fetch(`https://imdb-api.com/en/API/ComingSoon/k_2p3rswvr`);
    let data = await response.json();
    let dataY = data.items.slice(0, 10);
    for (let i = 0; i < dataY.length; i++) {
      populateComingSoon(dataY[i])
    }
    console.log(data);
    console.log(dataY);
}
sendApiRequest();

async function populateComingSoon(data) {
  /* Do I create an if statement, and make sure that the first 'card' aka
  first movie img + text content is differentiated from the rest, so it can go back?
  Or is that not a big deal? I guess its not a big deal. */
  const carouselDiv = document.createElement("div");
  const movieImg = document.createElement("img");
  const movieContentDiv = document.createElement("div");
  const movieTitle = document.createElement("h3");
  const movieRating = document.createElement("p");

  carouselDiv.classList.add("card")
  movieContentDiv.classList.add("movie-content")

  movieImg.src = data.image;
  movieImg.alt = data.title + " image";
  movieTitle.textContent = data.title;

  if (data.metacriticRating == "") {
    movieRating.textContent = "No ratings yet";
  } else {
    movieRating.textContent = "Rating: " + data.metacriticRating;
  }

  carouselContainer.appendChild(carouselDiv);
  carouselDiv.appendChild(movieImg);
  carouselDiv.appendChild(movieContentDiv);
  movieContentDiv.appendChild(movieTitle);
  movieContentDiv.appendChild(movieRating);
}

const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

let carouselIndex = 1;
// showMovies(carouselIndex);
// showMovies();

function nextMovie(n) {
  showMovies(carouselIndex += n);
}

function showMovies(n) {
  let i;
  let movies = document.getElementsByClassName("card");
  if (n > movies.length) { carouselIndex = 1 }
  if (n < 1) { carouselIndex = movies.length }
  for (i = 0; i < movies.length; i++) {
    movies[i].style.display = "none";
  }
  movies[carouselIndex-1].style.display = "block";
}

/* Button event listeners */
prevBtn.addEventListener('click', ()=> {
  nextMovie(-1);
})

nextBtn.addEventListener('click', ()=> {
  nextMovie(1);
})
