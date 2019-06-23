<template>
    <div>
        <v-dialog v-model="dialog" persistent max-width="400px">
            <v-btn slot="activator" color="secondary" dark class="mb-2"><v-icon left>mdi-plus</v-icon> New Outlet</v-btn>
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
                                            label="Outlet Name"
                                            box
                                            v-model="out.outlet_name"
                                            v-validate="'required'"
                                            data-vv-name="name"
                                            :error-messages="errors.collect('name')"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-select
                                            box
                                            :items="cat"
                                            label="Outlet Category"
                                            v-model="out.cat"
                                            offset-y
                                    ></v-select>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Officer In Charge"
                                            v-model="out.officer"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Location"
                                            v-model="out.location"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Phone No."
                                            placeholder="02XXXXXXXX"
                                            v-model="out.phone_no"
                                    >

                                    </v-text-field>
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
                <p class="headline ttext mt-3">All Outlets [ <i class="green--text text--darken-3">{{total}}</i> ]</p>
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
                    :items="outlets"
                    :search="search"
                    :loading="fetchup"
                    class="elevation-8"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.outlet_name }}</td>
                    <td>{{ props.item.officer }}</td>
                    <td>{{ props.item.cat }}</td>
                    <td>{{ props.item.location }}</td>
                    <td>{{ props.item.phone_no }}</td>
                    <td class="justify-center layout px-0">

                        <v-btn  small
                                flat
                                class="primary--text cpoint"
                                @click="editItem(props.item)"
                        ><v-icon

                        >
                            mdi-pencil
                        </v-icon> Edit </v-btn>

                        <v-btn  small
                                flat
                                class="red--text cpoint"
                                @click="deleteItem(props.item,props.item.id)"
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
                out:{
                    outlet_name:'',
                    location:'',
                    phone_no:'',
                    cat:'',
                    officer:'',
                },
                cat:['INTERNAL','EXTERNAL'],
                search: '',
                side_items:[

                ],
                headers: [
                    { text: 'ID', align: 'left', value: 'id',class:'subheading' },
                    { text: 'Outlet Name', align: 'left', value: 'outlet_name',class:'subheading' },
                    { text: 'Officer In Charge', align: 'left', value: 'officer',class:'subheading' },
                    { text: 'Category', align: 'left', value: 'cat',class:'subheading' },
                    { text: 'Location', align: 'left', value: 'location',class:'subheading' },
                    { text: 'Phone No.', align: 'left', value: 'phone_no',class:'subheading' },
                    { text: 'Actions', align: 'center', value: 'action',class:'subheading' },
                ],
                dialog:false,
                fetchup:false,
                snack:false,
                total:'',
                snackText:false,
                snackColor:'',
                editedIndex: -1,
                outlets: [
                ]
            }
        },
        computed:{
            apiSet(){
                return this.$store.getters.getApi
            },
            formTitle () {
                return this.editedIndex === -1 ? 'Add Outlet' : 'Edit Outlet'
            },
            btnTitle () {
                return this.editedIndex === -1 ? 'Add Outlet' : 'Update Outlet'
            }
        },
        mounted(){
            this.setSide();
            this.loadOutlets();

        },

        methods:{
            setSide(){

                this.$store.commit('setSideItems',this.side_items);
                this.$store.commit('setDrawer',false);
            },

            loadOutlets(){
                let self = this;
                this.fetchup = true;

                let sData = this.userData.company_id;
                // axios.get(this.apiSet.allOutlets)

                axios.get(this.apiSet.companyOutlets+'/'+ sData)
                    .then(response=>{
                        const obj = response.data.data;
                        console.log(obj)

                        self.outlets =obj;
                        self.total = obj.length;
                        self.fetchup = false;
                        self.$store.commit('setOutlets',obj);

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
                            catData.company_id = this.userData.company_id;


                            axios.post(this.apiSet.singleOutlet, catData)
                                .then(function (response) {
                                    self.closeup();
                                    self.loadOutlets();
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

                this.editedIndex = this.outlets.indexOf(item);
                const index = this.outlets.indexOf(item);
                let raw = this.outlets[index];
                this.out = Object.assign({}, raw);
                this.dialog = true;
            },


            closeup(){
                this.dialog = false;
                        this.out.outlet_name='';
                        this.out.officer='';
                        this.out.cat='';
                        this.out.location='';
                        this.out.phone_no='';
                        this.out.company_id=1;

                this.editedIndex = -1

            },

            updateOutlet() {

                let self = this;

                if (this.editedIndex > -1) {
                    Object.assign(this.outlets[this.editedIndex], this.editedItem)

                    let objID = this.editedIndex;
                    let uid = this.outlets[objID].id;
                    this.loader = true;


                    const exData = this.out;

                    axios.patch(this.apiSet.singleOutlet + '/' + uid, exData)
                        .then(function (response) {
                            console.log(response);
                            self.loader = false;
                            self.snack = true;
                            self.snackText = "Update Successful";
                            self.snackColor = "green";
                            self.closeup();
                            self.$validator.reset();
                            self.loadOutlets();

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

            deleteItem (item,h) {
                let self = this;

                if( h === 1){

                    let obj_non = {
                        title: 'Sorry !',
                        message: 'You Cannot Delete Default Outlet?',
                        type: 'warning',
                        // useConfirmBtn: true,
                    }

                    this.$refs.simplert.openSimplert(obj_non);
                    return false;
                }

                let confirmFn = function() {
                    self.del(item);
                }

                let obj = {
                    title: 'Delete Outlet?',
                    message: 'Are you sure you want to Delete Outlet?',
                    type: 'warning',
                    useConfirmBtn: true,
                    onConfirm: confirmFn
                }

                this.$refs.simplert.openSimplert(obj);

            },

            del(item){
                let self = this;
                let apiUrl = this.$store.state.config.url;
                const index = this.outlets.indexOf(item);
                this.outlets.splice(index, 1);

                axios.delete(apiUrl+'/outlet/'+item.id)
                    .then(function(response){
                        self.del_snackbar = true;
                        self.loadOutlets();
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