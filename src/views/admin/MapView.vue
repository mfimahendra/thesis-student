<template>
  <MasterLayout />

  <div class="content-wrapper">
    <section>
      <div class="container-fluid">
        <div class="row mt-2">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title"><b>Map</b></h3>
              </div>
              <div class="card-body">
                <Maps />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
#map {
  height: 500px;
  width: 100%;
}
</style>

<script>
import MasterLayout from "./Master.vue";
import Maps from "./Maps.vue";
import { useToast } from "vue-toastification";
import "leaflet/dist/leaflet.css";

export default {
  name: "MapView",
  components: {
    MasterLayout,
    Maps,
  },
  setup() {
    const { success, error, info, warning } = useToast();
    return { success, error, info, warning };
  },
  data() {
    return {
      
    };
  },
  mounted() {
    
  },
  created() {},
  methods: {
    
  },
};
</script>
