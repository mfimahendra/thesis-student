<style>
    .headerCustom {
        flex-direction: row !important;
        justify-content: space-between !important;
        padding: 10px 15px !important;
    }
</style>

<template>
    <MasterLayout />

    <div class="content-wrapper">
        <div class="content-header" style="padding: 15px 8px 0px 8px;">
            <div class="card headerCustom">
                <div>
                    <h1 id="student_name_title"></h1>
                </div>

                <div class="btn-group">
                    <!-- refresh -->
                    <button type="button" class="btn btn-sm btn-outline-secondary" @click="getStudent()">
                        <span><i class="fas fa-sync-alt"></i> Refresh</span>
                    </button>
                    <button type="submit" class="btn btn-sm btn-outline-success" @click="saveStudent()" v-if="isEdit">
                        <span class="btn-save-label"><i class="fas fa-save"></i> Save Student</span>
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-secondary" @click="editStudent()">
                        <span class="btn-edit-label"><i class="fas fa-pencil-alt"></i> Edit Student</span>
                    </button>
                </div>
            </div>
        </div>
        <section class="content">
            <div class="row">
                <div class="col-lg-6">
                    <div class="row" style="padding: 1%;">
                        <div class="card" style="padding:10px;">
                            <h4><i class=" fas fa-user-circle"></i> Personal Information</h4>
                            <br>
                            <div class="form-group">
                                <label for="student_name">Name</label>
                                <input type="text" class="form-control student_field" id="student_name" placeholder="Enter Name" v-model="student.name" disabled>
                            </div>
                            <div class="form-group">
                                <label for="student_passport">Passport</label>
                                <input type="text" class="form-control student_field" id="student_passport" placeholder="Enter Passport" v-model="student.passport" disabled>
                            </div>
                            <div class="form-group">
                                <label for="student_birthday">Birthday</label>
                                <input type="date" class="form-control student_field" id="student_birthday" placeholder="Enter Birthday" v-model="student.birthday" disabled>
                            </div>
                            <div class="form-group">
                                <label for="student_sex">Sex</label>
                                <input type="text" class="form-control student_field" id="student_sex" placeholder="Enter Sex" v-model="student.sex" disabled>
                            </div>
                            <div class="form-group">
                                <label for="student_birthplace">Birthplace</label>
                                <input type="text" class="form-control student_field" id="student_birthplace" placeholder="Enter Birthplace" v-model="student.birthplace" disabled>
                            </div>
                            <div class="form-group">
                                <label for="student_origin">Origin</label>
                                <input type="text" class="form-control student_field" id="student_origin" placeholder="Enter Origin" v-model="student.origin" disabled>
                            </div>
                        </div>
                    </div>
                    <div class="row" style="padding: 1%;">
                        <div class="card" style="padding:10px">
                            <h4><i class=" fas fa-phone"></i> Contact Information</h4>
                            <br>
                            <div class="form-group">
                                <label for="student_wechat_id">Wechat ID</label>
                                <input type="text" class="form-control student_field" id="student_wechat_id" placeholder="Enter Wechat ID" v-model="student.wechat_id" disabled>
                            </div>
                            <div class="form-group">
                                <label for="student_phone">Phone</label>
                                <input type="text" class="form-control student_field" id="student_phone" placeholder="Enter Phone" v-model="student.phone" disabled>
                            </div>
                            <div class="form-group">
                                <label for="student_emergency_phone">Emergency Phone</label>
                                <input type="text" class="form-control student_field" id="student_emergency_phone" placeholder="Enter Emergency Phone" v-model="student.emergency_phone" disabled>
                            </div>
                            <div class="form-group">
                                <label for="student_email">Email</label>
                                <input type="text" class="form-control student_field" id="student_email" placeholder="Enter Email" v-model="student.email" disabled>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="row" style="padding: 1%;">
                        <div class="card" style="padding:10px;">
                            <h4><i class=" fas fa-map"></i> Location</h4>
                            <br>
                            <div class="form-group">
                                <label for="student_region">Region</label>
                                <select class="form-control student_field" id="student_region" v-model="student.region_id" disabled>
                                    <option value="0">Select Region</option>
                                    <option v-for="region in regions" :key="region.id" :value="region.id">
                                        {{ region . region }}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="student_city">City</label>
                                <select class="form-control student_field" id="student_city" v-model="student.city_id" disabled>
                                    <option value="0">Select City</option>
                                    <option v-for="city in cities" :key="city.id" :value="city.id">
                                        {{ city . city }}
                                    </option>
                                </select>
                            </div>
                            <div class="maps-container">
                                <div id="map" style="width: 100%; height: 300px;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="row" style="padding:1%;">
                        <div class="card" style="padding:10px;">
                            <h4><i class=" fas fa-university"></i> Academic Information</h4>
                            <br>
                            <div class="form-group">
                                <label for="student_university">University Name</label>
                                <select class="form-control student_field" id="student_university" v-model="student.university_id" disabled>
                                    <option value="0">Select University</option>
                                    <option v-for="university in universities" :key="university.id" :value="university.id">
                                        {{ university . university_name }}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="student_major">Major</label>
                                <input type="text" class="form-control student_field" id="student_major" placeholder="Enter Major" v-model="student.major" disabled>
                            </div>
                            <div class="form-group">
                                <label for="student_degree">Degree</label>
                                <input type="text" class="form-control student_field" id="student_degree" placeholder="Enter Degree" v-model="student.degree" disabled>
                            </div>
                            <div class="form-group">
                                <label for="student_start_year">Start Year</label>
                                <input type="number" class="form-control student_field" id="student_start_year" placeholder="Enter Start Year" v-model="student.start_year" disabled>
                            </div>
                            <div class="form-group">
                                <label for="student_finish_year">Finish Year</label>
                                <input type="number" class="form-control student_field" id="student_finish_year" placeholder="Enter Finish Year" v-model="student.finish_year" disabled>
                            </div>
                            <!-- 'students.scholarship',
                            'students.scholarship_type',
                            'students.agency',
                            'students.status', -->
                            <div class="form-group">
                                <label for="student_scholarship">Scholarship</label>
                                <input type="text" class="form-control student_field" id="student_scholarship" placeholder="Enter Scholarship" v-model="student.scholarship" disabled>
                            </div>
                            <div class="form-group">
                                <label for="student_scholarship_type">Scholarship Type</label>
                                <input type="text" class="form-control student_field" id="student_scholarship_type" placeholder="Enter Scholarship Type" v-model="student.scholarship_type" disabled>
                            </div>
                            <div class="form-group">
                                <label for="student_agency">Agency</label>
                                <input type="text" class="form-control student_field" id="student_agency" placeholder="Enter Agency" v-model="student.agency" disabled>
                            </div>
                            <div class="form-group">
                                <label for="student_status">Status</label>
                                <select class="form-control student_field" id="student_status" v-model="student.status" disabled>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import MasterLayout from './Master.vue'

    import axios from 'axios';
    import $ from 'jquery';

    import {
        useToast
    } from 'vue-toastification';

    import 'datatables.net';
    import 'datatables.net-bs4';
    import 'datatables.net-buttons';
    import 'datatables.net-buttons-bs4';
    import 'datatables.net-buttons/js/buttons.colVis.js';
    import 'datatables.net-buttons/js/buttons.html5.js';
    import 'datatables.net-buttons/js/buttons.print.js';
    import 'datatables.net-buttons/js/buttons.flash.js';
    import 'datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css';
    import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
    import 'datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css';

    import L from "leaflet";
    import "leaflet/dist/leaflet.css";

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
                warning
            };
        },
        data() {
            return {
                universities: [],
                selected: '',
                regions: [],
                cities: [],
                student: [],
                isEdit: false,
            }
        },
        mounted() {
            this.getStudent();
            this.getRegions();
            this.getCities();
            this.getUniversities();
        },
        methods: {
            getStudent() {
                $("#Loading").show();
                axios.get('/api/student/' + this.$route.params.studentId)
                    .then(response => {
                        this.student = response.data.student;
                        this.plotStudent();
                        this.initMaps();

                        $("#Loading").hide();
                    })
                    .catch(error => {
                        if (error.response.status == 404) {
                            this.error("Student Not Found");
                            this.$router.push({
                                name: "Student",
                            });
                        } else {
                            this.error("Something Went Wrong");
                        }
                        $("#Loading").hide();
                    });
            },
            plotStudent() {
                $('#student_name_title').html(this.student.name);
            },
            editStudent() {
                if ($('.student_field').attr('disabled')) {
                    $('.student_field').removeAttr('disabled');
                    $('.btn-edit-label').html('<i class="fas fa-xmark"></i> Cancel Edit');
                    this.isEdit = true;

                } else {
                    $('.student_field').attr('disabled', 'disabled');
                    $('.btn-edit-label').html('<i class="fas fa-pencil-alt"></i> Edit Student');
                    this.isEdit = false;
                }
            },
            saveStudent() {
                $("#Loading").show();

                axios.put('/api/student/' + this.$route.params.studentId, this.student)
                    .then(response => {
                        this.student = response.data.student;
                        $("#Loading").hide();
                        this.success("Student Updated Successfully");
                        this.getStudent();
                    })
                    .catch(error => {
                        console.log(error);
                        this.error(error);
                        this.error(error.response.data.message);
                        // this.error(error);
                        $("#Loading").hide();
                    });
            },
            initMaps() {
                // cancel if map already init
                if (this.map) {
                    return false;
                }
                this.map = L.map("map").setView([this.student.latitude, this.student.longitude], 7);
                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                }).addTo(this.map);

                var baseLayers = {
                    OpenStreetMap: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                    }),
                    OpenTopoMap: L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
                        attribution: '&copy; <a href="https://www.opentopomap.org/">OpenTopoMap</a> contributors',
                    }),
                };
                L.control.layers(baseLayers).addTo(this.map);

                this.map.zoomControl.setPosition("topright");
                this.map.zoomControl.remove();
                L.control.zoom({
                    position: "topright"
                }).addTo(this.map);

                // add marker
                var marker = L.marker([this.student.latitude, this.student.longitude], {
                    icon: L.icon({
                        iconUrl: require("@/assets/university-marker.png"),
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                    }),
                }).addTo(this.map);
                marker.bindPopup(this.student.name).openPopup();
            },
            getRegions() {
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
            getCities() {
                axios.get('/api/city')
                    .then(response => {
                        this.cities = response.data.cities;
                        this.cities.forEach((city) => {
                            city.value = city.city;
                        });

                        this.cities.sort(function(a, b) {
                            var nameA = a.city.toUpperCase(); // ignore upper and lowercase
                            var nameB = b.city.toUpperCase(); // ignore upper and lowercase
                            if (nameA < nameB) {
                                return -1;
                            }
                            if (nameA > nameB) {
                                return 1;
                            }

                            // names must be equal
                            return 0;
                        });
                    })
                    .catch(error => {
                        this.error(error.response.data.message);
                    });
            },
            getUniversities() {
                $("#Loading").show();
                axios
                    .get("api/university")
                    .then((response) => {
                        this.universities = response.data.universities;
                        this.universities.forEach((university) => {
                            university.value = university.university_name;
                        });

                        $("#Loading").hide();                        
                    })
                    .catch((error) => {
                        this.error(error.response.data.message);
                        $("#Loading").hide();
                    });
            },
        },
    }
</script>
