<template>
    <div class = "upload-container">
      <form @submit.prevent="submitForm">
        <label for="image">Upload Image:</label>
        <input type="file" id="image" ref="image" name="file" accept="image/*">
        <!-- <label for="caption">Caption:</label>
        <input type="text" id="caption" v-model="caption"> -->
        <button class='btn' type="submit">Submit</button>
      </form>
    </div>
</template>
  
<script>
  import axios from 'axios'
  export default {
     data() {
       return {
         tags: ["cat"],
       }
     },
    methods: {
      async submitForm() {
        const formData = new FormData();
        formData.append('file', this.$refs.image.files[0]);
        //formData.append('caption', this.caption);
        formData.append('tags', this.tags.join(' '));
        formData.append('owner', localStorage.getItem("user_id"));

        console.log("Form data:");
          formData.forEach((value, key) => {
            console.log(key + ": " + value);
          });
        //submit form data to server
        try {
          const response = await axios.post('http://localhost:5050/images/upload', formData, {
            headers: {
              "Content-Type": 'multipart/form-data',
              "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            },
          });
          console.log(response.data);
        } catch (error) {
          console.error('Error uploading the image:', error);
          if (error.response) {
            console.error('Error response:', error.response);
          } else {
            console.error('Error response is not available');
          }
        }
        
        // After the form is submitted, you can reset the form fields
        this.image = null;
        this.caption = '';
      }
    }
  }
</script>

<style>
    .upload-container {
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