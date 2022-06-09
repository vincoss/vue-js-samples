<script lang="ts">
import Vue from 'vue';
import DataContextComponent from '@/data-context-component.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    DataContextComponent
  }
});
</script>

<template>
  <div id="app">
    <data-context-component />
  </div>
</template>
