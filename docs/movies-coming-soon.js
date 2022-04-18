/* This JS file is for the carousel inside the index.html page. I decided
to make the carousel dynamic rather than plugging in some static movie information. */
const carouselContainer = document.querySelector('.carousel-container');

// https://imdb-api.com/en/API/ComingSoon/k_2p3rswvr
// https://imdb-api.com/en/API/ComingSoon/k_32vrhx53
async function sendApiRequest() {
  let response = await fetch(`https://imdb-api.com/en/API/ComingSoon/k_32vrhx53`);
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
  // Mobile-view details
  const carouselDiv = document.createElement("div");
  const movieImg = document.createElement("img");
  const movieContentDiv = document.createElement("div");
  const movieTitle = document.createElement("h3");
  const movieRating = document.createElement("p");
  const movieReleaseDate = document.createElement("p");

  // Tablet-view details
  const movieTabletContentDiv = document.createElement("div");
  const movieGenre = document.createElement("p");
  const movieRuntime = document.createElement("p");
  const movieContentRating = document.createElement("p");

  // Desktop-view details
  const movieDesktopContentDiv = document.createElement("div");
  const movieDirectors = document.createElement("p");
  const moviePlot = document.createElement("p");
  const movieCast = document.createElement("p");

  // Creating all classes
  carouselDiv.classList.add("card")
  movieContentDiv.classList.add("mobile-details")
  movieTabletContentDiv.classList.add("tablet-details")
  movieDesktopContentDiv.classList.add("desktop-details")

  // Linking API data to elements - MOBILE PHONE VIEW
  movieImg.src = data.image;
  movieImg.alt = data.title + " image";
  movieTitle.textContent = data.title;
  movieReleaseDate.textContent = "Release date: " + data.releaseState;

  // If API element metacriticRating is empty/not empty
  if (data.metacriticRating == "") {
    movieRating.textContent = "No ratings yet";
  } else {
    movieRating.textContent = "Rating: " + data.metacriticRating;
  }

  // If API element contentRating is empty/not empty
  if (data.contentRating == "") {
    movieContentRating.textContent = "No content rating yet";
  } else {
    movieContentRating.textContent = "Content rating: " + data.contentRating;
  }

  // Linking API data to elements - TABLET VIEW
  movieGenre.textContent = "Genre(s): " + data.genres;
  movieRuntime.textContent = "Runtime: " + data.runtimeStr;
  // movieContentRating.textContent = "Content rating: " + data.contentRating;

  // Linking API data to elements - DESKTOP VIEW
  movieDirectors.textContent = "Director(s): " + data.directors;
  moviePlot.textContent = "Plot: " + data.plot;
  movieCast.textContent = "Cast: " + data.stars;

  // Append mobile-view details
  carouselContainer.appendChild(carouselDiv);
  carouselDiv.appendChild(movieImg);
  carouselDiv.appendChild(movieContentDiv);
  movieContentDiv.appendChild(movieTitle);
  movieContentDiv.appendChild(movieRating);
  movieContentDiv.appendChild(movieReleaseDate);
  showMovies(carouselIndex);

  // Append tablet-view details
  carouselDiv.appendChild(movieTabletContentDiv);
  movieTabletContentDiv.appendChild(movieGenre);
  movieTabletContentDiv.appendChild(movieRuntime);
  movieTabletContentDiv.appendChild(movieContentRating);

  // Append desktop-view details
  carouselDiv.appendChild(movieDesktopContentDiv);
  movieDesktopContentDiv.appendChild(movieDirectors);
  movieDesktopContentDiv.appendChild(moviePlot);
  movieDesktopContentDiv.appendChild(movieCast);
}

const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

let carouselIndex = 1;

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
  movies[carouselIndex-1].style.display = "flex";
  movies[carouselIndex-1].classList.add('fadeInRight');
}

/* Button event listeners */
prevBtn.addEventListener('click', ()=> {
    nextMovie(-1);
})

nextBtn.addEventListener('click', ()=> {
  nextMovie(1);
})
