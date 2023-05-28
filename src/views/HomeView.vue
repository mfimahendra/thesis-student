<style>
.canvas {
  background-color: #f3f3f3;
}

.home-title {
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.2;
  color: #333;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.c-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 1rem 0;
  text-align: center;
  padding-bottom: 1%;
  border-bottom: 1px solid #33333355;
}

.btn-service {
  text-align: center;
  padding: 1rem 0;
  cursor: pointer;
}

.btn-service:hover {
  transition: all 0.3s ease-in-out;
  transform: translateY(-2px);
}

.card {
  color: #333;
}

.first-card {
  margin-top: 1rem;
  height: 100%;
}

.second-row-container {
  background-color: #fff;
}

.chart_container {
  height: 300px;
}
</style>

<template>
  <NavBar />
  <ParticlesBg type="cobweb" bg="{true}" :config="bgConfig" color="#ed1b24" />
  <div class="home">
    <div class="container">
      <div class="row">
        <center>
          <h1 class="home-title">Make Sure Your Data is Registered In Our Database</h1>
        </center>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="card first-card">
            <div class="card-body">
              <h5 class="c-title">Data in Total</h5>
              <div class="card-text mt-4">
                <div class="row">
                  <div class="col-4">
                    <div class="small-box bg-gradient-success">
                      <div class="inner">
                        <h3 id="dashboard_student_data">-</h3>
                        <p>Students</p>
                      </div>
                      <div class="icon">
                        <i class="fas fa-user-plus"></i>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="small-box bg-gradient-info">
                      <div class="inner">
                        <h3 id="dashboard_city_data">-</h3>
                        <p>Cities</p>
                      </div>
                      <div class="icon">
                        <i class="fas fa-city"></i>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="small-box bg-gradient-warning">
                      <div class="inner">
                        <h3 id="dashboard_university_data">-</h3>
                        <p>Universities</p>
                      </div>
                      <div class="icon">
                        <i class="fas fa-university"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="card first-card">
            <div class="card-body">
              <h5 class="c-title">Service</h5>
              <div class="card-text mt-4">
                <div class="row">
                  <div class="col-4">
                    <router-link to="/form" class="card">
                      <div class="card-body btn-service">
                        <div class="icon">
                          <i class="fas fa-user-plus"></i>
                        </div>
                        <p class="card-text">Insert Student Data</p>
                      </div>
                    </router-link>
                  </div>
                  <div class="col-4">
                    <div class="card">
                      <div class="card-body btn-service">
                        <div class="icon">
                          <!-- embassy font awesome icon -->
                          <i class="fas fa-university"></i>
                        </div>
                        <p class="card-text">Contact Embassy</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="card">
                      <div class="card-body btn-service">
                        <div class="icon">
                          <i class="fas fa-user-shield"></i>
                        </div>
                        <p class="card-text">Contact Admin</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="container-fluid second-row-container mt-5">
      <div class="container">
        <div class="row" id="statistic">
          <h4 class="mt-3 mb-4 ms-3" style="border-bottom: 1px solid #ddd; padding: 2% 0">
            Data in Statistic
          </h4>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="chart_container" id="HomeStudentChartContainer"></div>
          </div>
          <div class="col-4">
            <div class="chart_container" id="HomeCityChartContainer"></div>
          </div>
          <div class="col-4">
            <div class="chart_container" id="HomeUniversityChartContainer"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import axios from "axios";
import $ from "jquery";

var Highcharts = require("highcharts");
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/export-data")(Highcharts);
require("highcharts/modules/accessibility")(Highcharts);

import { ParticlesBg } from "particles-bg-vue";

export default {
  name: "HomeView",
  components: {
    NavBar,
    ParticlesBg,
  },
  bgConfig: {},
  setup() {},
  data() {
    return {
      sum_city: 0,
      sum_university: 0,
      sum_alumni: 0,
      sum_student: 0,
      ChartData: [],
    };
  },
  mounted() {
    this.getTotalSum();
    this.getChartData();
  },
  created() {},
  methods: {
    getTotalSum() {
      axios
        .get("http://localhost:8000/api/public/total_resume")
        .then((response) => {
          console.log(response);
          this.sum_city = response.data.total_city;
          this.sum_university = response.data.total_university;
          this.sum_student = response.data.total_student;
          $("#dashboard_city_data").html(this.sum_city);
          $("#dashboard_university_data").html(this.sum_university);
          $("#dashboard_student_data").html(this.sum_student);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getChartData() {
      axios
        .get("http://localhost:8000/api/public/region")
        .then((response) => {
          console.log(response);
          this.ChartData = response.data;
          this.renderChart();
        })
        .catch((error) => {
          console.log(error);
        });
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
      // const StudentsData = chartData.map((item) => {
      //     return item.students_count;
      // });

      const StudentsData = chartData.map((item) => {
        return {
          name: item.region,
          y: item.students_count,
        };
      });

      Highcharts.chart("HomeStudentChartContainer", {
        data: {
          table: this.ChartData,
        },
        chart: {
          type: "pie",
        },
        colors: ["#90ED7D", "#E4D354", "#F45B5B", "#91E8E1"],
        title: {
          text: "Students",
        },
        // xAxis: {
        //     categories: RegionData,
        // },
        // yAxis: {
        //     allowDecimals: false,
        //     title: {
        //         text: ''
        //     }
        // },
        accessibility: {
          point: {
            valueSuffix: "%",
          },
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.percentage:.1f} %",
            },
          },
        },

        legend: {
          enabled: false,
        },
        series: [
          {
            name: "Students",
            data: StudentsData,
          },
        ],
      });
      Highcharts.chart("HomeCityChartContainer", {
        data: {
          table: this.ChartData,
        },
        chart: {
          type: "column",
        },
        colors: [
          "#F7A35C",
          "#90ED7D",
          "#8085E9",
          "#F15C80",
          "#E4D354",
          "#2B908F",
          "#F45B5B",
          "#91E8E1",
        ],
        title: {
          text: "Cities",
        },
        xAxis: {
          categories: RegionData,
        },
        yAxis: {
          allowDecimals: false,
          title: {
            text: "",
          },
        },
        legend: {
          enabled: false,
        },
        series: [
          {
            name: "Cities",
            colorByPoint: true,
            data: CityData,
          },
        ],
      });
      Highcharts.chart("HomeUniversityChartContainer", {
        data: {
          table: this.ChartData,
        },
        chart: {
          type: "column",
        },
        colors: [
          "#434348",
          "#8085E9",
          "#F15C80",
          "#E4D354",
          "#2B908F",
          "#F45B5B",
          "#91E8E1",
        ],
        title: {
          text: "Universities",
        },
        xAxis: {
          categories: RegionData,
        },
        yAxis: {
          allowDecimals: false,
          title: {
            text: "",
          },
        },
        legend: {
          enabled: false,
        },
        series: [
          {
            name: "Universities",
            colorByPoint: true,
            data: UniversitiesData,
          },
        ],
      });
    },
  },
};
</script>
