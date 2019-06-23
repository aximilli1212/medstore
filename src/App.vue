<!--suppress ALL -->
<template>
  <v-app class="work_font">
      <gold-head v-if="head"></gold-head>

      <gold-load v-if="clipped"></gold-load>
      <v-content>


          <v-container fluid class="main_body">
              <!--<v-progress-linear-->
                      <!--class="mt-0 pa-0"-->
                      <!--color="secondary"-->
                      <!--height="2"-->
                      <!--:indeterminate="false">
                      </v-progress-linear>-->
              <!--<page-header v-if="$route.meta.breadcrumb" class="mb-0 pushup"></page-header>-->
              <!--<transition-->
                      <!--&lt;!&ndash;enter-active-class="fadeInLeft"&ndash;&gt;-->
                      <!--&lt;!&ndash;leave-active-class="fadeOutRight"&ndash;&gt;-->
                      <!--&lt;!&ndash;mode="out-in"&ndash;&gt;-->
              <!--&gt;-->
              <router-view>

              </router-view>
              <!--</transition>-->

          </v-container>

          <!--<v-snackbar-->
                  <!--:timeout="6000"-->
                  <!--:top="true"-->
                  <!--:right="x === 'right'"-->
                  <!--v-model="snack"-->
                  <!--color=""-->
          <!--&gt;-->
              <!--{{snacky.t}}-->
              <!--<v-btn flat :color="snacky.c" @click.native="snack= false">Close</v-btn>-->
          <!--</v-snackbar>-->

      </v-content>

      <!--<v-footer v-if="head" class="primary&#45;&#45;text footer" app>-->
      <v-footer v-if="head" class="primary--text footer" app>
          <span>WorkIT Facility Management System</span>
          <v-spacer></v-spacer>
          <span>Version 1.6.0 &copy; 2019</span>
      </v-footer>

  </v-app>
</template>

<script>
    const axios = require('axios');
    import moment from 'moment';
    import AppFab from '@/components/AppFab';
    import PageHeader from '@/components/PageHeader';
  export default {
      data: () => ({
          drawer: true,
          clipped:false,
          drawerRight: true,
          right: null,
          left: null,
          snack:false,
      }),
      computed:{
          head(){
              return this.$store.getters.getHead;
          },
          snacky(){
              return this.$store.getters.getSnack;
          }
      },
      watch:{
          snacky(){
             this.snack = true;
          }
      },
      created(){
          this.$store.dispatch('loadCustomers');
          this.$store.dispatch('loadDictionaries');
          this.$store.dispatch('loadProducts');
          this.$store.dispatch('loadCategories');
          this.$store.dispatch('loadPackUnits');
          this.$store.dispatch('loadOutlets');
          this.$store.dispatch('loadTopProds');
          this.$store.dispatch('loadLowStock');
          // this.$store.dispatch('doSync');
          // this.$store.commit('setSalesSession',{shift:"Not Set"});
          if (localStorage.getItem('workitUser')){
              let userData = JSON.parse(localStorage.getItem('workitUser'))
                this.$store.commit('setUserData', userData)
          }
          else{
              this.$router.push('/')
          }
      },
      mounted(){
          // this.syncLocal();
      },
      props: {
          source: String
      },
      methods:{
         syncLocal() {
             let hr = 60 * (1000 * 60)
             setInterval(() => {
                 console.log('I will always love you');
                 this.$store.dispatch('doSync');
             }, 3000 * 60);
    },


      },
      components: {
          AppFab,
          PageHeader,
      },

  }

</script>
<style lang="scss">
    .pushup{
        /*border:1px red solid;*/
        position:relative;
        height:10px;
        bottom:28px;
    }
    .work_font{
        font-family:'Ubuntu';
        font-size:100%;
    }
    .main_body{
        background:#EEF7FB;
    }
    .vue-notifyjs.notifications{
        .list-move {
            transition: transform 0.1s, opacity 0.1s;
        }
        .list-item {
            display: inline-block;
            margin-right: 10px;

        }
        .list-enter-active {
            transition: transform 0.2s ease-in, opacity 0.1s ease-in;
        }
        .list-leave-active {
            transition: transform 1s ease-out, opacity 0.1s ease-out;
        }

        .list-enter {
            opacity: 0;
            transform: scale(1.1);

        }
        .list-leave-to {
            opacity: 0;
            transform: scale(1.2, 0.7);
        }
        .thead{
            background: #474747 url('/static/img/bg.png');
        }
        .ttext{
            color: #2e3436;
            text-shadow: 0px 2px 3px rgba(0,0,0,0.3);
        }
    }
</style>

