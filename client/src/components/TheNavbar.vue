<template>
  <nav class="hidden md:flex justify-between p-3 shadow mb-3 max-h-10">
    <div class="ml-7">
      <h3 class="font-bold text-blue-800 tracking-wide">
        SOCIAL NETWORK <span class="text-gray-400">v0.01</span>
      </h3>
    </div>
    <div class="w-1/5 hidden md:block">
      <ul class="flex justify-around text-blue-800">
        <li v-for="item in navItems" :key="item.name">
          <router-link :to="item.link">
            <i :class="'fab fa-solid ' + item.icon"></i>
          </router-link>
        </li>
        <li>
          <TheNotificationPanel />
        </li>
      </ul>
    </div>
    <div class="mr-7 flex">
      <TheSearchBar />
      <button class="ml-5" @click="logout">
        <i class="fas fa-solid fa-sign-out text-blue-600"></i>
      </button>
    </div>
    <div>
      
    </div>
  </nav>
</template>

<script>
import TheSearchBar from "./utils/TheSearchBar.vue";
import TheNotificationPanel from "./TheNotificationPanel.vue";
export default {
  name: "TheNavbar",
  data() {
    return {
      searchText: "",
      navItems: [
        {
          name: "Home",
          icon: "fa-house",
          link: "/",
        },
        {
          name: "friends",
          icon: "fa-user-group",
          link: "/people",
        },
        {
          name: "message",
          icon: "fa-comment",
          link: "/message",
        },
      ],
      showNotification: false,
    };
  },
  methods: {
    logout() {
      // delete the token from local storage
      localStorage.removeItem("token");
      this.$store.commit("REMOVE_TOKEN");
      this.$emit("removeUser");
      // redirect to login page
      this.$router.push("/login");
    },
    searchUser() {
      console.log(this.searchText);
    },
  },
  components: { TheSearchBar, TheNotificationPanel },
};
</script>

<style></style>
