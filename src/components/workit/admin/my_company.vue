<template>
    <div>
        <v-dialog v-model="dialog" persistent max-width="400px">
            <!--<v-btn slot="activator" color="secondary" dark class="mb-2"><v-icon left>mdi-plus</v-icon> New Company</v-btn>-->
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
                                            label="Company Tag"
                                            box
                                            v-model="com.company_tag"
                                            v-validate="'required'"
                                            data-vv-name="tag"
                                            :error-messages="errors.collect('tag')"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            label="Company Name"
                                            box
                                            v-model="com.company_name"
                                            v-validate="'required'"
                                            data-vv-name="name"
                                            :error-messages="errors.collect('name')"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Address"
                                            v-model="com.address"
                                    ></v-text-field>
                                </v-flex> <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Location"
                                            v-model="com.location"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Phone No."
                                            placeholder="02XXXXXXXX"
                                            v-model="com.phone_no"
                                            v-validate="'numeric|required'"
                                            data-vv-name="phone_no"
                                            :error-messages="errors.collect('phone_no')"
                                    >

                                    </v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Company Slogan"
                                            v-model="com.company_slogan"
                                    >

                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            box
                                            label="Value Added Tax(Vat)%"
                                            placeholder="0.0%"
                                            v-model="com.vat"
                                            v-validate="'numeric|required'"
                                            data-vv-name="vat"
                                            :error-messages="errors.collect('vat')"
                                    >

                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-select
                                            offset-y
                                            :items="catFetch"
                                            label="Category"
                                            box
                                            v-model="com.category"
                                    ></v-select>
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
                            @click="onCompanyAdd"
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
                <p class="headline ttext mt-3">My Company</p>
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
                    :items="companys"
                    :search="search"
                    :loading="fetchup"
                    class="elevation-8"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.company_tag }}</td>
                    <td>{{ props.item.company_name }}</td>
                    <td>{{ props.item.address }}</td>
                    <td>{{ props.item.location }}</td>
                    <td>{{ props.item.phone_no }}</td>
                    <td>{{ props.item.vat }}</td>
                    <td>{{ props.item.category }}</td>
                    <td class="justify-center layout px-0">

                        <v-btn  small
                                flat
                                class="primary--text cpoint"
                                @click="editItem(props.item)"
                        ><v-icon

                        >
                            mdi-pencil
                        </v-icon> Edit </v-btn>

                        <!--<v-btn  small-->
                                <!--flat-->
                                <!--class="red&#45;&#45;text cpoint"-->
                                <!--@click="deleteItem(props.item)"-->
                        <!--&gt;<v-icon-->

                        <!--&gt;-->
                            <!--mdi-delete-->
                        <!--</v-icon> Delete </v-btn>-->

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
        name: "fms_company",
        data () {
            return {
                loader:false,
                com:{
                    company_tag:'',
                    company_name:'',
                    address:'',
                    location:'',
                    phone_no:'',
                    company_slogan:'',
                    vat:'',
                    category:'',
                },
                search: '',
                side_items:[

                ],
                headers: [
                    { text: 'ID', align: 'left', value: 'id',class:'subheading' },
                    { text: 'Company Tag', align: 'left', value: 'company_tag',class:'subheading' },
                    { text: 'Company Name', align: 'left', value: 'company_name',class:'subheading' },
                    { text: 'Address', align: 'left', value: 'address',class:'subheading' },
                    { text: 'Location', align: 'left', value: 'location',class:'subheading' },
                    { text: 'Phone No.', align: 'left', value: 'phone_no',class:'subheading' },
                    { text: 'Vat %', align: 'left', value: 'vat',class:'subheading' },
                    // { text: 'Company Slogan', align: 'left', value: 'company_slogan',class:'subheading' },
                    { text: 'Products Category', align: 'left', value: 'category',class:'subheading' },
                    { text: 'Actions', align: 'left', value: 'action',class:'subheading' },
                ],
                dialog:false,
                fetchup:false,
                snack:false,
                total:'',
                snackText:false,
                snackColor:'',
                editedIndex: -1,
                companys: [

                ]
            }
        },
        computed:{
            apiSet(){
                return this.$store.getters.getApi
            },
            formTitle () {
                return this.editedIndex === -1 ? 'Add Company' : 'Edit Company'
            },
            btnTitle () {
                return this.editedIndex === -1 ? 'Add Company' : 'Update Company'
            },
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
        },
        mounted(){
            this.setSide();
            this.loadCompanies();

        },

        methods:{
            setSide(){

                this.$store.commit('setSideItems',this.side_items);
                this.$store.commit('setDrawer',false);
            },

            loadCompanies(){
                let self = this;
                this.fetchup = true;
                this.companys = [];
                axios.get(this.apiSet.singleCompany +'/'+self.userData.company_id)
                    .then(response=>{
                        const obj = response.data.data;

                        self.companys.push(obj);
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
                        this.snackText = "sorry an error occurred.";
                        this.snackColor = "red";

                        this.err.push(e);
                    }
                )
            },

            onCompanyAdd(){

                if(this.editedIndex > -1){
                    this.updateExpense();

                }
                else{

                    let self = this;
                    this.$validator.validateAll().then((result)=>{
                        if(result){
                            this.loader = true;
                            const catData=this.com;


                            axios.post(this.apiSet.singleCompany, catData)
                                .then(function (response) {
                                    self.closeup();
                                    self.loadCompanies();
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

                this.editedIndex = this.companys.indexOf(item);
                const index = this.companys.indexOf(item);
                let raw = this.companys[index];
                this.com = Object.assign({}, raw);
                this.dialog = true;
            },


            closeup(){
                this.dialog = false;
                    this.com.company_tag='';
                        this.com.company_name='';
                        this.com.address='';
                        this.com.location='';
                        this.com.phone_no='';
                        this.com.company_slogan='';
                        this.com.vat='';
                        this.com.category='';

                this.editedIndex = -1

            },

            updateExpense() {

                let self = this;

                if (this.editedIndex > -1) {
                    Object.assign(this.companys[this.editedIndex], this.editedItem)

                    let objID = this.editedIndex;
                    let uid = this.companys[objID].id;
                    this.loader = true;

                    console.log(objID);

                    const exData = this.com;

                    axios.patch(this.apiSet.singleCompany + '/' + uid, exData)
                        .then(function (response) {
                            console.log(response);
                            self.loader = false;
                            self.snack = true;
                            self.snackText = "Update Successful";
                            self.snackColor = "green";
                            self.closeup();
                            self.$validator.reset();
                            self.loadCompanies();

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
                    title: 'Delete Company?',
                    message: 'Are you sure you want to Delete Company?',
                    type: 'warning',
                    useConfirmBtn: true,
                    onConfirm: confirmFn
                }
                this.$refs.simplert.openSimplert(obj);

            },

            del(item){
                let self = this;
                let apiUrl = this.$store.state.config.url;
                const index = this.companys.indexOf(item);
                this.companys.splice(index, 1);

                axios.delete(apiUrl+'/company/'+item.id)
                    .then(function(response){
                        console.log(response);
                        self.del_snackbar = true;
                        self.loadCompanies();
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