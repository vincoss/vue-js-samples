<template>
    <div>
        <h1>Vue.js host app a blazor app</h1>
        <div v-html="compiledHtml"></div>
        <div id="appblazor">Loading...</div>
    </div>
</template>

<style>
    @media (min-width: 1024px) {
        .about {
            min-height: 100vh;
            display: flex;
            align-items: center;
        }
    }
</style>

<!--<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

    @Component({
        components: {
            HelloWorld,
        },
    })
    export default class Home extends Vue { }
</script>-->


<script lang="ts">
   
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import axios from "axios";

    @Component
    export default class BlazorView extends Vue {


        private fileName: string = "index.html";
        private input: string = "";

         data() {
            return {
                fileName: "index.html",
                input: ""

            };
        }

        mounted() {
            this.fileName = this.$route.params.fileName;
            this.loadFile()
        }

        get compiledHtml() {
            return this.input;
        }

        loadFile() {
            let recaptchaScript = document.createElement('script')
            recaptchaScript.setAttribute('src', 'wasm/_framework/blazor.webassembly.js')
            document.head.appendChild(recaptchaScript)

            axios({
                method: "get",
                url: "/#/wasm/index.html"
            })
                .then(result => {
                    this.input = result.data;
                })
                .catch(error => {
                    console.error("error getting file");
                });
        }
}
</script>

