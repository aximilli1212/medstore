<template>
    <div>

        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" persistent max-width="500px">

            <v-btn slot="activator" color="primary" dark small class="mb-2"><v-icon left>mdi-plus</v-icon> Add Dictionary Item</v-btn>
            <v-spacer></v-spacer>

            <v-card>
            <form>

                <v-toolbar >
                    <v-toolbar-title class="primary--text">Add to Dictionary</v-toolbar-title>

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
                                            label="Product Name"
                                            box
                                            v-model="product_name"
                                            v-validate="'required'"
                                            data-vv-name="product_name"
                                            required
                                            :error-messages="errors.collect('product_name')"

                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-select
                                            offset-y
                                            :items="catFetch"
                                            label="Category"
                                            v-validate="'required'"
                                            required
                                            data-vv-name="category"
                                            :error-messages="errors.collect('category')"
                                            box
                                            required
                                            v-model="category"
                                    ></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Manufacturer"
                                            placeholder="eg. Toyota"
                                            v-model="manufacturer"
                                            data-vv-name="manufacturer"
                                            v-validate="'required'"
                                            :error-messages="errors.collect('manufacturer')"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Expiry"
                                            placeholder="dd/mm/yyyy"
                                            v-model="expiry"
                                            mask="##/##/####"
                                            return-masked-value
                                            data-vv-name="expiry"
                                            :error-messages="errors.collect('expiry')"
                                            v-validate="'required|date_format:DD/MM/YYYY'"

                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="BarCode"
                                            prepend-icon="mdi-barcode-scan"
                                            required
                                            v-model="barcode"
                                            data-vv-name="barcode"
                                            v-validate="'required'"
                                            :error-messages="errors.collect('barcode')"
                                    >

                                    </v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Product Type"
                                            prepend-icon="mdi-check-all"
                                            required
                                            v-model="product_type"
                                            v-validate="'required'"
                                            data-vv-name="type"
                                            :error-messages="errors.collect('type')"
                                    >

                                    </v-text-field>
                                </v-flex>
                                   <v-flex xs12 sm5 md5 offset-md1>
                                        <v-btn small color="secondary"><v-icon left>mdi-barcode</v-icon>Generate Barcode</v-btn>
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
                            @click="onAddDict"
                            color="secondary"
                            :loading="loader"
                            :disabled="loader"

                    >Save</v-btn>
                </v-card-actions>
            </form>
            </v-card>
        </v-dialog>
        <!----------------------------------------------UPDATE SINGLE ITEM DIALOG-------------------------------------------------------------------------------->

        <v-dialog v-model="edit_dialog" persistent max-width="500px">
            <v-card>
                <v-toolbar >
                    <v-toolbar-title class="primary--text">Edit Dictionary</v-toolbar-title>


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
                                        label="Product Name"
                                        required
                                        box
                                        :rules="[v => !!v || 'Product name is required']"
                                        v-model="editedItem.product_name"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-select
                                        offset-y
                                        :items="['engine','accessories']"
                                        label="Category"
                                        required
                                        :rules="[v => !!v || 'Category is required']"
                                        box
                                        v-model="editedItem.category"
                                ></v-select>

                            </v-flex>

                            <v-flex xs12 sm6 md6>
                                <v-text-field
                                        box
                                        label="Manufacturer"
                                        v-model="editedItem.manufacturer"
                                        :rules="[v => !!v || 'Type is required']"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field
                                        box
                                        label="Expiry"
                                        placeholder="dd/mm/yyyy"
                                        v-model="editedItem.expiry"
                                        :rules="[v => !!v || 'Expiry is required']"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field
                                        box
                                        label="BarCode"
                                        prepend-icon="mdi-barcode-scan"
                                        required
                                        :rules="[v => !!v || 'Barcode is required']"
                                        v-model="editedItem.barcode"
                                >

                                </v-text-field>
                            </v-flex>

                            <v-flex xs12 sm6 md6>
                                <v-text-field
                                        box
                                        label="Product Type"
                                        prepend-icon="mdi-check-all"
                                        required
                                        :rules="[v => !!v || 'Type is required']"
                                        v-model="editedItem.product_type"
                                >

                                </v-text-field>
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
                <p class="headline ttext mt-3">Product Dictionary [ <i class="green--text text--darken-3">{{total}}</i> ]</p>
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
                    :items="dictionaries"
                    :search="search"
                    :loading="fetchup"
                    class="elevation-8"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.num }}</td>
                    <td>{{ props.item.product_name }}</td>
                    <td>{{ props.item.category }}</td>
                    <td>{{ props.item.manufacturer }}</td>
                    <td>{{ props.item.barcode }}</td>
                    <td>{{ props.item.product_type }}</td>
                    <td>{{ props.item.expiry }}</td>
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
                    <v-btn color="primary" @click="loadDictionaries">Refresh</v-btn>
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
            Please Enter Dictionary Details.
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
            Product Successfully Added.
            <v-btn flat color="green" @click.native="su_snackbar = false">Close</v-btn>
        </v-snackbar>
        <v-snackbar
                :timeout="6000"
                :top="true"
                :right="x === 'right'"
                v-model="ed_snackbar"
                color=""
        >
            Product Successfully Edited.
            <v-btn flat color="secondary" @click.native="ed_snackbar = false">Close</v-btn>
        </v-snackbar>

        <simplert :useRadius="true"
                  :useIcon="true"
                  ref="simplert">
        </simplert>

    </div>
</template>

