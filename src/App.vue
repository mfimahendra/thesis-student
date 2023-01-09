<script setup>
import NavBar from './components/NavBar.vue'

</script>

<template>
  <div>
    <NavBar />
    <router-view />  
  </div>        
</template>

<script>

export default {
  name: "App",
};
</script>
