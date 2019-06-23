<template>
  <div>

     <gold-load v-if="loadingPage"></gold-load>
  <transition  name="bounce"
               leave-active-class="fadeOutTop"
               enter-active-class="fadeInLeft">
    <router-view></router-view>
  </transition>
  </div>
</template>
<script>
  export default {
      data(){
          return{

          }
      },
      computed:{
          loadingPage(){
              return this.$store.getters.getGoldLoad;
          }
      }
  }
</script>
<style>

</style>
