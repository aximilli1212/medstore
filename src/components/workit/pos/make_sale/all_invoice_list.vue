<template>
    <div>
        <v-btn @click="$router.push('/sales_report')" color="primary" dark small class="mb-2"><v-icon left>mdi-cash</v-icon> View Sales Report</v-btn>


        <v-card class="thead">
            <v-card-title>
                <v-btn icon color="primary" @click="$router.go(-1)" small><v-icon>mdi-arrow-left-thick</v-icon></v-btn>
                <p class="headline ttext mt-3">All Invoices Generated [ <i class="green--text text--darken-3">{{total}}</i> ]</p>
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
                    :items="sesData"
                    :search="search"
                    :loading="fetchup"
                    class="elevation-8"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.invoice_no }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.payment_type }}</td>
                    <td>{{ props.item.total_items }}</td>
                    <td>{{ props.item.total }}</td>
                    <td>{{ moment(props.item.date_printed).format('MMMM Do YYYY') }}</td>
                    <td>{{ moment(props.item.date_printed).format('h:mm a') }} [ {{ moment(props.item.date_printed).fromNow() }} ] </td>
                    <td class="justify-center layout px-0">

                        <v-btn  small
                                flat
                                class="primary--text cpoint"
                                @click="viewInvoice(props.item.invoice_no)"
                        ><v-icon
                        >
                            mdi-open-in-new
                        </v-icon> View</v-btn>


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
            <v-btn flat :color="snackColor" @click.native="snack = false">Close</v-btn>
        </v-snackbar>

        <simplert :useRadius="true"
                  :useIcon="true"
                  ref="simplert">
        </simplert>



    </div>
</template>

<script>
    let axios = require("axios");
    import Printd from 'printd';

    export default {
        name: "outlets",
        data () {
            return {
                loader:false,
                ac:'',
                ses:{
                    id:1,
                    shift:'Afternoon',
                    user_name:'aximilli',
                    opening_cash:'3000',
                    open_date:'24/07/2019',
                    open_time:'3 minutes ago',
                    session_state:'Active'
                },
                search: '',
                ses_area:false,
                side_items:[

                ],
                headers: [
                    { text: 'ID', align: 'left', value: 'id',class:'subheading' },
                    { text: 'Invoice', align: 'left', value: 'invoice_no',class:'subheading' },
                    { text: 'Customer Name', align: 'left', value: 'name',class:'subheading' },
                    { text: 'Type', align: 'left', value: 'payment_type',class:'subheading' },
                    { text: 'Items', align: 'left', value: 'total_items',class:'subheading' },
                    { text: 'Cost', align: 'left', value: 'total',class:'subheading' },
                    { text: 'Date Printed', align: 'center', value: 'date_printed',class:'subheading' },
                    { text: 'Time Printed', align: 'center', value: 'date_printed',class:'subheading' },
                    { text: 'Actions', align: 'center', value: 'session_state',class:'subheading' },
                ],
                dialog:false,
                fetchup:false,
                snack:false,
                total:'',
                snackText:false,
                snackColor:'',
                editedIndex: -1,
                sesData: [
                ]
            }
        },
        computed:{
            apiSet(){
                return this.$store.getters.getApi
            },
        },
        mounted(){
            this.setSide();
            this.loadSesData();
            this.showHead();

        },

        methods:{
            showHead(){
                this.$store.commit('setHead',true);
            },
            setSide(){

                this.$store.commit('setSideItems',this.side_items);
                this.$store.commit('setDrawer',false);
            },
            stateup(i){

                if(i === '1'){
                    // this.ac = 'green--text darken-3';
                    return 'Active';
                }

                if(i === '0'){
                    // this.ac = 'red--text darken-3';
                    return 'In-Active';
                }

            },

            loadSesData(){
                let self = this;
                this.fetchup = true;

                let sesUp = {
                    oid:this.userData.outlet_id,
                    cid:this.userData.company_id,
                    uid:this.userData.id,
                };



                axios.get(this.apiSet.c_sales)
                    .then(response=>{
                        const obj = response.data.data;
                        self.sesData =obj;
                        self.total = obj.length;
                        self.fetchup = false;

                        this.snack = true;
                        this.snackText = "Data Was Successfully loaded.";
                        this.snackColor = "green";

                    }).catch(
                    e => {
                        console.log(e);
                        self.loader = false;
                        this.snack = true;
                        this.snackText = "Sorry network error occurred.";
                        this.snackColor = "red";

                        this.err.push(e);
                    }
                )
            },

            viewInvoice(invoice_no){
                let self = this;
                this.fetchup = true;

                  let csales = this.sesData.filter(function(e) {
                    return e.invoice_no === invoice_no;
                });

                this.$store.commit('setCurrentSales',csales);




                let sesUp = {
                    invoice_no:invoice_no,

                };

                axios.post(this.apiSet.post_cprod,sesUp)
                    .then(response=>{
                        const obj = response.data.data;

                        self.$store.commit('setCurrentProducts',obj);
                        self.fetchup = false;

                        self.$router.push('/buffer_invoice');

                    }).catch(
                    e => {
                        console.log(e);
                        self.loader = false;
                        this.snack = true;
                        this.snackText = "Sorry network error occurred.";
                        this.snackColor = "red";

                        this.err.push(e);
                    });

            },

            editItem (item) {
                this.editedIndex = this.sesData.indexOf(item);
                const index = this.sesData.indexOf(item);
                let raw = this.sesData[index];
                this.ses = Object.assign({}, raw);
                this.dialog = true;
            },

            closeup(){
                this.dialog = false;
                this.out.outlet_name='';
                this.out.location='';
                this.out.phone_no='';
                this.out.company_id=1;
                this.editedIndex = -1

            },

            printSession(){
                const d = new Printd();

                d.print( document.getElementById('session_area'), this.cssText);
                this.closePrint();
            },

            closePrint(){
                this.dialog = false;
            },

            deleteItem (item) {
                let self = this;
                // let confirmFn = this.del(item);

                let confirmFn = function() {
                    self.del(item);
                }

                let obj = {
                    title: 'Delete Shift?',
                    message: 'Are you sure you want to Delete Shift?',
                    type: 'warning',
                    useConfirmBtn: true,
                    onConfirm: confirmFn
                }
                this.$refs.simplert.openSimplert(obj);
            },

            del(item){
                let self = this;
                let apiUrl = this.$store.state.config.url;
                const index = this.sesData.indexOf(item);
                this.sesData.splice(index, 1);

                axios.delete(apiUrl+'/outlet/'+item.id)
                    .then(function(response){
                        console.log(response);
                        self.del_snackbar = true;
                        self.loadsesData();
                        self.snack = true;
                        self.snackText = "Data Successfully Deleted";
                        self.snackColor ="red";

                    }).catch(function(error){
                    self.snack = true;
                    self.snackText = "Sorry. Network Error occured.";
                    self.snackColor ="red";
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