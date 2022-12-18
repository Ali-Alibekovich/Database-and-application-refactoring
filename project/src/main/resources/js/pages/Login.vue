<template>
    <div class="modal-dialog">
        <div :class="['modal-content p-4', isDarkTheme ? 'bg-dark': 'bg-indigo-200']">
            <b-form :class="{'text-light': isDarkTheme}">
                <b-form-group label="Username" label-for="username">
                    <b-form-input id="username" v-model="user.username"
                                  oninput="this.value=this.value.replace(/\s/,'')"
                                  :state="toBoolean(validUsername)" type="text"
                                  maxlength="20"/>
                    <b-form-invalid-feedback :class="[isDarkTheme ? 'text-light' : 'text-dark']"
                                             :state="toBoolean(validUsername)">{{validUsername}}</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Password" label-for="password">
                    <b-form-input id="password" v-model="user.password"
                                  oninput="this.value=this.value.replace(/\s/,'')"
                                  :state="toBoolean(validPassword)" type="password"
                                  maxlength="20"/>
                    <b-form-invalid-feedback :class="[isDarkTheme ? 'text-light' : 'text-dark']"
                                             :state="toBoolean(validPassword)">{{validPassword}}</b-form-invalid-feedback>
                </b-form-group>

                <div>
                    <b-button @click="handleLogin"
                              :variant="[isDarkTheme ? 'outline-secondary text-light' : 'light']">Sign in</b-button>
                    <b-button @click="handleRegistration"
                              :variant="[isDarkTheme ? 'outline-secondary text-light' : 'light']">Sign up</b-button>
                </div>
            </b-form>
        </div>
        <b-alert :show="dismissCountDown"
                 dismissible
                 fade
                 :variant="successful ? 'success' : 'danger'"
                 @dismiss-count-down="countDownChanged"
        >
            {{serverResponse}}
        </b-alert>
    </div>
</template>

<script>
    import User from '../auth/user'
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: "Login",
        data() {
            return {
                user: new User('', ''),
                dismissSecs: 5,
                dismissCountDown: 0,
                serverResponse: "",
                successful: false,
                validUsername: null,
                validPassword: null
            };
        },
        computed: {
            ...mapGetters(['isLoggedIn', 'isDarkTheme'])
        },
        created() {
            if (this.isLoggedIn) {
                this.$router.push('/main')
            }
        },
        watch: {
            'user.username': function () {this.checkUsername()},
            'user.password': function () {this.checkPassword()},
        },
        methods: {
            ...mapActions(['login', 'register']),
            len(s){return s === null ? 0 : s.length},
            toBoolean(s){return s === null ? null : !Boolean(s)},
            countDownChanged(dismissCountDown) {this.dismissCountDown = dismissCountDown},
            showAlert(response, successful) {
                this.serverResponse = response
                this.successful = successful
                this.dismissCountDown = this.dismissSecs
            },
            checkUsername(){
                this.validUsername = ""
                if (this.user.username === '') this.validUsername = "Enter username"
                else if (this.len(this.user.username) < 3) this.validUsername = "Username must be at least 3 characters"
            },
            checkPassword(){
                this.validPassword = ""
                if (this.user.password === '') this.validPassword = "Enter password"
                else if (this.len(this.user.password) < 6) this.validPassword = "Password must be at least 6 characters"
            },
            checkForm(){
                this.checkUsername()
                this.checkPassword()
                return this.validUsername.length + this.validPassword.length === 0
            },
            handleLogin(){
                if (this.checkForm()) {
                    this.login(this.user).then(
                        () => {
                            this.$router.push('/main')
                        },
                        error => {
                            this.showAlert(
                                (error.response && error.response.data && error.response.data.message) ||
                                error.message ||
                                error.toString(), false)
                        }
                    )
                }
            },
            handleRegistration(){
                if (this.checkForm()) {
                    this.register(this.user).then(
                        (response) => {this.showAlert(response.message, true)},
                        error => {
                            this.showAlert(
                                (error.response && error.response.data && error.response.data.message) ||
                                error.message ||
                                error.toString(), false)
                        }
                    )
                }
            }
        }
    }
</script>

<style scoped>
    .bg-gray-900{
        background-color: #212529;
    }
    .btn-light {
        color: #212529;
        background-color: #e0cffc;
        border-color: #212529;
    }
    .btn-light:focus {
        color: #212529;
        background-color: #e0cffc;
        border-color: #212529;
    }
    .bg-indigo-200{
        background-color: #c29ffa;
    }
    .good--main-image,
    .good--backside-image {
        background-color: rgba(0, 0, 0, .05);
        background-image: url(https://vuejs.org/images/logo.png);
        background-repeat: no-repeat;
        background-size: contain;
    }

    .good--backside-image {
        opacity: .7
    }
</style>