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
