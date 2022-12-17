import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from 'pages/App.vue'
import router from "./router"
import {store} from "./store/index"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(BootstrapVue)

new Vue({
    render: a => a(App), store, router
}).$mount("#app");