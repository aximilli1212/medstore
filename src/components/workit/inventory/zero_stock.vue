<template>
    <div>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <div class="mr-3 hidden-sm-and-down">
                    <img src="/static/img/error/404.svg" alt="">
                </div>
                <div class="text-md-center">
                    <h1 class="red--text text--darken-3 display-3">Warning !</h1>
                    <h2 class="my-3 headline ">This will set all <i>stock quantities</i> to Zero.</h2>
                    <div>
                        <v-btn :loading="loader" :disable="loader" color="primary" large @click="doZero"><v-icon left>mdi-bullseye</v-icon> Set to Zero</v-btn>
                    </div>
                </div>
            </v-layout>
        </v-container>


        <v-snackbar
                :timeout="6000"
                :top="true"
                :right="x === 'right'"
                v-model="snack"
                color=""
        >
            {{snackText}}
            <v-btn flat :color="snackColor" @click.native="snack = false">Close</v-btn>
        </v-snackbar>

        <simplert :useRadius="true"
                  :useIcon="true"
                  ref="simplert">
        </simplert>
    </div>
</template>

<script>
    var axios = require("axios");

    export default {
        name: "zero_stock",
        data:()=>({
            loader:false,
            snack:false,
            snackText:'',
            snackColor:'',
    }),
        computed: {
            apiSet() {
                return this.$store.getters.getApi
            },
        },
        methods:{

            doZero(){
                let self = this;
                let confirmFn = function() {
                    self.setZero();
                };

                let closeFn = function() {
                    self.snack = true;
                        self.snackText="Stock Zero Cancelled";
                        self.snackColor="red darken-3";
                };

                let obj = {
                    title: 'Set to Zero?',
                    message: 'Are you sure you want to set all Quantities to Zero?',
                    type: 'warning',
                    useConfirmBtn: true,
                    onConfirm: confirmFn,
                    onClose: closeFn
                };

                this.$refs.simplert.openSimplert(obj);

            },

            setZero(){
                   this.loader = true;

                let self = this;
                axios.get(this.apiSet.zero_stock)
                    .then(response=>{

                        self.snack=true;
                        self.snackText = "Success! Stock Quantities set to zero";
                        self.snackColor= "green darken-3";

                        self.loader = false;

                    }).catch(
                    e => {
                        console.log(e);
                        self.loader = false;

                        this.err.push(e);
                    }
                )
            },
        }

    }
</script>

<style scoped>

</style>