<template>
  <div class="relative">
    <TheNavbar></TheNavbar>
    <router-view></router-view>
    <TheNavbarBottom></TheNavbarBottom>
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar.vue";
import TheNavbarBottom from "./components/TheNavbarBottom.vue";
export default {
  components: { TheNavbar, TheNavbarBottom },
  name: "App",
  data() {
    return {
      socket: null,
    };
  },
};
</script>