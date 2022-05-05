const apiKey = "563492ad6f91700001000001861d5dffc41e4f0189a44463126a57d3";
const input = document.getElementById("searchInput");
const form = document.querySelector("form");
const container = document.querySelector(".container");
const loadMore = document.getElementById("loadMore");
let pageNumber = 1;
let currentSearch;

form.addEventListener("submit", searchPhotoFromApi);
loadMore.addEventListener("click", loadMoreImages);

// Search photo from API
function searchPhotoFromApi(e) {
  e.preventDefault();
  const inputValue = input.value;
  currentSearch = inputValue;

  container.innerHTML = "";
  fetchPhotosFromApi(inputValue);
}

// Load more images
function loadMoreImages() {
  pageNumber++;
  fetchPhotosFromApi(currentSearch, pageNumber);
}

// Fetch photos from API
async function fetchPhotosFromApi(item) {
  const res = await fetch(`https://api.pexels.com/v1/search?query=${item}&per_page=10&page=${pageNumber}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: apiKey,
    },
  });

  const data = await res.json();

  showPhotos(data);
}

// Show photos in the DOM
function showPhotos(data) {
  data.photos.forEach((photo) => {
    const boxDiv = document.createElement("div");
    boxDiv.classList.add("box");
    boxDiv.innerHTML = `
    <img src="${photo.src.large}" alt="photo of ${currentSearch}">
    `;
    container.appendChild(boxDiv);
  });
}
