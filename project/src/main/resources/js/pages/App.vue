<template>
    <div id="app" :class="['app', isDarkTheme ? 'bg-gray-700' : 'bg-indigo-100']">
        <running-title/>
        <router-view/>
    </div>
</template>

<script>
    import runningTitle from '../components/running-title.vue'
    import {mapGetters} from 'vuex'

    export default {
        name: "App",
        components: {runningTitle},
        computed: {...mapGetters(['isDarkTheme'])}
    }
</script>

<style>
    body, html {
        width: 100%;
        height: 100%;
    }
    .app{
        min-width: 100%;
        min-height: 100%;
        position: relative;
    }
    .bg-gray-700{
        background-color: #495057;
    }
    .bg-gray-900{
        background-color: #212529;
    }
    .bg-indigo-100{
        background-color: #e0cffc;
    }
    .bg-indigo-200{
        background-color: #c29ffa;
    }
    .bg-indigo-300{
        background-color: #a370f7;
    }
</style>