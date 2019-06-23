<template>
    <div>
        <v-btn color="primary" @click="$router.push('/purchases')" small><v-icon>mdi-arrow-left-thick</v-icon>Go Back</v-btn>
        <v-btn color="secondary" @click="print_invoice" small><v-icon left>mdi-printer</v-icon>Print</v-btn>
        <v-card color="pa-4 mt-2 round_end">

            <header>
                <h1>Purchase Invoice <i class="secondary--text">#{{purchaseDetail.invoice}}</i></h1>

                <address style="font-size:15px" >
                    <p class="headline"> Supplier: {{purchaseDetail.supplier}}</p>
                    <p> Mode: {{purchaseDetail.mode}}</p>
                    <p>  Discount: {{purchaseDetail.discount}}</p>
                    <p>  Vat: {{purchaseDetail.vat}}</p>
                    <p class="subheading"> Total Cost Price:  <i class="subheading " style="font-weight:bold"> GH¢ {{purrSubtotal}}</i> </p>
                    <p class="subheading"> Total Selling Price:  <i class="subheading " style="font-weight:bold"> GH¢ {{purrSub}}</i> </p>
                    <tr>
                        <td>#Invoice No.</td>
                        <td style="font-weight:bold">{{purchaseDetail.invoice}}</td>
                    </tr>
                </address>
                <span class="mid" >
                   <p class="headline hup">{{userData.company_name}}</p>
                    <p>Tel: {{userData.company_phone_no}}</p>
                    <p>Source: {{userData.outlet_name}}</p>
                    <p>Outlet: {{purchaseDetail.outlet_name}}</p>
                    <p>Date: {{ moment(purchaseDetail.date).format('MMMM Do YYYY')}}</p>
                </span>

            </header>
            <article>

                <table class="inventory">
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th><span >Product Name</span></th>
                        <th><span >Quantity</span></th>
                        <th><span >Cost Price</span></th>
                        <th><span >Selling Price</span></th>
                        <th><span >Batch N0.</span></th>
                        <th><span >Expiry</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(prod ,index) in purrProduct">
                        <td style="text-align:center">{{index + 1}}</td>
                        <td><span >{{prod.product_name}}</span></td>
                        <td><span>{{prod.purr_quantity+'('+prod.ws_unit+')'}}</span></td>
                        <td><span data-prefix>GH¢ </span><span >{{prod.purr_ws_subtotal}}</span></td>
                        <td><span data-prefix>GH¢ </span><span >{{prod.purr_subtotal}}</span></td>
                        <td><span>{{prod.batch_no}}</span></td>
                        <td><span> </span><span>{{prod.expiry}}</span></td>
                    </tr>
                    </tbody>
                </table>
                <table class="balance">
                    <tr>
                        <th><span >Total Cost</span></th>
                        <td><span data-prefix>GH¢ </span><span>{{purrSubtotal}}</span></td>
                    </tr>
                    <!--<tr>-->
                        <!--<th><span >Amount Paid</span></th>-->
                        <!--<td><span data-prefix>GH¢ </span><span >0.00</span></td>-->
                    <!--</tr>-->
                    <!--<tr>-->
                        <!--<th><span >Balance Due</span></th>-->
                        <!--<td><span data-prefix>GHc</span><span>600.00</span></td>-->
                    <!--</tr>-->
                </table>
            </article>
            <aside>
                <div >
                    <small>Powered By WorkIT Facility Management System</small>
                </div>
            </aside>

        </v-card>
    </div>
    
</template>

<script>
    export default {
        name: "purchase_invoice_pop",
        computed:{
            purchaseDetail(){
                return this.$store.getters.getPurchaseDet;
            },
            userData(){
                return this.$store.getters.getUserData;
            },
            purrProduct(){
                return this.$store.getters.getNewPurchase;
            },
            purrSubtotal(){
              let p = this.$store.getters.getNewPurchase;

                let total_amount = p.reduce((t, n) => t + parseFloat(n.purr_ws_subtotal), 0);
                return total_amount;
            },
            purrSub(){
              let p = this.$store.getters.getNewPurchase;

                return p.reduce((t, n) => t + parseFloat(n.purr_subtotal), 0);
            }
        },
        mounted(){
            this.setSide();
        },
        methods:{
            setSide(){

                this.$store.commit('setDrawer',false);
            },
            print_invoice(){
                window.print();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .round_end{
        border-radius:5px 5px 0px 0px;
        border:1px dashed gray;
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

    header { margin: 0 0 3em; }
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

    table.balance th, table.balance td { width: 50%; }
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