<template>
  <div>
      <v-layout row v-if="error">
          <v-flex xs12 sm12>
              <!--Error alerts-->
              <app-alert  @dismissed="onDismissed" value="true" :text="error.message"></app-alert>
          </v-flex>
      </v-layout>

                              <v-flex xs12 sm10 offset-sm2>

                                  <div class="headline grey--text ">Gold Cab |<v-icon>lock_open</v-icon> Sign In</div>


                              </v-flex>
                              <form class="cyan lighten-5" @submit.prevent="onSignin" method="post">
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
                                      <v-flex  xs6 offset-xs4>
                                          <v-btn
                                                  class="primary"
                                                  :loading="loading"
                                                  @click.native="loader = 'loading'"
                                                  :disabled="loading"
                                                  type="submit"
                                          >
                                              Sign In
                                              <span slot="loader" class="custom-loader">
        <v-icon light>cached</v-icon>
      </span>
                                          </v-btn>

                                      </v-flex>
                                  </v-layout>
                                  <hr>
                                  <!--<v-layout>-->

                                      <!--<v-flex xs5 offset-xs6>-->

                                          <!--<v-checkbox-->
                                                  <!--label="Keep me logged in?"-->
                                                  <!--v-model="checkbox"-->

                                          <!--&gt;</v-checkbox>-->
                                      <!--</v-flex>-->

                                  <!--</v-layout>-->
                                  <v-layout>
                                      <v-flex xs8 offset-xs2>
                                         <span>Dont have a Gold Account? <v-btn class="orange" @click="sup_show">SIGN UP</v-btn> OR</span>
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
                checkbox:'',
                bookreq:false,
                hidden:false
            }
        },
        computed:{
            user(){
                return this.$store.getters.user
            },
            signin_form(){
                return this.$store.getters.sin_show
            },
            signup_form(){
                return this.$store.getters.sup_show
            },
            error(){
                return this.$store.getters.error
            },
            loading(){
                return this.$store.getters.loading
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
            sup_show(){
                this.$store.dispatch('clearError')
                this.$store.dispatch('signup_show')
            },
            goHome(){
                this.$router.push('/')
            },
            onSignin(){
                //Vuex Authing
                console.log({email: this.email,password: this.password, conf: this.confirmPassword})
                this.$store.dispatch('signUserIn',{email:this.email,password:this.password})
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