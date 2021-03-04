import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./services/site";

Vue.config.productionTip = false
Vue.config.errorHandler = (err, vm, info) =>
{
    console.log("Vue.config.errorHandler");
    console.log(`Error: ${err.toString()}\nInfo: ${info}`);
};

window.onerror = function (message, source, lineno, colno, error)
{
    console.log("window.onerror");
    console.log('ONE ERROR HANDLER TO RULE THEM ALL:', message);
};

Vue.config.warnHandler = function (msg, vm, trace)
{
    console.log(`Warn: ${msg}\nTrace: ${trace}`);
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
