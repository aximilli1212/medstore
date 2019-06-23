<template>
    <div>
        <v-dialog v-model="dialog" persistent max-width="900px">
            <v-card>
                <v-toolbar >
                    <v-toolbar-title class="primary--text">Add Product <v-btn flat color="secondary">{{editedItem.product_name}} #{{editedItem.id}}</v-btn></v-toolbar-title>

                    <v-spacer></v-spacer>


                    <v-btn icon @click.native="dialog = false">
                        <v-icon color="secondary">mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    Product Info
                    <v-container grid-list-md elevation-6 class="mb-4">
                        <v-layout wrap>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                        box
                                        label="Product name"
                                        v-model="editedItem.product_name"
                                        required
                                        data-vv-name="name"
                                        v-validate="'required'"
                                        :error-messages="errors.collect('name')"

                                >

                                </v-text-field>
                            </v-flex>

                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                        box
                                        v-model="editedItem.category"
                                        label="Category"
                                        disabled
                                        hint="Category is pre-defined"
                                        persistent-hint
                                        offset-y
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                        box
                                        label="Manufacturer"
                                        v-model="editedItem.manufacturer"
                                >

                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                        box
                                        label="Expiry"
                                        v-model="editedItem.expiry"
                                        required
                                        data-vv-name="expiry"
                                        :error-messages="errors.collect('expiry')"
                                        v-validate="'required|date_format:DD/MM/YYYY'"
                                >

                                </v-text-field>
                            </v-flex>
                            <!--nii here atfter-->
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                        box
                                        label="BarCode"
                                        v-model="editedItem.barcode"
                                        hint="If present on product"
                                        persistent-hint
                                >

                                </v-text-field>
                            </v-flex> <v-flex xs12 sm6 md4>
                            <v-btn color="secondary"><v-icon left>mdi-barcode</v-icon> Generate Barcode</v-btn>
                        </v-flex>

                            <v-flex xs12 sm6 md3>
                                <v-text-field
                                        box
                                        label="Batch No."
                                        v-model="editedItem.batch_no"
                                        type="number"

                                >

                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md3>
                                <v-text-field
                                        box
                                        label="Min No."
                                        v-model="editedItem.min_no"
                                        required
                                        type="number"

                                >

                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md3>
                                <v-text-field
                                        box
                                        label="Re-order No."
                                        v-model="editedItem.reorder_no"
                                        required
                                        type="number"
                                >

                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md3>
                                <v-text-field
                                        box
                                        label="Max No."
                                        v-model="editedItem.max_no"
                                        required
                                        type="number"

                                >

                                </v-text-field>
                            </v-flex>

                        </v-layout>
                    </v-container>



                          Wholesale Pricing
                        <v-container  grid-list-md class="mb-4" elevation-6>
                            <v-layout wrap>
                                <v-flex xs12 sm3 md3>
                                    <v-select
                                            :items="packList"
                                            box
                                            v-model="editedItem.ws_unit"
                                            label="Wholesale Unit"
                                            hint="Eg. Pack"
                                            persistent-hint
                                            required
                                            offset-y
                                    ></v-select>
                                </v-flex>
                                <v-flex xs4 sm2 md2>
                                    <v-text-field
                                            label="Quantity"
                                            box
                                            type="number"
                                            v-model="editedItem.ws_quantity"
                                    >

                                    </v-text-field>
                                </v-flex>
                                <v-flex xs4 sm3 md3>
                                    <v-text-field
                                            :label="unit_cost"
                                            box
                                            type="number"
                                            v-model="editedItem.ws_unit_cost"
                                    >

                                    </v-text-field>
                                </v-flex>
                                <v-flex xs4 sm2 md2>
                                    <v-text-field
                                            label="Discount"
                                            box
                                            suffix="%"
                                            v-model="editedItem.ws_discount"
                                    >

                                    </v-text-field>
                                </v-flex>


                              <v-flex xs4 sm2 md2>
                                    <v-text-field
                                            label="SubTotal(GH¢)"
                                            box
                                            readonly
                                            v-model="editedItem.ws_subtotal"
                                            type="number"
                                    >

                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    Retail Pricing
                        <v-container  grid-list-md elevation-6>
                            <v-layout wrap>
                                <v-flex xs12 sm3 md3>
                                    <v-select
                                            :items="packList"
                                            box
                                            v-model="editedItem.rt_unit"
                                            label="Retail Unit"
                                            hint="Eg. Pack"
                                            persistent-hint
                                            required
                                            offset-y
                                    ></v-select>
                                </v-flex>
                                <v-flex xs4 sm3 md3>
                                    <v-text-field
                                            label="Pack Size"
                                            box
                                            v-model="editedItem.rt_pack_size"
                                            type="number"

                                    >

                                    </v-text-field>
                                </v-flex>
                                <v-flex xs4 sm3 md3>
                                    <v-text-field
                                            label="Retail QTY"
                                            box
                                            type="number"
                                            v-model="editedItem.rt_quantity"
                                    >

                                    </v-text-field>
                                </v-flex>
                                <v-flex xs4 sm3 md3>
                                    <v-text-field
                                            :label="runit_cost"
                                            box
                                            type="number"
                                            v-model="editedItem.rt_unit_cost"
                                            data-vv-name="rt_cost"
                                            readonly
                                            :error-messages="errors.collect('rt_cost')"
                                            v-validate="'decimal:4|required'"
                                    >

                                </v-text-field>
                            </v-flex>

                            <v-flex xs4 sm3 md3>
                                <v-text-field
                                        label="Markup"
                                        box
                                        v-model="editedItem.markup"
                                        type="number"
                                >

                                </v-text-field>
                            </v-flex>

                            <v-flex xs4 sm3 md3>
                                <v-text-field
                                        label="Selling Price"
                                        box
                                        v-model="editedItem.selling_price"
                                        type="number"
                                >

                                </v-text-field>
                            </v-flex>

                            <v-flex xs4 sm3 md3>
                                <v-text-field
                                        label="Subtotal"
                                        box
                                        v-model="editedItem.subtotal"
                                        type="number"
                                >

                                </v-text-field>
                            </v-flex>



                        </v-layout>
                    </v-container>


                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="grey darken-1" @click.native="dialog = false">Close</v-btn>
                    <v-btn
                            color="secondary darken-1"
                            @click="updateProduct"
                            :loading="loader"
                            :disabled="loader"


                    >
                        <v-icon left>mdi-library-plus
                        </v-icon>Update Product</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!----------------------------------Update Product Dialog Ends Here---------------------------------------------->

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
                        <v-select
                                v-model="outlet"
                                offset-y
                                class="mt-2"
                                :items="outlets"
                                item-text="outlet_name"
                                item-value="id"
                                label="Select Outlet"
                                solo
                                return-object
                        ></v-select>

                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex sm9>
                        <set-product>

                        </set-product>
                    </v-flex>


                </v-layout>

                <!--<v-layout row align-center style="max-width: 150px">-->

                <!--</v-layout>-->
            </v-toolbar>
        </v-card>



        <v-card class="thead">
            <v-card-title>
                <v-btn icon color="primary" @click="$router.go(-1)" small><v-icon>mdi-arrow-left-thick</v-icon></v-btn>
                <p class="headline ttext mt-3">All Products[ <i class="green--text text--darken-3">{{total}}</i> ] @ <i class="green--text text--darken-3">{{outlet.outlet_name}}</i></p>
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
                    :headers="inv_head"
                    :items="inventory"
                    :search="search"
                    :loading="fetchup"
                    class class="elevation-5"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.product_name }}</td>
                    <td>{{ props.item.quantity }}</td>
                    <td>{{ props.item.selling_price }}</td>
                    <td>{{ props.item.rt_unit_cost }}</td>
                    <td>{{ props.item.expiry }}</td>
                    <td>{{ moment(props.item.created_at).format('MMMM Do YYYY, h:mm a') }}</td>
                    <td>{{ moment(props.item.updated_at).format('MMMM Do YYYY, h:mm a') }}</td>
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
        <v-snackbar
                :timeout="6000"
                :bottom="true"
                :right="x === 'right'"
                v-model="dict_load"
                color="primary"
        >
            Product Dictionary Successfully loaded.
            <v-btn flat color="secondary" @click.native=" dict_load = false">Close</v-btn>
        </v-snackbar>


        <simplert :useRadius="true"
                  :useIcon="true"
                  ref="simplert">
        </simplert>
    </div>
