<template>
    <div>

        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" persistent max-width="500px">

            <v-btn slot="activator" color="primary" dark small class="mb-2"><v-icon left>mdi-plus</v-icon> Add Therapeutic Category </v-btn>
            <v-spacer></v-spacer>

            <v-card>
                <form>

                    <v-toolbar >
                        <v-toolbar-title class="primary--text">Add to Therapeutic Category</v-toolbar-title>

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
                                        <v-text-field
                                                label="Category Name"
                                                box
                                                v-model="cat_name"
                                                v-validate="'required'"
                                                data-vv-name="category_name"
                                                required
                                                :error-messages="errors.collect('category_name')"

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
                                @click="onAddCat"
                                color="secondary"
                                :loading="loader"
                                :disabled="loader"

                        ><v-icon left>mdi-library-plus</v-icon>Save</v-btn>
                    </v-card-actions>
                </form>
            </v-card>
        </v-dialog>
        <!----------------------------------------------UPDATE SINGLE ITEM DIALOG-------------------------------------------------------------------------------->

        <v-dialog v-model="edit_dialog" persistent max-width="500px">
            <v-card>
                <v-toolbar >
                    <v-toolbar-title class="primary--text">Edit Category</v-toolbar-title>


                    <v-spacer></v-spacer>


                    <v-btn icon @click.native="edit_dialog = false">
                        <v-icon color="secondary">mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-container grid-list-md elevation-3>
                        <v-layout wrap >
                            <v-flex xs12 sm12 md12>
                                <v-text-field
                                        label="Category Name"
                                        box
                                        v-model="editedItem.cat_name"
                                        required
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
                <p class="headline ttext mt-3">Therapeutic Categories [ <i class="green--text text--darken-3">{{total}}</i> ]</p>
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
                    :items="categories"
                    :search="search"
                    :loading="fetchup"
                    class="elevation-8"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.num }}</td>
                    <td>{{ props.item.cat_name }}</td>
                    <td>{{ props.item.cat_user }}</td>
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
                    <v-btn color="primary" @click="loadCategories">Refresh</v-btn>
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
            Please Enter Category Details.
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
            cat_name:'',
            search:'',
            su_snackbar:false,
            er_snackbar:false,
            del_snackbar:false,
            ed_snackbar:false,
            form_error_snack:false,
            gender: ['Male', 'Female'],
            headers: [
                {text: 'No.', align: 'left', value: 'num'},
                {text: 'Category Name', align: 'left', value: 'cat_name'},
                { text: 'Added By', align: 'left', value: 'by'},
            ],
            categories: [],
            editedIndex: -1,
            editedItem: {
                id:'',
                cat_name:'Category Name',
                cat_user:'',

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
            this.loadCategories();
        },
        created(){
            eventBus.$on('getCat',(data)=>{
                this.loadCategories();
            })
        },

        methods: {
            loadCategories(){
                this.fetchup=true;
                let self = this;
                axios.get(this.apiSet.allCategories)
                    .then(response=>{
                        const cat=[];
                        console.log(response.data.data);
                        const obj = response.data.data;
                        // for(let key in obj){
                        for (let key = 0, len = obj.length; key < len; key++) {
                            console.log(obj[key].title);
                            cat.push({
                                id:obj[key].id,
                                num:key,
                                cat_name:obj[key].cat_name,
                                cat_user:obj[key].cat_user,

                            })
                        }
                        self.categories = cat;
                        self.total = cat.length;
                        self.fetchup = false;
                        self.$store.commit('setCat',cat);

                    }).catch(
                    e => {
                        console.log(e);
                        self.loader = false;

                        this.err.push(e);
                    }
                )
            },

            onAddCat(){
                let self = this;
                this.$validator.validateAll().then((result)=>{
                    if(result){
                        this.loader = true;
                        const catData={
                            cat_name:this.cat_name,
                            cat_user:"aximilli",
                            // cat_user:this.cat_user,

                        };


                        axios.post(this.apiSet.singleCategory, catData)
                            .then(function (response) {
                                self.closeup();
                                self.su_snackbar=true;
                                self.loadCategories();
                                self.loader = false;

                            })
                            .catch(function (error) {
                                self.loader = false;
                                self.er_snackbar = true;
                            });
                    }
                    else{
                        this.form_error_snack = true;
                        return false;
                    }
                });

            },

            clearFields(){
                this.cat_name='',
                    this.cat_user='',

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
                this.editedIndex = this.categories.indexOf(item);
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
                    title: 'Delete Category',
                    message: 'Are you sure you want to Delete Category?',
                    type: 'warning',
                    useConfirmBtn: true,
                    onConfirm: confirmFn
                }
                this.$refs.simplert.openSimplert(obj);

            },

            del(item){
                let self = this;
                let apiUrl = this.$store.state.config.url;
                const index = this.categories.indexOf(item);
                this.categories.splice(index, 1);

                axios.delete(apiUrl+'/category/'+item.id)
                    .then(function(response){
                        console.log(response);
                        self.del_snackbar = true;
                        self.loadCategories();
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
                    Object.assign(this.categories[this.editedIndex], this.editedItem)

                    let objID = this.editedItem.id;
                    this.loader = true;



                    const catData={
                        cat_name:this.editedItem.cat_name,
                        cat_user:"aximilli",
                    }


                    let apiUrl = this.$store.state.config.url;

                    axios.patch(apiUrl+'/category/'+objID, catData)
                        .then(function (response) {
                            console.log(response);
                            self.loader = false;
                            self.ed_snackbar = true;
                            self.edit_dialog = false;
                            self.$validator.reset();
                            self.loadCategories();
                            self.$store.commit('setNetError',false);

                        })
                        .catch(function (error) {
                            console.log(error);
                            self.loader = false;
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