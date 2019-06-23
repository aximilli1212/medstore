<template>
    <div>
        <v-layout>
            <v-flex sm5 offset-sm3>

                <v-btn color="primary" @click="$router.go(-1)" small><v-icon>mdi-arrow-left-thick</v-icon>Go Back</v-btn>
                <v-btn color="secondary" @click="printSales" small><v-icon left>mdi-printer</v-icon>Print</v-btn>

            </v-flex>
        </v-layout>

        <v-layout>
            <v-flex sm5 offset-sm3>
                <v-card color="pa-4 mt-2 round_end" id="sale_area">
                    <header>
                        <h1>Sales Receipt</h1>
                        <v-layout>
                            <v-flex sm7 class="ml-3">

                         <span style="text-align:center"  >
                   <p class="headline hup">{{userData.company_name}}</p>
                    <p>Tel: {{userData.company_phone_no}}</p>
                    <p>Outlet: {{userData.outlet_name}}</p>
                    <p>Location: {{userData.outlet_location}}</p>
                    <p>Date: {{ new Date().toDateString()}}</p>
                </span>

                            </v-flex>
                        </v-layout>



                        <v-layout>
                            <v-flex sm6 offset-sm1>

                         <div>
                    <p><b>#Invoice No: </b>{{csales.invoice_no}}</p>
                    <p><b>Cashier Name:</b> {{csales.user_name}}</p>
                             <p><b>Payment Mode:</b> {{csales.payment_type}}</p>
                </div>


                            </v-flex>
                        </v-layout>


                    </header>
                    <article>

                        <table class="inventory">
                            <thead>
                            <tr>
                                <th><span >Quantity</span></th>
                                <th><span >Product Name</span></th>
                                <th><span > Price</span></th>
                                <!--<th><span >Selling Price</span></th>-->
                                <!--<th><span >Markup</span></th>-->
                                <!--<th><span >Expiry</span></th>-->
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(prod ,index) in cprod">
                                <td><span>{{prod.quantity}}</span></td>
                                <td><span >{{prod.product_name}}</span></td>
                                <td><span >Gh¢ {{prod.price}}</span></td>
                                <!--<td><span data-prefix>GH¢ </span><span >5.00 / 150.12</span></td>-->
                                <!--<td style="text-align:center">1.2</td>-->
                                <!--<td><span> </span><span>02/04/2018</span></td>-->
                            </tr>
                            </tbody>
                        </table>
                        <span class="tems">* * * * {{csales.total_items}} Item(s)  * * * *</span>
                        <table class="balance">
                            <tr>
                                <th><span >Amount Due</span></th>
                                <td><span data-prefix>GH¢ </span><span>{{csales.total}}</span></td>
                            </tr>
                            <tr>
                                <th><span >Tendered:</span></th>
                                <td><span data-prefix>GH¢ </span><span>{{csales.amount_tendered}}</span></td>
                            </tr>
                            <tr>
                                <th><span >Change Due</span></th>
                                <td><span data-prefix>GH¢ </span><span>{{csales.change_due}}</span></td>
                            </tr>
                            <tr>
                                <th><span >Discount:</span></th>
                                <td><span data-prefix> </span><span>{{csales.discount}}</span></td>
                            </tr>
                            <tr>
                                <th><span class="headline" >Grand Total</span></th>
                                <td class="green--text text--darken-3"><span data-prefix class="headline green--te darken-3">GH¢ </span><span class="headline green--te darken-3">{{csales.total}}</span></td>
                            </tr>
                        </table>
                    </article>
                    <span class="mid">
                        <p>Tax Summary</p>
                        <p>------------------------------------------------------------------------------</p>
                        <p>Vatable Sale: Yes </p>
                        <p>VAT Exemp: {{csales.outlet}}</p>
                        <p>Zero Rated Sale: True</p>
                        <p>12% Vat Amt: Ghc {{ 0.12 * csales.total }} </p>
                        <p>------------------------------------------------------------------------------</p>
                         <p><b>Customer:</b> {{csales.name}}</p>

                    </span>

                    <aside>
                        <v-divider></v-divider>
                        <div class="mid mt-4">
                            <small class="small">{{userData.company_slogan}}</small>
                        </div>

                        <div class="mt-4">
                            <small class="vsmall grey--text ">Powered By WorkIT Facility Management System</small>
                        </div>
                    </aside>

                </v-card>
            </v-flex>
        </v-layout>

    </div>
    
</template>

