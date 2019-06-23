<template>
    <div>




        <open-reg :reg_dialog="reg_dialog" :hold_up="hold_up"></open-reg>
        <open-sus :sus_dialog="sus_dialog"></open-sus>
        <open-payment :pay_dialog="pay_dialog"></open-payment>
        <add-cus :dialog="dialog"></add-cus>
        <v-card>
            <v-flex xs12>
                <v-progress-linear
                        :active="isUpdating"
                        class="ma-0"
                        color="secondary"
                        height="2"
                        indeterminate
                ></v-progress-linear>
            </v-flex>
            <v-container
                    fluid
                    grid-list-lg
            >
                <v-layout row wrap>
                    <v-flex xs8 sm8 md8>
                        <v-card  color="elevation-5 grey lighten-2" class="white--text">

                            <v-card-actions class="pa-1">
                                <!--REgister select-->
                                <v-flex sm4>
                                    <v-select

                                            class="reg_mode pa-1"
                                            :items="reg_modes"
                                            label="Register Mode"
                                            v-model="reg_mode"
                                            solo
                                            offset-y
                                    ></v-select>

                                </v-flex>

                                     <v-spacer></v-spacer>
                               <div class="mb-4">
                                   <v-btn small dark @click="openSessionDialog" class="" ><v-icon left>mdi-av-timer</v-icon>{{getSession}} Shift</v-btn>

                                   <v-btn @click="openSusDialog" dark small color="secondary"><v-icon left>mdi-pause-circle-outline</v-icon> Suspended Sales</v-btn>

                                   <v-btn dark small color="primary" @click="$router.push('/my_sales')"><v-icon color left>mdi-cart-outline</v-icon> Daily Sales</v-btn>

                               </div>
                            </v-card-actions>

                            <!--Item search toolbar-->

                            <transition
                                    enter-class="fadeIn"
                                    enter-active-class="flipInX"
                                    leave-active-class="flipOutX"
                                    leave-class="fadeOut"

                                    mode="out-in"
                                    appear>

                                <!--RETURN ITEMS &#45;&#45;INVOICE SEARCH-->
                                <v-toolbar
                                        v-if="ret_up"
                                        key="inv"
                                        dark
                                        color="secondary lighten-1"
                                        class=""
                                        elevation-8
                                >
                                    <v-toolbar-title>Find Invoice:</v-toolbar-title>
                                    <v-autocomplete
                                            :loading="inv_loading"
                                            :items="inv_products"
                                            :search-input.sync="inv_search"
                                            v-model="inv_select"
                                            class="mx-3"
                                            flat
                                            clearable
                                            hide-no-data
                                            hide-details
                                            label="Start typing invoice number..."
                                            solo-inverted
                                    ></v-autocomplete>
                                    <v-btn @click="loadInvoice" icon>
                                        <v-icon >refresh</v-icon>
                                    </v-btn>
                                </v-toolbar>

                            <v-toolbar
                                    v-else
                                    key="prod"
                                    dark
                                    color="primary lighten-1"
                                    class=""
                                    elevation-8
                            >
                                <v-toolbar-title>Find Product:</v-toolbar-title>
                                <v-autocomplete
                                        :loading="loading"
                                        :items="products"
                                        :search-input.sync="search"
                                        v-model="select"
                                        class="mx-3"
                                        flat
                                        clearable
                                        hide-no-data
                                        hide-details
                                        label="Start typing product name..."
                                        solo-inverted
                                ></v-autocomplete>
                                <v-btn icon>
                                    <v-icon>more_vert</v-icon>
                                </v-btn>
                            </v-toolbar>


                            </transition>



                            <!--item toolbar search end-->

                            <!--Products Table-->

                            <v-data-table
                                    :headers="headers"
                                    :items="sale_prod"
                                    :loading="false"
                                    hide-actions
                            >
                                <v-progress-linear slot="progress" height="2" color="blue" indeterminate></v-progress-linear>
                                <template slot="items" slot-scope="props">

                                    <td class="text-xs-left">{{ props.item.num }}</td>
                                    <td class="text-xs-left">{{ props.item.product_name }}</td>
                                    <td class="text-xs-left">{{ props.item.price }}</td>
                                    <td>{{ props.item.rt_quantity }}</td>
                                    <td class="text-xs-left">
                                        <v-edit-dialog
                                                :return-value.sync="props.item.quantity"
                                                large
                                                lazy
                                                persistent
                                                @save="q_save(props.item,props.item.quantity,props.item.or_quantity)"
                                                @cancel="cancel"
                                                @open="open"
                                                @close="close"
                                        >
                                            <div>{{ props.item.quantity }}</div>
                                            <div slot="input" class="mt-3 title">Update Quantity</div>
                                            <v-text-field
                                                    slot="input"
                                                    v-model="props.item.quantity"
                                                    label="Edit"
                                                    single-line
                                                    autofocus
                                                    v-validate="'numeric|required'"
                                                    data-vv-name="quantity"
                                                    required
                                                    :error-messages="errors.collect('quantity')"
                                            ></v-text-field>
                                        </v-edit-dialog>
                                    </td>

                                    <td class="text-xs-left">
                                        <v-edit-dialog
                                                :return-value.sync="props.item.discount"
                                                large
                                                lazy
                                                persistent
                                                @save="dis_save(props.item,props.item.discount)"
                                                @cancel="cancel"
                                                @open="open"
                                                @close="close"
                                        >
                                            <div>{{ props.item.discount }}</div>
                                            <div slot="input" class="mt-3 title">Set Discount</div>
                                            <v-text-field
                                                    slot="input"
                                                    v-model="props.item.discount"
                                                    label="Edit"
                                                    single-line
                                                    autofocus
                                            ></v-text-field>
                                        </v-edit-dialog>
                                    </td>
                                    <td class="justify-center layout px-0">
                                        <v-icon
                                                color="red"
                                                small
                                                @click="del(props.item)"
                                        >
                                            mdi-delete
                                        </v-icon>
                                    </td>
                                </template>
                                <template slot="no-data">
                                    <v-alert :value="true" color="grey lighten-1"  icon="warning">
                                        No Products Added, Please add products.
                                    </v-alert>
                                </template>
                                <template slot="pageText" slot-scope="{pageStart, pageStop}">
                                    From {{ pageStart }} to {{ pageStop }}
                                </template>
                            </v-data-table>
                        </v-card>

                    </v-flex>



                    <v-flex xs4 sm4 md4>
                        <v-card color="grey lighten-2" class="white--text pa-0">
                            <v-flex sm12 md12>
                                <v-btn small v-if="!cusID" class="primary enchill" @click="openCusDialog"><v-icon left>mdi-account-plus</v-icon>New Customer</v-btn>
                                <v-btn small v-if="!cusID" flat class="enchill" outline @click="setCashCus"><v-icon color="primary" >mdi-rotate-right</v-icon>Set Walk-in Customer</v-btn>

                            </v-flex>

                            <v-spacer></v-spacer>
                          <set-customer>

                          </set-customer>

                            <v-card-title primary-title>
                                   </v-card-title>

                            <v-data-table
                                    :headers="sale_head"
                                    :items="sale_up"
                                    hide-actions
                                    class="elevation-1"
                            >
                                <template slot="items" slot-scope="props">
                                    <td>{{ props.item.product_name }}</td>
                                    <td>{{ props.item.quantity }}</td>
                                    <td>{{ props.item.sub_total }}</td>
                                </template>
                                <template slot="no-data">
                                    <div class="centre grey--text">Please add a product</div>
                                </template>
                            </v-data-table>


                            <v-list v-if="sales_active" three-line>
                            <v-list-tile
                                    v-for="item in sales_foot"
                                    :key="item.title"
                                    avatar
                                    @click=""
                            >

                                <v-list-tile-content >
                                    <v-list-tile-title v-text="item.totalup"></v-list-tile-title>
                                    <v-list-tile-title v-text="item.discup"></v-list-tile-title>

                                    <v-list-tile-title v-text="item.title"></v-list-tile-title>
                                </v-list-tile-content>

                                <v-list-tile-content>
                                    <v-list-tile-title  v-text="item.total_items"></v-list-tile-title>
                                    <v-list-tile-title v-text="item.discount"></v-list-tile-title>
                                    <v-list-tile-title class="green--text body text--darken-3" elevation-5 v-text="item.total"></v-list-tile-title>

                                </v-list-tile-content>

                            </v-list-tile>
                            </v-list>


                             <v-spacer></v-spacer>
                            <v-divider class=""></v-divider>

                           <v-layout>
                               <v-flex sm4 class="pt-0">
                                   <v-btn dark small outline :loading="hold_load" color="black" @click="holdSale" v-if="holdup"><v-icon>mdi-pause</v-icon>Hold</v-btn>
                                   <v-btn dark small flat outline color="red darken-4" @click="cancelSale"><v-icon>mdi-close</v-icon>cancel</v-btn>
                               </v-flex>
                               <v-flex sm8>
                                   <v-btn @click="openPayment" large :color="slug_color" dark><v-icon left>{{slug_icon}}</v-icon> {{slug}}</v-btn>
                               </v-flex>
                           </v-layout>

