<script setup>
import Navbar from '../../components/NavBarAdmin.vue'
import Sidebar from '../../components/SideBarAdmin.vue'
import Loading from '../../components/LoadingSpinner.vue';

</script>

<template>
    <Loading />

    <div>
        <Navbar />
        <Sidebar />
    </div>
</template>

<script>
import $ from 'jquery';
import axios from 'axios';

export default {
    name: "MasterLayout",
    components: {
        Navbar,
        Sidebar
    },
    created() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        this.getUser();
    },
    methods: {
        userLogout() {
            
            let data = {
                token: localStorage.getItem('token')
            };

           axios.post('http://localhost:8000/api/logout', data)
            .then(response => {
                response.data;
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                this.$router.push({ name: 'Login' });
            })
            .catch(error => {
                console.log(error);
            });
        },

        getUser() {
            $('#Loading').show();
            axios.get('http://localhost:8000/api/user')
                .then(response => {
                    this.user = response.data;
                    // console.log(this.user.data.name);
                    $("#hi-user").html('');
                    $("#hi-user").append(" " + this.user.data.name);
                    $('#Loading').hide();
                })
                .catch(error => {
                    console.log(error);
                    this.$router.push({ name: 'Login' });
                })
        },
    }
}

</script>