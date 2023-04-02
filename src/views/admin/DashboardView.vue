<style>
.chart_container{
    width: 100%;
    height: 300px;
    z-index: 500;
}

.highcharts-menu {
    z-index: 1000 !important;
}


</style>

<template>
    <MasterLayout />

    <div class="content-wrapper">
        <div class="content-header">
            <div class="container-fluid">

            </div>
        </div>
        <section class="content">
            <div class="row">
                <div class="col-4">
                    <div class="small-box bg-gradient-success">
                        <div class="inner">
                          <h3 id="dashboard_student_data"></h3>
                          <p>Students</p>
                        </div>
                        <div class="icon">
                          <i class="fas fa-user-plus"></i>
                        </div>
                        <a href="/admin/student" class="small-box-footer">
                          More info <i class="fas fa-arrow-circle-right"></i>
                        </a>
                      </div>
                </div>
                <div class="col-4">
                    <div class="small-box bg-gradient-info">
                        <div class="inner">
                          <h3 id="dashboard_city_data"></h3>
                          <p>Cities</p>
                        </div>
                        <div class="icon">
                          <i class="fas fa-city"></i>
                        </div>
                        <a href="/admin/city" class="small-box-footer">
                          More info <i class="fas fa-arrow-circle-right"></i>
                        </a>
                      </div>
                </div>
                <div class="col-4">
                    <div class="small-box bg-gradient-warning">
                        <div class="inner">
                          <h3 id="dashboard_university_data"></h3>
                          <p>Universities</p>
                        </div>
                        <div class="icon">
                          <i class="fas fa-university"></i>
                        </div>
                        <a href="#" class="small-box-footer">
                          More info <i class="fas fa-arrow-circle-right"></i>
                        </a>
                      </div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <div class="chart_container" id="StudentChartContainer"></div>
                </div>
                <div class="col-4">
                    <div class="chart_container" id="CityChartContainer"></div>
                </div>
                <div class="col-4">
                    <div class="chart_container" id="UniversityChartContainer"></div>
                </div>
            </div>            
            
        </section>
    </div>
</template>

<script>
    import MasterLayout from './Master.vue'
    import axios from 'axios';
    import $ from 'jquery';

    var Highcharts = require('highcharts');
    require('highcharts/modules/exporting')(Highcharts);
    require('highcharts/modules/export-data')(Highcharts);
    require('highcharts/modules/accessibility')(Highcharts);

    export default {
        name: "DashboardView",
        components: {
            MasterLayout
        },
        data() {
            return {
                email: '',
                password: '',
                sum_city: 0,
                sum_university: 0,
                sum_alumni: 0,
                sum_student: 0,
                ChartData: [],
            }
        },
        mounted() {
            this.getChartData();
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
            getChartData() {
                axios.get('http://localhost:8000/api/region')
                    .then(response => {
                        console.log(response);
                        this.ChartData = response.data;
                        this.renderChart();
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            renderChart() {

                const chartData = this.ChartData.regions;

                const RegionData = chartData.map((item) => {
                    return item.region;
                });
                const CityData = chartData.map((item) => {
                    return item.cities_count;
                });
                const UniversitiesData = chartData.map((item) => {
                    return item.universities_count;
                });
                const StudentsData = chartData.map((item) => {
                    return item.students_count;
                });

                Highcharts.chart('StudentChartContainer', {
                    data: {
                        table: this.ChartData
                    },                    
                    colors: ['#28a745'],
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Students'
                    },
                    xAxis: {
                        categories: RegionData,
                    },
                    yAxis: {
                        allowDecimals: false,
                        title: {
                            text: ''
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    series: [{
                        name: 'Students',
                        data: StudentsData
                    }]
                });
                Highcharts.chart('CityChartContainer', {
                    data: {
                        table: this.ChartData
                    },                    
                    colors: ['#28a9be'],
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Cities'
                    },
                    xAxis: {
                        categories: RegionData,
                    },
                    yAxis: {
                        allowDecimals: false,
                        title: {
                            text: ''
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    series: [{
                        name: 'Cities',
                        data: CityData
                    }]
                });
                Highcharts.chart('UniversityChartContainer', {
                    data: {
                        table: this.ChartData
                    },
                    chart: {
                        type: 'column'
                    },
                    colors: ['#ffc61a'],
                    title: {
                        text: 'Universities'
                    },
                    xAxis: {
                        categories: RegionData,
                    },
                    yAxis: {
                        allowDecimals: false,
                        title: {
                            text: ''
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    series: [{
                        name: 'Universities',
                        data: UniversitiesData
                    }]
                });
            }
        }
    }
</script>
