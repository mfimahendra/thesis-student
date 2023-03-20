<script setup>
import MasterLayout from './Master.vue'

</script>

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
        <div class="content-header" style="padding: 15px 8px 0px 8px;">
            <div class="card headerCustom">
                <div>
                    <h1>City</h1>                    
                </div>

                <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-success" @click="addModal">
                        <i class="fas fa-plus"></i> Add City
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
                            @change="selectRegion($event.target.value)"
                            aria-describedby="SelectRegionLabel">
                            <option selected value="">All Region</option>
                            <option v-for="region in regions" :key="region.id" :value="region.region">
                                {{region.region}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="col-9">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="SearchCityLabel"><i class="fas fa-city"></i></span>
                        </div>
                        <input type="text" class="form-control" placeholder="Search City" aria-label="Search City"
                            aria-describedby="SearchCityLabel" @keyup="searchCity($event.target.value)">                        
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
import 'datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css';


function editModal(edit_city,edit_region,edit_latitude,edit_longitude){    
    $('#modal-primary').modal('show');
    this.modalTitle = 'Edit City';

    this.modalBody += '<div class="form-group">';
    this.modalBody += '<label for="city">City</label>';
    this.modalBody += '<input type="text" class="form-control" id="edit_city" placeholder="Enter City">';
    this.modalBody += '</div>';
    this.modalBody += '<div class="form-group">';
    this.modalBody += '<label for="region">Region</label>';
    this.modalBody += '<select id="edit_region" class="form-select" placeholder="Select Region ..." aria-label="regions" aria-describedby="SelectRegionLabel">';
    this.modalBody += '<option value="">Select Region</option>';
    this.regions.forEach((region) => {
        if (region.region == edit_region) {
            this.modalBody += '<option value="'+region.region+'" selected>'+region.region+'</option>';
        } else {
            this.modalBody += '<option value="'+region.region+'">'+region.region+'</option>';
        }
    })
    this.modalBody += '</option>';
    this.modalBody += '</select>';
    this.modalBody += '</div>';
    this.modalBody += '<div class="form-group">';
    this.modalBody += '<label for="longitude">Longitude</label>';
    this.modalBody += '<input type="text" class="form-control" id="edit_longitude" placeholder="Enter Longitude" value="'+edit_longitude+'">';
    this.modalBody += '</div>';
    this.modalBody += '<div class="form-group">';
    this.modalBody += '<label for="latitude">Latitude</label>';
    this.modalBody += '<input type="text" class="form-control" id="edit_latitude" placeholder="Enter Latitude" value="'+edit_latitude+'">';
    this.modalBody += '</div>';

    this.modalFooter += '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
    this.modalFooter += '<button type="button" class="btn btn-primary" @click="editCity()">Edit City</button>';

    $('#modal-primary .modal-title').html(this.modalTitle);
    $('#modal-primary .modal-body').html(this.modalBody);
    $('#modal-primary .modal-footer').html(this.modalFooter);

    this.modalTitle = '';
    this.modalBody = [];
    this.modalFooter = [];        
}

export default {
    name: "CityView",
    components: {
        MasterLayout,
    },
    data() {
        return {
            cities: [],
            selected: '',
            regions: [],     
            modalTitle: '',
            modalBody: [],
            modalFooter: []
        }
    },
    mounted() {                                
        this.initTable();
        this.getCities();
        this.getRegion();
    },
    methods: {        
        test() {
            console.log('test');
        },
        addModal() {
            $('#modal-primary').modal('show');     
            this.modalTitle = 'Add City';
            
            this.modalBody += '<div class="form-group">';
            this.modalBody += '<label for="city">City</label>';
            this.modalBody += '<input type="text" class="form-control" id="add_city" placeholder="Enter City">';
            this.modalBody += '</div>';
            this.modalBody += '<div class="form-group">';
            this.modalBody += '<label for="region">Region</label>';
            this.modalBody += '<select id="add_region" class="form-select" placeholder="Select Region ..." aria-label="regions" aria-describedby="SelectRegionLabel">';
            this.modalBody += '<option selected value="">Select Region</option>';            
            this.regions.forEach((region) => {
                this.modalBody += '<option value="'+region.region+'">'+region.region+'</option>';
            })
            this.modalBody += '</option>';
            this.modalBody += '</select>';
            this.modalBody += '</div>';
            this.modalBody += '<div class="form-group">';
            this.modalBody += '<label for="longitude">Longitude</label>';
            this.modalBody += '<input type="text" class="form-control" id="add_longitude" placeholder="Enter Longitude">';
            this.modalBody += '</div>';
            this.modalBody += '<div class="form-group">';
            this.modalBody += '<label for="latitude">Latitude</label>';
            this.modalBody += '<input type="text" class="form-control" id="add_latitude" placeholder="Enter Latitude">';            
            this.modalBody += '</div>';

            this.modalFooter += '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
            this.modalFooter += '<button type="button" class="btn btn-primary" @click="addCity()">Add City</button>';

            $('#modal-primary .modal-title').html(this.modalTitle);
            $('#modal-primary .modal-body').html(this.modalBody);
            $('#modal-primary .modal-footer').html(this.modalFooter);

            this.modalTitle = '';
            this.modalBody = [];
            this.modalFooter = [];            
        },
        editCity() {
            let city = $('#edit_city').val();
            let region = $('#edit_region').val();
            let longitude = $('#edit_longitude').val();
            let latitude = $('#edit_latitude').val();
            let id = $('#edit_id').val();
            let data = {
                city: city,
                region: region,
                longitude: longitude,
                latitude: latitude,
                id: id
            }
            axios.post('http://localhost:8000/api/city/edit', data)
                .then(response => {
                    console.log(response);
                    $('#modal-primary').modal('hide');
                    this.getCities();
                })
                .catch(error => {
                    console.log(error);
                })
        },
        selectRegion(value) {            
            $("#tableMaster").DataTable().columns(4).search(value).draw();
        },
        searchCity(value){                        
            $("#tableMaster").DataTable().search(value).draw();
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
            initTable += '<th width="5%">City</th>';
            initTable += '<th width="0.1%">Universities Total</th>';
            initTable += '<th width="0.1%">Students Total</th>';
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
            axios.get('http://localhost:8000/api/city')
                .then(response => {

                    this.cities = response.data.cities;
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

            $.each(this.cities, function (index, value) {
                tableData += '<tr>';
                tableData += '<td>' + idx + '</td>';
                tableData += '<td>' + value.city + '</td>';
                tableData += '<td style="text-align:center">' + value.universities_count + '</td>';
                tableData += '<td style="text-align:center">' + value.students_count + '</td>';
                tableData += '<td>' + value.region + '</td>';
                tableData += '<td>';
                tableData += '<div class="btn-group">';                
                tableData += '<button class="btn btn-warning" data-toggle="modal" onclick="editModal(\'' + value.city + '\', \'' + value.region + '\', \'' + value.longitude + '\', \'' + value.latitude + '\')"><i class="fas fa-edit"></i></button>';
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