</template>

<script>
    let axios = require("axios");
    import { eventBus } from '../../../main.js';
    export default {
        name: "add_products",
        data(){
            return{
                dict_load:false,
                er_snackbar:false,
                del_snackbar:false,
                del_error_snack:false,
                form_error_snack:false,
                su_snackbar:false,
                ed_snackbar:false,
                outlet:{outlet_name:'Warehouse',id:2},
                outlets:[],
                loading: false,
                fetchup:false,
                loader:false,
                items: [],
                dialog:false,
                total:'',
                search: null,
                searchup: null,
                select: null,
                states: [
                    {name:'Toilet Rolls',icon:'mdi-chart-bubble',category:'Toiletries'},
                ],
                inv_head:[
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
                    { text: 'Created at', value: 'created_at',class:'subheading' },
                    { text: 'Last Updated', value: 'updated_at',class:'subheading' },
                    { text: '', value: 'name', align: 'centre', sortable: false }

                ],
                inventory:[],
                or_inventory:[],
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
                date:'',
                menu:false,
                side_items:[
                    { icon: 'mdi-plus', text: 'Add Products',link:'/add_products' },
                    { icon: 'mdi-dictionary', text: 'Product Dictionary',link:'/product_dictionary' },
                    { icon: 'mdi-bullseye', text: 'Categories',link:'/categories' },
                    // { icon: 'mdi-map', text: 'Purchased Products',link:'/product_dictionary' },
                    // { icon: 'mdi-autorenew', text: 'Transfered Products',link:'/product_dictionary' }
                ],
            }
        },
        computed:{
            apiSet(){
                return this.$store.getters.getApi
            },
            outUs(){
                return this.outlet.id;
            },
            packList(){
                let catSet =  this.$store.getters.getPackUnits;
                let exSet = [];

                for (let key = 0, len = catSet.length; key < len; key++) {
                    exSet.push(catSet[key].pack_name);

                }

                return exSet;
            },
            unit_cost(){
                return this.editedItem.ws_unit+" Cost(Ghc)";
            },
            runit_cost(){
                return this.editedItem.rt_unit+" Cost(Ghc)";
            },
            ws_sub(){
                return this.editedItem.ws_subtotal;
            },
            ws_dis(){
                return this.editedItem.ws_discount;
            },
            ws_cost(){
                return this.editedItem.ws_unit_cost;
            },
            ws_quan(){
                return this.editedItem.ws_quantity;
            },
            rt_pack(){
                return this.editedItem.rt_pack_size;
            },
            rt_quan(){
                return this.editedItem.rt_quantity;
            },

            mark_up(){
                return this.editedItem.markup;
            },
            rt_selling(){
                return this.editedItem.selling_price;
            },

        },
        watch:{
            search (val) {
                val && val !== this.select && this.querySelections(val)
            },
            ws_sub(){
                this.costComp();
            },
            ws_dis(){
                this.costComp();
            },
            ws_cost(){
                this.costComp();
                this.rtCostComp();
                // this.markupComp();
                this.sellComp();
            },
            ws_quan(){
                this.rtCostComp();
                this.costComp();
                this.rtComp();
                // this.markupComp();
                this.sellComp();
            },
            rt_pack(){
                this.rtCostComp();

            },
            rt_quan(){
                this.rtCostComp();
                // this.markupComp();
                this.sellComp();
            },

            mark_up(val){
                this.markupComp(val);
                this.sellComp();

            },
            rt_selling(){
                this.sellComp();
                this.wsUnitCostComp();

            },
            outUs(val){
                this.$store.commit('setPout',val);
                let self = this;

                const original = this.or_inventory;
                this.inventory = _.filter(original, function(o) { return o.outlet_id === val; });
                this.total = this.inventory.length;
            }
        },
        mounted(){
            this.setSide();
            this.loadProducts();
            // this.$store.dispatch('loadProducts');
            this.getOut();

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
            eventBus.$on('dict_load',(data)=>{
                this.dict_load = data;
            });
            eventBus.$on('product_add',(data)=>{
                this.loadProducts();
            });

        },
        methods:{
            rtComp(){
                this.new_product.rt_quantity = (this.new_product.ws_quantity * this.new_product.rt_pack_size);
            },
            wsUnitCostComp(){
                this.editedItem.ws_unit_cost = parseFloat(this.editedItem.selling_price) / parseFloat(this.editedItem.markup);
                // this.editedItem.ws_unit_cost = 6787;

                console.log(this.editedItem.ws_unit_cost);

            },
    markupComp(val){
        if(val <= 0){
            this.new_product.markup = 1;
            return false;
        }else {
            let mark = 0;
            mark = this.editedItem.rt_unit_cost * this.editedItem.markup;
            this.editedItem.selling_price = mark.toFixed(2);
            this.editedItem.subtotal = mark * this.editedItem.rt_quantity;
        }
            },
            costComp(){

                let ws_sub = 0;
                let sub = this.editedItem.ws_quantity * this.editedItem.ws_unit_cost;
                if(this.editedItem.ws_discount){

                    ws_sub = sub * (1-(this.editedItem.ws_discount * 0.01));

                }
                else{

                    ws_sub = sub.toFixed(2);
                }

                this.editedItem.ws_subtotal = ws_sub;

            },
            rtCostComp(){

                let rt_cost = 0;
                let rt_quan = this.editedItem.rt_pack_size * this.editedItem.ws_quantity;
                this.editedItem.rt_quantity = rt_quan;


                if(rt_quan){
                    rt_cost = this.editedItem.ws_subtotal/rt_quan;
                }
                else{

                }

                this.editedItem.rt_unit_cost = rt_cost.toFixed(2);
            },
            sellComp(){
                let mark = 0;
                mark = this.editedItem.selling_price / this.editedItem.rt_unit_cost;
                // this.editedItem.markup = mark.toFixed(2);
                this.editedItem.subtotal = (this.editedItem.selling_price * this.editedItem.rt_quantity).toFixed(2);
            },
            setSide(){

                this.$store.commit('setSideItems',this.side_items);
                this.$store.commit('setDrawer',true);
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
            getOut(){
                this.$store.dispatch('loadOutlets');
                this.outList();
            },
            outList(){
                let outSet =  this.$store.getters.getOutlets;
                let exSet = [];
                let out_set = {};

                out_set = {outlet_name: this.userData.outlet_name,id:this.userData.outlet_id};

                for (let key = 0, len = outSet.length; key < len; key++) {
                    exSet.push({outlet_name: outSet[key].outlet_name,id:outSet[key].id});
                }

                this.outlets =  exSet;
            },


            loadProducts(){
                let self = this;
                this.fetchup = true;
                let postData={
                    oid:this.userData.outlet_id,
                    cid:this.userData.company_id,
                };

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
                                quantity:obj[key].ws_quantity+' ('+obj[key].ws_unit+') / '+obj[key].rt_quantity+' ('+obj[key].rt_unit+')',
                                rt_unit_cost:obj[key].rt_unit_cost,
                                selling_price:obj[key].selling_price,
                                expiry:obj[key].expiry,
                                outlet_id:obj[key].outlet_id,
                                created_at:obj[key].created_at,
                                updated_at:obj[key].updated_at,
                            })
                        }

                        self.or_inventory = prod_show;
                        self.inventory = prod_show;
                        // self.inventory = _.filter(prod_show, function(o) { return o.outlet_id === self.outlet.id; });

                        self.raw_inventory = obj;
                        self.total = self.inventory.length;
                        self.fetchup = false;
                        // self.$store.commit('setDic',dict);

                    }).catch(
                    e => {
                        console.log(e);
                        self.loader = false;

                        this.err.push(e);
                    }
                )
            },


            editItem (item) {
                this.loadProducts();
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
                            self.$store.commit('setNetError',true);

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
                    title: 'Delete Product',
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