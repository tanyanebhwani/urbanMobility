# 🗺️ Urban Mobility Planner

A web-based application that uses the **Mapbox API** to calculate the shortest route between any two locations, including the **distance** and **estimated duration** of travel. Users can also **save favorite routes** with a simple authentication system.

### 🔗 Live Demo:  
🌐 [https://urbanmobilityplanner.netlify.app](https://urbanmobilityplanner.netlify.app)

---

## 📌 Description

**Urban Mobility Planner** is designed for individuals seeking the optimal route between two points on a map. It displays real-time route information and allows users to save their preferred routes securely with authentication.

While the core functionality aligns with existing map tools, this project aims to provide a personal learning experience in building full-stack web applications and will evolve with features focusing on **sustainable urban mobility** in future iterations.

---

## 🌟 Features

- 🚗 Calculate shortest route between source and destination.
- 📏 Display travel **distance** and **estimated duration**.
- 💾 Save favorite routes permanently (not in localStorage).
- 🔐 User authentication with JWT and password hashing using `bcryptjs`.

---

## 🛠️ Tech Stack

### 🔹 Frontend:
 - HTML, CSS, JavaScript
 - Mapbox GL JS (for map and routing)

### 🔹 Backend:
 - Node.js
 - Express.js
 - MongoDB (local)
 - Mongoose
 - JSON Web Token (JWT)
 - bcryptjs

---

## ⚙️ Installation

### 📁 Frontend:

    No installation needed. Open index.html or use the hosted version.

### 💻 Backend:

    Make sure you have Node.js installed.

   1. Clone the repository:
      
      <pre>git clone https://github.com/tanyanebhwani/urban-mobility-planner.git</pre>
      cd urban-mobility-planner

      Install dependencies:

        #### npm install mongoose jsonwebtoken bcryptjs express

      Run the backend:

        #### npm run backend

   3. Open the frontend:
    
      Open your browser and navigate to
       #### https://localhost:27017/urbanMobility/index.html

     📝 Note: MongoDB is used as my own cluster, so no cloud database setup is required.

   3. 🔐 Authentication
      Signup/Login required only for saving routes.

      Unauthenticated users can:

        - View routes and travel details

      Authenticated users can:

        - Save routes to favorites
        - View saved routes on the map

      No user roles are implemented at this stage.

   4. 🛣️ How to Use

      - Enter the source and destination in the input boxes.
      - Click on Get Route to view the optimal path.

     If logged in:

       - Click on Add to Favorites to save the route.
       - Click on View Favorites to revisit saved paths on the map.

    If not logged in:

      - Click Try for Free to use routing without saving options.

### 🛤️ Future Improvements
  - Some features currently planned:

     🔄 Show live traffic updates on the route.
     🌦️ Integrate real-time weather data along the path.
     📈 Maintain route history and analytics per user.

### 📊 Project Status
    ✅ Complete v1 — All core features are functional.
    🛠️ Feature upgrades and UX improvements are under development.

### 🎯 Motivation & Learnings
  The project was initially inspired by a desire to build something around sustainable urban mobility, in line with the UN Sustainable Development Goals (SDG 11: Sustainable Cities and Communities).

Through this project, I learned:

- Implementing APIs like Mapbox
- Handling JWT-based authentication
- Storing user data securely with MongoDB and bcrypt
- Structuring and managing a full-stack project end-to-end

