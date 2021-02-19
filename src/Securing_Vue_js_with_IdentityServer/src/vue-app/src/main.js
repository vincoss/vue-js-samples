import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mgr from './services/security.js'
import axios from 'axios'
import LocalStorageService from "./services/LocalStorageService.js";
const localStorageService = LocalStorageService.getService();

Vue.config.productionTip = false

const globalData = {
  isAuthenticated: false,
  user: '',
  mgr: mgr
}

const globalMethods = {
  async authenticate(returnPath) {
    const user = await this.$root.getUser(); //see if the user details are in local storage
    if (!!user) {
      this.isAuthenticated = true;
      this.user = user;
    } else {
      await this.$root.signIn(returnPath);
    }
  },
  async getUser () {
    try {
      let user = await this.mgr.getUser();
      return user;
    } catch (err) {
      console.log(err);
    }
  },
  signIn (returnPath) {
    returnPath ? this.mgr.signinRedirect({ state: returnPath })
        : this.mgr.signinRedirect();
  },
  logout () {
    try {
      return this.mgr.signoutRedirect();
    } catch (err) {
      console.log(err);
    }
  },
}

let v = new Vue({
  router,
  data: globalData,
  methods: globalMethods,
  render: function (h) { return h(App) }
}).$mount('#app')

axios.interceptors.request.use((config) => {

  const user = v.$root.user;
  if (user) {
    const authToken = user.access_token;
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
  }
  return config;
},
(err) => {
  //What do we do when we get errors?
});

//Add a response interceptor

axios.interceptors.response.use((response) => {
  return response
}, function (error) {
  const originalRequest = error.config;

  if (error.response.status === 401 && originalRequest.url === 'https://localhost:5443')
  {
    router.push('/login');
    return Promise.reject(error);
  }

  if (error.response.status === 401 && !originalRequest._retry) {

      originalRequest._retry = true;
      console.log('renewing tokens');
      new Oidc.UserManager({userStore: new Oidc.WebStorageStateStore({ store: window.localStorage })})
          .signinSilentCallback();
          return axios(originalRequest);
  }
  return Promise.reject(error);
});