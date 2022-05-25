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

      <div 
      class=""
      v-for="post in posts"
      :key="post._id"
      >
        <ThePost :post="post" />
      </div>
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
import ThePeopelYouMayKnow from "../components/ThePeopelYouMayKnow.vue";

export default {
  name: "DashboardView",
  computed: {
    ...mapGetters(["user", "posts", "timelinePosts"]),
  },
  components: {
    TheProfileSidebar,
    TheNewPost,
    ThePost,
    TheDiscussions,
    ThePeopelYouMayKnow,
  },
  async created() {
    try {
      const usersRes = this.$store.dispatch("getAllUsers")
      this.$store.commit("SET_USERS", usersRes.data?.users)

      const allUsers = this.$store.state.users
      const connections = allUsers?.filter((user) => user.connections.includes(this.user._id));
      this.$store.commit("SET_CONNECTION", connections);

      const postsRes = await this.$store.dispatch("getPosts")
      this.$store.commit("SET_POSTS", postsRes.data?.posts)

      const timelineRes = await this.$store.dispatch("getTimeline")
      this.$store.commit("SET_TIMELINE_POSTS", timelineRes.data.timeline)

    } catch (error) {
      console.error(error)
      if(error.response?.status === 401){
        localStorage.removeItem("token");
        this.$router.push("/login");
      }
    }
  },
};
</script>

<style>
</style>