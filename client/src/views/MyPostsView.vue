<template>
  <main class="w-3/4 flex justify-between md:p-3">

    <section
      class="
        w-full
        md:w-3/4
        flex flex-col
        items-center
        px-1
        md:px-6
        min-h-scrollPost
        max-h-scrollPost
        overflow-y-scroll
      "
    >
      <TheNewPost />
      <div v-if="posts.length > 0">
        <ThePost
          v-for="(post, index) in posts"
          :key="index"
          :post="post"
          :myPost="true"
        />
      </div>
      <div v-else class="text-center">
        <h1 class="text-2xl text-gray-400 font-bold">No posts yet</h1>
      </div>

    </section>

    <aside class="w-1/3 mr-7 hidden md:block">
      <ThePeopleYouMayKnow />
      <TheDiscussions />
    </aside>
  </main>
</template>

<script>
import TheNewPost from "@/components/TheNewPost.vue";
import { mapGetters } from "vuex";
import ThePost from "../components/ThePost.vue";
import TheDiscussions from "@/components/TheDiscussions.vue";
import ThePeopleYouMayKnow from "../components/ThePeopleYouMayKnow.vue";

export default {
  name: "DashboardView",
  computed: {
    ...mapGetters(["user", "posts"]),
  },
  components: {
    TheNewPost,
    ThePost,
    TheDiscussions,
    ThePeopleYouMayKnow,
  },
};
</script>

<style>
</style>