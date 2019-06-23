<template>
    <div>
        <v-dialog v-model="transfer_dialog" persistent max-width="1200px">

            <v-card
                    class="elevation-4"
            >
                <v-card-title>
                    <p class="headline ttext mt-1">[ <i class="green--text text--darken-3">{{transfer_total}}</i> ] Requested Products | </p><br />
                    <p class="small ttext mt-1">Invoice No. [ <i class="orange--text text--darken-3">#{{transfer_invoice}}</i> ]</p><br />
                    <v-spacer></v-spacer>


                    <v-btn large class="secondary elevation-8" @click="transferItems"><v-icon>mdi-format-align-middle</v-icon> Transfer Items</v-btn>
                    <v-btn icon @click.native="closeup">
                        <v-icon color="secondary">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-data-table
                        :headers="transfer_head"
                        :items="transfer_data"
                        :loading="transfer_fetchup"
                        class="elevation-1"
                >
                    <template slot="items" slot-scope="props">
                        <!--<td>-->
                        <!--<v-switch-->
                        <!--color="secondary"-->
                        <!--v-model="switch1"-->
                        <!--&gt;-->
                        <!--<template slot="label">-->
                        <!--<v-chip  v-if="switch1" color="green darken-3" text-color="white">-->
                        <!--<v-avatar>-->
                        <!--<v-icon>check_circle</v-icon>-->
                        <!--</v-avatar>-->
                        <!--Accepted-->
                        <!--</v-chip>-->
                        <!--<v-chip  v-else color="red darken-3" text-color="white">-->
                        <!--<v-avatar>-->
                        <!--<v-icon>mdi-close</v-icon>-->
                        <!--</v-avatar>-->
                        <!--Rejected-->
                        <!--</v-chip>-->
                        <!--<v-icon v-else>mdi-plus</v-icon>-->
                        <!--</template>-->


                        <!--</v-switch>-->
                        <!--</td>-->
                        <td>{{ props.item.id }}</td>
                        <td>{{ props.item.product_name }}</td>
                        <td>{{ props.item.purr_rt_quantity+'('+props.item.rt_unit+')' }}</td>
                        <td>{{ props.item.purr_rt_quantity+'('+props.item.rt_unit+')' }}</td>
                        <td>{{ props.item.selling_price }}</td>
                        <td>{{ props.item.rt_unit_cost }}</td>
                        <td>{{ props.item.expiry }}</td>
                    </template>
                    <template slot="no-data">
                        <v-alert :value="true" color="primary" icon="add">
                            <v-progress-circular :indeterminate="true" :value="0" size="24" color="orange darken-3" class="mr-4"></v-progress-circular> Loading Data. Please wait.
                        </v-alert>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                    </v-alert>
                </v-data-table>
                <v-card-actions v-if="transfer_state">
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
                <v-toolbar-items class="hidden-sm-and-down">

                </v-toolbar-items>
                <v-layout row align-center>
                    <v-flex sm2>
                        <v-select
                                v-model="outlet"
                                offset-y
                                class="mt-2 mr-4"
                                :items="outlets"
                                label="Select Outlet"
                                solo
                                clearable
                        ></v-select>

                    </v-flex>

                    <v-flex>
                        <v-btn @click="fetchSet" dark large :color="fetchSetColor"><v-icon>{{fetchSetIcon}}</v-icon> {{ fetchSetName}}</v-btn>
                    </v-flex>

                    <!--The Date Picker-->
                    <v-spacer></v-spacer>
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
                <p class="headline ttext mt-3">{{fstate}} Orders[ <i class="green--text text--darken-3">{{total}}</i> ] from <i class="green--text text--darken-3">{{outlet}}</i></p>
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search by eg. Status"
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
                    <td>{{ props.item.status }}</td>
                    <td>{{ moment(props.item.reorder_date ).format('MMM Do YYYY')}}</td>
                    <td class="justify-center layout px-0">

                        <v-btn
                                flat
                                class="mr-2 teal--text cpoint"
                                @click="viewDet(props.item)"
                        ><v-icon
                                small
                        >
                            mdi-open-in-new
                        </v-icon> view</v-btn>

                        <v-btn
                                flat
                                class="mr-2 orange--text darken-3 cpoint"
                                @click="transView(props.item)"
                        ><v-icon
                        >
                            mdi-arrow-right
                        </v-icon> Transfer</v-btn>

                        <v-btn
                                flat
                                class="mr-2 red--text darken-3 cpoint"
                                @click="viewDet(props.item)"
                        ><v-icon
                                small
                        >
                            mdi-delete
                        </v-icon> Reject</v-btn>

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
        name: "inv-reorder",
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
                fstate:"Pending",
                fetchSetName:"Fetch All",
                fetchSetColor:"green darken-3",
                fetchSetIcon:"mdi-arrow-collapse-all",
                transfer_dialog:false,
                transfer_total:0,
                transfer_invoice:'',
                transfer_fetchup:false,
                snack:false,
                snackText:'',
                snackColor:'red',
                outlet:'all Outlets',
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
                transfer_purchase:[],
                or_purchases: [

                ],
                transfer_head:[
                    {
                        text: 'Id',
                        align: 'left',
                        value: 'id',
                        class:'subheading'
                    },
                    { text: 'Product', value: 'product_name',class:'subheading',sortable:false },
                    { text: 'Available Qty',class:'subheading', value: 'purr_rt_quantity' },
                    { text: 'Transfer Qty',class:'subheading', value: 'purr_rt_quantity' },
                    { text: 'S-Price(Ghc)',class:'subheading', value: 'selling_price' },
                    { text: 'C-Price(Ghc)', value: 'rt_unit_cost',class:'subheading' },
                    { text: 'Expiry', value: 'expiry',class:'subheading' },
                    { text: '', value: 'name', align: 'centre', sortable: false }

                ],
                inventory:[],
                raw_inventory:[],
                transfer_data:[],
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
                if(!val){

                    this.purchases = original;
                    this.total = this.purchases.length;
                }
                else{
                    this.purchases = _.filter(original, function(o) { return o.source === val; });
                    this.total = this.purchases.length;
                }



            }

        },
        mounted(){
            this.setSide();
            this.loadPendingReorders();
        },
        created(){

        },
        methods:{
            setSide(){
                this.$store.commit('setSideItems',this.side_items);
                this.$store.commit('setDrawer',false);
            },
            fetchSet(){
                if(this.fetchSetName === "Fetch All"){
                    this.loadPurchases();
                    this.fetchSetName = "Fetch Pending";
                    this.fetchSetColor = "orange darken-3";
                    this.fetchSetIcon= "mdi-view-sequential";
                    this.fstate="All ";
                }
                else{
                    this.loadPendingReorders();
                    this.fetchSetName = "Fetch All";
                    this.fetchSetColor = "green darken-3";
                    this.fetchSetIcon= "mdi-arrow-collapse-all";
                    this.fstate="Pending ";
                }
            },


            viewDet(purr_item){
                let self = this;
                this.$store.commit('setPurchaseDet',purr_item);

                this.fetchup = true;
                this.transfer_invoice = purr_item.reorder_invoice;
                axios.get(this.apiSet.reorderBuffer+'/'+purr_item.reorder_invoice)
                    .then(response=>{
                        const prod_show=[];
                        const obj = response.data.data;
                        self.$store.commit('setNewPopPurchase',obj);
                        self.transfer_total = prod_show.length;
                        self.transfer_fetchup = false;
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
            transView(purr_item){
                let self = this;
                this.$store.commit('setTransferDet',purr_item);

                this.fetchup = true;
                this.transfer_invoice = purr_item.reorder_invoice;
                axios.get(this.apiSet.reorderBuffer+'/'+purr_item.reorder_invoice)
                    .then(response=>{
                        const obj = response.data.data;
                        self.$store.commit('setTransferNew',obj);
                        self.transfer_data = obj;
                        self.transfer_total = obj.length;
                        self.transfer_fetchup = false;
                        self.fetchup = false;
                        this.transfer_dialog = true;

                    }).catch(
                    e => {
                        console.log(e);
                        self.loader = false;

                        this.err.push(e);
                    }
                )

            },

            // transData(purr_item){
            //     let self = this;
            //
            //
            //     this.fetchup = true;
            //     this.transfer_invoice = purr_item.reorder_invoice;
            //     axios.get(this.apiSet.reorderBuffer+'/'+purr_item.reorder_invoice)
            //         .then(response=>{
            //             const prod_show=[];
            //             const obj = response.data.data;
            //
            //             self.transfer_total = prod_show.length;
            //             self.transfer_fetchup = false;
            //             self.fetchup = false;
            //             self.$router.push('/inv_transfer');
            //
            //         }).catch(
            //         e => {
            //             console.log(e);
            //             self.loader = false;
            //
            //             this.err.push(e);
            //         }
            //     )
            // },

            loadPendingReorders(){
                let self = this;
                this.fetchup = true;
                const r={
                    oid:this.userData.outlet_id,
                    cid:this.userData.company_id,
                };

                axios.post(this.apiSet.postReorderPending, r)
                    .then(response=>{
                        const obj = response.data.data;

                        self.or_purchases = obj;
                        // self.purchases = _.filter(obj, function(o) { return o.source === self.outlet; });
                        self.purchases = obj;
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
                        // self.purchases = _.filter(obj, function(o) { return o.source === self.outlet; });
                        self.purchases = obj;
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

            transferItems(){
                let self = this;
                const p = this.transfer_data;
                this.transfer_fetchup = true;
                let reorder_inv = p[0].reorder_invoice;
                // Setting Product Purchase

                for (let key = 0, len = p.length; key < len; key++){
                    axios.post(this.apiSet.posrecBuffer, p[key])
                        .then(function (response){
                            console.log(response);
                            self.loader = false;
                            self.transfer_dialog = false;
                            self.transfer_fetchup = false;
                            self.fetchup = false;
                            self.snack = true;
                            self.snackText = "Transfer Successfully Sent.";
                            self.snackColor = "green";

                            self.setReorder(reorder_inv);
                            self.loadPendingReorders();
                        })
                        .catch(function (error){
                            console.log(error);
                            self.transfer_dialog = false;
                            self.transfer_fetchup = false;
                            self.fetchup = false;
                            self.snack = true;
                            self.snackText = "Communication Error.";
                            self.snackColor = "red";
                            self.loader = false;

                        });
                }
            },
            setReorder(inv){
                    axios.get(this.apiSet.recReorder+'/'+inv)
                        .then(response=>{
                            console.log(response);
                            const obj = response.data.data;

                            // self.transfer_total = prod_show.length;
                            // self.transfer_fetchup = false;
                            // self.fetchup = false;
                            // self.$router.push('/inv_transfer');

                        }).catch(
                        e => {
                            console.log(e);
                            self.loader = false;

                            this.err.push(e);
                        }
                    )
            },
            closeup(){
                this.transfer_dialog = false;
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