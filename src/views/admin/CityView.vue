<style>
    .headerCustom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        padding: 10px;
    }

    .dataTables_filter {
        display: none;
    }         
</style>

<template>
    <MasterLayout />

    <div class="content-wrapper">
        <div class="content-header" style="padding: 15px 8px 0px 8px">
            <div class="card">
                <div class="row" style="padding: 10px 15px">
                    <div class="col-1">
                        <h1>City</h1>
                    </div>
                    <div class="col-5"></div>
                    <div class="col-6 text-end">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary" @click="getCities">
                                <i class="fas fa-refresh"></i> Refresh
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#AddCityModal">
                                <i class="fas fa-plus"></i> Add City
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div id="CityChartContainer"></div>
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
                        <select id="SelectRegion" class="form-select" placeholder="Select Region ..." aria-label="regions" @change="selectRegion($event.target.value)" aria-describedby="SelectRegionLabel">
                            <option selected value="">All Region</option>
                            <option v-for="region in regions" :key="region.id" :value="region.id">
                                {{ region . region }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="col-9">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="SearchCityLabel"><i class="fas fa-city"></i></span>
                        </div>
                        <input type="text" class="form-control" placeholder="Search City" aria-label="Search City" aria-describedby="SearchCityLabel" @keyup="searchCity($event.target.value)" />
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
        <div class="modal fade" id="AddCityModal" tabindex="-1" role="dialog" aria-labelledby="modal-primaryLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add City Modal</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="form-group">
                                <label for="city">City</label>
                                <input type="text" class="form-control" id="add_city" placeholder="Enter City" />
                            </div>
                            <div class="form-group">
                                <label for="region">Region</label>
                                <select id="add_region" class="form-select" placeholder="Select Region ..." aria-label="regions" aria-describedby="SelectRegionLabel">
                                    <option selected value="">Select Region</option>
                                    <option v-for="region in regions" :key="region.id" :value="region.id">
                                        {{ region . region }}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="longitude">Longitude</label>
                                <input type="text" class="form-control" id="add_longitude" placeholder="Enter Longitude" />
                            </div>
                            <div class="form-group">
                                <label for="latitude">Latitude</label>
                                <input type="text" class="form-control" id="add_latitude" placeholder="Enter Latitude" />
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

        <!-- EDIT MODAL -->
        <div class="modal fade" id="EditCityModal" tabindex="-1" role="dialog" aria-labelledby="modal-primaryLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit City Modal</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">                            
                            <div class="col col-sm-9 edit_city_map_container" id="editCityMap">                                                                        
                            </div>                            
                            <div class="col col-sm-3">
                                <div class="form-group">
                                    <label for="city">City</label>
                                    <input type="text" class="form-control" id="edit_city" placeholder="Enter City" />
                                </div>
                                <div class="form-group">
                                    <label for="region">Region</label>
                                    <select id="edit_region" class="form-select" placeholder="Select Region ..." aria-label="regions" aria-describedby="SelectRegionLabel">
                                        <option selected value="">Select Region</option>
                                        <option v-for="region in regions" :key="region.id" :value="region.id">
                                            {{ region . region }}
                                        </option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="longitude">Longitude</label>
                                    <input type="text" class="form-control" id="edit_latitude" placeholder="Enter Longitude" />
                                </div>
                                <div class="form-group">
                                    <label for="latitude">Latitude</label>
                                    <input type="text" class="form-control" id="edit_longitude" placeholder="Enter Latitude" />
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

        <!-- END OF TEMPLATE -->
    </div>
</template>

<script>
    import MasterLayout from "./Master.vue";
    import L from "leaflet";
    import "leaflet/dist/leaflet.css";
    import axios from "axios";
    import $ from "jquery";

    import {
        useToast
    } from "vue-toastification";

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

    var Highcharts = require("highcharts");
    require("highcharts/modules/exporting")(Highcharts);
    require("highcharts/modules/export-data")(Highcharts);
    require("highcharts/modules/accessibility")(Highcharts);    
    

    export default {
        name: "CityView",
        components: {
            MasterLayout,
        },
        setup() {
            const {
                success,
                error,
                info,
                warning
            } = useToast();
            return {
                success,
                error,
                info,
                warning,
            };
        },
        data() {
            return {
                cities: [],
                selected: "",
                regions: [],
                modalTitle: "",
                modalBody: [],
                modalFooter: [],
                editCityMap: '',
                marker: '',
            };
        },
        mounted() {
            this.initTable();
            this.getCities();
            this.getRegion();       
            this.initEditMap();             
            
            window.vueMethod = this;

            $("#modal-primary").modal("hide");

            $(document).on("click", ".btn-deleteCity", (event) => {
                let id = $(event.currentTarget).data("id");
                this.deleteCity(id);
            });            

            $(document).on('click', '.btnEditModal', function() {
                var id = $(this).data('id');
                var city = $(this).data('city');
                var region = $(this).data('region-id');
                var latitude = $(this).data('latitude');
                var longitude = $(this).data('longitude');
                console.log(id, city, region, latitude, longitude);

                $('#edit_id').val(id);
                $('#edit_city').val(city);
                $('#edit_region').val(region);
                $('#edit_latitude').val(latitude);
                $('#edit_longitude').val(longitude);         

                var vueMethod = window.vueMethod;                                                

                vueMethod.updateCityMap();   

            });            

        },
        methods: {
            test() {
                this.info("Welcome to City Page");
            },            
            addCity() {
                var city = $("#add_city").val();
                var region = $("#add_region").val();
                var latitude = $("#add_latitude").val();
                var longitude = $("#add_longitude").val();

                let data = {
                    city: city,
                    region_id: region,
                    latitude: latitude,
                    longitude: longitude,
                };
                axios
                    .post("/api/city", data)
                    .then((response) => {
                        $("#Loading").show();
                        if (response.status == "success") {
                            $("#AddCityModal").modal("hide");
                            this.getCities();
                            $("#Loading").hide();
                            this.success(response.message);
                        }
                    })
                    .catch((error) => {                        
                        $("#AddCityModal").modal("hide");
                        $("#Loading").hide();
                        this.error(error.response.data.message);
                    });
            },
            editCity() {
                let city = $("#edit_city").val();
                let region = $("#edit_region").val();
                let longitude = $("#edit_longitude").val();
                let latitude = $("#edit_latitude").val();
                let id = $("#edit_id").val();
                let data = {
                    city: city,
                    region: region,
                    longitude: longitude,
                    latitude: latitude,
                    id: id,
                };
                axios
                    .patch("http://127.0.0.1:8000/api/city/", data)
                    .then((response) => {
                        console.log(response);
                        $("#modal-primary").modal("hide");
                        this.getCities();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            deleteCity(id) {
                if (confirm("Are you sure you want to delete this city?")) {
                    axios
                        .delete("http://127.0.0.1:8000/api/city/" + id)
                        .then((response) => {
                            this.success(response.message);
                            this.getCities();
                        })
                        .catch((error) => {
                            this.error(error.data.message);
                        });
                }
            },
            selectRegion(value) {
                $("#tableMaster").DataTable().columns(4).search(value).draw();
            },
            searchCity(value) {
                $("#tableMaster").DataTable().search(value).draw();
            },
            getRegion() {
                axios
                    .get("/api/region")
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
            initEditMap(){
                this.editCityMap = L.map('editCityMap').setView([35.8617, 104.1954], 7);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(this.editCityMap);                
            },
            updateCityMap(){
                let latitude = $("#edit_latitude").val();
                let longitude = $("#edit_longitude").val();
                this.editCityMap.setView([latitude, longitude], 7);
                if(this.marker != ''){
                    this.editCityMap.removeLayer(this.marker);
                }                
                                    
                this.marker = L.marker([latitude, longitude], {                    
                    icon: L.icon({
                        iconUrl: require("@/assets/marker.png"),
                        iconSize: [25, 40],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41],
                    })
                    // icon: L.icon
                }).addTo(this.editCityMap);                
            },
            initTable() {
                let initTable = "";
                initTable += '<table id="tableMaster" class="table table-bordered table-striped">';
                initTable += "<thead>";
                initTable += "<tr>";
                initTable += '<th width="0.1%" style="text-align:center;">No</th>';
                initTable += '<th width="5%">City</th>';
                initTable += '<th width="0.1%">Universities Total</th>';
                initTable += '<th width="0.1%">Students Total</th>';
                initTable += '<th width="1%">Region</th>';
                initTable += '<th width="1%">#</th>';
                initTable += "</tr>";
                initTable += "</thead>";
                initTable += '<tbody id="bodyTableMaster">';
                initTable += "</tbody>";
                initTable += "</table>";
                $(".table-container").html(initTable);
            },
            getCities() {
                $("#Loading").show();
                axios
                    .get("http://localhost:8000/api/city")
                    .then((response) => {
                        this.cities = response.data.cities;
                        this.renderTable();
                        this.cityChart();
                        $("#Loading").hide();
                        this.success("City Loaded Successfully");
                    })
                    .catch((error) => {
                        console.log(error);
                        $("#Loading").hide();
                    });
            },
            renderTable() {
                $("#tableMaster").DataTable().destroy();

                let tableData = "";
                let idx = 1;

                $.each(this.cities, function(index, value) {
                    tableData += "<tr>";
                    tableData += "<td>" + idx + "</td>";
                    tableData += "<td>" + value.city + "</td>";
                    tableData +=
                        '<td style="text-align:center">' + value.universities_count + "</td>";
                    tableData += '<td style="text-align:center">' + value.students_count + "</td>";
                    tableData += "<td>" + value.region + "</td>";
                    tableData += "<td>";
                    tableData += '<div class="btn-group">';
                    tableData +=
                        '<button class="btnEditModal btn btn-warning" data-id="' +
                        value.id +
                        '" data-city="' +
                        value.city +
                        '" data-region-id="' +
                        value.region_id +
                        '" data-region="' +
                        value.region +
                        '" data-longitude="' +
                        value.longitude +
                        '" data-latitude="' +
                        value.latitude +
                        '" data-toggle="modal" data-target="#EditCityModal"><i class="fas fa-edit"></i></button>';
                    tableData +=
                        '<button class="btn-deleteCity btn btn-danger" data-id="' +
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
                    buttons: [{
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
            cityChart() {
                const chartData = this.cities;

                const CityData = chartData.map((item) => {
                    return item.city;
                });

                const StudentData = chartData.map((item) => {
                    return item.students_count;
                });

                const UniversityData = chartData.map((item) => {
                    return item.universities_count;
                });

                Highcharts.chart("CityChartContainer", {
                    data: {
                        table: this.cities,
                    },
                    colors: ["#28a9be", "#f7a35c"],
                    chart: {
                        type: "column",
                    },
                    plotOptions: {
                        column: {
                            stacking: 'normal'
                        }
                    },
                    title: {
                        text: "",
                    },
                    xAxis: {
                        categories: CityData,
                    },
                    yAxis: {
                        allowDecimals: false,
                        title: {
                            text: "",
                        },
                    },
                    legend: {
                        enabled: true,
                    },
                    series: [
                        {
                            name: "Students",
                            data: StudentData,
                        },
                        {
                            name: "Universities",
                            data: UniversityData,
                        },                        
                    ],
                });
            },

            // End of Mounted
        },
    };
</script>