<script>
    import Printd from 'printd'

    export default {
        name: "purchase_view",
        data:()=>({
             cssText:'@-webkit-keyframes opacityPulse {\n' +
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
             '        box-sizing: content-box;\n' +
             '        color: inherit;\n' +
             '        font-family: inherit;\n' +
             '        font-size: inherit;\n' +
             '        font-style: inherit;\n' +
             '        font-weight: inherit;\n' +
             '        line-height: inherit;\n' +
             '        list-style: none;\n' +
             '        margin: 0;\n' +
             '        padding: 0;\n' +
             '        text-decoration: none;\n' +
             '        vertical-align: top;\n' +
             '    }\n' +
             '\n' +
             '\n' +
             '    h1 { font: bold 100% sans-serif; letter-spacing: 0.5em; text-align: center; text-transform: uppercase; }\n' +
             '\n' +
             '    /* table */\n' +
             '\n' +
             '    table { font-size: 55%; table-layout: fixed; width: 60%; }\n' +
             '    table { border-collapse: separate; border-spacing: 2px; }\n' +
             '    th { border-width: 1px; padding: 2px; position: relative; text-align: left; }\n' +
             '    th { border-radius: 1px; border-style: solid; }\n' +
             '    th { background: #EEE; border-color: #BBB; }\n' +
             '    td { border-color: #DDD; text-align:center}\n' +
             '\n' +
             '    /* page */\n' +
             '\n' +
             '    html { font: 18px/1 \'Open Sans\', sans-serif; overflow: auto; padding: 0.5in; }\n' +
             '    html { background: #999; cursor: default; }\n' +
             '\n' +
             '    body { box-sizing: border-box; height: 11in; margin: 0 auto; overflow: hidden; padding: 0.5in; width: 8.5in; }\n' +
             '    body { background: #FFF; border-radius: 1px; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); }\n' +
             '\n' +
             '    /* header */\n' +
             '\n' +
             '    header { margin: 0 0 3px; }\n' +
             '    header:after { clear: both; content: ""; display: table; }\n' +
             '\n' +
             '    header h1 { background: #e3e3e3; border-radius:2px; color: #000; margin: 0 0 2px; padding: 1px 0; }\n' +
             '    header { text-align:center; font-size: 55%; font-style: normal; line-height: 1.25; margin: 0 1em 1em 0; }\n' +
             '    header address p { margin: 0 0 0.25em; }\n' +
             '    header span, header img { }\n' +
             '    header span { margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative; }\n' +
             '    header img { max-height: 100%; max-width: 100%; }\n' +
             '    header input { cursor: pointer; -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"; height: 100%; left: 0; opacity: 0; position: absolute; top: 0; width: 100%; }\n' +
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
             '    table.inventory { clear: both; width: 100%; }\n' +
             '    table.inventory th { font-weight: bold; text-align: center; }\n' +
             '\n' +
             '    table.inventory td:nth-child(1) { width: 26%; }\n' +
             '    table.inventory td:nth-child(2) { width: 38%; }\n' +
             '    table.inventory td:nth-child(3) { text-align: right; width: 12%; }\n' +
             '    table.inventory td:nth-child(4) { text-align: right; width: 12%; }\n' +
             '    table.inventory td:nth-child(5) { text-align: right; width: 12%; }\n' +
             '\n' +
             '    /* table balance */\n' +
             '\n' +
             '    table.balance th, table.balance td { width: 150px; }\n' +
             '    table.balance td { text-align: right; }\n' +
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
             '    }' +
             '.vsmall{\n' +
             '        font-size:10px;\n' +
             '    }\n' +
             '\n' +
             '    .add, .cut\n' +
             '    {\n' +
             '        background: #9AF;\n' +
             '        box-shadow: 0 1px 2px rgba(0,0,0,0.2);\n' +
             '        background-image: -moz-linear-gradient(#00ADEE 5%, #0078A5 100%);\n' +
             '        background-image: -webkit-linear-gradient(#00ADEE 5%, #0078A5 100%);\n' +
             '        border-radius: 2px;\n' +
             '        border-color: #0076A3;\n' +
             '        color: #FFF;\n' +
             '        cursor: pointer;\n' +
             '        font-weight: bold;\n' +
             '        text-shadow: 0 -1px 2px rgba(0,0,0,0.333);\n' +
             '    }\n' +
             '\n' +
             '    .add { margin: -2.5em 0 0; }' +
             '     .hup {font-size:12px;letter-spacing: 0.3em;text-transform: uppercase;font:Aria}' +
             '     .small{ font-size:5px;color:grey; }\n' +
             '\n' +
             '    .add:hover { background: #00ADEE; }' +
             'p b{\n' +
             '        font-weight:bold;\n' +
             '    }\n' +
             '    .tems{\n' +
             '        text-align:center;\n' +
             '        position:relative;\n' +
             '        bottom:20px;\n' +
             '        color:grey;\n' +
             '    }\n' +
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
             '    @page { margin: 0; }\n' +
             '\n',
             d:null,
        }),
        computed:{
            csales(){
                return this.$store.getters.getCurrentSales;
            },
            cprod(){
                return this.$store.getters.getCurrentProducts;
            },
            userData(){
                return this.$store.getters.getUserData;
            }
        },
        mounted(){
            // const p: Printd = new Printd()

            // const { Printd } = window.printd;
            // const d = new Printd();
            //
            // // Print dialog events (v0.0.9+)
            // const { contentWindow } = d.getIFrame()
            //
            // contentWindow.addEventListener(
            //     'beforeprint', () => console.log('before print event!')
            // )
            // contentWindow.addEventListener(
            //     'afterprint', () => console.log('after print event!')
            // )
        },
        methods:{
            printSales(){
                const d = new Printd();


                d.print( document.getElementById('sale_area'), this.cssText)
            }

        }
    }
