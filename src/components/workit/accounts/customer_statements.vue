<template>
    <div>
        <v-dialog v-model="receive_dialog" persistent max-width="400px">
            <v-card>
                <v-toolbar dense>
                    <v-toolbar-title class="primary--text">Receive Payment</v-toolbar-title>

                    <v-spacer></v-spacer>
                    <v-btn icon @click.native="closeup">
                        <v-icon color="secondary">mdi-close</v-icon>
                    </v-btn>

                </v-toolbar>
                <v-card-text>
                    <v-layout>
                        <v-flex sm12 md12>
                            <v-flex sm8 offset-sm2 >
                                <p>
                                    <v-select
                                            :items="[ 'CASH','VISA', 'CHEQUE','MoMo']"
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
                                            :error-messages="errors.collect('momo_no')"
                                            v-validate="'required'"
                                            label="Mobile Money Number"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex v-if="payup.pay_method === 'VISA' " sm12 md12>
                                    <v-select
                                            :items="[ 'Zenith', 'Barclays','SG-Bank', 'Fidelity']"
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
                                <v-flex sm12 md12>
                                    <v-btn
                                            :loading="pay_loader"
                                           @click="receive_pay"
                                            large
                                            class="secondary"
                                    ><v-icon left>mdi-cash</v-icon> Receive Payment </v-btn>
                                </v-flex>

                            </v-flex>

                        </v-flex>

                    </v-layout>

                </v-card-text>
            </v-card>
        </v-dialog>




        <!--INDIVIDUAL DEBT DIALOG-->

        <v-dialog v-model="indiv_dialog" persistent max-width="1200px">

            <v-card
                    class="elevation-4"
            >
                <v-card-title>
                    <p class="headline ttext mt-1">[ <i class="green--text text--darken-3">{{indiv_total}}</i> ] {{indiv_cus}} | </p><br />
                    <p class="small ttext mt-1">Credit Limit [ <i class="orange--text text--darken-3">Gh¢ {{indiv_limit}}</i> ]</p><br />
                    <v-spacer></v-spacer>


                    <!--<v-btn large class="secondary elevation-8" @click="open_receive_pay(debt_id)"><v-icon left>mdi-cash-multiple</v-icon> Receive Payment </v-btn>-->
                    <v-btn icon @click.native="indiv_dialog = false">
                        <v-icon color="secondary">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-data-table
                        :headers="indiv_headers"
                        :items="indiv_debt"
                        :loading="fetchup"
                        class="elevation-1"
                >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.num }}</td>
                        <td>{{ props.item.product_name }}</td>
                        <td>{{ props.item.purchase_date }}</td>
                        <td>{{ props.item.quantity }}</td>
                        <td>{{ props.item.price }}</td>
                        <td>{{ props.item.total_amount }}</td>
                        <!--<td class="justify-center layout px-0">-->

                            <!--<v-btn-->
                                    <!--flat-->
                                    <!--small-->
                                    <!--class="mr-2 teal&#45;&#45;text cpoint"-->
                                    <!--@click="receive_pay(props.item)"-->
                            <!--&gt;<v-icon left>mdi-cash-multiple</v-icon>-->
                                <!--Receive Payment-->
                            <!--</v-btn>-->
                        <!--</td>-->

                    </template>
                    <template slot="no-data">
                        <v-alert :value="true" color="primary" icon="add">
                            Data table Empty.
                        </v-alert>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                    </v-alert>
                </v-data-table>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey darken-1" flat @click.native="close">Cancel</v-btn>
                    <v-btn color="primary darken-1"dark @click.native=""><v-icon left>mdi-printer</v-icon>Print</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>






        <v-card class="thead">
            <v-card-title>
                <v-btn icon color="primary" @click="$router.go(-1)" small><v-icon>mdi-arrow-left-thick</v-icon></v-btn>
                <p class="headline ttext mt-3">Customer Statements
                    <!--[ <i class="green&#45;&#45;text  text&#45;&#45;darken-3">Gh¢ {{total_debt}}</i> ]-->

                </p>
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                        outline
                ></v-text-field>
            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="debtors"
                    :search="search"
                    :loading="fetchup"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.phone_no }}</td>
                    <td>{{ props.item.credit }}</td>
                    <td>{{ props.item.pdate }}</td>
                    <td class="justify-center layout px-0">
                       
                       <!--<v-btn-->
                            <!--flat-->
                            <!--small-->
                            <!--class="mr-2 teal&#45;&#45;text cpoint"-->
                            <!--@click="open_receive_pay(props.item.id)"-->
                    <!--&gt;<v-icon>mdi-cash</v-icon>-->
                           <!--Receive Payment-->
                       <!--</v-btn>-->



                        <v-btn
                            flat
                            small
                            class="mr-2 secondary--text cpoint"
                            @click="view_det(props.item.invoice_no,props.item.name,props.item.credit_limit,props.item.id)">
                            <v-icon>mdi-pencil</v-icon>
                            View Details
                        </v-btn>
                    </td>
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
                v-model="snack"
                color=""
        >
            {{snackText}}
            <v-btn flat :color="snackColor" @click.native="snack = false">Close</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
    let axios = require("axios");
    export default {
        name: "customer_statements",
        $_veeValidate: {
            validator: 'new'
        },
        data () {
            return {
                search: '',
                loader:false,
                snack:false,
                snackText:'',
                snackColor:'',
                pay_loader:false,
                fetchup:false,
                indiv_total:'',
                indiv_cus:'',
                indiv_limit:'',
                total_debt:'',
                indiv_invoice:'',
                indiv_dialog:false,
                debt_id:-1,
                receive_dialog:false,
                payup:{
                    pay_comments:'',
                    pay_method:'CASH',
                    cheque_no:'',
                    momo_no:'',
                    visa_bank:'',
                },
                headers: [
                    { text: 'Id', align: 'left', sortable: false, value: 'id',class:'subheading'},
                    { text: 'Customer Name', align: 'left', value: 'name',class:'subheading' },
                    { text: 'Phone No.', align: 'left', value: 'phone_no',class:'subheading' },
                    { text: 'Credit Amount(Ghc)', value: 'credit', align: 'left', class:'subheading' },
                    { text: 'Purchase Date', value: 'pdate', align: 'left', class:'subheading' },
                    { text: '', Value: 'name', align: 'left', class:'subheading' },
                ],
                indiv_headers: [
                    { text: 'No.', align: 'left', sortable: false, value: 'num',class:'subheading'},
                    { text: 'Product Name', align: 'left', value: 'product_name',class:'subheading' },
                    { text: 'Purchase Date', align: 'left', value: 'purchase_date',class:'subheading' },
                    { text: 'Quantity', value: 'quantity', align: 'left', class:'subheading' },
                    { text: 'Price(Ghc)', value: 'price', align: 'left', class:'subheading' },
                    { text: 'Total Amount(Ghc)', value: 'total_amount', align: 'left', class:'subheading' },
                    // { text: '', Value: 'name', align: 'left', class:'subheading' },
                ],
                dialog:false,
                outlet:'Warehouse',
                editedIndex: -1,
                editedItem: {
                    name: '',
                    calories: 0,
                    fat: 0,
                    carbs: 0,
                    protein: 0
                },
                defaultItem:{
                    name: '',
                    calories: 0,
                    fat: 0,
                    carbs: 0,
                    protein: 0
                },
                indiv_debt:[],
                debtors: [],
            }
        },
        watch: {
            dialog(val){
                val || this.close()
            }
        },
        mounted(){
            this.loadDebtors();
        },
        computed: {

            apiSet() {
                return this.$store.getters.getApi
            },
        },
        methods:{
            loadDebtors(){
                    let self = this;
                    this.fetchup = true;
                    let pebble={
                        oid:this.userData.outlet_id,
                        cid:this.userData.company_id
                    }

                    axios.post(this.apiSet.postDebtors, pebble)
                        .then(response=>{
                            const deb_show=[];
                            const obj = response.data.data;
                            console.log(obj);
                            // for(let key in obj){
                            for (let key = 0, len = obj.length; key < len; key++) {
                                deb_show.push({
                                    id:obj[key].id,
                                    num:key,
                                    name:obj[key].sale_transaction.customer.firstname+' '+obj[key].sale_transaction.customer.lastname,
                                    phone_no:obj[key].sale_transaction.customer.phone_no,
                                    credit_limit:obj[key].sale_transaction.customer.credit,
                                    credit:obj[key].amount_due,
                                    invoice_no:obj[key].invoice_no,
                                    pdate:obj[key].date_received
                                })
                            }
                            self.debtors = deb_show;
                            self.fetchup = false;
                            self.total_debt = Object.values(deb_show).reduce((t, n) => t + parseInt(n.credit), 0);
s
                        }).catch(
                        e => {
                            console.log(e);
                            self.fetchup = false;
                            this.err.push(e);
                        }
                    )
            },

            view_det(invoice,cus_name,limit,obj_id){
                    let self = this;
                    this.fetchup = true;
                    axios.get(this.apiSet.allDebitItems+"/"+invoice)
                        .then(response=>{
                            const deb_show=[];
                            const obj = response.data.data;
                            console.log(obj);
                            // for(let key in obj){
                            for (let key = 0, len = obj.length; key < len; key++) {


                                deb_show.push({
                                    id:obj[key].id,
                                    num:key,
                                    product_name:obj[key].product.product_name,
                                    purchase_date:obj[key].purchase_date,
                                    quantity:obj[key].quantity,
                                    invoice_no:obj[key].invoice_no,
                                    price:obj[key].item_selling_price,
                                    total_amount:(obj[key].item_selling_price * obj[key].quantity),
                                })
                            }
                            self.indiv_debt = deb_show;
                            self.indiv_total = deb_show.length;
                            self.indiv_cus = cus_name;
                            self.indiv_limit = limit;
                            self.debt_id = obj_id;
                            self.fetchup = false;
                            self.indiv_dialog = true;


                        }).catch(
                        e => {
                            console.log(e);
                            self.fetchup = false;

                            this.err.push(e);
                        }
                    )
            },

            open_receive_pay(obj_id){
                this.debt_id = obj_id;
                this.dialog = false;
                this.receive_dialog = true;
            },
            receive_pay(){

                let self = this;
                this.pay_loader = true;

                this.$validator.validateAll().then((result)=>{
                    if(result) {


                        let objid = this.debt_id;

                        const payData = {
                            payment_type: this.payup.pay_method,
                            pay_comments: this.payup.pay_comments,
                            cheque_no: this.payup.cheque_no,
                            momo_no: this.payup.momo_no,
                            visa_bank: this.visa_bank,
                            date_received: new Date(),
                            _method: 'PUT'
                        }

                        let apiUrl = this.$store.state.config.url;

                        axios.patch(apiUrl + '/clear_debt/' + objid, payData)
                            .then(function (response) {
                                console.log(response);
                                self.pay_loader = false;
                                self.snack = true;
                                self.snackText="Payment Sucessfully received.";
                                self.snackColor ="green";
                                self.loadDebtors();
                                self.closeup();

                            })
                            .catch(function (error) {
                                console.log(error);
                                self.pay_loader = false;
                                self.snack = true;
                                self.snackText="Database error occurred";
                                self.snackColor ="red";

                            });
                    }
                    else{
                            this.pay_loader = false;
                            this.snack = true;
                            this.snackText="Please enter pay details";
                            this.snackColor ="red";
                        }
                    });




            },
            closeup(){
                this.debt_id = -1;
                this.dialog = false;
                this.indiv_dialog = false;
                this.receive_dialog = false;
                    this.payup.pay_comments='';
                this.payup.pay_method='CASH';
                this.payup.cheque_no='';
                    this.payup.momo_no='';
                    this.payup.visa_bank='';
            }


        },
    }
</script>

<style lang="scss" scoped>
    .thead{
        background: #474747 url('/static/img/bg.png');
    }
    .ttext{
        color: #2e3436;
        text-shadow: 0px 2px 3px rgba(0,0,0,0.3);
    }
    .centerup{
        font-size:25px;
        background-color: #666666;
        -webkit-background-clip: text;
        -moz-background-clip: text;
        background-clip: text;
        color: transparent;
        text-shadow: rgba(255,255,255,0.5) 0px 3px 3px;
    }
    .cent tr td:first-child{
        font-weight:bold;
        font-size:14px;
        color:#222222;
    }
    </style>