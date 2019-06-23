<template>
  <div>

      <v-layout row justify-center wrap>
          <v-dialog v-model="car_dialog" max-width="1990">
              <v-card>
                  <v-card-title class="headline">Choose from any of our packages </v-card-title>
                  <v-layout wrap justify-space-around align-center>



                      <!--STANDARD PACKAGE-->
                      <v-badge overlap class="pcursor"
                               @click.native="bookNow(0)"
                      >
                              <img src="/static/img/sm17.png" alt="John">
                          <div>
                              <p class="primary--text "> Standard Package </p>
                              <v-icon>map</v-icon><span class="grey--text">Seats: 4 </span>
                              <!--<v-icon>account_balance_wallet</v-icon><span class="grey&#45;&#45;text"> Price: Ghc 50 / hr  </span>-->

                          </div>
                      </v-badge>

                      <!--MID-RANGE PACKAGE-->
                      <v-badge overlap class="pcursor"
                               @click.native="bookNow(2)"
                      >
                              <img src="/static/img/sm15.png" alt="John">
                          <div>
                              <p class="primary--text "> Mid-range Package </p>
                              <v-icon>map</v-icon><span class="grey--text">Seats: 4 - 7 </span>
                              <!--<v-icon>account_balance_wallet</v-icon><span class="grey&#45;&#45;text"> Price: Ghc 70 / hr  </span>-->

                          </div>
                      </v-badge>

                      <!--TRAVEL PACKS-->

                      <v-badge overlap class="pcursor"
                               @click.native="bookNow(3)"
                      >
                              <img src="/static/img/sm16.png" alt="John">
                          <div>
                              <p class="primary--text "> Travel Package </p>
                              <v-icon>map</v-icon><span class="grey--text">Seats: 5 - 8 </span>
                              <!--<v-icon>account_balance_wallet</v-icon><span class="grey&#45;&#45;text"> Price: Ghc 100 / hr  </span>-->

                          </div>
                      </v-badge>

                      <!--HIGH END VANS-->
                      <v-badge overlap class="pcursor"
                               @click.native="bookNow(4)"
                      >
                              <img src="/static/img/sm14.png" alt="John">
                          <div>
                              <p class="primary--text "> Van Package </p>
                              <v-icon>map</v-icon><span class="grey--text">Seats: 8 - 12 </span>
                              <!--<v-icon>account_balance_wallet</v-icon><span class="grey&#45;&#45;text"> Price: Ghc 120 /h r  </span>-->

                          </div>
                      </v-badge>

                      <!--EXECUTIVE PACKAGE-->

                      <v-badge overlap class="pcursor"
                               @click.native="bookNow(1)"
                      >
                              <img src="/static/img/sm18.png" alt="John">
                          <div>
                              <p class="primary--text "> Executive Package </p>
                              <v-icon>map</v-icon><span class="grey--text">Seats: 5 - 8 </span>
                              <!--<v-icon>account_balance_wallet</v-icon><span class="grey&#45;&#45;text"> Price: Ghc 150 / hr  </span>-->

                          </div>
                      </v-badge>



                  </v-layout>
                  <v-card-actions xs12 sm6 offset-3>
                      <v-spacer></v-spacer>
                      <v-btn color="primary darken-1" flat="flat" @click.native="car_dialog = false">OK</v-btn>
                      <!--<v-btn color="primary darken-1" flat="flat" @click="testSim">OK</v-btn>-->
                  </v-card-actions>
              </v-card>

          </v-dialog>
      </v-layout>



      <simplert :useRadius="true"
                :useIcon="true"
                ref="simplert">
      </simplert>




      <v-card v-if="" class="grey--text">
              <v-container fluid grid-list-lg>
                  <v-layout row>
                      <v-flex  >
                          <div>
                              <div class="black--text subheading">Booking Request:</div>
                              <div class="headline">{{gold_package.name}}</div>
                              <hr>
                              <v-flex xs10 sm12 offset-xs1>



                              <v-icon>map</v-icon><span class="grey--text">Seats: {{gold_package.num_seats}} </span>
                              <v-icon>account_balance_wallet</v-icon><span class="grey--text"> Price: {{gold_package.rate}}  </span>
                              </v-flex>

                          </div>
                      </v-flex>

                      <v-flex xs12 sm6>
                          <v-card-media
                                  :src=gold_package.img_url
                                  height="100px"
                                  contain
                          ></v-card-media>
                          <v-flex xs2>
                              <v-btn class="primary--text"  @click="car_dialog = true" outline>Change Package</v-btn>
                          </v-flex>
                      </v-flex>
                  </v-layout>
              </v-container>
          </v-card>


  </div>


</template>

<script>
    export default {
        name: "book-request-details",
        data(){
            return{
                gold_package:[
                    // {name:'Standard Package',img_url:'/static/img/sm17.png',num_seats:'4'}
                ],
                car_dialog:false
            }
        },
        computed:{
            bookPackage(){
                return this.$store.getters.bookPackage;
            }
        },
        mounted(){
            this.gold_package_set();
        },
        methods:{
            gold_package_set(){
                this.gold_package = this.$store.getters.Package[this.bookPackage]
                // alert(this.gold_package.rate);
                this.$store.commit('setBillRate',this.gold_package.rate);

            },
            bookNow(book_package){
                 // this.$bus.$emit('package-change','here');
                this.loading=true;
                this.$store.commit('set_book',true);
                this.$store.commit('setPackage',book_package);
                this.gold_package_set();
                this.car_dialog = false;
            },
            testSim(){
                let obj = {
                    title: 'Success!',
                    message: 'Booking successfully Submitted.',
                    type: 'success',
                    onClose: this.onClose
                }
                this.$refs.simplert.openSimplert(obj);
            }
        },
    }
</script>

<style scoped>

    .pcursor:hover{
        cursor:pointer;
        top:1%;
        border-bottom:1px solid #e3e3e3;
        box-shadow:2px -1px 8px rgba(0,0,0,0.6);
    }
    .icursor:hover{
        cursor:pointer;
        top:1%;
        /*border-right:1px solid goldenrod;*/
    }
</style>