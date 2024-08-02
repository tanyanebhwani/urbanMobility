// URL of your backend API
const API_URL = 'http://localhost:5000';

// Function to get auth token
function getAuthToken() {
    return localStorage.getItem('auth-token'); // Assuming you store the token in localStorage after login
}



// Function to add a favorite
async function addFavorite(event) {
    event.preventDefault();

    const token = getAuthToken();
    if (!token) {
        alert('You need to login first.');
        return;
    }

    const startLocation = document.getElementById('startLocation').value;
    const endLocation = document.getElementById('endLocation').value;
    const distance = document.getElementById('distance').value;

    const favorite = {
        startLocation,
        endLocation,
        distance
    };

    try {
        const response = await fetch(`${API_URL}/favorites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `Bearer ${token}`
            },
            body: JSON.stringify(favorite)
        });

        if (response.ok) {
            fetchFavorites(); // Refresh the list of favorites
        } else {
            console.error('Error adding favorite:', await response.text());
        }
    } catch (error) {
        console.error('Error adding favorite:', error);
    }
}

// Function to delete a favorite

// Event listener for the add favorite form
document.getElementById('add-favorite-form').addEventListener('submit', addFavorite);

// Initial fetch of favorites when the page loads
fetchFavorites();
//go bye bye
// URL of your backend API
const API_URL = 'http://localhost:5000';



// Function to fetch and display favorites
async function fetchFavorites() {
    const token = getAuthToken();
    if (!token) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/favorites`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `Bearer ${token}`
            }
        });

        const favorites = await response.json();
        displayFavorites(favorites);
    } catch (error) {
        console.error('Error fetching favorites:', error);
    }
}

// Function to display favorites
function displayFavorites(favorites) {
    const favoritesContainer = document.getElementById('favorites-container');
    favoritesContainer.innerHTML = '';

    favorites.forEach(favorite => {
        const favoriteElement = document.createElement('div');
        favoriteElement.textContent = `Start: ${favorite.startLocation}, End: ${favorite.endLocation}, Distance: ${favorite.distance}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteFavorite(favorite._id));

        favoriteElement.appendChild(deleteButton);
        favoritesContainer.appendChild(favoriteElement);
    });
}

// Function to add a favorite
async function addFavorite(event) {
    event.preventDefault();

    const token = getAuthToken();
    if (!token) {
        alert('You need to login first.');
        return;
    }

    const startLocation = document.getElementById('startLocation').value;
    const endLocation = document.getElementById('endLocation').value;
    const distance = document.getElementById('distance').value;

    const favorite = {
        startLocation,
        endLocation,
        distance
    };

    
}

// Function to delete a favorite
async function deleteFavorite(favoriteId) {
    const token = getAuthToken();
    if (!token) {
        alert('You need to login first.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/favorites/${favoriteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `Bearer ${token}`
            }
        });

        if (response.ok) {
            fetchFavorites(); // Refresh the list of favorites
        } else {
            console.error('Error deleting favorite:', await response.text());
        }
    } catch (error) {
        console.error('Error deleting favorite:', error);
    }
}

// Event listener for the add favorite form
document.getElementById('add-favorite-form').addEventListener('submit', addFavorite);

// Initial fetch of favorites when the page loads
fetchFavorites();
