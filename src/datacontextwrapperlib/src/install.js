import DataContextComponent from './components/DataContextComponent.vue'

const DataContextComponentLib = {
    install(Vue, options) {
        // Let's register our component globally
        // https://vuejs.org/v2/guide/components-registration.html
        Vue.component("data-context-component", DataContextComponent);
    }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(DataContextComponentLib);
}

export default DataContextComponentLib;