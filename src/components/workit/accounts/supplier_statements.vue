<template>
    <div>

        <v-dialog v-model="indiv_dialog" persistent max-width="900px">

            <v-card
                    class="elevation-4"
            >
                <v-card-title>
                    <p class="headline ttext mt-1"> {{indiv_sup}} | </p><br />
                    <p class="small ttext mt-1">Total Amount [ <i class="orange--text text--darken-3">Ghc {{indiv_amount}}</i> ]</p><br />
                    <v-spacer></v-spacer>


                    <!--<v-btn large class="secondary elevation-8" @click="setExpiryReport"><v-icon left>mdi-cash-multiple</v-icon> Make Payment </v-btn>-->
                    <v-btn icon @click.native="indiv_dialog = false">
                        <v-icon color="secondary">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-data-table
                        :headers="indiv_headers"
                        :items="indiv_supplier"
                        :loading="fetchup"
                        class="elevation-1"
                >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.num }}</td>
                        <td>{{ props.item.product_name }}</td>
                        <td>{{ props.item.purchase_date }}</td>
                        <td>{{ props.item.quantity }}</td>
                        <td>{{ props.item.amount }}</td>
                        <!--<td class="justify-center layout px-0">-->

                            <!--<v-btn-->
                                    <!--flat-->
                                    <!--small-->
                                    <!--class="mr-2 teal&#45;&#45;text cpoint"-->
                                    <!--@click="make_pay(props.item)"-->
                            <!--&gt;<v-icon left>mdi-cash-multiple</v-icon>-->
                                <!--Make Payment-->
                            <!--</v-btn>-->
                        <!--</td>-->



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
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey darken-1" flat @click.native="close">Cancel</v-btn>
                    <v-btn color="primary darken-1"dark @click.native=""><v-icon left>mdi-printer</v-icon>Print</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>




        <v-card class="thead">
            <v-card-title>
                <v-btn icon color="primary" @click="$router.go(-1)" small><v-icon>mdi-arrow-left-thick</v-icon></v-btn>
                <p class="headline ttext mt-3">All Suppliers</p>
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
                    :headers="headers"
                    :items="suppliers"
                    :search="search"
                    :loading="fetchup"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.invoice }}</td>
                    <td>{{ props.item.credit }}</td>
                    <td>{{ moment(props.item.date).format('DD MMM YYYY') }}</td>
                    <td class="justify-center layout px-0">

                        <!--<v-btn-->
                                <!--flat-->
                                <!--small-->
                                <!--class="mr-2 teal&#45;&#45;text cpoint"-->
                                <!--@click="make_pay(props.item)"-->
                        <!--&gt;<v-icon>mdi-cash</v-icon>-->
                            <!--Make Payment-->
                        <!--</v-btn>-->



                        <v-btn
                                flat
                                small
                                class="mr-2 secondary--text cpoint"
                                @click="view_det(props.item)">
                            <v-icon>mdi-pencil</v-icon>
                            View Details
                        </v-btn>
                    </td>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                </v-alert>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
    let axios = require("axios");
    export default {
        name: "supplier_statements",
        data () {
            return {
                search: '',
                loader:false,
                fetchup:false,
                indiv_total:2,
                indiv_sup:'',
                indiv_amount:0,
                indiv_dialog:false,
                headers: [
                    { text: 'Id', align: 'left', sortable: false, value: 'id',class:'subheading'},
                    { text: 'Supplier Name', align: 'left', value: 'name',class:'subheading' },
                    { text: 'Invoice No.', align: 'left', value: 'invoice',class:'subheading' },
                    { text: 'Credit', value: 'credit', align: 'left', class:'subheading' },
                    { text: 'Date', value: 'date', align: 'left', class:'subheading' },
                    { text: '', Value: 'name', align: 'left', class:'subheading' },
                ],
                indiv_headers: [
                    { text: 'No.', align: 'left', sortable: false, value: 'num',class:'subheading'},
                    { text: 'Product Name', align: 'left', value: 'product_name',class:'subheading' },
                    { text: 'Purchase Date', align: 'left', value: 'purchase_date',class:'subheading' },
                    { text: 'Quantity', value: 'quantity', align: 'left', class:'subheading' },
                    { text: 'Amount(Ghc)', value: 'amount', align: 'left', class:'subheading' },
                    // { text: '', Value: 'name', align: 'left', class:'subheading' },
                ],
                dialog:false,
                outlet:'Warehouse',
                editedIndex: -1,
                editedItem: {
                    name: '',
                    calories: 0,
                    fat: 0,
                    carbs: 0,
                    protein: 0
                },
                defaultItem: {
                    name: '',
                    calories: 0,
                    fat: 0,
                    carbs: 0,
                    protein: 0
                },
                indiv_supplier:[
                    {
                        num:2,
                        product_name:'Walkie Talkie',
                        purchase_date:'Saturday, 2nd Oct',
                        quantity:30,
                        amount:'Ghc 490'
                    }
                ],
                suppliers: []
            }
        },
        mounted(){
            this.loadCreditors();
        },
        computed:{
            apiSet() {
                return this.$store.getters.getApi
            },
        },
        watch: {
            dialog(val){
                val || this.close()
            }
        },
        methods:{
            loadCreditors(){
                let self = this;
                this.fetchup = true;
                let pebble={
                    oid:this.userData.outlet_id,
                    cid:this.userData.company_id
                }

                axios.post(this.apiSet.postCreditors, pebble)
                    .then(response=>{
                        const deb_show=[];
                        const obj = response.data.data;
                        console.log(obj);
                        // for(let key in obj){
                        for (let key = 0, len = obj.length; key < len; key++) {
                            deb_show.push({
                                id:obj[key].id,
                                num:key,
                                name:obj[key].supplier,
                                invoice:obj[key].invoice,
                                credit:obj[key].amount,
                                date:obj[key].date
                            })
                        }
                        self.suppliers = deb_show;
                        self.fetchup = false;
                        // self.total_debt = Object.values(deb_show).reduce((t, n) => t + parseInt(n.credit), 0);
                    }).catch(
                    e => {
                        console.log(e);
                        self.fetchup = false;
                        this.err.push(e);
                    }
                )
              },
                view_det(indiv){
                                let self = this;
                                this.fetchup = true;

                                this.indiv_sup = indiv.name;
                                this.indiv_amount= indiv.credit;

                                axios.get(this.apiSet.singlePurchaseBuffer+'/'+indiv.invoice)
                                    .then(response=>{
                                        const cred_show=[];
                                        const obj = response.data.data;
                                        console.log(obj);
                                        // for(let key in obj){
                                        for (let key = 0, len = obj.length; key < len; key++) {
                                            cred_show.push({
                                                id:obj[key].id,
                                                num:key,
                                                product_name:obj[key].product_name,
                                                purchase_date:obj[key].created_at,
                                                quantity:obj[key].purr_quantity,
                                                amount:obj[key].purr_ws_subtotal
                                            })
                                        }
                                        self.indiv_supplier = cred_show;
                                        self.fetchup = false;
                                        this.indiv_dialog = true;
                                        // self.total_debt = Object.values(deb_show).reduce((t, n) => t + parseInt(n.credit), 0);
                                    }).catch(
                                    e => {
                                        console.log(e);
                                        self.fetchup = false;
                                        this.err.push(e);
                                    }
                                )
                            },


            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.supplier_statements[this.editedIndex], this.editedItem)
                } else {
                    this.supplier_statements.push(this.editedItem)
                }
                this.close()
            }
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