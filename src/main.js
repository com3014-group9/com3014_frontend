import { createApp } from "vue";
import App from "./App.vue";
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Sidebar from './components/Sidebar.vue'
import Upload from './components/Upload.vue';
import About from './components/About.vue';
import Profile from './components/Profile.vue';
import Search from './components/Search.vue';
import Settings from './components/Settings.vue';

import '@fortawesome/fontawesome-free/css/all.css'
import { createRouter, createWebHistory } from "vue-router";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    //const currentTimestamp = Math.floor(Date.now() / 1000);
    //const expiresIn = parseInt(localStorage.getItem('expires_in'));

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshToken();
      originalRequest.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  },
);

function isLoggedIn() {
    return !!localStorage.getItem('access_token');
  }

async function refreshToken() {
    try {
      const response = await axios.post('/auth/refresh', null, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`,
        },
      });
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      //localStorage.setItem('expires_in', response.data.expires_in);
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  }

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
        path: "/",
        name: "home",
        component: Home,
        meta: {
            requiresAuth: true,
          },
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
        meta: {
            requiresAuth: true,
          },
    },
    {
        path: "/upload",
        name: "upload",
        component: Upload,
        meta: {
            requiresAuth: true,
          },
    },
    {
        path: "/profile/:userId",
        name: "profile",
        component: Profile,
        props:true,
        meta: {
            requiresAuth: true,
          },
    },
    {
        path: '/search',
        name: "search",
        component: Search,
        meta: {
            requiresAuth: true,
          },
    },
    {
        path: '/settings',
        name: "settings",
        component: Settings,
        meta: {
            requiresAuth: true,
          },
    }
  ],
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
    
      if (!isLoggedIn()) {
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });

  

const app = createApp(App);
app.use(router).mount("#app");
app.component('sidebar', Sidebar);