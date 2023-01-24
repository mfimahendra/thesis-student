<script setup>
import axios from 'axios';


</script>

<template>
    <!-- Section: Design Block -->
    <section class="loginForm vh-100">
        <form @submit.prevent="handleSubmit">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div class="card shadow-2-strong customCard" style="border-radius: 1px;">
                            <div class="card-body p-5 text-center">
    
                                <h3 class="mb-3" style="font-size: 24px;">Login Admin</h3>
    
                                <div class="form-outline mb-2">
                                    <input type="email" id="typeEmailX-2" class="form-control form-control-lg" v-model="email" placeholder="Email" autocomplete="off" />                                
                                </div>
    
                                <div class="form-outline mb-4">
                                    <input type="password" id="typePasswordX-2" class="form-control form-control-lg" v-model="password" placeholder="Password" autocomplete="off"/>                                
                                </div>                            
    
                                <button class="btn btn-primary btn-lg btn-block" type="submit">Login</button>
    
                                <hr class="my-2">  
    
                                <router-link class="nav-link" to="/">Back</router-link>
                            </div>                                                
                        </div>                    
                    </div>
                    <div class="spacer"></div>
                </div>
            </div>
        </form>        
    </section>
</template>

<style>
.vh-100 {
    height: 100vh !important;
    background-color: #333;
}

.customCard{
    background-color: #f3f3f3;
}

</style>

<script>
export default {
    name: "LoginView",
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        //login using axios
        async handleSubmit() {            
            const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
                email: this.email,
                password: this.password,                
            });            
            

            sessionStorage.setItem('token', response.data.access_token);

            this.$router.push('/admin/dashboard');
        }
        
    },
};

</script>