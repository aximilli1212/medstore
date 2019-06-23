<template>
    <div>

        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card>
                <v-toolbar>
                    <v-toolbar-title class="primary--text">Add Customer</v-toolbar-title>

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
                                            label="Firstname"
                                            required
                                            box
                                            v-model="firstname"
                                            v-validate="'required'"
                                            data-vv-name="firstname"
                                            :error-messages="errors.collect('firstname')"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            label="Lastname"
                                            required
                                            box
                                            v-model="lastname"
                                            v-validate="'required'"
                                            data-vv-name="lastname"
                                            :error-messages="errors.collect('lastname')"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Phone No."
                                            prepend-icon="mdi-phone"
                                            placeholder="02XXXXXXXX"
                                            v-model="phone"
                                            v-validate="'numeric'"
                                            data-vv-name="phone"
                                            :error-messages="errors.collect('phone')"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Email"
                                            prepend-icon="mdi-email"
                                            placeholder="email@email.com"
                                            v-model="email"

                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Address"
                                            prepend-icon="mdi-domain"
                                            required
                                            v-model="address"

                                    >

                                    </v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Company"
                                            prepend-icon="mdi-domain"
                                            required
                                            v-model="company"

                                    >

                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 md6 sm6>
                                    <v-text-field
                                            label="Debit Amount(Ghc)"
                                            v-model="debit_amt"
                                            type="number"
                                            box
                                            prepend-icon="mdi-cash-multiple"


                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 md6 sm6>
                                    <v-text-field
                                            box
                                            label="Purchase Date"
                                            placeholder="dd/mm/yyyy"
                                            required
                                            prepend-icon="mdi-calendar"
                                            v-model="purchase_date"
                                            mask="##/##/####"
                                            return-masked-value
                                    >

                                    </v-text-field>
                                </v-flex>






                                <v-flex xs12 md6 sm6>
                                    <v-text-field
                                            label="Credit Limit"
                                            type="number"
                                            required
                                            v-model="credit"
                                            v-validate="'numeric|required'"
                                            data-vv-name="credit"
                                            :error-messages="errors.collect('credit')"
                                    ></v-text-field>
                                </v-flex><v-flex xs12 md6 sm6>
                                <v-text-field
                                        label="Discount Percentage"
                                        v-model="discount_percentage"
                                        prefix="%"
                                        type="number"
                                        v-validate="'numeric|required'"
                                        data-vv-name="discount"
                                        :error-messages="errors.collect('discount')"
                                ></v-text-field>
                            </v-flex><v-flex xs12 md6 sm6>
                                <v-text-field label="Discount Amount"
                                              v-model="discount_amount"
                                              type="number"
                                              v-validate="'numeric|required'"
                                              data-vv-name="discount_amt"
                                              :error-messages="errors.collect('discount_amt')"
                                ></v-text-field>
                            </v-flex><v-flex xs12 md6 sm6>
                                <v-text-field
                                        label="Inc. Markup e.g: 1.4"
                                        v-model="markup"
                                        placeholder="Increase Price by markup"
                                        type="number"
                                        required
                                        v-validate="'decimal|required'"
                                        data-vv-name="markup"
                                        :error-messages="errors.collect('markup')"
                                ></v-text-field>
                            </v-flex>

                            </v-layout>
                        </v-container>
                    </v-form>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click.native="closeup">Close</v-btn>
                    <v-btn
                            @click="onAddCustomer"
                            color="secondary"
                            :loading="loader"
                            :disabled="loader"

                    >Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!----------------------------------------------UPDATE SINGLE ITEM DIALOG-------------------------------------------------------------------------------->


        <v-snackbar
                :timeout="6000"
                :top="true"
                :right="x === 'right'"
                v-model="form_error_snack"
        >
            Error. Sorry!!! Please Correct form errors.
            <v-btn flat color="red" @click.native="form_error_snack = false">Close</v-btn>
        </v-snackbar>


        <v-snackbar
                :timeout="6000"
                :top="true"
                :right="x === 'right'"
                v-model="er_snackbar"
        >
            Please Enter Customer Details.
            <v-btn flat color="red" @click.native="er_snackbar = false">Close</v-btn>
        </v-snackbar>

        <v-snackbar
                :timeout="6000"
                :top="true"
                :right="x === 'right'"
                v-model="su_snackbar"
                color=""
        >
            Customer Successfully Added.
            <v-btn flat color="green" @click.native="su_snackbar = false">Close</v-btn>
        </v-snackbar>

        <simplert :useRadius="true"
                  :useIcon="true"
                  ref="simplert">
        </simplert>

    </div>
</template>

