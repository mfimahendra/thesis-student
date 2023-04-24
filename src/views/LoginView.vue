<template>
    <Loading />    
    <ParticlesBg type="cobweb" bg="{true}" :config="bgConfig" color="#ed1b24" />
    <section class="loginForm vh-100">
        <form @submit.prevent="handleSubmit">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div class="card shadow-2-strong customCard" style="border-radius: 1px;">
                            <div class="card-body p-5 text-center">

                                <h3 class="mb-3" style="font-size: 24px;">Login Admin</h3>

                                <div class="form-outline mb-2">
                                    <input type="email" id="typeEmailX-2" class="form-control form-control-lg"
                                        v-model="email" placeholder="Email" autocomplete="off" />
                                </div>

                                <div class="form-outline mb-4">
                                    <input type="password" id="typePasswordX-2" class="form-control form-control-lg"
                                        v-model="password" placeholder="Password" autocomplete="off" />
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
.canvas {
    background-color: #f3f3f3;
}

.customCard {
    background-color: #f3f3f3;
}
</style>

<script>
import $ from 'jquery';
import { useToast } from 'vue-toastification';  
import Loading from '../components/LoadingSpinner.vue';
import axios from 'axios';
import { ParticlesBg } from "particles-bg-vue";

export default {
    name: 'LoginView',
    components: {
        Loading,
        ParticlesBg
    },    
    setup() {
        const { success, error, info, warning } = useToast();
        return { success, error, info, warning };
    },    
    data() {
        return {
            email: "",
            password: "",
        };
    },    
    mounted() {
        $('#Loading').hide();
    },
    methods: {
        async handleSubmit() {
            $('#Loading').show();
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/login', {
                    email: this.email,
                    password: this.password,
                });

                $('#Loading').hide();
                localStorage.setItem('token', response.data.token);
                this.$router.push('/admin/dashboard');
            } catch (error) {
                $('#Loading').hide();
                this.error('Email or password is wrong!');                
            }
        }
    },
};

</script>