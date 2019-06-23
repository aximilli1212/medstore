<template>
    <div class="page-invoice scrollable">
        <!--<div class="toolbar">-->
        <!--<v-btn class="animated fadeInRight" plain size="small" @click="print"><v-icon>mdi-printer</v-icon>Print</v-btn>-->
        <!--</div>-->
        <v-flex class="animated toolbar fadeInRight mb-2">

            <v-btn color="primary" @click="$router.go(-1)" small><v-icon left>mdi-arrow-left-thick</v-icon>Go Back</v-btn>
            <v-btn color="secondary" @click="print" small><v-icon left>mdi-printer</v-icon>Print</v-btn>
        </v-flex>

        <div class="invoice">
            <header>
                <h2 style="text-align:center">{{userData.company_name}}</h2>
                <v-layout>
                    <v-flex>
                         <span style="text-align:center">
                    <p class="head head_font">Tel: {{userData.company_phone_no}}<br />
                        Outlet: {{userData.outlet_name}} <br />
                        <!--Location: {{userData.outlet_location}}<br />-->
                        Date: {{ new Date().toDateString()}}
                    </p>
                         </span>

                    </v-flex>
                </v-layout>

                <v-layout>
                    <v-flex sm6>

                        <div>
                            <p class="head_font"><b>#Invoice No: </b>{{csales.invoice_no}} <br />
                                <b>Cashier Name:</b> {{csales.user_name}}<br />
                                <b>Payment Mode:</b> {{csales.payment_type}}
                            </p>

                        </div>
                    </v-flex>
                </v-layout>


            </header>
            <hr>

            <!--<div class="invoice-middle">-->
            <!--<div>Ench</div>-->
            <!--</div>&lt;!&ndash;End Invoice Mid&ndash;&gt;-->

            <div class="invoice-bottom">

                <table>
                    <thead>

                    <tr >
                        <th>Product</th>
                        <th>Qty</th>
                        <th >Price</th>
                        <th >Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(prod ,index) in cprod" class="ench">
                        <td class="name">{{prod.product_name}}</td>
                        <td style="text-align:center">{{prod.quantity}}</td>
                        <td>{{prod.price}}</td>
                        <td style="text-align:center; width:20px"><span style="width:20px" >{{parseFloat(prod.price) * parseFloat(prod.quantity)}}</span></td>
                    </tr>
                    <hr class="mt-2 white"/>

                    <tr class="mt-2">
                        <td></td>
                        <td></td>
                        <td><b>Amt Due</b></td>
                        <td><span></span><span>{{csales.total}}</span></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td><b>Tendered</b></td>
                        <td><span></span><span>{{csales.amount_tendered}}</span></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td><b>Change</b></td>
                        <td>{{csales.change_due}}</td>

                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td><b>Discount</b></td>
                        <td>{{csales.discount}}</td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td></td>
                        <td></td>
                        <td class="Rate"><h3>Total GH¢</h3></td>
                        <td class="payment"><h3> {{csales.total}}</h3></td>
                    </tr>
                    </tfoot>
                </table>



                <aside>
                    <v-divider></v-divider>
                    <div class="tems mt-4">
                        {{userData.company_slogan}}
                    </div>

                    <div class="mt-4">
                        <small class="vsmall grey--text ">Powered By WorkIT Facility Management System</small>
                    </div>
                </aside>

            </div><!--End Invoice-->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Invoice',
        computed:{
            csales(){
                return this.$store.getters.getCurrentSales;
            },
            cprod(){
                return this.$store.getters.getCurrentProducts;
            },
            userData(){
                return this.$store.getters.getUserData;
            },
            apiSet() {
                return this.$store.getters.getApi
            },
        },
        mounted(){
            this.hideHead();
            this.doSaleBuffer();
        },
        methods:{
            // printSales(){
            //     const d = new Printd();
            //     d.print( document.getElementById('sale_area'), this.cssText)
            // },

            doSaleBuffer(){
                let self = this;

                const saleData={
                    invoice_no:this.csales.invoice_no,
                    cid:this.userData.company_id,
                    oid:this.userData.outlet_id,
                    uid:this.userData.id,
                    user_name:this.csales.user_name,
                    payment_type:this.csales.payment_type,
                    total_items:this.csales.total_items,
                    total:this.csales.total,
                    amount_tendered:this.csales.amount_tendered,
                    change_due:this.csales.change_due,
                    discount:this.csales.discount,
                    name:this.csales.name,
                    date_printed:new Date(),
                };

                axios.post(this.apiSet.c_sales, saleData)
                    .then(function (response) {

                        self.doProdBuffer(self.csales.invoice_no);

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            doProdBuffer(invoice_no){

                let prodComplete = {};
                let prodSet = this.cprod;

                for (let key = 0, len = prodSet.length; key < len; key++) {


                    prodComplete = {
                        oid: this.userData.outlet_id,
                        cid: this.userData.company_id,
                        product_name: prodSet[key].product_name,
                        quantity: prodSet[key].quantity,
                        price: prodSet[key].price,
                        invoice_no: invoice_no,
                        discount: prodSet[key].discount,
                    };

                    axios.post(this.apiSet.c_prod, prodComplete)
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                            this.er_snackbar = true;

                        });
                }

            },
            print() {
                window.print()
            },
            hideHead(){
                this.$store.commit('setHead',false)

            }



        },

    }
