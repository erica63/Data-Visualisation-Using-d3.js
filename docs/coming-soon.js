/* This JS file is for the carousel inside the index.html page. I decided
to make the carousel dynamic rather than plugging in some static movie information. */
const carouselSlide = document.querySelector('.carousel-slide');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

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
  const carouselDiv = document.createElement("div");
  const movieImg = document.createElement("img");
  const movieContentDiv = document.createElement("div");
  const movieTitle = document.createElement("h3");
  const movieRating = document.createElement("p");

  carouselDiv.classList.add("card")
  movieContentDiv.classList.add("text-content")

  movieImg.src = data.image;
  movieImg.alt = data.title + " image";
  movieTitle.textContent = data.title;
  movieRating.textContent = data.metacriticRating;

  carouselSlide.appendChild(carouselDiv);
  carouselDiv.appendChild(movieImg);
  carouselDiv.appendChild(movieContentDiv);
  movieContentDiv.appendChild(movieTitle);
  movieContentDiv.appendChild(movieRating);
}

const carouselImgs = document.querySelector('.movieImg');
const carouselTotalImages = movieImg.length;
let counter = 0;

/* Button event listeners */
nextBtn.addEventListener('click', ()=> {
  nextMovie('prevBtn')
})

prevBtn.addEventListener('click', ()=> {
  nextMovie('nextBtn');
})

function nextMovie(direction) {
  if (direction == 'nextBtn') {
    counter++;
    if (counter == carouselTotalImages) {
      counter == 0;
    }
  } else {
    if (counter == 0) {
      counter = carouselTotalImages - 1;
    } else {
      counter--;
    }
  }

  for (let i = 0; i < carouselImgs.length; i++) {
    carouselImgs[i].classList.remove('carouselSlide');
  }
  carouselImgs[counter].classList.add('carouselSlide');
}


// const carouselCards = document.querySelectorAll('.card');
// // img counter, starting at first img
// let counter = 1;
// const size = carouselCards[0];
// // moves one card forward
// carouselSlide.style.transform = 'translateX(' + (-size * counter ) + 'px)';
//
