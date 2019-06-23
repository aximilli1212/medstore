<template>
    <v-app id="login" class="primary">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-btn class="secondary" @click="hide_me = !hide_me">Hide it</v-btn>
                    <v-flex xs12 sm8 md4 lg4>
                        <transition name="zoomDown" type="animation" appear>
                        <v-card v-if="hide_me" class="elevation-1 pa-3">
                            <v-card-text>
                                <div class="layout column align-center">
                                    <h1 class="flex my-4 primary--text">WorkI Facility Management System</h1>
                                </div>

                                <v-form>
                                    <transition
                                            enter-active-class="flipInX"
                                            leave-active-class="flipOutX"

                                                mode="out-in"
                                            appear>
                                    <v-text-field v-if="fitz" key="upper" append-icon="person" name="login" label="Login" type="text" v-model="model.username"></v-text-field>
                                    <v-text-field v-else key="pass" append-icon="lock" name="password" label="Password" id="password" type="password" v-model="model.password"></v-text-field>
                                    </transition>
                                </v-form>

                            </v-card-text>
                            <v-card-actions>
                                <v-btn icon>
                                    <v-icon color="blue">fa fa-facebook-square fa-lg</v-icon>
                                </v-btn>
                                <v-btn icon>
                                    <v-icon color="red">fa fa-google fa-lg</v-icon>
                                </v-btn>
                                <v-btn icon>
                                    <v-icon color="light-blue">fa fa-twitter fa-lg</v-icon>
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                        </transition>
                    </v-flex>
                </v-layout>
            </v-container>

        </v-content>
    </v-app>
</template>

<script>
    export default {
        data: () => ({
            fitz:false,
            hide_me:true,
            loading: false,
            logError:false,
            snack:true,
            snackText:'',
            snackColor:'red',
            model: {
                username: '',
                password: ''
            }
        }),
        computed:{
             authUser(){
                 return this.$store.getters.getAuthUser;
             }
        },
        mounted(){
            this.hideHead();

        },
        watch:{
            authUser(val){
                alert('login');
                this.snack = true;
                this.snackText ="Welcome "+ val.email;
                this.snackColor= "green darken-3";
            }
        },

        methods: {
            hideHead(){
                this.$store.commit('setHead',false)

            },
            login () {
                this.loading = true;

                    let self = this;
                    this.fitz = !this.fitz;

                    this.loading = false;

            }
        }

    };
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

    .fade-enter{
        opacity:0;
    }
    .fade-enter-active{
        transition:opacity 0.5s;
    }
    .fade-leave{

    }
    .fade-leave-active{
        transition:opacity 1s;
        opacity:0;
    }

    .slide-enter{
        opacity:0;
    }
    .slide-enter-active{
        animation: slide-in 1s ease-out forwards;
        transition: opacity .5s;
    }
    .slide-leave{}
    .slide-leave-active{
        animation: slide-out 1s ease-out forwards;
        transition: opacity 1s;
        opacity:0;

    }

    @keyframes slide-in{
        from{
            transform: translateY(20px);
        }
        to{
            transform: translateY(0);
        }
    }

    @keyframes slide-out{
        from{
            transform: translateY(0);
        }
        to{
            transform: translateY(20px);
        }
    }
</style>
