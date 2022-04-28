<template>
    <div>
        <h1>Vue.js host app a blazor app</h1>
        <div v-html="compiledHtml"></div>
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
   
    import { Component, Vue } from 'vue-property-decorator'

    export default {
        name: 'UploadBlazorComponent',
        data: function () {
            return {
                fileName: "index.html",
                input: ""

            };
        }
    }
</script>

