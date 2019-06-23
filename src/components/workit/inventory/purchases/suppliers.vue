<template>
    <div>

        <v-spacer></v-spacer>
        <v-btn @click.native="dialog = true" color="secondary" dark large class="mb-2"><v-icon left>mdi-plus</v-icon> Add Supplier</v-btn>

        <v-dialog v-model="dialog" persistent max-width="500px">

            <v-spacer></v-spacer>

            <v-card>
                <form>

                    <v-toolbar >
                        <v-toolbar-title class="primary--text">Add Supplier</v-toolbar-title>

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
                                                label="Supplier Name"
                                                box
                                                v-model="sup_name"
                                                v-validate="'required'"
                                                data-vv-name="supplier_name"
                                                required
                                                :error-messages="errors.collect('supplier_name')"

                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field
                                                label="Supplier Address"
                                                box
                                                v-model="sup_address"
                                                v-validate="'required'"
                                                data-vv-name="sup_address"
                                                required
                                                :error-messages="errors.collect('sup_address')"

                                        ></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 sm6 md6>
                                        <v-text-field
                                                label="Contact Person"
                                                box
                                                v-model="sup_contact"
                                                data-vv-name="phone_no"
                                        ></v-text-field>
                                    </v-flex>

                                        <v-flex xs12 sm6 md6>
                                        <v-text-field
                                                label="Contact Phone No."
                                                box
                                                v-model="sup_phone"
                                                data-vv-name="phone_no"

                                        ></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 sm6 md6>
                                        <v-text-field
                                                label="Supplier Email"
                                                box
                                                v-model="sup_email"
                                        ></v-text-field>
                                    </v-flex>



                                </v-layout>
                            </v-container>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat @click.native="closeup">Close</v-btn>
                        <v-btn
                                @click="onAddSup"
                                color="secondary"
                                :loading="loader"
                                :disabled="loader"

                        ><v-icon left>mdi-library-plus</v-icon>Save Supplier</v-btn>
                    </v-card-actions>
                </form>
            </v-card>
        </v-dialog>
        <!----------------------------------------------UPDATE SINGLE ITEM DIALOG-------------------------------------------------------------------------------->

        <v-dialog v-model="edit_dialog" persistent max-width="500px">
            <v-card>
                <v-toolbar >
                    <v-toolbar-title class="primary--text">Edit Supplier</v-toolbar-title>


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
                                        label="Supplier Name"
                                        box
                                        v-model="editedItem.sup_name"
                                        v-validate="'required'"
                                        data-vv-name="supplier_name"
                                        required
                                        :error-messages="errors.collect('supplier_name')"

                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm6 md6>
                                <v-text-field
                                        label="Contact Person"
                                        box
                                        v-model="editedItem.sup_contact"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field
                                        label="Phone No."
                                        box
                                        v-model="editedItem.sup_phone"
                                ></v-text-field>
                            </v-flex>



                            <v-flex xs12 sm6 md6>
                                <v-text-field
                                        label="Supplier Email"
                                        box
                                        v-model="editedItem.sup_email"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm6 md6>
                                <v-text-field
                                        label="Supplier Address"
                                        box
                                        v-model="editedItem.sup_address"
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
                <p class="headline ttext mt-3">All Suppliers [ <i class="green--text text--darken-3">{{total}}</i> ]</p>
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
                    :items="suppliers"
                    :search="search"
                    :loading="fetchup"
                    class="elevation-8"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.sup_name }}</td>
                    <td>{{ props.item.sup_contact }}</td>
                    <td>{{ props.item.sup_phone }}</td>
                    <td>{{ props.item.sup_email }}</td>
                    <td>{{ props.item.sup_address }}</td>
                    <td>{{ props.item.added_by }}</td>
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
                    <v-btn color="primary" @click="loadSuppliers">Refresh</v-btn>
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
            Please Enter Supplier Details.
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
            Supplier Successfully Added.
            <v-btn flat color="green" @click.native="su_snackbar = false">Close</v-btn>
        </v-snackbar>
        <v-snackbar
                :timeout="6000"
                :top="true"
                :right="x === 'right'"
                v-model="ed_snackbar"
                color=""
        >
            Supplier Successfully Edited.
            <v-btn flat color="secondary" @click.native="ed_snackbar = false">Close</v-btn>
        </v-snackbar>
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
    import { eventBus } from '../../../../main.js';
    import moment from 'moment';

    export default {
        name: "suppliers",
        $_veeValidate: {
            validator: 'new'
        },
        data: () => ({
            total:0,
            valid:0,
            fetchup:false,
            dialog: false,
            edit_dialog: false,
            loader:false,
            purchase_date:'',
            due_date:'',
            credit_unpaid:'',
            snack:false,
            snackText:'',
            snackColor:'',
            sup_name:'',
            sup_contact:'',
            sup_phone:'',
            sup_email:'',
            sup_address:'',
            sup_location:'',
            added_by:'aximilli',
            search:'',
            emenu:false,
            menu:false,
            su_snackbar:false,
            er_snackbar:false,
            del_snackbar:false,
            ed_snackbar:false,
            form_error_snack:false,
            gender: ['Male', 'Female'],
            headers: [
                {text: 'No.', align: 'left', value: 'num'},
                {text: 'Supplier Name', align: 'left', value: 'sup_name'},
                { text: 'Contact Person', align: 'left', value: 'sup_contact'},
                { text: 'Phone No.', align: 'left', value: 'sup_phone'},
                { text: 'Email', align: 'left', value: 'sup_email'},
                { text: 'Address', align: 'left', value: 'sup_address'},
                { text: 'Added By', align: 'left', value: 'added_by'},
                { text: 'Action', align: 'center', value: ''},
            ],
            suppliers: [],
            editedIndex: -1,
            editedItem: {
                id:'1',
                sup_name:'name',
                sup_phone:'233',
                sup_contact:'233',
                sup_email:'email',
                sup_address:'psquare',
                sup_location:'round about',
                added_by:'aximilli',

            },
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


            due_days(){

                let a = moment(this.due_date);
                let b = moment();
                let c = 1 + a.diff(b, 'days'); // 1

                return this.due_date ? c +" Days" : ''
            },
            ddays(){

                let a = moment(this.due_date);
                let b = moment();
                let c = 1 + a.diff(b, 'days'); // 1

                return c;
            },
             edue_days(){

                let a = moment(this.editedItem.due_date);
                let b = moment();
                let c = 1 + a.diff(b, 'days'); // 1

                return this.editedItem.due_date ? c +" Days" : ''
            },

            eddays() {

                let a = moment(this.editedItem.due_date);
                let b = moment();
                let c = 1 + a.diff(b, 'days'); // 1

                return c;
            }

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
            this.loadSuppliers();
        },
        created(){
            eventBus.$on('getCat',(data)=>{
                this.loadSuppliers();
            })
        },

        methods: {
            d(val){
                let a = moment(val);
                let b = moment();
                let c = 1 + a.diff(b, 'days'); // 1
                return val ? c +" Days" : ''
            },
            loadSuppliers(){
                this.fetchup=true;
                let self = this;
                axios.get(this.apiSet.allSuppliers)
                    .then(response=>{
                        const sup = response.data.data;


                        self.suppliers = sup;
                        self.total = sup.length;
                        self.fetchup = false;
                        self.$store.commit('setSup',sup[0]);

                    }).catch(
                    e => {
                        console.log(e);
                        self.loader = false;
                        self.er_snackbar = true;

                        this.err.push(e);
                    }
                )
            },

            onAddSup(){
                let self = this;

                // this.$validator.validateAll().then((result)=>{
                //     if(result){
                        this.loader = true;
                        const catData={
                            sup_name:this.sup_name,
                            sup_phone:this.sup_phone,
                            sup_contact:this.sup_contact,
                            sup_email:this.sup_email,
                            sup_address:this.sup_address,
                            sup_location:'accra',
                            added_by:this.userData.user_name,
                            credit_unpaid:this.credit_unpaid,
                            purchase_date:this.purchase_date,
                            due_date:this.due_date,
                            due_days:this.ddays,

                        };


                        axios.post(this.apiSet.singleSupplier, catData)
                            .then(function (response) {
                                self.closeup();
                                self.su_snackbar=true;
                                self.loadSuppliers();
                                self.loader = false;

                            })
                            .catch(function (error) {
                                self.loader = false;
                                self.er_snackbar = true;
                            });
                //     }
                //     else{
                //         alert('died')
                //         this.form_error_snack = true;
                //         return false;
                //     }
                // });

            },

            clearFields(){
                this.sup_name='';
                 this.sup_phone='';
                 this.sup_email='';
                 this.sup_address='';
                 this.sup_location='';
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
                this.editedIndex = this.suppliers.indexOf(item);
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
                    title: 'Delete Supplier',
                    message: 'Are you sure you want to Delete Suppliert?',
                    type: 'warning',
                    useConfirmBtn: true,
                    onConfirm: confirmFn
                }
                this.$refs.simplert.openSimplert(obj);

            },

            del(item){
                let self = this;
                let apiUrl = this.$store.state.config.url;
                const index = this.suppliers.indexOf(item);
                this.suppliers.splice(index, 1);

                axios.delete(apiUrl+'/supplier/'+item.id)
                    .then(function(response){
                        console.log(response);
                        self.del_snackbar = true;
                        self.loadSuppliers();
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

                let self = this;

                this.formError=false;
                if (this.editedIndex > -1) {
                    Object.assign(this.suppliers[this.editedIndex], this.editedItem)

                    let objID = this.editedItem.id;
                    this.loader = true;

                    const supData={
                        sup_name:this.editedItem.sup_name,
                        sup_phone:this.editedItem.sup_phone,
                        sup_contact:this.editedItem.sup_contact,
                        sup_email:this.editedItem.sup_email,
                        sup_address:this.editedItem.sup_address,
                        sup_location:this.editedItem.sup_location,
                        added_by:this.userData.user_name,
                        credit_unpaid:this.editedItem.credit_unpaid,
                        purchase_date:this.editedItem.purchase_date,
                        due_date:this.editedItem.due_date,
                        due_days:this.eddays,

                    }


                    let apiUrl = this.$store.state.config.url;

                    axios.patch(apiUrl+'/supplier/'+objID, supData)
                        .then(function (response) {
                            console.log(response);
                            self.loader = false;
                            self.ed_snackbar = true;
                            self.edit_dialog = false;
                            self.$validator.reset();
                            self.loadSuppliers();
                            self.$store.commit('setNetError',false);

                        })
                        .catch(function (error) {
                            console.log(error);
                            self.loader = false;
                            this.snack = true;
                            this.snackText = 'Sorry Network Error occured';
                            this.snackColor = 'red';
                            this.$store.commit('setNetError',true);

                        });

                } else {
                    console.log(this.editedItem);

                }
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