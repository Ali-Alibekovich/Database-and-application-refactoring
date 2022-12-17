<template>
    <b-form @submit="onSubmit" :class="['form-container p-4',
     isDarkTheme ? 'bg-dark': 'bg-indigo-200', {'text-light': isDarkTheme}]">

        <div :class="['input-group mb-5', isDarkTheme ? 'bg-dark': 'bg-indigo-200']" >
            <label :class="['input-group-text',
            isDarkTheme ?
            {'bg-danger text-white': invalidX} :
            {'bg-red-400 text-white': invalidX}]">X</label>
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <div v-for="(value, index) in values" :key="index">
                    <input type="checkbox" class="btn-check" autocomplete="off"
                           :id="'x'+index" :value="value" v-model.number="selectedX">
                    <label :class="[isDarkTheme ? 'btn btn-outline-secondary m-0 text-light' : 'btn btn-light m-0']"
                           :for="'x'+index">{{value}}</label>
                </div>
            </div>
        </div>

        <div class="input-group mb-5">
            <label for="y" :class="['input-group-text',
            isDarkTheme ?
            {'bg-danger text-white': invalidY.value} :
            {'bg-red-400 text-white': invalidY.value}]">Y</label>
            <b-form-input id="y" v-model="selectedY"
                          :state="validY" type="text"
                          maxlength="8"/>
            <b-form-invalid-feedback :class="[isDarkTheme ? 'text-light' : 'text-dark']"
                                     :state="validY">
                <div style="position: absolute">{{invalidY.errorText}}</div>
            </b-form-invalid-feedback>
        </div>

        <div :class="['input-group mb-5', isDarkTheme ? 'bg-dark': 'bg-indigo-200']">
            <label :class="['input-group-text',
            isDarkTheme ?
            {'bg-danger text-white': invalidR} :
            {'bg-red-400 text-white': invalidR}]">R</label>
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <div v-for="(value, index) in values" :key="index">
                    <input type="radio" class="btn-check" autocomplete="off"
                           :id="'r'+index" v-model.number="selectedR" :value="value">
                    <label :class="[isDarkTheme ? 'btn btn-outline-secondary m-0 text-light' : 'btn btn-light m-0']"
                           :for="'r'+index">{{value}}</label>
                </div>
            </div>
        </div>

        <b-button type="submit"
                  :variant="[isDarkTheme ? 'outline-secondary text-light' : 'light']">Submit</b-button>
    </b-form>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "point-form",
        data(){
            return {
                selectedX: [],
                selectedY: null,
                selectedR: null,
                values: [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2],
                invalidX: false,
                invalidY: {value: null, errorText: ""},
                invalidR: false
            }
        },
        watch: {
            selectedX: function () {this.checkX()},
            selectedY: function () {this.checkY()},
            selectedR: function () {this.checkR(); this.UPDATE_R(this.selectedR)}
        },
        methods: {
            ...mapActions(['POST_POINTS', 'UPDATE_R']),
            checkX(){this.invalidX = this.selectedX.length < 1},
            checkR(){this.invalidR = this.values.indexOf(this.selectedR) === -1},
            checkY(){
                const y = (this.selectedY != null) ? this.selectedY.trim().replace(",", ".") : ""
                this.invalidY = {value: false, errorText: ""}

                if (y === "") {
                    this.invalidY.value = true
                } else if (!isFinite(y)) {
                    this.invalidY = {value: true, errorText: "Y must be a number"}
                } else if (y < -3 || y > 3) {
                    this.invalidY = {value: true, errorText: "Y must be in the range -3 ... 3"}
                }
            },
            checkForm(){
                this.checkX(); this.checkR(); this.checkY()
                return !(this.invalidR || this.invalidY.value || this.invalidX)
            },
            onSubmit(evt) {
                evt.preventDefault()

                if (this.checkForm()){
                    const points = []
                    for (let i = 0; i < this.selectedX.length; i++){
                        points.push({
                            x: +this.selectedX[i],
                            y: +this.selectedY.trim().replace(",", "."),
                            r: +this.selectedR
                        })
                    }
                    this.POST_POINTS(points)
                }
            }
        },
        computed: {
            ...mapGetters(['isDarkTheme']),
            validY(){return this.invalidY.value != null ? !this.invalidY.value : null}
        },
        mounted() {this.UPDATE_R(null)}
    }
</script>

<style scoped>
    .bg-red-400{
        background-color: #e35d6a;
    }
    .form-container{
        max-width: 500px;
    }
    .btn-check{
        position: absolute;
    }
    .input-group-text{
        border-radius: 0;
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
    .invalid-feedback {
        margin-top: 0;
    }
</style>