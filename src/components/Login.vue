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
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
  handleSubmit() {
    if (this.email.trim() === "" || this.password.trim() === "") {
      // display an error message or alert
      alert("Please fill in all fields.");
    } else {
      console.log(this.email, this.password);
      // Redirect to the home page after successful login
      this.$router.push("/");
    }
  },
},
};
</script>