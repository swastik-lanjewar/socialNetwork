<template>
  <main class="w-3/4 flex justify-between md:p-3">
    <section
      class="w-full md:w-3/4 flex flex-col items-center px-1 md:px-6 min-h-scrollPost max-h-scrollPost overflow-y-scroll"
    >
      <TheNewPost />
      <div v-if="timelinePosts.length > 0" class="flex flex-col">
        <ThePost
          v-for="(post, index) in timelinePosts"
          :key="index"
          :post="post"
        />
      </div>
      <div v-else class="text-center">
        <h1 class="text-2xl text-gray-400 font-bold">No posts in Timeline</h1>
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
    ...mapGetters(["user", "users", "posts", "timelinePosts"]),
  },
  components: {
    TheNewPost,
    ThePost,
    TheDiscussions,
    ThePeopleYouMayKnow,
  },
  async created() {
    try {
      await this.$store.dispatch("getAllUsers");
      await this.$store.dispatch("getTimeline");
      await this.$store.dispatch("getPosts");

      const connections = this.users?.filter((user) =>
        this.user.connections.includes(user._id)
      );
      this.$store.commit("SET_CONNECTION", connections);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        this.$router.push("/login");
      }
    }
    this.$emit("connect");
  },
};
</script>
