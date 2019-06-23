<template>
    <div>
        <v-dialog v-model="dialog" persistent max-width="900px">
            <v-card>
                <v-toolbar >
                    <v-toolbar-title class="primary--text">Reorder Product <v-btn flat color="secondary">{{select}} #{{new_product.id}}</v-btn></v-toolbar-title>

                    <v-spacer></v-spacer>


                    <v-btn icon @click.native="closeup">
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
                                        v-model="new_product.product_name"
                                        required
                                        readonly
                                        data-vv-name="name"
                                        v-validate="'required'"
                                        :error-messages="errors.collect('name')"
                                >

                                </v-text-field>
                            </v-flex>

                            <v-flex xs12 sm6 md4>
                                <v-text-field

                                        box
                                        v-model="new_product.category"
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
                                        v-model="new_product.manufacturer"
                                >

                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                        box
                                        label="Expiry(dd/mm/yyyy)"
                                        v-model="new_product.expiry"
                                        required
                                        data-vv-name="expiry"
                                :error-messages="errors.collect('expiry')"
                                v-validate="'required|date_format:DD/MM/YYYY'"
                                >

                                </v-text-field>
                            </v-flex>
                            <!--nii here atfter-->
                            <!---->
                            <!---->
                           <!--<v-flex xs12 sm6 md4>-->
                                <!--<v-text-field-->
                                        <!--box-->
                                        <!--label="BarCode"-->
                                        <!--v-model="new_product.barcode"-->
                                        <!--persistent-hint-->
                                <!--&gt;-->

                                <!--</v-text-field>-->
                            <!--</v-flex> <v-flex xs12 sm6 md4>-->
                                        <!--<v-btn color="secondary"><v-icon left>mdi-barcode</v-icon> Generate Barcode</v-btn>-->
                            <!--</v-flex>-->

                            <!--<v-flex xs12 sm6 md3>-->
                                <!--<v-text-field-->
                                        <!--box-->
                                        <!--label="Batch No."-->
                                        <!--v-model="new_product.batch_no"-->
                                        <!--required-->
                                        <!--type="number"-->

                                <!--&gt;-->

                                <!--</v-text-field>-->
                            <!--</v-flex>-->
                            <!--<v-flex xs12 sm6 md3>-->
                                <!--<v-text-field-->
                                        <!--box-->
                                        <!--label="Min No."-->
                                        <!--v-model="new_product.min_no"-->
                                        <!--required-->
                                        <!--type="number"-->
                                        <!--data-vv-name="min_no"-->
                                        <!--:error-messages="errors.collect('min_no')"-->
                                        <!--v-validate="'numeric|required'"-->
                                <!--&gt;-->

                                <!--</v-text-field>-->
                            <!--</v-flex>-->
                            <!--<v-flex xs12 sm6 md3>-->
                                <!--<v-text-field-->
                                        <!--box-->
                                        <!--label="Re-order No."-->
                                        <!--v-model="new_product.reorder_no"-->
                                        <!--required-->
                                        <!--type="number"-->
                                        <!--data-vv-name="reorder"-->
                                        <!--:error-messages="errors.collect('reorder')"-->
                                        <!--v-validate="'numeric|required'"-->
                                <!--&gt;-->

                                <!--</v-text-field>-->
                            <!--</v-flex>-->
                            <!--<v-flex xs12 sm6 md3>-->
                                <!--<v-text-field-->
                                        <!--box-->
                                        <!--label="Max No."-->
                                        <!--v-model="new_product.max_no"-->
                                        <!--required-->
                                        <!--type="number"-->
                                        <!--data-vv-name="max_no"-->
                                        <!--:error-messages="errors.collect('max_no')"-->
                                        <!--v-validate="'numeric|required'"-->
                                <!--&gt;-->

                                <!--</v-text-field>-->
                            <!--</v-flex>-->

                        </v-layout>
                    </v-container>




                    <v-toolbar class="mb-2">
                             <v-flex sm3 md3 class="ml-2">
                                 <span class="subheading secondary--text">Re-order Quantity:</span>
                             </v-flex>
                            <v-flex xs4 sm4 md4 class="pt-2">
                                <v-text-field
                                        label="Reorder Quantity"
                                        box
                                        type="number"
                                        v-model="new_product.purr_quantity"
                                        data-vv-name="ws_quantity"
                                        :error-messages="errors.collect('ws_quantity')"
                                        v-validate="'numeric|required'"
                                >

                                </v-text-field>
                            </v-flex>


                    </v-toolbar>

                    <!---->
                    <!--Wholesale Pricing-->

                    <!--<v-container  grid-list-md class="mb-4" elevation-6>-->

                            <!--<v-layout wrap>-->
                                <!--<v-flex xs12 sm3 md3>-->
                                    <!--<v-select-->
                                            <!--:items="packList"-->
                                            <!--box-->
                                            <!--v-model="new_product.ws_unit"-->
                                            <!--label="Wholesale Unit"-->
                                            <!--hint="Eg. Pack"-->
                                            <!--persistent-hint-->
                                            <!--required-->
                                            <!--offset-y-->
                                            <!--data-vv-name="ws_unit"-->
                                            <!--:error-messages="errors.collect('ws_unit')"-->
                                            <!--v-validate="'required'"-->
                                    <!--&gt;</v-select>-->
                                <!--</v-flex>-->

                                <!--<v-flex xs4 sm2 md2>-->
                                    <!--<v-text-field-->
                                            <!--label="Quantity"-->
                                            <!--box-->
                                            <!--type="number"-->
                                            <!--readonly-->
                                            <!--v-model="new_product.ws_quantity"-->
                                            <!--data-vv-name="ws_quantity"-->
                                            <!--:error-messages="errors.collect('ws_quantity')"-->
                                            <!--v-validate="'numeric|required'"-->
                                    <!--&gt;-->

                                    <!--</v-text-field>-->
                                <!--</v-flex>-->



                                <!--<v-flex xs4 sm2 md2>-->
                                    <!--<v-text-field-->
                                            <!--:label="unit_cost"-->
                                            <!--box-->
                                            <!--type="number"-->
                                            <!--v-model="new_product.ws_unit_cost"-->
                                            <!--data-vv-name="ws_cost"-->
                                            <!--:error-messages="errors.collect('ws_cost')"-->
                                            <!--v-validate="'decimal|required'"-->
                                    <!--&gt;-->

                                    <!--</v-text-field>-->
                                <!--</v-flex>-->
                                <!--<v-flex xs4 sm2 md2>-->
                                    <!--<v-text-field-->
                                            <!--label="Discount"-->
                                            <!--box-->
                                            <!--suffix="%"-->
                                            <!--v-model="new_product.ws_discount"-->
                                            <!--data-vv-name="ws_discount"-->
                                            <!--:error-messages="errors.collect('ws_discount')"-->
                                            <!--v-validate="'numeric|required'"-->
                                    <!--&gt;-->

                                    <!--</v-text-field>-->
                                <!--</v-flex>-->




                                <!--&lt;!&ndash;<v-flex xs4 sm3 md3>&ndash;&gt;-->
                                    <!--&lt;!&ndash;<v-text-field&ndash;&gt;-->
                                            <!--&lt;!&ndash;label="W/S Markup"&ndash;&gt;-->
                                            <!--&lt;!&ndash;box&ndash;&gt;-->
                                            <!--&lt;!&ndash;v-model="new_product.ws_markup"&ndash;&gt;-->
                                            <!--&lt;!&ndash;type="number"&ndash;&gt;-->
                                            <!--&lt;!&ndash;data-vv-name="ws_markup"&ndash;&gt;-->
                                            <!--&lt;!&ndash;:error-messages="errors.collect('ws_markup')"&ndash;&gt;-->
                                            <!--&lt;!&ndash;v-validate="'decimal|required'"&ndash;&gt;-->
                                    <!--&lt;!&ndash;&gt;&ndash;&gt;-->

                                    <!--&lt;!&ndash;</v-text-field>&ndash;&gt;-->
                                <!--&lt;!&ndash;</v-flex>&ndash;&gt;-->

                                <!--&lt;!&ndash;<v-flex xs4 sm3 md3>&ndash;&gt;-->
                                    <!--&lt;!&ndash;<v-text-field&ndash;&gt;-->
                                            <!--&lt;!&ndash;label="W/S Selling Price"&ndash;&gt;-->
                                            <!--&lt;!&ndash;box&ndash;&gt;-->
                                            <!--&lt;!&ndash;v-model="new_product.ws_selling_price"&ndash;&gt;-->
                                            <!--&lt;!&ndash;type="number"&ndash;&gt;-->
                                            <!--&lt;!&ndash;data-vv-name="ws_selling"&ndash;&gt;-->
                                            <!--&lt;!&ndash;:error-messages="errors.collect('ws_selling')"&ndash;&gt;-->
                                            <!--&lt;!&ndash;v-validate="'decimal|required'"&ndash;&gt;-->
                                    <!--&lt;!&ndash;&gt;&ndash;&gt;-->

                                    <!--&lt;!&ndash;</v-text-field>&ndash;&gt;-->
                                <!--&lt;!&ndash;</v-flex>&ndash;&gt;-->

                                <!--<v-flex xs4 sm3 md3>-->
                                    <!--<v-text-field-->
                                            <!--label="SubTotal(GH¢)"-->
                                            <!--box-->
                                            <!--readonly-->
                                            <!--v-model="new_product.ws_subtotal"-->
                                            <!--type="number"-->
                                            <!--data-vv-name="ws_subtotal"-->
                                            <!--:error-messages="errors.collect('ws_subtotal')"-->
                                            <!--v-validate="'decimal|required'"-->
                                    <!--&gt;-->

                                    <!--</v-text-field>-->
                                <!--</v-flex>-->
                            <!--</v-layout>-->
                        <!--</v-container>-->
                    <!--Retail Pricing-->
                        <!--<v-container  grid-list-md elevation-6>-->
                            <!--<v-layout wrap>-->
                                <!--<v-flex xs12 sm3 md3>-->
                                    <!--<v-select-->
                                            <!--:items="packList"-->
                                            <!--box-->
                                            <!--v-model="new_product.rt_unit"-->
                                            <!--label="Retail Unit"-->
                                            <!--hint="Eg. Pack"-->
                                            <!--persistent-hint-->
                                            <!--required-->
                                            <!--offset-y-->
                                            <!--data-vv-name="rt_unit"-->
                                            <!--:error-messages="errors.collect('rt_unit')"-->
                                            <!--v-validate="'required'"-->
                                    <!--&gt;</v-select>-->
                                <!--</v-flex>-->
                                <!--<v-flex xs4 sm3 md3>-->
                                    <!--<v-text-field-->
                                            <!--label="Pack Size"-->
                                            <!--box-->
                                            <!--v-model="new_product.rt_pack_size"-->
                                            <!--type="number"-->
                                            <!--data-vv-name="rt_pack_size"-->
                                            <!--:error-messages="errors.collect('rt_pack_size')"-->
                                            <!--v-validate="'numeric|required'"-->
                                    <!--&gt;-->

                                    <!--</v-text-field>-->
                                <!--</v-flex>-->
                                <!--<v-flex xs4 sm3 md3>-->
                                    <!--<v-text-field-->
                                            <!--label="Retail QTY"-->
                                            <!--box-->
                                            <!--type="number"-->
                                            <!--readonly-->
                                            <!--v-model="new_product.rt_quantity"-->
                                            <!--data-vv-name="rt_quantity"-->
                                            <!--:error-messages="errors.collect('rt_quantity')"-->
                                            <!--v-validate="'numeric|required'"-->
                                    <!--&gt;-->

                                    <!--</v-text-field>-->
                                <!--</v-flex>-->
                                <!--<v-flex xs4 sm3 md3>-->
                                    <!--<v-text-field-->
                                            <!--:label="runit_cost"-->
                                            <!--box-->
                                            <!--type="number"-->
                                            <!--v-model="new_product.rt_unit_cost"-->
                                            <!--data-vv-name="rt_cost"-->
                                            <!--readonly-->
                                            <!--:error-messages="errors.collect('rt_cost')"-->
                                            <!--v-validate="'decimal:2|required'"-->
                                    <!--&gt;-->

                                    <!--</v-text-field>-->
                                <!--</v-flex>-->


                                <!--<v-flex xs4 sm3 md3>-->
                                    <!--<v-text-field-->
                                            <!--label="Markup"-->
                                            <!--box-->
                                            <!--v-model="new_product.markup"-->
                                            <!--type="number"-->
                                            <!--data-vv-name="markup"-->
                                            <!--:error-messages="errors.collect('markup')"-->
                                            <!--v-validate="'decimal:2|required'"-->
                                    <!--&gt;-->

                                    <!--</v-text-field>-->
                                <!--</v-flex>-->

                                <!--<v-flex xs4 sm3 md3>-->
                                    <!--<v-text-field-->
                                            <!--label="Selling Price"-->
                                            <!--box-->
                                            <!--v-model="new_product.selling_price"-->
                                            <!--type="number"-->
                                            <!--data-vv-name="selling_price"-->
                                            <!--:error-messages="errors.collect('selling_price')"-->
                                            <!--v-validate="'decimal|required'"-->
                                    <!--&gt;-->

                                    <!--</v-text-field>-->
                                <!--</v-flex>-->

                                <!--<v-flex xs4 sm3 md3>-->
                                    <!--<v-text-field-->
                                            <!--label="Subtotal"-->
                                            <!--box-->
                                            <!--readonly-->
                                            <!--v-model="new_product.subtotal"-->
                                            <!--type="number"-->
                                            <!--data-vv-name="subtotal"-->
                                            <!--:error-messages="errors.collect('subtotal')"-->
                                            <!--v-validate="'decimal|required'"-->
                                    <!--&gt;-->

                                    <!--</v-text-field>-->
                                <!--</v-flex>-->



                            <!--</v-layout>-->
                        <!--</v-container>-->


                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="grey darken-1" @click.native="closeup">Close</v-btn>
                    <v-btn
                            color="secondary darken-1"
                            @click="onSaveProduct"
                            :loading="loader"
                            :disabled="loader"
                    >
                        <v-icon left>mdi-library-plus
                        </v-icon>Save Product</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-layout>
            <v-flex sm10 md10>

                <v-autocomplete
                        :loading="loading"
                        :items="items"
                        :search-input.sync="search"
                        v-model="select"
                        class="mx-3"
                        flat
                        no-data-text
                        clearable
                        hide-no-data
                        hide-details
                        label="Start typing  Product name..."
                        solo
                ></v-autocomplete>

            </v-flex>
            <v-flex sm2 md2>
                <v-btn icon dark outline class="grey" @click="setProduct"><v-icon dark>mdi-refresh</v-icon></v-btn>

            </v-flex>
        </v-layout>



        <simplert :useRadius="true"
                  :useIcon="true"
                  ref="simplert">
        </simplert>

    </div>

