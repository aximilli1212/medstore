<template>
    <div>

        <v-spacer></v-spacer>


            <v-dialog v-model="return_dialog" persistent max-width="1260px">

                <v-card class="pa-2">
                    <v-toolbar dense>
                        <v-toolbar-title class="primary--text">

                            Return Items [<i class="secondary--text">#{{getCurrentSales.invoice_no}}</i>
                            ]

                        </v-toolbar-title>

                        <v-spacer></v-spacer>
                        <v-tooltip top>
                        <v-btn
                                slot="activator"
                                icon @click.native="closeup">
                            <v-icon color="secondary">mdi-close</v-icon>
                        </v-btn>
                            <span>Reset & Close</span>
                        </v-tooltip>

                    </v-toolbar>

                    <v-card-title>
                        <v-btn color="secondary" class="elevation-6" @click="ret_full" small><v-icon left>mdi-refresh</v-icon> Return All Items</v-btn>
                        <v-btn color="primary" class="elevation-6" @click="cancel_full" small><v-icon left>mdi-close</v-icon> Reset</v-btn>
                        <v-chip class="elevation-3">Total: {{getRet.length}}</v-chip>

                        <v-spacer></v-spacer>
                        <v-text-field
                                v-model="search"
                                append-icon="search"
                                label="Search"
                                outline
                                hide-details
                        ></v-text-field>
                    </v-card-title>

                    <v-tooltip top>
                        <!--tool-->

                    <v-data-table
                            slot="activator"
                            :headers="headers"
                            :items="getRet"
                            :search="search"
                            :loading="fetchup"
                            class="elevation-2"
                    >
                        <template slot="items" slot-scope="props">
                            <td>{{ props.item.product_name }}</td>
                            <td>{{ props.item.price }}</td>
                            <td>{{ props.item.or_quantity }}</td>
                            <td>
                                <v-edit-dialog
                                        :return-value.sync="props.item.ret_quantity"
                                        large
                                        lazy
                                        persistent
                                        @save="ret_save(props.item,props.item.ret_quantity)"
                                        @cancel="cancel"
                                        @open="open"
                                        @close="close"
                                >
                                    <div>{{ props.item.ret_quantity }}</div>
                                    <div slot="input" class="mt-3 title">Return Quantity</div>
                                    <v-text-field
                                            slot="input"
                                            v-model="props.item.ret_quantity"
                                            label="Edit"
                                            single-line
                                            autofocus
                                            v-validate="'numeric|required'"
                                            data-vv-name="quantity"
                                            required
                                            :error-messages="errors.collect('quantity')"

                                    ></v-text-field>
                                </v-edit-dialog>
                            </td>
                            <td>{{ props.item.new_quantity }}</td>
                            <!--<td>{{ props.item.indiv_ret_amt }}</td>-->
                            <!--<td>{{ props.item.indiv_new_amt }}</td>-->
                            <td class="justify-center layout px-0">

                                <v-btn
                                        flat
                                        small
                                        class="mr-2 red--text cpoint"
                                        @click="ret_all(props.item,props.item.or_quantity)"
                                >
                                    <v-icon>
                                        mdi-playlist-play
                                    </v-icon>
                                    Return all
                                </v-btn>

                                <v-btn
                                        flat
                                        small
                                        class="mr-2 primary--text cpoint"
                                        @click="cancel_ret(props.item,0)"
                                >
                                    <v-icon>
                                        mdi-close
                                    </v-icon> Cancel</v-btn>
                            </td>
                        </template>
                        <template slot="no-data">
                            <v-progress-linear></v-progress-linear>
                        </template>
                        <v-alert slot="no-results" :value="true" color="error" icon="warning">
                            Your search for "{{ search }}" found no results.
                        </v-alert>
                    </v-data-table>

                        <!--tipppy-->
                        <span>Click on return quantity to set it.</span>
                    </v-tooltip>

                    <v-card-text>
                        <v-layout>
                            <v-flex sm7>


                            </v-flex>

                            <v-flex sm5>
                                <v-container elevation-3>

                                    <v-list dense>

                                        <v-list-tile>
                                            <v-list-tile-content>Total Items:</v-list-tile-content>
                                            <v-list-tile-content class="align-end">{{getRet.length}}</v-list-tile-content>
                                        </v-list-tile>
                                        <v-list-tile>
                                            <v-list-tile-content>Discount:</v-list-tile-content>
                                            <v-list-tile-content class="align-end">GH¢ {{getCurrentSales.discount_amount}} [%{{getCurrentSales.discount_percentage}}]</v-list-tile-content>
                                        </v-list-tile>
                                        <v-list-tile>
                                            <v-list-tile-content>Original Cost:</v-list-tile-content>
                                            <v-list-tile-content class="align-end">GH¢ {{getCurrentSales.total}}</v-list-tile-content>
                                        </v-list-tile>
                                        <v-divider></v-divider>
                                        <v-list-tile>
                                            <v-list-tile-content class="subheading">New Amount:</v-list-tile-content>
                                            <v-list-tile-content class="align-end subheading green--text text--darken-3">GH¢{{new_amt}}</v-list-tile-content>
                                        </v-list-tile>
                                        <v-list-tile>
                                            <v-list-tile-content class="headline">Return Amt:</v-list-tile-content>
                                            <v-list-tile-content class="align-end headline red--text text--darken-3 ">GH¢ {{ret_amt}}</v-list-tile-content>
                                        </v-list-tile>

                                    </v-list>


                                </v-container>
                            </v-flex>
                        </v-layout>

                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="orange darken-3" large dark @click.native="generateInv"><v-icon left>mdi-undo-variant</v-icon>Return Items</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>




        <!----------------------------------------------UPDATE SINGLE ITEM DIALOG-------------------------------------------------------------------------------->

        <simplert :useRadius="true"
                  :useIcon="true"
                  ref="simplert">
        </simplert>

        <v-snackbar
                :timeout="8000"
                :top="true"
                :right="x === 'right'"
                v-model="snack"
        >
            {{snackText}}
            <v-btn flat :color="snackColor" @click.native="snack = false">Close</v-btn>
        </v-snackbar>

    </div>
