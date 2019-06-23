<template>
    <div>


    <v-card v-if="" class="grey--text pl-5">
        <v-container fluid grid-list-lg>
            <v-layout row>

                <v-flex xs8 sm10 >
                        <div class="black--text ">Pickup & Destination Details:</div>
                        <hr>
                </v-flex>


                   <!--PICK UP DETAILS-->
              <v-card class="ml-2">

                  <v-flex xs12 sm10 >
                      <v-text-field

                              name='pickup'
                              label="Pickup Location"
                              id="pickup"
                              v-model="pickDetails.pickup"
                              type="text"
                              prepend-icon="mdi-map"
                              required
                      >

                      </v-text-field>
                  </v-flex>

                  <v-flex xs12 sm10 >
                      <!--<v-menu-->
                              <!--ref="pickDetails.pmenu"-->
                              <!--lazy-->
                              <!--:close-on-content-click="false"-->
                              <!--v-model="pickDetails.pmenu"-->
                              <!--transition="scale-transition"-->
                              <!--offset-y-->
                              <!--full-width-->
                              <!--:nudge-right="40"-->
                              <!--max-width="290px"-->
                              <!--min-width="290px"-->
                      <!--&gt;-->

                          <!--<v-text-field-->
                                  <!--slot="activator"-->
                                  <!--label="Select Pickup Time"-->
                                  <!--v-model="pickDetails.ptime"-->
                                  <!--prepend-icon="mdi-clock"-->
                                  <!--readonly-->
                          <!--&gt;</v-text-field>-->
                          <!--<v-time-picker v-model="pickDetails.ptime" autosave-->
                              <!--format="24hr"-->
                          <!--&gt;</v-time-picker>-->
                      <!--</v-menu>-->
                      <v-icon>mdi-clock</v-icon>  <vue-timepicker v-model="pickDetails.ptime" format="hh:mm A"></vue-timepicker>

                  </v-flex>

                  <v-flex xs12 sm10 >


                      <v-menu
                              lazy
                              :close-on-content-click="false"
                              v-model="pickDetails.pdatemenu"
                              transition="scale-transition"
                              offset-y
                              full-width
                              :nudge-right="40"
                              max-width="290px"
                              min-width="290px"
                      >
                          <v-text-field
                                  slot="activator"
                                  label="Select Pickup Date"
                                  v-model="pickDetails.pdate"
                                  prepend-icon="mdi-calendar"
                                  readonly
                          ></v-text-field>
                          <v-date-picker v-model="pickDetails.pdate" no-title scrollable actions>
                              <template slot-scope="{ save, cancel }">
                                  <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                                      <v-btn flat color="primary" @click="save">OK</v-btn>
                                  </v-card-actions>
                              </template>
                          </v-date-picker>
                      </v-menu>

                  </v-flex>



              </v-card>
             <hr />

                <!--DROP OFF DETAILS-->
               <v-card sm12 class="ml-2">
                   <v-flex xs12 sm10>
                       <v-text-field

                               name='dropoff'
                               label="Dropoff Location"
                               id="dropoff"
                               v-model="pickDetails.dropoff"
                               type="text"
                               class="primary--text"
                               prepend-icon="mdi-map"
                               required
                       ></v-text-field>
                   </v-flex>

                   <v-flex xs12 sm10 >
                       <!--<v-menu-->
                               <!--lazy-->
                               <!--:close-on-content-click="false"-->
                               <!--v-model="pickDetails.dmenu"-->
                               <!--transition="scale-transition"-->
                               <!--offset-y-->
                               <!--full-width-->
                               <!--:nudge-right="40"-->
                               <!--max-width="290px"-->
                               <!--min-width="290px"-->
                       <!--&gt;-->
                           <!--<v-text-field-->
                                   <!--slot="activator"-->
                                   <!--label="Select Dropoff Time"-->
                                   <!--v-model="pickDetails.dtime"-->
                                   <!--prepend-icon="mdi-clock"-->
                                   <!--readonly-->
                                   <!--:rules="[lessTime]"-->
                           <!--&gt;</v-text-field>-->
                           <!--<v-time-picker v-model="pickDetails.dtime" autosave format="24hr"-->
                           <!--&gt;</v-time-picker>-->
                       <!--</v-menu>-->
                       <v-icon>mdi-clock</v-icon>  <vue-timepicker v-model="pickDetails.dtime" format="hh:mm A"></vue-timepicker>

                   </v-flex>

                   <v-flex xs12 sm10 >
                       <v-menu
                               lazy
                               :close-on-content-click="false"
                               v-model="pickDetails.datemenu"
                               transition="scale-transition"
                               offset-y
                               full-width
                               :nudge-right="40"
                               max-width="290px"
                               min-width="290px"
                       >
                           <v-text-field
                                   slot="activator"
                                   label="Select Dropoff Date"
                                   v-model="pickDetails.ddate"
                                   prepend-icon="mdi-calendar"
                                   readonly
                                   :allowed-dates="allowedDates"

                           ></v-text-field>
                           <v-date-picker v-model="pickDetails.ddate" no-title scrollable actions>
                               <template slot-scope="{ save, cancel }">
                                   <v-card-actions>
                                       <v-spacer></v-spacer>
                                       <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                                       <v-btn flat color="primary" @click="save">OK</v-btn>
                                   </v-card-actions>
                               </template>
                           </v-date-picker>
                       </v-menu>

                   </v-flex>



               </v-card>

                <!--<vue-timepicker v-model="vueTime" format="hh:mm A"></vue-timepicker>-->
                <!--<v-btn>{{vueTime}}</v-btn>-->
                <!--<v-btn>pickUp {{pickDetails.ptime.HH}}:{{pickDetails.ptime.mm}}</v-btn>-->
                <!--<v-btn>dropoff {{pickDetails.dtime.HH}}:{{pickDetails.dtime.mm}}</v-btn>-->
                <!--<v-btn>diffdays {{diffDays}}</v-btn>-->
                <!--<v-btn>diffmins {{diffMins}}</v-btn>-->
                <!--<div>{{ bookDuration() }}</div>-->

            </v-layout>
        </v-container>

        <!--<vuetify-google-autocomplete-->
        <!--id="map"-->
        <!--append-icon="search"-->
        <!--:disabled="false"-->
        <!--classname="form-control"-->
        <!--placeholder="Start typing"-->
        <!--v-on:placechanged="getAddressData"-->
        <!--&gt;-->
        <!--</vuetify-google-autocomplete>-->



    </v-card>
    <v-alert type="error" :value="dateError">
        Pickup Date Can Not be later than Drop off date.
    </v-alert>
        <v-alert type="error" :value="timeError">
        Pickup Time Can Not be later than Drop off Time.
    </v-alert>