<script>
    import { eventBus } from '../../../../main.js';

    var axios = require("axios");
    export default {
        props:[
            'dialog',
        ],
        name: "add_cus",
        $_veeValidate: {
            validator: 'new'
        },
        data: () => ({
            total:0,
            fetchup:false,
            edit_dialog: false,
            loader:false,
            title:'Mr.',
            firstname:'',
            lastname:'',
            phone:'',
            email:'',
            company:'',
            address:'',
            credit:0,
            discount_percentage:0,
            discount_amount:0,
            purchase_date:'01/01/2000',
            debit_amt:0,
            markup:1,
            search:'',
            su_snackbar:false,
            er_snackbar:false,
            gender: ['Male', 'Female'],
            headers: [
                {text: 'No.', align: 'left', value: 'num'},
                {text: 'Customer Name', align: 'left', value: 'name'},
                { text: 'Phone No.', align: 'left', value: 'phone'},
                { text: 'Credit', align: 'left', value: 'credit' },
                { text: 'Actions', value: 'name', align: 'centre', sortable: false }
            ],
            customers: [],
            editedIndex: -1,
            editedItem: {
                id:'',
                validate:true,
                title:'Mr',
                firstname: '',
                lastname: '',
                phone_no: '',
                email: '',
                company: '',
                address: '',
                credit: '',
                discount_percentage: '',
                discount_amount: '',
                markup: '',
            },
            defaultItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0
            },
            side_items:[
                { icon: 'mdi-history', text: 'History',link:'/customer_history' },

            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            phoneRules: [
                v => !!v || 'Phone Number is required',
                v => /.+@.+/.test(v) || 'Phone Number must be numeric'
            ],
        }),

        computed:{
            formTitle () {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
            apiSet(){
                return this.$store.getters.getApi
            },
            formIsValid(){
                return this.title!=='' &&
                    this.firstname!=='' &&
                    this.lastname!=='' &&
                    this.phone!=='' &&
                    this.email!=='' &&
                    this.company!=='' &&
                    this.address!=='' &&
                    this.credit!=='' &&
                    this.discount_percentage!=='' &&
                    this.discount_amount!=='' &&
                    this.markup!==''
            },
            editFormIsValid(){
                return this.editedItem.firstname!=='' &&
                    this.editedItem.lastname!=='' &&
                    this.editedItem.phone!=='' &&
                    this.editedItem.email!=='' &&
                    this.editedItem.company!=='' &&
                    this.editedItem.address!=='' &&
                    this.editedItem.credit!=='' &&
                    this.editedItem.discount_percentage!=='' &&
                    this.editedItem.discount_amount!=='' &&
                    this.editedItem.markup!==''
            },
        },
        submit_loading(){
            return true;
        },
        submitted(){
            return this.$store.state.submittedState;
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

        methods: {
            setSide(){

                this.$store.commit('setSideItems',this.side_items);
                this.$store.commit('setDrawer',true);
            },

            loadCustomers(){

                const customers = [];
                const obj = this.$store.getters.getCustomers;
                for (let key = 0, len = obj.length; key < len; key++) {
                    let fullname = obj[key].firstname +' '+obj[key].lastname;
                    customers.push(
                        fullname
                    )
                }

                this.states = customers;
                console.log(customers);
            },

            onAddCustomer(){

                this.$validator.validateAll().then((result)=>{
                    if(result) {


                        this.loader = true;
                        const UserData = {
                            outlet_id:this.userData.outlet_id,
                            company_id:this.userData.company_id,
                            title: this.title,
                            firstname: this.firstname,
                            lastname: this.lastname,
                            phone: this.phone,
                            email: this.email,
                            company: this.company,
                            address: this.address,
                            credit: this.credit,
                            discount_percentage: this.discount_percentage,
                            discount_amount: this.discount_amount,
                            markup: this.markup,
                            purchase_date:this.purchase_date,
                            credit_amount:this.debit_amt,
                            credit_state:0,
                        };

                        // if(!this.formIsValid){
                        //     this.er_snackbar=true;
                        //     console.log(UserData);
                        //     return false;
                        // }

                        let self = this;

                        axios.post(this.apiSet.singleCustomer, UserData)
                            .then(function (response) {
                                console.log(response);
                                self.closeup();
                                self.su_snackbar = true;

                                self.loader = false;
                                self.$store.dispatch('loadCustomers');
                                eventBus.$emit('fetch_cuslist');
                                eventBus.$emit('close_dialog', false);
                                self.loadCustomers();
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                    else{
                            eventBus.$emit('form_error');
                            return false;
                        }
                    });

                // this.$store.commit('setSubmitLoadState',true);

                // this.$store.dispatch('createCustomer',UserData);

            },

            clearFields(){
                this.title='',
                    this.firstname='',
                    this.lastname='',
                    this.email='',
                    this.phone='',
                    this.company='',
                    this.address='',
                    this.credit='',
                    this.discount_percentage='',
                    this.discount_amount='',
                    this.markup='',


                    this.$store.commit('setSubmitLoadState',false);
                // this.$validator.reset();
            },
            closeup(){
                this.clearFields();
                eventBus.$emit('close_dialog',false);


            },
            close_edit(){
                this.clearFields();
                this.edit_dialog = false;

            },

            editItem (item) {
                this.editedIndex = this.customers.indexOf(item);
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
                    title: 'Delete Customer',
                    message: 'Are you sure you want to Delete Customer?',
                    type: 'warning',
                    useConfirmBtn: true,
                    onConfirm: confirmFn
                }

                this.$refs.simplert.openSimplert(obj);

            },

            // deleteItem (item) {
            //     confirm('Are you sure you want to delete this item?') && this.del(item);
            // },
            del(item){
                let self = this;
                let apiUrl = this.$store.state.config.url;
                const index = this.customers.indexOf(item);
                this.customers.splice(index, 1);

                axios.delete(apiUrl+'/customer/'+item.id)
                    .then(function(response){
                        console.log(response);
                        self.del_snackbar = true;
                        self.loadCustomers();
                        self.$store.commit('setNetError',false);

                    }).catch(function(error){
                    self.$store.commit('setNetError',true);
                    console.log(error);
                })
            },

            close() {
                this.dialog = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1
                }, 300)
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