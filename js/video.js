// getTimeString
function getTimeString(time) {
  const hour = parseInt(time / 3600);
  let remainingSeconds = time % 3600;
  const minute = parseInt(remainingSeconds / 60);
  remainingSeconds = remainingSeconds % 60;

  return `${hour} hour ${minute} minutes ${remainingSeconds} seconds ago`;
}
// load Details data
const loadDetails = async (videoId) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    );
    const data = await res.json();
    displayDetails(data.video);
  } catch (error) {
    console.log("Error:", error);
  }
};
// display details data
const displayDetails = (videos) => {
  const customModal = document.getElementById("customModal").showModal();
  const detailsContainer = document.getElementById("modalContent");
  detailsContainer.innerHTML = `
  <img class="w-full h-auto object-cover" src =${videos.thumbnail}/>
  <p>${videos.description}</p>
  `;
  customModal.appendChild(div);
};
// removeActiveClass
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (const button of buttons) {
    button.classList.remove("btn-error");
  }
};

// loadCategories
const loadCategories = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/phero-tube/categories"
    );
    const data = await res.json();

    displayCategories(data.categories);
  } catch (error) {
    console.log("Error:", error);
  }
};

// loadCategories Videos
const loadCategoriesVideos = async (id) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    );
    const data = await res.json();
    const activeBtn = document.getElementById(`btn-${id}`);
    removeActiveClass();
    activeBtn.classList.add("btn-error");

    displayVideos(data.category);
  } catch (error) {
    console.log("Error:", error);
  }
};

// loadVideos
const loadVideos = async (searchText = "") => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
    );
    const data = await res.json();

    displayVideos(data.videos);
  } catch (error) {
    console.log("Error:", error);
  }
};

// display videos
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";
  if (videos.length === 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `<div class="h-[300px] flex flex-col gap-5 justify-center items-center">
      <img src="assets/icon.png"/>
      <p class="text-3xl text-center font-bold">Oops!! Sorry, There is no <br> content here</p>
    </div>`;
    return;
  } else {
    videoContainer.classList.add("grid");
  }
  videos.forEach((video) => {
    console.log(video);

    const card = document.createElement("div");
    card.classList = "card card-compact shadow-xl";
    card.innerHTML = `
        <figure class="h-[200px] relative">
    <img
      src=${video.thumbnail}
      alt="Shoes"
      class="w-full h-full object-cover"
       />
       
        ${
          video.others.posted_date
            ? `<span class="absolute right-2 bottom-2 p-1 text-white text-xs bg-black/80 rounded">${getTimeString(
                video.others.posted_date
              )}</span>`
            : ""
        }
       
  </figure>
  <div class="flex items-center gap-3">
    <div class="flex py-5">
        <img class="w-10 h-10 object-cover rounded-full" src=${
          video.authors[0].profile_picture
        } />
    </div>
    <div>
        <h3 class="font-bold">${video.title}</h3>
        <div class="flex items-center gap-2"> 
            <p class="text-gray-400">${video.authors[0].profile_name}</p>
            ${
              video.authors[0].verified
                ? `<img src="assets/verified.png"/>`
                : ""
            }
            
        </div>
        <span class="text-gray-400">${video.others.views} views </span>
    </div>
    </div>
    <button onclick="loadDetails('${
      video.video_id
    }')" class="btn btn-error text-white">Details</button>
    `;
    videoContainer.appendChild(card);
  });
};

// displayCategories
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories");
  categories.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
      <button id="btn-${item.category_id}" onclick="loadCategoriesVideos(${item.category_id})" class="btn category-btn">${item.category}</button>
    `;
    categoriesContainer.appendChild(buttonContainer);
  });
};
document.getElementById("search-box").addEventListener("keyup", (e) => {
  loadVideos(e.target.value);
});
loadCategories();
loadVideos();
