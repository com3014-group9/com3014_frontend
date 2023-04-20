<template>
  <div class="App">
    <Sidebar v-if="showSidebar" />
    <router-view />,
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import Sidebar from './components/Sidebar.vue'

export default defineComponent({
  name: 'App',
  components: {
    RouterView,
    Sidebar
  },
  computed: {
    showSidebar() {
      return this.$route.name !== 'login' && this.$route.name !== 'register';
    }
  }
});
</script>

<style>

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

.App {
  text-align: center;
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  color: white;
  background-image: linear-gradient(79deg, #0000FF, #00ffea, #00ff40)
}

.auth-form-container, .login-form, .register-form {
  display:flex;
  flex-direction: column;
}

@media screen and (min-width:600px) {
}
.auth-form-container {
  background-image: linear-gradient(79deg, #0000dd, #00bbff 80%);
  padding: 5rem;
  border: 1px solid white;
  border-radius: 10px;
  margin: 0.5rem;
}

label {
  text-align: left;
  padding: 0.25rem 0;
}

input {
  margin: 0.5rem 0;
  padding: 1rem;
  border: none;
  border-radius: 10px;
}

button {
  margin: 0.5rem;
  padding: 20px;
  cursor: pointer;
  border: none;
}

.btn {
  margin: 0.5rem;
  border-radius: 10px;
  background-color: var(--background-color);
  transition-duration: 0.4s;
  --background-color: white;
  --accent-color: #00ffa2;
}

.btn:hover {
  background-color: var(--accent-color);
}

.link-btn {
  background: none;
  color: white;
  text-decoration: underline;
}
</style>