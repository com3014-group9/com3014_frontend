<template>
    <div class="sidebar-container">
      <div class="sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
    data() {
      return {
        isSidebarOpen: false
      }
    },
    methods: {
      toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
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
    left: -230px;
    transition: left 0.3s ease-in-out;
  }
  
  .sidebar-open {
    left: 0;
  }
  
  .main-content {
    padding: 20px;
    flex: 1;
  }
  
  .sidebar:hover {
    left: 0;
  }
  </style>