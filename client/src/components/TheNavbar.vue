<template>
  <nav class="hidden  md:flex justify-between p-3 shadow mb-3 max-h-10 ">
    <div class="ml-7">
      <h3 class="font-bold text-blue-800 tracking-wide">SOCIAL NETWORK {{ socket }}</h3>
    </div>
    <div class="w-1/5 hidden md:block">
      <ul class="flex justify-around text-blue-800">
        <li v-for="item in navItems" :key="item.name">
          <router-link :to="item.link">
            <i :class="'fab fa-solid ' + item.icon"></i>
          </router-link>
        </li>
        <li>
          <button>
            <i class="fas fa-solid fa-bell"></i>
          </button>
        </li>
      </ul>
    </div>
    <div class="mr-7 flex">
     <TheSearchBar />
      <button class="ml-5" @click="logout">
        <i class="fas fa-solid fa-sign-out text-blue-600"></i>
      </button>
    </div>
  </nav>
</template>

<script>
import TheSearchBar from './utils/TheSearchBar.vue';
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
        };
  },
    props: ["socket"],
    methods: {
        logout() {
            // delelte the token from local storage
            localStorage.removeItem("token");
            // redirect to login page
            this.$router.push("/login");
            this.socket.disconnect();
        },
        searchUser() {
            console.log(this.searchText);
        }
    },
    components: { TheSearchBar }
};
</script>

<style>
</style>