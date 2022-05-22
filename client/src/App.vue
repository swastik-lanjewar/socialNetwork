<template>
  <div class="relative" >
      <TheNavbar></TheNavbar>
      <router-view></router-view>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'
export default {
  components: { TheNavbar },
    name:'App',
    data(){
      return {
     
      }
    },
    created(){
   
    },
}
</script>

<style>

</style>