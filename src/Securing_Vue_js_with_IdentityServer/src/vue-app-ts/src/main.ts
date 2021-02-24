import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { ApplicationContext } from "./services/ApplicationContext";

Vue.config.productionTip = false
Vue.prototype.$api = new ApplicationContext(router);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