</script>

<style lang="scss" scoped>
    .vsmall{
        font-size:10px;
    }
    p b{
        font-weight:bold;
    }
    .tems{
        text-align:center;
        position:relative;
        bottom:20px;
        color:grey;
    }
    .mid{
        text-align:center;
        position:relative;
        left:15px;
    }
    .round_end{
        border-radius:5px 5px 0px 0px;
        border:1px dashed gray;
        width:600px;
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
    body{
        background:#EEE;
        /* font-size:0.9em !important; */
    }
    /* reset */

    *
    {
        border: 0;
        box-sizing: content-box;
        color: inherit;
        font-family: inherit;
        font-size: inherit;
        font-style: inherit;
        font-weight: inherit;
        line-height: inherit;
        list-style: none;
        margin: 0;
        padding: 0;
        text-decoration: none;
        vertical-align: top;
    }


    h1 { font: bold 100% sans-serif; letter-spacing: 0.5em; text-align: center; text-transform: uppercase; }

    /* table */

    table { font-size: 95%; table-layout: fixed; width: 100%; }
    table { border-collapse: separate; border-spacing: 2px; }
    th, td { border-width: 1px; padding: 0.5em; position: relative; text-align: left; }
    th, td { border-radius: 0.25em; border-style: solid; }
    th { background: #EEE; border-color: #BBB; }
    td { border-color: #DDD; }

    /* page */

    html { font: 18px/1 'Open Sans', sans-serif; overflow: auto; padding: 0.5in; }
    html { background: #999; cursor: default; }

    body { box-sizing: border-box; height: 11in; margin: 0 auto; overflow: hidden; padding: 0.5in; width: 8.5in; }
    body { background: #FFF; border-radius: 1px; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); }

    /* header */

    header { margin: 0 0 1em; }
    header:after { clear: both; content: ""; display: table; }

    header h1 { background: #e3e3e3; border-radius: 0.25em; color: #000; margin: 0 0 1em; padding: 0.5em 0; }
    header address { float: left; font-size: 75%; font-style: normal; line-height: 1.25; margin: 0 1em 1em 0; }
    header address p { margin: 0 0 0.25em; }
    header span, header img { display: block; float: right; }
    header span { margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative; }
    header img { max-height: 100%; max-width: 100%; }
    header input { cursor: pointer; -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"; height: 100%; left: 0; opacity: 0; position: absolute; top: 0; width: 100%; }

    /* article */

    article, article address, table.meta, table.inventory { margin: 0 0 3em; }
    article:after { clear: both; content: ""; display: table; }
    article h1 { clip: rect(0 0 0 0); position: absolute; }

    article address { float: left; font-size: 125%; font-weight: bold; }

    /* table meta & balance */

    table.meta, table.balance { float: right; width: 36%; }
    table.meta:after, table.balance:after { clear: both; content: ""; display: table; }

    /* table meta */

    table.meta th { width: 40%; }
    table.meta td { width: 60%; }

    /* table items */

    table.inventory { clear: both; width: 100%; }
    table.inventory th { font-weight: bold; text-align: center; }

    table.inventory td:nth-child(1) { width: 26%; }
    table.inventory td:nth-child(2) { width: 38%; }
    table.inventory td:nth-child(3) { text-align: right; width: 12%; }
    table.inventory td:nth-child(4) { text-align: right; width: 12%; }
    table.inventory td:nth-child(5) { text-align: right; width: 12%; }

    /* table balance */

    table.balance th, table.balance td { width: 150px; }
    table.balance td { text-align: right; }

    /* aside */

    aside h1 { border: none; border-width: 0 0 1px; margin: 0 0 1em; }
    aside h1 { border-color: #999; border-bottom-style: solid; }

    /* javascript */

    .add, .cut
    {
        border-width: 1px;
        display: block;
        font-size: .8rem;
        padding: 0.25em 0.5em;
        float: left;
        text-align: center;
        width: 0.6em;
    }

    .add, .cut
    {
        background: #9AF;
        box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        background-image: -moz-linear-gradient(#00ADEE 5%, #0078A5 100%);
        background-image: -webkit-linear-gradient(#00ADEE 5%, #0078A5 100%);
        border-radius: 0.5em;
        border-color: #0076A3;
        color: #FFF;
        cursor: pointer;
        font-weight: bold;
        text-shadow: 0 -1px 2px rgba(0,0,0,0.333);
    }

    .add { margin: -2.5em 0 0; }

    .add:hover { background: #00ADEE; }

    .cut { opacity: 0; position: absolute; top: 0; left: -1.5em; }
    .cut { -webkit-transition: opacity 100ms ease-in; }

    tr:hover .cut { opacity: 1; }

    @media print {
        * { -webkit-print-color-adjust: exact; }
        html { background: none; padding: 0; }
        body { box-shadow: none; margin: 0; }
        span:empty { display: none; }
        .add, .cut { display: none; }
    }

    @page { margin: 0; }




</style>