<template>
    <div>
            <v-layout row v-if="error">
                <v-flex xs12 sm12>
                    <!--Error alerts-->
                    <app-alert  @dismissed="onDismissed" value="true" :text="error.message"></app-alert>
                </v-flex>
            </v-layout>

                                <v-flex  xs12 sm8 offset-sm2>

                                    <div class="headline grey--text">Gold Cab ||<v-icon>face</v-icon> Sign Up </div>


                                </v-flex>
                                <form  class="cyan lighten-5" @submit.prevent="onSignup" method="post">
                                    <v-layout row>
                                        <v-flex  xs8 offset-xs2>
                                            <v-text-field
                                                    name='email'
                                                    label="Email"
                                                    id="email"
                                                    v-model="email"
                                                    type="email"
                                                    required
                                            ></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row>
                                        <v-flex xs8 offset-xs2>
                                            <v-text-field
                                                    name='password'
                                                    label="Password"
                                                    id="password"
                                                    v-model="password"
                                                    type="password"
                                                    required
                                            ></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row>
                                        <v-flex xs8 offset-xs2>
                                            <v-text-field
                                                    name='confirmPassword'
                                                    label="Confirm Password"
                                                    id="comfirmPassword"
                                                    v-model="confirmPassword"
                                                    type="password"
                                                    :rules="[comparePasswords]"
                                            ></v-text-field>
                                        </v-flex>
                                    </v-layout>

                                    <v-layout row>
                                        <v-flex  xs6 offset-xs4>
                                            <!--<v-btn type="submit" class="primary">Sign Up</v-btn>-->

                                            <v-btn type="submit"
                                                   class="primary"
                                                    :loading="loading"
                                                    @click.native="loader = 'loading'"
                                                    :disabled="loading"
                                            >
                                                  Sign Up
                                                <span slot="loader" class="custom-loader">
        <v-icon light>cached</v-icon>
      </span>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                    <hr>

                                    <v-layout>
                                        <v-flex xs8 offset-xs2>
                                            <span>Do you already have a Gold Account? <v-btn class="orange" @click="sin_show">SIGN IN</v-btn> OR</span>
                                            <a class="waves-effect waves-light btn red darken-3 white--text social google">
                                                <i class="fa fa-google"></i> Sign in with google</a>


                                        </v-flex>

                                    </v-layout>

                                </form>



    </div>

</template>

<script>

    export default{
        data(){
            return {
                email:'',
                password:'',
                confirmPassword:''
            }
        },
        computed:{
            comparePasswords(){
                return this.password !== this.confirmPassword ? 'Passwords do not match' :''
            },
            user(){
                return this.$store.getters.user
            },
            error(){
                return this.$store.getters.error
            },
            loading(){

            },
            signin_form(){
                return this.$store.getters.sin_show
            },
            signup_form(){
                return this.$store.getters.sup_show
            }

        },
        watch:{
            user(value){
                if(value !== null && value !== undefined){
                    this.$router.push('/dash/book')
                }
            }
        },
        methods:{
            sin_show(){
                this.$store.dispatch('clearError')
                this.$store.dispatch('signin_show')
            },

            onSignup(){
                //Vuex Authing
                console.log({email: this.email,password: this.password, conf: this.confirmPassword})
                this.$store.dispatch('signUserUp',{email:this.email,password:this.password})
            },
            onDismissed(){
                console.log('dismissed')
                this.$store.dispatch('clearError')
            }

        }

    }
</script>

<style scoped>
    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }
    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>