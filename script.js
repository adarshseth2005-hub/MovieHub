
API = "http://www.omdbapi.com/?apikey=21c40192&t=avenger"

const movieForm = document.querySelector("#movieForm")
const movieInput = document.querySelector("#movieInput");
const movieHub = document.querySelector("#movieHub");
const hamburger = document.querySelector("#hamburger");
const options = document.querySelector("#options")

movieForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let query = movieInput.value.trim();

    if (!query) {
        return;
    }

    searchMovies(query);
})

movieHub.addEventListener("click" , (e)=>{
    e.stopPropagation();

    const movieCard = e.target.closest(".movie-card")
    const imdbID = movieCard.dataset.imdbID;

    location.href = `movieDetails.html?id=${imdbID}`
    
})

async function searchMovies(movieName) {
    movieHub.innerHTML = `<p>Searching Moive ...</p>`

    let response = await fetch(`http://www.omdbapi.com/?apikey=21c40192&s=${encodeURIComponent(movieName)}`);

    let data = await response.json();

    console.log(data);
    if(data.Response === "True"){
        displayMovie(data.Search);
    }
    else{
        movieHub.innerHTML = `<p>${data.Error}</p>`
    }

}

function displayMovie(movies) {

    movieHub.innerHTML = "";
    movies.forEach(movie => {
        let div = document.createElement("div");

        div.dataset.imdbID = movie.imdbID;
        div.className = "flex flex-col p-3 border border-slate-600 rounded-xl transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_0_10px_rgba(59,130,246,0.7)] bg-slate-900/70";
        div.classList.add("movie-card")

        div.innerHTML = `
            <div class="relative aspect-[2/3] w-full bg-slate-800 overflow-hidden rounded-xl ">
                <img src=${movie.Poster} alt=${movie.Title} loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            </div>

            <div class="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-1.5 sm:gap-2">
                <p class="text-xs sm:text-sm font-semibold text-slate-100 line-clamp-2 leading-snug group-hover:text-red-400 transition">${movie.Title}</p>
                <p class="text-[11px] sm:text-xs font-medium text-slate-400">${movie.Year}</p>
            </div>
        `
        movieHub.append(div);
    });

}

hamburger.addEventListener("click", (e)=>{
    e.stopPropagation();

    options.classList.toggle("hidden");
})