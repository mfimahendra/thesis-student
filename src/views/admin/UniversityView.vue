<style>
.headerCustom {
  flex-direction: row !important;
  justify-content: space-between !important;
  padding: 10px 15px !important;
}

.dataTables_filter {
  display: none;
}
</style>

<template>
  <MasterLayout />

  <div class="content-wrapper">
    <div class="content-header" style="padding: 15px 8px 0px 8px">
      <div class="card headerCustom">
        <div>
          <h1>University</h1>
        </div>

        <div class="btn-group">
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary"
            @click="getUniversities"
          >
            <i class="fas fa-refresh"></i> Refresh
          </button>
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary"
            data-bs-toggle="modal"
            data-bs-target="#AddUniversityModal"
          >
            <i class="fas fa-plus"></i> Add University
          </button>
        </div>
      </div>
      <div class="card headerCustom">
        <div class="col-3">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="SelectRegionLabel">
                <i class="fa-solid fa-earth-asia"></i>
              </span>
            </div>
            <select
              id="SelectRegion"
              class="form-select"
              placeholder="Select Region ..."
              aria-label="regions"
              @change="selectRegion($event.target.value)"
              aria-describedby="SelectRegionLabel"
            >
              <option selected value="">All Region</option>
              <option v-for="region in regions" :key="region.id" :value="region.region">
                {{ region.region }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-4">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="SearchCityLabel"
                ><i class="fas fa-city"></i
              ></span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="Search City"
              aria-label="Search City"
              aria-describedby="SearchCityLabel"
              @keyup="searchCity($event.target.value)"
            />
          </div>
        </div>
        <div class="col-5">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="SearchUniversityLabel"
                ><i class="fas fa-university"></i
              ></span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="Search University"
              aria-label="Search University"
              aria-describedby="SearchUniversityLabel"
              @keyup="searchUniversity($event.target.value)"
            />
          </div>
        </div>
      </div>
    </div>
    <section class="content">
      <div class="row">
        <div class="col-lg-12">
          <div class="card" style="padding: 10px">
            <div class="table-container"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- MODAL -->
    <div
      class="modal fade"
      id="AddUniversityModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modal-primaryLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add University Modal</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="form-group">
                <label for="add_university">University</label>
                <input
                  type="text"
                  class="form-control"
                  id="add_university"
                  placeholder="Enter University"
                />
              </div>
              <div class="form-group">
                <label for="add_city_id">City</label>
                <select
                  id="add_city_id"
                  class="form-select"
                  placeholder="Select City ..."
                  aria-label="cities"
                  aria-describedby="SelectCitiesLabel"
                >
                  <option selected value="">Select City</option>
                  <option v-for="city in cities" :key="city.id" :value="city.id">
                    {{ city.city }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="latitude">Latitude</label>
                <input
                  type="text"
                  class="form-control"
                  id="add_latitude"
                  placeholder="Enter Latitude"
                />
              </div>
              <div class="form-group">
                <label for="longitude">Longitude</label>
                <input
                  type="text"
                  class="form-control"
                  id="add_longitude"
                  placeholder="Enter Longitude"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">
                Close
              </button>
              <button type="button" class="btn btn-primary" @click="addUniversity()">
                Add university
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- EDIT MODAL -->
    <div
      class="modal fade"
      id="EditUniversityModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modal-primaryLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit University Modal</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col col-sm-12">
                <div class="form-group">
                  <label for="edit_university">University</label>
                  <input
                    type="text"
                    class="form-control"
                    id="edit_university"
                    placeholder="Enter University"
                  />
                </div>
                <div class="form-group">
                  <label for="city">City</label>
                  <select
                    id="edit_city"
                    class="form-select"
                    placeholder="Select City ..."
                    aria-label="cities"
                    aria-describedby="SelectCityLabel"
                  >
                    <option selected value="">Select City</option>
                    <option v-for="city in cities" :key="city.id" :value="city.id">
                      {{ city.city }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="latitude">Latitude</label>
                  <input
                    type="text"
                    class="form-control"
                    id="edit_longitude"
                    placeholder="Enter Latitude"
                  />
                </div>
                <div class="form-group">
                  <label for="longitude">Longitude</label>
                  <input
                    type="text"
                    class="form-control"
                    id="edit_latitude"
                    placeholder="Enter Longitude"
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">
                Close
              </button>
              <button type="button" class="btn btn-primary" @click="addCity()">
                Add City
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MasterLayout from "./Master.vue";

import axios from "axios";
import $ from "jquery";

import { useToast } from "vue-toastification";

import "datatables.net";
import "datatables.net-bs4";
import "datatables.net-buttons";
import "datatables.net-buttons-bs4";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import "datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css";

export default {
  name: "CityView",
  components: {
    MasterLayout,
  },
  setup() {
    const { success, error, info, warning } = useToast();
    return { success, error, info, warning };
  },
  data() {
    return {
      universities: [],
      selected: "",
      regions: [],
      cities: [],
    };
  },
  mounted() {
    this.initTable();
    this.getCities();
    this.getUniversities();
    this.getRegion();

    // $('#tableMaster tbody').on('click', 'tr', function () {
    //     var data = $('#tableMaster').DataTable().row($(this).parents('tr')).data();
    //     console.log(data);
    // });

    $(document).on("click", ".btn-deleteUniversity", (event) => {
      let id = $(event.currentTarget).data("id");
      this.deleteUniversity(id);
    });

    $(document).on("click", ".btnEditModal", function () {
      var id = $(this).data("id");
      var university = $(this).data("university");
      var city = $(this).data("city-id");
      var latitude = $(this).data("latitude");
      var longitude = $(this).data("longitude");

      $("#edit_id").val(id);
      $("#edit_university").val(university);
      $("#edit_city").val(city);
      $("#edit_latitude").val(latitude);
      $("#edit_longitude").val(longitude);
    });
  },
  methods: {
    selectRegion(value) {
      $("#tableMaster").DataTable().columns(4).search(value).draw();
    },
    searchCity(value) {
      $("#tableMaster").DataTable().columns(3).search(value).draw();
    },
    searchUniversity(value) {
      $("#tableMaster").DataTable().columns(1).search(value).draw();
    },
    getRegion() {
      axios
        .get("http://localhost:8000/api/region")
        .then((response) => {
          this.regions = response.data.regions;
          this.regions.forEach((region) => {
            region.value = region.region;
          });
          $("#Loading").hide();
        })
        .catch((error) => {
          this.error(error.response.data.message);
          $("#Loading").hide();
        });
    },
    getCities() {
      $("#Loading").show();
      axios
        .get("http://localhost:8000/api/city")
        .then((response) => {
          this.cities = response.data.cities;
          this.cities.forEach((city) => {
            city.value = city.city;
          });

          this.cities.sort(function (a, b) {
            var nameA = a.city.toUpperCase(); // ignore upper and lowercase
            var nameB = b.city.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
          $("#Loading").hide();
        })
        .catch((error) => {
          this.error(error.response.data.message);
          $("#Loading").hide();
        });
    },
    getUniversities() {
      $("#Loading").show();
      axios
        .get("http://localhost:8000/api/university")
        .then((response) => {
          this.universities = response.data.universities;
          this.universities.forEach((university) => {
            university.value = university.university_name;
          });

          $("#Loading").hide();
          this.success("Universities loaded successfully");
          this.renderTable();
        })
        .catch((error) => {
          this.error(error.response.data.message);
          $("#Loading").hide();
        });
    },
    addUniversity() {
      var university = $("#add_university").val();
      var city = $("#add_city_id").val();
      var latitude = $("#add_latitude").val();
      var longitude = $("#add_longitude").val();

    if (university == "") {
        this.error("Please enter university name");
        return false;
    }
    if (city == "") {
        this.error("Please select city");
        return false;
    }    
    university = university.toUpperCase();

      let data = {
        university_name: university,
        city_id: city,        
        latitude: latitude,
        longitude: longitude,
      };
      axios
        .post("http://127.0.0.1:8000/api/university", data)
        .then((response) => {        
          if (response.data.status == 200) {
            $("#AddUniversityModal").modal("hide");
            this.getUniversities();
            $("#Loading").hide();
            this.success(response.message);
          }
        })
        .catch((error) => {          
          $("#AddUniversityModal").modal("hide");
          $("#Loading").hide();
          this.error(error.response.data.message);
        });
    },
    deleteUniversity(id) {
      if (confirm("Are you sure you want to delete this University?")) {
        axios
          .delete("http://127.0.0.1:8000/api/university/" + id)
          .then((response) => {
            this.success(response.data.message);
            this.getUniversities();
          })
          .catch((error) => {
            this.error(error.response.data.message);
          });
      }
    },

    initTable() {
      let initTable = "";
      initTable += '<table id="tableMaster" class="table table-bordered table-striped">';
      initTable += "<thead>";
      initTable += "<tr>";
      initTable += '<th width="0.1%" style="text-align:center;">No</th>';
      initTable += '<th width="5%">University</th>';
      initTable += '<th width="1%">Students Total</th>';
      initTable += '<th width="5%">City</th>';
      initTable += '<th width="1%">Region</th>';
      initTable += '<th width="1%">#</th>';
      initTable += "</tr>";
      initTable += "</thead>";
      initTable += '<tbody id="bodyTableMaster">';
      initTable += "</tbody>";
      initTable += "</table>";
      $(".table-container").html(initTable);
    },
    renderTable() {
      $("#tableMaster").DataTable().destroy();

      let tableData = "";
      let idx = 1;

      $.each(this.universities, function (index, value) {
        tableData += "<tr>";
        tableData += "<td>" + idx + "</td>";
        tableData += "<td>" + value.university_name + "</td>";
        tableData += "<td style='text-align:center;'>" + value.students_count + "</td>";
        tableData += "<td>" + value.city + "</td>";
        tableData += "<td>" + value.region + "</td>";
        tableData += "<td>";
        tableData += '<div class="btn-group">';
        tableData +=
          '<button class="btnEditModal btn btn-warning" data-id="' +
          value.id +
          '" data-university="' +
          value.university_name +
          '" data-city-id="' +
          value.city_id +
          '" data-longitude="' +
          value.longitude +
          '" data-latitude="' +
          value.latitude +
          '" data-toggle="modal" data-target="#EditUniversityModal"><i class="fas fa-edit"></i></button>';
        tableData +=
          '<button class="btn-deleteUniversity btn btn-danger" data-id="' +
          value.id +
          '"><i class="fas fa-trash"></i></button>';
        tableData += "</div>";
        tableData += "</td>";
        tableData += "</tr>";

        idx++;
      });

      $("#bodyTableMaster").html(tableData);

      $("#tableMaster").DataTable({
        dom: "Bfrtip",
        paging: true,
        autoWidth: true,
        responsive: true,
        lengthChange: true,
        searching: true,
        ordering: true,
        info: true,
        lengthMenu: [
          [10, 25, 50, -1],
          ["10 rows", "25 rows", "50 rows", "Show all"],
        ],
        buttons: [
          {
            extend: "pageLength",
            text: '<i class="fas fa-list"></i> Show',
            className: "btn btn-primary",
            lengthMenu: [
              [10, 25, 50, -1],
              ["10 rows", "25 rows", "50 rows", "Show all"],
            ],
          },
          {
            extend: "colvis",
            text: '<i class="fas fa-columns"></i> Column',
            className: "btn btn-primary",
            exportOptions: {
              columns: [0, 1, 2, 3, 4],
            },
          },
          {
            extend: "copy",
            text: '<i class="far fa-copy"></i> Copy',
            className: "btn btn-primary",
            exportOptions: {
              columns: [0, 1, 2, 3, 4],
            },
          },
          {
            extend: "csv",
            text: '<i class="fas fa-file-excel"></i> Excel',
            title: "Data City",
            header: true,
            className: "btn btn-primary",
            exportOptions: {
              columns: [0, 1, 2, 3, 4],
            },
          },
          {
            extend: "print",
            text: '<i class="fas fa-print"></i> Print',
            className: "btn btn-primary",
            exportOptions: {
              columns: [0, 1, 2, 3, 4],
            },
          },
        ],
      });
    },
    // End of Mounted
  },
};
</script>
