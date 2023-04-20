<template>
    <div class="search-container">
      <form @submit.prevent="search">
        <label for="username">Search for username: </label>
        <input id="username" type="text" v-model="searchTerm">
        <button class="btn" type="submit">Search</button>
      </form>
    </div>
  </template>
  
<script>
  export default {
    name: "search",
    data() {
      return {
        searchTerm: ''
      }
    },
    methods: {
      search() {
        // Call your search function here, passing in the searchTerm
        this.$emit('search', this.searchTerm)
      }
    }
  };
  </script>

<style>
    .search-container {
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 5px solid white;
    border-radius: 10px;
    margin: 2rem 0;
    padding: 2rem;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }
</style>