<script setup>
import MasterLayout from './Master.vue'
import axios from 'axios';
import $ from 'jquery';

</script>

<template>
    <MasterLayout />

    <div class="content-wrapper">
        <div class="content-header">
            <div class="container-fluid">
                
            </div>
        </div>
        <section class="content">
            <div class="row">
                <div class="col-lg-5">
                    <div class="row">
                        <div class="col-lg-6 col-6">
                            <div class="small-box bg-info">
                                <div class="inner">
                                    <h3 id="dashboard_city_data">xx</h3>
                                    <p>Cities</p>
                                </div>
                                <div class="icon">
                                    <i class="nav-icon fas fa-city" style="font-size:60px;"></i>
                                </div>
                                <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>

                        <div class="col-lg-6 col-6">
                            <div class="small-box bg-success">
                                <div class="inner">
                                    <h3 id="dashboard_university_data">xx</h3>
                                    <p>Universities</p>
                                </div>
                                <div class="icon">
                                    <i class="nav-icon fas fa-university"></i>
                                </div>
                                <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>

                        <div class="col-lg-6 col-6">
                            <div class="small-box bg-warning">
                                <div class="inner">
                                    <h3>44</h3>
                                    <p>Alumni</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-user-graduate"></i>
                                </div>
                                <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>

                        <div class="col-lg-6 col-6">
                            <div class="small-box bg-danger">
                                <div class="inner">
                                    <h3 id="dashboard_student_data">65</h3>
                                    <p>Students</p>
                                </div>
                                <div class="icon">
                                    <i class="nav-icon fas fa-user"></i>
                                </div>
                                <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="col-lg-7">
                    <div id="mapChartContainer"></div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
var Highcharts = require('highcharts');
require('highcharts/modules/map')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/accessibility')(Highcharts);
require('highcharts/modules/series-label')(Highcharts);
require('highcharts/modules/treemap')(Highcharts);


export default {
    name: "DashboardView",    
    data() {
        return {
            email: '',
            password: '',
            sum_city: 0,
            sum_university: 0,
            sum_alumni: 0,
            sum_student: 0,
        }
    },
    mounted() {
        
    },
    created() {
        this.getTotalSum();
    },
    methods: {
        getTotalSum() {
            axios.get('http://localhost:8000/api/total_resume')
                .then(response => {
                    console.log(response);
                    this.sum_city = response.data.total_city;
                    this.sum_university = response.data.total_university;    
                    this.sum_student = response.data.total_student;
                    $('#dashboard_city_data').html(this.sum_city);
                    $('#dashboard_university_data').html(this.sum_university);
                    $('#dashboard_student_data').html(this.sum_student);
                    
                })
                .catch(error => {
                    console.log(error);
                })
        },
    }
}

</script>