<template>
  <nav class="flex justify-between p-3 shadow mb-3 max-h-10">
    <div class="ml-7">
      <h3 class="font-bold text-blue-800 tracking-wide">SOCIAL NETWORK</h3>
    </div>
    <div class="w-1/5 hidden md:block">
      <ul class="flex justify-around text-blue-800">
        <li v-for="item in navItems" :key="item.name">
          <router-link v-if="item.link" :to="item.link">
            <i :class="'fab fa-solid ' + item.icon"></i>
          </router-link>
          <button v-else :@="item.action">
            <i :class="'fab fa-solid ' + item.icon"></i>
          </button>
        </li>
      </ul>
    </div>
    <div class="mr-7">
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
          action: "",
        },
        {
          name: "message",
          icon: "fa-comment",
          link: "/message",
        },
      ],
    };
  },
};
</script>

<style>
</style>