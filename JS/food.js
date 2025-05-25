function searchRecipes(){
  const searchInput = document.getElementById('searchInput').value;
  const recipesDiv = document.getElementById('recipes');
  const notFoundDiv = document.getElementById('notFound');


  fetch(`www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)

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
          <img src="${meal.srtMealThumb}" alt="${meal.srtMeal}">
          <h3>${meal.srtMeal}</h3>
          <button>View Recipes</button>
        `;

        recipesDiv.appendChild(card);
      });
    }
  })

}