</template>

<script>
    import { eventBus } from '../../../../main.js';

    let axios = require("axios");
    export default {
        props:[
            'return_dialog',
        ],
        name: "open_cpayment",
        $_veeValidate: {
            validator: 'new'
        },
        data:() => ({
            show:false,
           snack:false,
           snackText:'',
           snackColor:'',
            total:0,
            fetchup:false,
            tendSet:true,
            search:'',
            new_amt:0,
            ret_amt:0,
            headers:[
                {
                    text: 'Product Name',
                    align: 'left',
                    sortable: false,
                    class:'body-2',
                    value: 'product_name'
                },
                { text: 'Price(GHc)',
                    sortable: false,
                    class:'body-2',
                    value: 'price'
                },
                { text: 'Original Quantity',
                    sortable: false,
                    class:'body-2',
                    value: 'or_quantity'
                },
                { text: 'Return Quantity',
                    sortable: false,
                    class:'body-2',
                    value: 'fat' },
                { text: 'New Quantity',
                    sortable: false,
                    class:'body-2',
                    value: 'new_quantity',
                },
                // { text: 'ret amt',
                //     sortable: false,
                //     class:'body-2',
                //     value: 'new_quantity' },
                // { text: 'New amt',
                //     sortable: false,
                //     class:'body-2',
                //     value: 'new_quantity' },

                { text: '',
                    sortable: false,
                    class:'body-2',
                    value: 'actions' },
            ],
            returnees:[
                {
                    product_name:'Chalk Box',
                    or_quantity:400,
                    ret_quantity:20,
                    new_quantity:380,

                }
            ],
            sales_payment: [
                {
                    amount_due: '0.00',
                    tendered:0,
                    change: '0.00',
                },

                ],
            loader:false,




        }),
        mounted(){
            eventBus.$on('set_due',(p)=>{
                this.setDue();
            });


        },
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },

            apiSet() {
                return this.$store.getters.getApi
            },
            tendered() {
                return this.sales_payment[0].tendered;
            },
            payMet(){
                return this.payup.pay_method;
              },
            getCurrentSales() {
                return this.$store.getters.getCurrentSales;
            },
            getCurrentProducts() {
                return this.$store.getters.getCurrentProducts;
            },
            getSession() {
                return this.$store.getters.getSalesSession;
            },
            getSaleCus() {
                return this.$store.getters.getSaleCustomer;
            },
            getUserData() {
                return this.$store.getters.getUserData;
            },
            getRet() {
                return this.$store.getters.getReturnees;
            },
            cusID(){
                return this.$store.getters.getCustomerID;
            },
            submit_loading() {
                return true;
            },
            submitted() {
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
            },


        },

        methods:{
            setDue(){
                this.sales_payment[0].amount_due = this.getCurrentSales.total;
            },

            generateInv(){
                // Make Payment Here
                let self = this;
                this.loader = true;

                this.$validator.validateAll().then((result)=>{
                    if(result) {

                        const TransData = {
                            customer_id: this.cusID,
                            outlet_id: this.userData.outlet_id,
                            company_id: this.userData.company_id,
                            user_id: this.userData.id,
                            sale_status: 0,
                        };

                        console.log(TransData);

                        axios.post(this.apiSet.singleSaleTransaction, TransData)
                            .then(function (response) {
                                console.log(response.data[1].sale_trans_id);

                                let sale_trans_id = response.data[1].sale_trans_id;
                                self.doSalePayment(sale_trans_id);

                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                    else{
                        this.loader = false;
                    }
                });


            },

            doSalePayment(trans_id){
                let self = this;

                let invoice_no = this.userData.company_name.charAt(0)+'-'+trans_id+this.getCurrentSales.outlet_id;
                let old_invoice_no = this.getCurrentSales.invoice_no;

                let addData = {
                    invoice_no:invoice_no,
                    old_invoice_no:old_invoice_no,
                    payment_type:"RETURN",
                    amount_tendered:0,
                    amount_due:0,
                    change_due:0,

                }


                this.$store.commit('setAddData',addData);

                const PayData={
                    customer_id: this.cusID,
                    outlet_id: this.userData.outlet_id,
                    company_id: this.userData.company_id,
                    user_id: this.userData.id,
                    sale_status: 1,
                    sale_transaction_id:trans_id,
                    payment_type:"RETURN",
                    payment_amount:this.getCurrentSales.ret_total,
                    return_amount:this.getCurrentSales.ret_total,
                    amount_tendered:0,
                    amount_due:0,
                    change_due:0,
                    total_items:this.getCurrentSales.total_items,
                    invoice_no:invoice_no,
                    old_invoice_no:old_invoice_no,
                    session:this.getSession.id,
                    momo_no:0,
                    cheque_no:0,
                    visa_bank:"",
                    pay_comments:"THIS IS A RETURN SALE",
                    date_received:new Date(),
                };

                axios.post(this.apiSet.singleSalePayment, PayData)
                    .then(function (response) {

                        let sale_payment_id = response.data[1].sale_payment_id;


                        self.doSaleItems(trans_id,sale_payment_id,invoice_no,old_invoice_no);


                    })
                    .catch(function (error) {
                        console.log(error);
                    });





            },

            doSaleItems(trans_id,payment_id,invoice_no,old_invoice_no){

                let prodComplete = {};
                let prodSet = this.getCurrentProducts;


                for (let key = 0, len = prodSet.length; key < len; key++) {


                    prodComplete = {
                        customer_id: this.cusID,
                        outlet_id: this.userData.outlet_id,
                        company_id: this.userData.company_id,
                        user_id: this.userData.id,
                        sale_status: 0,
                        sale_transaction_id: trans_id,
                        sale_payment_id: payment_id,
                        product_id: prodSet[key].id,
                        product_name: prodSet[key].product_name,
                        quantity: prodSet[key].quantity,
                        return_quantity: prodSet[key].ret_quantity,
                        item_cost_price: prodSet[key].price,
                        item_selling_price: prodSet[key].price,
                        invoice_no: invoice_no,
                        old_invoice_no: old_invoice_no,
                        discount_percentage: prodSet[key].discount,
                        tax: prodSet[key].price,
                        sus_code: prodSet[key].sus_code,
                    };

                    axios.post(this.apiSet.returnSaleItems, prodComplete)
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                            this.er_snackbar = true;

                        });
                }



                // Nii
                this.loader = false;
                this.closeup();
                this.$router.push('/sale_invoice')
            },



            ret_save(ind,val){


                let indy = this.getRet.indexOf(ind);

                let new_quantity =this.getRet[indy].or_quantity - parseInt(val);

                if(new_quantity < 0){
                  this.snack = true;
                  this.snackText = "Sorry! return value too large";
                  this.snackColor = "red darken-3";
                    this.getRet[indy].ret_quantity = "0";
                    this.getRet[indy].new_quantity = this.getRet[indy].or_quantity;
                    return false
                }
                else{
                  this.getRet[indy].new_quantity = new_quantity;
                  this.getRet[indy].indiv_new_amt = new_quantity * this.getRet[indy].price;
                  this.getRet[indy].indiv_ret_amt = val * this.getRet[indy].price;

                  let pload = {
                      indy: indy,
                      ret_quantity:parseInt(val),
                      rem_quantity: new_quantity,
                  }

                  this.$store.commit('setReturnProds',pload);

                }

                // this.$validator.validateAll().then((result)=>{
                //     if(result){

                let nt = this.getRet.reduce((t, n) => t + n.indiv_new_amt, 0);
                let rt = this.getRet.reduce((t, n) => t + n.indiv_ret_amt, 0);


                        this.new_amt =  nt;
                        this.ret_amt = rt;

                        let ptotal={
                            indy:indy,
                            rem_total:nt,
                            ret_total:-rt,
                        }

                this.$store.commit('setReturnSales',ptotal);



                // Update total Amount
                        // let new_quantity = Object.values(this.getRet).reduce((t, n) => t + n.sub_total, 0);


                    // }
                    // else{
                    //     this.snack = true;
                    //     this.snackText  = "Sorry you entered Invalid Discount Value.";
                    //     this.snackColor  = "red";
                    //     this.sale_prod[indy].discount = 0;
                    //     return false;
                    // }
                // });

            },
            ret_all(ind,val){


                let indy = this.getRet.indexOf(ind);

                let new_quantity =this.getRet[indy].or_quantity - parseInt(val);

                if(new_quantity < 0){
                  this.snack = true;
                  this.snackText = "Sorry! return value too large";
                  this.snackColor = "red darken-3";
                    this.getRet[indy].ret_quantity = "0";
                    this.getRet[indy].new_quantity = this.getRet[indy].or_quantity;
                    return false
                }
                else{
                    this.getRet[indy].ret_quantity = val;
                  this.getRet[indy].new_quantity = new_quantity;
                  this.getRet[indy].indiv_new_amt = new_quantity * this.getRet[indy].price;
                  this.getRet[indy].indiv_ret_amt = val * this.getRet[indy].price;



                    let pload = {
                        indy: indy,
                        ret_quantity:parseInt(val),
                        rem_quantity: new_quantity,
                    }

                    this.$store.commit('setReturnProds',pload);

                }

                // this.$validator.validateAll().then((result)=>{
                //     if(result){

                let nt = this.getRet.reduce((t, n) => t + n.indiv_new_amt, 0);
                let rt = this.getRet.reduce((t, n) => t + n.indiv_ret_amt, 0);


                        this.new_amt =  nt;
                        this.ret_amt = rt;


                let ptotal={
                    indy:indy,
                    rem_total:nt,
                    ret_total:-rt,
                }

                this.$store.commit('setReturnSales',ptotal);

            },

            cancel_ret(ind,val){


                let indy = this.getRet.indexOf(ind);

                let new_quantity =this.getRet[indy].or_quantity - parseInt(val);

                if(new_quantity < 0){
                    this.snack = true;
                    this.snackText = "Sorry! return value too large";
                    this.snackColor = "red darken-3";
                    this.getRet[indy].ret_quantity = "0";
                    this.getRet[indy].new_quantity = this.getRet[indy].or_quantity;
                    return false
                }
                else{
                    this.getRet[indy].ret_quantity = val;
                    this.getRet[indy].new_quantity = new_quantity;
                    this.getRet[indy].indiv_new_amt = new_quantity * this.getRet[indy].price;
                    this.getRet[indy].indiv_ret_amt = val * this.getRet[indy].price;

                    let pload = {
                        indy: indy,
                        ret_quantity:parseInt(val),
                        rem_quantity: new_quantity,
                    }

                    this.$store.commit('setReturnProds',pload);



                }

                // this.$validator.validateAll().then((result)=>{
                //     if(result){

                let nt = this.getRet.reduce((t, n) => t + n.indiv_new_amt, 0);
                let rt = this.getRet.reduce((t, n) => t + n.indiv_ret_amt, 0);


                this.new_amt =  nt;
                this.ret_amt = rt;

                let ptotal={
                    indy:indy,
                    rem_total:nt,
                    ret_total:-rt,
                }

                this.$store.commit('setReturnSales',ptotal);

            },

            ret_full(){
                for(let key = 0; key < this.getRet.length ; key++){

                    let new_quantity = 0;
                     let val = this.getRet[key].or_quantity;
                    this.getRet[key].ret_quantity = val;
                        this.getRet[key].new_quantity = new_quantity;
                        this.getRet[key].indiv_new_amt = new_quantity * this.getRet[key].price;
                        this.getRet[key].indiv_ret_amt = val * this.getRet[key].price;


                    let pload = {
                        indy: key,
                        ret_quantity:parseInt(val),
                        rem_quantity: new_quantity,
                    }

                    this.$store.commit('setReturnProds',pload);


                }

                let nt = this.getRet.reduce((t, n) => t + n.indiv_new_amt, 0);
                    let rt = this.getRet.reduce((t, n) => t + n.indiv_ret_amt, 0);

                    this.new_amt =  nt;
                    this.ret_amt = rt;


                let ptotal={
                    rem_total:nt,
                    ret_total:-rt,
                }

                this.$store.commit('setReturnSales',ptotal);
            },

            cancel_full(){
                for(let key = 0; key < this.getRet.length ; key++){

                    let val = 0;
                     let new_quantity = this.getRet[key].or_quantity;
                    this.getRet[key].ret_quantity = val;
                        this.getRet[key].new_quantity = new_quantity;
                        this.getRet[key].indiv_new_amt = new_quantity * this.getRet[key].price;
                        this.getRet[key].indiv_ret_amt = val * this.getRet[key].price;

                    let pload = {
                        indy: key,
                        ret_quantity:parseInt(val),
                        rem_quantity: new_quantity,
                    }

                    this.$store.commit('setReturnProds',pload);


                }

                let nt = this.getRet.reduce((t, n) => t + n.indiv_new_amt, 0);
                    let rt = this.getRet.reduce((t, n) => t + n.indiv_ret_amt, 0);

                    this.new_amt =  nt;
                    this.ret_amt = rt;

                let ptotal={
                    rem_total:nt,
                    ret_total:-rt,
                }

                this.$store.commit('setReturnSales',ptotal);
            },

            doReturn(){

            },

            closeup(){
                eventBus.$emit('close_return',false);
                this.ret_amt = 0;
                this.new_amt = 0;
                this.getRet = [];
            },

            cancel () {
                this.snack = true;
                this.snackColor = 'error';
                this.snackText = 'Canceled';
            },
            open () {
                this.snack = true;
                this.snackColor = 'info';
                this.snackText = 'Return opened';
            },
            close () {
                console.log('Dialog closed');


            },


        }

    }

