<template>
    <b-modal id="modalSettings" title="Settings"
             :header-bg-variant="[isDarkTheme ? 'dark' : 'indigo-200']"
             :header-text-variant="[isDarkTheme ? 'light' : 'dark']"
             :body-bg-variant="[isDarkTheme ? 'dark' : 'indigo-200']"
             :body-text-variant="[isDarkTheme ? 'light' : 'dark']"
             :footer-bg-variant="[isDarkTheme ? 'dark' : 'indigo-200']"
             :footer-text-variant="[isDarkTheme ? 'light' : 'dark']">
        <b-form>
            <b-form-group class="my-2">
                <b-button v-if="isDarkTheme" @click="changeTheme" variant="outline-secondary">Light theme</b-button>
                <b-button v-else @click="changeTheme" variant="light">Dark theme</b-button>
            </b-form-group>

            <b-form-group class="my-2">
                <input type="range" v-model="numberOfRow" class="form-range" min="2" max="200" step="1" id="numberOfLines">
                <label for="numberOfLines" class="form-label">{{numberOfRow}} rows per page in a table</label>
            </b-form-group>

            <b-form-group class="my-2">
                <label for="areaColor" class="form-label">areaColor on the graph:</label>
                <input id="areaColor" type="color" v-model="areaColoring"
                       :class="[isDarkTheme ? 'bg-gray-700' : 'bg-indigo-100']"/>
            </b-form-group>

            <b-form-group class="my-2">
                <label for="hitColor" class="form-label">hitColor on the graph:</label>
                <input id="hitColor" type="color" v-model="hitColoring"
                       :class="[isDarkTheme ? 'bg-gray-700' : 'bg-indigo-100']"/>
            </b-form-group>

            <b-form-group class="my-2">
                <label for="missColor" class="form-label">missColor on the graph:</label>
                <input id="missColor" type="color" v-model="missColoring"
                       :class="[isDarkTheme ? 'bg-gray-700' : 'bg-indigo-100']"/>
            </b-form-group>

            <b-form-group class="my-2">
                <label for="backgroundColor" class="form-label">backgroundColor on the graph:</label>
                <input id="backgroundColor" type="color" v-model="backgroundColoring"
                       :class="[isDarkTheme ? 'bg-gray-700' : 'bg-indigo-100']"/>
            </b-form-group>
        </b-form>

        <template #modal-footer="{ok}">
            <b-button :variant="[isDarkTheme ? 'outline-secondary text-light' : 'light']"
                      @click="setDefault">
                Reset settings
            </b-button>
            <b-button @click="ok()" :variant="[isDarkTheme ? 'outline-secondary text-light' : 'light']">OK</b-button>
        </template>
    </b-modal>
</template>

<script>
    import {mapActions, mapGetters} from "vuex"

    export default {
        name: "settings",
        data(){
            return {
                numberOfRow: 10,
                areaColoring: '#b8daff',
                hitColoring: '#000000',
                missColoring: '#ff140d',
                backgroundColoring: '#dee2e6'
            }
        },
        watch: {
            numberOfRow: function () {this.changeNumberOfRowInTable(this.numberOfRow)},
            areaColoring: function () {this.changeAreaColor(this.areaColoring)},
            hitColoring: function () {this.changeHitColor(this.hitColoring)},
            missColoring: function () {this.changeMissColor(this.missColoring)},
            backgroundColoring: function () {this.changeBackgroundColor(this.backgroundColoring)}
        },
        computed: {
            ...mapGetters(['isDarkTheme', 'numberOfRowInTable',
                'areaColor', 'hitColor', 'missColor', 'backgroundColor'])
        },
        methods: {
            ...mapActions(['changeTheme', 'changeNumberOfRowInTable', 'changeAreaColor',
                'changeHitColor', 'changeMissColor', 'changeBackgroundColor']),
            setDefault(){
                if (!this.isDarkTheme) this.changeTheme()
                this.numberOfRow = 10
                this.areaColoring = '#b8daff'
                this.hitColoring = '#000000'
                this.missColoring = '#ff140d'
                this.backgroundColoring = '#dee2e6'
            }
        },
        mounted(){
            this.numberOfRow = this.numberOfRowInTable
            this.areaColoring = this.areaColor
            this.hitColoring = this.hitColor
            this.missColoring = this.missColor
            this.backgroundColoring = this.backgroundColor
        }
    }
</script>

<style scoped>
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
</style>