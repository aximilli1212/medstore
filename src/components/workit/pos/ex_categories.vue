<template>
    <div>
        <v-dialog v-model="dialog" persistent max-width="400px">
            <v-btn slot="activator" color="secondary" dark class="mb-2"><v-icon left>mdi-plus</v-icon> New Expense Category</v-btn>
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
                                <v-flex xs12 sm12 md12>
                                    <v-text-field
                                            label="Category Name"
                                            box
                                            v-model="ex.ex_name"
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
                            @click="onExpenseAdd"
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
                <p class="headline ttext mt-3">All Expense Categories [ <i class="green--text text--darken-3">{{total}}</i> ]</p>
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
                    :items="expenses"
                    :search="search"
                    :loading="fetchup"
                    class="elevation-8"
            >
                <template slot="items" slot-scope="props">
                    <!--<td>{{ props.item.num }}</td>-->
                    <td>{{ props.item.ex_name }}</td>
                    <td>{{ props.item.ex_user }}</td>
                    <td class="justify-center layout px-0">

                        <v-btn  small
                                flat
                                class="primary--text cpoint"
                                @click="editItem(props.item)"
                        ><v-icon

                        >
                            mdi-pencil
                        </v-icon> Edit </v-btn>

                        <v-btn  small
                                flat
                                class="red--text cpoint"
                                @click="deleteItem(props.item)"
                        ><v-icon

                        >
                            mdi-delete
                        </v-icon> Delete </v-btn>

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
        name: "expenses",
        data () {
            return {
                loader:false,
                ex:{
                    ex_name:'',
                },
                search: '',
                side_items:[

                    { icon: 'mdi-cash-multiple', text: 'Expenses',link:'/expenses' },

                ],
                headers: [
                    // { text: 'No.', align: 'left', value: 'id',class:'subheading' },
                    { text: 'Category Name', align: 'left', value: 'ex_name',class:'subheading' },
                    { text: 'Added By', align: 'left', value: 'ex_user',class:'subheading' },
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
                expenses: [
                ]
            }
        },
        computed:{
            apiSet(){
                return this.$store.getters.getApi
            },
            formTitle () {
                return this.editedIndex === -1 ? 'Add Expense Category' : 'Edit Expense Category'
            },
            btnTitle () {
                return this.editedIndex === -1 ? 'Add Category' : 'Update Category'
            }
        },
        mounted(){
            this.setSide();
            this.loadExpenses();

        },

        methods:{
            setSide(){

                this.$store.commit('setSideItems',this.side_items);
                this.$store.commit('setDrawer',true);
            },

            loadExpenses(){
                let self = this;
                this.fetchup = true;
                axios.get(this.apiSet.allExCats)
                    .then(response=>{
                        const obj = response.data.data;

                        // for (let key = 0, len = obj.length; key < len; key++) {
                        //     obj.num = key;
                        // }

                        self.expenses =obj;
                        self.total = obj.length;
                        self.fetchup = false;
                        self.$store.commit('setExCats',obj);

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

            onExpenseAdd(){

                if(this.editedIndex > -1){
                    this.updateExpense();

                }
                else{

                    let self = this;
                    this.$validator.validateAll().then((result)=>{
                        if(result){
                            this.loader = true;
                            let catData=this.ex;
                                catData.ex_user = this.userData.user_name;




                            axios.post(this.apiSet.singleExCat, catData)
                                .then(function (response) {
                                    self.closeup();
                                    self.loadExpenses();
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

                this.editedIndex = this.expenses.indexOf(item);
                const index = this.expenses.indexOf(item);
                let raw = this.expenses[index];
                this.ex = Object.assign({}, raw);
                this.dialog = true;
            },


            closeup(){
                this.dialog = false;
                this.ex.ex_name='';

                this.editedIndex = -1

            },

            updateExpense() {

                let self = this;

                if (this.editedIndex > -1) {
                    Object.assign(this.expenses[this.editedIndex], this.editedItem)

                    let objID = this.editedIndex;
                    let uid = this.expenses[objID].id;
                    this.loader = true;

                    console.log(objID);

                    const exData = this.ex;

                    axios.patch(this.apiSet.singleExCat + '/' + uid, exData)
                        .then(function (response) {
                            console.log(response);
                            self.loader = false;
                            self.snack = true;
                            self.snackText = "Update Successful";
                            self.snackColor = "green";
                            self.closeup();
                            self.$validator.reset();
                            self.loadExpenses();

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
                    title: 'Delete Category?',
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
                const index = this.expenses.indexOf(item);
                this.expenses.splice(index, 1);

                axios.delete(apiUrl+'/ex_cat/'+item.id)
                    .then(function(response){
                        console.log(response);
                        self.del_snackbar = true;
                        self.loadExpenses();
                        self.snack = true;
                        self.snackText = "Data Successfully Deleted";
                        self.snackColor ="red";

                    }).catch(function(error){
                    self.snack = true;
                    self.snackText = "Sorry. Network Error occured.";
                    self.snackColor ="red";
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