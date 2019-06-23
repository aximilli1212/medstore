<template>
    <div>
        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-btn slot="activator" color="primary" dark class="mb-2">New Transaction</v-btn>
            <v-card>
                <v-toolbar >
                    <v-toolbar-title class="primary--text">{{formTitle}}</v-toolbar-title>

                    <v-spacer></v-spacer>


                    <v-btn icon @click.native="closeup">
                        <v-icon color="secondary">mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>


                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container grid-list-md elevation-3>
                            <v-layout wrap >
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            label="Bank"
                                            box
                                            v-model="b.bank_name"
                                            v-validate="'required'"
                                            data-vv-name="bank_name"
                                            required
                                            :error-messages="errors.collect('bank_name')"

                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-select
                                            offset-y
                                            :items="['DEPOSIT','WITHDRAWAL']"
                                            label="Mode"
                                            v-validate="'required'"
                                            required
                                            v-model="b.mode"
                                            data-vv-name="transact_type"
                                            :error-messages="errors.collect('transact_type')"
                                            box
                                            required
                                    ></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Account Name"
                                            placeholder="eg. Gokals ltd."
                                            v-model="b.account_name"
                                            data-vv-name="acc_name"
                                            v-validate="'required'"
                                            :error-messages="errors.collect('acc_name')"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Account Num"
                                            placeholder="eg. 000116467893"
                                            v-model="b.account_num"
                                            data-vv-name="acc_num"
                                            :error-messages="errors.collect('acc_num')"
                                            v-validate="'required'"

                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Trans. Amt(GHc)"
                                            required
                                            v-model="b.transaction_amount"
                                            data-vv-name="transaction_amt"
                                            v-validate="'required'"
                                            :error-messages="errors.collect('transaction_amt')"
                                    >

                                    </v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Charges"
                                            required
                                            v-model="b.charges"
                                            v-validate="'required'"
                                            data-vv-name="bank_charge"
                                            :error-messages="errors.collect('bank_charge')"
                                    >

                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Trans. Date"
                                            placeholder="dd/mm/yyyy"
                                            required
                                            v-model="b.transaction_date"
                                            mask="##/##/####"                                            return-masked-value
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-form>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="primary" flat @click.native="closeup">Close</v-btn>

                    <v-btn  v-if="editedItem = -1"
                            @click="onAddTrans"
                            color="secondary"
                            :loading="loader"
                            :disabled="loader"

                    ><v-icon left>mdi-library-plus</v-icon>{{btnTitle}}</v-btn>

                </v-card-actions>
            </v-card>
        </v-dialog>



        <v-card class="thead">
            <v-card-title>
                <v-btn icon color="primary" @click="$router.go(-1)" small><v-icon>mdi-arrow-left-thick</v-icon></v-btn>
                <p class="headline ttext mt-3">Bank Transactions [ <i class="green--text text--darken-3">{{total}}</i> ]</p>
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
                    :items="bank_transact"
                    :search="search"
                    :loading="fetchup"
                    class="elevation-8"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.bank_name }}</td>
                    <td>{{ props.item.account_name }}</td>
                    <td>{{ props.item.mode }}</td>
                    <td>{{ props.item.transaction_amount }}</td>
                    <td>{{ props.item.transaction_type }}</td>
                    <!--<td>{{ props.item.userby }}</td>-->
                    <td>{{ props.item.transaction_date }}</td>
                    <td class="justify-center layout px-0">

                        <v-btn  small
                                flat
                                class="primary--text cpoint"
                                @click="editItem(props.item)"
                        ><v-icon

                        >
                            mdi-pencil
                        </v-icon> Edit </v-btn>

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

        <simplert :useRadius="true"
                  :useIcon="true"
                  ref="simplert">
        </simplert>



    </div>
</template>

