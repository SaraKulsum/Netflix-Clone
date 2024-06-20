// fetch(url).then(response => response.json()).then(json => {
//     console.log(json.results[1])})

async function getMovie(url, Dom_Ele, type_path) {
  let Dom_Element = document.querySelector(`${Dom_Ele}`);
  try {
    const response = await fetch(url);
    const data = await response.json();
    show(data, Dom_Element, type_path);
  } catch (error) {
    console.log(error);
  }
}

function show(movies, Dom_Ele, type_path) {
  for (let mov of movies.results) {
    let imgele = document.createElement("img");
    imgele.setAttribute = (`id`, `${mov.id}`);
    imgele.src = `https://image.tmdb.org/t/p/original${mov[type_path]}`;
    Dom_Ele.appendChild(imgele);
    imgele.onclick = () => {
      action1(`${mov.id}`);
    };
  }
}

function netflixOriginal() {
  let url =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1";
  getMovie(url, ".original__movies", "poster_path");
}

function trending() {
  let url =
    "https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045";
  getMovie(url, "#trending", "backdrop_path");
}
function topRelated() {
  let url =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1";
  getMovie(url, "#top_rated", "backdrop_path");
}
netflixOriginal();
trending();
topRelated();

//now for playing trailers

async function getMovieTrailer(id) {
  let url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`;
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`
    );
    const data = await response.json();
    showMovieTrailer(data);
  } catch (error) {
    console.log(error);
  }
}

const modal = document.querySelector("dialog");
function showMovieTrailer(data) {
  iframe = document.querySelector("#frame");
  if (data.results[0].site == "YouTube") {
    iframe.src = `https://www.youtube.com/embed/${data.results[0].key}`;
    document.querySelector("h5").innerText = data.results[0].name;
    console.log(data.results[0]);
  } else {
    console.log("sorry");
  }
}
action1 = (id) => {
  getMovieTrailer(id);
  modal.style = "display : inline";
  modal.showModal();
};

closeModal = () => {
  modal.style = "display : none";
  iframe.src = "";
  modal.close();
};
