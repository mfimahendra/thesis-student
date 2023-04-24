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
                    <h1>Student</h1>
                </div>

                <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#modal-primary">
                        <i class="fas fa-plus"></i> Add Student
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
                        <select id="SelectRegion" class="form-select" placeholder="Select Region ..." aria-label="regions"
                            @change="selectRegion($event.target.value)" aria-describedby="SelectRegionLabel">
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
                            <span class="input-group-text" id="SearchCityLabel"><i class="fas fa-city"></i></span>
                        </div>
                        <input type="text" class="form-control" placeholder="Search City" aria-label="Search City"
                            aria-describedby="SearchCityLabel" @keyup="searchCity($event.target.value)">
                    </div>
                </div>
                <div class="col-5">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="SearchUniversityLabel"><i class="fas fa-university"></i></span>
                        </div>
                        <input type="text" class="form-control" placeholder="Search University" aria-label="Search University"
                            aria-describedby="SearchUniversityLabel" @keyup="searchUniversity($event.target.value)">
                    </div>
                </div>
            </div>
        </div>
        <section class="content">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card" style="padding:10px;">
                        <div class="table-container">
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

import { useToast } from 'vue-toastification';

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


export default {
    name: "CityView",
    components: {
        MasterLayout,
    },
    setup() {
        const { success, error, info, warning  } = useToast();
        return { success, error , info, warning };
    },
    data() {
        return {
            universities: [],
            selected: '',
            regions: [],
            cities: [],
            student: [],
        }
    },
    mounted() {
        this.initTable();
        this.getCities();
        this.getRegion();
    },
    methods: {        
        selectRegion(value) {            
            $("#tableMaster").DataTable().columns(3).search(value).draw();
        },
        searchCity(value){                        
            $("#tableMaster").DataTable().columns(2).search(value).draw();
        },
        searchUniversity(value){                        
            $("#tableMaster").DataTable().columns(1).search(value).draw();
        },
        getRegion() {
            axios.get('http://localhost:8000/api/region')
                .then(response => {
                    this.regions = response.data.regions;
                    this.regions.forEach((region) => {                        
                        region.value = region.region;
                    })
                    $("#Loading").hide();
                })
                .catch(error => {
                    console.log(error);
                    $("#Loading").hide();
                })

        },
        initTable() {
            let initTable = '';
            initTable += '<table id="tableMaster" class="table table-bordered table-striped">';
            initTable += '<thead>';
            initTable += '<tr>';
            initTable += '<th width="0.1%" style="text-align:center;">No</th>';
            initTable += '<th width="1%">Passport</th>';
            initTable += '<th width="5%">Nama</th>';            
            initTable += '<th width="5%">University</th>';            
            initTable += '<th width="5%">City</th>';            
            initTable += '<th width="1%">Region</th>';
            initTable += '<th width="1%">#</th>';
            initTable += '</tr>';
            initTable += '</thead>';
            initTable += '<tbody id="bodyTableMaster">';
            initTable += '</tbody>';
            initTable += '</table>';
            $('.table-container').html(initTable);
        },
        getCities() {
            $('#Loading').show();
            axios.get('http://localhost:8000/api/student')
                .then(response => {

                    this.student = response.data.students;
                    this.renderTable();
                    $('#Loading').hide();
                })
                .catch(error => {
                    console.log(error);
                    $('#Loading').hide();
                })
        },
        renderTable() {            
            $('#tableMaster').DataTable().destroy();

            let tableData = '';
            let idx = 1;

            $.each(this.student, function (index, value) {
                tableData += '<tr>';
                tableData += '<td>' + idx + '</td>';
                tableData += '<td>' + value.passport + '</td>';
                tableData += '<td>' + value.name + '</td>';                
                tableData += '<td>' + value.university_name + '</td>';                
                tableData += '<td>' + value.city + '</td>';                
                tableData += '<td>' + value.region + '</td>';
                tableData += '<td>';
                tableData += '<div class="btn-group">';
                tableData += '<button class="btn btn-warning" data-toggle="modal" data-target="#modalEdit" data-id="' + value.id + '" data-city="' + value.city + '" data-longitude="' + value.longitude + '" data-latitude="' + value.latitude + '" data-region="' + value.region + '"><i class="fas fa-edit"></i></button>';
                tableData += '<button class="btn btn-danger" data-toggle="modal" data-target="#modalDelete" data-id="' + value.id + '" data-city="' + value.city + '"><i class="fas fa-trash"></i></button>';
                tableData += '</div>';
                tableData += '</td>';
                tableData += '</tr>';

                idx++;
            });

            $('#bodyTableMaster').html(tableData);            

            $('#tableMaster').DataTable({
                'dom': 'Bfrtip',
                'paging': true,
                'autoWidth': true,
                'responsive': true,
                'lengthChange': true,
                'searching': true,
                'ordering': true,
                'info': true,
                lengthMenu: [
                    [10, 25, 50, -1],
                    ['10 rows', '25 rows', '50 rows', 'Show all']
                ],
                'buttons': [
                    {
                        extend: 'pageLength',
                        text: '<i class="fas fa-list"></i> Show',
                        className: 'btn btn-primary',
                        'lengthMenu': [
                            [10, 25, 50, -1],
                            ['10 rows', '25 rows', '50 rows', 'Show all']
                        ],
                    },
                    {
                        extend: 'colvis',
                        text: '<i class="fas fa-columns"></i> Column',
                        className: 'btn btn-primary',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4]
                        }
                    },
                    {
                        extend: 'copy',
                        text: '<i class="far fa-copy"></i> Copy',
                        className: 'btn btn-primary',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4]
                        }
                    },
                    {
                        extend: 'csv',
                        text: '<i class="fas fa-file-excel"></i> Excel',
                        title: 'Data City',
                        header: true,
                        className: 'btn btn-primary',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4]
                        }
                    },
                    {
                        extend: 'print',
                        text: '<i class="fas fa-print"></i> Print',
                        className: 'btn btn-primary',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4]
                        }
                    },                                                            
                ]
            });
        }

        // End of Mounted
    }
}
</script>