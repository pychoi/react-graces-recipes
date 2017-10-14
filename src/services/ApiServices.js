export function searchRecipes (searchTerm) {
  return fetch(`/search?query=${searchTerm}`)
    .then(response => {
      if (!response.ok){
        throw Error(response.status);
      }
      return response.json();
    }
  ).catch(err => {
    console.log('Fetch Error :-S', err);
    throw Error(err);
  });
}

export function getRecipeById (id) {
  return fetch(`/search/id?query=${id}`)
    .then(response => {
      if (!response.ok) {
        throw Error(response.status);
      }
      return response.json();
    }
  )
  .catch(err => {
    console.log('Fetch Error :-S', err);
    throw Error(err);
  });
}

export function addRecipe (recipe) {
  return fetch(`/add-recipe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(recipe)
  }).then(response => {
    if (!response.ok) {
      throw Error(response.status);
    }
    return response.json();
  }).catch(err => {
    console.log('Add Recipe Error', err);
    throw Error(err);
  });
}

export function editRecipe (recipe) {
  return fetch(`/edit-recipe`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(recipe)
  }).then(response => {
    if (!response.ok) {
      throw Error(response.status);
    }
    return response.json();
  }).catch(err => {
    console.log('Edit Recipe Error', err);
    throw Error(err);
  });
}

export function getCategories () {
  return fetch('/search-categories', {
    method: 'GET'
  }).then(response => {
    if (!response.ok) {
      throw Error(response.status);
    }
    return response.json();
  }).catch(err => {
    console.log('Get Categories Error', err);
    throw Error(err);
  });
}