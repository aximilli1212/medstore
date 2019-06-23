<template>
    <div>
        <sup-add :sup_dialog="sup_dialog"></sup-add>
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
            <div  class="white--text">Please Enter Purchase Details</div>

            <v-layout row align-center>
                <v-flex sm2>
                    <!--<v-select-->
                            <!--v-model="purchase_det.outlet"-->
                            <!--offset-y-->
                            <!--class="mt-2"-->
                            <!--:items="outlets"-->
                            <!--label="Outlet"-->
                            <!--data-vv-name="outlet"-->
                            <!--:error-messages="errors.collect('outlet')"-->
                            <!--v-validate="'required'"-->
                            <!--solo-->
                    <!--&gt;</v-select>-->

                    <v-select
                            v-model="purchase_det.outlet"
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

                <v-flex sm3 md3>
                    <v-select
                            v-model="purchase_det.supplier"
                            offset-y
                            class="mt-2 ml-2"
                            :items="supList"
                            label="Select Supplier"
                            data-vv-name="supplier"
                            :error-messages="errors.collect('supplier')"
                            v-validate="'required'"
                            solo
                    ></v-select>

                </v-flex>
                <v-flex sm1 md1>
                    <v-btn icon outline color="white" class="mb-4" @click="addSup()"><v-icon>mdi-plus</v-icon></v-btn>

                </v-flex>


                <v-flex sm2 md2>
                    <v-text-field
                            v-model="purchase_det.sup_invoice"
                            class="mt-2 ml-2"
                            label="Invoice No."
                            data-vv-name="invoice"
                            :error-messages="errors.collect('invoice')"
                            v-validate="'required'"
                            solo
                    ></v-text-field>

                </v-flex>

                <v-flex sm3 md3>
                    <v-text-field
                            v-model="purchase_det.carriage"
                            class="mt-2 ml-2"
                            label="Carriage/Freight"
                            solo
                    ></v-text-field>

                </v-flex>

                <v-flex sm2 md2>
                    <v-text-field
                            v-model="purchase_det.vat"
                            class="mt-2 ml-2"
                            label="Vat Charges"
                            solo
                    ></v-text-field>

                </v-flex>
                <v-flex sm2 md2>
                    <v-text-field
                            v-model="purchase_det.sup_discount"
                            class="mt-2 ml-2"
                            label="Discount"
                            solo
                    ></v-text-field>
                </v-flex>
                <v-flex sm2 md2>
                    <v-select
                            v-model="purchase_det.payment_mode"
                            offset-y
                            class="mt-2 ml-2"
                            :items="payment_modes"
                            label="Payment Mode"
                            data-vv-name="mode"
                            :error-messages="errors.collect('mode')"
                            v-validate="'required'"
                            solo
                    ></v-select>
                </v-flex>

                <v-flex sm2 md2 v-if="due">
                    <v-menu
                            ref="menu"
                            :close-on-content-click="false"
                            v-model="menu"
                            :nudge-right="40"
                            :return-value.sync="purchase_det.due_date"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                    >
                        <v-text-field
                                class="mt-2 ml-2"
                                solo
                                :value="due_days"
                                slot="activator"
                                label="Due Date"
                                readonly
                        ></v-text-field>
                        <v-date-picker
                                v-model="purchase_det.due_date"
                                no-title
                                scrollable
                                color="secondary"
                                header-color="primary"
                        >
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn color="primary" @click="$refs.menu.save(purchase_det.due_date)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-flex>


                <v-spacer></v-spacer>
            </v-layout>
            <v-layout>






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
                            color="orange darken-3"
                            class="round_end"
                            elevation-8
                    >
                        <v-flex sm12 md12 >
                            <set-dictionary>

                            </set-dictionary>
                        </v-flex>
                    </v-toolbar>

                    <v-toolbar
                            v-else
                            key="prod"
                            color="grey darken-3"
                            class="round_end"
                            elevation-8
                    >
                        <v-flex sm12 md12 >
                            <set-purchase>

                            </set-purchase>
                        </v-flex>
                    </v-toolbar>


                </transition>






                <!--<v-flex sm1 md1>-->
                    <!--<v-btn v-tooltip="{-->
                             <!--content: 'Tooltip content here',-->
                              <!--show: true,-->
                        <!--}"-->
                           <!--dark-->
                           <!--color="orange darken-3"-->
                           <!--icon-->
                           <!--@click="$router.push('/dictionary')">-->
                        <!--<v-icon>mdi-content-save-all</v-icon></v-btn>-->
                <!--</v-flex>-->
                <v-flex sm2 md2>
                    <v-btn dark  color="grey darken-3" :loader="loader" :disable="loader" @click="fromStock"><v-icon left>mdi-basket</v-icon> Stock</v-btn>
                </v-flex>
                <v-flex sm2 md2>
                    <v-btn dark  color="orange darken-3" :loader="loader" :disable="loader" @click="fromDictionary"><v-icon left>mdi-dictionary</v-icon> Dictionary</v-btn>
                </v-flex>

                <v-flex sm2 md2>
                    <v-btn dark  color="green darken-3" :loader="loader" :disable="loader" @click="submitPurchase"><v-icon left>mdi-content-save-all</v-icon>Save Purchase</v-btn>
                </v-flex>

                <!--<v-flex sm2 md2>-->
                    <!--<v-btn dark color="secondary" @click="$router.push('/purchase_view')"><v-icon left>mdi-view-carousel</v-icon>Preview</v-btn>-->
                <!--</v-flex>-->
                <v-flex sm2 md2>
                    <v-btn outline color="grey" @click="resetPurchase"><v-icon left>mdi-refresh</v-icon>Reset</v-btn>
                </v-flex>
            </v-layout>
        </v-card>



        <v-card class="thead">
            <v-card-title>
                <v-btn icon color="primary" @click="$router.go(-1)" small><v-icon>mdi-arrow-left-thick</v-icon></v-btn>
                <p class="headline ttext mt-3">New Purchases[ <i class="green--text text--darken-3">{{getNewPurchase.length}}</i> ] from <i class="green--text text--darken-3">{{purchase_det.supplier}}</i>
                    <i class="subheading ml-4"> Total Cost: <span class="green--text text--darken-3"> GH¢ {{purrSub}}</span></i>
                    <i class="subheading ml-4"> Total Selling: <span class="green--text text--darken-3"> GH¢ {{purrSellSub}}</span></i>
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

                        <!--<v-btn-->
                                <!--flat-->
                                <!--small-->
                                <!--class="mr-2 teal&#45;&#45;text cpoint"-->
                                <!--@click="editItem(props.item)"-->
                        <!--&gt;<v-icon-->

                        <!--&gt;-->
                            <!--mdi-pencil-->
                        <!--</v-icon> Edit</v-btn>-->



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
                v-model="added_snackbar"
        >
             You have already added product.
            <v-btn flat color="red" @click.native="added_snackbar = false">Close</v-btn>
        </v-snackbar>

        <v-snackbar
                :timeout="6000"
                :top="true"
                :right="x === 'right'"
                v-model="er_snackbar"
        >
            Sorry Input Error. Data could not be saved.
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
                v-model="pu_snackbar"
                color=""
        >
            Products Successfully Purchased.
            <v-btn flat color="green" @click.native="pu_snackbar = false">Close</v-btn>
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


        <simplert :useRadius="true"
                  :useIcon="true"
                  ref="simplert">
        </simplert>
    </div>