</div>
</template>

<script>
    export default {

        name: "pickup-details",
        data(){
            return{
                address: {},
                appendIcon: 'mdi-search',
                classname: '',
                clearable: 'true',
                country: ['GH'],
                disabled: false,
                id: 'map',
                labelText: 'Address',
                prependIcon: '',
                placeholderText: '',
                required: 'true',
                types: ['address'],


                e1:'',
                dateError:false,
                timeError:false,
                vueTime:{
                    HH: "",
                    mm: "",
                },
                pickDetails:{
                    pickup:'',
                    ddate: '',
                    pdate: '',
                    datemenu: false,
                    dmenu: false,
                    pmenu:false,
                    pdatemenu: false,
                    ptime: {
                        HH: "",
                        mm: "",
                    },
                    dtime: {
                        HH: "",
                        mm: "",
                    },
                    dropoff: '',

                },
                diffDays:'',
                diffMins:'',
                lastFiveDays: {
                    min: null,
                    max: null
                },
                allowedDates:null,


            }
        },
        methods:{
            getAddressData: function (addressData, placeResultData) {
                this.address = addressData;
            },


            checkDate(){

                var pickDate = new Date(this.pickDetails.pdate);
                var dropDate = new Date(this.pickDetails.ddate);

                // alert(pickDate);
                // alert(dropDate);

                var timeDiff = (dropDate.getTime() - pickDate.getTime());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                // alert(diffDays);

                if(diffDays < 0){
                    alert('Pickup Date can not be later.')
                }
            },

            bookCalc(){
                let self = this;
                var pickDate = new Date(this.pickDetails.pdate);
                var dropDate = new Date(this.pickDetails.ddate);

                // var timeStart = new Date("01/01/2007 " + this.pickDetails.ptime).getHours();
                // var timeEnd = new Date("01/01/2007 " + this.pickDetails.dtime).getHours();

                var timeStart = this.pickDetails.ptime.HH;
                var timeEnd = this.pickDetails.dtime.HH;

                // var minStart = new Date("01/01/2007 " + this.pickDetails.ptime).getMinutes();
                // var minEnd = new Date("01/01/2007 " + this.pickDetails.dtime).getMinutes();

                var minStart = this.pickDetails.ptime.mm;
                var minEnd = this.pickDetails.dtime.mm;

                var timeDiff = (dropDate.getTime() - pickDate.getTime());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                var diffMins= (minEnd - minStart);

                this.diffDays = diffDays;
                this.diffMins = diffMins;

                var hourDiff = timeEnd - timeStart;




                //if days are set backwards
                if(diffDays < 0 ){

                    // alert('diffDays wrong');
                    this.dateError = true;
                    this.lessDate = true;
                    this.clearBooking();
                    return false;


                }
                if( diffMins < 0){
                    this.timeError = true;
                    this.lessTime = true;
                    this.clearBooking();
                    return false;

                }

                else{



                    this.$store.commit('setBookDays',diffDays);
                    this.$store.commit('setBookHours',hourDiff);
                    this.$store.commit('setBookMins',diffMins);

                    this.$store.commit('setBookInfo',this.pickDetails)
                    let duration = '';
                    let totalTime = '';

                    if(this.$store.getters.getBookDays > 0){
                        duration=this.$store.getters.getBookDays+' Day(s)';
                        totalTime = (this.$store.getters.getBookDays * 24);
                    }
                    if(this.$store.getters.getBookHours > 0){
                        var hrs = parseInt(this.$store.getters.getBookHours);
                        duration=duration+' '+this.$store.getters.getBookHours+' Hour(s)';
                        totalTime = (+totalTime + +hrs)
                    }
                    if(this.$store.getters.getBookMins >= 0){
                        duration=duration+' '+this.$store.getters.getBookMins+' Minute(s)';

                        // Round all mins to 30 blocks
                        if(self.$store.getters.getBookMins > 30){
                            var mint = 1;
                        }

                        if(self.$store.getters.getBookMins < 30 && self.$store.getters.getBookMins !== 0){
                            var mint = 0.5;
                        }
                        if(self.$store.getters.getBookMins === 0){
                            var mint = 0;
                        }

                        var rawRate =  this.$store.getters.getBillRate;
                        var leanRate = rawRate.substring(3,7);

                        totalTime = (+totalTime + +mint);
                        var timeCalc = totalTime +'hrs'+' X '+leanRate;
                        var subtotal = (totalTime * leanRate)+' GHc'
                        var grandTotal = (totalTime * leanRate);
                    }


                    // alert(rawRate);
                    this.$store.getters.getBillData[0].rate = rawRate;
                    this.$store.getters.getBillData[0].duration = duration;
                    this.$store.getters.getBillData[0].calculation = timeCalc;
                    this.$store.getters.getBillData[0].subtotal =subtotal ;

                    // const billObj={
                    //    rate:rawRate,
                    //     duration:duration,
                    //     calculation:timeCalc,
                    //     subtotal:subtotal
                    // }
                    //
                    // this.$store.commit('setBillData',billObj);
                    this.$store.commit('setBookTime',totalTime);
                    this.$store.commit('setGrandTotal',grandTotal);

                    this.dateError = false;
                    this.timeError = false;
                    self.lessTime = false;
                    self.lessDate = false;

                }

            },
            dateLimit(){
                const d = new Date();
                d.setDate(date.getDate() - 5);
                this.lastFiveDays.min = d.toISOString().substr(0, 10);
                this.lastFiveDays.max = date.toISOString().substr(0, 10);
            }


        },

        mounted(){
                     this.dateLimit();
                     this.clearBooking();
            this.$refs.address.focus();



        },

        created () {
            this.$bus.$emit('new-book','here');
            // this.$bus.$on('package-change', ($event) => {
            //    this.bookCalc();
            // })
        },

        watch: {
            bookDays:function(){
                //sweet function comes Here.
                this.bookCalc();
            },

            bookPeriod:function(){
               // sweet function comes Here.
               //  this.$bus.$emit('my-event', 'pass some');?
                this.bookCalc();
            },
            pkgWatch:function(){
               //sweet function comes Here.
                this.bookCalc();
            },


            },

        computed:{
            lessTime(){
              return this.timeError?'Less than Pickup Time':'';
            },

            lessDate(){
              return this.dateError?'Less than Pickup Date':'';
            },

            formIsValid(){
                return this.pickDetails.pickup!=='' &&
                    this.pickDetails.ddate!=='' &&
                    this.pickDetails.pdate!=='' &&
                    this.pickDetails.ptime!=='' &&
                    this.pickDetails.dtime!=='' &&
                    this.pickDetails.dropoff!==''
            },

            bookDays(){
                return this.pickDetails.ddate;
            },

            bookPeriod(){
                let subTime = this.pickDetails.dtime.HH + this.pickDetails.dtime.mm;
                return subTime;
            },
            
            pkgWatch(){
                return this.$store.getters.bookPackage;
            },


        },
        // components: { VueTimepicker },



    }
</script>
