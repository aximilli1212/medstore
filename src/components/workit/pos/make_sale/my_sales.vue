<template>
    <div>
        <v-btn @click="$router.push('/invoice_list')" color="secondary" dark small class="mb-2"><v-icon left>mdi-plus</v-icon> View Invoice List</v-btn>

        <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-toolbar
                            dense>
                        <v-toolbar-title class="primary--text">Register Details</v-toolbar-title>

                        <v-spacer></v-spacer>


                        <v-btn icon @click="closePrint">
                            <v-icon color="secondary">mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-container grid-list-md elevation-3>
                            <v-card
                            >
                                <v-card-title>

                                    <v-flex sm10>
                                        <h3>{{ses.shift}} Shift @ {{moment(ses.open_time).format('MMM Do YYYY')}}   </h3>
                                    </v-flex>
                                    <v-flex sm2>
                                        <span class="secondary--text align-end"> <small>{{ses.user_name}}</small></span>
                                    </v-flex>
                                    <!--<h4>{{ses.shift}} Shift @ {{// moment(ses.open_time).format('MMM Do YYYY')}}   </h4><span> &#45;&#45; by &#45;&#45; </span><span class="secondary&#45;&#45;text align-end"> <small>  {{ses.user_name}}</small></span>-->

                                </v-card-title>
                                <v-divider></v-divider>
                                <v-list dense>
                                    <v-list-tile>
                                        <v-list-tile-content>Opening Cash:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">Ghc {{ ses.opening_cash}}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>Cash Sales:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">GH¢ {{ses.cash}} </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>Cheque Sales</v-list-tile-content>
                                        <v-list-tile-content class="align-end">GH¢ {{ses.cheque}}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>Visa Sales:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">GH¢ {{ses.visa}}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>MoMo Sales:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">GH¢ {{ses.momo}}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>Credit Sales:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">GH¢ {{ses.credit}}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>Returns:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">GH¢ {{ses.returns}}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-divider></v-divider>
                                    <v-list-tile>
                                        <v-list-tile-content class="subheading">Total Sales:</v-list-tile-content>
                                        <v-list-tile-content class="align-end subheading">GH¢ {{ses.total_sales}}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content class="subheading">Expenses:</v-list-tile-content>
                                        <v-list-tile-content class="align-end subheading">GH¢ {{ses.expenses}}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content class="subheading">Closing Cash:</v-list-tile-content>
                                        <v-list-tile-content class="align-end subheading">GH¢ {{ses.closing_cash}}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content class="subheading green--text text-darken-3">Expected Cash:</v-list-tile-content>
                                        <v-list-tile-content class="align-end subheading">GH¢ {{expCash}}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content class="subheading red--text text-darken-3">Variance in Cash:</v-list-tile-content>
                                        <v-list-tile-content class="align-end subheading">GH¢ {{varCash}}</v-list-tile-content>
                                    </v-list-tile>
                                </v-list>

                                <v-card-actions>
                                    <v-spacer></v-spacer>

                                    <v-btn color="secondary" @click="printSession"><v-icon left>mdi-printer</v-icon>Print Details</v-btn>

                                </v-card-actions>
                            </v-card>
                        </v-container>
                    </v-card-text>
                </v-card>


            </v-dialog>




            <v-card class="thead">
            <v-card-title>
                <v-btn icon color="primary" @click="$router.go(-1)" small><v-icon>mdi-arrow-left-thick</v-icon></v-btn>
                <p class="headline ttext mt-3">My Sessions [ <i class="green--text text--darken-3">{{total}}</i> ]</p>
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
                    <td>{{ props.item.closing_cash }}</td>
                    <td>{{ props.item.open_date }}</td>
                    <td>{{ moment(props.item.open_time).format('h:mm a') }}</td>
                    <td :class="ac">{{ stateup(props.item.session_state)}}</td>
                    <td class="justify-center layout px-0">

                        <v-btn  small
                                flat
                                class="primary--text cpoint"
                                @click="editItem(props.item)"
                        ><v-icon

                        >
                            mdi-open-in-new
                        </v-icon> View</v-btn>

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





        <v-card
                v-show="ses_area"
                id="session_area"
        >
            <header><h1
               style="background: #e3e3e3; font-size: 30pt;text-align:center; line-height: 10mm; border-radius: 0.25em; color: #000; margin: 0 0 1em; padding: 0.5em 0"
            >{{ses.shift}} Shift @ {{moment(ses.open_time).format('MMM Do YYYY')}} By {{ses.user_name}}</h1></header>
            <v-divider></v-divider>
            <table dense>
                <tr>
                    <td>Opening Cash:</td>
                    <td >Ghc {{ ses.opening_cash}}</td>
                </tr>
                <tr>
                    <td>Cash Sales:</td>
                    <td class="align-end">GH¢ {{ses.cash}} </td>
                </tr>
                <tr>
                    <td>Cheque Sales</td>
                    <td class="align-end">GH¢ {{ses.cheque}}</td>
                </tr>
                <tr>
                    <td>Visa Sales:</td>
                    <td class="align-end">GH¢ {{ses.visa}}</td>
                </tr>
                <tr>
                    <td>MoMo Sales:</td>
                    <td class="align-end">GH¢ {{ses.momo}}</td>
                </tr>
                <tr>
                    <td>Credit Sales:</td>
                    <td class="align-end">GH¢ {{ses.credit}}</td>
                </tr>
                <tr>
                    <td>Returns:</td>
                    <td class="align-end">GH¢ {{ses.returns}}</td>
                </tr>
                <v-divider></v-divider>
                <tr>
                    <td class="subheading">Total Sales:</td>
                    <td class="align-end subheading">GH¢ {{ses.total_sales}}</td>
                </tr>
                <tr>
                    <td class="subheading">Expenses:</td>
                    <td class="align-end subheading">GH¢ {{ses.expenses}}</td>
                </tr>

                <tr>
                    <td class="subheading">Closing Cash:</td>
                    <td class="align-end subheading">GH¢ {{ses.closing_cash}}</td>
                </tr>

                <tr>
                    <td class="subheading">Expected Cash:</td>
                    <td class="align-end subheading">GH¢ {{expCash}}</td>
                </tr>
                <tr>
                    <td class="subheading">Variance:</td>
                    <td class="align-end subheading">GH¢ {{varCash}}</td>
                </tr>

                <aside>
                    <v-divider></v-divider>
                    <div class="mt-4">
                        <small class="vsmall">Powered By WorkIT Facility Management System</small>
                    </div>
                </aside>
            </table>
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
                cssText:'  @page { size: A4 portrait }\n' +
                    '    .vsmall{\n' +
                    '        font-size:20px;' +
                    '         text-align:center;\n' +
                    '    }\n' +
                    '    p b{\n' +
                    '        font-weight:bold;\n' +
                    '    }\n' +
                    '    .tems{\n' +
                    '        text-align:center;\n' +
                    '        position:relative;\n' +
                    '        bottom:10px;\n' +
                    '        color:grey;\n' +
                    '        font-size:20px;\n' +
                    '    }\n' +
                    '    .mid{\n' +
                    '        text-align:center;\n' +
                    '        position:relative;\n' +
                    '        left:15px;\n' +
                    '    }\n' +
                    '    .round_end{\n' +
                    '        border-radius:5px 5px 0px 0px;\n' +
                    '        border:1px dashed gray;\n' +
                    '        width:auto;\n' +
                    '        height:auto;\n' +
                    '    }\n' +
                    '    .pulse {\n' +
                    '        animation: opacityPulse 1s ease-out;\n' +
                    '        animation-iteration-count: infinite;\n' +
                    '        opacity: 0;\n' +
                    '    }\n' +
                    '    @-webkit-keyframes opacityPulse {\n' +
                    '        0% {opacity: 0.0;}\n' +
                    '        50% {opacity: 1.0;}\n' +
                    '        100% {opacity: 0.0;}\n' +
                    '    }\n' +
                    '    body{\n' +
                    '        background:#EEE;\n' +
                    '        /* font-size:0.9em !important; */\n' +
                    '    }\n' +
                    '    /* reset */\n' +
                    '\n' +
                    '    *\n' +
                    '    {\n' +
                    '        border: 0;\n' +
                    '        color: inherit;\n' +
                    '        font-family: inherit;\n' +
                    '        font-size: inherit;\n' +
                    '        font-style: inherit;\n' +
                    '        font-weight: inherit;\n' +
                    '        list-style: none;\n' +
                    '        line-height: inherit;\n' +
                    '        margin: 0;\n' +
                    '        padding: 0;\n' +
                    '        text-decoration: none;\n' +
                    '        vertical-align: top;\n' +
                    '    }\n' +
                    '\n' +
                    '\n' +
                    '\n' +
                    '    /* table */\n' +
                    '\n' +
                    '    table { font-size: 26pt; line-height: 10mm ;table-layout: fixed; width: 100%; }\n' +
                    '    table { border-collapse: separate; border-spacing: 2px; }\n' +
                    '    th, td { border-width: 1px; padding: 0.5em; position: relative; text-align: left; }\n' +
                    '    th, td { border-radius: 0.25em; border-style: solid; }\n' +
                    '    th { background: #EEE; border-color: #BBB; }\n' +
                    '    td { border-color: #DDD; }\n' +
                    '\n' +
                    '    /* page */\n' +
                    '\n' +
                    '    html { font: 25px/1 \'Open Sans\', sans-serif; overflow: auto; padding: 0.5in; }\n' +
                    '    html { background: #999; cursor: default; }\n' +
                    '\n' +
                    '    body { box-sizing: border-box; height: 11in; margin: 0 auto; padding: 0.5in; width: 8.5in; }\n' +
                    '    body { background: #FFF; border-radius: 1px; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); }\n' +
                    '\n' +
                    '    /* header */\n' +
                    '\n' +
                    '    header { margin: 0 0 1em; }\n' +
                    '    header:after { clear: both; content: ""; display: table; }\n' +
                    '\n' +
                    '    header h1 { background: #e3e3e3; font-size: 30pt;text-align:center; line-height: 10mm; border-radius: 0.25em; color: #000; margin: 0 0 1em; padding: 0.5em 0; }\n' +
                    '    header span, header img { display: block; float: right; }\n' +
                    '    header span { margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative;font-size: 24pt; line-height: 18mm }\n' +
                    '    header img { max-height: 100%; max-width: 100%; }\n' +
                    '\n' +
                    '    div p {font-size: 20pt; line-height: 12mm;}\n' +
                    '\n' +
                    '    /* article */\n' +
                    '\n' +
                    '    article, article address, table.meta, table.inventory { margin: 0 0 3em; }\n' +
                    '    article:after { clear: both; content: ""; display: table; }\n' +
                    '    article h1 { clip: rect(0 0 0 0); position: absolute; }\n' +
                    '\n' +
                    '    article address { float: left; font-size: 125%; font-weight: bold; }\n' +
                    '\n' +
                    '    /* table meta & balance */\n' +
                    '\n' +
                    '    table.meta, table.balance { float: right; width: 36%; }\n' +
                    '    table.meta:after, table.balance:after { clear: both; content: ""; display: table; }\n' +
                    '\n' +
                    '    /* table meta */\n' +
                    '\n' +
                    '    table.meta th { width: 40%; }\n' +
                    '    table.meta td { width: 60%; }\n' +
                    '\n' +
                    '    /* table items */\n' +
                    '\n' +
                    '    table.inventory { clear: both; width: 85%; }\n' +
                    '    table.inventory th { font-weight: bold; text-align: center; font-size:100% }\n' +
                    '\n' +
                    '    table.inventory th.name { width: 50%; }\n' +
                    '    /*table.inventory th:nth-child(2) { width: 12%; }*/\n' +
                    '\n' +
                    '\n' +
                    '\n' +
                    '    /* table balance */\n' +
                    '    table.balance {position:relative;right:190px}\n' +
                    '    table.balance th,\n' +
                    '    table.balance td { width: 180px; }\n' +
                    '    table.balance tr.grant td { width: 380px; }\n' +
                    '    table.balance tr.grand {font-weight:bold; }\n' +
                    '    table.balance td { text-align: center; }\n' +
                    '\n' +
                    '    /* aside */\n' +
                    '\n' +
                    '    aside h1 { border: none; border-width: 0 0 1px; margin: 0 0 1em; }\n' +
                    '    aside h1 { border-color: #999; border-bottom-style: solid; }\n' +
                    '\n' +
                    '    /* javascript */\n' +
                    '\n' +
                    '    .add, .cut\n' +
                    '    {\n' +
                    '        border-width: 1px;\n' +
                    '        display: block;\n' +
                    '        font-size: .8rem;\n' +
                    '        padding: 0.25em 0.5em;\n' +
                    '        float: left;\n' +
                    '        text-align: center;\n' +
                    '        width: 0.6em;\n' +
                    '    }\n' +
                    '\n' +
                    '    .add, .cut\n' +
                    '    {\n' +
                    '        background: #9AF;\n' +
                    '        box-shadow: 0 1px 2px rgba(0,0,0,0.2);\n' +
                    '        background-image: -moz-linear-gradient(#00ADEE 5%, #0078A5 100%);\n' +
                    '        background-image: -webkit-linear-gradient(#00ADEE 5%, #0078A5 100%);\n' +
                    '        border-radius: 0.5em;\n' +
                    '        border-color: #0076A3;\n' +
                    '        color: #FFF;\n' +
                    '        cursor: pointer;\n' +
                    '        font-weight: bold;\n' +
                    '        text-shadow: 0 -1px 2px rgba(0,0,0,0.333);\n' +
                    '    }\n' +
                    '\n' +
                    '    .add { margin: -2.5em 0 0; }\n' +
                    '\n' +
                    '    .add:hover { background: #00ADEE; }\n' +
                    '\n' +
                    '    .cut { opacity: 0; position: absolute; top: 0; left: -1.5em; }\n' +
                    '    .cut { -webkit-transition: opacity 100ms ease-in; }\n' +
                    '\n' +
                    '    tr:hover .cut { opacity: 1; }\n' +
                    '\n' +
                    '    @media print {\n' +
                    '        * { -webkit-print-color-adjust: exact; }\n' +
                    '        html { background: none; padding: 0; }\n' +
                    '        body { box-shadow: none; margin: 0; }\n' +
                    '        span:empty { display: none; }\n' +
                    '        .add, .cut { display: none; }\n' +
                    '    }\n' +
                    '\n' +
                    '    @page { margin: 0; }\n',
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
                    { text: 'Shift', align: 'left', value: 'shift',class:'subheading' },
                    { text: 'Username', align: 'left', value: 'user_name',class:'subheading' },
                    { text: 'Opening Cash', align: 'left', value: 'opening_cash',class:'subheading' },
                    { text: 'Closing Cash', align: 'left', value: 'closing_cash',class:'subheading' },
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
            },
            expCash(){
                return (parseFloat(this.ses.opening_cash) + parseFloat(this.ses.total_sales) ) - this.ses.expenses;
            },
            varCash(){
                return (this.ses.closing_cash - this.expCash);
            }
        },
        mounted(){
            this.setSide();
            this.loadSesData();

        },

        methods:{
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
                    user_id:this.userData.id,
                };

                axios.post(this.apiSet.mySession,sesUp)
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
                this.ses_area = false;
                this.dialog = true;
            },

            closeup(){
                this.dialog = false;
                this.ses_area = false;
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

                }
                else {
                    console.log(this.editedItem);

                }
            },

            printSession(){
                this.ses_area = true;
                const d = new Printd();


                d.print( document.getElementById('session_area'), this.cssText);
            },

            closePrint(){
                this.ses_area = false;
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