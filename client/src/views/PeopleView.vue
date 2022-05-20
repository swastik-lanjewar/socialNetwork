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
        sm:grid grid-cols-2
        sm:gap-3
        px-6
        min-h-scrollPost
        max-h-scrollPost
        overflow-y-scroll
      "
    >
      <div v-for="people in users" :key="people._id">

        <TheConnectionProfile :user="people" />
        
      </div>
    </section>

    <aside class="w-1/4 mr-7 hidden md:block">
      <TheDiscussions />
    </aside>
  </main>
</template>

<script>
import TheDiscussions from "@/components/TheDiscussions.vue";
import TheProfileSidebar from "@/components/TheProfileSidebar.vue";
import { mapGetters } from "vuex";
import TheConnectionProfile from "../components/TheConnectionProfile.vue";
export default {
  name: "PeopleView",
  components: { TheDiscussions, TheProfileSidebar, TheConnectionProfile },
  computed: {
    ...mapGetters(["user", "users"]),
  },
  created(){
    this.$store.dispatch("getAllUsers").then((res) => {
      this.$store.commit('SET_USERS', res.data.users)
    }).catch((err) => {
      console.log(err);
    });
  }
};
</script>

<style>
</style>