<template>
  <div>
      <!--<v-navigation-drawer-->
              <!--v-model="drawerRight"-->
              <!--fixed-->
              <!--right-->
              <!--clipped-->
              <!--app-->
      <!--&gt;-->
          <!--<v-list dense>-->
              <!--<v-list-tile @click.stop="right = !right">-->
                  <!--<v-list-tile-action>-->
                      <!--<v-icon>exit_to_app</v-icon>-->
                  <!--</v-list-tile-action>-->
                  <!--<v-list-tile-content>-->
                      <!--<v-list-tile-title>Open Temporary Drawer</v-list-tile-title>-->
                  <!--</v-list-tile-content>-->
              <!--</v-list-tile>-->
          <!--</v-list>-->
      <!--</v-navigation-drawer>-->

      <v-toolbar
              class="primary--text"
              fixed
              app
              dense
              clipped-left
              clipped-right
      >

          <v-toolbar-side-icon @click.stop="showDrawer()"></v-toolbar-side-icon>
          <v-toolbar-title @click="$router.push('/dashboard')" class="pointer">WorkIT FMS</v-toolbar-title>
          <v-toolbar-title class="secondary--text subheading">{{userData.company_name}}</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-toolbar-items>

              <v-menu
                      offset-y
                      v-for="(sup, i) in menuItems"
                  bottom
                  origin="center center"
                  transition="scale-transition"
          >
              <v-btn
                      class="primary--text"
                      flat
                      slot="activator"
                      color="primary--text"
                      dark
              >
                 {{sup.title}}
              </v-btn>

              <v-list>
                  <v-list-tile

                          v-for="(item, i) in sup.items"
                          :key="i"
                          @click="$router.push(item.link)"
                  >
                      <v-list-tile-title @click="$router.push(item.link)" >{{ item.title }}</v-list-tile-title>
                  </v-list-tile>
              </v-list>
          </v-menu>

          </v-toolbar-items>

          <v-btn icon class="secondary--text elevation-4" @click="handleFullScreen()">
              <v-icon class="">fullscreen</v-icon>
          </v-btn>
          <v-menu offset-y origin="center center" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
              <v-btn icon flat color="primary" slot="activator">
                  <v-badge color="red" overlap>
                      <span slot="badge">3</span>
                      <v-icon medium>notifications</v-icon>
                  </v-badge>
              </v-btn>
              <notification-list></notification-list>
          </v-menu>
          <v-menu offset-y origin="center center" :nudge-bottom="1" transition="scale-transition">
              <v-btn icon large flat slot="activator">
                  <v-avatar size="30px">
                      <img src="/static/img/male.gif" alt="fms_user"/>
                  </v-avatar>
              </v-btn>
              <v-list class="pa-0">
                  <v-list-tile v-for="(item,index) in items" :to="!item.href ? { name: item.name } : null" :href="item.href" @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener" :key="index">
                      <v-list-tile-action v-if="item.icon">
                          <v-icon>{{ item.icon }}</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                      </v-list-tile-content>
                  </v-list-tile>
              </v-list>
          </v-menu>

          <!--<v-toolbar-side-icon @click.stop="showRightDrawer()"></v-toolbar-side-icon>-->
      </v-toolbar>


      <!--<page-header v-if="$route.meta.breadcrumb"></page-header>-->
      <v-navigation-drawer
              width="200"
              v-model="drawer"
              app
              fixed
              left
              clipped
      >
          <v-list dense>
              <v-list-tile v-for="item in side_items" :key="item.text" @click="$router.push(item.link)">
                  <v-list-tile-action >
                      <v-icon color="secondary">{{ item.icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                      <v-list-tile-title>
                          {{ item.text }}
                      </v-list-tile-title>
                  </v-list-tile-content>
              </v-list-tile>
          </v-list>
      </v-navigation-drawer>
      <v-navigation-drawer
              v-model="left"
              temporary
              fixed
      ></v-navigation-drawer>
  </div>
</template>

<script>
    import NotificationList from '@/components/widgets/list/NotificationList';
    import AppFab from '@/components/AppFab';
    import PageHeader from '@/components/PageHeader';
    export default {
            name: "gold-header",
            data() {
                return {
                    isUpdating:true,
                    // drawer: true,
                    // drawerRight: false,
                    right: null,
                    left: null,
                    sup_items: [
                        { title: 'POINT OF SALE',
                            items: [
                                { title: 'Sales',link:'/make_sale_barcode'},
                                { title: 'Expenses' ,link:'/expenses'},
                                { title: 'Report Expired Items' ,link:'/pos_expiry'},

                            ]
                        },
                        { title: 'ACCOUNTS',
                            items: [
                                { title: 'Bank Account' ,link:'/bank_account'},
                                { title: 'Bank Transactions',link:'/bank_transact'},
                                { title: 'Debtors',link:'/debtors' },
                                { title: 'Creditors',link:'/creditors' },
                                { title: 'Customer Statements',link:'/customer_statements' },
                                { title: 'Supplier Statements',link:'/supplier_statements' },
                                { title: 'Income/Expenditure' },
                                // { title: 'Credit Notes' },
                                // { title: 'Debit Notes' },
                            ]
                        },
                        { title: 'INVENTORY',
                            items: [
                                { title: 'Stock Manager',link:'/stock_manager' },
                                { title: 'Add Products',link:'/add_products' },
                                { title: 'Purchases',link:'/purchases' },
                                { title: 'Transfer Items' ,link:'/transfer_items'},
                                { title: 'Receive Items',link:'/receive_items' },
                                { title: 'Report Expiries',link:'/pos_expiry' },
                                { title: 'Stock Reconciliation',link:'/stock_recon' },
                                { title: 'Reorders',link:'/reorders' },
                                { title: 'Top Products',link:'/toppers' },
                            ]
                        },
                        { title: 'REPORTS',
                            items: [
                                { title: 'Sales Report',link:'/sales_report' },
                                { title: 'Stock Activities',link:'stock_activities' },
                                { title: 'Product Activities',link:'/product_activities' },
                                { title: 'Expiry Reports' ,link:'/expiry_reports'},
                                // { title: 'Top Products',link:'/top_products' }
                            ]
                        },
                        { title: 'ADMIN',
                            items: [
                                { title: 'Customers' ,link:'/Customers'},
                                { title: 'Suppliers' ,link:'/suppliers'},
                                { title: 'Manage POS Sessions',link:'/sale_sessions' },
                                { title: 'Manage Companies',link:'/company' },
                                { title: 'Manage Outlets',link:'/outlets' },
                                { title: 'Manage Users',link:'/fms_users' },
                                { title: 'Pack Units',link:'/pack_unit' },
                                // { title: 'View Logs' ,link:'/logs'},

                            ]
                        }
                    ],
                    items: [
                        {
                            icon: 'account_circle',
                            title: 'Profile',
                            click: (e) => {
                                this.$router.push('/user_profile');

                            }
                        },
                        {
                            icon: 'settings',
                            href: '#',
                            title: 'Settings',
                            click: (e) => {
                                console.log(e);
                            }
                        },
                        {
                            icon: 'fullscreen_exit',
                            title: 'Logout',
                            click: (e) => {
                                localStorage.setItem('workitUser', JSON.stringify({}));
                                this.$store.commit('setSnack',{t:"You have been Logged Out.", c:"green darken-3"})
                                this.$router.push('/');

                            }
                        }
                    ],
                }
            },
            props:{
                source: String
            },
            computed:{
                side_items(){
                    return this.$store.getters.getSideItems;
                },

                menuItems() {

                    let menu = [];
                    const role = this.userData.role;

                    let p = { title: 'POINT OF SALE',
                            items: [
                                { title: 'Sales',link:'/make_sale'},
                                { title: 'Expenses' ,link:'/expenses'},
                                { title: 'Report Expired Items' ,link:'/pos_expiry'},
                                { title: 'Re-order Stock' ,link:'/requisitions'},
                                { title: 'Receive Stock' ,link:'/pos_receive'},
                            ]
                        };

                    let ac =  { title: 'ACCOUNTS',
                            items: [
                                { title: 'Bank Account' ,link:'/bank_account'},
                                { title: 'Bank Transactions',link:'/bank_transact'},
                                // { title: 'Debtors',link:'/debtors' },
                                // { title: 'Creditors',link:'/creditors' },
                                // { title: 'Customer Statements',link:'/customer_statements' },
                                // { title: 'Supplier Statements',link:'/supplier_statements' },
                                // { title: 'Income/Expenditure' },
                                // { title: 'Credit Notes' },
                                // { title: 'Debit Notes' },
                            ]
                        };

                    let i ={ title: 'INVENTORY',
                            items: [
                                { title: 'Stock Manager',link:'/stock_manager' },
                                { title: 'Add Products',link:'/add_products' },
                                { title: 'Purchases',link:'/purchases' },
                                // { title: 'Transfer Items' ,link:'/transfer_items'},
                                { title: 'Receive Items',link:'/receive_items' },
                                { title: 'Reorders',link:'/inv_requisitions' },
                                { title: 'Report Expiries',link:'/pos_expiry' },
                                { title: 'Top Products',link:'/toppers' },
                                { title: 'Stock Shortages',link:'/inv_shortages' },
                                // { title: 'Stock Reconciliation',link:'/stock_recon' },
                                // { title: 'Stock Recon',link:'/good_recon' },
                            ]
                        };

                    let r = { title: 'REPORTS',
                            items: [
                                { title: 'Sales Report',link:'/sales_report' },
                                { title: 'Stock Activities',link:'stock_activities' },
                                { title: 'Product Activities',link:'/product_activities' },
                                { title: 'Expiry Reports' ,link:'/expiry_reports'},
                                { title: 'Top Products',link:'/toppers' },

                                // { title: 'Top Products',link:'/top_products' }
                            ]
                        };

                    let ad =  { title: 'ADMIN',
                        items: [
                            { title: 'Customers' ,link:'/Customers'},
                            { title: 'Suppliers' ,link:'/suppliers'},
                            { title: 'Manage POS sessions',link:'/sale_sessions' },
                            // { title: 'My Company',link:'/my_company' },
                            // { title: 'Manage Outlets',link:'/outlets' },
                            // { title: 'Manage Users',link:'/fms_users' },
                            { title: 'Pack Units',link:'/pack_unit' },
                            // { title: 'View Logs' ,link:'/logs'},

                        ]
                    };
                    let adx =  { title: 'ADMINISTRATION',
                        items: [
                            // { title: 'Customers' ,link:'/Customers'},
                            // { title: 'Manage POS sessions',link:'/sale_sessions' },
                            // { title: 'Manage Companies',link:'/company' },
                            // { title: 'My Company',link:'/my_company' },
                            { title: 'Suppliers' ,link:'/suppliers'},
                            { title: 'Manage Outlets',link:'/outlets' },
                            { title: 'Manage Users',link:'/fms_users' },
                            { title: 'Therapeutic Categories',link:'/categories' },
                            { title: 'Stock Keeping Units',link:'/pack_unit' },
                            { title: 'Dosage Forms',link:'/dosage_forms' },
                            // { title: 'View Logs' ,link:'/logs'},

                        ]
                    };

                    if(role.includes('P')){
                        menu.push(p);
                    }
                    if(role.includes('F')){
                        menu.push(p);
                        menu.push(ac);
                    }
                    if(role.includes('W')){
                        menu.push(p);
                        menu.push(ac);
                        menu.push(i);
                    }
                    if(role.includes('C')){
                        menu.push(p);
                        menu.push(r);
                    }

                    if(role.includes('A')){
                        menu.push(p);
                        menu.push(ac);
                        menu.push(i);
                        menu.push(r);
                        menu.push(ad);
                    }
                    if(role.includes('X')){

                        menu.push(i);
                        menu.push(ac);
                        menu.push(r);
                        menu.push(adx);

                    }

                    return menu;



                },
                userIsAuthenticated(){
                    return this.$store.getters.user !== '';
                },
                reqMsg(){
                    return this.$store.getters.getReqMsg;
                },
                drawer(){
                    return this.$store.getters.getDrawer;
                },
                drawerRight(){
                    return this.$store.getters.getRightDrawer;
                },

            },
            methods:{
                handleFullScreen () {
                    let doc = window.document;
                    let docEl = doc.documentElement;

                    let requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
                    let cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

                    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                        requestFullScreen.call(docEl);
                    }
                    else {
                        cancelFullScreen.call(doc);
                    }
                },
                showDrawer(){
                  this.$store.dispatch('doDrawer')
                },
                showRightDrawer(){
                  this.$store.dispatch('doRightDrawer')
                },
                open_dialog(){
                    this.dialog=true;
                },
                checkuser(){
                    console.log(this.$store.getters.user)
                },
                clearForm(){
                    this.name= '';
                    this.phone= '';
                    this.message= '';
                    this.customerName = '';
                    this.customerPhone= '';
                },
                sendMessage(){
                    if(this.formIsValid) {
                        this.msg_loader=true;
                        const msg = {
                            rname: this.name,
                            rphone: this.phone,
                            rmsg: this.message,

                        }

                        this.$store.dispatch('sendMsg', msg);
                    }
                    else{
                        this.$validator.validateAll();
                        this.formHasErrors=true;
                        this.msg_loader=false;
                        return false;
                    }

                },
                requestCallBack(){

                    if(this.regFormIsValid) {
                        const req={
                            name:this.customerName,
                            phone:this.customerPhone,
                        }

                        console.log(req);

                        this.$store.dispatch('sendReq',req);
                        this.loading = true;
                    }
                    else{
                        this.loading = false;
                        return false;

                    }
                }
            },
            mounted(){
                 this.checkuser();
            },
            watch: {
                loader () {
                    const l = this.loader
                    this[l] = !this[l]

                    setTimeout(() => (this[l] = false), 3000)

                    this.loader = null
                },
                reqMsg:function(){
                    this.clearForm();
                    this.su_snack=true;
                    this.msg_loader=false;
                    this.loading=false;
                    this.clog=false;
                    this.$refs.form.reset()

                }



        },
        components: {
            NotificationList,
            AppFab,
            PageHeader,
        },

        }

</script>

<style scoped>
    .wtool{
        height:30%;
    }
    .pointer{
        cursor:pointer;
    }
    .callback_pulse {
        animation: opacityPulse 1s ease-out;
        animation-iteration-count: infinite;
        opacity: 0;
    }
    @-webkit-keyframes opacityPulse {
        0% {opacity: 0.0;}
        50% {opacity: 1.0;}
        100% {opacity: 0.0;}
    }
    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }
    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>