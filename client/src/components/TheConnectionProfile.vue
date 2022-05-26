<template>
  <div
    class="
      bg-white
      rounded-lg
      border border-gray-200
      shadow-md
      dark:bg-gray-800 dark:border-gray-700
      w-full
      md:w-fit
      p-4
      my-4
    "
  >
    <div class="flex flex-col items-center">
      <img
        class="mb-3 w-24 h-24 rounded-full shadow-lg"
        src="https://source.unsplash.com/random/300x300/?profile"
        alt="Bonnie image"
      />
      <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
        {{ user.username }}
      </h5>
      <span class="text-sm text-gray-500 dark:text-gray-400">{{
        user.name
      }}</span>
      <div class="flex mt-4 space-x-3 lg:mt-6 items-center">
        <span class="font-semibold"
          >{{ user.connections?.length }} Connections</span
        >
        <button
          href="#"
          class="
            inline-flex
            items-center
            py-2
            px-4
            text-sm
            font-medium
            text-center text-white
            bg-blue-700
            rounded-lg
            hover:bg-blue-800
          "
          :disabled="isConnected || me"
          :class="{
            'disabled:opacity-50 disabled:cursor-not-allowed': isConnected,
          }"
          @click="connect"
        >
          <TheSpinner v-if="pending" text=" " />
          <span v-if="me != true">
            {{ isConnected ? "Connected" : "Connect" }}
          </span>
          {{ me ? " (You)" : "" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TheSpinner from "./utils/TheSpinner.vue";
export default {
  name: "TheConnectionProfile",
  props: {
    user: {
      type: Object,
      required: true,
    },
    me: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    isConnected() {
      return this.user.connections.includes(this.$store.state.user._id);
    },
  },
  data() {
    return {
      pending: false,
    };
  },

  methods: {
    connect() {
      this.pending = true;
      this.$store
        .dispatch("connectUser", { userId: this.user._id })
        .then((res) => {
          this.pending = false;
          console.log(res);
        })
        .catch((err) => {
          this.pending = false;
          console.log(err);
        });
    },
  },
  components: { TheSpinner },
};
</script>

<style>
</style>