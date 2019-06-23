<template>
    <div>
        <v-card>
        <v-toolbar
                class="mt-0 primary round_end"
        >
            <v-toolbar-title>
            </v-toolbar-title>
            <v-toolbar-items class="hidden-sm-and-down">

            </v-toolbar-items>
            <v-layout row align-center>
                <v-flex sm3 >
                    <v-select
                            class="mt-1"
                            offset-y
                            v-model="outlet"
                            :items="outlets"
                            label="Select Outlet"
                            solo
                    ></v-select>

                </v-flex>

                <v-flex sm2 >
                  <v-btn color="red--text text--darken-3" @click="loadExpiries"><v-icon left>mdi-alarm-light</v-icon>This Month</v-btn>
                </v-flex>
                <v-flex sm2 >
                  <v-btn color="orange--text text--darken-3" @click="loadOne"><v-icon left>mdi-calendar-plus</v-icon>Next Month</v-btn>
                </v-flex>
                <v-flex sm2 >
                  <v-btn color="green--text text--darken-3" @click="loadTwo"><v-icon left>mdi-apple-safari</v-icon>Next 2 Months</v-btn>
                </v-flex>


            </v-layout>

            <!--<v-layout row align-center style="max-width: 150px">-->

            <!--</v-layout>-->
        </v-toolbar>
        </v-card>



        <v-card
                class="elevation-4 thead"
        >
            <v-card-title>
                <v-btn icon color="primary" @click="$router.go(-1)" small><v-icon>mdi-arrow-left-thick</v-icon></v-btn>
                <p class="headline ttext mt-3">[ <i class="green--text text--darken-3">{{total}}</i> ] Expiring Products <i :class="ex_color">{{ex_time}}</i></p>
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search"
                        outline
                        hide-details
                ></v-text-field>
            </v-card-title>

            <v-data-table
                    :headers="headers"
                    :items="expiries"
                    :search="search"
                    :loading="fetchup"
                    class="elevation-8"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.num }}</td>
                    <td>{{ props.item.product_name }}</td>
                    <td>{{ props.item.available_quantity }}</td>
                    <td>{{ props.item.report_quantity }}</td>
                    <td>{{ props.item.price }}</td>
                    <td>{{ props.item.subtotal }}</td>
                    <td color="orange">{{ props.item.expiry }}</td>
                    <td class="justify-center layout px-0">

                        <v-btn  small
                                flat
                                class="red--text cpoint"
                                @click="deleteItem(props.item)"
                        ><v-icon

                        >
                            mdi-delete
                        </v-icon> Report Item</v-btn>

                    </td>
                </template>
                <template slot="no-data">
                    <v-btn color="primary" @click="loadExpiries">Refresh</v-btn>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                </v-alert>
            </v-data-table>
        </v-card>

        <v-snackbar
                :timeout="6000"
                :top="true"
                :right="x === 'right'"
                v-model="er_snackbar"
        >
            Please Enter Category Details.
            <v-btn flat color="red" @click.native="er_snackbar = false">Close</v-btn>
        </v-snackbar>

        <v-snackbar
                :timeout="6000"
                :top="true"
                :right="x === 'right'"
                v-model="del_snackbar"
        >
            Entry Successfully Deleted.
            <v-btn flat color="red" @click.native="del_snackbar = false">Close</v-btn>
        </v-snackbar>
        <v-snackbar
                :timeout="6000"
                :top="true"
                :right="x === 'right'"
                v-model="form_error_snack"
        >
            Sorry!!! Please Correct form errors.
            <v-btn flat color="red" @click.native="form_error_snack = false">Close</v-btn>
        </v-snackbar>

        <v-snackbar
                :timeout="6000"
                :top="true"
                :right="x === 'right'"
                v-model="su_snackbar"
                color=""
        >
            Product Successfully Added.
            <v-btn flat color="green" @click.native="su_snackbar = false">Close</v-btn>
        </v-snackbar>
        <v-snackbar
                :timeout="6000"
                :top="true"
                :right="x === 'right'"
                v-model="ed_snackbar"
                color=""
        >
            Product Successfully Edited.
            <v-btn flat color="secondary" @click.native="ed_snackbar = false">Close</v-btn>
        </v-snackbar>

        <simplert :useRadius="true"
                  :useIcon="true"
                  ref="simplert">
        </simplert>

    </div>