</script>

<style lang="scss" scoped>
    /*@import '../../../assets/scss/_variables';*/
    /*@import '../../../../assets/scss/variables';*/

    .page-invoice {

        .invoice {
            background: white;
            width: 100%;
            margin: 0 auto;
            padding: 2em;
            box-sizing: border-box;
            box-shadow: 0px 8px 8px -8px rgba(0, 0, 0, 0.3);

            hr {
                border: 1px solid rgba(0, 0, 0, 0.05);
            }
            .head_font{
                font-size:14px;
            }
            .head_font b{
                font-size:15px;
            }
            .pull{
                float:right;
                margin-top:5px;

            }
            .tems{
                text-align:center;
            }
            .ench {
                border-bottom: 1px solid black;
            }


            .invoice-top {
                overflow: hidden;
                margin-bottom: 30px;

                .logo {
                    float: left;
                    height: 60px;
                    width: 60px;
                    box-sizing: border-box;
                    border-radius: 50%;
                    overflow: hidden;
                    text-align: center;

                    img {
                        height: 80%;
                        margin-top: 10%;
                    }
                }
                .info {
                    display: block;
                    float:left;
                    margin-left: 20px;
                    margin-top: 5px;
                    background:white;

                    & > * {
                        margin: 0;
                    }
                }
                .title {
                    float: right;

                    & > * {
                        margin: 0;
                    }

                    p {
                        text-align: right;
                    }
                }
            }

            .invoice-middle {
                overflow: hidden;
                margin-top: 30px;
                margin-bottom: 30px;

                .clientlogo {
                    float: left;
                    height: 60px;
                    width: 60px;
                    box-sizing: border-box;
                    border-radius: 50%;
                    overflow: hidden;

                    img {
                        width: 100%;
                    }
                }

                .info {
                    display: block;
                    float:left;
                    margin-left: 20px;
                    margin-top: 5px;

                    & > * {
                        margin: 0;
                    }
                }

                .project {
                    margin-left: 52%;

                    & > * {
                        margin: 0;
                    }
                }
            }

            .invoice-bottom {
                table {
                    width: 100%;
                    border-collapse: collapse;
                    color:black;


                    th {
                        text-align: center;
                        padding: 0px 0px 0px 0px;
                        background:#e3e3e3;
                        border-radius:5px;
                        padding-bottom: 1px;

                        &:first-child {
                            text-align: left;
                            padding-left: 0px;
                            width: 90%;
                        }
                        &:last-child {
                            padding-right: 0px;
                        }
                    }

                    td {
                        text-align: center;
                        padding: 0px;
                        padding-bottom: 1px;

                        &:first-child {
                            text-align: left;
                            padding-left: 0px;
                            width: 90%;
                        }
                        &:last-child {
                            padding-right:0px;
                            text-align:right;
                        }
                    }

                    tfoot td {
                        border: none;
                        padding-top: 5px;
                    }
                }
            }

            h1 { font-size: 30px; color: black; }
            h2 { font-size: 20px; }
            h3 { font-size: 15px; font-weight: bold; line-height: 2em; }
            p  { font-size: 10px; line-height: 1.2em }
        }

    }


    @media screen and (max-width: 768px) {
        .page-invoice {
            .invoice {
                .invoice-middle {
                    .project {
                        display: block;
                        width: 100%;
                        clear: both;
                        padding: 10px 0;
                        margin: 0;
                    }
                }
                .invoice-bottom {
                    table {
                        th {
                            padding: 5px;
                        }

                        td {
                            padding: 5px;
                        }
                    }
                }
            }
        }
    }

    @media print{
        .layout-container .container .footer ,
        .layout-container .container .header ,
        .layout-container .container .horizontal-nav ,
        .layout-container .footer ,
        .layout-container .layout-picker ,
        .layout-container .vertical-nav ,
        .layout-container .header {
            display:none;
        }

        .page-invoice {
            .toolbar {
                display: none;
            }

            .invoice {
                box-shadow: none;
                max-width: 100%;
                padding: 0;
            }
        }
    }
</style>

