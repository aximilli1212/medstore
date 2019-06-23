<template>
    <div>
        <v-card>
            <v-toolbar
                    class="mt-0 primary"
            >
                <v-toolbar-items class="hidden-sm-and-down">

                </v-toolbar-items>
                <v-layout row align-center>
                    <v-flex sm2>
                        <v-btn
                                class="secondary elevation-8"
                                @click="$router.push('/new_shortages')"

                        >
                            <v-icon left>mdi-redo</v-icon> Create Order </v-btn>

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

                <!--<v-layout row align-center style="max-width: 150px">-->

                <!--</v-layout>-->
            </v-toolbar>
        </v-card>



        <v-card class="thead">
            <v-card-title>
                <v-btn icon color="primary" @click="$router.go(-1)" small><v-icon>mdi-arrow-left-thick</v-icon></v-btn>
                <p class="headline ttext mt-3">All Re-Orders[ <i class="green--text text--darken-3">{{total}}</i> ] from <i class="green--text text--darken-3">{{outlet}}</i></p>
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
                    :items="purchases"
                    :search="search"
                    :loading="fetchup"
                    class="elevation-5"
            >
                <template slot="items" slot-scope="props" >

                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.no_items }}</td>
                    <td>{{ props.item.source }}</td>
                    <td>{{ props.item.destination }}</td>
                    <td>{{ props.item.sender }}</td>
                    <td>{{ conv_status(props.item.status) }}</td>
                    <td>{{ moment(props.item.reorder_date ).format('MMM Do YYYY')}}</td>
                    <td class="justify-center layout px-0">

                        <v-btn
                                flat
                                small
                                class="mr-2 teal--text cpoint"
                                @click="viewDet(props.item)"
                        ><v-icon
                                small
                        >
                            mdi-open-in-new
                        </v-icon> view</v-btn>

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
            <v-btn flat :color="snackColor" @click.native="snack= false">Close</v-btn>
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
        name: "requisitions",
        data(){
            return{
                showMenu: false,
                items: [
                    { title: 'Click Me' },
                    { title: 'Click Me' },
                    { title: 'Click Me' },
                    { title: 'Click Me 2' }
                ],
                er_snackbar:false,
                buffer_dialog:false,
                buffer_total:0,
                buffer_invoice:'',
                buffer_fetchup:false,
                snack:false,
                snackText:'',
                snackColor:'red',
                outlet:'Warehouse',
                loading: false,
                fetchup:false,
                loader:false,
                dialog:false,
                total:'',
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
                    { text: 'No. Items', align: 'left', value: 'num_items' },
                    { text: 'Source', align: 'left', value: 'source' },
                    { text: 'Destination', value: 'destination' },
                    { text: 'Sender', value: 'sender' },
                    { text: 'Status', value: 'status' },
                    { text: 'Date', value: 'date' },
                    { text: 'Actions',align:'center', value: 'actions' },
                ],
                purchases: [

                ],
                buffer_purchase:[],
                or_purchases: [

                ],
                buffer_head:[
                    {
                        text: 'Id',
                        align: 'left',
                        value: 'id',
                        class:'subheading'
                    },
                    { text: 'Product', value: 'product_name',class:'subheading',sortable:false },
                    { text: 'Quantity',class:'subheading', value: 'quantity' },
                    { text: 'S-Price(Ghc)',class:'subheading', value: 'selling_price' },
                    { text: 'C-Price(Ghc)', value: 'rt_unit_cost',class:'subheading' },
                    { text: 'Expiry', value: 'expiry',class:'subheading' },
                    { text: '', value: 'name', align: 'centre', sortable: false }

                ],
                inventory:[],
                raw_inventory:[],
                buffer_data:[],
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
                    // { icon: 'mdi-account-card-details', text: 'Suppliers',link:'/suppliers' },
                    // { icon: 'mdi-cart', text: 'Purchases',link:'/purchases' },

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
            },
            outlet(val){
                let self = this;

                const original = this.or_purchases;
                this.purchases = _.filter(original, function(o) { return o.source === val; });
                this.total = this.purchases.length;

            }

        },
        mounted(){
            this.setSide();
            this.loadPurchases();
        },
        created(){

        },
        methods:{
            setSide(){

                this.$store.commit('setSideItems',this.side_items);
                this.$store.commit('setDrawer',false);
            },
            conv_status(s){
                if(s==='0'){
                    return "pending";
                }
                else{
                    return "transfered";
                }
            },


            viewDet(purr_item){
                let self = this;
                this.$store.commit('setPurchaseDet',purr_item);

                this.fetchup = true;
                this.buffer_invoice = purr_item.reorder_invoice;
                axios.get(this.apiSet.reorderBuffer+'/'+purr_item.reorder_invoice)
                    .then(response=>{
                        const prod_show=[];
                        const obj = response.data.data;
                        self.$store.commit('setNewPopPurchase',obj);
                        self.buffer_total = prod_show.length;
                        self.buffer_fetchup = false;
                        self.fetchup = false;
                        self.$router.push('/reorder_pop');

                    }).catch(
                    e => {
                        console.log(e);
                        self.loader = false;

                        this.err.push(e);
                    }
                )
            },
            loadPurchases(){
                let self = this;
                this.fetchup = true;
                const r={
                    oid:this.userData.outlet_id,
                    cid:this.userData.company_id,
                };

                axios.post(this.apiSet.postReorder, r)
                    .then(response=>{
                        const obj = response.data.data;

                        self.or_purchases = obj;
                        self.purchases = _.filter(obj, function(o) { return o.source === self.outlet; });
                        self.total = self.purchases.length;
                        self.fetchup = false;

                    }).catch(
                    e => {
                        console.log(e);
                        self.loader = false;

                        this.err.push(e);
                    }
                )
            },

            submitPurchase(){
                let self = this;
                const p = this.buffer_purchase;
                this.buffer_fetchup = true;
                // Setting Product Purchase

                for (let key = 0, len = p.length; key < len; key++){

                    // axios.post(this.apiSet.singlePurchaseBuffer, p[key])

                    axios.post(this.apiSet.productPurchase, p[key])
                        .then(function (response) {
                            console.log(response);
                            self.loader = false;
                            self.buffer_dialog = false;
                            self.buffer_fetchup = false;
                            self.fetchup = false;
                            self.snack = true;
                            self.snackText = "Purchase Successfully Received.";
                            self.snackColor = "green";

                            self.loadPurchases();
                        })
                        .catch(function (error){
                            console.log(error);
                            this.er_snackbar = true;
                            self.loader = false;

                        });
                }
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