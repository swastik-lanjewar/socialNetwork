<template>
  <section class="rounded-md shadow-md p-3 w-full my-2">
    <h2 class="font-bold mb-4 text-gray-700">People You May know</h2>
    <ul>
      <li
        class="flex w-full justify-start my-2 items-center px-2"
        v-for="suggestion in peopleYouMayKnow"
        :key="suggestion.name"
      >
        <img class="w-1/12 rounded-full" :src="suggestion.img" alt="" loading="lazy" />
        <h2 class="font-semibold mx-4 w-full">{{ suggestion.name }}</h2>
        <button class="bg-blue-200 rounded p-1 text-blue-600 font-semibold">
          Connect
        </button>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "ThePeopleYouMayKnow",
  data() {
    return {
      peopleYouMayKnow: [
        {
          img: "https://source.unsplash.com/random/200x200/?profile",
          name: "Aniket Singh",
          link: "",
        },
        {
          img: "https://source.unsplash.com/random/200x200/?profile",
          name: "Swastik Lanjewar",
          link: "",
        },
        {
          img: "https://source.unsplash.com/random/200x200/?profile",
          name: "Suyash bhalerao",
          link: "",
        },
        {
          img: "https://source.unsplash.com/random/200x200/?profile",
          name: "pranav jaid",
          link: "",
        },
      ],
    };
  },
};
</script>

<style>
</style>