</script>

<style scoped>
    .headclass{
        background-color:green;
        color:red;
    }
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

    .calc-body {
        width: 325px;
        margin: auto;
        min-height: 300px;
        border: solid 1px #3A4655;
        box-shadow: 0 2px 10px -7px black;
    }

    .calc-screen {
        background: #3A4655;
        width: 100%;
        height: 150px;
        padding: 20px;
    }

    .calc-operation {
        text-align: right;
        color: #727B86;
        font-size: 21px;
        padding-bottom: 10px;
        border-bottom: dotted 1px;
    }

    .calc-typed {
        margin-top: 20px;
        font-size: 45px;
        text-align: right;
        color: #fff;
    }
    .pushr{
        margin-left:41px;
    }

    .calc-button-row {
        width: 100%;
        background: #3C4857;
    }

    .button {
        width: 25%;
        background: #425062;
        color: #fff;
        padding: 12px;
        display: inline-block;
        font-size: 25px;
        text-align: center;
        vertical-align: middle;
        margin-right: -4px;
        border-right: solid 2px #3C4857;
        border-bottom: solid 2px #3C4857;
        transition: all 0.2s ease-in-out;
    }

    .button.l {
        color: #AEB3BA;
        background: #404D5E;
    }

    .button.c {
        color: #660033;
        background: #404D5E;
    }


    .button:hover {
        background: #E3e3e3;
        color:#000;
        cursor:pointer;
    }

    .button.c:hover,
    .button.l:hover {
        background: #E3e3e3;
        color: #000;
    }


</style>
