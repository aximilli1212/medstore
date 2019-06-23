<template>
    <div>

        <v-spacer></v-spacer>
        <v-dialog v-model="pay_dialog" persistent max-width="960px">
            <v-card>
                <v-toolbar dense>
                    <v-toolbar-title class="primary--text">Make Payment [<i :class="cus_color">{{cus_type}}</i>]</v-toolbar-title>

                    <v-spacer></v-spacer>
                    <v-btn icon @click.native="closeup">
                        <v-icon color="secondary">mdi-close</v-icon>
                    </v-btn>

                </v-toolbar>
                <v-card-text>
                    <v-layout>
                        <v-flex sm6>
                            <v-flex sm8 offset-sm2 >
                                <p
                                >
                                    <v-select
                                            :items="pay_met"
                                            box
                                            v-model="payup.pay_method"
                                            label="Payment Method"
                                            full-width
                                            required
                                            offset-y
                                            data-vv-name="pay_method"
                                            :error-messages="errors.collect('pay_method')"
                                            v-validate="'required'"
                                    ></v-select>
                                </p>
                                <v-flex v-if="payup.pay_method === 'CREDIT' " sm12 md12>
                                    <v-alert
                                            v-model="credit_ex"
                                            dismissible
                                            type="error"
                                    >Credit Limit [<i class="green--text text--darken-3">Ghc {{credit_limit}}</i>] Exceeded.
                                    </v-alert>
                                </v-flex>
                                <v-flex v-if="payup.pay_method === 'CHEQUE' " sm12 md12>
                                    <v-text-field
                                            box
                                            v-model="payup.cheque_no"
                                            data-vv-name="cheque"
                                            :error-messages="errors.collect('cheque')"
                                            v-validate="'required'"
                                            label="Cheque Number"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex v-if="payup.pay_method === 'MoMo' " sm12 md12>
                                    <v-text-field
                                            box
                                            v-model="payup.momo_no"
                                            data-vv-name="momo_no"
                                            placeholder="024XXXXXXX"
                                            :error-messages="errors.collect('momo_no')"
                                            v-validate="'required|numeric'"
                                            label="Mobile Money Number"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex v-if="payup.pay_method === 'VISA' " sm12 md12>
                                    <v-select
                                            :items="bankList"
                                            box
                                            v-model="payup.visa_bank"
                                            label="Select Receiving Bank"
                                            full-width
                                            required
                                            offset-y
                                            data-vv-name="visa_bank"
                                            :error-messages="errors.collect('visa_bank')"
                                            v-validate="'required'"
                                    ></v-select>
                                </v-flex>

                                <v-flex sm12 md12>
                                    <v-textarea
                                            v-model="payup.pay_comments"
                                            box
                                            name="input-7-4"
                                            label="Additional Comments/ Note"
                                            value=""
                                    ></v-textarea>
                                </v-flex>

                            </v-flex>

                        </v-flex>

                        <v-flex sm6>
                            <v-container elevation-3>

                                <v-data-table
                                        :headers="headers"
                                        :items="sales_payment"
                                        hide-actions
                                        class="elevation-1 mb-0"
                                >
                                    <template slot="items" slot-scope="props">
                                        <td class="subheading">{{ props.item.amount_due }}</td>
                                        <td class="subheading">
                                            <v-text-field
                                                    autofocus
                                                    class="blue--text"
                                                    width="20"
                                                v-model="props.item.tendered"
                                                    data-vv-name="tendered"
                                                    :error-messages="errors.collect('tendered')"
                                                    v-validate="'numeric'"

                                        >
                                        </v-text-field></td>
                                        <td class="subheading">{{ props.item.change }}</td>

                                    </template>
                                </v-data-table>

                                <div class="container">
                                    <div class="calc-body">
                                        <div class="calc-button-row">
                                            <div class="button" @click="addTend(7)">7</div>
                                            <div class="button" @click="addTend(8)">8</div>
                                            <div class="button" @click="addTend(9)">9</div>
                                            <div class="button l small" @click="sumTend(10)">+10</div>
                                        </div>
                                        <div class="calc-button-row">
                                            <div class="button" @click="addTend(4)">4</div>
                                            <div class="button" @click="addTend(5)">5</div>
                                            <div class="button" @click="addTend(6)">6</div>
                                            <div class="button l small" @click="sumTend(20)">+20</div>

                                        </div>
                                        <div class="calc-button-row">
                                            <div class="button" @click="addTend(1)">1</div>
                                            <div class="button" @click="addTend(2)">2</div>
                                            <div class="button" @click="addTend(3)">3</div>
                                            <div class="button l small" @click="sumTend(50)">+50</div>

                                        </div>
                                        <div class="calc-button-row">
                                            <div class="button c" @click="clearScreen">C</div>
                                            <div class="button" @click="addTend(0)">0</div>
                                            <div class="button" @click="addTend('.')">.</div>
                                            <div class="button l" @click="spliceTend"><v-icon color="secondary">mdi-arrow-left</v-icon></div>
                                        </div>

                                        <div class="calc-button-row">
                                            <v-btn @click="generateInv"  :loading="loader"
                                                    :disabled="tendSet" class="pushr grey--text text--darken-4" large><v-icon left>mdi-map</v-icon>Generate Invoice</v-btn>
                                        </div>

                                    </div>
                                </div>

                            </v-container>
                        </v-flex>
                    </v-layout>

                </v-card-text>
            </v-card>
        </v-dialog>
        <!----------------------------------------------UPDATE SINGLE ITEM DIALOG-------------------------------------------------------------------------------->

        <simplert :useRadius="true"
                  :useIcon="true"
                  ref="simplert">
        </simplert>

    </div>
