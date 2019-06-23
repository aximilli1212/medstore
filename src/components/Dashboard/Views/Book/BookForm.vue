<template>
  <div>


      <simplert :useRadius="true"
                :useIcon="true"
                ref="simplert">
      </simplert>



      <card>
      <v-layout>
        <v-flex xs12 sm6 offset-sm3>
          <div class="headline primary--text" v-if="regform">New Customer Registration</div>
          <small v-if="regform">[Please Register to continue..]</small>
        </v-flex>
      </v-layout>
    <!-- REGISTER USER FORM BEFORE BOOKING -->
    <transition
            dname="bounce"
            enter-active-class="bounceInLeft"
    >
      <register-user v-if="regform">
      </register-user>

    </transition>


    <h4 slot="header" class="card-title" v-if="!regform">Book a Cab</h4>




    <form
            @submit.prevent="bookUp"
            v-if="!regform">


      <!--BOOK REQUEST DETAILS-->
      <transition
              dname="bounce"
              enter-active-class="bounceInLeft"
      >
  <book-request-details v-if="reqdetails">

  </book-request-details>
      </transition>

      <!--PICKUP DETAILS-->
        <transition
                dname="bounce"
                enter-active-class="bounceInLeft"
                leave-active-class="bounceOutRight"
        >
                 <pickup-details v-if="pickdetails"></pickup-details>
        </transition>



        <!--PERSONAL DETAILS-->
        <transition
                dname="bounce"
                enter-active-class="bounceInLeft"
                leave-active-class="bounceOutRight"
        >
        <personal-details v-if="personaldetails"></personal-details>
        </transition>

