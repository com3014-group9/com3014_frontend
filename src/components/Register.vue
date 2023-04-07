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
  handleSubmit() {
    if (this.name && this.email && this.password) {
      console.log(this.name, this.email, this.password);
      // Redirect to the home page after successful registration
      this.$router.push("/");
    } else {
      alert("Please fill in all the fields.");
    }
  },
},
};
</script>