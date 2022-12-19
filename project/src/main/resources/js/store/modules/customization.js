import Customization from '../../auth/customization'

const settings = JSON.parse(localStorage.getItem('settings'))
const defaultSettings = new Customization(true, 10,'#b8daff', '#000000', '#ff140d', '#dee2e6')

const initialState = settings ? settings : defaultSettings

export const customization = {
    state: initialState,
    actions: {
        changeTheme({commit}){commit('setThemeColor')},
        changeNumberOfRowInTable({commit}, number){commit('setNumberOfRowInTable', number)},
        changeAreaColor({commit}, color){commit('setAreaColor', color)},
        changeHitColor({commit}, color){commit('setHitColor', color)},
        changeMissColor({commit}, color){commit('setMissColor', color)},
        changeBackgroundColor({commit}, color){commit('setBackgroundColor', color)},
    },
    mutations: {
        setThemeColor(state){
            state.isDarkTheme = !state.isDarkTheme
            localStorage.setItem('settings', JSON.stringify(new Customization(
            state.isDarkTheme, state.numberOfRowInTable,
            state.areaColor, state.hitColor, state.missColor, state.backgroundColor)))
        },
        setNumberOfRowInTable(state, number){
            state.numberOfRowInTable = number
            localStorage.setItem('settings', JSON.stringify(new Customization(
                state.isDarkTheme, state.numberOfRowInTable,
                state.areaColor, state.hitColor, state.missColor, state.backgroundColor)))
        },
        setAreaColor(state, color){
            state.areaColor = color
            localStorage.setItem('settings', JSON.stringify(new Customization(
                state.isDarkTheme, state.numberOfRowInTable,
                state.areaColor, state.hitColor, state.missColor, state.backgroundColor)))
        },
        setHitColor(state, color){
            state.hitColor = color
            localStorage.setItem('settings', JSON.stringify(new Customization(
                state.isDarkTheme, state.numberOfRowInTable,
                state.areaColor, state.hitColor, state.missColor, state.backgroundColor)))
        },
        setMissColor(state, color){
            state.missColor = color
            localStorage.setItem('settings', JSON.stringify(new Customization(
                state.isDarkTheme, state.numberOfRowInTable,
                state.areaColor, state.hitColor, state.missColor, state.backgroundColor)))
        },
        setBackgroundColor(state, color){
            state.backgroundColor = color
            localStorage.setItem('settings', JSON.stringify(new Customization(
                state.isDarkTheme, state.numberOfRowInTable,
                state.areaColor, state.hitColor, state.missColor, state.backgroundColor)))
        }
    },
    getters: {
        isDarkTheme(state){return state.isDarkTheme},
        numberOfRowInTable(state){return state.numberOfRowInTable},
        areaColor(state){return state.areaColor},
        hitColor(state){return state.hitColor},
        missColor(state){return state.missColor},
        backgroundColor(state){return state.backgroundColor},
    }
}