<template>
  <div class="auth-form-container">
    <h1>Login</h1>
    <form class="login-form" @submit.prevent="handleSubmit">
      <label for="email">Email</label>
      <input v-model="email" type="email" placeholder="Your Email" id="email" name="email" />
      <label for="password">Password</label>
      <input v-model="password" type="password" placeholder="Your Password" id="password" name="password" />
      <button class="btn" type="submit">Log in</button>
    </form>
    <router-link to="/register" class="link-btn">Don't have an account? Register here.</router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
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
          const response = await axios.post("http://localhost:5000/auth/login", {
            email: this.email,
            password: this.password,
          });
          const { access_token, refresh_token } = response.data;
          // Store the tokens in local storage for later use
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);
          // Redirect to the home page after successful login
          this.$router.push("/");
        } catch (error) {
          // Handle errors, e.g. display an error message or alert
          console.error(error);
          alert("Login failed. Please try again.");
        }
      }
    },
  },
};
</script>