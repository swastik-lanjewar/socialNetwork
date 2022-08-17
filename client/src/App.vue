<template>
  <div class="relative">
    <TheNavbar></TheNavbar>

    <main class="flex justify-between md:p-3">
      <TheProfileSidebar />

      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>

    </main>

    <TheNavbarBottom></TheNavbarBottom>
  </div>
</template>

<script>
import TheProfileSidebar from "@/components/TheProfileSidebar.vue";
import TheNavbar from "@/components/TheNavbar.vue";
import TheNavbarBottom from "./components/TheNavbarBottom.vue";
export default {
  components: { TheNavbar, TheNavbarBottom, TheProfileSidebar },
  name: "App",
  data() {
    return {
      socket: {},
    };
  },
};
</script>
<style>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}
</style>
