// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import * as Cookies from 'js-cookie';
import 'vuetify/dist/vuetify.css';
import VueRouter from 'vue-router';
import App from './App';
import router from './router';
import config from './config'
import {store} from './store/store'
import DateFilter from './filters/date';
import AlertCmp from './components/Shared/Alert';
import GoldHead from './components/Dashboard/Layout/GoldHeader';
import GoldAgile from './components/UIComponents/GoldAgile';
import GoldAuto from './components/UIComponents/GoldAuto';
import SetCustomer from './components/workit/pos/setCustomer';
import SetProduct from './components/workit/inventory/setProduct';
import SetPurchase from './components/workit/inventory/purchases/setPurchase';
import SetDictionary from './components/workit/inventory/purchases/setDictionary';
import SetReorder from './components/workit/inventory/purchases/setReorder';
import GoldLoad from './components/Shared/GoldLoad';
import Datepicker from 'vue-material-datepicker';
import Mixins from './mixins';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueTimepicker from 'vue2-timepicker';
import Simplert from 'vue2-simplert';
import VeeValidate from 'vee-validate';
// import VTooltip from 'v-tooltip';
import VueAgile from 'vue-agile';
// import VueBarcode from 'vue-barcode';
import _ from 'lodash';
import moment from 'moment';

// import { format, formatDistance, formatRelative, subDays } from 'date-fns';
// import Printd from 'printd';
import 'material-design-icons/iconfont/material-icons.css'
import 'typeface-roboto/index.css'

import VDateRange from 'vuetify-daterange-picker';
import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css';

import Transitions from 'vue2-transitions'

require('vue2-animate/dist/vue2-animate.min.css');

Vue.use(VueAgile);
// Vue.use(Printd);
Vue.use(VueRouter);
Vue.mixin(Mixins);
Vue.use(VueAxios, axios);
Vue.use(VueTimepicker);
// Vue.use(VTooltip);
Vue.use(Transitions);
Vue.use(VeeValidate);
Vue.use(VDateRange);

Vue.mixin({
    computed:{
        userData(){
            return this.$store.getters.getUserData;
        },
        userDataID(){
            return this.$store.getters.getUserData.id;
        },
        outlets(){
            return this.$store.getters.getMylets;
        }
    },
    mounted(){
        // let ui = Cookies.get('auth');
        //
        // if(this.userData.id === 0){
        //
        //     this.$router.push('/');
        // }

    },

    methods:{

    }

})

Vue.filter('readable-date',function(value){
    return this.moment(value).format('MMMM Do YYYY');
});


Vue.use(Vuetify,{
    iconfont: 'mdi',
    theme: {
        primary: '#074D64',
        glossy_black: '#010101',
        light_grey:'#E0E6FF',
        deep_grey:'#333333',
        secondary: '#660033',
        accent: '#8c9eff',
        error: '#b71c1c',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
    }
})

Vue.config.productionTip = false

Vue.filter('date',DateFilter);
Vue.prototype.moment = moment;
// nii moment
// moment().format('MMMM Do YYYY, h:mm:ss a'); // November 1st 2018, 11:47:54 am



const EventBus = new Vue()

Object.defineProperties(Vue.prototype, {
    $bus: {
        get: function () {
            return EventBus
        }
    }
})



Vue.component('app-alert',AlertCmp)
Vue.component('gold-auto',GoldAuto)
Vue.component('gold-agile',GoldAgile)
Vue.component('gold-head',GoldHead)
Vue.component('gold-load',GoldLoad)
Vue.component('set-customer',SetCustomer)
Vue.component('set-product',SetProduct)
Vue.component('set-purchase',SetPurchase)
Vue.component('set-dictionary',SetDictionary)
Vue.component('set-reorder',SetReorder)
Vue.component('vue-timepicker',VueTimepicker )
Vue.component('simplert',Simplert );
// Vue.component('barcode',VueBarcode);



/* eslint-disable no-new */

export const eventBus = new Vue();

new Vue({
  el: '#app',
  router,
    store,
    data(){
        return{
            linkActiveClass: 'nav-item active',
            x:'',

        }

    },
    render : h => h(App),
 created(){

 },

 components:{
     datepicker: Datepicker,
 }
})

