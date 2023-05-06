<template>
  <div class="auth-form-container">
    <h1>Register</h1>
    <form class="register-form" @submit.prevent="handleSubmit">
      <label for="name">Name</label>
      <input v-model="name" type="text" placeholder="Your Name" id="name" name="name" />
      <label for="email">Email</label>
      <input v-model="email" type="email" placeholder="Your Email" id="email" name="email" />
      <label for="password">Password</label>
      <input v-model="password" type="password" placeholder="Your Password" id="password" name="password" />
      <button class="btn" type="submit">Register</button>
    </form>
    <router-link to="/login" class="link-btn">Already have an account? Log in here.</router-link>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    name: "register",
    data() {
      return {
        name: "",
        email: "",
        password: "",
      };
    },
    methods: {
      async handleSubmit() {
        if (this.email.trim() === "" || this.password.trim() === "") {
          alert("Please fill in all fields.");
        } else {
          try {
            const response = await axios.post("http://localhost:5000/auth/signup", {
              email: this.email,
              password: this.password,
            });
            const { access_token, refresh_token, user_id } = response.data;
            // Store the tokens in local storage for later use
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);
            localStorage.setItem("user_id", user_id);
            console.log(response.data);
            console.log(localStorage.getItem("user_id"));
            // Create a new user profile
            await axios.post(`http://localhost:5051/profile/create_user`, {
              username: this.name,
            }, {
              headers: {
                "Authorization": `Bearer ${access_token}`
              }
            });
            // Redirect to the users profile page
            this.$router.push(`/profile/${localStorage.getItem("user_id")}`);
          } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 409) {
              alert("Email address is already in use. Please use a different email or log in.");
            } else {
              alert("Registration failed. Please try again.");
            }
          }
        }
      }
    },
  };
</script>