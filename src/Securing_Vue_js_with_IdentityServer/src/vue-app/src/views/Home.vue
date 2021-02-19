<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    
    <button class='btn' @click='logout'>Logout</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    async logout() {
      try {
        await this.$root.logout();
      } catch (err) {
        this.values.push("Ooops!" + err);
      }
    }
  }
}
</script>