<script>
    var axios = require("axios");
    import { eventBus } from '../../../main.js';

    export default {
        name: "dictionary",
        $_veeValidate: {
            validator: 'new'
        },
        data: () => ({
            total:0,
            fetchup:false,
            dialog: false,
            edit_dialog: false,
            loader:false,
            product_name:'',
            category:'',
            manufacturer:'',
            expiry:'',
            barcode:'',
            product_type:'',
            title:'Mr.',
            markup:'',
            search:'',
            su_snackbar:false,
            er_snackbar:false,
            del_snackbar:false,
            ed_snackbar:false,
            form_error_snack:false,
            gender: ['Male', 'Female'],
            headers: [
                {text: 'No.', align: 'left', value: 'num'},
                {text: 'Product Name', align: 'left', value: 'name'},
                { text: 'Category', align: 'left', value: 'category'},
                { text: 'Manufacturer', align: 'left', value: 'manufacturer' },
                { text: 'Barcode', value: 'barcode', align: 'centre', sortable: false },
                { text: 'Product Type', value: 'product_type', align: 'centre', sortable: false },
                { text: 'Expiry', value: 'expiry', align: 'centre', sortable: false }
            ],
            dictionaries: [],
            editedIndex: -1,
            editedItem: {
                id:'',
                product_name:'',
                category:'',
                manufacturer:'',
                expiry:'',
                product_type:'',
                barcode:'',
            },
            defaultItem: {
                id:'',
                product_name:'',
                category:'',
                manufacturer:'',
                expiry:'',
                product_type:'',
                barcode:'',
            },
        }),

        computed:{
            formTitle () {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
            apiSet(){
                return this.$store.getters.getApi
            },
            catFetch(){
                let cat = this.$store.getters.getCats;
                let catup = [];

                for (let key = 0, len = cat.length; key < len; key++) {
                    catup.push(
                        cat[key].cat_name,
                    )
                }
                return catup;

            },

        submit_loading(){
            return true;
        },
        submitted(){
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
            }
        },

        mounted() {
            this.loadDictionaries();
        },
        created(){
            eventBus.$on('getDict',(data)=>{
                this.loadDictionaries();
            })
        },

        methods: {
            loadDictionaries(){
                this.fetchup=true;
                let self = this;
                axios.get(this.apiSet.allDictionarys)
                    .then(response=>{
                        const dict=[];
                        const obj = response.data.data;
                        // for(let key in obj){
                        for (let key = 0, len = obj.length; key < len; key++) {
                            console.log(obj[key].title);
                            dict.push({
                                id:obj[key].id,
                                num:key,
                                product_name:obj[key].product_name,
                                category:obj[key].category,
                                manufacturer:obj[key].manufacturer,
                                expiry:obj[key].expiry,
                                barcode:obj[key].barcode,
                                product_type:obj[key].product_type,
                            })
                        }
                        self.dictionaries = dict;
                        self.total = dict.length;
                        self.fetchup = false;
                        self.$store.commit('setDic',dict);

                    }).catch(
                    e => {
                        console.log(e);
                        self.loader = false;

                        this.err.push(e);
                    }
                )
            },

            onAddDict(){
                let self = this;
                this.$validator.validateAll().then((result)=>{
                    if(result){
                        this.loader = true;
                        const DictData={
                            product_name:this.product_name,
                            category:this.category,
                            manufacturer:this.manufacturer,
                            barcode:this.barcode,
                            product_type:this.product_type,
                            expiry:this.expiry,
                        };

                        console.log(DictData);

                        axios.post(this.apiSet.singleDictionary, DictData)
                            .then(function (response) {
                                console.log(response);
                                self.closeup();
                                self.su_snackbar=true;
                                self.loadDictionaries();
                                self.loader = false;
                                // this.$store.commit('setDict',DictData);

                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                    else{
                        this.form_error_snack = true;
                        return false;
                    }
                });

            },

            clearFields(){
                this.product_name='',
                    this.category='',
                    this.manufacturer='',
                    this.barcode='',
                    this.product_type='',
                    this.expiry='',
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
                this.editedIndex = this.dictionaries.indexOf(item);
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

            del(item){
                let self = this;
                let apiUrl = this.$store.state.config.url;
                const index = this.dictionaries.indexOf(item);
                this.dictionaries.splice(index, 1);

                axios.delete(apiUrl+'/dictionary/'+item.id)
                    .then(function(response){
                        console.log(response);
                        self.del_snackbar = true;
                        self.loadDictionaries();
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
                    Object.assign(this.dictionaries[this.editedIndex], this.editedItem)

                    let objID = this.editedItem.id;
                    this.loader = true;



                    const DictData={
                        product_name:this.editedItem.product_name,
                        category:this.editedItem.category,
                        manufacturer:this.editedItem.manufacturer,
                        barcode:this.editedItem.barcode,
                        product_type:this.editedItem.product_type,
                        expiry:this.editedItem.expiry,

                    }


                    let apiUrl = this.$store.state.config.url;

                    axios.patch(apiUrl+'/dictionary/'+objID, DictData)
                        .then(function (response) {
                            console.log(response);
                            self.loader = false;
                            self.ed_snackbar = true;
                            self.edit_dialog = false;
                            self.$validator.reset();
                            self.loadDictionaries();
                            self.$store.commit('setNetError',false);

                        })
                        .catch(function (error) {
                            console.log(error);
                            self.loader = false;
                            this.$store.commit('setNetError',true);

                        });

                } else {
                    // this.dictionaries.push(this.editedItem)

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