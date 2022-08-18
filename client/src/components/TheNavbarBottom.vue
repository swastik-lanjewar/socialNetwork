<template>
  <nav class="w-full flex justify-between p-3 shadow max-h-10 md:hidden">
    <ul class="flex justify-evenly flex-grow text-blue-800">
      <li v-for="item in navItems" :key="item.name">
        <router-link :to="item.link">
          <i :class="'fab fa-solid ' + item.icon"></i>
        </router-link>
      </li>
    </ul>

    <div
      class="
        absolute
        top-0
        left-0
        w-screen
        h-80
        bg-clip-padding
        backdrop-filter backdrop-blur-xl
        bg-opacity-60
        border border-gray-200
      "
      v-if="menubar"
    >
      <div class="rounded-md shadow-md p-2 flex justify-start my-2 z-40">
        <div class="w-1/6 h-1/6 rounded-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1558898479-33c0057a5d12?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8cHJvZmlsZXx8fHx8fDE2NTIyNjU3MTU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=200"
          />
        </div>
        <div class="ml-5">
          <h2 class="font-bold">{{ user.username }}</h2>
          <p>{{ user.name }}</p>
        </div>
      </div>
      <div class="rounded-md shadow-md p-4 my-4">
        <div class="flex justify-evenly">
          <div class="text-center">
            <h1 class="font-semibold text-gray-800">1</h1>
            <h1 class="font-semibold text-gray-600">Posts</h1>
          </div>
          <div class="text-center">
            <h1 class="font-semibold text-gray-800">
              {{ user.connections?.length }}
            </h1>
            <h1 class="font-semibold text-gray-600">Friends</h1>
          </div>
        </div>
        <div>
          <h2 class="font-semibold">Bio</h2>
          <p>
            {{ user.bio }}
          </p>
        </div>
        <div></div>
      </div>
      <div class="rounded-md shadow-md p-2 my-2">
        <div class="flex flex-row justify-between">
          <button
            class="px-1 border rounded text-gray-700 border-black"
            @click="logout"
          >
            logout
          </button>
          <button class="px-1 border rounded text-gray-700 border-black">
            Contact
          </button>
          <button class="px-1 border rounded text-gray-700 border-black">
            <router-link to="/settings">Settings</router-link>
          </button>
        </div>
      </div>
    </div>

    <div class="w-10">
      <button @click="menubar = !menubar">
        <i class="fab fa-solid fa-bars"></i>
      </button>
      <!-- <button class="ml-5" @click="logout">
                <i class="fas fa-solid fa-sign-out text-blue-600"></i>
            </button> -->
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TheNavbar",
  data() {
    return {
      menubar: false,
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
          name: "notification",
          icon: "fa-bell",
          link: "/notification",
        },
        {
          name: "message",
          icon: "fa-comment",
          link: "/message",
        },
      ],
    };
  },
  methods: {
    logout() {
      this.menubar = false;
      // delete the token from local storage
      localStorage.removeItem("token");
      this.$emit("removeUser")
      this.$store.commit("REMOVE_TOKEN")
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style>
</style>