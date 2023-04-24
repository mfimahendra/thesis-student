<style>
#map {
    height: 550px;
    width: 100%;
  }

</style>

<template>
    <NavBar />
    <div class="map">
        <Maps />
    </div>
</template>

<script>
    import NavBar from '../components/NavBar.vue'
    import Maps from './admin/Maps.vue'

    export default {
        name: 'MapsView',
        components: {
            NavBar,
            Maps,

        },
        data() {
            return {
                map: null,
                markers: [],
            }
        }
    }
</script>
