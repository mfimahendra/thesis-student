<style>
#Loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 10, 40, 0.6);
    z-index: 20000;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: 3s ease-in-out infinite;
}

.spinner-border {
    width: 3rem;
    height: 3rem;
    border-width: 0.25rem;
    color: #fff;
    transform: 3s ease-in-out infinite;    
}

.loadingLabel {
    font-size: 1.5rem;
    color: #fff;
    margin-left: 1rem;
}

</style>

<template>
    <div id="Loading">
        <div class="spinner-border" role="status">
            <span class="visually-hidden"></span>            
        </div>        
        <span class="loadingLabel"> Loading . . .</span>    
    </div>
</template>