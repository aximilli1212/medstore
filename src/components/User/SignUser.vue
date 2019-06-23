<template>
    <div>
        <gold-head></gold-head>
        <v-container fluid>

            <v-layout row>

                <!--Left picture-->
                <v-flex sm8  class="hidden-sm-and-down">

                    <v-card

                    >

                        <v-card-media :src=gold_package.side_img height="600px">

                        </v-card-media>
                        <v-btn  class="mt-5"
                                color="primary"
                                dark
                                fixed
                                left
                                fab
                                v-show="!hidden"
                                @click="goHome"
                        >
                            <v-icon>arrow_left</v-icon>
                        </v-btn>

                        <!--BOTTOM IMAGES-->
                        <v-btn  class="mt-5"
                                color="white"
                                dark
                                absolute
                                left
                                bottom
                                fab
                                v-show="!hidden"
                                @click="goHome"
                        >
                            <img src="/static/img/logo.png" alt="logo">
                        </v-btn>


                    </v-card>


                </v-flex>


                <v-flex xs12 sm4>

                    <v-card
                            height="600"

                    >
                        <!--<v-card-media src="./static/img/pg1.png" height="5px">-->
                        <!--</v-card-media>-->
                        <transition
                                name="bounce"
                                enter-active-class="bounceInLeft"
                        >

                            <v-card v-if="bookSet" class="grey--text">
                                <v-container fluid grid-list-lg>
                                    <v-layout row>
                                        <v-flex xs7>
                                            <div>
                                                <div class="black--text ">Booking Request:</div>
                                                <div class="headline">{{gold_package.name}}</div>
                                                <hr>
                                                <!--<div classcc="red&#45;&#45;text"><v-icon color="red">map</v-icon>You are not Signed In.</div>-->
                                                <div class="primary--text small"><v-icon color="grey">error_outline</v-icon> Please Sign In Below and Lets Complete the booking process. </div>

                                            </div>
                                        </v-flex>
                                        <v-flex xs5>
                                            <v-card-media
                                                    :src=gold_package.img_url
                                                    height="100px"
                                                    contain
                                            ></v-card-media>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>

                        </transition>



                        <v-card-text>
                            <v-container>
                                <transition
                                 name="bounce"
                                 enter-active-class="bounceInDown"
                                 leave-active-class="bouceOutUp"
                                >
                                    <sign-in v-if="s_in"> </sign-in>
                                </transition>

                                <transition
                                        name="bounce"
                                        enter-active-class="bounceInDown"
                                        leave-active-class="bouceOutUp"
                                >
                                    <sign-up v-if="s_up"> </sign-up>
                                </transition>

                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>

</template>

<script>

    import SignIn from   '@/components/User/Signin'
    import SignUp from   '@/components/User/Signup'

    export default{
        data(){
            return {

                bookreq:false,
                hidden:false,
                gold_package:[],
            }
        },
        computed:{
            user(){
                return this.$store.getters.user
            },
            s_in(){
                return this.$store.getters.sin_show
            },
            s_up(){
                return this.$store.getters.sup_show
            },
            bookSet(){
                return this.$store.getters.bookSet
            },
            bookPackage(){
                return this.$store.getters.bookPackage;
            },



        },
        watch:{
            user(value){
                if(value !== null && value !== undefined){
                    this.$router.push('/dash/book')
                }
            }
        },
        mounted(){
            this.gold_package_set();
        },
        methods:{
            gold_package_set(){
                this.gold_package = this.$store.getters.Package[this.bookPackage]

            },
            goHome(){
                this.$router.push('/')
            },
            onSignin(){
                //Vuex Authing
                console.log({email: this.email,password: this.password, conf: this.confirmPassword})
                this.$store.dispatch('signUserIn',{email:this.email,password:this.password})
            }
        },
        components:{
            SignIn:SignIn,
            SignUp:SignUp
        }

    }
</script>