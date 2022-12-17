import axios from 'axios'
import authHeader from "../../auth/auth-header"

export const points = {
    state: {
        data: [],
        r: null
    },
    actions: {
        GET_POINTS({commit}){
            axios.get('/api/points', { headers: authHeader() })
                .then((response) =>{
                    commit('SET_POINTS', response.data)
                }).catch(console.log.bind(console))
        },
        POST_POINTS({commit}, points){
            axios.post('/api/points',
                JSON.stringify(points),
                {headers: {'Content-Type': 'application/json;charset=UTF-8', "Access-Control-Allow-Origin": "*", ...authHeader()}}
            ).then((response) =>{
                commit('ADD_POINTS', response.data)
            }).catch(console.log.bind(console))
        },
        CLEAR({commit}){
            axios.delete('/api/clear', { headers: authHeader() })
                .then(commit('CLEAR_POINTS')).catch(console.log.bind(console))
        },
        DELETE_POINTS({commit}, ids){
            const urlData = '?ids=' + ids.join()
            axios.delete('/api/points' + urlData, { headers: authHeader() })
                .then((response) =>{
                    commit('REMOVE_POINTS', response.data)
                }).catch(console.log.bind(console))
        },
        UPDATE_R({commit}, r){
            commit('SET_R', r)
        },
        RECALCULATED_POINTS({commit}, r){
            return axios.get('/api/points/' + r, { headers: authHeader() })
        }
    },
    mutations: {
        CLEAR_POINTS: (state) => {state.data = []},
        SET_POINTS: (state, points) => {
            state.data = points
        },
        ADD_POINTS: (state, points) => {
            for (let i = 0; i < points.length; i++) {
                points[i].selected = false
                state.data.push(points[i])
            }
        },
        REMOVE_POINTS:(state, ids) => {
            state.data = state.data.filter(point => ids.indexOf(point.id) === -1)
        },
        SET_R: (state, r) => {
            state.r = r
        }
    },
    getters: {
        POINTS(state) {
            return state.data
        },
        R(state){
            return state.r
        }
    }
};