</template>

<script>
    import { eventBus } from '../../../../main.js';

    let axios = require("axios");
    export default {
        props:[
            'pay_dialog',
        ],
        name: "open_sus",
        $_veeValidate: {
            validator: 'new'
        },
        data:() => ({
            total:0,
            fetchup:false,
            tendSet:true,
            credit_ex:false,
            credit_limit:0,
            cus_type:'CASH CUSTOMER',
            cus_color:'green--text text--darken-3',
            payup:{
                pay_comments:'',
                pay_method:'CASH',
                cheque_no:'',
                momo_no:'',
                visa_bank:'',
            },

            headers: [
                {
                    text: 'AMOUNT DUE',
                    align: 'left',
                    sortable: false,
                    class:'body-2',
                    value: 'amount'
                },
                { text: 'TENDERED',
                    sortable: false,
                    class:'body-2',
                    value: 'calories' },
                { text: 'CHANGE',
                    sortable: false,
                    class:'body-2',
                    value: 'fat' },
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
            pay_met(){
                let a = [ 'CASH', 'CREDIT','VISA', 'CHEQUE','MoMo'];
                let b = [ 'CASH','VISA', 'CHEQUE','MoMo'];

               if(this.getSaleCus.credit > 0){
                   return a;
               }
               else{
                   return b;
               }

            },
            bankList(){
                let catSet =  this.$store.getters.getBankDrop;
                let exSet = [];

                for (let key = 0, len = catSet.length; key < len; key++) {
                    exSet.push(catSet[key].bank_name);

                }

                return exSet;
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
            tendered(){
               let tend = this.sales_payment[0].tendered - this.sales_payment[0].amount_due;

               if(tend >= 0 && !this.credit_ex){
                   this.sales_payment[0].change = tend;
                   this.tendSet = false;
               }
               else{
                   this.sales_payment[0].change = 0.00;
                   this.tendSet = true;
               }
            },
            payMet(val){
                this.sales_payment[0].tendered = 0;
                if(val === 'CREDIT'){
                    let cr = this.getSaleCus.credit;
                    let due = this.sales_payment[0].amount_due;
                    let diff = cr - due;

                    if(diff < 0){
                        this.credit_limit = cr;
                        this.tendSet = true;
                        this.credit_ex = true;
                    }
                    else{
                        this.tendSet = false;
                        this.credit_ex = false;
                    }
                }
                else{
                    this.credit_ex = false;
                }

                switch(val){
                    case 'CREDIT':
                        this.cus_type = "CREDIT CUSTOMER";
                        this.cus_color="secondary--text text--darken-3";
                        break;
                    case 'CASH':
                        this.cus_type = "CASH CUSTOMER";
                        this.cus_color="green--text text--darken-3";
                        break;
                    case 'VISA':
                        this.cus_type = "VISA CUSTOMER";
                            this.cus_color="orange--text text--darken-3";
                        break;
                    case 'CHEQUE':
                        this.cus_type = "CHEQUE CUSTOMER";
                            this.cus_color="teal--text text--darken-3"
                        break;
                    case 'MoMo':
                        this.cus_type = "MOBILE MONEY CUSTOMER";
                            this.cus_color="lime--text text--darken-4"
                        break;
                    default:
                        this.cus_type = "CASH CUSTOMER";
                        this.cus_color="green--text text--darken-3";

                }
            }
        },

        methods:{
            setDue(){
                this.sales_payment[0].amount_due = this.getCurrentSales.total;
            },

            addTend(n){
                if(this.sales_payment[0].tendered === 0){
                    this.sales_payment[0].tendered = '';
                }
                this.sales_payment[0].tendered += ""+n ;
            },

            sumTend(s){
                this.sales_payment[0].tendered = parseFloat(this.sales_payment[0].tendered) + s ;
            },

            spliceTend(){
                let cur = this.sales_payment[0].tendered.toString();
                let res = cur.slice(0,-1);

                this.sales_payment[0].tendered = res;
            },

            clearScreen(){
                this.sales_payment[0].tendered = 0;
                this.sales_payment[0].change = 0.00;
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

                let addData = {
                    invoice_no:invoice_no,
                     payment_type:this.payup.pay_method,
                    amount_tendered:this.sales_payment[0].tendered,
                    amount_due:this.sales_payment[0].amount_due,
                    change_due:this.sales_payment[0].change,

                }


                this.$store.commit('setAddData',addData);

                const PayData={
                    customer_id: this.cusID,
                    outlet_id: this.userData.outlet_id,
                    company_id: this.userData.company_id,
                    user_id: this.userData.id,
                    sale_status: 0,
                    sale_transaction_id:trans_id,
                    payment_type:this.payup.pay_method,
                    payment_amount:this.sales_payment[0].amount_due,
                    amount_tendered:this.sales_payment[0].tendered,
                    amount_due:this.sales_payment[0].amount_due,
                    change_due:this.sales_payment[0].change,
                    total_items:this.getCurrentSales.total_items,
                    invoice_no:invoice_no,
                    session:this.getSession.id,
                    momo_no:this.payup.momo_no,
                    cheque_no:this.payup.cheque_no,
                    visa_bank:this.payup.visa_bank,
                    pay_comments:this.payup.pay_comments,
                    date_received:new Date(),
                };

                axios.post(this.apiSet.singleSalePayment, PayData)
                    .then(function (response) {

                        let sale_payment_id = response.data[1].sale_payment_id;


                        self.doSaleItems(trans_id,sale_payment_id,invoice_no);


                    })
                    .catch(function (error) {
                        console.log(error);
                    });





            },

            doSaleItems(trans_id,payment_id,invoice_no){

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
                        item_cost_price: prodSet[key].price,
                        item_selling_price: prodSet[key].price,
                        invoice_no: invoice_no,
                        discount_percentage: prodSet[key].discount,
                        tax: prodSet[key].price,
                    };

                    axios.post(this.apiSet.singleSaleItem, prodComplete)
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

            closeup(){

                this.payup.pay_method = "CASH";
                this.sales_payment[0].tendered = 0.00;
                eventBus.$emit('close_pay',false);



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