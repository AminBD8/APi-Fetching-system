function searchRecipes(){
  const searchInput = document.getElementById('searchInput').value;
  const recipesDiv = document.getElementById('recipes');
  const notFoundDiv = document.getElementById('notFound');
  const categoriesDiv = document.getElementById('categories'); //  add this line

  categoriesDiv.style.display = 'none'; //  hide categories



  recipesDiv.innerHTML = '';
  notFoundDiv.style.display = 'none';

  if(searchInput.trim() === ''){
    notFoundDiv.innerHTML = 'Please enter a recipe name to search!';
    notFoundDiv.style.display = 'block';
    return;
  }


  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)

  .then(response => response.json())
  .then(data =>{
    if(!data.meals){
      notFoundDiv.innerHTML = 'Recipe not found, please try another search !'
      notFoundDiv.style.display = 'block';
    }

    else{
      data.meals.forEach(meal => {
        const card = document.createElement('div');
        card.classList.add('recipe-card');

        card.innerHTML =`
          <img src="${meal.strMealThumb}" alt="${meal.srtMeal}">
          <h3>${meal.strMeal}</h3>
          <p>${meal.strCategory}</p>
          <p style="color:red">${meal.strArea}</p>
          <button onclick= "viewRecipes(${meal.idMeal})">View Recipes</button>
        `;

        recipesDiv.appendChild(card);
      });
    }
  })

}

function viewRecipes(mealId) {
  const popupCard = document.getElementById('popupCard');
  const recipeTitle = document.getElementById('recipeTitle');
  const recipeDetails = document.getElementById('recipeDetails');

  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)

  .then (response => response.json())
  .then (data => {
    const meal = data.meals[0]
    recipeTitle.innerText = meal.strMeal;
    recipeDetails.innerText = meal.strInstructions;
    popupCard.style.display = 'block';
  })
}

function closeRecipe() {
  document.getElementById ('popupCard').style.display = "none";
}

document.getElementById('searchInput').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    searchRecipes();
  }
});

const loadCategoryApi = () => {
  fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(response => response.json())
    .then(data => displayCategories(data.categories))

};

loadCategoryApi();

const displayCategories = (categories) => {
  const uiDiv = document.getElementById("categories");

  categories.forEach(category => {
    const div = document.createElement('div');
    div.classList.add('category');
    div.innerHTML = `
      <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
      <h3>${category.strCategory}</h3>
      <p>${category.strCategoryDescription.slice(0, 100)}...</p>
    `;
    uiDiv.appendChild(div);
  });
};