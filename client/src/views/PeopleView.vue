<template>
  <main class="w-3/4 flex justify-between md:p-3">
    <section
      class="w-full md:w-3/4 sm:grid grid-cols-2 sm:gap-3 px-6 min-h-scrollPost max-h-scrollPost overflow-y-scroll"
    >
      <div v-for="people in users" :key="people._id">
        <TheConnectionProfile :people="people" :me="people._id == user._id" />
      </div>
    </section>

    <aside class="w-1/3 mr-7 hidden md:block">
      <section class="rounded-md shadow-md p-3 w-full my-2">
        <h2 class="font-bold mb-4 text-gray-700">Connections</h2>
        <ul>
          <li v-if="connections.length <= 0">You don't have any connection</li>
          <li
            class="flex w-full justify-start my-2 items-center px-2"
            v-for="connection in connections"
            :key="connection"
          >
            <img
              v-if="connection?.profilePicture != ''"
              class="w-1/12 aspect-square rounded-full"
              :src="connection?.profilePicture"
              alt=""
              loading="lazy"
            />
            <img
              v-else
              class="w-1/12 aspect-square rounded-full"
              src="../assets/noAvatar.png"
              alt=""
              loading="lazy"
            />
            <h2 class="font-semibold mx-4 w-full">{{ connection.username }}</h2>
            <button
              class="border border-gray-700 bg-white rounded p-1 text-gray-700"
              @click="createConversation(connection._id)"
            >
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
import { mapGetters } from "vuex";
import TheConnectionProfile from "../components/TheConnectionProfile.vue";
export default {
  name: "PeopleView",
  components: { TheDiscussions, TheConnectionProfile },
  computed: {
    ...mapGetters(["user", "users", "connections", "conversations"]),
  },
  methods: {
    async createConversation(receiverId) {
      try {
        const conversation = await this.$store.dispatch("createConversation", {
          receiverId,
        });
        if (conversation._id) {
          this.$store.commit("SET_CURRENT_CONVERSATION", conversation._id);
        }
        this.$router.push("/message");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>