<script>
    let axios = require("axios");
    export default {
        name: "bank_transact",
        $_veeValidate: {
            validator: 'new'
        },
        data () {
            return {
                loader:false,
                b:{
                    charges:'23323',
                    bank_name:'Zenith Bank',
                    account_name:'Shop',
                    account_num:'234234234',
                    mode:'',
                    transaction_amount:'343434',
                    transaction_date:'04/05/2018',
                    transaction_type:'ererer',
                },
                search: '',
                headers: [
                    { text: 'Bank Name', align: 'left', value: 'bank_name',class:'subheading' },
                    { text: 'Account Name', align: 'left', value: 'account_name',class:'subheading' },
                    { text: 'Mode', value: 'mode',class:'subheading' },
                    { text: 'Amount (Ghc)', Value: 'amount',class:'subheading' },
                    // { text: 'By', Value: 'userby',class:'subheading' },
                    { text: 'Date', value:'transaction_date',align:'center' ,class:'subheading' },
                    { text: '', value: 'name', sortable: false }
                ],
                dialog:false,
                fetchup:false,
                snack:false,
                total:'',
                snackText:false,
                snackColor:'',
                editedIndex: -1,
                editedItem: {
                    name: '',
                    calories: 0,
                    fat: 0,
                    carbs: 0,
                    protein: 0
                },
                defaultItem: {
                    name: '',
                    calories: 0,
                    fat: 0,
                    carbs: 0,
                    protein: 0
                },
                bank_transact: [
                ]
            }
        },
        computed:{
            apiSet(){
                return this.$store.getters.getApi
            },
            unit_cost(){
                return this.editedItem.ws_unit+" Cost(Ghc)";
            },
            runit_cost(){
                return this.editedItem.rt_unit+" Cost(Ghc)";
            },
            formTitle () {
                return this.editedIndex === -1 ? 'Add Transaction' : 'Edit Transaction'
            },
            btnTitle () {
                return this.editedIndex === -1 ? 'Add Transactiod' : 'Update Transaction'
            }
        },
        watch:{
            search (val) {
                val && val !== this.select && this.querySelections(val)
            }
        },
        mounted(){
            // this.setSide();
            this.loadTransactions();

        },

        methods:{
            setSide(){

                this.$store.commit('setSideItems',this.side_items);
                this.$store.commit('setDrawer',true);
            },

            loadTransactions(){
                let self = this;
                this.fetchup = true;
                axios.get(this.apiSet.allBankTransactions)
                    .then(response=>{
                        const obj = response.data.data;

                        self.bank_transact =obj;
                        self.total = obj.length;
                        self.fetchup = false;

                        this.snack = true;
                        this.snackText = "Data Was Successfully loaded.";
                        this.snackColor = "green";

                    }).catch(
                    e => {
                        console.log(e);
                        self.loader = false;
                        this.snack = true;
                        this.snackText = "sorry an error occurred.";
                        this.snackColor = "red";

                        this.err.push(e);
                    }
                )
            },

            onAddTrans(){

                if(this.editedIndex > -1){
                    this.updateTransaction();

                }
                else{

                let self = this;
                this.$validator.validateAll().then((result)=>{
                    if(result){
                        this.loader = true;
                        const catData=this.b;


                        axios.post(this.apiSet.singleBankTransaction, catData)
                            .then(function (response) {
                                self.closeup();
                                self.loadTransactions();
                                self.loader = false;
                                self.snack=true;
                                self.snackText="Success. Data was successfully added.";
                                self.snackColor="green";
                            })
                            .catch(function (error) {
                                self.loader = false;
                                self.snack=true;
                                self.snackText="Error.Sorry an error occured.";
                                self.snackColor="red";
                            });
                    }
                    else{
                        self.snack=true;
                        self.snackText="Error. Please correct form errors.";
                        self.snackColor="red";
                        return false;
                    }
                });
                }

            },



            editItem (item) {

                this.editedIndex = this.bank_transact.indexOf(item);
                const index = this.bank_transact.indexOf(item);
                let raw = this.bank_transact[index];
                this.b = Object.assign({}, raw);
                this.dialog = true;
            },


            closeup(){
                   this.dialog = false;
                    this.b.charges='';
                    this.b.bank_name='';
                    this.b.account_name='';
                    this.b.account_num='';
                    this.b.mode='';
                    this.b.transaction_amount='';
                    this.b.transaction_date='';
                    this.b.transaction_type='';

                this.editedIndex = -1

            },

            updateTransaction() {

                let self = this;

                if (this.editedIndex > -1) {
                    Object.assign(this.bank_transact[this.editedIndex], this.editedItem)

                    let objID = this.editedIndex;
                    let uid = this.bank_transact[objID].id;
                    this.loader = true;

                    console.log(objID);


                    const catData = this.b;

                    axios.patch(this.apiSet.singleBankTransaction + '/' + uid, catData)
                        .then(function (response) {
                            console.log(response);
                            self.loader = false;
                            self.snack = true;
                            self.snackText = "Update Successful";
                            self.snackColor = "green";
                            self.closeup();
                            self.$validator.reset();
                            self.loadTransactions();

                        })
                        .catch(function (error) {
                            console.log(error);
                            self.loader = false;
                            this.snack = true;
                            this.snackText = "Network erorr occured."
                            this.snackColor = "red"
                        });

                } else {
                    console.log(this.editedItem);

                }
            },

            deleteItem (item) {
                let self = this;
                // let confirmFn = this.del(item);

                let confirmFn = function() {
                    self.del(item);
                }

                let obj = {
                    title: 'Delete Customer',
                    message: 'Are you sure you want to Delete Transaction?',
                    type: 'warning',
                    useConfirmBtn: true,
                    onConfirm: confirmFn
                }
                this.$refs.simplert.openSimplert(obj);

            },

            del(item){
                let self = this;
                let apiUrl = this.$store.state.config.url;
                const index = this.inventory.indexOf(item);
                this.inventory.splice(index, 1);

                axios.delete(apiUrl+'/product/'+item.id)
                    .then(function(response){
                        console.log(response);
                        self.del_snackbar = true;
                        self.loadProducts();
                        self.$store.commit('setNetError',false);

                    }).catch(function(error){
                    self.del_error_snack = true;
                    self.$store.commit('setNetError',true);
                    console.log(error);
                })
            },
    }
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