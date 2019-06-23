<template>
    <div>
        <v-dialog v-model="dialog" persistent max-width="400px">
            <v-card>
                <v-toolbar >
                    <v-toolbar-title class="primary--text">{{formTitle}}</v-toolbar-title>

                    <v-spacer></v-spacer>


                    <v-btn icon @click.native="closeup">
                        <v-icon color="secondary">mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>


                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container grid-list-md elevation-3>
                            <v-layout wrap >

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            label="Shift"
                                            box
                                            v-model="ses.shift"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Username"
                                            v-model="ses.user_name"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Opening Cash"
                                            v-model="ses.opening_cash"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Open Date"
                                            v-model="ses.open_date"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Opening Cash"
                                            v-model="ses.open_time"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="State"
                                            v-model="ses.session_state"
                                    ></v-text-field>
                                </v-flex>

                            </v-layout>
                        </v-container>
                    </v-form>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="primary" flat @click.native="closeup">Close</v-btn>

                    <v-btn
                            @click="onOutletAdd"
                            color="secondary"
                            :loading="loader"
                            :disabled="loader"

                    ><v-icon left>mdi-library-plus</v-icon>{{btnTitle}}</v-btn>

                </v-card-actions>
            </v-card>
        </v-dialog>



        <v-card class="thead">
            <v-card-title>
                <v-btn icon color="primary" @click="$router.go(-1)" small><v-icon>mdi-arrow-left-thick</v-icon></v-btn>
                <p class="headline ttext mt-3">All Active Sessions [ <i class="green--text text--darken-3">{{total}}</i> ]</p>
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
                    <td>{{ props.item.shift }}</td>
                    <td>{{ props.item.user_name }}</td>
                    <td>{{ props.item.opening_cash }}</td>
                    <td>{{ props.item.open_date }}</td>
                    <td>{{ props.item.open_time }}</td>
                    <td :class="props.item.session_state === '0' ? 'red--text': 'green--text subheading'">{{setStatus(props.item.session_state)}}</td>
                    <td class="justify-center layout px-0">

                        <v-btn  small
                                flat
                                class="primary--text cpoint"
                                @click="editItem(props.item)"
                        ><v-icon>
                            mdi-pencil
                        </v-icon> Edit </v-btn>

                        <v-btn  small
                                flat
                                class="red--text cpoint"
                                @click="deleteItem(props.item)"
                        ><v-icon

                        >
                            mdi-delete
                        </v-icon> Delete </v-btn>

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
    export default {
        name: "outlets",
        data () {
            return {
                loader:false,
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
                side_items:[

                ],
                headers: [
                    { text: 'ID', align: 'left', value: 'id',class:'subheading' },
                    { text: 'Shift', align: 'left', value: 'shift',class:'subheading' },
                    { text: 'Username', align: 'left', value: 'user_name',class:'subheading' },
                    { text: 'Opening Cash', align: 'left', value: 'opening_cash',class:'subheading' },
                    { text: 'Open Date', align: 'left', value: 'open_date',class:'subheading' },
                    { text: 'Open Time', align: 'center', value: 'open_time',class:'subheading' },
                    { text: 'State', align: 'center', value: 'session_state',class:'subheading' },
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
            formTitle () {
                return this.editedIndex === -1 ? 'Add Shift' : 'Edit Shift'
            },

            btnTitle () {
                return this.editedIndex === -1 ? 'Add Shift' : 'Update Shift'
            }
        },
        mounted(){
            this.setSide();
            this.loadSesData();

        },

        methods:{
            setStatus(s){
              if(parseInt(s)){
                  return "Active"
              }
              else{
                  return "Ended"
              }
            },
            setSide(){

                this.$store.commit('setSideItems',this.side_items);
                this.$store.commit('setDrawer',false);
            },
            stateup(i){

                if(i){
                    return 'Active';
                }
                else{
                    return 'In-Active';
                }

            },

            loadSesData(){
                let self = this;
                this.fetchup = true;
                axios.get(this.apiSet.saleSession)
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

            onOutletAdd(){

                if(this.editedIndex > -1){
                    this.updateOutlet();
                }
                else{
                    let self = this;
                    this.$validator.validateAll().then((result)=>{
                        if(result){
                            this.loader = true;
                            const catData=this.out;

                            axios.post(this.apiSet.singleOutlet, catData)
                                .then(function (response) {
                                    self.closeup();
                                    self.loadsesData();
                                    self.loader = false;
                                    self.snack=true;
                                    self.snackText="Success. Data was successfully added.";
                                    self.snackColor="green";
                                })
                                .catch(function (error) {
                                    self.loader = false;
                                    self.snack=true;
                                    self.snackText="Error.Sorry an error occured.";
                                    self.snackColor="red";
                                });
                        }
                        else{
                            self.snack=true;
                            self.snackText="Error. Please correct form errors.";
                            self.snackColor="red";
                            return false;
                        }
                    });
                }
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

            updateOutlet() {

                let self = this;

                if (this.editedIndex > -1) {
                    Object.assign(this.sesData[this.editedIndex], this.ses);

                    let objID = this.editedIndex;
                    let uid = this.sesData[objID].id;
                    this.loader = true;

                    console.log(objID);

                    const exData = this.ses;

                    axios.patch(this.apiSet.singleOutlet + '/' + uid, exData)
                        .then(function (response) {
                            console.log(response);
                            self.loader = false;
                            self.snack = true;
                            self.snackText = "Update Successful";
                            self.snackColor = "green";
                            self.closeup();
                            self.$validator.reset();
                            self.loadSesData();

                        })
                        .catch(function (error) {
                            console.log(error);
                            self.loader = false;
                            this.snack = true;
                            this.snackText = "Network erorr occured."
                            this.snackColor = "red"
                        });

                } else {
                    console.log(this.editedItem);

                }
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