<!--PAYMENT DETAILS-->
        <!--<transition-->
                <!--dname="bounce"-->
                <!--enter-active-class="bounceInLeft"-->
                <!--leave-active-class="bounceOutRight"-->
        <!--&gt;-->
        <!--<payment-details v-if="paydetails">  </payment-details>-->
        <!--</transition>-->

      <div class="text-center">
        <v-btn type="submit" class="primary">
          Book Ride
        </v-btn>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>


    <!--Confirm Booking Dialog-->
    <v-dialog v-model="bookConfirm" max-width="800px">
      <v-card>
        <!--<v-card-title>-->
          <!--Confirm Booking-->
        <!--</v-card-title>-->

        <transition
                dname="bounce"
                enter-active-class="bounceInLeft"
        >


        <v-card-text v-if="confirmModal">
          <v-card class="grey--text">
            <v-container fluid grid-list-lg>
              <v-layout row>
                <v-flex  >
                  <div>
                    <div class="headline">{{gold_package.name}}</div>
                    <v-icon>map</v-icon><span class="grey--text text--darken-3">Seats: {{gold_package.num_seats}} </span>
                    <v-icon>account_balance_wallet</v-icon><span class="grey--text text--darken-3"> Price: {{gold_package.rate}}  </span>

                    <hr>
                    <v-flex xs10 sm12 offset-xs1>

                      <table class="box-table">

                        <tr>
                          <td class="subheading grey--text text--darken-3">Pickup Loc.:</td>
                          <!--<td class="primary&#45;&#45;text text&#45;&#45;darken-1">americanion</td>-->
                          <td class="primary--text text--darken-1">{{getBookInfo.pickup}}</td>

                        </tr>
                        <tr>
                          <td class="subheading grey--text text--darken-3">Dropoff Loc.:</td>
                          <!--<td class="primary&#45;&#45;text text&#45;&#45;darken-1">bookme</td>-->
                          <td class="primary--text text--darken-1">{{getBookInfo.dropoff}}</td>

                        </tr>
                        <tr>
                          <td class="subheading grey--text text--darken-3">Pickup Date:</td>
                          <td class="primary--text text--darken-1">{{getBookInfo.pdate}}</td>
                          <!--<td class="primary&#45;&#45;text text&#45;&#45;darken-1">30-04-2018</td>-->

                        </tr>
                        <tr>
                          <td class="subheading grey--text text--darken-3">Pickup Time:</td>
                          <!--<td class="primary&#45;&#45;text text&#45;&#45;darken-1">23:00</td>-->
                          <td class="primary--text text--darken-1">{{getBookInfo.ptime.HH+':'+getBookInfo.ptime.mm}}</td>

                        </tr>
                        <tr>
                          <td class="subheading grey--text text--darken-3">Dropoff Date:</td>
                          <!--<td class="primary&#45;&#45;text text&#45;&#45;darken-1">12-03-2018</td>-->
                          <td class="primary--text text--darken-1">{{getBookInfo.ddate}}</td>

                        </tr>
                        <tr>
                          <td class="subheading grey--text text--darken-3">Dropoff Time:</td>
                          <!--<td class="primary&#45;&#45;text text&#45;&#45;darken-1">12:33 pm</td>-->
                          <td class="primary--text text--darken-1">{{this.getBookInfo.dtime.HH+':'+this.getBookInfo.dtime.mm}}</td>

                        </tr>
                      </table>

                       </v-flex>

                  </div>
                </v-flex>



                <v-flex xs12 sm6>
                  <v-card-media
                          :src=gold_package.img_url
                          height="100px"
                          contain
                  ></v-card-media>

                  <table class="box-table">
                    <tr>
                      <td class="subheading grey--text text--darken-3">Book Duration</td>
                    </tr>

                    <tr>
                      <!--<td class="green&#45;&#45;text text&#45;&#45;darken-3">3838</td>-->
                      <td class="green--text text--darken-3">{{getBillInfo[0].duration}}</td>
                    </tr>
                    <tr>
                      <td class="subheading grey--text text--darken-3">Book Hours</td>
                    </tr>

                    <tr>
                      <!--<td class="red&#45;&#45;text text&#45;&#45;darken-1">82 Hours</td>-->
                      <td class="red--text text--darken-1">{{getBookTime}} Hours <small color="grey--text text--darken-5">(@ {{gold_package.rate}})</small></td>

                    </tr>

                    <tr>
                      <td class="subheading grey--text text--darken-3">Total Bill</td>
                    </tr>

                    <tr>
                      <!--<td class="green&#45;&#45;text text&#45;&#45;darken-3 display-1">GHc 4000</td>-->
                      <td class="green--text text--darken-3 display-1">GHc {{getGrandTotal}}</td>
                    </tr>

                  </table>
                  <span class="grey--text caption">NB:: Book times less than 30mins are round up to 30mins. </span>


                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-card-text>
        <v-card-text v-else>
          <v-card class="grey--text">
            <v-container fluid grid-list-lg>
              <v-layout row>
                <v-flex  >
                  <div>
                    <div class="headline">{{gold_package.name}}</div>
                    <v-icon>map</v-icon><span class="grey--text text--darken-3">Seats: {{gold_package.num_seats}} </span>
                    <v-icon>account_balance_wallet</v-icon><span class="grey--text text--darken-3"> Price: {{gold_package.rate}}  </span>

                    <hr>
                    <v-flex xs10 sm12 offset-xs1>
                      <v-radio-group v-model="radioGroup">

                      <v-radio
                              label="Mtn Mobile Money"
                              color="yellow darken-2"
                              value="mtn"
                      ></v-radio>
                      <v-radio
                              label="Vodafone Cash"
                              color="red darken-3"
                              value="voda"
                      ></v-radio>
                      <v-radio
                              label="Visa"
                              color="indigo"
                              value="visa"
                      ></v-radio>
                      <v-radio
                              label="Cash"
                              color="green darken-3"
                              value="cash"
                      ></v-radio>
                        <v-radio
                              label="Cheque"
                              color="grey darken-3"
                              value="cheque"
                      ></v-radio>
                      </v-radio-group>

                       </v-flex>

                  </div>
                </v-flex>



                <v-flex xs12 sm6>
                  <v-card-media
                          src='/static/img/pay_up.png'
                          height="100px"
                          contain
                  ></v-card-media>
                  <span class="grey--text caption">All Payments are secured by EcoBank Ghana. </span>
                    <slide-y-up-transition  >
                        <v-btn large outline v-if="submitBook" @click="bookRide" class="primary--text">Submit Booking</v-btn>
                        <!--<v-btn large outline v-if="submitBook" @click="testSim" class="primary&#45;&#45;text">Submit Booking</v-btn>-->
                    </slide-y-up-transition>

                </v-flex>

              </v-layout>
            </v-container>
          </v-card>
        </v-card-text>
        </transition>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="goPayment">{{modalBtn}}<v-icon right>mdi-send</v-icon></v-btn>
          <v-btn color="primary" flat @click.stop="cancelModal">Cancel</v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>


    </div>
