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
                                <v-flex xs12 sm12 md12>
                                    <v-select
                                            offset-y
                                            :items="dtype"
                                            v-model="product_type"
                                            label="PRODUCT TYPE"
                                            v-validate="'required'"
                                            item-value="id"
                                            item-text="name"
                                            data-vv-name="type"
                                            return-object
                                            :error-messages="errors.collect('type')"
                                            box
                                    ></v-select>
                                </v-flex>

                                <v-flex xs12 sm12 md12>
                                    <v-text-field
                                            label="GENERIC NAME"
                                            box
                                            v-model="generic_name"
                                            v-validate="'required'"
                                            data-vv-name="generic_name"
                                            :error-messages="errors.collect('generic_name')"

                                    ></v-text-field>
                                </v-flex> <v-flex xs12 sm12 md12>
                                    <v-text-field
                                            label="PROPRIETARY NAME"
                                            box
                                            v-model="proprietary_name"
                                            v-validate="'required'"
                                            data-vv-name="proprietary_name"
                                            :error-messages="errors.collect('proprietary_name')"

                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs4 sm4 md4>
                                    <v-select
                                            offset-y
                                            :items="strengthList"
                                            v-model="strength"
                                            label="STRENGTH"
                                            v-validate="'required'"
                                            data-vv-name="strength"
                                            :error-messages="errors.collect('strength')"
                                            box

                                    ></v-select>
                                </v-flex>
                                <v-flex xs8 sm8 md8>
                                    <v-select
                                            offset-y
                                            :items="catFetch"
                                            v-model="category"
                                            label="THERAPEUTIC CATEGORY"
                                            v-validate="'required'"
                                            data-vv-name="category"
                                            :error-messages="errors.collect('category')"
                                            box

                                    ></v-select>
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
                            <v-flex xs12 sm12 md12>
                                <v-select
                                        offset-y
                                        :items="dtype"
                                        v-model="editedItem.product_type"
                                        label="PRODUCT TYPE"
                                        v-validate="'required'"
                                        item-value="id"
                                        item-text="name"
                                        data-vv-name="etype"
                                        return-object
                                        :error-messages="errors.collect('etype')"
                                        box
                                ></v-select>
                            </v-flex>

                            <v-flex xs12 sm12 md12>
                                <v-text-field
                                        label="GENERIC NAME"
                                        box
                                        v-model="editedItem.generic_name"
                                        v-validate="'required'"
                                        data-vv-name="egeneric_name"
                                        :error-messages="errors.collect('egeneric_name')"

                                ></v-text-field>
                            </v-flex> <v-flex xs12 sm12 md12>
                            <v-text-field
                                    label="PROPRIETARY NAME"
                                    box
                                    v-model="editedItem.proprietary_name"
                                    v-validate="'required'"
                                    data-vv-name="eproprietary_name"
                                    :error-messages="errors.collect('eproprietary_name')"

                            ></v-text-field>
                        </v-flex>
                            <v-flex xs4 sm4 md4>
                                <v-select
                                        offset-y
                                        :items="strengthList"
                                        v-model="editedItem.strength"
                                        label="STRENGTH"
                                        v-validate="'required'"
                                        data-vv-name="estrength"
                                        :error-messages="errors.collect('estrength')"
                                        box

                                ></v-select>
                            </v-flex>
                            <v-flex xs8 sm8 md8>
                                <v-select
                                        offset-y
                                        :items="catFetch"
                                        v-model="editedItem.category"
                                        label="THERAPEUTIC CATEGORY"
                                        v-validate="'required'"
                                        data-vv-name="ecategory"
                                        :error-messages="errors.collect('ecategory')"
                                        box

                                ></v-select>
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
                    <td>{{ props.item.product_type }}</td>
                    <td>{{ props.item.product_name }}</td>
                    <td>{{ props.item.category }}</td>
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
            Dictionary Item Successfully Added.
            <v-btn flat color="green" @click.native="su_snackbar = false">Close</v-btn>
        </v-snackbar>
        <v-snackbar
                :timeout="6000"
                :top="true"
                :right="x === 'right'"
                v-model="ed_snackbar"
                color=""
        >
            Dictionary Item Successfully Edited.
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
            generic_name:'',
            proprietary_name:'',
            strength:'',
            category:'',
            manufacturer:'',
            expiry:'',
            barcode:'se3erert',
            product_type:'',
            search:'',
            su_snackbar:false,
            er_snackbar:false,
            del_snackbar:false,
            ed_snackbar:false,
            form_error_snack:false,
            dtype:[
                {name:"DRUG",id:1},
                {name:"NON-DRUG CONSUMABLE",id:2},
            ],
            strengthList:[
                'G',
                'mg',
            ],
            headers: [
                {text: 'No.', align: 'left', value: 'num'},
                {text: 'Product Type', align: 'left', value: 'product_name'},
                {text: 'Product Name', align: 'left', value: 'product_name'},
                { text: 'Therapeutic Category', align: 'left', value: 'category'},
            ],
            dictionaries: [],
            editedIndex: -1,
            editedItem: {
                id:'',
                product_name:'',
                category:'',
                generic_name:'',
                proprietary_name:'',
                strength:'',
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
            product_name(){
                return this.generic_name +" "+this.proprietary_name+" "+this.strength;
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
                                proprietary_name:obj[key].proprietary_name,
                                generic_name:obj[key].generic_name,
                                barcode:obj[key].barcode,
                                strength:obj[key].strength,
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
                // this.$validator.validateAll().then((result)=>{
                //     if(result){
                        this.loader = true;
                        const DictData={
                            product_name:this.product_name,
                            category:this.category,
                            generic_name:this.generic_name,
                            proprietary_name:this.proprietary_name,
                            barcode:this.barcode,
                            strength:this.strength,
                            product_type:this.product_type.name,
                        };

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
                    // }
                //     else{
                //         this.form_error_snack = true;
                //         console.log(result)
                //         return false;
                //     }
                // });
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
                const type = this.dtype.filter(type => type.name=== item.product_type);
                alert(item.product_type);
                alert(type);
                console.log(type);
                 item.product_type = type;
                this.editedItem = Object.assign({}, item);
                this.edit_dialog = true
            },

            deleteItem (item){
                let self = this;

                // let confirmFn = this.del(item);

                let confirmFn = function(){
                    self.del(item);
                };

                let obj = {
                    title: 'Delete Customer',
                    message: 'Are you sure you want to Delete Customer?',
                    type: 'warning',
                    useConfirmBtn: true,
                    onConfirm: confirmFn
                };
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
                let self = this;

                this.formError=false;
                if (this.editedIndex > -1) {
                    Object.assign(this.dictionaries[this.editedIndex], this.editedItem)

                    let objID = this.editedItem.id;
                    this.loader = true;



                    const DictData={
                        product_name:this.editedItem.product_name,
                        category:this.editedItem.category,
                        proprietary_name:this.editedItem.proprietary_name,
                        generic_name:this.editedItem.generic_name,
                        strength:this.editedItem.strength,
                        product_type:this.editedItem.product_type.name,
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