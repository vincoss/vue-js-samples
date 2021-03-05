<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button class="btn" @click="makeError">Make Error</button>
    <button class="btn" @click="callApi">Make Http Error</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    makeError() {
      var a = 0;
      var b = 2;
      var c = b / a;

      console.log(c);
    },
    async callApi() {
        const response = await axios.get("http://localhost:5000/api/valuesa");
        if (response) { console.log(response); }
    }
  }
};
</script>
