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
                                        label="Expiry(dd/mm/yyyy)"
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
                                        required
                                        data-vv-name="barcode"
                                        :error-messages="errors.collect('barcode')"
                                        hint="If present on product"
                                        v-validate="'required'"
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
                                        required
                                        type="number"
                                        data-vv-name="batch_no"
                                        :error-messages="errors.collect('batch_no')"
                                        v-validate="'numeric|required'"

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

                    <v-toolbar class="mb-2">
                        <v-flex sm3 md3 class="ml-2">
                            <span class="subheading secondary--text">Purchase Quantity:</span>
                        </v-flex>
                        <v-flex xs4 sm4 md4 class="pt-2">
                            <v-text-field

                                    label="Purchase Quantity"
                                    box
                                    type="number"
                                    v-model="editedItem.purr_quantity"
                            >

                            </v-text-field>
                        </v-flex>


                    </v-toolbar>




                    Wholesale Pricing
                    <v-container  grid-list-md class="mb-4" elevation-6>
                        <v-layout wrap>
                            <v-flex xs12 sm3 md3>
                                <v-select
                                        :items="[ 'Pack', 'Box', 'Carton']"
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

                            <v-flex xs4 sm2 md2>
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


                            <v-flex xs4 sm3 md3>
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
                                        :items="[ 'Pack', 'Box', 'Carton']"
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
                                        v-validate="'decimal:2|required'"
                                >

                                </v-text-field>
                            </v-flex>

                            <v-flex xs4 sm3 md3>
                                <v-text-field
                                        label="Selling Price"
                                        box
                                        readonly
                                        v-model="editedItem.selling_price"
                                        type="number"
                                        data-vv-name="selling_price"
                                        :error-messages="errors.collect('selling_price')"
                                        v-validate="'decimal|required'"
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
                                        v-validate="'decimal|required'"
                                        readonly
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

        <v-card color="primary pa-2 round_end">
            <div  class="white--text">Please Enter Reorder Details</div>

            <v-layout row align-center>
                <v-flex sm3>

                    <v-select
                            color="secondary"
                            prepend-icon="mdi-arrow-right"
                            v-model="reorder_det.source"
                            offset-y
                            class="mt-2"
                            :items="outlet_set"
                            item-text="outlet_name"
                            item-value="id"
                            label="Select Source"
                            solo
                            return-object
                    ></v-select>

                </v-flex>
                <v-divider vertical class="ml-2"></v-divider>
                <v-flex sm3>

                    <v-select
                            color="secondary"
                            prepend-icon="mdi-arrow-right"
                            v-model="reorder_det.destination"
                            offset-y
                            class="mt-2"
                            :items="outlet_set"
                            item-text="outlet_name"
                            item-value="id"
                            label="Select Destination"
                            solo
                            return-object
                    ></v-select>

                </v-flex>
                <v-spacer></v-spacer>
                <v-flex>


                    <v-tooltip
                            top
                    >
                        <v-btn   slot="activator"  dark  color="orange darken-3" class="mb-4" :loader="loader" :disable="loader" @click="pullMin"><v-icon left>mdi-arrow-collapse</v-icon>Auto Request</v-btn>
                        <span>click to retrieve all minimum quantity products.</span>
                    </v-tooltip>
                </v-flex>
                <v-flex>
                    <v-tooltip top>
                        <v-btn slot="activator" dark  color="grey darken-3" class="mb-4" :loader="loader" :disable="loader" @click="testSnack"><v-icon left>mdi-arrow-down</v-icon>Pull Minimum </v-btn>
                        <span>Click to pull all products that have minimum quantities.</span>
                    </v-tooltip>
                </v-flex>

            </v-layout>
            <v-layout>

                <v-flex sm8 md8>
                    <set-reorder>

                    </set-reorder>
                </v-flex>
                <v-flex sm2 md2>
                    <v-btn outline color="grey" @click="resetPurchase"><v-icon left>mdi-refresh</v-icon>Reset</v-btn>
                </v-flex>
                <v-flex sm2 md2>
                    <v-btn dark color="secondary" @click="$router.push('/reorder_view')"><v-icon left>mdi-view-carousel</v-icon>Preview</v-btn>
                </v-flex>
                <v-flex sm2 md2>
                    <v-btn dark  color="green darken-3" :loader="loader" :disable="loader" @click="submitPurchase"><v-icon left>mdi-redo-variant</v-icon>Send Reorder</v-btn>
                </v-flex>




            </v-layout>
        </v-card>



        <v-card class="thead">
            <v-card-title>
                <v-btn icon color="primary" @click="$router.go(-1)" small><v-icon>mdi-arrow-left-thick</v-icon></v-btn>
                <p class="headline ttext mt-3">Reorder[ <i class="green--text text--darken-3">{{getNewPurchase.length}}</i> ]
                    <small>
                        from <i class="green--text text--darken-3">{{reorder_det.source.outlet_name}}</i>
                        to <i class="green--text text--darken-3">{{reorder_det.destination.outlet_name}}</i>
                    </small>

                    <!--<i class="headline ml-4"> -->
                    <!--Total Cost:-->
                    <!--<span class="green&#45;&#45;text text&#45;&#45;darken-3">-->
                    <!--GH¢ {{purrSub}}-->
                    <!--</span></i>-->

                </p>
                <v-spacer></v-spacer>
                <v-text-field
                        :class="{ pulse: search }"
                        v-model="search"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                        outline
                        clearable
                ></v-text-field>
            </v-card-title>
            <v-data-table
                    :headers="purchase_head"
                    :items="getNewPurchase"
                    :search="search"
                    :loading="fetchup"
                    class class="elevation-5"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.product_name }}</td>
                    <td>{{ props.item.batch_no }}</td>
                    <td>{{ props.item.purchase_qty }}</td>
                    <td>{{ props.item.purchase_cost }}</td>
                    <td>{{ props.item.purchase_selling }}</td>
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
                v-model="snack"
                :color="snackColor"
        >
            {{snackText}}
            <v-btn flat color="secondary" @click.native="snack = false">Close</v-btn>
        </v-snackbar>

        <simplert :useRadius="true"
                  :useIcon="true"
                  ref="simplert">
        </simplert>
    </div>
