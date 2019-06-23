<template>
    <div>

        <!--Add Dictionary Dialog-->
        <v-dialog v-model="dictDialog" persistent max-width="500px">
            <v-card>
                <form>
                    <v-toolbar >
                        <v-toolbar-title class="primary--text">Add to Dictionary</v-toolbar-title>

                        <v-spacer></v-spacer>


                        <v-btn icon @click.native="dictDialog = false">
                            <v-icon color="secondary">mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-container grid-list-md elevation-3>
                                <v-layout wrap >
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field
                                                label="Product Name"
                                                box
                                                v-model="product_name"
                                                v-validate="'required'"
                                                data-vv-name="product_name"
                                                :error-messages="errors.collect('product_name')"

                                        ></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 sm6 md6>
                                        <v-select
                                                offset-y
                                                :items="catFetch"
                                                v-model="category"
                                                label="Category"
                                                v-validate="'required'"
                                                data-vv-name="category"
                                                :error-messages="errors.collect('category')"
                                                box

                                        ></v-select>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field
                                                box
                                                label="Manufacturer"
                                                placeholder="eg. Toyota"
                                                v-model="manufacturer"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field
                                                box
                                                label="BarCode"
                                                prepend-icon="mdi-barcode-scan"
                                                required
                                                v-model="barcode"
                                        >

                                        </v-text-field>
                                    </v-flex>

                                    <v-flex xs12 sm6 md6>
                                        <v-text-field
                                                box
                                                label="Product Type"
                                                prepend-icon="mdi-check-all"
                                                required
                                                v-model="product_type"
                                        >

                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm5 md5 offset-md1>
                                        <v-btn small color="secondary"><v-icon left>mdi-barcode</v-icon>Generate Barcode</v-btn>
                                    </v-flex>


                                </v-layout>
                            </v-container>
                        </v-form>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat @click.native="closeDict">Close</v-btn>
                        <v-btn
                                @click="onAddDict"
                                color="secondary"
                                :loading="loader"
                                :disabled="loader"

                        >Save</v-btn>
                    </v-card-actions>
                </form>
            </v-card>
        </v-dialog>






        <v-dialog v-model="dialog" persistent max-width="900px">
            <v-card>
                <v-toolbar >
                    <v-toolbar-title class="primary--text">Add Product <v-btn flat color="secondary">{{select}} #{{new_product.id}}</v-btn></v-toolbar-title>

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
                                        v-model="full_dict.product_name"
                                        required

                                >

                                </v-text-field>
                            </v-flex>

                            <v-flex xs12 sm6 md4>
                                <v-text-field

                                        box
                                        v-model="full_dict.category"
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
                                        v-model="full_dict.manufacturer"

                                >

                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                        box
                                        label="Expiry(dd/mm/yyyy)"
                                        v-model="full_dict.expiry"
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
                                        v-model="full_dict.barcode"
                                        hint="If present on product"
                                >

                                </v-text-field>
                            </v-flex> <v-flex xs12 sm6 md4>
                            <v-btn color="secondary"><v-icon left>mdi-barcode</v-icon> Generate Barcode</v-btn>
                        </v-flex>

                            <v-flex xs12 sm6 md3>
                                <v-text-field
                                        box
                                        label="Batch No."
                                        v-model="new_product.batch_no"
                                        required
                                        type="number"

                                >

                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md3>
                                <v-text-field
                                        box
                                        label="Min No."
                                        v-model="new_product.min_no"
                                        type="number"
                                >

                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md3>
                                <v-text-field
                                        box
                                        label="Re-order No."
                                        v-model="new_product.reorder_no"
                                        required
                                        type="number"
                                >

                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md3>
                                <v-text-field
                                        box
                                        label="Max No."
                                        v-model="new_product.max_no"
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
                                        v-model="new_product.ws_unit"
                                        label="Wholesale Unit"
                                        hint="Eg. Pack"
                                        persistent-hint
                                        offset-y

                                ></v-select>
                            </v-flex>

                            <v-flex xs4 sm2 md2>
                                <v-text-field
                                        label="Quantity"
                                        box
                                        type="number"
                                        v-model="new_product.ws_quantity"

                                >

                                </v-text-field>
                            </v-flex>
                            <v-flex xs4 sm3 md3>
                                <v-text-field
                                        :label="unit_cost"
                                        box
                                        type="number"
                                        v-model="new_product.ws_unit_cost"
                                >

                                </v-text-field>
                            </v-flex>
                            <v-flex xs4 sm2 md2>
                                <v-text-field
                                        label="Discount"
                                        box
                                        suffix="%"
                                        v-model="new_product.ws_discount"
                                >

                                </v-text-field>
                            </v-flex>


                            <v-flex xs4 sm2 md2>
                                <v-text-field
                                        label="SubTotal(GH¢)"
                                        box
                                        readonly
                                        v-model="new_product.ws_subtotal"
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
                                        v-model="new_product.rt_unit"
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
                                        v-model="new_product.rt_pack_size"
                                        type="number"
                                >

                                </v-text-field>
                            </v-flex>
                            <v-flex xs4 sm3 md3>
                                <v-text-field
                                        label="Retail QTY"
                                        box
                                        type="number"
                                        v-model="new_product.rt_quantity"
                                >

                                </v-text-field>
                            </v-flex>
                            <v-flex xs4 sm3 md3>
                                <v-text-field
                                        :label="runit_cost"
                                        box
                                        type="number"
                                        v-model="new_product.rt_unit_cost"
                                >

                                </v-text-field>
                            </v-flex>


                            <v-flex xs4 sm3 md3>
                                <v-text-field
                                        label="Markup"
                                        box
                                        v-model="new_product.markup"
                                        type="number"
                                >

                                </v-text-field>
                            </v-flex>

                            <v-flex xs4 sm3 md3>
                                <v-text-field
                                        label="Selling Price"
                                        box
                                        v-model="new_product.selling_price"
                                        type="number"
                                >

                                </v-text-field>
                            </v-flex>

                            <v-flex xs4 sm3 md3>
                                <v-text-field
                                        label="Subtotal"
                                        box
                                        v-model="new_product.subtotal"
                                        type="number"
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
                        label="Search from product dictionary..."
                        solo
                ></v-autocomplete>

            </v-flex>
            <v-flex sm2 md2>
                <v-btn icon dark outline class="grey" @click="setProduct"><v-icon dark>mdi-refresh</v-icon></v-btn>
                <v-btn icon dark class="white elevation-8" @click="addDictionary"><v-icon color="grey darken-3">mdi-folder-plus</v-icon></v-btn>

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
        name: "set-dictionary",
        data () {
            return {
                new_product:{
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
                dictDialog:false,
                fullProdSet:[],
                stock_expiry:'',
                dialog:false,
                loading: false,
                items: [],
                loader:false,
                search: null,
                select: null,
                states: [],
                dictData:{},
                dict_load:false,
                full_dict: {
                    manufacturer:'',
                    bar_code:'',
                    category:'',
                    product_name:'',
                    product_type:'',
                    expiry:'',
                    id:0,
                    num:0
                },
                product_name:'',
                category:'',
                manufacturer:'',
                barcode:'',
                product_type:'',
                expiry:'',
            }
        },
        mounted(){
            this.loadDictionaries();
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


                let res = this.dictData.filter(function(e) {
                    return e.product_name === val;
                });

                this.full_dict = res[0];


                this.dialog = true;
                this.or_ws_quan = res[0].ws_quantity;

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
                this.sellComp(0);
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
            rt_pack(val){
                this.rtCostComp();
                this.rt_sp(val);


            },
            mark_up(val){
                this.markupComp(val);
            },
            rt_selling(val){
                // this.wsUnitCostComp();
                this.sellComp(val);
            }
        },
        computed:{
            catFetch(){
                let cat = this.$store.getters.getCats;
                let catup = [];

                for (let key = 0, len = cat.length; key < len; key++) {
                    catup.push(
                        cat[key].cat_name,
                    )
                }
                return catup;

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
                return this.new_product.ws_unit+" Cost(Ghc)";
            },
            runit_cost(){
                return this.new_product.rt_unit+" Cost(Ghc)";
            },

            rt_cost(){
               return this.new_product.rt_unit_cost;
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
            full_markup(){
               return this.new_product.markup;
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
            addDictionary(){
                this.dictDialog = true;
            },
            wsQuanComp(){
                this.new_product.ws_quantity = parseInt(this.new_product.rt_quantity) / parseInt(this.new_product.rt_pack_size);
            },
            markupComp(val){

                if(val <= 0){
                    // alert('invalid markup value');
                    this.new_product.markup = 1;
                    return false;
                }else{
                this.new_product.selling_price = (this.new_product.rt_unit_cost * this.new_product.markup).toFixed(4);
                this.new_product.subtotal = (this.new_product.selling_price * this.new_product.rt_quantity).toFixed(4);

                }

            },

            purr_up(){
                let purr  = +this.or_ws_quan + (+this.new_product.purr_quantity);

                if(purr > 0 ){
                    this.new_product.ws_quantity = purr;
                }
                else{
                    return false;
                }

            },
            wsQuanComp(){
                this.new_product.ws_quantity = parseFloat(this.new_product.rt_quantity) / parseFloat(this.new_product.rt_pack_size);
            },

            rtComp(){
                this.new_product.rt_quantity = (this.new_product.ws_quantity * this.new_product.rt_pack_size);
                this.new_product.purr_rt_quantity = (this.new_product.purr_quantity * this.new_product.rt_pack_size);
            },
            costComp(){
                let ws_sub = 0;
                let purr_ws_sub = 0;
                let sub = this.new_product.ws_quantity * this.new_product.ws_unit_cost;
                let purr_sub = this.new_product.purr_quantity * this.new_product.ws_unit_cost;
                if(this.new_product.ws_discount){

                    ws_sub = sub * (1-(this.new_product.ws_discount * 0.01));
                    purr_ws_sub = purr_sub * (1-(this.new_product.ws_discount * 0.01));
                    let ruc = this.new_product.ws_unit_cost / this.new_product.rt_pack_size;

                    this.new_product.rt_unit_cost = ruc.toFixed(4);
                }
                else{

                    ws_sub = sub;
                    purr_ws_sub = purr_sub;
                    this.new_product.rt_unit_cost = (this.new_product.ws_unit_cost / this.new_product.rt_pack_size).toFixed(4);
                }

                this.new_product.ws_subtotal = ws_sub.toFixed(4);
                this.new_product.purr_ws_subtotal = purr_ws_sub.toFixed(4);

            },


            rtCostComp(){

                let rt_cost = 0;
                let rt_quan = this.new_product.rt_pack_size * this.new_product.ws_quantity;
                this.new_product.rt_quantity = rt_quan;

                if(rt_quan){
                    rt_cost = this.new_product.ws_subtotal/rt_quan;
                }
                else{
                    rt_cost = this.new_product.selling_price/this.new_product.rt_pack_size;

                }
                // this.new_product.rt_unit_cost = rt_cost.toFixed(4);
                    this.new_product.rt_unit_cost = rt_cost.toFixed(4);
            },
            sellComp(val){
                let mark = 0;



                this.new_product.selling_price= (this.new_product.markup * this.new_product.rt_unit_cost).toFixed(4);

                let purr_he = this.new_product.selling_price * this.new_product.purr_rt_quantity;

                this.new_product.subtotal = (this.new_product.selling_price * this.new_product.rt_quantity).toFixed(4);

                this.new_product.purr_subtotal = purr_he.toFixed(4);

                if(val){
                    this.new_product.markup = val / this.new_product.rt_unit_cost;

                }
            },

            rt_sp(val){
                let mark = 0;

                if(val <= 0){
                    this.new_product.rt_pack_size = 1;
                    return false;
                }else {


                    this.new_product.selling_price = (this.new_product.markup * this.new_product.rt_unit_cost).toFixed(4);

                    let purr_he = this.new_product.selling_price * this.new_product.purr_rt_quantity;

                this.new_product.subtotal = (this.new_product.selling_price * this.new_product.rt_quantity).toFixed(4);

                    this.new_product.purr_subtotal = purr_he.toFixed(4);
                }

                // if(val){
                //     this.new_product.markup = val / this.new_product.rt_unit_cost;
                //
                // }
            },
            wsUnitCostComp(){
                let wsComp = parseFloat(this.new_product.selling_price) / parseFloat(this.new_product.markup);

                this.new_product.ws_unit_cost = wsComp.toFixed(4);

                // this.new_product.ws_unit_cost = 6787;
                // console.log(this.new_product.ws_unit_cost);
            },
            closeDict(){
                    this.product_name='';
                    this.category='';
                    this.manufacturer='';
                    this.barcode='';
                    this.product_type='';
                    this.expiry='';
                    this.dictDialog = false;
            },
            setProduct(){
                const dict=[];

                let self = this;
                axios.get(this.apiSet.allDictionarys)
                    .then(response=>{
                        const dict=[];
                        const dic=[];
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

                        for (let key = 0, len = dict.length; key < len; key++){
                            dic.push(
                                dict[key].product_name
                            )
                        }

                        console.log("nii");
                        self.states = dic;

                        self.$store.commit('setDic',dict);
                        self.dictData = dict;
                    }).catch(
                    e => {
                        console.log(e);
                    })

            },
            clearUp(){
                this.product_name='';
                this.category='';
                this.manufacturer='';
                this.barcode='';
                this.product_type='';
                this.expiry='';
                this.select='';
                this.dialog=false;
                this.$validator.reset();

                eventBus.$emit('dict_load',true);

            },
            querySelections(v) {
                console.log(this.states);
                this.loading = true;
                // Simulated ajax query
                setTimeout(() => {
                    this.items = this.states;

                    this.loading = false
                }, 500);
            },
            onAddDict(){
                let self = this;
                // this.$validator.validateAll().then((result)=>{
                //     if(result){
                        self.loader = true;
                        const DictData={
                            product_name:this.product_name,
                            category:this.category,
                            manufacturer:this.manufacturer,
                            barcode:this.barcode,
                            product_type:this.product_type,
                            expiry:this.expiry,
                        };

                        axios.post(this.apiSet.singleDictionary, DictData)
                            .then(function (response) {
                                console.log(response);
                                self.$store.commit('setSnack',{t:"Product added to Dictionary", c:"green darken-3"});
                                self.loader = false;
                                self.closeDict();
                            })
                            .catch(function (error) {
                                console.log(error);
                                self.closeDict();
                            });
                //     }
                //     else{
                //         self.$store.commit('setSnack',{t:"Sorry Network Error.", c:"red darken-3"});
                //         return false;
                //     }
                // });

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
                        self.dictData = dict;
                        console.log(self.dictData);
                    }).catch(
                    e => {
                        console.log(e);
                    }
                )
            },
            onSaveProduct(){
                let self = this;
                let new_prod = this.new_product;

                new_prod.purr_quantity = this.new_product.ws_quantity;
                new_prod.purr_ws_quantity = this.new_product.ws_quantity;
                new_prod.purr_rt_quantity = this.new_product.rt_quantity;
                new_prod.purr_rt_subtotal = this.new_product.subtotal;
                new_prod.purr_ws_subtotal = this.new_product.ws_quantity * this.new_product.ws_unit_cost;
                new_prod.purr_subtotal = this.new_product.subtotal;
                let dict_prod = this.full_dict;
                this.$validator.validateAll().then((result)=>{
                    if(result){
                        this.loader = true;
                        const ProductData={
                            ...new_prod,
                            ...dict_prod,
                            company_id:this.userData.company_id,
                            outlet_id:this.$store.getters.getPout,
                            outlet:this.$store.getters.getPout,
                        };
                        this.$store.commit('setNewPurchase',ProductData);
                        this.activePurchaseProducts = ProductData;
                        eventBus.$emit('su_snack',true);
                        self.loader = false;
                        self.dialog=false;
                        this.clearUp();
                        this.closeup();

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
                this.new_product.manufacturer='';
                        this.new_product.bar_code='';
                    this.new_product.category='';
                    this.new_product.product_name='';
                    this.new_product.product_type='';
                    this.new_product.expiry='';
                    // this.new_product.id=0;
                    this.new_product.num=0;
                    this.new_product.ws_discount=0;
                    this.new_product.rt_discount=0;
                    this.new_product.ws_unit='Pack';
                    this.new_product.rt_unit='Pack';
                    this.new_product.ws_quantity=0;
                    this.new_product.purr_quantity=0;
                    this.new_product.rt_quantity=0;
                    this.new_product.ws_unit_cost=0;
                    this.new_product.rt_unit_cost=0;
                    this.new_product.selling_price=0;
                    this.new_product.rt_pack_size=1;
                    this.new_product.ws_subtotal=0;
                    this.new_product.markup=1;
                    this.new_product.batch_no=1;
                    this.new_product.min_no=null;
                    this.new_product.max_no=null;
                    this.new_product.reorder_no=null;
                    this.new_product.ws_markup=null;
                    this.new_product.ws_selling_subtotal=null;
                    this.new_product.ws_selling_price=null;
                this.dialog = false;
            },

        }

    }

</script>

<style scoped>

</style>