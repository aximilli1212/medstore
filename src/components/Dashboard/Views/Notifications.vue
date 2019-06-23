<template>
  <div class="content">
    <div class="container-fluid">
      <card>

          <v-card xs4 sm4>
            <v-layout>
              <v-flex sm4 class="ml-2">
                <tr>
                  <td class="body-1 primary--text text--darken-4"><v-icon small>mdi-ticket</v-icon> Current Booking: </td>
                  <td class="caption"> #4494</td>

                </tr>

                <tr>
                  <td class="body-1 primary--text"><v-icon small>mdi-domain</v-icon> Destination:</td>
                  <td class="caption"> Dansoman SSNIT Flats</td>

                </tr>
              </v-flex>

              <v-flex sm4>

              </v-flex>
              <v-flex xs12 sm4>
               <v-btn small class="red--text">Cancel Journey
                 <v-icon>mdi-cancel</v-icon>
               </v-btn>
              </v-flex>
            </v-layout>

          </v-card>

        <div class="row">
          <div class="col-md-6">
            <h5>Latest Notification</h5>

            <v-card class="grey--text">

                <v-layout>
                      <v-flex xs12 sm10 offset-1>
                         <v-card-text>

                           <h5 class="grey--text text--darken-2"><v-icon class="grey--text" x-large>mdi-information-outline</v-icon> Driver On his way</h5>
                           <hr/>
                           <p>Driver is on his way to your pickup location: Agbogba Close</p>
                         </v-card-text>

                      </v-flex>
                </v-layout>
              <v-card-actions>
                <v-spacer>

                </v-spacer>
                <v-btn class="primary--text" outline>OK</v-btn>
                <v-btn class="primary--text" flat>Cancel</v-btn>
              </v-card-actions>
            </v-card>

            <v-card-text>
              <div>
                <v-btn large color="primary" dark>Contact Driver</v-btn>
              </div>
              <div>
                <v-btn class="primary--text" rounded outline large @click="clog=true">  <v-icon left dark class="callback_pulse">mdi-access-point</v-icon>Request a free callback</v-btn>

              </div>
              <div>
              </div>
            </v-card-text>


            <!--<div class="alert alert-info alert-with-icon" data-notify="container">-->
              <!--<button type="button" aria-hidden="true" class="close">×</button>-->
              <!--<span data-notify="icon" class="nc-icon nc-app"></span>-->
              <!--<span data-notify="message">This is a notification with close button and icon and have many lines. You can see that the icon and the close button are always vertically aligned. This is a beautiful notification. So you don't have to worry about the style.</span>-->

            <!--</div>-->
          </div>
          <div class="col-md-4 offset-md-1">
            <h5>Notification History</h5>
            <v-list three-line subheader>
              <v-subheader>General</v-subheader>
              <v-list-tile href="javascript:;">
                <v-list-tile-action>
                  <v-checkbox
                          v-model="notifications"
                          readonly
                  ></v-checkbox>

                </v-list-tile-action>

                <v-list-tile-content @click="notifications = !notifications">
                  <v-list-tile-title>Top Up Successfully Done.</v-list-tile-title>
                  <v-list-tile-sub-title>Account has been Topped-up  #44494 Has been successfuly</v-list-tile-sub-title>

                </v-list-tile-content>
                <!--<v-list-tile-action v-if="notifications">-->
                  <!--<v-btn fab small color="teal"><v-icon dark>mdi-pencil</v-icon></v-btn>-->
                  <!--<v-btn fab small color="danger"><v-icon>mdi-delete</v-icon></v-btn>-->
                <!--</v-list-tile-action>-->
              </v-list-tile>
              <v-list-tile href="javascript:;">
                <v-list-tile-action>
                  <v-checkbox v-model="sound"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content @click="sound = !sound">
                  <v-list-tile-title>Driver Waiting</v-list-tile-title>
                  <v-list-tile-sub-title>Driver is waiting to continue Journey.</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile href="javascript:;">
                <v-list-tile-action>
                  <v-checkbox v-model="widgets"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content @click="widgets = !widgets">
                  <v-list-tile-title>Journey Completed</v-list-tile-title>
                  <v-list-tile-sub-title>Driver has successfully reached your Destination.</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </div>
        </div>
        <br>
        <br>
        <div class="places-buttons">
          <div class="row justify-content-center">
            <div class="col-6 text-center">
              <small>Notifications Places
                <p class="category">Click to view notifications</p>
              </small>
            </div>
          </div>
          <!--<div class="row justify-content-center">-->
            <!--<div class="col-md-3 col-md-offset-1">-->
              <!--<button class="btn btn-default btn-block" @click="notifyVue('top', 'left')">Top Left</button>-->
            <!--</div>-->
            <!--<div class="col-md-3">-->
              <!--<button class="btn btn-default btn-block" @click="notifyVue('top', 'center')">Top Center</button>-->
            <!--</div>-->
            <!--<div class="col-md-3">-->
              <!--<button class="btn btn-default btn-block" @click="notifyVue('top', 'right')">Top Right</button>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="row justify-content-center">-->
            <!--<div class="col-md-3 col-md-offset-1">-->
              <!--<button class="btn btn-default btn-block" @click="notifyVue('bottom', 'left')">Bottom Left</button>-->
            <!--</div>-->
            <!--<div class="col-md-3">-->
              <!--<button class="btn btn-default btn-block" @click="notifyVue('bottom', 'center')">Bottom Center</button>-->
            <!--</div>-->
            <!--<div class="col-md-3">-->
              <!--<button class="btn btn-default btn-block" @click="notifyVue('bottom', 'right')">Bottom Right</button>-->
            <!--</div>-->

          <!--</div>-->
        </div>
      </card>
    </div>
  </div>
</template>
<script>
  import Card from '@/components/UIComponents/Cards/Card.vue'

  export default {
    components: {
      Card
    },
    data () {
      return {
        type: ['', 'info', 'success', 'warning', 'danger'],
        notifications: {
          topCenter: false
        }
      }
    },
    methods: {
      notifyVue (verticalAlign, horizontalAlign) {
        const notification = {
          template: `<span>Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer.</span>`
        }

        const color = Math.floor((Math.random() * 4) + 1)
        this.$notifications.notify(
          {
            component: notification,
            icon: 'nc-icon nc-app',
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: this.type[color]
          })
      }
    }
  }

</script>
<style scoped>
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

</style>
