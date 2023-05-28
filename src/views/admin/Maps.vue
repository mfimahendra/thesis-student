<template>
  <div id="map"></div>
</template>
<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useToast } from "vue-toastification";
import axios from "axios";
import $ from "jquery";

export default {
  name: "MapView",
  components: {},
  setup() {
    const { success, error, info, warning } = useToast();
    return { success, error, info, warning };
  },
  data() {
    return {
      map: "",
      marker: "",
      universities: [],
      cities: [],
    };
  },
  mounted() {
    this.getUniversities();
    this.getCities();    
    this.initMap();
    this.renderIndonesianGeneralMarker();
  },
  created() {},
  methods: {
    initMap() {
      this.map = L.map("map").setView([35.8617, 104.1954], 4);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      var baseLayers = {
        OpenStreetMap: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        }),
        OpenTopoMap: L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.opentopomap.org/">OpenTopoMap</a> contributors',
        }),
      };
      L.control.layers(baseLayers).addTo(this.map);

      this.map.zoomControl.setPosition("topright");
      this.map.zoomControl.remove();
      L.control.zoom({ position: "topright" }).addTo(this.map);
      
      var control = L.control({ position: "topleft" });
      control.onAdd = function () {
        var div = L.DomUtil.create("div", "info legend");
        div.innerHTML += '<i class="fa fa-map-marker" style="color: #f00"></i> City<br>';
        div.innerHTML +=
          '<i class="fa fa-map-marker" style="color: #00f"></i> University<br>';
        return div;
      };
      control.addTo(this.map);            
      
    },
    getCities() {
      $("#Loading").show();
      axios
        .get("http://localhost:8000/api/public/city")
        .then((response) => {
          this.cities = response.data.cities;
          $("#Loading").hide();
          this.renderCityMarker();
        })
        .catch((error) => {
          this.error(error);
          $("#Loading").hide();
        });
    },
    getUniversities() {
      $("#Loading").show();
      axios
        .get("http://localhost:8000/api/public/university")
        .then((response) => {
          this.universities = response.data.universities;
          $("#Loading").hide();
          this.renderUniversityMarker();          
        })
        .catch((error) => {
          this.error(error);
          $("#Loading").hide();
        });
    },
    renderCityMarker() {      
      this.cities.forEach((city) => {        
        this.marker = L.marker([city.latitude, city.longitude], {          
          zIndex: 1000,
          icon: L.icon({
            iconUrl: require("@/assets/marker.png"),
            iconSize: [25, 40],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          }),
        }).addTo(this.map);

        this.marker.bindPopup(
          "<b>" +
            city.city +
            "</b><br>" +
            city.universities_count +
            " Universities<br>" +
            city.students_count +
            " Students"
        );
      });      
      
      this.success("City Rendered Successfully!");
    },
    renderUniversityMarker() {      
      this.universities.forEach((university) => {
        this.marker = L.marker([university.latitude, university.longitude], {
          zIndex: 900,
          icon: L.icon({
            iconUrl: require("@/assets/university-marker.png"),
            iconSize: [12, 20],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          }),
        }).addTo(this.map);
        this.marker.bindPopup(
          "<b>" +
            university.university_name +
            "</b><br>" +
            university.students_count +
            " Students"
        );
      });      
      this.success("University Rendered Successfully!");
    },
    renderIndonesianGeneralMarker() {
      this.marker = L.marker([31.18483, 121.36218], {        
        icon: L.icon({                    
          iconUrl: require("@/assets/indonesia-marker.png"),          
          iconSize: [30, 30],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
      }).addTo(this.map);
      
      this.marker = L.marker([39.91667, 116.38333], {        
        icon: L.icon({                    
          iconUrl: require("@/assets/indonesia-marker.png"),          
          iconSize: [30, 30],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
      }).addTo(this.map);
      this.marker.bindPopup(
        "<b>Embassy of the Republic of Indonesia in Beijing </b><br>" +
          "Address: 1 Dongzhimenwai Dajie, Dongcheng Qu, Beijing Shi, China, 100027<br>" +
          "Phone: +86 10 6532 2000"
      );      
    }
  },
};
</script>
<style>

</style>
