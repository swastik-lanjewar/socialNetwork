<template>
  <label
    for="search"
    class="relative text-slate-400 focus-within:text-gray-600 hidden md:block"
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
      v-model="searchText"
      autocomplete="false"
      placeholder="Search People"
      @keydown="searchUser"
    />

    <ul class="bg-white shadow-xl " >
      <li
        v-for="(item, index) in results"
        :key="index"
        :ref="item.name"
        class="
          p-2
          flex
          justify-start
          items-center
          hover:bg-sky-400 hover:text-white
          cursor-pointer
          rounded-md
          border-b border-gray-100
        "
      >
        <div class="relative w-14">
          <img
            class="rounded-full w-10 h-10 object-cover"
            src="https://source.unsplash.com/random/200x200/?profile"
            alt=""
          />
        </div>
        <div class="w-full ml-4">
          <button  @click="this.$router.push(`/profile/${item.username}`) , results = [], searchText = ''">{{ item.username }}</button>
        </div>
      </li>
    </ul>
  </label>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TheSearchBar",
  data() {
    return {
      searchText: "",
      results: [],
    };
  },
  methods: {
    searchUser(e) {
      if (this.searchText.length > 1) {
        this.results = this.users.filter((user) => {
          return (
            user.username.includes(this.searchText) ||
            user.name.includes(this.searchText)
          );
        });
      } else {
        this.results = [];
      }
      let liToBeFocused = this.$refs[0];
      // if down arrow is pressed
      if (e.keyCode === 40) {
        if (liToBeFocused.nextElementSibling) {
          liToBeFocused.nextElementSibling.focus();
        }
      }
      // if up arrow is pressed
      if (e.keyCode === 38) {
        if (liToBeFocused.previousElementSibling) {
          liToBeFocused.previousElementSibling.focus();
        }
      }
    },
  },
  computed: {
    ...mapGetters(["users"]),
  },
};
</script>

<style>
</style>