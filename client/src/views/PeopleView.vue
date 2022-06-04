<template>
  <main class="flex justify-between p-3">
    <TheProfileSidebar />

    <section class="
        w-full
        md:w-1/2
        sm:grid
        grid-cols-2
        sm:gap-3
        px-6
        min-h-scrollPost
        max-h-scrollPost
        overflow-y-scroll
      ">
      <div v-for="people in users" :key="people._id">
        <TheConnectionProfile :people="people" :me="people._id == user._id" />
      </div>
    </section>

    <aside class="w-1/4 mr-7 hidden md:block">
      <section class="rounded-md shadow-md p-3 w-full my-2">
        <h2 class="font-bold mb-4 text-gray-700">Connections</h2>
        <ul>
          <li v-if="connections.length <= 0">You don't have any connection</li>
          <li class="flex w-full justify-start my-2 items-center px-2" v-for="connection in connections"
            :key="connection">
            <img class="w-1/12 rounded-full"
              :src="connection?.profilePicture || 'https://source.unsplash.com/random/200x200/?profile'" alt="" />
            <h2 class="font-semibold mx-4 w-full">{{ connection.username }}</h2>
            <button class="border border-gray-700 bg-white rounded p-1 text-gray-700"
              @click="createConversation(connection._id)">
              message
            </button>
          </li>
        </ul>
      </section>

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
    ...mapGetters(["user", "users", "connections", "conversations"]),
  },
  methods: {

    async createConversation(receiverId) {
      try {
        await this.$store.dispatch("createConversation", { receiverId })
        this.$router.push("/message")
      } catch (error) {
        console.log(error)
      }
    },

  },
};
</script>

<style>
</style>