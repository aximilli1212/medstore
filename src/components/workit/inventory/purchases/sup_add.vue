<template>
    <div>
            <v-dialog v-model="sup_dialog" persistent max-width="500px">
                <v-card>
                    <v-toolbar >
                        <v-toolbar-title class="primary--text">Add Supplier</v-toolbar-title>

                        <v-spacer></v-spacer>


                        <v-btn icon @click.native="closeSup">
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
                                                label="Phone No."
                                                box
                                                v-model="sup_phone"
                                                v-validate="'required'"
                                                data-vv-name="phone_no"
                                                required
                                                :error-messages="errors.collect('phone_no')"

                                        ></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 sm6 md6>
                                        <v-text-field
                                                label="Supplier Email"
                                                box
                                                v-model="sup_email"
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
                                                label="Location"
                                                box
                                                v-model="sup_location"

                                        ></v-text-field>
                                    </v-flex>

                                </v-layout>
                            </v-container>
                        </v-form>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat @click="closeSup">Close</v-btn>
                        <v-btn
                                color="secondary"
                                :loading="loader"
                                :disabled="loader"
                                @click="onAddSup"

                        >Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

    </div>
</template>

<script>
    import { eventBus } from '../../../../main.js';
    var axios = require("axios");
    export default {
        name: "suppliers",
        props:[
            'sup_dialog',
        ],
        data: () => ({
            total:0,
            fetchup:false,
            dialog: false,
            edit_dialog: false,
            loader:false,
            sup_name:'',
            sup_phone:'',
            sup_email:'',
            sup_address:'',
            sup_location:'',
            added_by:'aximilli',
            search:'',
            su_snackbar:false,
            er_snackbar:false,
            gender: ['Male', 'Female'],
            headers: [
                {text: 'Id.', align: 'left', value: 'num', class: 'title'},
                {text: 'Supplier ', align: 'left', value: 'name', class: 'title'},
                { text: 'Phone No.', align: 'left', value: 'phone', class: 'title'},
                { text: 'Debit', align: 'left', value: 'debit', class: 'title' },
                { text: 'Actions', value: 'name', class: 'title', align: 'centre', sortable: false }
            ],
            suppliers: [],
            editedIndex: -1,
            editedItem: {
                id:'',
                validate:true,
                supplier: '',
                acc_num: '',
                phone_no: '',
                email: '',
                country: '',
                address: '',
            },
            defaultItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0
            },
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            phoneRules: [
                v => !!v || 'Phone Number is required',
                v => /.+@.+/.test(v) || 'Phone Number must be numeric'
            ],
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
            apiSet() {
                return this.$store.getters.getApi
            },
        },

        methods: {

            loadSuppliers(){
                let self = this;
                axios.get(this.apiSet.allSuppliers)
                    .then(response=>{
                        const sup = response.data.data;

                        self.$store.commit('setSup',sup);

                    }).catch(
                    e => {
                        console.log(e);

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
                    sup_email:this.sup_email,
                    sup_address:this.sup_address,
                    sup_location:this.sup_location,
                    added_by:"aximilli",
                    credit_unpaid:0,

                };


                axios.post(this.apiSet.singleSupplier, catData)
                    .then(function (response) {
                        self.loadSuppliers();
                        self.loader = false;
                        self.closeSup();


                    })
                    .catch(function (error) {
                        self.loader = false;
                        self.er_snackbar = true;
                    });
                //     }
                //     else{
                //         this.form_error_snack = true;
                //         alert('died died')
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
            closeSup(){
                this.clearFields();
                eventBus.$emit('sup_dialog',false);

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