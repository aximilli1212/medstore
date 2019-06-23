<template>
    <v-app id="login" class="primary">
        <v-content >
            <v-container fluid fill-height >
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4 lg4>
                        <transition name="zoomDown" type="animation" appear>
                        <v-card class="elevation-1 pa-3" id="patup">
                            <v-card-text>
                                <div class="layout column align-center">
                                    <img src="/static/img/logo1.png" alt="WorkIT FMS" width="180" height="140">
                                    <h1 class="flex my-4 primary--text">Facility Management System</h1>
                                </div>

                                <v-alert
                                        v-model="logError"
                                        dismissible
                                        type="error"
                                >
                                    Sorry Email or Password does not exist.
                                </v-alert>


                                <v-form>
                                    <v-text-field
                                            append-icon="person"
                                            @keyup.enter="login"
                                            name="login"
                                            label="Email"
                                            type="text"
                                            v-model="model.email"
                                    >

                                    </v-text-field>
                                    <v-text-field
                                            preppend-icon="lock"
                                            name="password"
                                            label="Password"
                                            id="password"
                                            type="password"
                                            v-model="model.password"
                                            :append-icon="isPasswordVisible ? 'visibility' : 'visibility_off'"
                                            :append-icon-cb="() => (isPasswordVisible = !isPasswordVisible)"
                                            :type="isPasswordVisible ? 'text' : 'password'"
                                            @keyup.enter="login"

                                    ></v-text-field>
                                </v-form>
                                    </v-card-text>
                                     <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn block color="primary" @click="login"  :loading="loading">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                        </transition>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-snackbar
                    :timeout="6000"
                    :top="true"
                    :right="x === 'right'"
                    v-model="snack"
            >
                {{snackText}}
                <v-btn flat :color="snackColor" @click.native="snack = false">Close</v-btn>
            </v-snackbar>

        </v-content>
    </v-app>
</template>

<script>
    let axios = require("axios");
    import * as Cookies from 'js-cookie';

    export default {
        data: () => ({
            kit:false,
            loading: false,
            logError:false,
            snack:false,
            isPasswordVisible: false,
            snackText:'',
            snackColor:'red',
            // model: {
            //     email: 'admin@admin.com',
            //     password: 'admin1212'
            // },
            model: {
                email: '',
                password: ''
            }
        }),
        mounted(){
            this.hideHead();
            this.$store.commit('setSalesSession',{shift:"Not Set"});
            // Cookies.set('auth',0);

        },
        computed:{
            authUser(){
                return this.$store.getters.getAuthUser;
            }
        },
        watch:{
            authUser(val){
                // alert('login');
            }
        },
        methods: {
            login () {
                this.loading = true;
                this.logError = false;

                let self = this;

                let apiUrl = this.$store.state.config.url;
                axios.post(apiUrl+'/login',this.model)
                    .then(function (response) {
                        console.log(response.data.user_id);

                        let uid = response.data.user_id;


                        self.loading = false;

                        self.$store.commit('setAuth',uid);
                        Cookies.set('auth', uid);

                        self.snack = true;
                        self.snackText ="Welcome "+ self.model.email;
                        self.snackColor= "green darken-3";
                        self.$store.dispatch('loadUserData',uid);

                        setTimeout(() => {
                            self.$router.push('/dashboard');
                        }, 3000);



                    })
                    .catch(
                        error=>{
                            self.loading = false;
                            this.logError = true;
                            console.log(error)
                        }
                    )
            },

        hideHead(){
                this.$store.commit('setHead',false)

            }

    },

    }
</script>
<style scoped lang="css">
    #login {
        height: 50%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        z-index: 0;
    }
    #patup {
        background:url('/static/img/bg.png');

    }
</style>
