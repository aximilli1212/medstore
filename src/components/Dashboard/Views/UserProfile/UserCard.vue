<template>
  <card class="card-user">
    <img slot="image" src="/static/img/cockpit_view.jpg" alt="..."/>
    <div class="author">
      <a href="#">
        <img class="avatar border-gray" :src="imgDataUrl" alt="..."/>
        <v-btn @click="toggleShow" outline small class="secondary--text">Change Picture</v-btn>

        <h4 class="title">{{regUser[0].title}} {{regUser[0].firstname}} {{regUser[0].lastname}}<br />
          <small class="grey--text" v-if="info"><v-icon>phone</v-icon> {{regUser[0].phone}}</small>
        </h4>
      </a>
    </div>
    <p class="description text-center" v-if="info">
      <v-chip color="primary" text-color="white">
        Premium User
        <v-icon right>star</v-icon>
      </v-chip>
      <v-chip outline color="grey" text-color="primary">
        <v-icon>check</v-icon>
        Confirmed
      </v-chip>
    </p>
    <hr />

    <my-upload field="img"
               @crop-success="cropSuccess"
               @crop-upload-success="cropUploadSuccess"
               @crop-upload-fail="cropUploadFail"
               v-model="show"
               :width="300"
               :height="300"
               url="uploads"
               :params="params"
               :headers="headers"
               langType="en"
               :noRotate="false"
               img-format="jpg"></my-upload>


    <transition
            dname="bounce"
            enter-active-class="bounceInLeft"
    >
    <v-list two-line v-if="info">

      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon>business</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{regUser[0].company}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <!--<v-divider inset></v-divider>-->
      <!--<v-list-tile @click="">-->
        <!--<v-list-tile-action>-->
          <!--<v-icon>phone</v-icon>-->
        <!--</v-list-tile-action>-->
        <!--<v-list-tile-content>-->
          <!--<v-list-tile-title>(323) 555-6789</v-list-tile-title>-->
        <!--</v-list-tile-content>-->
        <!--<v-list-tile-action>-->
          <!--<v-icon>chat</v-icon>-->
        <!--</v-list-tile-action>-->
      <!--</v-list-tile>-->
      <v-divider inset></v-divider>
      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon>mail</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{userEmail}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider inset></v-divider>
      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon>location_on</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{regUser[0].address}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    </transition>







    <div slot="footer" class="text-center">

    </div>
  </card>
</template>
<script>
  import Card from '@/components/UIComponents/Cards/Card.vue'
  export default {
    components: {
      Card
    },
    data () {
      return {
          unregistered:[{title:'',firstname:'User',lastname:'Unregistered'}],
          info:true,
          show: false,
          params: {
              token: '123456798',
              name: 'avatar'
          },
          headers: {
              smail: '*_~'
          },
          imgDataUrl: '/static/img/faces/face-0.jpg' // the datebase64 url of created image
      }
    },
      computed:{
              regUser(){
                   const check = this.$store.getters.regCustomer
                  if( check.length < 1 ){
                      this.info=false
                      return this.unregistered;

                  }
                  else{
                      this.info=true
                      return this.$store.getters.regCustomer;
                  }
              },
          userEmail(){
                  return this.$store.state.user.email
          }
      },
    methods: {
      getClasses (index) {
        var remainder = index % 3
        if (remainder === 0) {
          return 'col-md-3 col-md-offset-1'
        } else if (remainder === 2) {
          return 'col-md-4'
        } else {
          return 'col-md-3'
        }
      },
        toggleShow() {
            this.show = !this.show;
        },
        /**
         * crop success
         *
         * [param] imgDataUrl
         * [param] field
         */
        cropSuccess(imgDataUrl, field){
            console.log('-------- crop success --------');
            this.imgDataUrl = imgDataUrl;
        },
        /**
         * upload success
         *
         * [param] jsonData  server api return data, already json encode
         * [param] field
         */
        cropUploadSuccess(jsonData, field){
            console.log('-------- upload success --------');
            console.log(jsonData);
            console.log('field: ' + field);
        },
        /**
         * upload fail
         *
         * [param] status    server api return error status, like 500
         * [param] field
         */
        cropUploadFail(status, field){
            console.log('-------- upload fail --------');
            console.log(status);
            console.log('field: ' + field);
        }
    }
  }

</script>
<style>

</style>
