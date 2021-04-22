//Retrieving an API Key for access

const apiKey = prompt("Entre ta clé d'API :");

//Creation of the observer

let options = {
  rootMargin: '0px',
  threshold: [0, 0.25, 0.5, 0.75, 1]
}

const intersectionCallback = (entries) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio ===  0) {
      entry.target.style.opacity="0";
    } else if (entry.intersectionRatio > 0 && entry.intersectionRatio < 0.25) {
      entry.target.style.opacity="0.25";
    } else if (entry.intersectionRatio >= 0.25 && entry.intersectionRatio < 0.5) {
      entry.target.style.opacity="0.5";
    } else if (entry.intersectionRatio >= 0.5 && entry.intersectionRatio < 0.75) {
      entry.target.style.opacity="0.75";
    } else if (entry.intersectionRatio >= 0.75) {
      entry.target.style.opacity="1";
    }
  });
};

let observer = new IntersectionObserver(intersectionCallback, options);

//Search database for movie and display results

const findMovie = async () => {
  let search = document.getElementById("searched_movie").value;
  const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${search}&type=movie`);
  const data = await response.json();
  displayResults(data.Search);
  console.log(data.Search);

  let allMovies = document.getElementsByClassName('card');
  Array.from(allMovies).forEach(movie => {
    observer.observe(movie);
  });
}

const displayResults = (movies) => {
  document.getElementById("movie_list").innerHTML = '';
  return movies.map((movie, index) => {
    document.getElementById("movie_list").innerHTML += movieCard(movie, index);
  });
};

const movieCard = (movie, n) => {
  let card = `  <div id="${n}" class="card my-3">
                  <div class="row">
                    <div class="col-md-2">
                      <img class="card-img-top mx-auto p-2" src="${movie.Poster}" alt="Pas d'affiche disponible">
                    </div>
                    <div class="col-md-10">
                      <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <p class="card-text">${movie.Year}</p>
                        <button class="btn btn-primary" onclick="{detailedMovie('${movie.imdbID}')}">En voir plus</button>
                      </div>
                    </div>
                  </div>
                </div>`;
  return card
}

//Popup with movie details

const detailedMovie = async (movie) => {
  document.getElementById("overlay").classList.remove("hidden");
  const detailedresponse = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie}`);
  const detaileddata = await detailedresponse.json();
  document.getElementById("popup").innerHTML = detailedCard(detaileddata);
}


const detailedCard = (movie) => {
  let card = `<div class="row" style="height:100%">
                <div class="col-md-4">
                  <img class="mx-auto p-2" style="width:100%" src="${movie.Poster}" alt="Pas d'affiche disponible">
                </div>
                <div class="col-md-7">
                  <div class="card-body">
                    <h5 class="card-title">${movie.Title}</h5>
                    <p class="card-text">${movie.Released}</p>
                    <p class="card-text">${movie.Plot}</p>
                  </div>
                </div>
                <div class="col-md-1 p-2 text-right">
                  <button class='btn btn-danger' onclick='hidePopup()'>&times;</button>
                </div>
              </div>
            `;
  return card
}
 
const hidePopup = () => {
  document.getElementById("overlay").classList.add("hidden");
  document.getElementById("popup").innerHTML = "";
}
