<template>
    <div>

            <v-spacer></v-spacer>
        <v-btn @click.native="dialog = true" color="secondary" dark small class="mb-2"><v-icon left>mdi-plus</v-icon> Add Customer</v-btn>

        <v-btn @click="$router.push('/debtors')" color="primary" dark small class="mb-2"><v-icon left>mdi-cash-multiple</v-icon>View Debtors</v-btn>

        <v-dialog v-model="dialog" persistent max-width="500px">
                <v-card>
                    <v-toolbar >
                        <v-toolbar-title class="primary--text">Add Customer</v-toolbar-title>

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
                                            mask="###-###-####"

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
                                            label="Balance Before(Ghc)"
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
                                            mask="##/##/####"                                            return-masked-value
                                            return-masked-value
                                            prepend-icon="mdi-calendar"
                                            v-model="purchase_date"
                                    >

                                    </v-text-field>
                                </v-flex>


                                <v-flex xs12 md6 sm6>
                                    <v-text-field
                                            label="Credit Limit"
                                            type="number"
                                            required
                                            v-model="credit"
                                    ></v-text-field>
                                </v-flex><v-flex xs12 md6 sm6>
                                    <v-text-field label="Discount Percentage" v-model="discount_percentage" prefix="%" type="number" required></v-text-field>
                                </v-flex><v-flex xs12 md6 sm6>
                                    <v-text-field label="Discount Amount" v-model="discount_amount" type="number" required></v-text-field>
                                </v-flex><v-flex xs12 md6 sm6>
                                    <v-text-field label="Inc. Markup e.g: 1.4" v-model="markup" placeholder="Increase Price by markup" type="number" required></v-text-field>
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

        <v-dialog v-model="edit_dialog" persistent max-width="500px">
                <v-card>
                    <v-toolbar >
                        <v-toolbar-title class="primary--text">Edit Customer</v-toolbar-title>


                        <v-spacer></v-spacer>


                        <v-btn icon @click.native="edit_dialog = false">
                            <v-icon color="secondary">mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-container grid-list-md elevation-3>
                            <v-layout wrap >
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            label="Firstname"
                                            required
                                            box
                                            :rules="[v => !!v || 'firstname is required']"
                                            v-model="editedItem.firstname"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            label="Lastname"
                                            required
                                            box
                                            :rules="[v => !!v || 'Lastname is required']"
                                            v-model="editedItem.lastname"
                                    ></v-text-field>
                                    <!--<v-select-->
                                            <!--:items="gender"-->
                                            <!--box-->
                                            <!--label="Gender"-->
                                            <!--v-model="cus_gender"-->
                                    <!--&gt;</v-select>-->
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Phone No."
                                            prepend-icon="mdi-phone"
                                            placeholder="02X-XXXXXXX"
                                            mask="###-###-####"
                                            v-model="editedItem.phone_no"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Email"
                                            prepend-icon="mdi-email"
                                            placeholder="email@email.com"
                                            v-model="editedItem.email"
                                            :rules="emailRules"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                             box
                                            label="Address"
                                                  prepend-icon="mdi-domain"
                                              v-model="editedItem.address"

                                    >

                                    </v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                             box
                                            label="Company"
                                                  prepend-icon="mdi-domain"
                                              v-model="editedItem.company_name"
                                    >

                                    </v-text-field>
                                </v-flex>

                                <v-flex xs12 md6 sm6>
                                    <v-text-field
                                            label="Debit Amount(Ghc)"
                                            v-model="editedItem.debit_amt"
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
                                            v-model="editedItem.purchase_date"
                                            mask="##/##/####"                                            return-masked-value
                                    >

                                    </v-text-field>
                                </v-flex>


                                <v-flex xs12 md6 sm6>
                                    <v-text-field
                                            label="Credit Limit"
                                            type="number"
                                            required
                                            :rules="[v => !!v || 'Credit is required']"
                                            v-model="editedItem.credit"
                                    ></v-text-field>
                                </v-flex><v-flex xs12 md6 sm6>
                                    <v-text-field
                                            label="Discount Percentage"
                                            v-model="editedItem.discount_percentage"
                                            prefix="%" type="number"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 md6 sm6>
                                    <v-text-field
                                            label="Discount Amount"
                                            v-model="editedItem.discount_amount"
                                            type="number"
                                    ></v-text-field>
                                </v-flex><v-flex xs12 md6 sm6>
                                    <v-text-field
                                            label="Inc. Markup e.g: 1.4"
                                            placeholder="Increase Price by markup"
                                            type="number"
                                            v-model="editedItem.markup"
                                    ></v-text-field>
                                </v-flex>

                            </v-layout>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat @click.native="close_edit">Close</v-btn>
                        <v-btn
                                @click="save"
                                color="secondary"
                                :loading="loader"
                                :disabled="loader"

                        >Update Details</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>



        <v-card
                class="elevation-4 thead"
        >
            <v-card-title>
                <v-btn icon color="primary" @click="$router.go(-1)" small><v-icon>mdi-arrow-left-thick</v-icon></v-btn>
                <p class="headline ttext mt-3">All Customers [ <i class="green--text text--darken-3">{{total}}</i> ]</p>
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
                :items="customers"
                :search="search"
                :loading="fetchup"
                class="elevation-8"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.num }}</td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.phone_no }}</td>
                <td>{{ props.item.credit }}</td>
                <td class="justify-center layout px-0">

                    <v-btn
                            flat
                            small
                            class="mr-2 teal--text cpoint"
                            @click="editItem(props.item)"
                    ><v-icon>
                        mdi-pencil
                    </v-icon> Edit</v-btn>





                    <v-btn  small
                            flat
                            class="red--text cpoint"
                            @click="deleteItem(props.item)"
                    ><v-icon

                    >
                        mdi-delete
                    </v-icon> Delete</v-btn>

                </td>
            </template>
            <template slot="no-data">
                <v-btn color="primary" @click="loadCustomers">Reset</v-btn>
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

        <v-snackbar
                :timeout="6000"
                :top="true"
                :right="x === 'right'"
                v-model="snack"
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
        name: "customers",
        $_veeValidate: {
            validator: 'new'
        },
        data: () => ({
            total:0,
            fetchup:false,
            dialog: false,
            edit_dialog: false,
            loader:false,
            title:'Mr.',
            firstname:'',
            debit_amt:'',
            purchase_date:'',
            lastname:'',
            phone:'',
            snack:'',
            snackText:'',
            snackColor:'',
            email:'',
            company:'',
            address:'',
            credit:'',
            discount_percentage:'',
            discount_amount:'',
            markup:'',
            search:'',
            su_snackbar:false,
            er_snackbar:false,
            gender: ['Male', 'Female'],
            headers: [
                {text: 'No.', align: 'left', value: 'num'},
                {text: 'Customer Name', align: 'left', value: 'name'},
                { text: 'Phone No.', align: 'left', value: 'phone'},
                { text: 'Credit Limit(Ghc)', align: 'left', value: 'credit' },
                { text: 'Actions', value: 'name', align: 'centre', sortable: false }
            ],
            customers: [],
            editedIndex: -1,
            editedItem: {
                id:'',
                validate:true,
                title:'Mr',
                firstname: 'firstname',
                lastname: 'lastname',
                phone_no: 'Phone No',
                email: 'email@email.com',
                company: 'Uniliver',
                address: 'Accra',
                credit: 0,
                discount_percentage: 1,
                discount_amount: 1,
                markup: 1,
                credit_state:0,
                purchase_date:"02/04/2019",
                debit_amt:"2000"
            },
            defaultItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0
            },
            side_items:[
                { icon: 'mdi-cash-multiple', text: 'View Debtors',link:'/debtors' },
                { icon: 'mdi-history', text: 'Debtors History',link:'/debtors_history' },

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
            loadCustomers(){

                this.fetchup=true;
                let self = this;

                let cData = {
                    oid:this.userData.outlet_id,
                    cid:this.userData.company_id
                }


                axios.post(this.apiSet.postCustomers, cData)
                    .then(response=>{
                        const customers=[];
                        const obj = response.data.data;
                        // for(let key in obj){
                        for (let key = 0, len = obj.length; key < len; key++) {
                            // console.log(obj[key].title);
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
                                debit_amt:obj[key].credit_amount,
                                purchase_date:obj[key].purchase_date,
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

                this.$validator.validateAll().then((result)=> {
                    if (result) {

                        this.loader = true;
                        const UserData = {
                            company_id:this.userData.company_id,
                            outlet_id:this.userData.outlet_id,
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
                            credit_amount: this.debit_amt,
                            purchase_date: this.purchase_date,
                            credit_state: 0,
                        };

                        // if(!this.formIsValid){
                        //     this.er_snackbar=true;
                        //     console.log(UserData);
                        //     return false;
                        // }

                        let self = this;
                        console.log(UserData);

                        axios.post(this.apiSet.singleCustomer, UserData)
                            .then(function (response) {
                                console.log(response);
                                self.closeup();
                                self.su_snackbar = true;
                                self.loadCustomers();
                                self.loader = false;
                            })
                            .catch(function (error) {
                                console.log(error);
                            });

                    } else{
                            this.snack = true;
                            this.snackText = "Please Correct form errors";
                            this.snackColor = "red";
                    }

                })
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
                        // console.log(response);
                        self.del_snackbar = true;
                        self.loadCustomers();
                        self.$store.commit('setNetError',false);

                    }).catch(function(error){
                    self.$store.commit('setNetError',true);
                    console.log(error);
                })
            },

            close () {
                this.dialog = false;
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
                        credit_amount: this.editedItem.debit_amt,
                        purchase_date: this.editedItem.purchase_date,
                        credit_state: 0,

                    }

                    // console.log(UserData);


                    let apiUrl = this.$store.state.config.url;

                    axios.patch(apiUrl+'/customer/'+objID, UserData)
                        .then(function (response) {
                            console.log(response);
                            self.loader = false;
                            self.ed_snackbar = true;
                            self.edit_dialog = false;
                            self.loadCustomers();

                        })
                        .catch(function (error) {
                            console.log(error);
                            self.loader = false;
                        });

                } else {
                    // this.customers.push(this.editedItem)


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