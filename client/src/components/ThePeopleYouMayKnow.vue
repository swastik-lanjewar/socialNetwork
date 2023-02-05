<template>
  <section class="rounded-md shadow-md p-3 w-full my-2">
    <h2 class="font-bold mb-4 text-gray-700">People You May know</h2>
    <ul>
      <li
        class="flex w-full justify-start my-2 items-center px-2"
        v-for="people in users"
        :key="people.email"
      >
        <img
          v-if="people?.profilePicture != ''"
          class="w-1/12 rounded-full"
          :src="people?.profilePicture"
          alt="Bonnie image"
        />
        <img
          v-else
          class="w-1/12 rounded-full"
          src="../assets/noAvatar.png"
          alt="Bonnie image"
        />
        <h2 class="font-semibold mx-4 w-full">{{ people.name }}</h2>
        <button class="bg-blue-200 rounded p-1 text-blue-600 font-semibold">
          Connect
        </button>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ThePeopleYouMayKnow",
  computed: {
    ...mapGetters(["users", "user"]),
  },
};
</script>

<style></style>
