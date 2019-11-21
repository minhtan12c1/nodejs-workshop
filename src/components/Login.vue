
<script>
    import { mapActions, mapGetters } from 'vuex';
    import { Validator } from 'patched-vee-validate';
    import routerUtils from '@/router/utils';
    

    export default {
        name: 'Login',
        data() {
            return {
                ready: false,
                credentials: {
                    username: '',
                    password: '',
                },
                valid: false,
                loginErrorMsg: "Invalid username or password",
                postLoginProgress: false,
                invalidPermission: false,
                loginInProgress: false,
                loginError: false,
                expirePassword: false,
                dialogData: {
                showDialog: true,
                title: '',
                disableButton: true,
                },
            };
        },
        methods: {
            ...mapActions([
                'login',
            ]),
            onLoginClick() {
                this.loginError = false;
                this.invalidPermission = false;
                this.$validator.validateAll()
                .then((result) => {
                    if (!result) {
                    return;
                    }
                    this.loginInProgress = true;
                    return this.login({ creds: this.credentials }).then(this.onLoginSuccess);
                })
                .catch((error) => {
                    const message = error.message;
                    this.loginError = true;
                    this.loginInProgress = false;
                    if (message.includes('Invalid login name or password')) {
                    this.loginErrorMsg = "Invalid";
                    routerUtils.routeToHome();
                    }
                });
            },
            matchPassword(value) {
                return value === this.credentials.newPassword;
            },
            onLoginSuccess() {
                this.loginError = false;
                routerUtils.routeToDashboard();
                
            },
            
        },
        components: {
            
        },
        computed: {
            ...mapGetters([
                'languages',
                'locale',
                'lang',
            ]),
            computedLocale: {
                get() {
                return this.locale;
                },
                set(value) {
                this.setLang(value);
                },
            },
        },
        mounted() {
        this.ready = true;
        Validator.extend('match_password', {
            validate: (value) => {
            return this.matchPassword(value);
            },
        });
    },
    }
</script>

<style lang="stylus">
    #container
        min-height: 800px
        height: 100%

    .container
        padding: 0px !important

    .login-main
        top: 5em
        padding: 3em
        background-color: #fff
        .login-header
            margin: -3em
            min-height: 37px
            margin-bottom: auto
            text-align: center
            & > h4
                color: #fff
                position: relative
        #progress-bar
            position: relative
            min-height: 7px
            margin: 1rem 0
        .error-container
            min-height: 48px
            .login-error
                font-weight: lighter
    .footer
    height: auto !important
    &-content
        display: table-cell
        height: 100%
        vertical-align: middle
        text-align: center
        margin: 0
        line-height: 2.5rem
        text-shadow: 0 2px 2px rgba(0, 0, 0, .1)
</style>

<template lang="pug">
    v-container(fluid id="container")
        v-layout(row justify-center)
            v-flex( xs12 sm6 md5 lg4 xl3)
                v-slide-y-transition
                    v-card(class="login-main" color="lighten-4" light)
                        div(class="login-header primary") 
                                img(src="../assets/al-logo-white.png")
                                h1( class="white--text") {{ 'OmniSwitch' }} 
                                div(id="login_progress-bar")
                                    v-progress-linear(v-show="true" :indeterminate="true" color="info" style="bottom: 0px;")
                        v-form(v-model="valid" ref="loginForm")
                            div(class="error-container")
                                v-slide-y-transition
                                    v-subheader(v-if="loginError" class="error--text justify-center login-error")
                                        | {{ loginErrorMsg }}
                            v-text-field(
                                id="login_username-txt"
                                label="username"
                                v-model="credentials.username"
                                prepend-icon="mdi-account"
                                v-validate="'required'"
                                data-vv-name="username"
                                data-vv-as="username"
                                data-vv-validate-on="change|blur"
                                :error-messages="$validator.errors.first('username')"
                                @keypress.enter.native="onLoginClick"
                                )
                            v-text-field(
                                id="login_password-txt"
                                label="password"
                                type="password"
                                v-model="credentials.password"
                                prepend-icon="mdi-textbox-password"
                                v-validate="'required'"
                                data-vv-validate-on="change|blur"
                                data-vv-name="password"
                                data-vv-as="password"
                                :error-messages="$validator.errors.first('password')"
                                @keypress.enter.native="onLoginClick"
                                required)
                            v-select(:items="languages"
                                item-value="locale"
                                item-text="lang"
                                prepend-icon="mdi-web"
                                v-model="computedLocale"
                                style="top: 5px"
                                label="language" )
                            v-btn(id="login_login-btn" color="primary" block  @click.native.prevent="onLoginClick") log in
        v-footer.pa-3.justify-center(absolute="" height="auto")
            .footer-content()
                span Copyright © Alcatel-Lucent, 1995-2014. All Rights Reserved Worldwide.
                br
                span
                | Copyright © ALE USA Inc., 2014-{{ new Date().getFullYear() }}. All Rights Reserved.                   
        </template>