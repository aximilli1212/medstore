import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import * as firebase from 'firebase'
import createPersistedState from 'vuex-persistedstate'

// import * as Cookies from 'js-cookie';

import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import config from '../config'


Vue.use(Vuex);
Vue.use(axios);
export const store = new Vuex.Store({
    // plugins: [
    //     createPersistedState({
    //         storage: {
    //             getItem: key => Cookies.get(key),
    //             // getItem: key => Cookies.getJSON(key),
    //             // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
    //             setItem: (key, value) =>
    //                 Cookies.set(key, value, { expires: 3, secure: true }),
    //             removeItem: key => Cookies.remove(key),
    //         },
    //     }),
    // ],

    state:{
        snacky:{
            n:'',
            t:'Success',
            c:'green darken-3'
        },
        isUp:false,
        pout:1,
        returnees:[],
        low_stock:[

        ],
        deb_out:[],
        drawer:false,
        drawerRight:false,
        head:true,
        mini:{
            exp:0,
            prod:0,
            deb:0,
            cred:0
        },
        topProds:[],
        pack_units:[],
        regCustomer:[],
        all_products:[],
        all_categories:[],
        suspendedSales:[],
        all_sup:[],
        outlets:[],
        transferDet:{

        },
        transferNew:{},
        purchase_det:{
            outlet:'Demo',
            supplier:'Soliloquy',
            sup_invoice:'D383748',
            carriage:'223e',
            vat:'300',
            sup_discount:'5',
            payment_mode:'Cash',
            date: new Date(),
        },
        sales_session:{
            shift:"Not Set",
        },
        user_data:{
            user_name:'Rita',
            address:"PMB 491, New Street, Accra",
            company:"Demo Company",
            company_id:1,
            outlet_id:1,
            email:"mai@mail.com",
            id:0,
            num:0,
            role:'X',
            phone_no:"029383938",
            company_slogan:'We Deliver to you quality...',
            title:null
        },
        company_details:{
            company_tag:'ECG',
            company_name:'Demo Company',
            address:'PMB 491, New Street, Accra',
            location:'Banana Close, Agbogba',
            phone_no:'331-393-3394',
            company_slogan:'We Deliver to you quality...'
        },
        sale_customer:{
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
        ex_cats:[],
        bank_drop:[],
        current_sales:[],
        current_products:[],
        new_purchase:[],
        customers:[],
        dictionaries:[],
        customerID:0,
        bookDays:'0',
        bookHours:'0',
        bookMins:'-1',
        bookTime:'0',
        grandTotal:'0',
        submitLoadState:false,
        submittedState:0,
        reqMsg:1,
        side_items: [

        ],
        authUser:0,
        loading:false,
        loadingPage:false,
        error:null,
        s_in:true,
        s_up:false,
        goldLoad:false,
        config: config,

    },
    mutations,
    actions,
    getters,
    plugins: [createPersistedState()],

})
