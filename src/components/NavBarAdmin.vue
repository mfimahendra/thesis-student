<script setup>
import $ from 'jquery';

</script>

<template>
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
            <li class="nav-item">
                <a id="toggle-sidebar" class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
                <a href="#" onclick="history.back()" class="nav-link"><font-awesome-icon icon="fas fa-chevron-left" /></a>
            </li>            
            <li class="nav-item d-none d-sm-inline-block">
                <a href="#" onclick="history.forward()" class="nav-link"><font-awesome-icon icon="fas fa-chevron-right" /></a>
            </li>            
        </ul>

        <!-- SEARCH FORM -->
        <div class="form-inline ml-3">
            <div class="input-group input-group-sm">
                <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
                <div class="input-group-append">
                    <button class="btn btn-navbar">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
        
        <ul class="navbar-nav ml-auto">                              
            <li class="nav-item dropdown">
                <a class="nav-link" data-toggle="dropdown" href="#">
                    <i class="far fa-user-circle"></i>                    
                </a>
                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                    <span class="dropdown-header">Users</span>
                    <div class="dropdown-divider"></div>                    
                    <a href="#" class="dropdown-item dropdown-footer">Setting</a>
                    <div class="dropdown-divider"></div>
                    <a href="#" @click="userLogout" class="dropdown-item dropdown-footer">Log Out</a>
                </div>
            </li>       
        </ul>
    </nav>
</template>

<script>
$("#toggle-sidebar").ControlSidebar('toggle');

export default{
    methods: {
        userLogout() {
            console.log("userLogout");
            $.ajax({
                url: 'http://localhost:8080/api/logout',
                type: 'POST',
                success: function (data) {
                    console.log(data);
                    this.$router.push({ name: 'Login' });
                },
                error: function (data) {
                    console.log(data);
                }
            });
        }
    }
}
</script>