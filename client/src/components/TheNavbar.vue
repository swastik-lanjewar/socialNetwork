<template>
  <nav class="flex justify-between p-3 shadow mb-3 max-h-10  ">
    <div class="ml-7">
      <h3 class="font-bold text-blue-800 tracking-wide">SOCIAL NETWORK</h3>
    </div>
    <div class="w-1/5 hidden md:block">
      <ul class="flex justify-around text-blue-800">
        <li v-for="item in navItems" :key="item.name">
          <router-link :to="item.link">
            <i :class="'fab fa-solid ' + item.icon"></i>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="mr-7 flex">
      <div class="md:hidden">
        <button>
          <i class="fab fa-solid fa-bars"></i>
        </button>
      </div>
      <label
        for="search"
        class="
          relative
          text-slate-400
          focus-within:text-gray-600
          hidden
          md:block
        "
      >
        <span
          class="
            pointer-events-none
            w-8
            h-8
            absolute
            top-1/2
            transform
            -translate-y-1/2
            left-0
            grid
            place-items-center
          "
          ><i class="fab fa-solid fa-magnifying-glass"></i
        ></span>
        <input
          type="search"
          id="search"
          class="
            bg-slate-200
            form-input
            w-full
            px-4
            pl-8
            rounded-md
            py-1
            focus:outline-none
          "
          placeholder="Search People"
        />
      </label>
      <button class="ml-5" @click="logout">
        <i class="fas fa-solid fa-sign-out text-blue-600"></i>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "TheNavbar",
  data() {
    return {
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
          link: "",
        },
        {
          name: "message",
          icon: "fa-comment",
          link: "/message",
        },
      ],
    };
  },
  methods:{
    logout(){
      // delelte the token from local storage
      localStorage.removeItem('token');
      // redirect to login page
      this.$router.push('/login');
    }
  }
};
</script>

<style>
</style>