mapboxgl.accessToken = 'pk.eyJ1IjoidGFudGhldGEtMTIzIiwiYSI6ImNsejBzc2wxcDJnZGUyanFyeTA1dzJ6YnAifQ.wkCHiKJTFrer8wOsOpR3uQ';

const API_URL = 'http://localhost:5000';
let map;
let startLoc;
let endLoc;
let startGeocoder,endGeocoder;
let favorites = [];
let route, distance, duration;
routeInfo = document.getElementById('route-info');
console.log("It's Working");
document.getElementsByClassName('login-form')[0].addEventListener('submit', async (event) => {
    event.preventDefault();
    let isValid = true;
    const username = document.getElementById('username').value;
    const password = document.getElementById('InputPassword').value;
    // Check if all fields are filled
    if (!username) {
        isValid = false;
        document.querySelector('.v-username').style.display = 'block';
    }
    if (!password) {
        isValid = false;
        document.querySelector('.v-pass').style.display = 'block';
    }

    if (isValid) {
        console.log('listening');
        // Proceed with form submission or further processing
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "userName":username, password })
            });
            const data = await response.json();
            if (response.ok) {
                // Handle success (e.g., save token, redirect to another page, etc.)
                localStorage.setItem('auth-token', data.token);
                alert('Login successful!');
                window.location.href = '/home.html';
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login. Please try again.');
        }
    }
});

function initMap() {
    map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-79.4512, 43.6568],
        zoom: 10
    });
    startGeocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        placeholder: 'Enter starting point',
        mapboxgl: mapboxgl,
        marker: true
    });
    endGeocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        placeholder: 'Enter destination',
        mapboxgl: mapboxgl,
        marker: true
    });
    document.getElementById('start').appendChild(startGeocoder.onAdd(map));
    document.getElementById('end').appendChild(endGeocoder.onAdd(map));
    document.getElementsByClassName("btn-calculate-route")[0].addEventListener("click", calculateRoute);
    document.getElementsByClassName("btn-save-favorite")[0].addEventListener("click", saveFavoriteRoute);
    fetchFavorites();
}
function clearError() {
    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.innerText = "";
    errorMessageElement.style.display = "none";
}
// Function to get auth token
function getAuthToken() {
    return localStorage.getItem('auth-token'); // Assuming you store the token in localStorage after login
}
function calculateRoute() {
    clearError();
    
    startLoc = startGeocoder.mapMarker ? startGeocoder.mapMarker.getLngLat() : null;
    endLoc = endGeocoder.mapMarker ? endGeocoder.mapMarker.getLngLat() : null;

    if (!startLoc || !endLoc) {
        showError("Please enter valid starting and destination points.");
        return;
    }

    console.log("\nStart : (" + startLoc.lng + "," + startLoc.lat + ") \nend Latitude: (" + endLoc.lng + "," + endLoc.lat + ") \n");

    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startLoc.lng},${startLoc.lat};${endLoc.lng},${endLoc.lat}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            console.log(response);
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data.routes.length === 0) {
                showError("No route found.");
                return;
            }
            route = data.routes[0];
            distance = route.distance / 1000;
            duration = route.duration / 60;
            routeInfo.style.display = 'flex';
            document.getElementById("distance").innerText = `Distance: ${distance.toFixed(2)} km`;
            document.getElementById("duration").innerText = `Estimated Time: ${duration.toFixed(2)} minutes`;
            console.log(route);
            const coordinates = route.geometry.coordinates;
            console.log(coordinates);
            const geojson = {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: coordinates
                }
            };
            if (map.getSource('route')) {
                map.getSource('route').setData(geojson);
            } else {
                map.addSource('route', {
                    type: 'geojson',
                    data: geojson
                });
                map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: 'route',
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#3887be',
                        'line-width': 5,
                        'line-opacity': 0.75
                    }
                });
            }
        })
        .catch(error => {
            console.error("Directions request failed:", error);
            showError("Directions request failed due to " + error);
        });
}
function showError(message) {
    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.innerText = message;
    errorMessageElement.style.display = "block";
}

/*async function getAddressFromLatLng(latitude, longitude) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`;

    try {
        const response = await axios.get(url);
        console.log(response);
        const address = response.data.features[0].place_name;
        return address;
    } catch (error) {
        console.error('Error fetching address:', error);
        document.getElementById('address').innerText = 'Error fetching address';
    }
}*/

// Function to display favorites
async function displayFavorites(favorites) {
    const favoritesContainer = document.getElementsByClassName('favorites')[0];
    favoritesContainer.innerHTML = '';

    for(const favorite of favorites){
        const favoriteCard = document.createElement('div');
        favoriteCard.className = 'card mb-3 fav-item';
        const startLoc = favorite.startLocation;
        const endLoc = favorite.endLocation;
        favoriteCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${startLoc} - ${endLoc}</h5>
                <p class="card-text"><b>Distance:</b> ${favorite.routeInfo.distance} km <br/> <b>Estimated Time:</b> ${favorite.routeInfo.duration}</p>
                <button class="btn btn-danger" onclick="deleteFavorite('${favorite._id}')">Delete</button>
            </div>
        `;
        favoritesContainer.appendChild(favoriteCard);
    };
}

// Function to fetch and display favorites
async function fetchFavorites() {
    const token = getAuthToken();
    if (!token) {
        return;
    }
    try {
        const response = await fetch(`${API_URL}/api/favorites/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${token}`
            }
        });

        const favorites = await response.json();
        displayFavorites(favorites);
    } catch (error) {
        console.error('Error fetching favorites:', error);
    }
}
async function saveFavoriteRoute() {
    clearError();
    const token = getAuthToken();
    if (!token) {
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
        return;
    }
    
    if (!startLoc || !endLoc) {
        showError("Please enter valid starting and destination points.");
        return;
    }
    let startAddress,endAddress;
    startGeocoder.on('result',function(e){
        startAddress = e.result.place_name;
        console.log(startAddress);
    });

    endGeocoder.on('result',function(e){
        endAddress = e.result.place_name;
    });
    console.log(startAddress,endAddress);
    if (!distance || !duration) {
        showError("Please click on 'calculate route' button to save to favorites.");
        return;
    }

    const favorite = {
        "startLocation": startAddress,
        "endLocation": endAddress,
        "routeInfo": {
            "distance": distance,
            "duration": duration
        }
    }
    try {
        const response = await fetch(`${API_URL}/api/favorites/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${token}`
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

async function deleteFavorite(favoriteId) {
    const token = getAuthToken();
    if (!token) {
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
        return;
    }
   
    try {
        const response = await fetch(`${API_URL}/api/favorites/${favoriteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${token}`
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

window.onload = initMap;
