<template>
    <nav class="navbar navbar-expand-md navbar-light bg-light">
        <div class="container-fluid" style="padding: 0 1%;">
            <img src="../assets/PPIT.jpg" alt="PPIT Logo" class="d-inline-block align-text-top ppitlogo">
            <div class="navbar-brand ms-3">
                <span class="row">PPIT Tiongkok</span>                
                <small class="row">在华印尼学生协会</small>
            </div>                        
            <div class="col-6"></div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">HOME</router-link>
                    </li>                    
                    <li class="nav-item">
                        <a class="nav-link" href="#statistic">STATISTIC</a>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/map">STUDENT'S MAP</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/login">LOGIN
                            <i class="fas fa-lock" ></i>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style>
    .ppitlogo {
        width: 50px;
        height: auto;
        object-fit: contain;
    }        

    .navbar-brand{  
      color: #555 !important; 
      font-size: 15px;           
      font-weight: 700;
    }

    .nav-item {
        font-size: 14px;
        font-weight: 600;
    }
</style>

<script>
    export default {
        name: "NavBar",
        data() {
            return {};
        },
        setup() {

        },
        methods: {},
    };
</script>
