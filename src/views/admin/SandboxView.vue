<template>
    <div>
      <button @click="showSuccess">Show Success</button>
      <button @click="showError">Show Error</button>
    </div>
  </template>
  
  <script>
  import { useToast } from "vue-toastification";
  
  export default {
    setup() {
      const { success, error, info, warning } = useToast();
      return { success, error, info, warning };

        
    },
    methods: {
        showSuccess() {
            this.info("Hello world!");
        },
        showError() {
            this.error("Hello world!");
        }
        

    }
  };
  </script>
  