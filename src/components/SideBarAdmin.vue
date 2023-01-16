<script setup>
import PPITLogo from '../assets/PPIT.jpg'


</script>

<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4 control-sidebar-push">

        <a href="" class="brand-link">            
            <img :src="PPITLogo" alt="PPIT Logo" class="brand-image elevation-1 ms-3" />
            <span class="brand-text font-weight-light"> PPIT Pendataan</span>
        </a>

        <div
            class="sidebar os-host os-theme-light os-host-overflow os-host-overflow-y os-host-resize-disabled os-host-scrollbar-horizontal-hidden os-host-transition">
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
                                    <a href="#" class="nav-link">
                                        <i class="nav-icon fas fa-tachometer-alt"></i>
                                        <p>
                                            Dashboard
                                        </p>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="pages/widgets.html" class="nav-link">
                                        <i class="nav-icon fas fa-th"></i>
                                        <p>
                                            Students Distribution
                                            <!-- <span class="right badge badge-danger">New</span> -->
                                        </p>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link">
                                        <i class="nav-icon fas fa-city"></i>
                                        <p>
                                            City
                                            <i class="fas fa-angle-left right"></i>
                                            <span class="badge badge-info right"></span>
                                        </p>
                                    </a>
                                    <ul class="nav nav-treeview">
                                        <li class="nav-item">
                                            <a href="pages/layout/top-nav.html" class="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>North Region</p>
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="pages/layout/boxed.html" class="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>East Region</p>
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="pages/layout/fixed-sidebar.html" class="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>South Region</p>
                                            </a>
                                        </li>                                                                                
                                    </ul>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link">
                                        <i class="nav-icon fas fa-university"></i>
                                        <p>
                                            Universities
                                            <i class="right fas fa-angle-left"></i>
                                        </p>
                                    </a>
                                    <ul class="nav nav-treeview">
                                        <li class="nav-item">
                                            <a href="pages/layout/top-nav.html" class="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>North Region</p>
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="pages/layout/boxed.html" class="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>East Region</p>
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="pages/layout/fixed-sidebar.html" class="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>South Region</p>
                                            </a>
                                        </li>         
                                    </ul>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link">
                                        <i class="nav-icon fas fa-user"></i>
                                        <p>
                                            Students
                                            <i class="fas fa-angle-left right"></i>
                                        </p>
                                    </a>
                                    <ul class="nav nav-treeview">
                                        <li class="nav-item">
                                            <a href="pages/layout/top-nav.html" class="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>North Region</p>
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="pages/layout/boxed.html" class="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>East Region</p>
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="pages/layout/fixed-sidebar.html" class="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>South Region</p>
                                            </a>
                                        </li>         
                                    </ul>
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