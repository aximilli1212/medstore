<template>
    <div>
    <v-toolbar
            v-if="!cusID"
            dark
            color="primary lighten-1"
    >
        <!--<v-toolbar-title>Customer</v-toolbar-title>-->
        <v-autocomplete
                :loading="loading"
                :items="items"
                :search-input.sync="search"
                v-model="select"
                cache-items
                class="mx-3"
                flat
                clearable
                hide-no-data
                hide-details
                label="Start typing customer name ..."
                solo-inverted
        ></v-autocomplete>
    </v-toolbar>
    <v-list subheader v-if="cusID">
        <!--<v-subheader class="c_pointer secondary&#45;&#45;text" @click="changeCus">Change Customer</v-subheader>-->
        <v-list-tile
                v-for="item in full_customer"
                :key="item.name"
                avatar
                @click=""

        >
            <v-list-tile-avatar>
               <v-btn outline icon><v-icon color="primary" outline>mdi-account</v-icon></v-btn>
            </v-list-tile-avatar>

            <v-list-tile-content>
                <v-list-tile-title color="secondary subheading" v-html="item.name"></v-list-tile-title>
                <v-list-tile-sub-title class="small grey--text">{{customerType}} {{creditLimit}}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
                <v-btn small flat @click="changeCus"><v-icon color="primary" >mdi-rotate-right</v-icon>Change</v-btn>
            </v-list-tile-action>
        </v-list-tile>
    </v-list>
</div>
</template>

<script>
    import { eventBus } from '../../../main.js';

    export default {
        name: "set-customer",
        data () {
            return {
                loading: false,
                items: [],
                search: null,
                select: null,
                states: [],
                default_customer:{
                address:"New Street",
                    company:"Bank",
                    credit:0,
                    discount_amount:"0",
                    discount_percentage:"0",
                    email:"mai@mail.com",
                    firstname:"Walk-in",
                    id:1,
                    lastname:"Customer",
                    markup:1,
                    name:"Walk-In Customer",
                    num:0,
                    phone_no:"029383938",
                    title:null
            },
                full_customer:[],
            }
        },
        watch: {
            search (val) {
                val && val !== this.select && this.querySelections(val)
            },
            select(val){

                if(!val){
                    return false;
                }
                this.full_customer = [];
                this.dialog = true;
                let res = this.cusData.filter(function(e) {
                    return e.name === val;
                });

                this.full_customer.push(res[0]);
                this.$store.commit('setSaleCustomer',res[0]);
                this.$store.dispatch('doCustomerID',res[0].id);

            },
        },
        mounted(){
            this.loadCustomers();
            this.setWalkin();

            eventBus.$on('changeCus',()=>{
                this.setWalkin();
            });
        },
        created(){
            this.loadCustomers();
        },
        computed:{
            creditLimit() {
                if(this.saleCus.credit > 0){
                    return "[Limit: Ghc "+this.saleCus.credit+"]";
                }
                else{
                    return "";
                }
            },
            customerType() {
                return this.saleCus.credit > 0 ? 'Credit Customer' : 'Cash Customer'
            },
            cusData(){
                return this.$store.getters.getCustomers;
            },
            saleCus(){
                return this.$store.getters.getSaleCustomer;
            },
            cusID(){
                return this.$store.getters.getCustomerID;
            },
        },
        methods: {
            changeCus(){
                this.select = 0;
                this.$store.dispatch('doCustomerID',0);
                this.$store.commit('setSaleCustomer',this.default_customer);
            },
            setWalkin(){

                this.full_customer =[];
                this.full_customer.push(this.saleCus);
                this.$store.dispatch('doCustomerID',this.saleCus.id);
            },
            loadCustomers(){
                // alert('cul loaded');

                const customers = [];
                const obj = this.$store.getters.getCustomers;
                // for(let key in obj){
                for (let key = 0, len = obj.length; key < len; key++) {
                    let fullname = obj[key].firstname +' '+obj[key].lastname;
                    customers.push(
                        fullname,
                    )
                }

                this.states = customers;
                console.log(customers);
            },


            querySelections (v) {
                this.loading = true;
                this.loadCustomers();
                // Simulated ajax query
                setTimeout(() => {
                    this.items = this.states;
                    this.loading = false
                }, 500)
            }
        }
    }
</script>

<style scoped>
    .c_pointer{
        cursor:pointer;
    }

</style>