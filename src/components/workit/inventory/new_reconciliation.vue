<template>
    <div>
        <v-dialog v-model="load_dialog" persistent max-width="300px">
            <v-card>
                <v-toolbar >
                    <v-toolbar-title class="primary--text">Pull Stock </v-toolbar-title>

                    <v-spacer></v-spacer>


                    <v-btn icon @click.native="load_dialog = false">
                        <v-icon color="secondary">mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-container>
                        <v-layout wrap>
                            <v-flex xs12 sm12 md12>
                                <v-text-field box v-model="pull.min" label="min (0)"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                                <v-text-field box v-model="pull.max" label="max (500)"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="secondary" @click="loadProducts">Load Stock</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>



        <v-dialog v-model="dialog" persistent max-width="900px">
            <v-card>
                <v-toolbar >
                    <v-toolbar-title class="primary--text">Edit Product <v-btn flat color="secondary">{{editedItem.product_name}} #{{editedItem.id}}</v-btn></v-toolbar-title>

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
                                        required
                                        offset-y
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                        box
                                        label="Manufacturer"
                                        v-model="editedItem.manufacturer"
                                        required
                                        data-vv-name="manufacturer"
                                        :error-messages="errors.collect('manufacturer')"
                                        v-validate="'required'"
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
                                        data-vv-name="min_no"
                                        :error-messages="errors.collect('min_no')"
                                        v-validate="'numeric|required'"
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
                                        data-vv-name="reorder"
                                        :error-messages="errors.collect('reorder')"
                                        v-validate="'numeric|required'"
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
                                        data-vv-name="max_no"
                                        :error-messages="errors.collect('max_no')"
                                        v-validate="'numeric|required'"
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
                                        data-vv-name="ws_unit"
                                        :error-messages="errors.collect('ws_unit')"
                                        v-validate="'required'"
                                ></v-select>
                            </v-flex>
                            <v-flex xs4 sm2 md2>
                                <v-text-field
                                        label="Quantity"
                                        box
                                        type="number"
                                        v-model="editedItem.ws_quantity"
                                        data-vv-name="ws_quantity"
                                        :error-messages="errors.collect('ws_quantity')"
                                        v-validate="'numeric|required'"
                                >

                                </v-text-field>
                            </v-flex>
                            <v-flex xs4 sm3 md3>
                                <v-text-field
                                        :label="unit_cost"
                                        box
                                        type="number"
                                        v-model="editedItem.ws_unit_cost"
                                        data-vv-name="ws_cost"
                                        :error-messages="errors.collect('ws_cost')"
                                        v-validate="'decimal|required'"
                                >

                                </v-text-field>
                            </v-flex>
                            <v-flex xs4 sm2 md2>
                                <v-text-field
                                        label="Discount"
                                        box
                                        suffix="%"
                                        v-model="editedItem.ws_discount"
                                        data-vv-name="ws_discount"
                                        :error-messages="errors.collect('ws_discount')"
                                        v-validate="'numeric|required'"
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
                                        data-vv-name="ws_subtotal"
                                        :error-messages="errors.collect('ws_subtotal')"
                                        v-validate="'decimal|required'"
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
                                        data-vv-name="rt_unit"
                                        :error-messages="errors.collect('rt_unit')"
                                        v-validate="'required'"
                                ></v-select>
                            </v-flex>
                            <v-flex xs4 sm3 md3>
                                <v-text-field
                                        label="Pack Size"
                                        box
                                        v-model="editedItem.rt_pack_size"
                                        type="number"
                                        data-vv-name="rt_pack_size"
                                        :error-messages="errors.collect('rt_pack_size')"
                                        v-validate="'numeric|required'"
                                >

                                </v-text-field>
                            </v-flex>
                            <v-flex xs4 sm3 md3>
                                <v-text-field
                                        label="Retail QTY"
                                        box
                                        type="number"
                                        readonly
                                        v-model="editedItem.rt_quantity"
                                        data-vv-name="rt_quantity"
                                        :error-messages="errors.collect('rt_quantity')"
                                        v-validate="'numeric|required'"
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
                                        v-validate="'decimal:2|required'"
                                >

                                </v-text-field>
                            </v-flex>

                            <v-flex xs4 sm3 md3>
                                <v-text-field
                                        label="Markup"
                                        box
                                        v-model="editedItem.markup"
                                        type="number"
                                        data-vv-name="markup"
                                        :error-messages="errors.collect('markup')"
                                        v-validate="'decimal|required'"
                                >

                                </v-text-field>
                            </v-flex>

                            <v-flex xs4 sm3 md3>
                                <v-text-field
                                        label="Selling Price"
                                        box
                                        v-model="editedItem.selling_price"
                                        type="number"
                                        data-vv-name="selling_price"
                                        :error-messages="errors.collect('selling_price')"
                                        v-validate="'decimal:2|required'"
                                >

                                </v-text-field>
                            </v-flex>

                            <v-flex xs4 sm3 md3>
                                <v-text-field
                                        label="Subtotal"
                                        box
                                        v-model="editedItem.subtotal"
                                        type="number"
                                        data-vv-name="subtotal"
                                        :error-messages="errors.collect('subtotal')"
                                        v-validate="'decimal:2|required'"
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
                                label="Select Outlet"
                                solo
                        ></v-select>

                    </v-flex>
                    <v-flex sm4 class="ml-4">
                        <v-alert
                                :value="true"
                                color="grey"
                                dense
                                icon="refresh"
                                class="pa-1"
                        >
                            <span>New Reconciliation started</span><br />
                            <span>[3 Products adjusted]</span>
                            <v-btn class="cry green darken-3" dark small><v-icon left>mdi-content-save</v-icon>Save</v-btn>
                            <v-btn class="cry1 green darken-3" dark small><v-icon left>mdi-content-save</v-icon>Draft</v-btn>
                        </v-alert>

                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex sm5>
                        <v-btn color="red darken-3" @click="open_load" dark class="mb-2"><v-icon left>mdi-download</v-icon> Load Stock</v-btn>
                        <!--<v-btn color="grey darken-3" dark class="mb-2"><v-icon left>mdi-file</v-icon>Draft</v-btn>-->
                        <!--<v-btn color="green darken-3" dark class="mb-2"><v-icon left>mdi-content-save</v-icon>Save</v-btn>-->
                    </v-flex>


                </v-layout>

                <!--<v-layout row align-center style="max-width: 150px">-->

                <!--</v-layout>-->
            </v-toolbar>
        </v-card>



        <v-card class="thead">
            <v-card-title>
                <v-btn icon color="primary" @click="$router.go(-1)" small><v-icon>mdi-arrow-left-thick</v-icon></v-btn>
                <p class="headline ttext mt-3">Loaded Products[ <i class="green--text text--darken-3">{{total}}</i> ] @ <i class="green--text text--darken-3">{{outlet}}</i></p>
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search loaded products."
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
                    <td>{{ props.item.o_quantity }}</td>
                    <td>{{ props.item.c_quantity }}</td>
                    <td>{{ props.item.selling_price }}</td>
                    <td>{{ props.item.rt_unit_cost }}</td>
                    <td>{{ props.item.expiry }}</td>
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
                outlet:'Warehouse',
                loading: false,
                fetchup:false,
                load_dialog:false,
                loader:false,
                items: [],
                dialog:false,
                pull:{
                  min:'',
                  max:''
                },
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
                    { text: 'Open Quantity',class:'subheading', value: 'o_quantity' },
                    { text: 'Closing Quantity',class:'subheading', value: 'c_quantity' },
                    { text: 'S-Price(Ghc)',class:'subheading', value: 'selling_price' },
                    { text: 'C-Price(Ghc)', value: 'rt_unit_cost',class:'subheading' },
                    { text: 'Expiry', value: 'expiry',class:'subheading' },
                    { text: '', value: 'name', align: 'centre', sortable: false }

                ],
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
                date:'',
                menu:false,
                side_items:[
                ],
            }
        },
        computed:{
            apiSet(){
                return this.$store.getters.getApi
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
            },
            ws_quan(){
                this.rtCostComp();
                this.costComp();
                this.rtComp();
                this.markupComp();
                this.sellComp();
            },
            rt_pack(){
                this.rtCostComp();

            },
            rt_quan(){
                this.rtCostComp();
                this.markupComp();
                this.sellComp();
            },

            mark_up(){
                this.markupComp();
            },
            rt_selling(){
                this.sellComp();
            }
        },
        mounted(){
            this.setSide();
            // this.loadProducts();

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
            open_load(){
                this.load_dialog = true;
            },
            rtComp(){
                this.new_product.rt_quantity = (this.new_product.ws_quantity * this.new_product.rt_pack_size);
            },
            markupComp(){
                let mark = 0;
                mark = this.editedItem.rt_unit_cost * this.editedItem.markup;
                this.editedItem.selling_price = mark.toFixed(2);
                this.editedItem.subtotal = mark * this.editedItem.rt_quantity;
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
                this.editedItem.markup = mark.toFixed(2);
                this.editedItem.subtotal = (this.editedItem.selling_price * this.editedItem.rt_quantity).toFixed(2);
            },
            setSide(){

                this.$store.commit('setSideItems',this.side_items);
                this.$store.commit('setDrawer',false);
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
            loadProducts(){
                let self = this;
                this.fetchup = true;
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
                                o_quantity:obj[key].ws_quantity+' ('+obj[key].ws_unit+') / '+obj[key].rt_quantity+' ('+obj[key].rt_unit+')',
                                c_quantity:0,
                                rt_unit_cost:obj[key].rt_unit_cost,
                                selling_price:obj[key].selling_price,
                                expiry:obj[key].expiry,
                            })
                        }
                        self.inventory = prod_show;
                        self.raw_inventory = obj;
                        self.total = prod_show.length;
                        self.fetchup = false;
                        self.load_dialog = false;
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

                // axios.delete(apiUrl+'/product/'+item.id)
                //     .then(function(response){
                //         console.log(response);
                //         self.del_snackbar = true;
                //         self.loadProducts();
                //         self.$store.commit('setNetError',false);
                //
                //     }).catch(function(error){
                //     self.del_error_snack = true;
                //     self.$store.commit('setNetError',true);
                //     console.log(error);
                // })
            },








        }
    }
</script>

<style lang="scss" scoped>
    .cry{
        position:absolute;
        left:250px;
        bottom:7px;
    }
    .cry1{
        position:absolute;
        left:550px;
        bottom:7px;
    }
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