<template>
    <div class="home">
      <h1>Welcome to the Home Page</h1>
      <p>This is an example of the home page content</p>
      <img src="public\tilly.jpg" />
      <img src="public\tilly2.jpg" />
      <img src="public\tilly3.jpg" />
      <img src="public\tilly4.jpg" />
      <img src="public\tilly5.jpg" />
      <img src="public\tilly6.jpg" />
      <img src="public\tilly7.jpg" />
    </div>
  </template>
  
  <script>
  export default {

    name: "home",
    data() {
      return {
        message: "Hello, world!",
      };
    },
  };
  </script>

<style>
  img {
   max-width: 50%;
   max-height: 50%;
   padding: 2rem;
     }
</style>