<!--&lt;!&ndash;</v-card-actions>-->
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
        <v-snackbar
                :timeout="6000"
                :top="true"
                :right="x === 'right'"
                v-model="form_error_snack"
        >
            {{snackText}}
            <v-btn flat color="red" @click.native="form_error_snack = false">Close</v-btn>
        </v-snackbar>

        <v-snackbar
                :timeout="8000"
                :top="true"
                :right="x === 'right'"
                v-model="snack"
        >
            {{snackText}}
            <v-btn flat :color="snackColor" @click.native="snack = false">Close</v-btn>
        </v-snackbar>

    </div>
</template>

<script>
    import { eventBus } from '../../../../main.js';
    import AddCus from './add_cus';
    import OpenReg from './open_reg';
    import OpenSus from './open_sus';
    import OpenPayment from './open_payment';
    import moment from 'moment';
    let axios = require("axios");
    export default {
        name: "make_sale",
        $_veeValidate: {
            validator: 'new'
        },
        data: () => ({
            ret_up:false,

            hold_up:false,
            hold_load:false,
            reg_modes: ['Sales Receipt', 'Proforma Invoice', 'Return'],
            reg_mode:"Sales Receipt",
            loading: false,
            inv_loading:false,
            sales_active:false,
            products: [],
            sale_invoices:[],
            invoicy:'',
            slug:'Make Payment',
            slug_color:'green darken-3',
            slug_icon:'mdi-cash-multiple',
            holdup:true,
            inv_products:[],
            dialog: false,
            reg_dialog: false,
            pay_dialog: false,
            sus_dialog: false,
            customers: [],
            form_error_snack:false,
            inv_search:false,
            search: null,
        search_cus: null,
        select: null,
            inv_select:null,
        customer: null,
            side_items:[],
        select_cus: null,
            sales_foot: [
                { icon: true, title: 'Amount Due (Gh¢ ):',totalup:'Total Items:',total_items:0,total:'', discup:'Discount:',discount:'0%'},
            ],

            sale_head: [
                { text: 'Product', value: 'product_name' },
                { text: 'Qty', value: 'quantity' },
                { text: 'Sub Total', value: 'subtotal' },

            ],

            sale_up: [],
            items2: [
                { title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' }
            ],
            cus_list: [],

        product_list: [],
            invoice_list:[],
             sale_products:[],
            snack: false,
            snackColor: '',
            snackText: "Sorry!!! Please Correct form errors.",
            max25chars: (v) => v.length <= 25 || 'Input too long!',
            pagination: {},
            headers: [
                {text: 'No.', align: 'left', sortable: false, value: 'num',class:['bold_head']},
                {text: 'Product Name', align: 'left', sortable: false, value: 'name',class:['bold_head']},
                {text: 'Price (GH¢)', align: 'left', sortable: false, value: 'price'},
                {text: 'Available Quantity', align: 'left', sortable: false, value: 'rt_quantity'},
                {text: 'Quantity', align: 'left', sortable: false, value: 'quantity'},
                {text: 'Disc%', align: 'left', sortable: false, value: 'discount'},
                {text: 'Delete', sortable: false, value: 'action'},
            ],
            sale_prod: [],

    }),
        mounted(){

            if(this.getSession === "Not Set" || this.getSession === undefined){
                this.reg_dialog=true;
            }
            eventBus.$on('fetch_cuslist',()=>{
                this.loadCustomers();
            });
            eventBus.$on('close_dialog',(p)=>{
                this.dialog = p ;
            });
            eventBus.$on('form_error',(p)=>{
                this.form_error_snack = true ;
            });
            eventBus.$on('close_dialog',(p)=>{
                this.snackbar = p ;
            });
            eventBus.$on('close_reg',(p)=>{
                this.reg_dialog = p ;
            });
            eventBus.$on('close_sus',(p)=>{
                this.sus_dialog = p ;
            });
            eventBus.$on('close_pay',(p)=>{
                this.pay_dialog = p ;
            });
            eventBus.$on('hold_up',(p)=>{
                this.hold_up = p ;
            });
            eventBus.$on('susRelease',(p)=>{
                if(this.sales_active){
                    this.snack = true;
                    this.snackText = "Active Sale. Please Complete or clear current sale.";
                    this.snackColor = "red";

                    return false;

                }
                else{
                    this.sales_active = true;
                    let susDet = p[0].sus_det;



                    this.sale_prod = p[0].products;
                    this.sale_up = p[0].products;

                    let total_items = this.sale_prod.length;
                    let total_amount = this.sale_prod.reduce((t, n) => t + parseFloat(n.sub_total), 0);

                    this.sales_foot[0].total_items = total_items;
                    this.sales_foot[0].discount= p[0].products[0].discount;
                    this.sales_foot[0].total = total_amount;


                    // SET CUSTOMER

                    const cusData = {
                        address:susDet.address,
                        company:susDet.company,
                        credit:susDet.credit,
                        discount_amount:susDet.discount_amount,
                        discount_percentage:susDet.discount_amount,
                        email:susDet.email,
                        firstname:susDet.firstname,
                        id:susDet.cid,
                        lastname:susDet.lastname,
                        markup:susDet.markup,
                        name:susDet.name,
                        phone_no:susDet.phone_no,
                        title:susDet.title,

                    };

                    this.$store.commit('setSaleCustomer',cusData);
                    eventBus.$emit('changeCus');
                }
            });
            this.fetchSession();
            this.setSide();
            this.loadCustomers();
            this.loadProducts();
            this.loadBankAccounts();
            this.$store.commit('setCurrentSales',[])
        },
    watch: {
        search (val) {
            val && val !== this.select && this.querySelections(val);
        },
        inv_search (val) {
            val && val !== this.select && this.inv_querySelections(val);
        },
        inv_select (val) {
            let res = this.sale_invoices.filter(function(e) {
                return e.invoice_no === val;
            });


            if (this.sale_prod.filter(e => e.invoice_no === res[0].invoice_no).length > 0){
                // eventBus.$emit('setSearch',res[0].product_name);
                this.sales_active = false;
                this.snack = true;
                this.snackColor = "red";
                this.snackText = "Sorry #"+res[0].invoice_no+" has already been added.";
                return false;

            }else {

                this.sales_active = true;
                let basic = {};

                basic =res[0];
                let basic_sub = basic.quantity * basic.price;

                let fullup = {...basic,sub_total:basic_sub,or_sub_total:basic_sub};

                this.sale_prod=[];
                this.sale_up=[];
                this.sale_prod.unshift(fullup);
                this.sale_up.unshift(fullup);


                let total_items = this.sale_prod.length;
                let total_amount = Object.values(this.sale_prod).reduce((t, n) => t + parseFloat(n.sub_total), 0);

                this.sales_foot[0].total_items = total_items;
                this.sales_foot[0].total = total_amount;

                this.inv_select = null;
            }


        },

        search_cus (val) {
            val && val !== this.select_cus && this.queryCus(val);
        },
        select(val){
            let res = this.sale_products.filter(function(e) {
                return e.product_name === val;
            });


            if (this.sale_prod.filter(e => e.product_name === res[0].product_name).length > 0){
                // eventBus.$emit('setSearch',res[0].product_name);
                this.sales_active = false;
                this.snack = true;
                this.snackColor = "red";
                this.snackText = "Sorry Product "+res[0].product_name+" has already been added.";
                return false;

            }
            else{
                  this.sales_active = true;
                let basic = {};

                basic =res[0];
                let basic_sub = basic.quantity * basic.price;

                let fullup = {...basic,sub_total:basic_sub,or_sub_total:basic_sub};

                this.sale_prod.unshift(fullup);
                this.sale_up.unshift(fullup);


                let total_items = this.sale_prod.length;
                let total_amount = Object.values(this.sale_prod).reduce((t, n) => t + parseFloat(n.sub_total), 0);

                this.sales_foot[0].total_items = total_items;
                this.sales_foot[0].total = total_amount;

                // this.select = null;
                // this.addCurr();


            }



        },
        reg_mode(val){
            switch(val){
                case "Sales Receipt":
                    this.slug = "MAKE PAYMENT";
                    this.slug_color = "green darken-3";
                    this.slug_icon = "mdi-cash-multiple";
                    this.holdup = true;
                    this.ret_up = false;
                    this.setProducts();


                    break;
                case "Proforma Invoice":
                    this.slug = "GENERATE INVOICE";
                    this.slug_color = "grey darken-3";
                    this.slug_icon = "fa-file-text-o";
                    this.holdup = false;
                    this.ret_up = false;

                    break;
                case "Return":
                    this.slug = "RETURN ITEM";
                    this.slug_color = "orange darken-3";
                    this.slug_icon = "fa-reply";
                    this.holdup = false;
                    this.ret_up = true;
                    this.loadInvoice();

                    break;
                default:
                    this.slug = "MAKE PAYMENT";
                    this.slug_color = "green darken-3";
                    this.slug_icon = "mdi-cash-multiple";
                    this.holdup = true;
                    this.ret_up = false;



            }

        },
    },
        computed: {
            apiSet() {
                return this.$store.getters.getApi
            },
            cusDialog(){
                return this.dialog;
            },
            cusID(){
                return this.$store.getters.getCustomerID;
            },

            getSession(){
                return this.$store.getters.getSalesSession.shift;
            },
            getFullSession(){
                return this.$store.getters.getSalesSession;
            },
            getCurrentSales(){
                return this.$store.getters.getCurrentSales;
            },
            getSaleCus(){
                return this.$store.getters.getSaleCustomer;
            },
            getUserData(){
                return this.$store.getters.getUserData;
            },
            isUpdating(){
                return this.$store.getters.getIsUp;
            }



        },
    methods:{
            setCashCus(){
                eventBus.$emit('changeCus')
            },
            openCusDialog(){
                this.dialog = true;
            },
             openSessionDialog(){
                 this.reg_dialog=true;
            },
            openSusDialog(){
                 this.sus_dialog=true;
            },
             openPayment(){


                if(!this.cusID){
                    this.snack = true;
                    this.snackText = "Please select Customer ";
                    this.snackColor = "red";

                    return false;
                }

                if(this.sales_active){
                    this.addCurr();
                    eventBus.$emit('set_due',false);

                    if( this.slug === "GENERATE INVOICE"){
                        this.addCurr();
                        eventBus.$emit('set_due',false);
                        this.$router.push('/proforma_invoice');
                         return false;
                    }
                    if( this.slug === "RETURN ITEM"){
                        this.addCurr();
                        eventBus.$emit('set_due',false);
                         return false;
                    }

                    this.pay_dialog=true;

                }

                else{
                    this.snack = true;
                    this.snackText = "Please add a product ";
                    this.snackColor = "red";
                }
            },
        fetchSession(){

                let self = this;
                this.hold_up = true;

            var today = moment().format('Do MMM YYYY');

            const sesData = {
                user_id: this.userData.id,
                ses_date: today,

            };

            axios.post(this.apiSet.singleSession, sesData)
                .then(function (response) {
                    let ses = response.data.data[0];
                    if(!ses){
                        self.reg_dialog=true;
                        self.hold_up=false;
                    }
                    else{
                        self.hold_up=false;
                        self.$store.commit('setSalesSession',ses);
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });
        },





        addCurr(){
                 let q = this.sale_up;
                 let r = this.sales_foot[0];
                 let s = this.getSaleCus;
                 let t = this.getFullSession;
                 let u = this.getUserData;

                let boomSale = {
                    ...r,...s,...t,...u
                };

                // console.log(boomSale);

                this.$store.commit('setCurrentSales',boomSale);
                this.$store.commit('setCurrentProducts',q);



           },
        holdSale(){
            let self = this;
            this.hold_load = true;
            if(!this.cusID){
                this.snack = true;
                this.snackText = "Please select Customer ";
                this.snackColor = "red";
                this.hold_load = false;


                return false;
            }

            if(this.sales_active){

                let q = this.sale_up;
                let r = this.sales_foot[0];
                let s = this.getSaleCus;
                let t = this.getFullSession;
                let u = this.getUserData;

                let d = new Date();
                let n = d.getTime();

                let boomSuspend = {
                    ...r,...s,sus_code:n
                };

                console.log(boomSuspend);

                axios.post(this.apiSet.singleSuspended, boomSuspend)
                    .then(function (response) {

                        console.log(response);

                        self.snack=true;
                        self.snackText="Success. Sale was successfully suspended.";
                        self.snackColor="green";
                        self.hold_load = false;


                        // this.$store.commit('setSuspendedSales',boomSuspend);

                        self.sus_products(n);

                    })
                    .catch(function (error) {
                        self.snack=true;
                        self.snackText="Error.Sorry a network error occured.";
                        self.snackColor="red";
                    });

            }

            else{
                this.snack = true;
                this.snackText = "Please add a product ";
                this.snackColor = "red";
            }

        },

        sus_products(n){
            let prodSet = this.sale_prod;

             let susProd = [];


            for (let key = 0, len = prodSet.length; key < len; key++) {

                susProd.push({
                    company_id: this.userData.company_id,
                    outlet_id: this.userData.outlet_id,
                    product_id: prodSet[key].id,
                    product_name: prodSet[key].product_name,
                    quantity: prodSet[key].quantity,
                    or_quantity: prodSet[key].or_quantity,
                    rt_quantity: prodSet[key].rt_quantity,
                    price: prodSet[key].price,
                    discount: prodSet[key].discount,
                    sus_code: n,
                    sub_total: prodSet[key].sub_total,

                })

            }

            for (let key = 0, len = susProd.length; key < len; key++) {

                axios.post(this.apiSet.singleSusProduct, susProd[key])
                    .then(function (response) {
                        console.log(response);

                        self.snack=true;
                        self.snackText="Success.Product Suspended.";
                        self.snackColor="green";

                    })
                    .catch(function (error) {
                        console.log(error);
                        this.er_snackbar = true;
                        alert('died Here')

                    });
            }

            this.cancelSale();
        },

        cancelSale(){
            this.sale_up = [];
            this.sale_prod = [];
            this.sales_foot = [
                { icon: true, title: 'Amount Due (Gh¢ ):',totalup:'Total Items:',total_items:0,total:'', discup:'Discount(%):',discount:'0%'},

            ];

            this.sales_active = false;
        },


        setProducts(){
            let self = this;
            const dict=[];
            const obj = this.sale_products;
            // for(let key in obj){
            for (let key = 0, len = obj.length; key < len; key++) {
                dict.push(
                    obj[key].product_name,

                )
            }

            this.product_list = dict;

            console.log(dict);
        },

            loadProducts(){
            let self = this;
            axios.get(this.apiSet.allProducts)
                .then(response=>{
                    const prod_show=[];
                    console.log(response.data.data);
                    const obj = response.data.data;
                    // for(let key in obj){
                    for (let key = 0, len = obj.length; key < len; key++) {
                        console.log(obj[key].title);
                        prod_show.push({
                            id:obj[key].id,
                            num:key,
                            product_name:obj[key].product_name,
                            rt_quantity:obj[key].rt_quantity,
                            or_quantity:obj[key].rt_quantity,
                            quantity:1,
                            price:obj[key].selling_price,
                            discount:0,
                        })
                    }
                    self.sale_products = prod_show;
                    self.setProducts();



                }).catch(
                e => {
                    console.log(e);
                    self.loader = false;

                    this.err.push(e);
                }
            )
        },
        setInvoice(){
            let self = this;
            const idict=[];
            const obj = this.sale_invoices;
            // for(let key in obj){
            for (let key = 0, len = obj.length; key < len; key++) {
                idict.push(
                    obj[key].invoice_no,

                )
            }
            this.invoice_list = idict;
        },

            loadInvoice(){
            let self = this;
            // let oicy = this.invoicy;
            axios.get(this.apiSet.allSaleInvoices)
                .then(response=>{
                    const prod_show=[];
                    console.log(response.data.data);
                    const obj = response.data.data;
                    // for(let key in obj){
                    for (let key = 0, len = obj.length; key < len; key++) {
                        console.log(obj[key].title);
                        prod_show.push({
                            id:obj[key].product_id,
                            num:key,
                            product_name:obj[key].product.product_name,
                            rt_quantity:obj[key].product.rt_quantity,
                            or_quantity:obj[key].product.rt_quantity,
                            quantity:1,
                            price:obj[key].product.selling_price,
                            discount:0,
                            invoice_no:obj[key].invoice_no,

                        })
                    }
                    self.sale_invoices = prod_show;
                    self.setInvoice();



                }).catch(
                e => {
                    console.log(e);
                    self.loader = false;

                    this.err.push(e);
                }
            )
        },
        loadCustomers(){
                    const customers = [];
                    const obj = this.$store.getters.getCustomers;
                    // for(let key in obj){
                    for (let key = 0, len = obj.length; key < len; key++) {
                        console.log(obj[key].title);
                        customers.push({

                            name:obj[key].firstname +' '+obj[key].lastname,

                        })
                    }

                    self.cus_list = customers;
        },
        setSide(){
            this.$store.commit('setDrawer',false);
            this.$store.commit('setSideItems',this.side_items)
        },
        querySelections (v) {
            this.loading = true;
            // Simulated ajax query
            setTimeout(() => {
                this.products = this.product_list.filter(e => {
                    return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
                });
                this.loading = false;
            }, 500);
        },
        inv_querySelections (v) {
            this.loading = true;
            // Simulated ajax query
            setTimeout(() => {
                this.inv_products = this.invoice_list;
                this.loading = false;
            }, 500);
        },
        q_save(ind,val,origin) {

            let indy = this.sale_up.indexOf(ind);

            this.$validator.validateAll().then((result)=>{
                    if(result){

                let new_quantity = origin - val;
                let new_subtotal = this.sale_up[indy].quantity * this.sale_up[indy].price;

                this.sale_up[indy].sub_total = new_subtotal;
                this.sale_prod[indy].rt_quantity = new_quantity;


                   // Update total Amount
                        let total_amount = Object.values(this.sale_up).reduce((t, n) => t + n.sub_total, 0);

                        this.sales_foot[0].total = total_amount;

                console.log(this.sale_up[indy].sub_total);

            }
        else{
                this.form_error_snack = true;
                this.snackText  = "Sorry you entered Invalid Quantity Value."
                this.sale_prod[indy].rt_quantity = 1;
                return false;
            }
        });


        },
        dis_save(ind,val){
            let indy = this.sale_up.indexOf(ind);

            this.$validator.validateAll().then((result)=>{
                if(result){

                    // ws_sub = sub * (1-(this.editedItem.ws_discount * 0.01));
                    let new_subtotal =this.sale_up[indy].or_sub_total * (1-(val * 0.01));

                    this.sale_up[indy].sub_total = new_subtotal;


                    // Update total Amount
                    let total_amount = Object.values(this.sale_up).reduce((t, n) => t + n.sub_total, 0);

                    this.sales_foot[0].total = total_amount;
                    this.sales_foot[0].discount = val;

                    console.log(this.sale_up[indy].sub_total);

                }
                else{
                    this.form_error_snack = true;
                    this.snackText  = "Sorry you entered Invalid Discount Value."
                    this.sale_prod[indy].discount = 0;
                    return false;
                }
            });

        },


        del(item){
            const index = this.sale_up.indexOf(item);
            this.sale_up.splice(index, 1);
            this.sale_prod.splice(index, 1);

            // Update no. of products and total amount
            let total_items = this.sale_prod.length;
            let total_amount = Object.values(this.sale_up).reduce((t, n) => t + n.sub_total, 0);

            this.sales_foot[0].total_items = total_items;
            this.sales_foot[0].total = total_amount;

            if(total_items === 0){
                this.sales_active = false;
            }

            },


        loadBankAccounts(){
            let self = this;
            axios.get(this.apiSet.allBankAccounts)
                .then(response=>{
                    const obj = response.data.data;

                    self.$store.commit('setBankDrop',obj);

                }).catch(
                e => {
                    console.log(e);
                    this.err.push(e);
                }
            )
        },
        cancel () {
            this.snack = true;
            this.snackColor = 'error';
            this.snackText = 'Canceled';
        },
        open () {
            this.snack = true;
            this.snackColor = 'info';
            this.snackText = 'Quantity opened';
        },
        close () {
            console.log('Dialog closed')
        },

    },
        components:{
            AddCus: AddCus,
            OpenReg: OpenReg,
            OpenSus: OpenSus,
            OpenPayment: OpenPayment,
        }

    }
</script>

<style scoped>
    .bold_head{
        color:red;
        font-weight:bold;
    }
    .headup{
        color:white;
        font-weight:bold;
        background:#292929;
    }
    .enchill{
        border-radius:15px;
    }

</style>