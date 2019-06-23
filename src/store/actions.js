import * as firebase from "firebase";
let axios = require("axios");
import moment from 'moment';
import { eventBus } from '../main.js';


export default{

    loadProducts({commit,state}){
        let apiUrl = state.config.api;

        axios.get(apiUrl.allProducts)
            .then(response=>{
                console.log(response.data.data);
                const prod = response.data.data;

                commit('setAllProducts',prod);

            }).catch(
            e => {
                console.log(e);
            }
        )
    },

    loadDebOut({commit,state}){
        let apiUrl = state.config.api;

        axios.get(apiUrl.deb_out)
            .then(response=>{

                let debby=[];
                console.log(response.data.data);
                let obj = response.data.data;

                let col = 'green darken-3';

                for (let key = 0, len = obj.length; key < len; key++) {


                    if(obj[key].due_days <= 7){
                          col = 'red darken';
                    }
                    if(obj[key].due_days > 7 && obj[key].due_days <= 28  ){
                          col = 'orange darken-3';
                    }
                    if(obj[key].due_days > 28){
                          col = 'green darken-3';
                    }





                    debby.push({
                        subheading: obj[key].sup_name,
                        headline: 'Ghc '+ obj[key].credit_unpaid,
                        percent: obj[key].due_days,
                        icon: {
                            label: 'mdi-cash-multiple',
                            color: col
                        },
                        linear: {
                            value: obj[key].due_days,
                            color: col
                        }

                    });

                    if(obj.length <= 2){
                        debby.push({

                                subheading: '',
                                headline: 'Ghc 0',
                                percent: 0,
                                icon: {
                                    label: 'mdi-cash-multiple',
                                    color: 'grey'
                                },
                                linear: {
                                    value: 0,
                                    color: 'grey'
                                }
                            }
                        )
                    }


                }
                    commit('setDebOut',debby);

            }).catch(
            e => {
                console.log(e);
            }
        )
    },
 loadLowStock({commit,state}){
        let apiUrl = state.config.api;

        axios.get(apiUrl.low_stock)
            .then(response=>{
                let low=[];
                  console.log(response.data.data);
                  let obj = response.data.data;
                  let cl = 'green darken-3';

                for (let key = 0, len = obj.length; key < len; key++){

                    let p = (obj[key].rt_quantity * 100) / (obj[key].max_no);

                    if(p <= obj[key].min_no ){
                        cl = 'red darken-3';
                    }
                    if(p > obj[key].min_no){
                        cl = 'green darken-3';
                    }






                    low.push({
                        name: obj[key].product_name,
                        quantity: obj[key].rt_quantity +'('+obj[key].rt_unit+')',
                        progress: Math.round(p),
                        color: cl,
                    });
                }

                console.log('Camp it');
                console.log(JSON.stringify(low));
                    commit('setLowStock',low);

            }).catch(
            e => {
                console.log(e);
            }
        )
    },



    loadOutlets({commit,state},payload){
        let fetch = '';
        let cid = state.user_data.company_id;


        if( cid === 1){
            fetch = state.config.api.allOutlets;

        }
        else{
            fetch = state.config.api.companyOutlets+'/'+cid;
        }

        axios.get(fetch)
            .then(response=>{
                console.log(response.data.data);
                const prod = response.data.data;

                commit('setOutlets',prod);

            }).catch(
            e => {
                console.log(e);
            }
        )
    },

    loadCustomers({commit,state}){
        let apiUrl = state.config.api;

        axios.get(apiUrl.allCustomers)
                .then(response=>{
                    const customers=[];
                    console.log(response.data.data);
                    const obj = response.data.data;
                    for (let key = 0, len = obj.length; key < len; key++) {
                        console.log(obj[key].title);
                        customers.push({
                            id:obj[key].id,
                            num:key,
                            title:obj[key].title,
                            name:obj[key].firstname +' '+obj[key].lastname,
                            firstname:obj[key].firstname,
                            lastname:obj[key].lastname,
                            phone_no:obj[key].phone_no,
                            email:obj[key].email,
                            company:obj[key].company_name,
                            address:obj[key].address,
                            credit:obj[key].credit,
                            discount_percentage:obj[key].discount_percentage,
                            discount_amount:obj[key].discount_amount,
                            markup:obj[key].markup
                        })
                    }

                    commit('setCustomers',customers);

                }).catch(
                e => {
                    console.log(e);
                }
            )
        },

    loadUserData({commit,state},payload){
        let apiUrl = state.config.api;

        axios.get(apiUrl.singleUser+'/'+payload)
                .then(response=>{
                    const userData={};
                    console.log(response.data.data);
                    const obj = response.data.data;
                            userData.id =obj.id;
                            userData.user_name= obj.name;
                            userData.user_email= obj.email;
                            userData.company_id= obj.company_id;
                            userData.outlet_id= obj.outlet_id;
                            userData.role= obj.role;
                            userData.role_name= obj.role_name;
                            userData.outlet_name= obj.outlet.outlet_name;
                            userData.outlet_location= obj.outlet.location;
                            userData.outlet_phone_no= obj.outlet.phone_no;
                            userData.outlet_name= obj.outlet.outlet_name;
                            userData.company_tag= obj.company.company_tag;
                            userData.company_name= obj.company.company_name;
                            userData.company_address= obj.company.address;
                            userData.company_location= obj.company.location;
                            userData.company_phone_no= obj.company.phone_no;
                            userData.company_category= obj.company.category;
                            userData.company_slogan= obj.company.company_slogan;
                            userData.vat= obj.company.vat;

                    console.log(userData);
                    commit('setUserData',userData);
                    localStorage.setItem('workitUser', JSON.stringify(userData));

                }).catch(
                e => {
                    console.log(e);
                }
            )
        },
    loadDictionaries({commit,state}){
        let apiUrl = state.config.api;


        axios.get(apiUrl.allDictionarys)
            .then(response=>{
                const dict=[];
                const obj = response.data.data;
                // for(let key in obj){
                for (let key = 0, len = obj.length; key < len; key++) {
                    console.log(obj[key].title);
                    dict.push({
                        id:obj[key].id,
                        num:key,
                        product_name:obj[key].product_name,
                        category:obj[key].category,
                        manufacturer:obj[key].manufacturer,
                        expiry:obj[key].expiry,
                        barcode:obj[key].barcode,
                        product_type:obj[key].product_type,
                    })
                }
                commit('setDic',dict);

            }).catch(
            e => {
                console.log(e);
            }
        )
    },
    loadTopProds({commit,state}){
        let apiUrl = state.config.api;


        axios.get(apiUrl.top_items)
            .then(response=>{
                const obj = response.data;

                console.log(obj);


                let result=_.chain(obj).groupBy("product_name").map(function(v, i) {
                    return {
                        name: i,
                        value:v.reduce((t, n) => t + (n.quantity), 0)

                    }
                }).value();

                 let over  = JSON.stringify(result, null, '  ');

                commit('setTopProds',result);

                // console.log(result);
                // console.log('junssi');
                // console.log(over);

            }).catch(
            e => {
                console.log(e);
            }
        )
    },

    doSync({commit,state}){
        let today = moment().format('MMMM Do YYYY, h:mm:ss a');

        console.log('Starting Sync'+ today);

        let apiUrl = state.config.api;

        let syn = {
            oid:state.user_data.outlet_id,
            cid:state.user_data.company_id
        }


        axios.post(apiUrl.syncLocal,syn)
            .then(response=>{
                const obj = response.data;
                console.log('Sync Successfull.');
                console.log(obj);
                // console.log(over);

            }).catch(
            e => {
                console.log(e);
            }
        )
    },
    loadCategories({state,commit}){
        let apiUrl = state.config.api;

        let self = this;
        axios.get(apiUrl.allCategories)
            .then(response=>{
                const cat=[];
                const obj = response.data.data;
                // for(let key in obj){
                for (let key = 0, len = obj.length; key < len; key++) {
                    console.log(obj[key].title);
                    cat.push({
                        id:obj[key].id,
                        num:key,
                        cat_name:obj[key].cat_name,
                        cat_user:obj[key].cat_user,

                    })
                }
                commit('setCat',cat);

            }).catch(
            e => {
                console.log(e);
                self.loader = false;

                this.err.push(e);
            }
        )
    },

    loadCount({state,commit}){
        let apiUrl = state.config.api;

        let self = this;
        let c={
            exp:0,
            prod:0,
            deb:0,
            cred:0
        };



        axios.get(apiUrl.exp_count)
            .then(response=>{
                   c.exp = response.data[0].count;

            }).catch(
            e => {
                console.log(e);

            });

        axios.get(apiUrl.prod_count)
            .then(response=>{
                   c.prod = response.data[0].count;

            }).catch(
            e => {
                console.log(e);

            });


        axios.get(apiUrl.deb_count)
            .then(response=>{
                   c.deb = response.data[0].count;

            }).catch(
            e => {
                console.log(e);

            });

        axios.get(apiUrl.cred_count)
            .then(response=>{
                   c.cred= response.data[0].count;
                console.log(c);
                commit('setMini',c);

            }).catch(
            e => {
                console.log(e);
                self.loader = false;

            });






    },
    loadPackUnits({state,commit}){
        let apiUrl = state.config.api;

        let self = this;
        axios.get(apiUrl.allPackUnits)
            .then(response=>{
                const pack=[];
                const obj = response.data.data;
                for (let key = 0, len = obj.length; key < len; key++) {
                    console.log(obj[key].title);
                    pack.push({
                        id:obj[key].id,
                        pack_name:obj[key].pack_name,

                    })
                }
                commit('setPackUnits',pack);

            }).catch(
            e => {
                console.log(e);

            }
        )
    },


    doDrawer({commit,state},payload){
        if(state.drawer){
            commit('setDrawer',false);
        }
        else{
            commit('setDrawer',true);
        }

    },
    doRightDrawer({commit,state},payload){
        if(state.drawerRight){
            commit('setRightDrawer',false);
        }
        else{
            commit('setRightDrawer',true);
        }

    },


    doCustomerID({commit,state},payload){
        commit('setCustomerID',payload);
    }




}