</template>

<script>
    let axios = require("axios");
    import { eventBus } from '../../../../main.js';
    import moment from 'moment';

    import SupAdd from './sup_add'
    export default {
        name: "new_purchase",
        data(){
            return{
                ret_up:false,
                due:false,
                er_snackbar:false,
                del_snackbar:false,
                del_error_snack:false,
                form_error_snack:false,
                added_snackbar:false,
                sup_dialog:false,
                su_snackbar:false,
                ed_snackbar:false,
                pu_snackbar:false,
                outlet:{outlet_name:'Warehouse',id:1},
                outlets:[],
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
                purchase_det:{
                    outlet:'',
                    supplier:'',
                    sup_invoice:'',
                    carriage:0,
                    vat:0,
                    sup_discount:0,
                    due_date:'',
                    payment_mode:'',
                    date: new Date(),
                },
                purchase_head:[
                    {
                        text: 'Id',
                        align: 'left',
                        value: 'id',
                    },
                    { text: 'Product', value: 'product_name',sortable:false },
                    { text: 'Batch No.', value: 'batch_no' },
                    { text: 'Purchase Quantity', value: 'purchase_qty' },
                    { text: 'C-Price/W-Unit(Ghc)', value: 'purchase_cost'},
                    { text: 'S-Price/R-Unit(Ghc)', value: 'purchase_selling'},
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
                payment_modes: ['Cash', 'Credit','Draft'],
                suppliers: ['ECPL Pharmacy', 'Agapet Out Stores','Hollywood Sales'],
                side_items:[
                    { icon: 'mdi-chart-bubble', text: 'View Drafts',link:'/purchase_draft' },
                    { icon: 'mdi-cart', text: 'Purchases',link:'/purchases' },

                ],
            }
        },
        computed:{
            purOut(){
                return this.purchase_det.outlet;
            },

            purrSub(){
                let purr = this.$store.getters.getNewPurchase;
                return Object.values(purr).reduce((t, n) => t + parseFloat(n.purr_ws_subtotal), 0);

            },
            purrSellSub(){
                let purr = this.$store.getters.getNewPurchase;
                return Object.values(purr).reduce((t, n) => t + parseFloat(n.purr_subtotal), 0);

            },
            due_days(){

                let a = moment(this.purchase_det.due_date);
                let b = moment();
               let c = 1 + a.diff(b, 'days'); // 1


                    return this.purchase_det.due_date ? c +" Days" : ''
            },
            supList(){
                let catSet =  this.$store.getters.getSup;
                let exSet = [];

                for (let key = 0, len = catSet.length; key < len; key++) {
                    exSet.push(catSet[key].sup_name);

                }

                return exSet;
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
            payMode(){
                return this.purchase_det.payment_mode;
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
                        purchase_cost:obj[key].ws_unit_cost+' / '+obj[key].purr_ws_subtotal,
                        purchase_selling:obj[key].selling_price+' / '+obj[key].purr_subtotal,
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
            purOut(val){
                this.$store.commit('setPout',val.id);
                this.outlet_name = val.outlet_name;
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
                // this.markupComp();
                this.sellComp();
            },
            ws_quan(){
                this.costComp();
                // this.markupComp();
                this.sellComp();
                this.rtCostComp();

            },
            rt_quan(){
                this.rtCostComp();
                // this.markupComp();
                this.sellComp();
            },
            rt_pack(){
                this.rtCostComp();
            },
            mark_up(val){
                this.markupComp(val);
            },
            rt_selling(){
                this.sellComp();
            }
        },
        mounted(){
            this.setSide();
            this.resetPurchase();
            this.loadSup();
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
            eventBus.$on('sup_dialog',(data)=>{
                this.sup_dialog = data;
            });

            eventBus.$on('ed_snack',(data)=>{
                this.ed_snackbar = data;
            });

            eventBus.$on('form_snack',(data)=>{
                this.form_error_snack = data;
            });
            eventBus.$on('setSearch',(data)=>{
                this.search = data;
                this.added_snackbar = true;
            });

        },
        methods:{
            fromDictionary(){
                this.ret_up = true;
            },
            fromStock(){
                this.ret_up = false;
            },
            getOut(){
                this.$store.dispatch('loadOutlets');
                this.outList();
            },
            outList(){
                let outSet =  this.$store.getters.getOutlets;
                let exSet = [];

                for (let key = 0, len = outSet.length; key < len; key++) {

                    // if(outSet[key].id > 1){

                    exSet.push({outlet_name: outSet[key].outlet_name,id:outSet[key].id});

                    // }


                }

                this.outlets =  exSet;
            },
            setSide(){

                this.$store.commit('setSideItems',this.side_items);
                this.$store.commit('setDrawer',true);
            },
            loadSup(){
                let self = this;
                axios.get(this.apiSet.allSuppliers)
                    .then(response=>{
                        const sup = response.data.data;

                        self.$store.commit('setSup',sup);
                        console.log('Nii here');
                        console.log(sup);

                    }).catch(
                    e => {
                        console.log(e);

                    }
                )
            },

            addSup(){
                  this.sup_dialog = true;
            },
            markupComp(val){
                // let mark = 0;
                // mark = this.editedItem.rt_unit_cost * this.editedItem.markup;
                // this.editedItem.selling_price = mark;
                // this.editedItem.subtotal = mark * this.editedItem.rt_quantity;
                if(val <= 0){
                    this.editedItem.markup = 1;
                    return false;
                }else{
                    this.editedItem.selling_price = this.editedItem.rt_unit_cost * this.editedItem.markup;
                    this.editedItem.subtotal = this.editedItem.selling_price * this.editedItem.rt_quantity;

                }



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
                // this.editedItem.purr_subtotal = this.editedItem.selling_price * this.editedItem.rt_quantity;
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
                this.patch_inventory = [];
                let pid = item.id;
                // this.editedIndex = this.inventory.indexOf(item);
                // const index = this.inventory.indexOf(item);



                axios.get(this.apiSet.singleProduct+"/"+pid)
                    .then(response=>{
                        const prod_show=[];
                        console.log(response.data.data);
                        const obj = response.data.data;
                        console.log(obj);

                        // self.patch_inventory = obj;
                        // let raw = this.patch_inventory;
                        this.editedItem = Object.assign({}, obj);
                        this.dialog = true

                    }).catch(
                    e => {
                        console.log(e);
                        self.loader = false;

                        this.err.push(e);
                    }
                );



            },


            // editItem (item) {
            //     this.editedIndex = item.id;
            //
            //     let raw = this.prodData.filter(e => {
            //         return e.id === item.id;
            //     });
            //
            //
            //     this.editedItem =  raw[0];
            //     this.dialog = true;
            // },
            loadSuppliers(){
                this.fetchup=true;
                let self = this;
                axios.get(this.apiSet.allSuppliers)
                    .then(response=>{
                        const sup = response.data.data;


                        self.suppliers = sup;
                        self.total = sup.length;
                        self.fetchup = false;
                        self.$store.commit('setSuppliers',sup);

                    }).catch(
                    e => {
                        console.log(e);
                        self.loader = false;
                        self.er_snackbar = true;

                        this.err.push(e);
                    }
                )
            },

            submitPurchase(){

                this.$validator.validateAll().then((result)=>{
                    if(result){
                this.loader=true;
                let self = this;
                const p = this.prodData;
                const r = this.purchase_det;

                // let new_inv = r.sup_invoice.replace(/[/]/g, '_');

                let cp_total = Object.values(p).reduce((t, n) => t + parseInt(n.ws_subtotal), 0);
                let sp_total = Object.values(p).reduce((t, n) => t + parseInt(n.subtotal), 0);

                p.purchase_invoice = r.sup_invoice;
                p.company_id= this.userData.company_id;
                p.outlet_id= this.$store.getters.getPout;
                r.company_id= this.userData.company_id;
                r.outlet_id= this.userData.outlet_id;
                r.outlet= this.$store.getters.getPout;
                p.outlet= this.$store.getters.getPout;
                r.outlet_name= this.outlet_name;
                r.amount = cp_total;
                r.by = this.userData.user_name;
                // r.sup_invoice= new_inv;


                this.$store.commit('setPurchaseDet',r);

                        axios.post(this.apiSet.singlePurchase, r)
                            .then(function (response) {
                                console.log(response);
                                self.loader = false;
                                self.$validator.reset();
                            })
                            .catch(function (error) {
                                console.log(error);
                                this.er_snackbar = true;
                                self.loader = false;
                            });

                        // Setting Product Purchase

                for (let key = 0, len = p.length; key < len; key++) {

                    p[key].purchase_invoice = r.sup_invoice;


                    // axios.post(this.apiSet.productPurchase, p[key])
                    axios.post(this.apiSet.singlePurchaseBuffer, p[key])
                        .then(function (response) {
                            console.log(response);
                            self.loader = false;
                            self.$validator.reset();

                            self.$router.push('/purchase_view');
                        })
                        .catch(function (error) {
                            console.log(error);
                            this.er_snackbar = true;
                            self.loader = false;

                        });
                }

                // this.resetPurchase();
                this.pu_snackbar = true;
                    }
                    else{
                        eventBus.$emit('form_snack',true);
                        return false;
                    }
                });


            },

            submitPurchaseDraft(){

                this.$validator.validateAll().then((result)=>{
                    if(result){
                this.loader=true;
                let self = this;
                const p = this.prodData;
                const r = this.purchase_det;

                let cp_total = Object.values(p).reduce((t, n) => t + parseInt(n.ws_subtotal), 0);
                let sp_total = Object.values(p).reduce((t, n) => t + parseInt(n.subtotal), 0);

                p.purchase_invoice = r.sup_invoice;
                p.company_id= this.userData.company_id;
                p.outlet_id= this.$store.getters.getPout;
                r.company_id= this.userData.company_id;
                r.outlet_id= this.userData.outlet_id;
                r.outlet= this.$store.getters.getPout;
                p.outlet= this.$store.getters.getPout;
                r.outlet_name= this.outlet_name;
                r.amount = cp_total;
                r.by = this.userData.user_name;

                        axios.post(this.apiSet.singlePurchase, r)
                            .then(function (response) {
                                // console.log(response);
                                self.loader = false;
                                self.$validator.reset();
                            })
                            .catch(function (error) {
                                console.log(error);
                                this.er_snackbar = true;
                                self.loader = false;
                            });

                        // Setting Product Purchase

                for (let key = 0, len = p.length; key < len; key++) {

                    p[key].purchase_invoice = r.sup_invoice;


                    // axios.post(this.apiSet.productPurchase, p[key])
                    axios.post(this.apiSet.singlePurchaseBuffer, p[key])
                        .then(function (response) {
                            console.log(response);
                            self.loader = false;
                            self.$validator.reset();

                            self.$router.push('/purchase_view');
                        })
                        .catch(function (error) {
                            console.log(error);
                            this.er_snackbar = true;
                            self.loader = false;

                        });
                }

                // this.resetPurchase();
                this.pu_snackbar = true;
                    }
                    else{
                        eventBus.$emit('form_snack',true);
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

                    this.purchase_det.outlet='';
                    this.purchase_det.supplier='';
                    this.purchase_det.sup_invoice='';
                    this.purchase_det.carriage='';
                    this.purchase_det.vat='';
                    this.purchase_det.sup_discount='';
                    this.purchase_det.payment_mode='';
                    this.search = '';
                    this.select = '';
                this.$validator.reset();

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
            SupAdd: SupAdd,
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