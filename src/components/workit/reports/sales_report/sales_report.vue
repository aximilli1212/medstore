<template>
    <div>

        <v-layout row align-center class="mb-2">

            <v-flex sm3 >
                <v-btn large color="primary--text" class="elevation-8" @click="loadMySales"><v-icon left>mdi-alarm-light</v-icon>View Sales Report</v-btn>
            </v-flex>

            <v-flex sm3 >
                <v-btn large color="orange--text text--darken-3" class="elevation-8" @click="loadInvoices"><v-icon left>mdi-receipt</v-icon>View All Invoices</v-btn>
            </v-flex>
            <v-flex sm3 >
                <v-btn large color="secondary--text" class="elevation-8" @click="loadSummary"><v-icon left>mdi-calendar-plus</v-icon>View Sales Summary</v-btn>
            </v-flex>

        </v-layout>


        <v-card>
            <v-toolbar
                    v-if="salesSummary"
                    class="mt-0 secondary"
            >
                <v-toolbar-title>
                    <v-textfield></v-textfield>
                </v-toolbar-title>
                <v-toolbar-items class="hidden-sm-and-down">

                </v-toolbar-items>
                <v-layout row align-center>

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
                    <v-spacer></v-spacer>

                    <v-flex sm3>
                        <v-menu
                                :close-on-content-click="false"
                                v-model="dateMenu"
                                offset-y
                                bottom
                        >
                            <v-btn
                                    large
                                    slot="activator"
                                    color="primary"
                            ><v-icon left>mdi-calendar</v-icon> Select Date Range</v-btn>
                            <v-card>
                                <v-card-text>
                                    <v-daterange
                                            :options="dateRangeOptions"
                                            @input="onDateRangeChange"
                                    >

                                    </v-daterange>
                                </v-card-text>
                            </v-card>
                        </v-menu>

                    </v-flex>
                    <v-flex sm4 class="mt-3">
                        <p class="subheading white--text">From:
                            <v-chip class="subheading elevation-8">{{ range[0] }}</v-chip> To:
                            <v-chip class="subheading elevation-8">{{ range[1] }}</v-chip>
                        </p>
                    </v-flex>

                </v-layout>

                <!--<v-layout row align-center style="max-width: 150px">-->

                <!--</v-layout>-->
            </v-toolbar>

            <v-toolbar
                    v-else
                    class="mt-0 primary"
            >
                <v-toolbar-title>
                    <v-textfield></v-textfield>
                </v-toolbar-title>
                <v-toolbar-items class="hidden-sm-and-down">

                </v-toolbar-items>
                <v-layout row align-center>

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
                    <v-spacer></v-spacer>

                    <v-flex sm3>
                        <v-menu
                                :close-on-content-click="false"
                                v-model="dateMenu"
                                offset-y
                                bottom
                        >
                            <v-btn
                                    large
                                    slot="activator"
                                    color="secondary"
                            ><v-icon left>mdi-calendar</v-icon> Select Date Range</v-btn>
                            <v-card>
                                <v-card-text>
                                    <v-daterange
                                            :options="dateRangeOptions"
                                            @input="onDateRangeChange"
                                    >

                                    </v-daterange>
                                </v-card-text>
                            </v-card>
                        </v-menu>

                    </v-flex>
                    <v-flex sm4 class="mt-3">
                        <p class="subheading white--text">From:
                            <v-chip class="subheading elevation-8">{{ range[0] }}</v-chip> To:
                            <v-chip class="subheading elevation-8">{{ range[1] }}</v-chip>
                        </p>
                    </v-flex>

                </v-layout>

                <!--<v-layout row align-center style="max-width: 150px">-->

                <!--</v-layout>-->
            </v-toolbar>
        </v-card>



        <v-card
                v-if="salesSummary"
                class="thead">
            <v-card-title>
                <v-btn icon color="primary" @click="$router.go(-1)" small><v-icon>mdi-arrow-left-thick</v-icon></v-btn>
                <p class="headline ttext mt-3">All Sales[ <i class="green--text text--darken-3">{{total}}</i> ] @ <i class="green--text text--darken-3">{{outlet}}</i></p>
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
                    :headers="sales_head"
                    :items="my_sales"
                    :search="search"
                    :loading="fetchup"
                    class="elevation-5"
            >
                <template slot="items" slot-scope="props" >

                    <td>{{ props.item.num }}</td>
                    <td>{{moment(props.item.time).format('MMMM Do YYYY, h:mm a') }}</td>
                    <td>{{ props.item.customer_name }}</td>
                    <td>{{ props.item.product_name }}</td>
                    <td>{{ props.item.quantity}}</td>
                    <td>{{ props.item.amount_due }}</td>
                    <td>{{ props.item.payment_type }}</td>
                    <td>{{ props.item.invoice_no }}</td>

                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                </v-alert>
            </v-data-table>

        </v-card>

        <v-card
                v-else
                class="thead">
            <v-card-title>
                <v-btn icon color="primary" @click="$router.go(-1)" small><v-icon>mdi-arrow-left-thick</v-icon></v-btn>
                <p class="headline ttext mt-3">All Sales Report[ <i class="green--text text--darken-3">{{total}}</i> ] @ <i class="green--text text--darken-3">{{outlet}}</i></p>
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
                    :headers="sales_head"
                    :items="my_sales"
                    :search="search"
                    :loading="fetchup"
                    class="elevation-5"
            >
                <template slot="items" slot-scope="props" >

                    <td>{{ props.item.num }}</td>
                    <td>{{moment(props.item.time).format('MMMM Do YYYY, h:mm a') }}</td>
                    <td>{{ props.item.customer_name }}</td>
                    <td>{{ props.item.product_name }}</td>
                    <td>{{ props.item.quantity}}</td>
                    <td>{{ props.item.amount_due }}</td>
                    <td>{{ props.item.payment_type }}</td>
                    <td>{{ props.item.invoice_no }}</td>

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
    import { eventBus } from '../../../../main.js';
    import { format, subDays, addDays } from 'date-fns';
    export default {
        name: "sales_report",
        data(){
            return{
                salesSummary:false,
                showMenu: false,
                outlet:'Warehouse',
                snack:false,
                snackColor:'',
                snackText:'',
                loading: false,
                fetchup:false,
                loader:false,
                items: [],
                dialog:false,
                total:'',
                search: null,
                searchup: null,
                select: null,
                range: [
                    format(new Date(), 'DD-MM-YYYY'),
                    format(new Date(), 'DD-MM-YYYY'),
                ],
                dateMenu: false,
                dateRangeOptions: {
                    startDate: format(subDays(new Date(), 7), 'YYYY-MM-DD'),
                    endDate: format(new Date(), 'YYYY-MM-DD'),
                    format: 'MM/DD/YYYY',
                    presets: [
                        {
                            label: 'Today',
                            range: [
                                format(new Date(), 'YYYY-MM-DD'),
                                format(new Date(), 'YYYY-MM-DD'),
                            ],
                        },
                        {
                            label: 'Yesterday',
                            range: [
                                format(subDays(new Date(), 1), 'YYYY-MM-DD'),
                                format(subDays(new Date(), 1), 'YYYY-MM-DD'),
                            ],
                        },
                        {
                            label: 'Last Week',
                            range: [
                                format(subDays(new Date(), 7), 'YYYY-MM-DD'),
                                format(subDays(new Date(), 1), 'YYYY-MM-DD'),
                            ],
                        },
                        {
                            label: 'Last 2 Weeks',
                            range: [
                                format(subDays(new Date(), 14), 'YYYY-MM-DD'),
                                format(subDays(new Date(), 1), 'YYYY-MM-DD'),
                            ],
                        },
                        {
                            label: 'Last 30 Days',
                            range: [
                                format(subDays(new Date(), 30), 'YYYY-MM-DD'),
                                format(subDays(new Date(), 1), 'YYYY-MM-DD'),
                            ],
                        },
                    ],
                },
                sales_head: [
                    { text: 'Id', align: 'left', sortable: false, value: 'num'},
                    { text: 'Time', align: 'left', value: 'time' },
                    { text: 'Customer Name', align: 'left', value: 'customer_name' },
                    { text: 'Product Name', align: 'left', value: 'product_name' },
                    { text: 'Quantity', value: 'quantity' },
                    { text: 'Amount Due', value: 'amount_due' },
                    { text: 'Payment Type', value: 'payment_type' },
                    { text: 'Invoice No.', value: 'invoice_no' },
                    { text: '', value: 'actions' },

                ],

                my_sales: [],

                side_items:[

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
            this.setSide();
            this.loadMySales();

        },
        created(){
            eventBus.$on('er_snack',(data)=>{
                this.er_snackbar = data;
            });

            eventBus.$on('su_snack',(data)=>{
                this.su_snackbar = data;
            });

            eventBus.$on('del_snack',(data)=>{
                this.del_snackbar = data;
            });

            eventBus.$on('ed_snack',(data)=>{
                this.ed_snackbar = data;
            });

            eventBus.$on('form_snack',(data)=>{
                this.form_error_snack = data;
            });
            eventBus.$on('product_add',(data)=>{
                this.loadProducts();
            });

        },
        methods:{
            setSide(){

                this.$store.commit('setSideItems',this.side_items);
                this.$store.commit('setDrawer',false);
            },
            onDateRangeChange(range) {
                this.range = range;
            },
            querySelections (v) {
                this.loading = true;
                // Simulated ajax query
                setTimeout(() => {
                    this.items = this.states.name.filter(e => {
                        return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
                    });
                    this.loading = false
                }, 500)
            },
            loadMySales(){
                let self = this;
                this.fetchup = true;
                this.outlet = this.userData.outlet_name;

                let sumData= {
                    oid:this.userData.outlet_id,
                    cid:this.userData.company_id
                }

                axios.post(this.apiSet.saleSummary, sumData)
                    .then(response=>{
                        const sale_show=[];
                        const obj = response.data.data;


                        for (let key = 0, len = obj.length; key < len; key++) {
                            sale_show.push({
                                id:obj[key].id,
                                num:key,
                                time:obj[key].sale_payment.date_received,
                                customer_name:obj[key].customer.firstname+' '+obj[key].customer.lastname,
                                product_name:obj[key].product_name,
                                amount_due:obj[key].sale_payment.amount_due,
                                quantity:obj[key].quantity,
                                payment_type:obj[key].sale_payment.payment_type,
                                invoice_no:obj[key].invoice_no,

                            })
                        }

                        console.log(sale_show);
                        self.my_sales =sale_show;
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
            loadInvoices(){
                this.$router.push('/all_invoice_list');

            },
            loadSummary(){
                this.salesSummary = true;
                this.$router.push('/sales_summary')

            }
            ,


            editItem (item) {
                this.editedIndex = this.inventory.indexOf(item);
                const index = this.inventory.indexOf(item);
                let raw = this.raw_inventory[index];
                this.editedItem = Object.assign({}, raw);
                this.dialog = true
            },
            updateProduct() {

                let self = this;
                this.loader = true;

                this.$validator.validateAll().then((result)=>{
                    if(result){


                        if (this.editedIndex > -1) {
                            Object.assign(this.raw_inventory[this.editedIndex], this.editedItem)

                            let objID = this.editedItem.id;
                            let updateData = this.editedItem;

                            let apiUrl = this.$store.state.config.url;

                            axios.patch(apiUrl+'/product/'+objID, updateData)
                                .then(function (response) {
                                    console.log(response);
                                    self.loader = false;
                                    self.ed_snackbar = true;
                                    self.dialog = false;
                                    self.$validator.reset();
                                    self.loadProducts();
                                    self.$store.commit('setNetError',false);

                                })
                                .catch(function (error) {
                                    console.log(error);
                                    self.loader = false;
                                    this.$store.commit('setNetError',true);

                                });

                        } else {
                            self.err_snackbar = true;
                            return false;


                        }

                    }
                    else{
                        this.form_error_snack = true;
                        this.loader = false;
                        return false;

                    }

                });

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