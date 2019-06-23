<template>
<div>


            <v-layout>
                <v-flex xs6 sm4 >
                    <v-card ref="form" class="ml-3 mt-5">
                        <v-card-title primary-title>
                            <div>
                                <div class="headline">Send us a quick message</div>
                                <span class="grey--text" small>We will get back to you instantly</span>
                            </div>
                        </v-card-title>
                        <hr >
                        <v-card-text>
                            <v-form ref="form"  lazy-validation>
                                <v-text-field
                                        label="Full Name"
                                        placeholder="John Doe"
                                        v-model="name"
                                        required
                                        ref="name"
                                        v-validate="'required|name'"
                                        :error-messages="errorMessages"
                                ></v-text-field>

                                <v-text-field
                                        label="Phone Number"
                                        placeholder="0242-303-223"
                                        v-model="phone"
                                        v-validate="'required|phone'"
                                        ref="address"
                                        counter="15"
                                        required
                                ></v-text-field>
                                <v-text-field
                                        label="Message"
                                        placeholder="Message"
                                        v-model="message"
                                        ref="city"
                                        v-validate="'required|max:40'"
                                        required
                                        @keyup.enter="sendMessage"
                                ></v-text-field>


                            </v-form>

                        </v-card-text>
                        <v-card-actions>
                            <v-btn flat>Cancel</v-btn>
                            <v-slide-x-reverse-transition>
                                <v-tooltip
                                        left
                                        v-if="formHasErrors"
                                >
                                    <v-btn
                                            icon
                                            @click="resetForm"
                                            slot="activator"
                                            class="my-0"
                                    >
                                        <v-icon>refresh</v-icon>
                                    </v-btn>

                                    <span>Refresh form</span>
                                </v-tooltip>
                            </v-slide-x-reverse-transition>
                            <v-btn color="primary"
                                   @click="sendMessage"
                                   :loading="msg_loader"
                                   :disabled="msg_loader"
                            >Submit <v-icon right>mdi-send</v-icon></v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex >





                <v-flex xs6 sm5 offset-sm2 class="mt-5">
                    <v-btn class="primary--text" rounded outline large @click="clog=true">  <v-icon left dark class="callback_pulse">mdi-access-point</v-icon>Request a free callback</v-btn>
                    <!--<v-btn large>Request a free callback</v-btn>-->

                    <v-card class="elevation-0 transparent">

                        <v-card-text class="headline">
                            Call Us /Drop a mail.<br />
                            <span class="small grey--text">Our doors are ever open</span>
                        </v-card-text>
                        <v-list class="transparent">
                            <v-list-tile>
                                <v-list-tile-action>
                                    <v-icon class="blue--text text--lighten-2">phone</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title> +223 302-235-091 </v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-action>
                                    <v-icon class="blue--text text--lighten-2">phone</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title>+233 242-574-387 </v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-action>
                                    <v-icon class="blue--text text--lighten-2">place</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title>C353/7 Olympic Road Kokomlemle, Accra</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-action>
                                    <v-icon class="blue--text text--lighten-2">email</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title>info@goldcabgh.com</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-action>
                                    <v-icon class="blue--text text--lighten-2">mdi-domain</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title>Open Hours: Mon - Fri <v-icon>mdi-clock</v-icon> 7:00am to 7:00pm</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-action>
                                    <v-icon class="blue--text text--lighten-2">mdi-headphones-settings</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title>24hour Customer Service</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>

                    </v-card>
                </v-flex>
            </v-layout>





    <v-dialog v-model="clog" max-width="300px">
        <v-card>
            <v-toolbar color="primary">
                <v-btn icon>
                    <v-icon color="white" @click="clog=false">arrow_back</v-icon>
                </v-btn>
                <v-toolbar-title class="white--text">Request Call Back</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon color="white">more_vert</v-icon>
                </v-btn>
            </v-toolbar>
            <v-container fluid>
                <v-layout row wrap>
                    <v-flex xs12 sm8 offset-2>
                        <v-text-field
                                label="Name"
                                v-model="customerName"
                                prepend-icon="mdi-account"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12  sm8 offset-2>
                        <v-text-field
                                label="Phone"
                                v-model="customerPhone"
                                prepend-icon="phone"
                                @keyup.enter="requestCallBack"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm10 offset-sm2>
                        <v-btn outline small
                               :loading="loading"
                               :disabled="loading"
                               class="primary--text"
                               @click="requestCallBack"

                        >
                            Send
                            <v-icon right dark>mdi-send</v-icon>
                        </v-btn>
                        <v-btn small flat  @click.native="clog = false">Cancel</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>

    <v-snackbar
            :timeout="6000"
            :top="true"
            v-model="er_snack"
    >
        Sorry...Message was not sent.
        <v-btn flat color="red" @click.native="er_snack = false">Close</v-btn>
    </v-snackbar>



    <v-snackbar
            :timeout="6000"
            :top="true"
            :right="true"
            v-model="su_snack"
            color=""
    >
           Message Sent Successfully.
        <v-btn flat color="green" @click.native="su_snack = false">Close</v-btn>
    </v-snackbar>

</div>
</template>

<script>
    export default {
        name: "contact-us",
        $_veeValidate: {
            validator: 'new'
        },
        data(){
            return{
                formHasErrors:false,
                msg_loader:false,
                er_snack:false,
                su_snack:false,
                name:'',
                phone:'',
                message:'',
                dialog:true,
                clog:false,
                customerPhone:'',
                customerName:'',
                loading:false,
                loader:null,
            }
        },
        computed:{
            reqMsg(){
                return this.$store.getters.getReqMsg;
            },
            formIsValid(){
                return this.name!=='' &&
                    this.phone!=='' &&
                    this.message!==''

            },
            regFormIsValid(){
                return this.customerName!=='' &&
                    this.CustomerPhone!==''

            },
        },

        watch: {
            loader () {
                const l = this.loader
                this[l] = !this[l]

                setTimeout(() => (this[l] = false), 3000)

                this.loader = null
            },
            reqMsg:function(){
                this.clearForm();
                this.su_snack=true;
                this.msg_loader=false;
                this.loading=false;
                this.clog=false;
                this.$refs.form.reset()

            }
    },
        methods:{
            clearForm(){
                this.name= '';
                this.phone= '';
                this.message= '';
                this.customerName = '';
                this.customerPhone= '';
            },
            sendMessage(){
                if(this.formIsValid) {
                    this.msg_loader=true;
                    const msg = {
                        rname: this.name,
                        rphone: this.phone,
                        rmsg: this.message,

                    }

                    this.$store.dispatch('sendMsg', msg);
                }
                else{
                    this.$validator.validateAll();
                    this.formHasErrors=true;
                    this.msg_loader=false;
                    return false;
                }

            },
            requestCallBack(){

                if(this.regFormIsValid) {
                    const req={
                    name:this.customerName,
                    phone:this.customerPhone,
                }

                console.log(req);

                this.$store.dispatch('sendReq',req);
                this.loading = true;
            }
            else{
                    this.loading = false;
                    return false;

                }
            }
        }
    }
</script>

<style scoped>
    .callback_pulse {
        animation: opacityPulse 1s ease-out;
        animation-iteration-count: infinite;
        opacity: 0;
    }
    @-webkit-keyframes opacityPulse {
        0% {opacity: 0.0;}
        50% {opacity: 1.0;}
        100% {opacity: 0.0;}
    }
</style>