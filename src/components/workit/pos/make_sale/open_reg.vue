<template>
    <div>

        <v-spacer></v-spacer>
        <v-dialog v-model="creg" persistent max-width="600px">
            <v-card>
                <v-toolbar
                dense>
                    <v-toolbar-title class="primary--text">Close Register</v-toolbar-title>

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
                                        <h4>{{getSaleSession.shift}} Shift @ {{moment(getSaleSession.open_time).format('MMM Do YYYY')}}   </h4>
                                    </v-flex>
                                    <v-flex sm2>
                                        <span class="secondary--text align-end"> <small>{{getSaleSession.user_name}}</small></span>
                                    </v-flex>

                                </v-card-title>
                                <v-divider></v-divider>
                                <v-list dense>
                                    <v-list-tile>
                                        <v-list-tile-content>Opening Cash:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">Ghc {{ getSaleSession.opening_cash}}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>Cash Sales:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">GH¢ {{shift_sales.cash}} </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>Cheque Sales</v-list-tile-content>
                                        <v-list-tile-content class="align-end">GH¢ {{shift_sales.cheque}}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>Visa Sales:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">GH¢ {{shift_sales.visa}}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>MoMo Sales:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">GH¢ {{shift_sales.momo}}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>Credit Sales:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">GH¢ {{shift_sales.credit}}</v-list-tile-content>
                                    </v-list-tile>

                                    <v-list-tile>
                                        <v-list-tile-content>Returns:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">GH¢ {{shift_sales.returns}}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-divider></v-divider>
                                    <v-list-tile>
                                        <v-list-tile-content class="subheading">Total Sales:</v-list-tile-content>
                                        <v-list-tile-content class="align-end subheading">GH¢ {{tsale}}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content class="subheading">Expenses:</v-list-tile-content>
                                        <v-list-tile-content class="align-end subheading">GH¢ {{ses_expenses}}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content class="subheading">Closing Cash:</v-list-tile-content>
                                        <v-list-tile-content class="align-end subheading">GH¢ {{close_cash}}</v-list-tile-content>
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



        <!--REGISTER DIALOG/-->

        <v-dialog v-model="reg_dialog" persistent max-width="400px">
            <v-card>
                <v-toolbar>
                    <v-toolbar-title class="primary--text">Point of Sale</v-toolbar-title>

                    <v-spacer></v-spacer>


                    <v-btn v-if="ses" icon @click="closeup">
                        <v-icon color="secondary">mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-flex xs12>
                    <v-progress-linear
                            :active="hold_up"
                            class="ma-0"
                            color="red darken-3"
                            height="2"
                            indeterminate
                    ></v-progress-linear>
                </v-flex>
                <v-card-text>
                        <v-container  v-if="ses" grid-list-md elevation-3>
                            <v-layout wrap align-centres justify-centre>
                                <v-flex xs12 sm12 md12>
                                    <v-alert  v-if="end_init" :value="true" color="primary" icon="info">
                                        Your {{ getSaleSession.shift}} shift is active <v-icon class="pulse green--text text-darken-3" small small >mdi-checkbox-blank-circle</v-icon>
                                    </v-alert>
                                </v-flex>

                                <v-flex  sm12>
                                    <v-text-field
                                            v-if="!end_init"
                                            label="Total Cash Gh¢ "
                                            type="number"
                                            required
                                            box
                                            v-model="close_cash"
                                            v-validate="'numeric|required'"
                                            data-vv-name="close_cash"
                                            :error-messages="errors.collect('close_cash')"
                                    ></v-text-field>
                                    <v-btn v-if="end_init" @click="closeup" dark class="elevation-6" color="green darken-3"> <v-icon left>mdi-autorenew</v-icon> Continue Shift</v-btn>
                                </v-flex>
                                <v-flex v-if="end_init">
                                    <v-btn @click="init_close"dark class="elevation-6" color="red darken-3"> <v-icon left>mdi-power</v-icon> End Shift</v-btn>
                                </v-flex>

                                <v-flex v-if="!end_init" class="close_reg" >
                                    <v-btn @click="end_shift" dark class="elevation-6" color="red darken-3"> <v-icon left>mdi-close-outline</v-icon> Close Register</v-btn>
                                </v-flex>


                                <v-flex xs12 md12 sm12>
                                    <v-card>
                                        <v-card-title><h4>Shift Details</h4></v-card-title>
                                        <v-divider></v-divider>
                                        <v-list dense>
                                            <v-list-tile>
                                                <v-list-tile-content>Opening Cash:</v-list-tile-content>
                                                <v-list-tile-content class="align-end">Ghc {{ getSaleSession.opening_cash}}</v-list-tile-content>
                                            </v-list-tile>
                                            <v-list-tile>
                                                <v-list-tile-content>Time started:</v-list-tile-content>
                                                <v-list-tile-content class="align-end">{{moment( getSaleSession.open_time).fromNow()}} </v-list-tile-content>
                                            </v-list-tile>
                                        </v-list>
                                    </v-card>

                                    <v-alert  :value="true" color="grey darken-3 " icon="info">
                                       If you want to change shift details, Please contact Administrator.
                                    </v-alert>

                                </v-flex>


                            </v-layout>
                        </v-container>
                    <v-container v-else grid-list-md elevation-3>
                            <v-layout wrap >
                                <v-flex xs12 sm12 md12>
                                    <v-select
                                            class="mt-0"
                                            offset-y
                                            v-model="sales_session.outlet"
                                            :items="outty"
                                            label="Outlet"
                                            placeholder="Please Select Outlet"
                                            box
                                            v-validate="'required'"
                                            data-vv-name="outlet"
                                            :error-messages="errors.collect('outlet')"
                                    ></v-select>
                                </v-flex>

                                <v-flex xs6 sm6 md6>
                                    <v-select
                                            class="mt-0"
                                            offset-y
                                            v-model="sales_session.shift"
                                            :items="shifts"
                                            label="Shift"
                                            placeholder="Please Select Shift"
                                            box
                                            v-validate="'required'"
                                            data-vv-name="shift"
                                            :error-messages="errors.collect('shift')"
                                    ></v-select>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-menu
                                            ref="menu"
                                            :close-on-content-click="false"
                                            v-model="menu"
                                            :nudge-right="40"
                                            :return-value.sync="sales_session.open_date"
                                            lazy
                                            transition="scale-transition"
                                            offset-y
                                            full-width
                                            min-width="290px"
                                    >
                                        <v-text-field
                                                class="mt-0 ml-2"
                                                box
                                                :value="openDate"
                                                slot="activator"
                                                label="Open Date"
                                                readonly
                                        ></v-text-field>
                                        <v-date-picker
                                                v-model="sales_session.open_date"
                                                no-title
                                                scrollable
                                                color="secondary"
                                                header-color="primary"
                                        >
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                            <v-btn color="primary" @click="$refs.menu.save(sales_session.open_date)">OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-flex>

                                <v-flex xs12 md12 sm12>
                                    <v-card>
                                        <v-card-title><h4>Cash In Hand</h4></v-card-title>
                                        <v-divider></v-divider>
                                        <v-list >
                                            <v-list-tile>
                                                <v-text-field
                                                        label="Opening Cash Gh¢ "
                                                        type="number"
                                                        required
                                                        box
                                                        v-model="sales_session.opening_cash"
                                                        v-validate="'numeric|required'"
                                                        data-vv-name="open_cash"
                                                        :error-messages="errors.collect('open_cash')"
                                                ></v-text-field>
                                            </v-list-tile>
                                        </v-list>
                                    </v-card>

                                </v-flex>


                            </v-layout>
                        </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions v-if="!ses">
                    <v-spacer></v-spacer>
                    <v-btn
                            @click="closeup"
                            color="primary"
                            flat
                    >Cancel</v-btn>

                    <v-btn
                            @click="openRegister"
                            color="secondary"
                            :loading="loader"
                            :disabled="loader"

                    ><v-icon left>mdi-window-open</v-icon>{{sessionState}}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>



        <!----------------------------------------------UPDATE SINGLE ITEM DIALOG-------------------------------------------------------------------------------->


        <v-card
        v-show="ses_area"
        id="session_area"
        style="z-index:-1"
        >
            <header><h1>{{getSaleSession.shift}} Shift @ {{moment(getSaleSession.open_time).format('MMM Do YYYY')}} By {{getSaleSession.user_name}}</h1></header>
            <v-divider></v-divider>
            <table dense>
                <tr>
                    <td>Opening Cash:</td>
                    <td >Ghc {{ getSaleSession.opening_cash}}</td>
                </tr>
                <tr>
                    <td>Cash Sales:</td>
                    <td class="align-end">GH¢ {{shift_sales.cash}} </td>
                </tr>
                <tr>
                    <td>Cheque Sales</td>
                    <td class="align-end">GH¢ {{shift_sales.cheque}}</td>
                </tr>
                <tr>
                    <td>Visa Sales:</td>
                    <td class="align-end">GH¢ {{shift_sales.visa}}</td>
                </tr>
                <tr>
                    <td>MoMo Sales:</td>
                    <td class="align-end">GH¢ {{shift_sales.momo}}</td>
                </tr>
                <tr>
                    <td>Credit Sales:</td>
                    <td class="align-end">GH¢ {{shift_sales.credit}}</td>
                </tr>
                <tr>
                    <td>Returns:</td>
                    <td class="align-end">GH¢ {{shift_sales.returns}}</td>
                </tr>
                <v-divider></v-divider>
                <tr>
                    <td class="subheading">Total Sales:</td>
                    <td class="align-end subheading">GH¢ {{tsale}}</td>
                </tr>
                <tr>
                    <td class="subheading">Expenses:</td>
                    <td class="align-end subheading">GH¢ {{ses_expenses}}</td>
                </tr>
                <tr>
                    <td class="subheading">Closing Cash:</td>
                    <td class="align-end subheading">GH¢ {{close_cash}}</td>
                </tr>
                <tr>
                    <td class="subheading">Expected Cash:</td>
                    <td class="align-end subheading">GH¢ {{expCash}}</td>
                </tr>
                <tr>
                    <td class="subheading">Variance:</td>
                    <td class="align-end subheading">GH¢ {{varCash}}</td>
                </tr>
            </table>
        </v-card>


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
    import Printd from 'printd';
    import { eventBus } from '../../../../main.js';
    import moment from 'moment';
    let axios = require("axios");
    export default {
        props: [
            'reg_dialog',
            'hold_up'
        ],
        name: "add_cus",
        $_veeValidate: {
            validator: 'new'
        },
        data: () => ({
            open_date:'',
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
            ses_area:true,
            total: 0,
            menu:false,
            snack:false,
            snackText:'',
            snackColor:'',
            shift_sales: {},
            ses_raw: [],
            ses_expenses:0,
            creg: false,
            fetchup: false,
            end_init: true,
            close_cash: '',
            sales_session: {
                outlet: '',
                shift: 'Morning',
                opening_cash: '',
                user_id: 1,
                open_date: new Date().toISOString(),
            },
            su_snackbar: false,
            edit_dialog: false,
            loader: false,
            shifts: ['Morning', 'Afternoon', 'Night'],
            search: '',
            customers: [],
            editedIndex: -1,
            outlet:['Kumanku'],

        }),

        computed: {
            openDate(){
                return moment(this.sales_session.open_date).format('MMM Do YYYY');
            },
            outty(){
                let o = [];


                // let tty = o.push(this.userData.outlet_name);
                let tty = this.userData.outlet_name;
                return tty;

            },
            sessionState() {
                return this.getSaleSession.shift === "Not Set" ? 'Open Register' : 'Edit Register';
            },
            ses() {

                if (this.getSaleSession.shift === "Not Set") {
                    return false;
                }
                else {
                    return true;
                }
            },
            apiSet() {
                return this.$store.getters.getApi
            },
            getSaleSession() {
                return this.$store.getters.getSalesSession;
            },

            submit_loading() {
                return true;
            },
            submitted() {
                return this.$store.state.submittedState;
            },
            tsale() {
                let i = this.ses_raw.reduce((t, n) => t +n.payment_amount, 0) ;
                // return i - parseInt(this.shift_sales.returns);
                // return 500 - parseInt(this.shift_sales.returns);
                return i;
            },
            expCash(){
                return (parseFloat(this.getSaleSession.opening_cash) + this.tsale) - this.ses_expenses;
            },
            varCash(){
                return (this.close_cash - this.expCash);
            }


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
        mounted(){
            // this.sales_session = this.getSaleSession;
        },

        methods:{
            openRegister(){
                this.$store.commit('setIsUp',true);
                let self = this;
                var today = moment().format('Do MMM YYYY');

                if(this.ses){
                    this.sales_session = this.getSaleSession;
                    return false;
                }

                this.$validator.validateAll().then((result)=>{
                    if(result) {
                        this.loader = true;
                        const sessionData = this.sales_session;
                        console.log(sessionData);

                        // let op = sessionData.open_date;
                        // let oppo = moment().format("MMM Do YY");

                          sessionData.company_id = this.userData.company_id;
                          sessionData.outlet_id= this.userData.outlet_id;
                          sessionData.user_id= this.userData.id;
                          sessionData.user_name= this.userData.user_name;
                          sessionData.session_state= 1;
                          sessionData.open_date= today;
                          sessionData.open_time= new Date();

                        console.log(sessionData);


                        axios.post(this.apiSet.saleSession, sessionData)
                            .then(function (response) {

                                let ses_id = response.data[1].session_id;
                                sessionData.id = ses_id;

                                self.snack=true;
                                self.snackText="Shift was Successfully started.";
                                self.snackColor="green";

                                self.$store.commit('setSalesSession',sessionData);
                                eventBus.$emit('close_reg',false);
                                self.loader = false;
                                self.$store.commit('setIsUp',false);


                            })
                            .catch(function (error) {
                                self.snack=true;
                                self.snackText="Error.Sorry a network error occured.";
                                self.snackColor="red";
                            });
                    }
                    else{
                            eventBus.$emit('form_error');
                            return false;
                        }
                    });

            },

            init_close(){
                this.end_init = false;
            },
            end_shift () {
                let self = this;

                let confirmFn = function() {
                    self.end();
                }

                let obj = {
                    title: 'End Shift?',
                    message: 'This will close the register and end your shift.',
                    type: 'warning',
                    useConfirmBtn: true,
                    onConfirm: confirmFn
                }
                this.$refs.simplert.openSimplert(obj);

            //    All Expeense Fetch

                let today = moment().format('Do MMM YYYY');

                const sesData = {
                    user_id: this.userData.id,
                    expense_date: today,

                };


                axios.post(this.apiSet.sessionExpense, sesData)
                    .then(function (response) {

                        let r = response.data.data;


                        if(r[0].amount){
                            let r_amt = r.reduce((t, n) => t + parseFloat(n.amount), 0);
                            self.ses_expenses = r_amt;

                        }else{
                            self.ses_expenses = 0;
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            },

            end(){
                let self = this;
                this.$store.commit('setIsUp',true);
                let ses_id = this.getSaleSession.id;
                let close_cash = {close_cash:this.close_cash};

                axios.patch(this.apiSet.closeSession+'/'+ses_id,close_cash)
                    .then(function (response) {
                        console.log(response);
                        self.loader = false;
                        self.$validator.reset();
                        self.end_init = true;
                        eventBus.$emit('close_reg',false);
                       self.getShiftSales();



                    })
                    .catch(function (error) {
                        console.log(error);
                        this.er_snackbar = true;
                        self.loader = false;

                    });
            },


            getShiftSales(){

                let self = this;
                let ses_id = this.getSaleSession.id;
                let ses_show = {
                    cash:0,
                    visa:0,
                    cheque:0,
                    momo:0,
                    credit:0,
                    return:0,

                }

                axios.get(this.apiSet.sessionSales+'/'+ses_id)
                    .then(function (response) {
                        console.log(response);
                        let sh = response.data;
                        self.ses_raw = sh;



                        for (let key = 0, len = sh.length; key < len; key++) {
                            switch(sh[key].payment_type){
                                case "CASH":
                                    ses_show.cash = sh[key].payment_amount;
                                    break;

                                case "VISA":
                                    ses_show.visa = sh[key].payment_amount;
                                    break;

                                case "CHEQUE":

                                    ses_show.cheque= sh[key].payment_amount;
                                    break;

                                case "CREDIT":
                                    ses_show.credit= sh[key].payment_amount;
                                    break;

                                case "RETURN":
                                    ses_show.returns= sh[key].payment_amount;
                                    break;

                                case "MoMo":
                                    ses_show.momo= sh[key].payment_amount;
                                    break;


                                default:
                                    ses_show.cash = 0;


                            }

                        }
                        ses_show.expenses = self.getExpenses;

                        self.shift_sales = ses_show;

                        // self.getExpenses();

                        eventBus.$emit('close_reg',false);
                        self.creg = true;
                        self.$store.commit('setIsUp',false);

                        self.completeSession();


                        // let sessionData = {shift:"Not Set"};
                        // self.$store.commit('setSalesSession',sessionData);


                    })
                    .catch(function (error) {
                        console.log(error);
                        this.er_snackbar = true;
                        self.loader = false;

                    });
            },
            completeSession(){
                let today = moment().format('D MMM YYYY');
                let s = this.shift_sales;
                let sid = this.getSaleSession.id;

                const sesData = {
                    ...s,
                    total_sales:this.tsale,
                    expenses:this.ses_expenses,
                    closing_date: new Date()

                };

                axios.patch(this.apiSet.completeSession+'/'+sid, sesData)
                    .then(function (response) {

                      console.log(response.data.data);

                    })
                    .catch(function (error) {
                         console.log(error);
                    });
            },
            printSession(){
                    const d = new Printd();


                    d.print( document.getElementById('session_area'), this.cssText);
                this.closePrint();
            },

            closePrint(){
                let sessionData = {shift:"Not Set"};
                this.$store.commit('setSalesSession',sessionData);
                this.$store.commit('setIsUp',false);


                this.sales_session.opening_cash = 0;
                this.sales_session.shift = '';
                this.close_cash=0;

                this.creg = false;
                eventBus.$emit('close_reg',true);


            },

            closeup(){

                if(this.ses){
                    eventBus.$emit('close_reg',false);

                }
                else{
                    this.$router.go(-1);
                }

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
    .close_reg{
        position:relative;
        bottom:30px;
        left:60px;
    }

    .pulse {
        cursor: pointer;
        border-radius:50px;
        box-shadow: 0 0 0 rgba(204,169,44, 0.4);
        animation: pulse 1s infinite;
    }

    @-webkit-keyframes pulse {
        0% {
            -webkit-box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
        }
        70% {
            -webkit-box-shadow: 0 0 0 10px rgba(204,169,44, 0);
        }
        100% {
            -webkit-box-shadow: 0 0 0 0 rgba(204,169,44, 0);
        }
    }
    @keyframes pulse {
        0% {
            -moz-box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
            box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
        }
        70% {
            -moz-box-shadow: 0 0 0 10px rgba(204,169,44, 0);
            box-shadow: 0 0 0 10px rgba(204,169,44, 0);
        }
        100% {
            -moz-box-shadow: 0 0 0 0 rgba(204,169,44, 0);
            box-shadow: 0 0 0 0 rgba(204,169,44, 0);
        }
    }

</style>