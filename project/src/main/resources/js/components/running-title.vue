<template>
    <header class="header">
        <b-nav :class="['navbar', isDarkTheme ? 'navbar-dark bg-dark' : 'navbar-light bg-indigo-200']">
            <b-nav-text>Kantorov&Chupanov&Ilinskaya, P34101</b-nav-text>
            <span class="secret">www.youtube.com/watch?v=4TOB3tJIUzE</span>
            <div v-if="isLoggedIn" class="atop">
                <b-button v-b-modal.modalSettings :variant="[isDarkTheme ? 'outline-secondary' : 'light']">Settings</b-button>
                <b-button @click="logout" :variant="[isDarkTheme ? 'outline-secondary' : 'light']">Logout</b-button>
            </div>
            <div v-else class="atop">
                <b-button v-if="isDarkTheme" @click="changeTheme" variant="outline-secondary">Light theme</b-button>
                <b-button v-else @click="changeTheme" variant="light">Dark theme</b-button>
            </div>
        </b-nav>
        <settings/>
    </header>
</template>

<script>
    import {mapActions, mapGetters} from "vuex"
    import Settings from "../components/settings.vue"
    export default {
        name: "running-title",
        components: {Settings},
        computed: {...mapGetters(['isLoggedIn', 'isDarkTheme'])},
        methods: {...mapActions(['logout', 'changeTheme'])}
    }
</script>

<style scoped>
    .secret{
        position: absolute;
        transform: translateX(-50%);
        left: 50%;
        color: transparent;
    }
    .atop{
        z-index: 11;
    }
    .btn-light {
        color: #212529;
        background-color: #c29ffa;
        border-color: #212529;
    }
    .btn-light:focus {
        color: #212529;
        background-color: #c29ffa;
        border-color: #212529;
    }
    .btn-light:hover {
        color: #212529;
        background-color: #e0cffc;
        border-color: #212529;
    }
    .header{
        position: sticky;
        top:0;
        z-index: 10;
    }
</style>
