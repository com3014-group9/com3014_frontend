<template>
  <div class="sidebar-container">
    <div class="sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
      <ul class="sidebar-menu">
        <li>
          <router-link to="/" @click="scrollToTop">
          <button class="sidebar-button">
            <span class="sidebar-text">Home</span>
            <img src="/templogo.svg" class="sidebar-icon-button" />
          </button>
          </router-link>
        </li>
        <li>
          <router-link to="/search">
          <button class="sidebar-button">
            <span class="sidebar-text">Search</span>
            <img src="/search.svg" class="sidebar-icon-button" />
          </button>
          </router-link>
        </li>
        <li>
          <router-link :to="`/profile/${loggedInUserId}`">
          <button class="sidebar-button">
            <span class="sidebar-text">Your Profile</span>
            <img src="/tempprofile.svg" class="sidebar-icon-button" />
          </button>
          </router-link>
        </li>
        <li>
          <router-link to="/upload">
          <button class="sidebar-button">
            <span class="sidebar-text">Upload image</span>
            <img src="/add.svg" class="sidebar-icon-button" />
          </button>
          </router-link>
        </li>
        <li>
          <router-link to="/about">
          <button class="sidebar-button">
            <span class="sidebar-text">About</span>
            <img src="/about.svg" class="sidebar-icon-button" />
          </button>
          </router-link>
        </li>
        <li>
          <router-link to="/settings">
          <button class="sidebar-button">
            <span class="sidebar-text">Settings</span>
            <img src="/settings.svg" class="sidebar-icon-button" />
          </button>
          </router-link>
        </li>
        <li>
          <button class="sidebar-button" @click="handleLogout">
            <span class="sidebar-text">Log out</span>
            <img src="/logout.svg" class="sidebar-icon-button" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";
  export default {
    name: 'App',
    data() {
      return {
        isSidebarOpen: false
      }
    },
    computed: {
      loggedInUserId() {
        return localStorage.getItem("user_id");
      },
    },
    methods: {
      async handleLogout() {
        try {
          // Make a request to the server to log the user out
          await axios.post("http://localhost:5000/auth/logout", {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
          });
          // Remove the tokens from local storage
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user_id");
          // Redirect to the login page after successful logout
          this.$router.push("/login");
        } catch (error) {
          // Handle errors, e.g. display an error message or alert
          console.error(error);
          alert("Logout failed. Please try again.");
        }
      },
      toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
      },
      scrollToTop() {
        window.scrollTo(0, 0);
      }
    }
  }
</script>
  
<style>
  .sidebar-container {
    display: flex;
  }
  
  .sidebar {
    width: 300px;
    height: 100vh;
    background-image: linear-gradient(79deg, white, #00ffea);
    position: fixed;
    top: 0;
    left: -210px;
    border-right: 5px solid white;
    transition: left 0.3s ease-in-out;
  }
  
  .sidebar-open {
    left: 0;
  }

  .sidebar:hover {
    left: 0;
  }
  
  .sidebar-menu {
    list-style: none;
    padding: 0;
    margin: 20px 0;
  }

  .sidebar-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 96%;
    height: 5.5rem;
    padding: 10px;
    background-color: transparent;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition-duration: 0.3s;
  }

  .sidebar-icon-button {
    margin-bottom: 0px;
    margin-right: -40px;
    width: 5rem;
  }

  .sidebar-text {
    font-weight: bold;
    font-size: 32px;
    text-align: left;

  }

  .sidebar-button:hover {
    background-color: #00ffa2;
  }

  .sidebar-button:active {
    background-color: #00ff44;
  }
 </style>