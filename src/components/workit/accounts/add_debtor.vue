<template>
    <div>

        <v-btn @click="add_deb" color="secondary" dark small class="mb-2"><v-icon left>mdi-plus</v-icon> Add Debtor </v-btn>

        <v-dialog v-model="add_debtor" persistent max-width="500px">
            <v-card>
                <v-toolbar >
                    <v-toolbar-title class="primary--text">Add Debtor</v-toolbar-title>

                    <v-spacer></v-spacer>


                    <v-btn icon @click.native="closeup">
                        <v-icon color="secondary">mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container grid-list-md elevation-3>
                            <v-layout wrap >
                                <v-flex xs12 sm12 md12>

                                    <v-select
                                    :items="gender"
                                    box
                                    label="Please Select Customer"
                                    v-model="debit_customer"
                                    ></v-select>
                                </v-flex>
                                <v-flex xs12 md6 sm6>
                                    <v-text-field
                                            label="Debit Amount(Ghc)"
                                            v-model="debit_amt"
                                            type="number"
                                            box
                                            v-validate="'required'"
                                            data-vv-name="debit_amt"
                                            :error-messages="errors.collect('debit_amt')"

                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 md6 sm6>
                                <v-text-field
                                        box
                                        label="Purchase Date"
                                        placeholder="dd/mm/yyyy"
                                        required
                                        v-model="purchase_date"
                                       mask="##/##/####"
                                        return-masked-value
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
                    <v-btn
                            @click="onAddCustomer"
                            color="secondary"
                            :loading="loader"
                            :disabled="loader"

                    >Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>



    </div>
</template>

<script>
    import { eventBus } from '../../../main.js';
    let axios = require("axios");
    export default {
        name: "add_debtor",
        props:[
            'add_debtor',
        ],
        data: () => ({
            total:0,
            fetchup:false,
            debit_amt:0,
            purchase_date:'',
            dialog: false,
            edit_dialog: false,
            loader:false,
            title:'Mr.',
            firstname:'',
            lastname:'',
            phone:'',
            email:'',
            company:'',
            address:'',
            credit:'',
            discount_percentage:'',
            discount_amount:'',
            markup:'',
            search:'',
            gender: ['Male', 'Female'],
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
                v => !!v || 'Phone Numver is required',
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

        mounted() {
            this.loadCustomers();
            this.setSide();
        },

        methods: {
            setSide(){

                this.$store.commit('setSideItems',this.side_items);
                this.$store.commit('setDrawer',true);
            },
            add_deb(){
                eventBus.$emit('close_debtor',true);
            },
            loadCustomers(){
                this.fetchup=true;
                let self = this;
                axios.get(this.apiSet.allCustomers)
                    .then(response=>{
                        const customers=[];
                        // console.log(response.data.data);
                        const obj = response.data.data;
                        // for(let key in obj){
                        for (let key = 0, len = obj.length; key < len; key++) {
                            customers.push({
                                id:obj[key].id,
                                num:key,
                                title:obj[key].title,
                                name:obj[key].firstname +' '+obj[key].lastname,
                                firstname:obj[key].firstname,
                                lastname:obj[key].lastname,
                                phone_no:obj[key].phone_no,
                                email:obj[key].email,
                                company:obj[key].company_name,
                                address:obj[key].address,
                                credit:obj[key].credit,
                                discount_percentage:obj[key].discount_percentage,
                                discount_amount:obj[key].discount_amount,
                                markup:obj[key].markup
                            })
                        }
                        self.customers = customers;
                        self.total = customers.length;
                        self.fetchup = false;
                        self.$store.commit('setCustomers',customers);

                    }).catch(
                    e => {
                        console.log(e);
                        self.loader = false;

                        this.err.push(e);
                    }
                )
            },

            onAddCustomer(){
                this.loader = true;
                const UserData={
                    title:this.title,
                    firstname:this.firstname,
                    lastname:this.lastname,
                    phone:this.phone,
                    email:this.email,
                    company:this.company,
                    address:this.address,
                    credit:this.credit,
                    discount_percentage:this.discount_percentage,
                    discount_amount:this.discount_amount,
                    markup:this.markup,
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
                        self.su_snackbar=true;
                        self.loadCustomers();
                        self.loader = false;
                    })
                    .catch(function (error) {
                        console.log(error);
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
                eventBus.$emit('close_debtor',false);
                this.clearFields();
                this.dialog = false;

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

            close () {
                eventBus.$emit('close_debtor',false);
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1
                }, 300)
            },

            save() {

                // if(!this.editFormIsValid){
                //     alert('empty')
                //     return false;
                // }
                let self = this;

                this.formError=false;
                if (this.editedIndex > -1) {
                    Object.assign(this.customers[this.editedIndex], this.editedItem)

                    let objID = this.editedItem.id;
                    this.loader = true;



                    const UserData={
                        title:this.editedItem.title,
                        firstname:this.editedItem.firstname,
                        lastname:this.editedItem.lastname,
                        phone_no:this.editedItem.phone_no,
                        email:this.editedItem.email,
                        company_name:this.editedItem.company,
                        address:this.editedItem.address,
                        credit:this.editedItem.credit,
                        discount_percentage:this.editedItem.discount_percentage,
                        discount_amount:this.editedItem.discount_amount,
                        markup:this.editedItem.markup,

                    }

                    let apiUrl = this.$store.state.config.url;

                    axios.patch(apiUrl+'/customer/'+objID, UserData)
                        .then(function (response) {
                            console.log(response);
                            self.loader = false;
                            self.ed_snackbar = true;
                            self.edit_dialog = false;
                            self.loadCustomers();
                            self.$store.commit('setNetError',false);

                        })
                        .catch(function (error) {
                            console.log(error);
                            self.loader = false;
                            this.$store.commit('setNetError',true);

                        });

                } else {
                    // this.customers.push(this.editedItem)

                    console.log(this.editedItem);

                }
                this.close()
            }
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