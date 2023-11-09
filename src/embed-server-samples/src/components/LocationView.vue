<template>
  <h1>Vuejs - talk to API</h1>
   <div>
    {{msg}}
   </div>
   <br/>
   <button @click="getCurrentUrl()">Get current URL</button>
   <button @click="getLocation()">Get Location</button>
   <button @click="getPhoto()">Take Photo</button>
   <button @click="getBarcode()">Read Barcode</button>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';
import { onMounted } from 'vue';
import { computed, ref, shallowRef } from 'vue';
import axios from 'axios'

const msg = ref('Output show here...');
const baseUrl = new URL(`${window.location.protocol}${window.location.hostname}`).toString().slice(0, -1) + ':' + location.port;

const http = axios.create({
  baseURL:  baseUrl,
  headers: { 'Content-Type': 'application/json' }
});

async function getCurrentUrl ()
 { 
    console.log(baseUrl);

    msg.value = baseUrl;
}

 async function getLocation (): Promise<string> 
 { 
    const response = await http.get('/api/location');

    console.log(response.data);

    msg.value = response.data;

    return response.data;
}

async function getPhoto (): Promise<string> 
{ 
  const response = await http.get('/api/photo');

    console.log(response.data);

    msg.value = response.data;

    return response.data;
}

async function getBarcode (): Promise<string> 
{ 
  const response = await http.get('/api/barcode');

    console.log(response.data);

    msg.value = response.data;

    return response.data;
}

</script>