</template>

<script>
    var axios = require("axios");
    import { eventBus } from '../../../main.js';

    export default {
        name: "dictionary",
        $_veeValidate: {
            validator: 'new'
        },
        data: () => ({
            total:0,
            fetchup:false,
            dialog: false,
            edit_dialog: false,
            loader:false,
            cat_name:'',
            ex_color:'',
            search:'',
            ex_time:'',
            outlet:'Warehouse',
            su_snackbar:false,
            er_snackbar:false,
            del_snackbar:false,
            ed_snackbar:false,
            form_error_snack:false,
            gender: ['Male', 'Female'],
            headers: [
                {text: 'No.', align: 'left', value: 'num'},
                {text: 'Product Name', align: 'left', value: 'product_name'},
                { text: 'Available Quantity', align: 'left', value: 'available_quantity'},
                { text: 'Report Quantity', align: 'left', value: 'report_quantity'},
                { text: 'Price', align: 'left', value: 'price'},
                { text: 'Subtotal', align: 'left', value: 'subtotal'},
                { text: 'Expiry', align: 'left', value: 'expiry'},
                { text: '', align: 'left', value: 'expiry'}
            ],
            expiries: [

            ],
        }),

        computed:{
            formTitle () {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
            apiSet(){
                return this.$store.getters.getApi
            },

            submit_loading(){
                return true;
            },
            submitted(){
                return this.$store.state.submittedState;
            },

        },

        watch: {
            dialog (val) {
                val || this.close()
            },

            submitted() {
                this.clearFields();
                this.su_snackbar=true;
            }
        },

        mounted() {
            this.loadExpiries();
        },
        methods:{
            loadExpiries(){
                this.ex_time="This month";
                this.ex_color="red--text text--darken-3";
                this.fetchup=true;
                let d = new Date();

                let thisYear = d.getFullYear();
                let thisMonth = d.getMonth() + 1;

                const ex_month = thisMonth+'/'+thisYear;


                const monthy={
                    ex_date:ex_month,
                };

                let self = this;
                axios.post(this.apiSet.expiry, monthy)
                    .then(response=>{
                        const cat=[];
                        const obj = response.data.data;
                        for (let key = 0, len = obj.length; key < len; key++) {
                            console.log(obj[key].title);
                            cat.push({
                                id:obj[key].id,
                                num:key,
                                product_name:obj[key].product_name,
                                available_quantity:obj[key].ws_quantity,
                                report_quantity:1,
                                price:obj[key].subtotal,
                                subtotal:obj[key].subtotal,
                                expiry:obj[key].expiry
                            })
                        }

                        self.expiries = cat;
                        self.total = obj.length;
                        self.fetchup = false;

                    }).catch(
                    e => {
                        console.log(e);
                        self.loader = false;

                        this.err.push(e);
                    }
                )
            },
            loadOne(){
                this.ex_time="Next month"
                this.ex_color="orange--text text--darken-3";

                this.fetchup=true;
                let d = new Date();

                let thisYear = d.getFullYear();
                let thisMonth = d.getMonth();

                const ex_month = thisMonth+'/'+thisYear;


                const monthy={
                    ex_date:ex_month,
                };

                let self = this;
                axios.post(this.apiSet.expiry, monthy)
                    .then(response=>{
                        const cat=[];
                        const obj = response.data.data;
                        for (let key = 0, len = obj.length; key < len; key++) {
                            console.log(obj[key].title);
                            cat.push({
                                id:obj[key].id,
                                num:key,
                                product_name:obj[key].product_name,
                                available_quantity:obj[key].ws_quantity,
                                report_quantity:1,
                                price:obj[key].subtotal,
                                subtotal:obj[key].subtotal,
                                expiry:obj[key].expiry
                            })
                        }

                        self.expiries = cat;
                        self.total = obj.length;
                        self.fetchup = false;

                    }).catch(
                    e => {
                        console.log(e);
                        self.loader = false;

                        this.err.push(e);
                    }
                )
            },
            loadTwo(){
                this.ex_time="Next 2 months";
                this.ex_color="green--text text--darken-3";


                this.fetchup=true;
                let d = new Date();

                let thisYear = d.getFullYear();
                let thisMonth = d.getMonth() - 1;

                const ex_month = thisMonth+'/'+thisYear;


                const monthy={
                    ex_date:ex_month,
                };

                let self = this;
                axios.post(this.apiSet.expiry, monthy)
                    .then(response=>{
                        const cat=[];
                        const obj = response.data.data;
                        for (let key = 0, len = obj.length; key < len; key++) {
                            console.log(obj[key].title);
                            cat.push({
                                id:obj[key].id,
                                num:key,
                                product_name:obj[key].product_name,
                                available_quantity:obj[key].ws_quantity,
                                report_quantity:1,
                                price:obj[key].subtotal,
                                subtotal:obj[key].subtotal,
                                expiry:obj[key].expiry
                            })
                        }

                        self.expiries = cat;
                        self.total = obj.length;
                        self.fetchup = false;

                    }).catch(
                    e => {
                        console.log(e);
                        self.loader = false;

                        this.err.push(e);
                    }
                )
            },

            onAddCat(){
                let self = this;
                this.$validator.validateAll().then((result)=>{
                    if(result){
                        this.loader = true;
                        const catData={
                            cat_name:this.cat_name,
                            cat_user:"aximilli",
                            // cat_user:this.cat_user,

                        };


                        axios.post(this.apiSet.singleCategory, catData)
                            .then(function (response) {
                                self.closeup();
                                self.su_snackbar=true;
                                self.loadCategories();
                                self.loader = false;

                            })
                            .catch(function (error) {
                                self.loader = false;
                                self.er_snackbar = true;
                            });
                    }
                    else{
                        this.form_error_snack = true;
                        return false;
                    }
                });

            },

            clearFields(){
                this.cat_name='',
                    this.cat_user='',

                    this.$store.commit('setSubmitLoadState',false);
                this.loader = false;
                this.$validator.reset();
            },
            closeup(){
                this.clearFields();
                this.dialog = false;

            },
            close_edit(){
                this.clearFields();
                this.edit_dialog = false;

            },

            editItem (item) {
                this.editedIndex = this.categories.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.edit_dialog = true
            },

            deleteItem (item) {
                let self = this;
                // let confirmFn = this.del(item);

                let confirmFn = function() {
                    self.del(item);
                }

                let obj = {
                    title: 'Report as Expired',
                    message: 'Are you sure you want to Report Product?',
                    type: 'warning',
                    useConfirmBtn: true,
                    onConfirm: confirmFn
                }
                this.$refs.simplert.openSimplert(obj);

            },

            del(item){
                let self = this;
                let apiUrl = this.$store.state.config.url;
                const index = this.expiries.indexOf(item);
                this.expiries.splice(index, 1);

                axios.patch(apiUrl+'/expiry_rep/'+item.id)
                    .then(function(response){
                        console.log(response);
                        self.del_snackbar = true;

                        if(self.ex_time === "This month" ){
                            self.loadExpiries();
                        }

                        if(self.ex_time === "Next month" ){
                            self.loadOne();
                        }
                        if(self.ex_time === "Next month" ){
                            self.loadTwo();
                        }

                        self.$store.commit('setNetError',false);

                    }).catch(function(error){
                    self.$store.commit('setNetError',true);
                    console.log(error);
                })
            },


        }
    }
</script>

<style scoped>
    .cpoint{
        cursor:pointer;
    }
    .thead{
        background: #474747 url('/static/img/bg.png');
    }
    .ttext{
        color: #2e3436;
        text-shadow: 0px 2px 3px rgba(0,0,0,0.3);
    }

</style>