
const movieDetail = document.querySelector("#movie-detail")


const params = new URLSearchParams(location.search)

const imdbID = params.get("id");

if (imdbID) {
    searchMovie(imdbID.trim());
}


async function searchMovie(imdbID) {


    let response = await fetch(`https://www.omdbapi.com/?apikey=21c40192&i=${imdbID}&plot=full`);

    let data = await response.json();

    if (data.Response === "True") {
        displayMovie(data);
    }
    else {
        console.log(data.Error);
    }

}

function displayMovie(data) {
    movieDetail.innerHTML = `
        <div class="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-sm flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-start text-slate-100">
            <div class="w-full max-w-[280px] sm:max-w-[320px] shrink-0">
                <div class="aspect-[2/3] w-full overflow-hidden rounded-2xl shadow-xl shadow-red-950/20 border border-slate-800 bg-slate-800">
                    <img src="${data.Poster}" alt="${data.Title}" class="w-full h-full object-cover">
                </div>
            </div>

            <div class="flex-1 flex flex-col gap-6 w-full">
                <div>
                    <h2 class="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                        ${data.Title}
                    </h2>
                </div>

                <section class="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-300">
                    <span class="px-2.5 py-1 bg-slate-800/80 border border-slate-700/60 rounded-md text-slate-400 font-medium">${data.Released}</span>
                    <span class="px-2 py-0.5 bg-slate-800/80 border border-slate-700/60 rounded-md text-slate-300 font-semibold uppercase">${data.Rated}</span>
                    <span class="px-2.5 py-1 bg-slate-800/80 border border-slate-700/60 rounded-md text-slate-400 font-medium">${data.Runtime}</span>
                    <span class="px-3 py-1 bg-red-950/40 border border-red-800/50 text-red-400 font-medium rounded-full">${data.Genre}</span>
                    
                    <span class="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 font-semibold rounded-md">
                        <svg class="w-4 h-4 fill-amber-400 shrink-0" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        IMDb: ${data.imdbRating} / 10
                    </span>
                </section>
            
                <div class="space-y-1.5">
                    <p class="text-xs uppercase font-bold tracking-wider text-slate-400">Plot Overview</p>
                    <p class="text-slate-300 text-sm sm:text-base leading-relaxed">${data.Plot}</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
                    <section class="space-y-1">
                        <p class="text-xs uppercase tracking-wider text-slate-500 font-semibold">Director</p>
                        <p class="text-slate-200 text-sm font-medium">${data.Director}</p>
                    </section>

                    <section class="space-y-1">
                        <p class="text-xs uppercase tracking-wider text-slate-500 font-semibold">Writer</p>
                        <p class="text-slate-200 text-sm font-medium">${data.Writer}</p>
                    </section>

                    <div class="sm:col-span-2 space-y-1">
                        <p class="text-xs uppercase tracking-wider text-slate-500 font-semibold">Actors</p>
                        <p class="text-slate-200 text-sm font-medium">${data.Actors}</p>
                    </div>

                    <section class="space-y-1">
                        <p class="text-xs uppercase tracking-wider text-slate-500 font-semibold">Language</p>
                        <p class="text-slate-200 text-sm font-medium">${data.Language}</p>
                    </section>

                    <section class="space-y-1">
                        <p class="text-xs uppercase tracking-wider text-slate-500 font-semibold">Country</p>
                        <p class="text-slate-200 text-sm font-medium">${data.Country}</p>
                    </section>
                </div>

                <div class="pt-2">
                    <a 
                        href="https://www.imdb.com/title/${data.imdbID}" 
                        target="_blank" 
                        class="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 active:scale-95 text-black font-bold text-sm sm:text-base px-6 py-3 rounded-xl transition duration-150 shadow-lg shadow-amber-500/20 cursor-pointer"
                    >
                        <span>View on IMDb</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>

            </div>
        </div>
        
        `
}

