// let observer = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
// 		console.log(entry.target);
//     console.log(entry.isIntersecting)
// 	})
// });

// document.addEventListener("load", function (event) {
//   if(event.target && event.target.classList.contains("card")){
//     console.log(event.target);
//     console.log(event.isIntersecting)
//   }  
// });

const findMovie = () => {
  let search = document.getElementById("searched_movie").value
  fetch(`https://www.omdbapi.com/?apikey=43beada2&s=${search}&type=movie`)
  .then(response => response.json())
  .then(data => {displayResults(data.Search)});
}

const displayResults = (results) => {
  let n = 1;
  document.getElementById("movie_list").innerHTML = "";
  results.forEach(movie => {
    fetch(`https://www.omdbapi.com/?apikey=43beada2&t=${movie.Title}`)
    .then(response => response.json())
      .then(data => {
        document.getElementById("movie_list").innerHTML += movieCard(data,n);
        // observer.observe(document.getElementById(`${n}`))
        n++;
      });
  });
}

const movieCard = (movie, n) => {
  let card = `  <div id="${n}" class="card my-3">
                  <div class="row">
                    <div class="col-md-2">
                      <img class="card-img-top mx-auto p-2" src="${movie.Poster}" alt="Pas d'affiche disponible">
                    </div>
                    <div class="col-md-10">
                      <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <p class="card-text">${movie.Released}</p>
                        <button class="btn btn-primary" onclick="{detailedMovie('${movie.imdbID}')}">En voir plus</button>
                      </div>
                    </div>
                  </div>
                </div>`;
  return card
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

const detailedMovie = (movie) => {
  document.getElementById("overlay").classList.remove("hidden");
  fetch(`https://www.omdbapi.com/?apikey=43beada2&i=${movie}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById("popup").innerHTML = detailedCard(data);
    });
}
 
const hidePopup = () => {
  document.getElementById("overlay").classList.add("hidden");
  document.getElementById("popup").innerHTML = "";
}
