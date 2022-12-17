import Vue from "vue"
import VueRouter from "vue-router"
import Login from "./pages/Login.vue"
import Main from "./pages/Main.vue"

Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: "/main",
        name: "main",
        component: Main
    },
    {
        path: '*', redirect: '/login'
    }
];

const router = new VueRouter({routes});

export default router;
