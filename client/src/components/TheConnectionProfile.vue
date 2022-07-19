<template>
  <div
    class="
      bg-white
      rounded-lg
      border border-gray-200
      shadow-md
      dark:bg-gray-800 dark:border-gray-700
      w-full
      p-4
      my-1
    "
  >
    <div class="flex flex-col items-center">
      <img
        v-if="people?.profilePicture != ''"
          class="mb-3 w-24 h-24 rounded-full shadow-lg"
          :src="people?.profilePicture"
        alt="Bonnie image"
      />
      <img
        v-else
        class="mb-3 w-24 h-24 rounded-full shadow-lg"
        src="../assets/noAvatar.png"
        alt="Bonnie image"
      />
      <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
        {{ people?.username }}
      </h5>
      <span class="text-sm text-gray-500 dark:text-gray-400">{{
        people?.name
      }}</span>
      <div class="flex mt-4 space-x-3 lg:mt-6 items-center">
        <button
          class="
            py-1
            px-4
            font-semibold
            text-gray-800
            shadow-md
            border border-gray-800
            rounded-md
          "
          @click="this.$router.push(`/profile/${people.username}`)"
        >
          View
        </button>
        <button
          class="
            inline-flex
            items-center
            py-2
            px-4
            shadow-md
            text-sm
            font-medium
            text-center text-white
            bg-blue-700
            rounded-lg
            hover:bg-blue-800
          "
          @click="connectHandler(user.connections.includes(people._id), people._id)"
          :disabled="me"
          :class="{'disabled:opacity-50 hover:cursor-not-allowed': me}"
        >
          <TheSpinner v-if="pending" :text="user.connections.includes(people._id) ? 'Disconnecting...' : 'Connecting...'" />
          <span v-else>
            {{ user.connections.includes(people._id) ? "Disconnect" : "Connect" }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TheSpinner from "./utils/TheSpinner.vue";
import { mapGetters } from "vuex";
export default {
  name: "TheConnectionProfile",
  props: {
    people: {
      type: Object,
      required: true,
    },
    me: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      pending: false,
    };
  },

  methods: {
    async connectHandler(isConnected, id) {
      try {
        if(isConnected === true){
          this.pending = true;
          await this.$store.dispatch("disconnectUser", { userId: id });
          this.pending = false;
        }else{
          this.pending = true;
          await this.$store.dispatch("connectUser", { userId: id });
          this.pending = false;
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  components: { TheSpinner },
};
</script>

<style>
</style>