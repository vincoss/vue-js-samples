<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App" />
        <div v-for="(item,index) in values" :key="index">
            <p>{{item}}</p>
        </div>
        <button @click="callApi">Call API</button>
    </div>
</template>

<script>
// @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'
    import axios from 'axios'

export default {
  name: 'Home',
  components: {
    HelloWorld
        },
        data() {
            return {
                values: ["no data yet"],
            }
        },
        methods: {
            async callApi() {
                const response = await axios.get("http://localhost:5000/api/values");
                this.values = response.data;
                //try {
                //    const response = await axios.get("http://localhost:5000/api/values");
                //    this.values = response.data;
                //} catch (err) {
                //    this.values.push("Ooops!" + err);
                //}
            }
        }
}
</script>
