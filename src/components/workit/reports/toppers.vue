<template>
    <div>




        <v-card class="thead">
            <v-card-title>
                <v-btn icon color="primary" @click="$router.go(-1)" small><v-icon>mdi-arrow-left-thick</v-icon></v-btn>
                <p class="headline ttext mt-3">Top Products [ <i class="green--text text--darken-3">{{total}}</i> ]</p>
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
                    :items="toppers"
                    :search="search"
                    :loading="fetchup"
                    class="elevation-8"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.num }}</td>
                    <td>{{ props.item.product_name }}</td>
                    <td>{{ props.item.quantity }}</td>
                    <!--<td class="justify-center layout px-0">-->

                        <!--<v-btn  small-->
                                <!--flat-->
                                <!--class="primary&#45;&#45;text cpoint"-->
                                <!--@click="editItem(props.item)"-->
                        <!--&gt;<v-icon-->

                        <!--&gt;-->
                            <!--mdi-pencil-->
                        <!--</v-icon> Edit </v-btn>-->

                        <!--<v-btn  small-->
                                <!--flat-->
                                <!--class="red&#45;&#45;text cpoint"-->
                                <!--@click="deleteItem(props.item)"-->
                        <!--&gt;<v-icon-->

                        <!--&gt;-->
                            <!--mdi-delete-->
                        <!--</v-icon> Delete </v-btn>-->

                    <!--</td>-->
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
        name: "toppers",
        data () {
            return {
                loader:false,
                ex:{
                    ex_name:'',
                },
                search: '',
                side_items:[

                    // { icon: 'mdi-cash-multiple', text: 'toppers',link:'/toppers' },

                ],
                headers: [
                    { text: 'No.',align: 'left', value: 'num',class:'subheading' },
                    { text: 'Product Name',sortable:false, align: 'left', value: 'product_name',class:'subheading' },
                    { text: 'Total Quantity Sold', align: 'left', value: 'quantity',class:'subheading' },
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
                toppers: [
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
            this.loadToppers();

        },

        methods:{
            setSide(){

                this.$store.commit('setSideItems',this.side_items);
                this.$store.commit('setDrawer',true);
            },

            loadToppers(){
                let self = this;
                this.fetchup = true;
                let top  = [];

                let pid = {
                    cid:this.userData.company_id,
                    oid:this.userData.outlet_id
                }

                axios.post(this.apiSet.allToppers,pid)
                    .then(response=>{

                        let result=_.chain(response.data).groupBy("product_name").map(function(v, i) {
                            return {
                                product_name: i,
                                quantity:v.reduce((t, n) => t + (n.quantity), 0)

                            }
                        }).value();

                        console.log(result);

                        for (let key = 0, len = result.length; key < len; key++) {
                              result[key].num = key+1;
                            top.push(result[key])
                        }
                        self.toppers =top;
                        self.total = top.length;
                        self.fetchup = false;

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
                                    self.loadtoppers();
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

                this.editedIndex = this.toppers.indexOf(item);
                const index = this.toppers.indexOf(item);
                let raw = this.toppers[index];
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
                    Object.assign(this.toppers[this.editedIndex], this.editedItem)

                    let objID = this.editedIndex;
                    let uid = this.toppers[objID].id;
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
                            self.loadtoppers();

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
                const index = this.toppers.indexOf(item);
                this.toppers.splice(index, 1);

                axios.delete(apiUrl+'/ex_cat/'+item.id)
                    .then(function(response){
                        console.log(response);
                        self.del_snackbar = true;
                        self.loadtoppers();
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