</template>
<script>
  import Card from '@/components/UIComponents/Cards/Card.vue'
  import RegisterUser from '@/components/Dashboard/Views/UserProfile/EditProfileForm'
  import BookRequestDetails from "./BookRequestDetails";
  import PickupDetails from "./PickupDetails";
  import PersonalDetails from "./PersonalDetails";
  import PaymentDetails from "./PaymentDetails";

  export default {
    components: {
        BookRequestDetails,
        PickupDetails,
        PersonalDetails,
        PaymentDetails,
        Card,
        RegisterUser,

    },
    data () {
      return {
          radioGroup:'',
          submitBook:false,
          modalBtn:'Go To Payment',
          confirmModal:true,
          car_dialog:true,
          dialog:false,
          dg:false,
          pickup:'',
          bookConfirm:false,
          info:{},
          gold_package:[
          ],
          pickDetails:{
              pickup:'Not Set',
              ddate: '00-00-0000',
              pdate: '00-00-0000',
              datemenu: false,
              dmenu: false,
              pmenu:false,
              pdatemenu: false,
              ptime: {
                  HH: "12",
                  mm: "00",
              },
              dtime: {
                  HH: "14",
                  mm: "00",
              },
              dropoff: 'Not Set',
          },
      }
    },
     computed:{
                reqdetails(){
                return this.$store.state.reqdetails
            },
                pickdetails(){
                return this.$store.state.pickdetails
            },
                personaldetails(){
                return this.$store.state.personaldetails
            },
                paydetails(){
                return this.$store.state.paydetails
            },
                regform(){
                return this.$store.state.regform
            },
                getEmail(){
                    return this.$store.state.user.email
           },
         getCustomerID(){
                    return this.$store.state.customerID;
           },
                getBookInfo(){
                    return this.$store.getters.getBookInfo;
         },
                getBillInfo(){
                    return this.$store.getters.getBillData;
         },
                bookPackage(){
                    return this.$store.getters.bookPackage;
         },
                getBookTime(){
                    return this.$store.getters.getBookTime;
         },
                getGrandTotal(){
                    return this.$store.getters.getGrandTotal;
         },
         // getPtime(){
         //            return this.$store.getters.getBillData;
         // },
         // getDtime(){
         //            return this.$store.getters.getBillData;
         // }

     },

      watch: {
           radioGroup: function () {
            if(this.radioGroup === 'cash'){
                this.submitBook = true;
            }
            else{
                this.submitBook=false;
            }
          }
      },

          mounted(){
        this.fetchCustomer();
        // this.bookUp();
          this.gold_package = this.$store.getters.Package[this.bookPackage];
        this.info=this.getBookInfo;
        this.$store.commit('setBookInfo',this.pickDetails)
      },
    methods: {
      updateProfile () {
        alert('Your data: ' + JSON.stringify(this.user))
      },
        fetchCustomer(){
          this.$store.dispatch('fetchCustomer', this.getEmail)
          this.$store.dispatch('getCustomerID', this.getEmail)

        },
        bookUp(){
            this.bookConfirm = true;
            this.gold_package = this.$store.getters.Package[this.bookPackage];

        },
        goPayment(){
           this.confirmModal = false;
           this.modalBtn = 'Make Payment';
        },
        cancelModal(){
            this.bookConfirm=false;
            this.confirmModal=true;
        },

        setSubmitBook(){
          alert('submit');
        },
        afterBookSubmit(){
            this.bookConfirm=false;
            this.confirmModal=true;
            this.$store.commit('setBookInfo',this.pickDetails);
            this.clearBooking();
            this.testSim();

        },
        testSim(){
            let obj = {
                title: 'Success!',
                message: 'Booking successfully Submitted.',
                type: 'success',
                onClose: this.onClose,
                // customCloseBtnClass: 'primary'
            }
            this.$refs.simplert.openSimplert(obj);
        },


        bookRide(){
           //Create book details object
            const bookDetails={
                customer_id:this.getCustomerID,
                vehicle_id:'1',
                driver_id:'1',
                package_id:this.bookPackage,
                pickup_date:this.getBookInfo.pdate,
                pickup_time:this.getBookInfo.ptime.HH+':'+this.getBookInfo.ptime.mm,
                dropoff_date:this.getBookInfo.ddate,
                dropoff_time:this.getBookInfo.dtime.HH+':'+this.getBookInfo.dtime.mm,
                pickup_location:this.getBookInfo.pickup,
                dropoff_location:this.getBookInfo.dropoff,
                book_time:this.getBillInfo[0].duration,
                total_bill:this.getGrandTotal,
                status_id:'1',
                total_days:this.$store.getters.getBookDays,
            }

            this.$store.dispatch('postBooking',bookDetails);

            this.afterBookSubmit();
        }
    }
  }




</script>
<style>

</style>
