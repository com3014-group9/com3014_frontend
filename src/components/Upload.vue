<template>
    <div>
      <form @submit.prevent="submitForm">
        <label for="image">Upload Image:</label>
        <input type="file" id="image" ref="image" accept="image/*">
        <label for="caption">Caption:</label>
        <input type="text" id="caption" v-model="caption">
        <button class='btn' type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        image: null,
        caption: ''
      }
    },
    methods: {
      submitForm() {
        const formData = new FormData();
        formData.append('image', this.$refs.image.files[0]);
        formData.append('caption', this.caption);
        
        //submit form data to server
        
        // After the form is submitted, you can reset the form fields
        this.image = null;
        this.caption = '';
      }
    }
  }
  </script>
<style>

</style>