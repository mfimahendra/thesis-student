<template>
    <nav class="navbar-light bg-light">
        <div class="container-fluid" style="padding: 10px 15px">
            <div class="row">
                <div class="col-1">                                        
                    <center>
                      <img src="../assets/PPIT.jpg" alt="PPIT Logo" class="d-inline-block align-text-top ppitlogo">
                    </center>            
                </div>
                <div class="col-1">
                    <div class="navbar-brand">
                        <div class="row">
                            <span>PPIT Tiongkok</span>
                        </div>
                        <div class="row">
                            <small>在华印尼学生协会</small>
                        </div>
                    </div>
                </div>
                <div class="col-10"></div>
            </div>            
        </div>
        <div class="navbar navbar-expand-md">
            <div class="container-fluid" style="padding: 0 1%;">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/">HOME</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/about">ABOUT</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/statistic">STATISTIC</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/map">STUDENT'S MAP</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/login">LOGIN
                                <i class="fas fa-lock"></i>
                            </router-link>
                        </li>
                    </ul>                    
                </div>
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

    .navbar-brand span{        
        font-size: 1.2rem;
        font-weight: 600;
        line-height: 1.2;
        color: #333;
    }

    .navbar-brand small{                         
        color: #333;
    }

    .nav-item{
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