</template>

<script>
    import { eventBus } from '../../../../main.js';
    let axios = require("axios");
    export default {
        $_veeValidate: {
            validator: 'new'
        },
        name: "set-reorder",
        data () {
            return {
                x:'',
                prod_data:{},
                or_ws_quan:0,
                new_product:{
                    manufacturer:'',
                    bar_code:'',
                    category:'',
                    product_name:'',
                    product_type:'',
                    expiry:'',
                    id:0,
                    num:0,
                    ws_discount:0,
                    rt_discount:0,
                    ws_unit:'',
                    rt_unit:'',
                    ws_quantity:0,
                    purr_quantity:0,
                    purr_ws_subtotal:0,
                    purr_rt_subtotal:0,
                    purr_subtotal:0,
                    rt_quantity:'',
                    ws_unit_cost:'',
                    rt_unit_cost:'',
                    selling_price:'',
                    rt_pack_size:'',
                    ws_subtotal:'',
                    markup:'',
                    batch_no:'',
                    min_no:'',
                    max_no:'',
                    reorder_no:'',
                    ws_markup:'',
                    ws_selling_subtotal:'',
                    ws_selling_price:'',
                },
                activePurchaseProducts:{},
                fullProdSet:[],
                stock_expiry:'',
                dialog:false,
                loading: false,
                items: [],
                loader:false,
                search: null,
                select: null,
                states: [],
            }
        },
        mounted(){
            this.setProduct();
        },
        watch: {
            search (val) {
                if(!val){
                    return false;
                }

                 this.querySelections(val);

            },
            select(val){

                if(!val){
                    return false;
                }

                // console.log(this.fullProdSet);
                // return false;

                let res = this.fullProdSet.filter(function(e) {
                    return e.product_name === val;
                });

                // console.log(res);

                if (this.newProdData.filter(e => e.product_name === res[0].product_name).length > 0){
                    eventBus.$emit('setSearch',res[0].product_name);
                    this.new_product = res[0];
                    // this.or_ws_quan = res[0].ws_quantity;

                }
                else{

                    this.new_product = res[0];
                    this.dialog = true;
                    this.or_ws_quan = res[0].ws_quantity;
                    // alert(this.or_ws_quan);


                }

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
            purr_quan(){

                this.purr_up();
            },
            ws_quan(){
                // this.rtCostComp();
                this.costComp();
                this.rtComp();
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
        computed:{
            packList(){
                let catSet =  this.$store.getters.getPackUnits;
                let exSet = [];

                for (let key = 0, len = catSet.length; key < len; key++) {
                    exSet.push(catSet[key].pack_name);

                }

                return exSet;
            },
           unit_cost(){
               return this.new_product.ws_unit+" Cost(Ghc)";
           },
           runit_cost(){
               return this.new_product.rt_unit+" Cost(Ghc)";
           },
            ws_sub(){
               return this.new_product.ws_subtotal;
           },
            ws_dis(){
               return this.new_product.ws_discount;
            },
            ws_cost(){
               return this.new_product.ws_unit_cost;
            },
            ws_quan(){
               return this.new_product.ws_quantity;
            },
            purr_quan(){
               return this.new_product.purr_quantity;
            },
            rt_pack(){
               return this.new_product.rt_pack_size;
            },
            rt_quan(){
               return this.new_product.rt_quantity;
            },

            mark_up(){
               return this.new_product.markup;
            },
            rt_selling(){
               return this.new_product.selling_price;
            },

            prodData(){
               return this.$store.getters.getAllProducts;
           },
            newProdData(){
               return this.$store.getters.getNewPurchase;
           },
            apiSet(){
                return this.$store.getters.getApi;
            },
        },
        methods: {

            purr_up(){
               let purr  = +this.or_ws_quan + (+this.new_product.purr_quantity);

               if(purr > 0 ){
                   // this.new_product.ws_quantity = purr;
               }
               else{
                   return false;
               }

            },
            markupComp(){
                 let mark = 0;
                 mark = this.new_product.rt_unit_cost * this.new_product.markup;
                  this.new_product.selling_price = mark.toFixed(2);
                  this.new_product.subtotal = mark.toFixed(2) * this.new_product.rt_quantity;
            },

            rtComp(){
                    // this.new_product.rt_quantity = (this.new_product.ws_quantity * this.new_product.rt_pack_size);
                    this.new_product.purr_rt_quantity = (+this.or_ws_quan * this.new_product.rt_pack_size);
            },
            costComp(){
                let ws_sub = 0;
                let purr_ws_sub = 0;
                let sub = this.new_product.ws_quantity * this.new_product.ws_unit_cost;
                let purr_sub = this.new_product.purr_quantity * this.new_product.ws_unit_cost;
                if(this.new_product.ws_discount){

                   ws_sub = sub * (1-(this.new_product.ws_discount * 0.01));
                   purr_ws_sub = purr_sub * (1-(this.new_product.ws_discount * 0.01));
                    this.new_product.rt_unit_cost = this.new_product.ws_unit_cost / this.new_product.rt_pack_size;
                }
                else{

                    ws_sub = sub;
                    purr_ws_sub = purr_sub;
                    this.new_product.rt_unit_cost = (this.new_product.ws_unit_cost / this.new_product.rt_pack_size).toFixed(2);
                }

                this.new_product.ws_subtotal = ws_sub.toFixed(2);
                this.new_product.purr_ws_subtotal = purr_ws_sub.toFixed(2);

            },
            rtCostComp(){

                let rt_cost = 0;
                let rt_quan = this.new_product.rt_pack_size * this.new_product.ws_quantity;
                // let purr_rt_quan = this.new_product.rt_pack_size * this.new_product.purr_quantity;
                this.new_product.rt_quantity = rt_quan;
                // this.new_product.rt_quantity = rt_quan;


                if(rt_quan){
                      rt_cost = this.new_product.ws_subtotal/rt_quan;
                }
                else{

                }
                this.new_product.rt_unit_cost = rt_cost.toFixed(2);
            },
            sellComp(){
                let mark = 0;
                mark = (this.new_product.selling_price / this.new_product.rt_unit_cost);
                this.new_product.markup = mark.toFixed(2);
                let he = this.new_product.selling_price * this.new_product.rt_quantity;
                let purr_he = this.new_product.selling_price * this.new_product.purr_rt_quantity;

                this.new_product.subtotal = he.toFixed(2);
                this.new_product.purr_subtotal = purr_he.toFixed(2);
            },
            setProduct(){
                let self = this;
                const dict=[];
                axios.get(this.apiSet.allProducts)
                    .then(response=>{
                        const obj = response.data.data;
                        this.fullProdSet = obj;
                        for (let key = 0, len = obj.length; key < len; key++){
                            dict.push(
                                obj[key].product_name
                            )
                        }
                        self.states = dict;
                    }).catch(
                    e => {
                        console.log(e);
                    }
                )
            },
            clearUp(){
                this.product_name='',
                    this.category='',
                    this.manufacturer='',
                    this.barcode='',
                    this.product_type='',
                    this.expiry='',
                    this.$validator.reset();

                // this.closeup();

            },
            querySelections(v) {
                this.loading = true;
                // Simulated ajax query
                setTimeout(() => {
                    this.items = this.states;

                    this.loading = false
                }, 500);
            },
            loadDictionaries(){
                let self = this;
                axios.get(this.apiSet.allDictionarys)
                    .then(response=>{
                        const dict=[];
                        const obj = response.data.data;
                        // for(let key in obj){
                        for (let key = 0, len = obj.length; key < len; key++) {
                            console.log(obj[key].title);
                            dict.push({
                                id:obj[key].id,
                                num:key,
                                product_name:obj[key].product_name,
                                category:obj[key].category,
                                manufacturer:obj[key].manufacturer,
                                expiry:obj[key].expiry,
                                barcode:obj[key].barcode,
                                product_type:obj[key].product_type,
                            })
                        }
                        self.$store.commit('setDic',dict);

                    }).catch(
                    e => {
                        console.log(e);
                    }
                )
            },
            onSaveProduct(){
                let self = this;
                let new_prod = this.new_product;

                this.$validator.validateAll().then((result)=>{
                    if(result){
                        this.loader = true;
                        const ProductData={
                            ...new_prod,
                            outlet:this.$store.getters.getPout
                        };
                       this.$store.commit('setNewPurchase',ProductData);
                       this.activePurchaseProducts = ProductData;
                        eventBus.$emit('su_snack',true);
                        self.loader = false;
                        self.dialog=false;
                        this.clearUp();

                    }
                    else{
                        eventBus.$emit('form_snack',true);
                        return false;
                    }
                });


            },
            deleteItem (item) {
                let self = this;
                // let confirmFn = this.del(item);

                let confirmFn = function() {
                    self.del(item);
                };

                let obj = {
                    title: 'Delete Product',
                    message: 'Are you sure you want to Delete Product?',
                    type: 'warning',
                    useConfirmBtn: true,
                    onConfirm: confirmFn
                };

                this.$refs.simplert.openSimplert(obj);

            },

            // deleteItem (item) {
            //     confirm('Are you sure you want to delete this item?') && this.del(item);
            // },
            del(item){
                let self = this;
                let apiUrl = this.$store.state.config.url;
                const index = this.dictionaries.indexOf(item);
                this.dictionaries.splice(index, 1);

                axios.delete(apiUrl+'/dictionary/'+item.id)
                    .then(function(response){
                        console.log(response);
                        self.del_snackbar = true;
                        self.loadDictionaries();
                        self.$store.commit('setNetError',false);

                    }).catch(function(error){
                    self.$store.commit('setNetError',true);
                    console.log(error);
                })
            },

            closeup(){
                    // this.new_product.manufacturer='';
                    //         this.new_product.bar_code='';
                    //     this.new_product.category='';
                    //     this.new_product.product_name='';
                    //     this.new_product.product_type='';
                    //     this.new_product.expiry='';
                    //     this.new_product.id=0;
                    //     this.new_product.num=0;
                    //     this.new_product.ws_discount=0;
                    //     this.new_product.rt_discount=0;
                    //     this.new_product.ws_unit='';
                    //     this.new_product.rt_unit='';
                    //     this.new_product.ws_quantity=0;
                    //     this.new_product.purr_quantity=0;
                    //     this.new_product.rt_quantity='';
                    //     this.new_product.ws_unit_cost='';
                    //     this.new_product.rt_unit_cost='';
                    //     this.new_product.selling_price='';
                    //     this.new_product.rt_pack_size='';
                    //     this.new_product.ws_subtotal='';
                    //     this.new_product.markup='';
                    //     this.new_product.batch_no='';
                    //     this.new_product.min_no='';
                    //     this.new_product.max_no='';
                    //     this.new_product.reorder_no='';
                    //     this.new_product.ws_markup='';
                    //     this.new_product.ws_selling_subtotal='';
                    //     this.new_product.ws_selling_price='';
                        this.dialog = false;
                },

            }

        }

</script>

<style scoped>

</style>