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

// loadVideos
const loadVideos = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/phero-tube/videos"
    );
    const data = await res.json();

    displayVideos(data.videos);
  } catch (error) {
    console.log("Error:", error);
  }
};

// {
//     "category_id": "1003",
//     "video_id": "aaaf",
//     "thumbnail": "https://i.ibb.co/5LRQkKF/stick-and-stones.jpg",
//     "title": "Sticks & Stones",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/rdTZrCM/dev.jpg",
//             "profile_name": "Dave Chappelle",
//             "verified": true
//         }
//     ],
//     "others": {
//         "views": "113K",
//         "posted_date": ""
//     },
//     "description": "Dave Chappelle's 'Sticks & Stones' has garnered 113K views and remains a controversial yet highly engaging piece of stand-up comedy. Known for his fearless approach, Dave dives into a wide range of topics, delivering his unique perspective with wit and sharp humor. As a verified artist, Dave's comedy is raw, honest, and unapologetically funny."
// }

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videos.forEach((video) => {
    console.log(video);

    const card = document.createElement("div");
    card.classList = "card card-compact shadow-xl";
    card.innerHTML = `
        <figure class="h-[200px]">
    <img
      src=${video.thumbnail}
      alt="Shoes"
      class="w-full h-full object-cover"
       />
  </figure>
  <div class="flex items-center gap-3">
    <div class="flex py-5">
        <img class="w-10 h-10 object-cover rounded-full" src=${video.authors[0].profile_picture} />
    </div>
    <div>
        <h3 class="font-bold">${video.title}</h3>
        <div class="flex items-center gap-2"> 
            <p class="text-gray-400">${video.authors[0].profile_name}</p>
            ${video.authors[0].verified ? (`<img src="assets/verified.png"/>`) : ""}
            
        </div>
    </div>
  </div>
    `;
    videoContainer.appendChild(card);
  });
};

// displayCategories
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories");
  categories.forEach((item) => {
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;
    categoriesContainer.appendChild(button);
  });
};

loadCategories();
loadVideos();
