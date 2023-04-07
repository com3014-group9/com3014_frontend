import { createApp } from "vue";
import App from "./App.vue";
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Sidebar from './components/Sidebar.vue'
import Upload from './components/Upload.vue';
import About from './components/About.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/register",
        name: "register",
        component: Register,
    },
    {
        path: "/about",
        name: "about",
        component: About,
    },
    {
      path: "/upload",
      name: "upload",
      component: Upload,
  }
  ],
});

const app = createApp(App);
app.use(router).mount("#app").component('sidebar', Sidebar);
