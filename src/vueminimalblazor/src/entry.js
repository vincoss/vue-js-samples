//import { VBtn } from "vuetify/lib";
//import * as components from "./components";
import Imports from "./components/HelloWorld.vue";

const ComponentLibrary = {
    install(Vue, options = {}) {
        Vue.component("hellovue", Imports);
    },
};
export default ComponentLibrary;
if (typeof window !== "undefined" && window.Vue) {
    window.Vue.use(ComponentLibrary);
}
