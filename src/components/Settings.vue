<template>
    <!-- <div class = "upload-container">
      <form @submit.prevent="submitProfilePicture">
        <label for="profilePicture">Upload Profile Picture:</label>
        <input type="file" id="profilePicture" ref="profilePicture" name="pfp" accept="image/*">
        <button class='btn' type="submit">Submit</button>
      </form>
    </div> -->
    <h1>No settings for you, now go look at cats</h1>
</template>
  
<script>
// import axios from 'axios';
// export default {
//   methods: {
//     async submitProfilePicture() {
//       const formData = new FormData();
//       formData.append('pfp', this.$refs.profilePicture.files[0]);
      
//       try {
//             const response = await axios.post('http://localhost:5051/profile/update_user_pfp', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     Authorization: `Bearer ${localStorage.getItem('access_token')}`,
//                 },
//             }
//             );

//             // Update the user's profile picture in local storage
//             alert('Profile picture updated successfully.');
//         } catch (error) {
//             console.error('Error uploading the profile picture:', error);
//         }

//       // Reset the file input
//       this.$refs.profilePicture.value = null;
//     },
//   },
// };
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