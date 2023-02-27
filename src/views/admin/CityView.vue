<script setup>
import Navbar from '../../components/NavBarAdmin.vue'
import Sidebar from '../../components/SideBarAdmin.vue'

</script>

<template>
    <Navbar />
    <Sidebar />

    <div class="content-wrapper">
        <div class="content-header">
            <div class="container-fluid">
                <h1>City</h1>
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
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-buttons';
import 'datatables.net-buttons-bs4';
import 'datatables.net-buttons/js/buttons.colVis.js';
import 'datatables.net-buttons/js/buttons.html5.js';
import 'datatables.net-buttons/js/buttons.print.js';
import 'datatables.net-buttons/js/buttons.flash.js';
import 'datatables.net-buttons/js/buttons.colVis.js';
import 'datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css';



export default {
    name: "CityView",
    components: {
        Navbar,
        Sidebar
    },
    data() {
        return {
            cities: []
        }
    },
    mounted() {
        this.initTable();
        this.getCities();
    },
    methods: {
        initTable() {
            let initTable = ''

            initTable += '<table id="tableMaster" class="table table-bordered table-striped">'
            initTable += '<thead>'
            initTable += '<tr>'
            initTable += '<th width="0.1%" style="text-align:center;">No</th>'
            initTable += '<th width="5%">City</th>'
            initTable += '<th width="1%">Longitude</th>'
            initTable += '<th width="1%">Latitude</th>'
            initTable += '<th width="1%">Region</th>'            
            initTable += '<th width="1%">#</th>'            
            initTable += '</tr>'
            initTable += '</thead>'
            initTable += '<tbody id="bodyTableMaster">'
            initTable += '</tbody>'            
            initTable += '</table>'
            $('.table-container').html(initTable);
        },
        getCities() {
            axios.get('http://localhost:8000/api/city')
                .then(response => {
                    this.cities = response.data.cities;
                    this.renderTable();
                })
                .catch(error => {
                    console.log(error);
                })
        },
        renderTable() {
            $('#tableMaster').DataTable().destroy();

            let tableData = '';
            let idx = 1;

            $.each(this.cities, function (index, value) {
                tableData += '<tr>';
                tableData += '<td>' + idx + '</td>';
                tableData += '<td>' + value.city + '</td>';
                tableData += '<td>' + value.longitude + '</td>';
                tableData += '<td>' + value.latitude + '</td>';
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
    }


}
</script>