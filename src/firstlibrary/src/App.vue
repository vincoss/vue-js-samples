<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
        <DataContextComponent :model="dataContext" />
        <button @click="onDataEvent">Update data</button>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import HelloWorld from './components/HelloWorld.vue';
    import DataContextComponent from '@/components/DataContextComponent.vue';
    import { Data, Definition, DataContext } from '@/models/dataView';

@Component({
  components: {
        HelloWorld,
        DataContextComponent
  },
})
export default class App extends Vue
{
    private dataContext: DataContext = new DataContext();

    created()
    {
        this.dataContext.data = new Data();
        this.dataContext.definition = new Definition();

        this.dataContext.data.value = "Data value";
        this.dataContext.definition.value = "Definition value";

        this.dataContext.save = this.onSave;
        this.dataContext.validate = this.onValidate;
    }

    onValidate(data: Data)
    {
        console.log("parent.onValidate");
    }

    onSave(data: Data)
    {
        console.log("parent.onSave");
    }

    onDataEvent()
    {
        console.log("onDataEvent");
        this.dataContext.data.value = "Data value update";
    }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
