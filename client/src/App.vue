<template>
  <div class="relative" >
      <TheNavbar></TheNavbar>
      <router-view></router-view>
      <TheNavbarBottom ></TheNavbarBottom>
  </div>
</template>

<script>
// import io from "socket.io-client";
import TheNavbar from '@/components/TheNavbar.vue'
import TheNavbarBottom from './components/TheNavbarBottom.vue'
export default {
  components: { TheNavbar, TheNavbarBottom }, 
    name:'App',
    data(){
      return {
        socket:null,
      }
    },
  created() {
    // // this.socket = io("https://letsbug-social-network.herokuapp.com/", {
    // //   transports: ["websocket"],
    // // });

    // const sc = io("http://localhost:3000/", {
    // transports: ["websocket"],
    // });

    // sc.on("connect", () => {
    //   console.log("connected");
    //   this.socket = sc;
    // });

    // sc.on("disconnect", () => {
    //   console.log("disconnected");
    // });

  },
  unmounted() {
    // this.socket.disconnect();
  },
}
</script>