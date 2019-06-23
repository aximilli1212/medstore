<template>
    <div>

        <v-dialog v-model="sus_dialog" persistent max-width="800px">
            <v-card
                    class="elevation-4"
            >
                <v-toolbar>
                    <v-toolbar-title class="primary--text">Suspended Sales</v-toolbar-title>

                    <v-spacer></v-spacer>
                    <v-btn icon @click.native="closeup">
                        <v-icon color="secondary">mdi-close</v-icon>
                    </v-btn>

                </v-toolbar>
                <v-card-title>
                    <v-chip>Total: {{total}}</v-chip>
                    <v-btn color="secondary" class="elevation-6" @click="loadSuspended" small><v-icon left>mdi-refresh</v-icon> Refresh</v-btn>
                    <v-spacer></v-spacer>
                    <v-text-field
                            v-model="search"
                            append-icon="search"
                            label="Search"
                            outline
                            hide-details
                    ></v-text-field>
                </v-card-title>

                <v-data-table
                        :headers="headers"
                        :items="suspended"
                        :search="search"
                        :loading="fetchup"
                        class="elevation-2"
                >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td>{{ props.item.customer_name }}</td>
                        <td>{{ moment(props.item.sale_date).fromNow()}}</td>
                        <td class="justify-center layout px-0">

                            <v-btn
                                    flat
                                    small
                                    class="mr-2 teal--text cpoint"
                                    @click="unSus(props.item.sus_code)"
                            >
                                <v-icon>
                                mdi-playlist-play
                            </v-icon> Unsuspend</v-btn>



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
                    <template slot="no-data">
                        <v-btn color="primary" @click="loadSuspended">Refresh</v-btn>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                    </v-alert>
                </v-data-table>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="secondary"dark @click.native="closeup"><v-icon left>mdi-close</v-icon>Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!----------------------------------------------UPDATE SINGLE ITEM DIALOG-------------------------------------------------------------------------------->


        <v-snackbar
                :timeout="6000"
                :top="true"
                :right="x === 'right'"
                v-model="su_snackbar"
                color=""
        >
            Register Successfully Opened.
            <v-btn flat color="green" @click.native="su_snackbar = false">Close</v-btn>
        </v-snackbar>

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
        props:[
            'sus_dialog',
        ],
        name: "open_sus",
        $_veeValidate: {
            validator: 'new'
        },
        data: () => ({
            total:0,
            fetchup:false,
            sales_session:{
              outlet:'Retail',
              shift:'Morning',
              open_cash:0,
              user_id:1
            },
            headers: [
                {text: 'ID.', align: 'left', value: 'id',sortable:false},
                {text: 'Customer Name', align: 'left', value: 'customer_name'},
                { text: 'Suspended Date', align: 'left', value: 'sale_date'},
                { text: 'Action', align: 'left', value: 'action'},
            ],
            suspended: [
                {
                    num:1,
                    id:2,
                    sale_date:'02/03/2019',
                    customer_name:'Aximilli',
                }
                            ],
            full_suspended:[],
            su_snackbar:false,
            loader:false,
            shifts: ['Morning', 'Afternoon','Night'],
            search:'',
            customers: [],
            editedIndex: -1,



        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
            apiSet() {
                return this.$store.getters.getApi
            },


        submit_loading(){
            return true;
        },
        submitted(){
            return this.$store.state.submittedState;
        }

        },
        mounted(){
            this.loadSuspended();
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
            submitted() {
                this.clearFields();
                this.su_snackbar=true;
            }
        },

        methods:{

            closeup(){
                eventBus.$emit('close_sus',false);
            },
            loadSuspended(){

                let self = this;
                this.fetchup = true;
                axios.get(this.apiSet.singleSuspended)
                    .then(response=>{
                        const prod_show=[];
                        const obj = response.data.data;
                        // for(let key in obj){
                        for (let key = 0, len = obj.length; key < len; key++) {
                            console.log(obj[key].title);
                            prod_show.unshift({
                                id:obj[key].id,
                                num:key,
                                customer_name:obj[key].name,
                                sale_date:obj[key].created_at,
                                sus_code:obj[key].sus_code,
                            })
                        }
                        self.suspended = prod_show;
                        self.full_suspended = obj;
                        self.total = prod_show.length;
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
            unSus(sus_code){

                 let self = this;
                this.fetchup = true;

                const prod_list=[];
                let bum =[];


                axios.get(this.apiSet.singleSusProduct+'/'+sus_code)
                    .then(response=>{
                        const obj = response.data.data;
                        console.log(obj);
                        for (let key = 0, len = obj.length; key < len; key++) {
                            prod_list.unshift({
                                num:key,
                                id:obj[key].product_id,
                                company_id:obj[key].company_id,
                                outlet_id:obj[key].outlet_id,
                                or_quantity:obj[key].or_quantity,
                                price:obj[key].price,
                                product_name:obj[key].product_name,
                                quantity:obj[key].quantity,
                                discount:obj[key].discount,
                                rt_quantity:obj[key].rt_quantity,
                                sub_total:obj[key].sub_total,
                                sus_code:obj[key].sus_code,
                            });

                        }

                        let full_sus = self.full_suspended.filter(x => x.sus_code === sus_code);

                        bum.push({
                            sus_det:full_sus[0],
                            products:prod_list,
                        });

                        eventBus.$emit('susRelease',bum);
                        self.fetchup = false;
                        self.closeup();
                    }).catch(
                    e => {
                        console.log(e);
                        self.fetchup = false;

                    }
                );







            },

        }
    }

</script>

<style scoped>
    .cpoint{
        cursor:pointer;
    }
    .thead{
        background: #474747 url('/static/img/bg.png');
    }
    .ttext{
        color: #2e3436;
        text-shadow: 0px 2px 3px rgba(0,0,0,0.3);
    }

</style>