<template>
  <main class="flex justify-between p-3">
    
    <TheProfileSidebar
      :username="user.username"
      :name="user.name"
      :bio="user.bio"
    />

    <section
      class="
        w-full
        md:w-1/2
        flex flex-col
        items-center
        px-6
        min-h-scrollPost
        max-h-scrollPost
        overflow-y-scroll
      "
    >
      <TheNewPost />

      <div class="md:grid grid-cols-2 gap-4">
        <ThePost />
        <ThePost />
        <ThePost />
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
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["user"]),
  },
  components: {
    TheProfileSidebar,
    TheNewPost,
    ThePost,
    TheDiscussions,
    ThePeopelYouMayKnow,
  },
  created(){
    this.$store
      .dispatch("getAllUsers")
      .then((res) => {
        this.$store.commit("SET_USERS", res.data.users);
        const allUsers = this.$store.state.users
        const connections = allUsers.filter(user => user.connections.includes(this.user._id))
        this.$store.commit("SET_CONNECTION", connections)
      })
      .catch((err) => {
        // delelete the token and redirect to login
        if (err.response.status === 401) {
          this.$store.dispatch("logout");
        }
      });
  }
};
</script>

<style>
</style>