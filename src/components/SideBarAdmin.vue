<script setup>
import PPITLogo from '../assets/PPIT.jpg'


</script>

<style>
.main-sidebar {
    position: fixed !important;
    top: 0;
    left: 0;
    z-index: 10000;
    height: 100vh !important;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #343a40;
    transition: all 0.3s ease-in-out;
}

</style>

<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4 control-sidebar-push">

        <router-link to="/" class="brand-link">            
            <img :src="PPITLogo" alt="PPIT Logo" class="brand-image elevation-1 ms-3" />
            <span class="brand-text font-weight-light"> PPIT Pendataan</span>
        </router-link>

        <div
            class="sidebar os-host os-theme-light os-host-resize-disabled os-host-transition">
            <div class="os-resize-observer-host observed">
                <div class="os-resize-observer" style="left: 0px; right: auto;"></div>
            </div>
            <div class="os-size-auto-observer observed" style="height: calc(100% + 1px); float: left;">
                <div class="os-resize-observer"></div>
            </div>
            <div class="os-content-glue" style="margin: 0px -8px; width: 249px; height: 520px;"></div>
            <div class="os-padding">
                <div class="os-viewport os-viewport-native-scrollbars-invisible" style="overflow-y: scroll;">
                    <div class="os-content" style="padding: 0px 8px; height: 100%; width: 100%;">

                        <nav class="mt-2">
                            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                                data-accordion="false">
                                <li class="nav-item">
                                    <router-link to="/admin/dashboard" class="nav-link">
                                        <i class="nav-icon fas fa-tachometer-alt"></i>
                                        <p>
                                            Dashboard
                                        </p>
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link to="/admin/map" class="nav-link">
                                        <i class="nav-icon fas fa-map-marked-alt"></i>
                                        <p>
                                            Map
                                        </p>
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link to="/admin/city" class="nav-link">
                                        <i class="nav-icon fas fa-city"></i>
                                        <p>
                                            Cities                                            
                                        </p>
                                    </router-link>
                                </li>                                                                                                                                                                
                                <li class="nav-item">
                                    <router-link to="/admin/university" class="nav-link">
                                        <i class="nav-icon fas fa-university"></i>
                                        <p>
                                            Universities                                    
                                        </p>
                                    </router-link>
                                </li>                                                                                                                                                                
                                <li class="nav-item">
                                    <router-link to="/admin/student" class="nav-link">
                                        <i class="nav-icon fas fa-user"></i>
                                        <p>
                                            Students
                                            
                                        </p>
                                    </router-link>
                                </li>                                                                                                                                                                
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <div class="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable os-scrollbar-auto-hidden">
                <div class="os-scrollbar-track">
                    <div class="os-scrollbar-handle" style="width: 100%; transform: translate(0px, 0px);"></div>
                </div>
            </div>
            <div class="os-scrollbar os-scrollbar-vertical os-scrollbar-auto-hidden">
                <div class="os-scrollbar-track">
                    <div class="os-scrollbar-handle" style="height: 42.5313%; transform: translate(0px, 0px);"></div>
                </div>
            </div>
            <div class="os-scrollbar-corner"></div>
        </div>

    </aside>
</template>

<script>
document.body.className += ' sidebar-mini';
</script>