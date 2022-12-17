import Vue from 'vue'
import Vuex from 'vuex'
import {auth} from './modules/auth'
import {points} from './modules/points'
import {customization} from './modules/customization'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        auth,
        points,
        customization
    }
})