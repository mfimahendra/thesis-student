<script setup>
// import axios from 'axios';
import Navbar from '../../components/NavBarAdmin.vue'
import Sidebar from '../../components/SideBarAdmin.vue'

</script>

<template>
    <Navbar />
    <Sidebar />
    <div class="content-wrapper">
        <div class="content-header">
            <div class="container-fluid">
                
            </div>
        </div>
        <section class="content">
            <div class="row">
                <div class="col-lg-4">
                    <div class="row">
                        <div class="col-lg-6 col-6">

                            <div class="small-box bg-info">
                                <div class="inner">
                                    <h3>150</h3>
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
                                    <h3>130</h3>
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
                                    <h3>65</h3>
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
                <div class="col-lg-8">
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



function fetchChart() {

    Highcharts.getJSON('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/world-mortality.json', function (data) {

        var points = [],
            regionP,
            regionVal,
            regionI = 2,
            countryP,
            countryI,
            causeP,
            causeI,
            region,
            country,
            cause,
            causeName = {
                'Communicable & other Group I': 'Communicable diseases',
                'Noncommunicable diseases': 'Non-communicable diseases',
                Injuries: 'Injuries'
            };

        for (region in data) {
            if (Object.hasOwnProperty.call(data, region)) {
                regionVal = 0;
                regionP = {
                    id: 'id_' + regionI,
                    name: region,                    
                    color: Highcharts.getOptions().colors[regionI]

                };
                countryI = 0;
                for (country in data[region]) {
                    if (Object.hasOwnProperty.call(data[region], country)) {
                        countryP = {
                            id: regionP.id + '_' + countryI,
                            name: country,
                            parent: regionP.id
                        };
                        points.push(countryP);
                        causeI = 0;
                        for (cause in data[region][country]) {
                            if (Object.hasOwnProperty.call(
                                data[region][country], cause
                            )) {
                                causeP = {
                                    id: countryP.id + '_' + causeI,
                                    name: causeName[cause],
                                    parent: countryP.id,
                                    value: Math.round(+data[region][country][cause])
                                };
                                regionVal += causeP.value;
                                points.push(causeP);
                                causeI = causeI + 1;
                            }
                        }
                        countryI = countryI + 1;
                    }
                }
                regionP.value = Math.round(regionVal / countryI);
                points.push(regionP);
                regionI = regionI + 1;
            }
        }
        Highcharts.chart('mapChartContainer', {
            series: [{
                name: 'Regions',
                type: 'treemap',                
                layoutAlgorithm: 'squarified',
                allowDrillToNode: true,
                animationLimit: 1000,
                dataLabels: {
                    enabled: false
                },
                levels: [{
                    level: 1,
                    dataLabels: {
                        enabled: true
                    },
                    borderWidth: 3,
                    levelIsConstant: false
                }, {
                    level: 1,
                    dataLabels: {
                        style: {
                            fontSize: '14px'
                        }
                    }
                }],
                accessibility: {
                    exposeAsGroupOnly: true
                },
                data: points
            }],            
            title: {
                text: ' ',
                align: 'left'
            }
        });

    });
}


export default {
    name: "DashboardView",
    mounted() {

    },
    data() {
        return {
            email: '',
            password: '',
        }
    },
    created() {
        fetchChart();
    },
    methods() {

    }
}

</script>