</template>

<script>
    let axios = require("axios");
    import moment from 'moment';
    export default {
        name: "inv_transfer",
        data(){
            return{
                due:false,
                snack:false,
                snackText:'',
                snackColor:'green',
                outlet:{outlet_name:'Warehouse',id:1},
                outlet_set:[],
                supplier:'Unknown',
                loading: false,
                fetchup:false,
                loader:false,
                items: [],
                dialog:false,
                inv_dialog:false,
                total:'',
                search: null,
                searchup: null,
                select: null,
                outlet_name:'',
                states: [
                    {name:'Toilet Rolls',icon:'mdi-chart-bubble',category:'Toiletries'},
                ],
                reorder_det:{
                    source:'',
                    destination:'',
                    reorder_date: new Date(),
                    status: 0,
                },
                purchase_head:[
                    {
                        text: 'Id',
                        align: 'left',
                        value: 'id',
                    },
                    { text: 'Product', value: 'product_name',sortable:false },
                    { text: 'Batch No.', value: 'batch_no' },
                    { text: 'Reorder Quantity', value: 'reorder_qty' },
                    { text: 'C-Price(Ghc)', value: 'purchase_cost'},
                    { text: 'S-Price(Ghc)', value: 'purchase_selling'},
                    { text: 'Expiry', value: 'expiry'},
                    { text: '', value: 'name', align: 'centre', sortable: false }

                ],
                new_purchase:[],
                raw_inventory:[],
                editedIndex: -1,
                editedItem: {
                    id:'1',
                    product_name:'1',
                    category:'1',
                    manufacturer:'1',
                    expiry:'02/02/2001',
                    product_type:'1',
                    ws_quantity:'1',
                    rt_quantity:'1',
                    barcode:'1',
                    rt_unit:'1',
                    ws_unit:'1',
                    ws_discount:0,
                    rt_discount:0,
                    ws_unit_cost:'1',
                    rt_unit_cost:'1',
                    markup:'1',
                    selling_price:'1',
                    subtotal:'1',
                    min_no:'1',
                    batch_no:'1',
                    max_no:'1',
                    rt_pack_size:'3',
                    ws_subtotal:'80',
                    reorder_no:'1',
                    carriage:'1',
                    vat:'1',
                    sup_invoice:'1',
                    payment_mode:'1',
                    sup_discount:0,

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
                purrSet:0,
                side_items:[
                    // { icon: 'mdi-chart-bubble', text: 'Purchases',link:'/purchases' },
                    { icon: 'mdi-cart', text: 'Reorders',link:'/requisitions' },

                ],
            }
        },
        computed:{
            purOut(){
                return this.purchase_det.outlet;
            },
            // purrSub(){
            //      if(this.purrSet){
            //          let purr = this.prodData;
            //          return Object.values(purr).reduce((t, n) => t + parseFloat(n.ws_subtotal), 0);
            //      }
            //      else{
            //          return 0;
            //      }
            //           },
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

            apiSet(){
                return this.$store.getters.getApi
            },
            unit_cost(){
                return this.editedItem.ws_unit+" Cost(Ghc)";
            },
            runit_cost(){
                return this.editedItem.rt_unit+" Cost(Ghc)";
            },
            prodData(){
                return this.$store.getters.getNewPurchase;
            },

            getNewPurchase(){

                const dict=[];
                const obj =this.$store.getters.getNewPurchase;

                for (let key = 0, len = obj.length; key < len; key++) {
                    dict.push({
                        id:obj[key].id,
                        num:key,
                        product_name:obj[key].product_name,
                        batch_no:obj[key].batch_no,
                        purchase_qty:obj[key].purr_quantity+' ('+obj[key].ws_unit+') / '+obj[key].purr_rt_quantity+' ('+obj[key].rt_unit+')',
                        purchase_cost:obj[key].ws_unit_cost,
                        purchase_selling:obj[key].selling_price,
                        expiry:obj[key].expiry,
                    })
                }

                return dict;
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
            payMode(val){
                if(val === "Credit"){
                    this.due = true;
                }
                else{
                    this.due = false;
                }
            },
            ws_cost(){
                this.costComp();
                this.rtCostComp();
                this.markupComp();
                this.sellComp();
            },
            ws_quan(){
                this.costComp();
                this.markupComp();
                this.sellComp();
                this.rtCostComp();

            },
            rt_quan(){
                this.rtCostComp();
                this.markupComp();
                this.sellComp();
            },
            rt_pack(){
                this.rtCostComp();
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
            this.outList();
        },
        created(){

            this.resetPurchase();

        },
        methods:{
            testSnack(){
                this.$store.commit('setSnack',{t:"Yes Test Works",c:"red darken-3"});
            },
            outList(){
                let self = this;

                let fetch = '';
                let cid = this.$store.state.user_data.company_id;
                if( cid === 1){
                    fetch = this.$store.state.config.api.allOutlets;
                }
                else{
                    fetch = this.$store.state.config.api.companyOutlets+'/'+cid;
                }


                axios.get(fetch)
                    .then(response=>{
                        console.log(response.data.data);
                        let outSet =  response.data.data;
                        let exSet = [];
                        for (let key = 0, len = outSet.length; key < len; key++) {

                            // if(outSet[key].id > 1)
                            exSet.push({outlet_name: outSet[key].outlet_name,id:outSet[key].id});
                            // }
                        }

                        self.outlet_set =  exSet;
                    }).catch(
                    e => {
                        console.log(e);
                    }
                )


            },
            setSide(){

                this.$store.commit('setSideItems',this.side_items);
                this.$store.commit('setDrawer',true);
            },
            pullMin(){

            },
            loadSup(){
                let self = this;
                axios.get(this.apiSet.allSuppliers)
                    .then(response=>{
                        const sup = response.data.data;

                        self.$store.commit('setSup',sup);

                    }).catch(
                    e => {
                        console.log(e);

                    }
                )
            },

            addSup(){
                this.snack = true;
                this.snackColor = 'green';
                this.snackText= 'Reorder Sucessful';
            },
            markupComp(){
                let mark = 0;
                mark = this.editedItem.rt_unit_cost * this.editedItem.markup;
                this.editedItem.selling_price = mark;
                this.editedItem.subtotal = mark * this.editedItem.rt_quantity;
            },
            costComp(){

                let ws_sub = 0;
                let sub = this.editedItem.ws_quantity * this.editedItem.ws_unit_cost;
                if(this.editedItem.ws_discount){

                    ws_sub = sub * (1-(this.editedItem.ws_discount * 0.01));

                }
                else{

                    ws_sub = sub;
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
                this.editedItem.rt_unit_cost = rt_cost;
            },
            sellComp(){
                let mark = 0;
                mark = this.editedItem.selling_price / this.editedItem.rt_unit_cost;
                this.editedItem.markup = mark;
                this.editedItem.subtotal = this.editedItem.selling_price * this.editedItem.rt_quantity;
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

            editItem (item) {
                this.editedIndex = item.id;

                let raw = this.prodData.filter(e => {
                    return e.id === item.id;
                });


                console.log(raw[0]);
                this.editedItem =  raw[0];
                this.dialog = true;
            },

            submitPurchase(){

                this.$validator.validateAll().then((result)=>{
                    if(result){
                        this.loader=true;
                        let self = this;
                        this.purrSet = this.purrSub;
                        const p = this.prodData;
                        const r = this.reorder_det;

                        let total = Object.values(p).reduce((t, n) => t + parseInt(n.ws_subtotal), 0);

                        p.purchase_invoice = r.sup_invoice;
                        p.company_id= this.userData.company_id;
                        p.outlet_id= this.$store.getters.getPout;
                        r.company_id= this.userData.company_id;
                        r.outlet_id= this.userData.outlet_id;
                        r.outlet= this.$store.getters.getPout;
                        r.outlet_name= this.outlet_name;
                        r.reorder_invoice= new Date().toISOString();
                        r.sender = this.userData.user_name;
                        r.source = r.source.outlet_name;
                        r.s_id= r.source.id;
                        r.destination= r.destination.outlet_name;
                        r.d_id= r.destination.id;
                        r.no_items = p.length;


                        this.$store.commit('setPurchaseDet',r);

                        axios.post(this.apiSet.singleReorder, r)
                            .then(function (response) {
                                console.log(response);
                                self.loader = false;
                                self.$validator.reset();
                                self.$store.commit('setSnack',{t:"Reorder Successful ",c:"green darken-3"});

                            })
                            .catch(function (error) {
                                console.log(error);
                                self.$store.commit('setSnack',{t:"Sorry, Reorder Error ",c:"red darken-3"});

                                self.loader = false;
                            });

                        // Setting Product Purchase

                        for (let key = 0, len = p.length; key < len; key++) {

                            p[key].reorder_invoice = r.reorder_invoice;


                            // axios.post(this.apiSet.productPurchase, p[key])
                            axios.post(this.apiSet.reorderBuffer, p[key])
                                .then(function (response) {
                                    self.loader = false;
                                    self.$validator.reset();
                                    self.$store.commit('setSnack',{t:key+" Products Ordered. ",c:"green darken-3"});

                                })
                                .catch(function (error) {
                                    console.log(error);
                                    self.loader = false;

                                });
                        }
                        self.$router.push('/reorder_view');



                    }
                    else{
                        self.$store.commit('setSnack',{t:"Please fix form errors. ",c:"red darken-3"});
                        return false;
                    }
                });
            },
            updateProduct() {

                let self = this;
                this.loader = true;


                this.$validator.validateAll().then((result)=>{
                    if(result){


                        if (this.editedIndex > -1) {

                            let updateData = this.editedItem;
                            let upData = {...updateData,index:this.editedIndex}

                            this.$store.commit('editNewPurchase',upData);
                            this.loader = false;
                            self.ed_snackbar = true;
                            this.dialog = false;




                        } else {
                            self.err_snackbar = true;
                            this.loader=false;
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
            resetPurchase(){
                this.$store.commit('clearPurchase');

                this.reorder_det.source='';
                this.reorder_det.destination='';

            },

            deleteItem (item) {
                let self = this;
                // let confirmFn = this.del(item);

                let confirmFn = function() {
                    self.del(item);
                }

                let obj = {
                    title: 'Delete Product?',
                    message: 'Are you sure you want to Delete Product?',
                    type: 'warning',
                    useConfirmBtn: true,
                    onConfirm: confirmFn
                }
                this.$refs.simplert.openSimplert(obj);

            },

            del(item){
                this.$store.commit('delPurchase',item);
            },

        },
        components:{
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
    .round_end{
        border-radius:5px 5px 0px 0px;
    }
    .pulse {
        animation: opacityPulse 1s ease-out;
        animation-iteration-count: infinite;
        opacity: 0;
    }
    @-webkit-keyframes opacityPulse {
        0% {opacity: 0.0;}
        50% {opacity: 1.0;}
        100% {opacity: 0.0;}
    }


</style>