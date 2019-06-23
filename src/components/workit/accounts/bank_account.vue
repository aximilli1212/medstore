<template>
    <div>
        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-btn slot="activator" color="secondary" dark class="mb-2"><v-icon>mdi-plus</v-icon>New Account</v-btn>
            <v-card>
                <v-toolbar >
                    <v-toolbar-title class="primary--text">Add Bank Account</v-toolbar-title>

                    <v-spacer></v-spacer>


                    <v-btn icon @click.native="dialog = false">
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
                                            v-model="bank_data.bank_name"
                                            v-validate="'required'"
                                            data-vv-name="bank_name"
                                            required
                                            :error-messages="errors.collect('bank_name')"

                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-select
                                            offset-y
                                            :items="['CURRENT','SAVINGS']"
                                            label="Account Type"
                                            v-validate="'required'"
                                            required
                                            v-model="bank_data.account_type"
                                            data-vv-name="account_type"
                                            :error-messages="errors.collect('account_type')"
                                            box
                                            required
                                    ></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Account Name"
                                            placeholder="eg. Gokals ltd."
                                            v-model="bank_data.account_name"
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
                                            v-model="bank_data.account_num"
                                            data-vv-name="acc_num"
                                            :error-messages="errors.collect('acc_num')"
                                            v-validate="'required'"

                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Opening Bal"
                                            required
                                            v-model="bank_data.open_bal"
                                            data-vv-name="opening_bal"
                                            v-validate="'required'"
                                            :error-messages="errors.collect('opening_bal')"
                                    >

                                    </v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Closing Bal"
                                            required
                                            v-model="bank_data.close_bal"
                                            v-validate="'required'"
                                            data-vv-name="closing_bal"
                                            :error-messages="errors.collect('closing_bal')"
                                    >

                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Opening Date"
                                            placeholder="dd/mm/yyyy"
                                            mask="##/##/####"
                                            required
                                            return-masked-value
                                            v-model="bank_data.opening_date"
                                            data-vv-name="opening_date"
                                            v-validate="'date_format:DD/MM/YYYY'"
                                            :error-messages="errors.collect('opening_date')"
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
                    <v-btn color="grey" flat @click.native="closeup">Close</v-btn>

                    <v-btn
                            @click="onAddAccount"
                            color="secondary"
                            :loading="loader"
                            :disabled="loader"

                    ><v-icon left>mdi-library-plus</v-icon>Add Account</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>



        <!--Edit Dialog Starts here-->

 <v-dialog v-model="edit_dialog" persistent max-width="500px">
            <v-card>
                <v-toolbar >
                    <v-toolbar-title class="primary--text">Edit Bank Account</v-toolbar-title>

                    <v-spacer></v-spacer>


                    <v-btn icon @click.native="edit_dialog = false">
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
                                            v-model="editedItem.bank_name"
                                            v-validate="'required'"
                                            data-vv-name="ebank_name"
                                            required
                                            :error-messages="errors.collect('ebank_name')"

                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-select
                                            offset-y
                                            :items="['CURRENT','SAVINGS']"
                                            label="Account Type"
                                            v-validate="'required'"
                                            required
                                            v-model="editedItem.account_type"
                                            data-vv-name="eaccount_type"
                                            :error-messages="errors.collect('eaccount_type')"
                                            box
                                            required
                                    ></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Account Name"
                                            placeholder="eg. Gokals ltd."
                                            v-model="editedItem.account_name"
                                            data-vv-name="eacc_name"
                                            v-validate="'required'"
                                            :error-messages="errors.collect('eacc_name')"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Account Num"
                                            placeholder="eg. 000116467893"
                                            v-model="editedItem.account_num"
                                            data-vv-name="eacc_num"
                                            :error-messages="errors.collect('eacc_num')"
                                            v-validate="'required'"

                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Opening Bal"
                                            required
                                            v-model="editedItem.open_bal"
                                            data-vv-name="eopening_bal"
                                            :error-messages="errors.collect('eopening_bal')"
                                    >

                                    </v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Closing Bal"
                                            required
                                            v-model="editedItem.close_bal"
                                            v-validate="'required'"
                                            data-vv-name="eclosing_bal"
                                            :error-messages="errors.collect('eclosing_bal')"
                                    >

                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Opening Date"
                                            placeholder="dd/mm/yyyy"
                                            required
                                            v-model="editedItem.opening_date"
                                            mask="##/##/####"
                                            return-masked-value
                                            data-vv-name="eopening_date"
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
                    <v-btn color="grey" flat @click.native="closeup">Close</v-btn>

                    <v-btn
                            @click="onUpdateAccount"
                            color="secondary"
                            :loading="loader"
                            :disabled="loader"

                    ><v-icon left>mdi-library-plus</v-icon>Update Account</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>



        <v-card class="thead">
            <v-card-title>
                <v-btn icon color="primary" @click="$router.go(-1)" small><v-icon>mdi-arrow-left-thick</v-icon></v-btn>
                <p class="headline ttext mt-3">Bank Accounts [ <i class="green--text text--darken-3">{{total}}</i> ]</p>
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
                    :items="bank_account"
                    :search="search"
                    :loading="fetchup"
                    class="elevation-8"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.bank_name }}</td>
                    <td>{{ props.item.account_name }}</td>
                    <td>{{ props.item.account_type }}</td>
                    <td>{{ props.item.open_bal }}</td>
                    <td>{{ props.item.close_bal }}</td>
                    <td>{{ props.item.added_by }}</td>
                    <td>{{ props.item.opening_date }}</td>
                    <td class="justify-center layout px-0">

                        <v-btn
                                flat
                                small
                                class="mr-2 teal--text cpoint"
                                @click="editItem(props.item)"
                        ><v-icon

                        >
                            mdi-pencil
                        </v-icon> Edit</v-btn>

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
                >
            {{ snackText }}
            <v-btn   flat :color="snackColor" @click="snack = false">Close</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
    let axios = require("axios");
    export default {
        name: "bank_account",
        data () {
            return {
                snack:false,
                snackText:"",
                snackColor:"",
                fetchup:false,
                loader:false,
                edit_dialog:false,
                bank_data:
                    {
                        value: false,
                        id: 1,
                        bank_name: '',
                        account_name: '',
                        account_type: '',
                        account_num: 0,
                        close_bal: 0,
                        open_bal: 0,
                        added_by: '',
                        opening_date: ''
                    },

                search: '',
                headers: [
                    { text: 'Id', align: 'left', sortable: false, value: 'id',class:'subheading'},
                    { text: 'Bank Name', align: 'left', value: 'bank_name',class:'subheading' },
                    { text: 'Account Name', align: 'left', value: 'acc_name',class:'subheading' },
                    { text: 'Type', align: 'left', value: 'acc_type',class:'subheading' },
                    { text: 'Opening Bal', value: 'opening_bal',class:'subheading' },
                    { text: 'Closing Bal', value: 'closing_bal',class:'subheading' },
                    { text: 'By', Value: 'added_by',class:'subheading' },
                    { text: 'Date', Value: 'date',class:'subheading' },
                    { text: '', value: 'name', align: 'centre', sortable: false }
                ],
                dialog:false,
                total:'',
                outlet:'Warehouse',
                editedIndex: -1,
                editedItem: {
                    value: false,
                    id: 123454,
                    bank_name: 'Ecobank',
                    account_name: 'GOKALS LTD',
                    account_type: 'SAVINGS',
                    account_num: 29283938,
                    close_bal: 6.0,
                    open_bal: 24,
                    added_by: 'aximilli32',
                    opening_date: '03/04/2018'
                },
                defaultItem: {
                    name: '',
                    calories: 0,
                    fat: 0,
                    carbs: 0,
                    protein: 0
                },
                bank_account: [],
            }
        },
        mounted(){
            this.loadBankAccounts();
        },
        watch: {
            dialog(val){
                val || this.close()
            }
        },
        computed: {
            apiSet() {
                return this.$store.getters.getApi
            },
        },
        methods:{
            loadBankAccounts(){
                this.fetchup=true;
                let self = this;
                axios.get(this.apiSet.allBankAccounts)
                    .then(response=>{
                        const cat=[];
                        console.log(response.data.data);
                        const obj = response.data.data;
                        // for(let key in obj){
                        // for (let key = 0, len = obj.length; key < len; key++) {
                        //     console.log(obj[key].title);
                        //     cat.push({
                        //         id:obj[key].id,
                        //         num:key,
                        //         cat_name:obj[key].cat_name,
                        //         cat_user:obj[key].cat_user,
                        //
                        //     })
                        // }
                        self.bank_account = obj;
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

            onAddAccount(){
                let self = this;
                this.$validator.validateAll().then((result)=>{
                    if(result){
                        this.loader = true;
                        const catData= this.bank_data;

                          catData.added_by = this.userData.user_name;
                          catData.cid= this.userData.company_id;
                          catData.oid = this.userData.outlet_id;


                        axios.post(this.apiSet.singleBankAccount, catData)
                            .then(function (response) {
                                self.closeup();
                                self.snack=true;
                                self.snackText="Bank Account Successfully Added";
                                self.snackColor="green";

                                self.loadBankAccounts();
                                self.loader = false;

                            })
                            .catch(function (error) {
                                self.loader = false;
                                self.er_snackbar = true;
                            });
                    }
                    else{
                        this.snack = true;
                        this.snackText = "Sorry Correct Errors on form";
                        this.snackColor = "red";
                        this.reset();
                        return false;
                    }
                });

            },

            onUpdateAccount() {

                let self = this;

                this.formError=false;
                if (this.editedIndex > -1) {
                    Object.assign(this.bank_account[this.editedIndex], this.editedItem)

                    let objID = this.editedItem.id;
                    this.loader = true;


                    let catUpdate = this.editedItem;

                    let apiUrl = this.$store.state.config.url;

                    axios.patch(apiUrl+'/bankaccount/'+objID, catUpdate)
                        .then(function (response) {
                            console.log(response);
                            self.loader = false;
                            self.snack = true;
                            self.snackText = "Account Successfully Edited";
                            self.snackColor = "green";
                            self.edit_dialog = false;
                            self.$validator.reset();
                            self.loadBankAccounts();

                        })
                        .catch(function (error) {
                            console.log(error);
                            self.loader = false;
                            self.snack = true;
                            self.snackText = "Error. Please Contact Administrator";
                            self.snackColor = "red";
                            self.edit_dialog = false;

                        });

                } else {
                    console.log(this.editedItem);
                    self.snack = true;
                    self.snackText = "Error. Item not Selected.";
                    self.snackColor = "red";

                }
            },

            closeup(){
                this.dialog = false;
                this.bank_data.account_name = '';
                this.bank_data.bank_name = '';
                this.bank_data.account_num = '';
                this.bank_data.open_bal = '';
                this.bank_data.close_bal = '';
                this.bank_data.user_id = '';
                this.bank_data.opening_date = '';

                this.$validator.reset();


            },
            reset(){
                this.bank_data.account_name = '';
                this.bank_data.bank_name = '';
                this.bank_data.account_num = '';
                this.bank_data.open_bal = 0;
                this.bank_data.close_bal = 0;
                this.bank_data.user_id = '';
                this.bank_data.opening_date = '';

                this.$validator.reset();


            },
            editItem (item) {
                this.editedIndex = this.bank_account.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.edit_dialog = true;
            },

            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.reconciliation[this.editedIndex], this.editedItem)
                } else {
                    this.reconciliation.push(this.editedItem)
                }
                this.close()
            }
        }
    }
</script>

<style lang="scss" scoped>
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