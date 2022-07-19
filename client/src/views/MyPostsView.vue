<template>
  <main class="flex justify-between md:p-3">
    <TheProfileSidebar />

    <section class="
        w-full
        md:w-1/2
        flex flex-col
        items-center
        px-1
        md:px-6
        min-h-scrollPost
        max-h-scrollPost
        overflow-y-scroll
      ">
      <TheNewPost />
      <ThePost
      v-for="(post, index) in posts"
       :key="index"
       :post="post" 
       />
    </section>

    <aside class="w-1/4 mr-7 hidden md:block">
      <ThePeopelYouMayKnow />
      <TheDiscussions />
    </aside>
  </main>
</template>

<script>
import TheProfileSidebar from "@/components/TheProfileSidebar.vue";
import TheNewPost from "@/components/TheNewPost.vue";
import { mapGetters } from "vuex";
import ThePost from "../components/ThePost.vue";
import TheDiscussions from "@/components/TheDiscussions.vue";
import ThePeopelYouMayKnow from "../components/ThePeopleYouMayKnow.vue";

export default {
  name: "DashboardView",
  computed: {
    ...mapGetters(["user", "posts"]),
  },
  components: {
    TheProfileSidebar,
    TheNewPost,
    ThePost,
    TheDiscussions,
    ThePeopelYouMayKnow,
  },
};
</script>

<style>
</style>