<template>
  <section class="rounded-md shadow-md p-3 my-2">
    <h2 class="font-bold mb-4 text-gray-700">Join discussion</h2>

    <ul>
      <li
        class="flex w-full justify-between my-2 items-center px-2"
        v-for="discussion in discussions"
        :key="discussion.title"
      >
        <div>
          <h2 class="font-semibold">{{ discussion.title }}</h2>
          <p class="text-gray-500">{{ discussion.posts }}</p>
        </div>
        <div class="flex -space-x-4">
          <img
            class="
              w-8
              h-8
              border-2 border-white
              rounded-full
              dark:border-gray-800
            "
            :src="discussion.link"
            alt=""
          />
          <img
            class="
              w-8
              h-8
              border-2 border-white
              rounded-full
              dark:border-gray-800
            "
            :src="discussion.link"
            alt=""
          />
          <img
            class="
              w-8
              h-8
              border-2 border-white
              rounded-full
              dark:border-gray-800
            "
            :src="discussion.link"
            alt=""
          />
          <a
            class="
              flex
              items-center
              justify-center
              w-8
              h-8
              text-xs
              font-medium
              text-white
              bg-gray-700
              border-2 border-white
              rounded-full
              hover:bg-gray-600
              dark:border-gray-800
            "
            href="#"
            >+99</a
          >
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "TheDicussions",
  data() {
    return {
      discussions: [
        {
          title: "#javacript",
          posts: 500,
          link: "https://source.unsplash.com/random/200x200/?profile",
        },
        {
          title: "#globawarming",
          posts: 20,
          link: "https://source.unsplash.com/random/200x200/?profile",
        },
        {
          title: "#tech_bubble_bursting",
          posts: 530,
          link: "https://source.unsplash.com/random/200x200/?profile",
        },
        {
          title: "#puppu_pagal_hai",
          posts: 675,
          link: "https://source.unsplash.com/random/200x200/?profile",
        },
      ],
    };
  },
};
</script>

<style>
</style>