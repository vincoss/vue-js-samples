import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./services/site";

Vue.config.productionTip = false
Vue.config.errorHandler = (err, vm, info) =>
{
    console.log("Vue.config.errorHandler");
    console.log(err);
};

window.onerror = function (message, source, lineno, colno, error)
{
    console.log("window.onerror");
    console.log(err);
};

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
