<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/dash/book">
        <i class="nc-icon nc-notes"></i>
        <p>Book a Cab</p>
      </sidebar-link>

      <sidebar-link to="/dash/history">
        <i class="nc-icon nc-layers-3"></i>
        <p>View Booking History</p>
      </sidebar-link>

      <sidebar-link to="/dash/notifications">
        <i class="nc-icon nc-notification-70"></i>
        <p>Notification center</p>
      </sidebar-link>

      <sidebar-link to="/dash/maps">
        <i class="nc-icon nc-square-pin"></i>
        <p>Locate Booked Vehicle</p>
      </sidebar-link>

      <sidebar-link to="/dash/book">
        <i class="nc-icon nc-layers-3"></i>
        <p>My Gold Account</p>
      </sidebar-link>

      <sidebar-link to="/dash/contact">
        <i class="nc-icon nc-send"></i>
        <p>Contact Us</p>
      </sidebar-link>
      <sidebar-link to="/">
        <i class="nc-icon nc-button-power"></i>
        <p>Log Out</p>
      </sidebar-link>

    </side-bar>
    <div class="main-panel">
      <!--<top-navbar></top-navbar>-->

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>

  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  export default {
      data(){
          return{
              ghead:false,
          }
      },


    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      },
        open_dialog(){
          this.dialog=true;
        }
    }
  }

</script>
