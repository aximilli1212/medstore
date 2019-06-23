<template>
    <div>
        <!--<add-debtor :add_debtor="add_debtor" ></add-debtor>-->
        <v-btn @click.native="$router.push('/creditors_history')" color="secondary" dark small class="mb-2"><v-icon left>mdi-clock</v-icon> View Creditors History</v-btn>

        <v-dialog v-model="receive_dialog" persistent max-width="400px">
            <v-card>
                <v-toolbar dense>
                    <v-toolbar-title class="primary--text">Make Payment</v-toolbar-title>

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
                                            dense
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
                                    <v-text-field
                                            box
                                            v-model="payup.payment_amount"
                                            data-vv-name="payment_amount"
                                            :error-messages="errors.collect('payment_amount')"
                                            v-validate="'required'"
                                            label="Payment Amount"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex sm12 md12>
                                    <v-textarea
                                            v-model="payup.pay_comments"
                                            box
                                            name="input-7-2"
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
                                    ><v-icon left>mdi-cash</v-icon> Make Payment </v-btn>
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
                    <p class="headline ttext mt-1">{{cred_name}} [ <i class="green--text text--darken-3">{{indiv_total}}</i> ] {{indiv_cus}} | </p><br />
                    <p class="small ttext mt-1"> Outstanding Debt [ <i class="orange--text text--darken-3">Gh¢ {{indiv_rem}}</i> ]</p><br />
                    <v-spacer></v-spacer>
                    <v-text-field
                            v-model="indiv_search"
                            append-icon="search"
                            label="Search"
                            single-line
                            hide-details
                            outline
                    ></v-text-field>



                    <v-btn icon @click.native="indiv_dialog = false">
                        <v-icon color="secondary">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-data-table
                        :headers="indiv_headers"
                        :items="indiv_cred"
                        :search="indiv_search"
                        :loading="fetchup"
                        class="elevation-1"
                >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <!--<td>{{ props.item.cred_name }}</td>-->
                        <td>{{ props.item.bal_before }}</td>
                        <td>{{ props.item.payment_amount }}</td>
                        <td>{{ props.item.bal_remaining }}</td>
                        <td>{{ props.item.payment_type }}</td>
                        <td>{{ props.item.payment_date }}</td>
                        <td>{{ props.item.received_by }}</td>

                        <td class="justify-center layout px-0">

                            <!--<v-btn-->
                            <!--flat-->
                            <!--small-->
                            <!--class="mr-2 teal&#45;&#45;text cpoint"-->
                            <!--@click="receive_pay(props.item)"-->
                            <!--&gt;<v-icon left>mdi-cash-multiple</v-icon>-->
                            <!--Receive Payment-->
                            <!--</v-btn>-->
                        </td>

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
                <!--<v-card-actions>-->
                    <!--<v-spacer></v-spacer>-->
                    <!--<v-btn color="grey darken-1" flat @click.native="close">Cancel</v-btn>-->
                    <!--<v-btn color="primary darken-1"dark @click.native=""><v-icon left>mdi-printer</v-icon>Print</v-btn>-->
                <!--</v-card-actions>-->
            </v-card>
        </v-dialog>






        <v-card class="thead">
            <v-card-title>
                <v-btn icon color="primary" @click="$router.go(-1)" small><v-icon>mdi-arrow-left-thick</v-icon></v-btn>
                <p class="headline ttext mt-3">All Creditors [ <i class="green--text  text--darken-3">Gh¢ {{total_debt}}</i> ]</p>
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
                    :items="creditors"
                    :search="search"
                    :loading="fetchup"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.sup_name }}</td>
                    <td>{{ props.item.sup_phone }}</td>
                    <td>{{ props.item.credit_unpaid }}</td>
                    <!--<td>{{props.item.purchase_date}}</td>-->
                    <!--<td>{{d(props.item.due_date)}}</td>-->
                    <td class="justify-center layout px-0">

                        <v-btn
                                flat
                                small
                                class="mr-2 secondary--text cpoint"
                                @click="view_det(props.item.id)">
                            <v-icon>mdi-pencil</v-icon>
                            View History
                        </v-btn>

                        <v-btn
                                flat
                                small
                                class="mr-2 primary--text cpoint"
                                @click="open_receive_pay(props.item.id,props.item.credit_unpaid,props.item.sup_name)"
                        ><v-icon>mdi-cash</v-icon>
                            Make Payment
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
    import AddDebtor from './add_debtor';
    let axios = require("axios");
    import { eventBus } from '../../../main.js';
    import moment from 'moment';

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
                add_debtor:false,
                snackText:'',
                creditors:[],
                snackColor:'',
                pay_loader:false,
                fetchup:false,
                indiv_total:'',
                indiv_cred:'',
                indiv_search:'',
                indiv_limit:'',
                cred_name:'shmoo',
                cred_amount:'',
                indiv_invoice:'',
                indiv_dialog:false,
                cred_id:-1,
                receive_dialog:false,
                payup:{
                    payment_amount:0,
                    pay_comments:'',
                    pay_method:'CASH',
                    cheque_no:'',
                    momo_no:'',
                    visa_bank:'',
                },
                headers: [
                    { text: 'Id', align: 'left', sortable: false, value: 'id',class:'subheading'},
                    { text: 'Supplier Name', align: 'left', value: 'name',class:'subheading' },
                    { text: 'Phone No.', align: 'left', value: 'phone_no',class:'subheading' },
                    { text: 'Credit Amount(Ghc)', value: 'credit', align: 'left', class:'subheading' },
                    // { text: 'Purchase Date', value: 'pdate', align: 'left', class:'subheading' },
                    // { text: 'Due Date', value: 'due_date', align: 'left', class:'subheading' },
                    { text: '', Value: 'name', align: 'left', class:'subheading' },
                ],
                indiv_headers: [
                    { text: 'Id', align: 'left', sortable: false, value: 'id'},
                    // { text: 'Supplier Name', align: 'left', value: 'cred_name' },
                    { text: 'Balance Before', align: 'left', value: 'bal_before' },
                    { text: 'Payment Amount', value: 'payment_amount' },
                    { text: 'Balance Remaining', value: 'bal_remaining' },
                    { text: 'Mode', value: 'payment_type' },
                    { text: 'Payment Date', value: 'payment_date' },
                    { text: 'Paid By', value: 'paid_by' },
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
            eventBus.$on('close_debtor',(p)=>{
                this.add_debtor = p ;
            });

        },
        computed: {

            apiSet() {
                return this.$store.getters.getApi
            },
        },
        methods:{
            d(val){
                let a = moment(val);
                let b = moment();
                let c = 1 + a.diff(b, 'days'); // 1
                return val ? c +" Days" : ''
            },
            loadDebtors(){
                let self = this;
                this.fetchup = true;
                axios.get(this.apiSet.allSupCreditors)
                    .then(response=>{
                        const deb_show=[];
                        const obj = response.data.data;
                        console.log(obj);
                        // for(let key in obj){
                        for (let key = 0, len = obj.length; key < len; key++) {
                            deb_show.push({
                                id:obj[key].id,
                                num:key,
                                sup_name:obj[key].sup_name,
                                sup_phone:obj[key].sup_phone,
                                credit_unpaid:obj[key].credit_unpaid,
                                purchase_date:obj[key].purchase_date,
                                due_date:obj[key].due_date
                            })
                        }

                        self.creditors = deb_show;
                        self.fetchup = false;
                        self.total_debt = Object.values(deb_show).reduce((t, n) => t + parseInt(n.credit_unpaid), 0);
                    }).catch(
                    e => {
                        console.log(e);
                        self.fetchup = false;
                        this.err.push(e);
                    }
                )
            },

            view_det(obj_id,obj_name){
                let self = this;
                this.fetchup = true;
                axios.get(this.apiSet.credHistory+'/'+obj_id)
                    .then(response=>{
                        const deb_show=[];
                        const obj = response.data.data;
                        console.log(obj);
                        let i = obj.length -1;

                        if(obj.length > 0){
                            self.indiv_cred = obj;
                            self.indiv_total = obj.length;
                            self.cred_id = obj_id;
                            self.indiv_rem= obj[i].bal_remaining;
                            self.cred_name= obj[i].cred_name;
                            self.fetchup = false;
                            self.indiv_dialog = true;


                        }
                        else{
                            self.snack = true;
                            self.snackText="Sorry no history available."
                            self.snackColor = "red";
                            self.fetchup = false;
                        }

                    }).catch(
                    e => {
                        console.log(e);
                        self.fetchup = false;

                        this.err.push(e);
                    }
                )
            },

            open_receive_pay(obj_id,obj_amt,obj_name){
                this.cred_id = obj_id;
                this.cred_amount= obj_amt;
                this.cred_name= obj_name;
                this.dialog = false;
                this.receive_dialog = true;
            },
            receive_pay(){

                let self = this;
                this.pay_loader = true;

                this.$validator.validateAll().then((result)=>{
                    if(result) {


                        let objid = this.cred_id;

                        const payData = {
                            payment_type: this.payup.pay_method,
                            pay_comments: this.payup.pay_comments,
                            payment_amount: this.payup.payment_amount,
                            cheque_no: this.payup.cheque_no,
                            momo_no: this.payup.momo_no,
                            visa_bank: this.payup.visa_bank,
                            date_received: new Date(),
                            _method: 'PUT'
                        }

                        let apiUrl = this.$store.state.config.url;

                        axios.patch(apiUrl + '/sup_set_debt/' + objid, payData)
                            .then(function (response) {
                                console.log(response);
                                self.pay_loader = false;
                                self.snack = true;
                                self.snackText="Payment Sucessfully received.";
                                self.snackColor ="green";
                                self.pushHistory();
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

            pushHistory(){
                let today = moment().format('MMM Do YYYY, h:mm a');
                let bal_rem = this.cred_amount - this.payup.payment_amount;

                const credData = {
                    cred_id:this.cred_id,
                    cred_name:this.cred_name,
                    bal_before:this.cred_amount,
                    bal_remaining:bal_rem,
                    payment_amount:this.payup.payment_amount,
                    payment_type: this.payup.pay_method,
                    payment_date: today,
                    received_by:this.userData.user_name,
                    user_id: this.userData.id
                };

                axios.post(this.apiSet.credHistory, credData)
                    .then(function (response) {

                        console.log(response.data.data);

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },





            closeup(){
                this.cred_id = -1;
                this.dialog = false;
                this.payup.payment_amount=0;
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