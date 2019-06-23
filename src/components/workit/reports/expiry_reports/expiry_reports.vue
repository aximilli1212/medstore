<template>
    <div>

        <v-dialog v-model="dialog" persistent max-width="900px">

            <v-card
                    class="elevation-4"
            >
                <v-card-title>
                    <p class="headline ttext mt-1">[ <i class="green--text text--darken-3">{{adj_total}}</i> ] Expiring Products | </p><br />
                    <p class="small ttext mt-1">Batch No. [ <i class="orange--text text--darken-3">#{{adj_batch}}</i> ]</p><br />
                    <v-spacer></v-spacer>


                   <v-btn large class="secondary elevation-8" v-if="adj_state === 1" @click="setExpiryReport"><v-icon>mdi-format-align-middle</v-icon> Adjust Stock</v-btn>
                    <v-btn icon @click.native="dialog = false">
                        <v-icon color="secondary">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-data-table
                        :headers="headers"
                        :items="expiries"
                        :loading="adj_fetchup"
                        class="elevation-1"
                >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.num }}</td>
                        <td>{{ props.item.product_name }}</td>
                        <td>{{ props.item.available_quantity }}</td>
                        <td>{{ props.item.report_quantity }}</td>
                        <td>{{ props.item.price }}</td>
                        <td>{{ props.item.subtotal }}</td>
                        <td color="orange">{{ props.item.expiry }}</td>
                    </template>
                    <template slot="no-data">
                        <v-alert :value="true" color="primary" icon="add">
                            Data table Emty. Please wait.
                        </v-alert>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                    </v-alert>
                </v-data-table>
                <v-card-actions v-if="adj_state">
                    <v-spacer></v-spacer>
                    <v-btn color="grey darken-1" flat @click.native="close">Cancel</v-btn>
                    <v-btn color="primary darken-1"dark @click.native=""><v-icon left>mdi-printer</v-icon>Print</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>



        <v-card>
            <v-toolbar
                    class="mt-0 primary"
            >
                <v-toolbar-title>
                    <v-textfield></v-textfield>
                </v-toolbar-title>
                <v-toolbar-items class="hidden-sm-and-down">

                </v-toolbar-items>
                <v-layout row align-center>
                    <v-flex sm2>
                        <v-btn
                                dark
                                class="secondary elevation-8"
                                @click="$router.push('/pos_expiry')"

                        >
                            <v-icon left>mdi-clipboard-arrow-down</v-icon> Pull Expiries</v-btn>
                    </v-flex>

                    <v-spacer></v-spacer>
                    <v-flex sm2>
                        <v-select
                                v-model="outlet"
                                offset-y
                                class="mt-2 mr-4"
                                :items="outlets"
                                label="Select Outlet"
                                solo
                        ></v-select>

                    </v-flex>


                    <!--The Date Picker-->
                    <v-flex sm3 md3 >
                        <v-menu
                                ref="menu2"
                                :close-on-content-click="false"
                                v-model="menu2"
                                :nudge-right="40"
                                :return-value.sync="start_date"
                                lazy
                                box
                                transition="scale-transition"
                                offset-y
                                full-width
                                min-width="290px"
                        >
                            <v-text-field
                                    slot="activator"
                                    v-model="start_date"
                                    label="Start Date"
                                    solo
                                    clearable
                                    class="mt-2 mr-4"
                                    append-icon="event"
                                    readonly
                            ></v-text-field>
                            <v-date-picker v-model="start_date" @input="$refs.menu2.save(start_date)"></v-date-picker>

                        </v-menu>
                    </v-flex>



                    <v-flex sm3 md3 >
                        <v-menu
                                ref="menu3"
                                :close-on-content-click="false"
                                v-model="menu3"
                                :nudge-right="40"
                                :return-value.sync="end_date"
                                lazy
                                box
                                transition="scale-transition"
                                offset-y
                                full-width
                                min-width="290px"
                        >
                            <v-text-field
                                    slot="activator"
                                    v-model="end_date"
                                    label="End Date"
                                    solo
                                    clearable
                                    class="mt-2 ml-4"
                                    append-icon="event"
                                    readonly
                                    color="secondary"
                            ></v-text-field>
                            <v-date-picker v-model="end_date" @input="$refs.menu3.save(end_date)"></v-date-picker>

                        </v-menu>
                    </v-flex>



                </v-layout>

            </v-toolbar>
        </v-card>



        <v-card class="thead">
            <v-card-title>
                <v-btn icon color="primary" @click="$router.go(-1)" small><v-icon>mdi-arrow-left-thick</v-icon></v-btn>
                <p class="headline ttext mt-3">All Reported Expiries[ <i class="green--text text--darken-3">{{total}}</i> ] @ <i class="green--text text--darken-3">{{outlet}}</i></p>
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
                    :headers="purchase_head"
                    :items="expiry_reports"
                    :search="search"
                    :loading="fetchup"
                    class="elevation-5"
            >
                <template slot="items" slot-scope="props" >

                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.batch_no }}</td>
                    <td>{{ props.item.quantity }}</td>
                    <td>{{ props.item.by }}</td>
                    <td class="justify-center layout px-0">

                        <v-btn
                                flat
                                small
                                class="mr-2 teal--text cpoint"
                                @click="editItem(props.item)"
                        ><v-icon
                                small
                        >
                            mdi-open-in-new
                        </v-icon> view</v-btn>

                    </td>

                </template>
                <template slot="no-data">
                    <v-alert :value="true" color="primary" icon="mdi-warning">
                        No products reported as Expiring.
                    </v-alert>
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
            Sorry input Errors. Data could not be saved.
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
                v-model="del_error_snack"
        >
            Sorry!!! an error occured, Could not delete Product.
            <v-btn flat color="red" @click.native="del_error_snack = false">Close</v-btn>
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

        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <v-btn flat @click="snack = false">Close</v-btn>
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
    export default {
        name: "expiry_reports",
        data(){
            return{
                showMenu: false,
                snack: false,
                snackColor: '',
                snackText: '',
                er_snackbar:false,
                del_snackbar:false,
                del_error_snack:false,
                form_error_snack:false,
                su_snackbar:false,
                ed_snackbar:false,
                outlet:'Warehouse',
                loading: false,
                fetchup:false,
                adj_fetchup:false,
                loader:false,
                items: [],
                dialog:false,
                total:'',
                adj_total:'',
                adj_batch:'',
                adj_state:0,
                search: null,
                searchup: null,
                select: null,
                start_date: null,
                menu: false,
                menu2: false,
                end_date: null,
                menu3: false,
                states: [
                    {name:'Toilet Rolls',icon:'mdi-chart-bubble',category:'Toiletries'},
                ],
                purchase_head: [
                    { text: 'Id', align: 'left', sortable: false, value: 'id'},
                    { text: 'Batch No.', align: 'left', value: 'batch_no' },
                    { text: 'Quantity', align: 'left', value: 'quantity' },
                    { text: 'By', align:'left',value: 'by' },
                    { text: 'Actions',align:'center', value: 'actions' },
                ],
                headers: [
                    {text: 'No.', align: 'left', value: 'num'},
                    {text: 'Product Name', align: 'left', value: 'product_name'},
                    { text: 'Available Quantity', align: 'left', value: 'available_quantity'},
                    { text: 'Report Quantity', align: 'left', value: 'report_quantity'},
                    { text: 'Price', align: 'left', value: 'price'},
                    { text: 'Subtotal', align: 'left', value: 'subtotal'},
                    { text: 'Expiry', align: 'left', value: 'expiry'},
                    { text: '', align: 'left', value: 'expiry'}
                ],
                expiries: [

                ],
                expiry_reports:[],
                inventory:[],
                raw_inventory:[],
                editedIndex: -1,
                editedItem: {
                    id:'',
                    product_name:'',
                    category:'',
                    manufacturer:'',
                    expiry:'',
                    product_type:'',
                    ws_quantity:'',
                    rt_quantity:'',
                    barcode:'',
                    rt_unit:'',
                    ws_unit:'',
                    ws_discount:0,
                    rt_discount:0,
                    ws_unit_cost:'',
                    rt_unit_cost:'',
                    markup:'',
                    selling_price:'',
                    subtotal:'',
                    min_no:'',
                    batch_no:'',
                    max_no:'',
                    reorder_no:'',

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
                side_items:[
                    { icon: 'mdi-account-card-details', text: 'Suppliers',link:'/suppliers' },

                ],
            }
        },
        computed:{
            apiSet(){
                return this.$store.getters.getApi
            },
            unit_cost(){
                return this.editedItem.ws_unit+" Cost(Ghc)";
            },
            runit_cost(){
                return this.editedItem.rt_unit+" Cost(Ghc)";
            },
        },
        watch:{
            search (val) {
                val && val !== this.select && this.querySelections(val)
            }
        },
        mounted(){
            // this.setSide();
            this.loadExpiryBatch();

        },

        methods:{
            setSide(){

                this.$store.commit('setSideItems',this.side_items);
                this.$store.commit('setDrawer',true);
            },

            loadExpiryBatch(){
                let self = this;
                this.fetchup = true;
                axios.get(this.apiSet.expiry_batch)
                    .then(response=>{
                        const prod_show=[];
                        const obj = response.data;
                        console.log(obj);
                        // for(let key in obj){
                        for (let key = 0, len = obj.length; key < len; key++) {

                            prod_show.push({
                                id:key,
                                num:key,
                                batch_no:obj[key].expiry_batch,
                                quantity:obj[key].total,
                                expiry:'This month',
                                outlet:'Warehouse',
                                by:'aximilli',
                            })
                        }
                        self.expiry_reports =prod_show;
                        self.total = obj.length;
                        self.fetchup = false;

                    }).catch(
                    e => {
                        console.log(e);
                        self.loader = false;

                        this.err.push(e);
                    }
                )
            },

            findExpiryBatch(item){
                 this.expiries = [];
                this.adj_batch = item.batch_no;
                this.adj_fetchup=true;

                let batch = {};
                 batch.batch_no = item.batch_no;

                let self = this;
                axios.post(this.apiSet.find_expiry_batch,batch)
                    .then(response=>{
                        const cat=[];
                        const obj = response.data.data;
                        for (let key = 0, len = obj.length; key < len; key++) {
                            cat.push({
                                id:obj[key].id,
                                num:key,
                                product_name:obj[key].product_name,
                                available_quantity:obj[key].ws_quantity,
                                report_quantity:obj[key].ws_quantity,
                                price:obj[key].subtotal,
                                subtotal:obj[key].subtotal,
                                expiry:obj[key].expiry,
                                expiry_report:obj[key].expiry_report,
                            })
                            self.adj_state = obj[key].expiry_report;

                        }

                        self.editedIndex = cat.id;


                        self.expiries = cat;
                        self.adj_total = obj.length;
                        self.adj_fetchup = false;

                    }).catch(
                    e => {
                        console.log(e);
                        self.loader = false;

                        this.err.push(e);
                    }
                )
            },


            editItem (item) {
                this.editedIndex = this.inventory.indexOf(item);
                const index = this.inventory.indexOf(item);
                let raw = this.raw_inventory[index];
                this.editedItem = Object.assign({}, raw);
                this.dialog = true
                this.findExpiryBatch(item);
            },


            setExpiryReport(){

                let self = this;
                this.loader = true;

                let obj = this.expiries;

                for (let key = 0, len = obj.length; key < len; key++) {

                        let objID = obj[key].id;

                    let updateData = 1;

                    let apiUrl = this.$store.state.config.url;

                    axios.patch(apiUrl+'/expiry_report/'+objID, updateData)
                        .then(function (response) {
                            console.log(response);
                            self.loader = false;
                            self.ed_snackbar = true;
                            self.adj_state = 2;
                            self.$store.commit('setNetError',false);

                        })
                        .catch(function (error) {
                            console.log(error);
                            self.loader = false;
                            this.$store.commit('setNetError',true);

                        });

                }

            },




            deleteItem (item) {
                let self = this;
                // let confirmFn = this.del(item);

                let confirmFn = function() {
                    self.del(item);
                }

                let obj = {
                    title: 'Delete Customer',
                    message: 'Are you sure you want to Delete Product?',
                    type: 'warning',
                    useConfirmBtn: true,
                    onConfirm: confirmFn
                }
                this.$refs.simplert.openSimplert(obj);

            },

            del(item){
                let self = this;
                let apiUrl = this.$store.state.config.url;
                const index = this.inventory.indexOf(item);
                this.inventory.splice(index, 1);

                axios.delete(apiUrl+'/product/'+item.id)
                    .then(function(response){
                        console.log(response);
                        self.del_snackbar = true;
                        self.loadProducts();
                        self.$store.commit('setNetError',false);

                    }).catch(function(error){
                    self.del_error_snack = true;
                    self.$store.commit('setNetError',true);
                    console.log(error);
                })
            },
            close(){
                this.dialog = false;
            },
            save () {
                this.snack = true
                this.snackColor = 'success'
                this.snackText = 'Data saved'
            },
            cancel () {
                this.snack = true
                this.snackColor = 'error'
                this.snackText = 'Canceled'
            },
            open () {
                this.snack = true
                this.snackColor = 'info'
                this.snackText = 'Dialog opened'
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