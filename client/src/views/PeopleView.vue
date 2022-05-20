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
        grid grid-cols-2
        gap-3
        px-6
        min-h-scrollPost
        max-h-scrollPost
        overflow-y-scroll
      "
    >
        <TheConnectionProfile />
        <TheConnectionProfile />
        <TheConnectionProfile />
        <TheConnectionProfile />
        <TheConnectionProfile />
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
    ...mapGetters(["user", "getAllUsers"]),
  },
};
</script>

<style>
</style>