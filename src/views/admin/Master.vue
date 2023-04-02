<script setup>
import Navbar from "../../components/NavBarAdmin.vue";
import Sidebar from "../../components/SideBarAdmin.vue";
import Loading from "../../components/LoadingSpinner.vue";
import Modal from "../../components/ModalAdmin.vue";

</script>

<template>
    <Loading />
    <Modal />

    <div>
        <Navbar />
        <Sidebar />
    </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";

export default {
    name: "MasterLayout",
    components: {
        Navbar,
        Sidebar,
    },    
    data() {
        return {
            user: "",
        };
    },
    created() {
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("token");
        this.getUser();
    },
    mounted() {
        
    },
    methods: {
        getUser() {
            $("#Loading").show();
            axios
                .get("http://localhost:8000/api/user")
                .then((response) => {
                    this.user = response.data;
                    localStorage.setItem("user", JSON.stringify(this.user));
                    $("#hi-user").html("");
                    $("#hi-user").append(" " + this.user.data.name);
                    $("#Loading").hide();
                })
                .catch((error) => {
                    console.log(error);
                    this.$router.push({
                        name: "Login"
                    });
                });
        },
    },
};
</script>


<style>

</style>