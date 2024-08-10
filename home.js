mapboxgl.accessToken = 'pk.eyJ1IjoidGFudGhldGEtMTIzIiwiYSI6ImNsejBzc2wxcDJnZGUyanFyeTA1dzJ6YnAifQ.wkCHiKJTFrer8wOsOpR3uQ';

const API_URL = 'http://localhost:5000';
let map;
let startLoc;
let endLoc;
let startGeocoder, endGeocoder;
let favorites = [];
let route, distance, duration;
svg = document.getElementsByTagName('svg')[0];
menu = document.getElementsByClassName('nav-list')[0];
menuBlock = document.getElementsByClassName('nav-items-vertical')[0];
rotate = 0;
let startAddress, endAddress, startMarker, endMarker;
svg.addEventListener('click', () => {
    console.log('I am listening');
    if (rotate == 0) {
        svg.style.rotate = '90deg';
        rotate = 1;
        menuBlock.style.display = 'flex';
        menu.style.display = 'block';
        menuBlock.style.height = '150px';
        menuBlock.style.width = "100%";
    }
    else if (rotate == 1) {
        svg.style.rotate = '0deg';
        rotate = 0;
        menuBlock.style.height = '0';
        menu.style.display = 'none';
    }
});
routeInfo = document.getElementById('route-info');
console.log("It's Working");
document.addEventListener('DOMContentLoaded', function () {
    console.log("Outside login form");
    document.getElementsByClassName('login-form')[0].addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log("inside login form");
        let isValid = true;
        const username = document.getElementById('username').value;
        const password = document.getElementById('InputPassword').value;
        const exampleModal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
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
                const response = await fetch('https://urbanmobility.onrender.com/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "userName": username, password })
                });
                const data = await response.json();
                if (response.ok) {
                    // Handle success (e.g., save token, redirect to another page, etc.)
                    localStorage.setItem('auth-token', data.token);
                    console.log('Login successful');
                    exampleModal.hide();
                    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
                    console.log(loginModal);
                    console.log(exampleModal);
                    document.getElementsByClassName('log-in')[0].style.color = '#007050';
                    loginModal.show();
                    window.location.href = '/home.html';
                } else {
                    console.log(exampleModal);
                    console.log("error:\t", data.message);
                    exampleModal.hide();
                    const loginNotModal = new bootstrap.Modal(document.getElementById('loginNotModal'));
                    console.log(document.getElementById('loginNotModal'));
                    loginNotModal.show();
                    document.getElementsByClassName('log-not')[0].style.color = '#e85a76';
                    document.getElementsByClassName('log-not-heading')[0].textContent = 'Invalid email or password';
                    console.log(document.getElementsByClassName('log-not-heading')[0].textContent);
                }
            } catch (error) {
                console.log(exampleModal);
                console.log('Error:', error);
                exampleModal.hide();
                const loginNotModal = new bootstrap.Modal(document.getElementById('loginNotModal'));
                document.getElementsByClassName('log-not')[0].style.color = '#e85a76';
                document.getElementsByClassName('log-not-heading')[0].textContent = 'Failed to login. Try again after some time.';
                loginNotModal.show();
            }
        }
    });
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
    startGeocoder.on('result', function (e) {
        startAddress = e.result.place_name;
    });
    endGeocoder.on('result', function (e) {
        endAddress = e.result.place_name;
    });
    document.getElementsByClassName('btn-reset-form')[0].addEventListener("click",clearForm);
    document.getElementsByClassName("btn-calculate-route")[0].addEventListener("click", calculateRoute);
    document.getElementsByClassName("btn-save-favorite")[0].addEventListener("click", saveFavoriteRoute);
    fetchFavorites();
}
function clearForm(){
    start.innerHTML = '';
    end.innerHTML = '';
    routeInfo.style.display = 'none';
    document.getElementById('start').appendChild(startGeocoder.onAdd(map));
    document.getElementById('end').appendChild(endGeocoder.onAdd(map));
    if (map.getLayer('route')) {
        // Remove the route layer
        map.removeLayer('route');
    }
    // Check if the route source exists
    if (map.getSource('route')) {
        // Remove the route source
        map.removeSource('route');
    }
    // Optionally, reset the map view to the initial state
    map.flyTo({
        center: [-79.4512, 43.6568] , // Replace with your initial coordinates
        zoom: 10 // Replace with your initial zoom level
    });
    // Remove any markers
    if (startMarker || endMarker) {
        startMarker.remove(); // Assuming 'marker' is your marker instance
        endMarker.remove();
    }
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
    console.log(startLoc, endLoc);
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

// Function to display favorites
function displayFavorites(favorites) {
    const favoritesContainer = document.getElementsByClassName('favorites')[0];
    favoritesContainer.innerHTML = '';
    for (const favorite of favorites) {
        const favoriteCard = document.createElement('div');
        favoriteCard.className = 'card mb-3 fav-item';
        const startLoc = favorite.startLocation;
        const endLoc = favorite.endLocation;
        favoriteCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${startLoc} - ${endLoc}</h5>
                <p class="card-text"><b>Distance:</b> ${favorite.routeInfo.distance.substring(0, favorite.routeInfo.distance.indexOf('.') + 3)} km <br/> <b>Estimated Time:</b> ${favorite.routeInfo.duration.substring(0, favorite.routeInfo.duration.indexOf('.') + 3)} min</p>
                <div class="button-sec">
                    <button class="btn btn-del" onclick="deleteFavorite('${favorite._id}')">Delete</button>
                    <button class="btn btn-view" onclick="viewFavorite('${favorite._id}')">View Route</button>
                </div>
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
        const favNotModal = new bootstrap.Modal(document.getElementById('favNotModal'));
        favNotModal.show();
        return;
    }

    if (!startLoc || !endLoc) {
        showError("Please enter valid starting and destination points.");
        return;
    }
    console.log("Fetching start and end addresses...");

    console.log("Start Address:", startAddress);
    console.log("End Address:", endAddress);
    if (!distance || !duration) {
        showError("Please click on 'calculate route' button to save to favorites.");
        return;
    }

    const favorite = {
        "startLocation": startAddress,
        "endLocation": endAddress,
        "startCoordinates": {
            type: "Point",
            coordinates: [startLoc.lng, startLoc.lat]
        },
        "endCoordinates": {
            type: "Point",
            coordinates: [endLoc.lng, endLoc.lat]
        },
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
            console.log(startAddress, endAddress, distance, duration);
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
async function viewFavorite(favoriteId) {
    const token = getAuthToken();
    if (!token) {
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
        return;
    }
    try {
        console.log(favoriteId);
        const response = await fetch(`${API_URL}/api/favorites/fetchOne/${favoriteId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${token}`
            }
        });
        const favorite = await response.json();
        console.log(favorite);
        if (response.ok) {
            const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${favorite.startCoordinates.coordinates[0]},${favorite.startCoordinates.coordinates[1]};${favorite.endCoordinates.coordinates[0]},${favorite.endCoordinates.coordinates[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;
            console.log(url);
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
                        console.log("true");
                        map.getSource('route').setData(geojson);
                    } else {
                        start.innerHTML = favorite.startLocation;
                        end.innerHTML = favorite.endLocation;
                        const startCoordinates = [ Number(favorite.startCoordinates.coordinates[0]) , Number(favorite.startCoordinates.coordinates[1]) ];
                        const endCoordinates = [ Number(favorite.endCoordinates.coordinates[0]) , Number(favorite.endCoordinates.coordinates[1]) ];
                        console.log("true");
                        map.addSource('route', {
                            type: 'geojson',
                            data: geojson
                        });
                        startMarker = new mapboxgl.Marker({ color: 'green' })
                            .setLngLat(startCoordinates)
                            .addTo(map);

                        // Add a marker for the end point
                        endMarker = new mapboxgl.Marker({ color: 'red' })
                            .setLngLat( endCoordinates )
                            .addTo(map);
                            map.flyTo({
                                center: startCoordinates, // [longitude, latitude]
                                zoom: 15,            // Adjust the zoom level as needed
                                essential: true      // This ensures the transition works even if the user prefers reduced motion
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
                    console.log("Hello");
                })
                .catch(error => {
                    console.error("Directions request failed:", error);
                    showError("Directions request failed due to " + error);
                });
        } else {
            console.error('Error deleting favorite:', await response.text());
        }
    } catch (error) {
        console.error('Error deleting favorite:', error);
    }
}
window.onload = initMap;