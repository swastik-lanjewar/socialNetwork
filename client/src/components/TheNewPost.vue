<template>
  <div class="bg-white shadow-md rounded-md w-full mb-2">
    <div class="border-b border-gray-400 p-4">
      <label for="writeSomething" class="flex">
        <input id="writeSomething" type="text" placeholder="Write Something..." class="w-full focus:outline-none"
          v-model="postContent" />
        <button class="bg-blue-400 px-4 py-1 rounded-full text-white" @click="createPost">
          <i class="fa-solid fa-paper-plane" v-if="posting != true"></i>
          <TheSpinner v-if="posting" text="" />
        </button>
      </label>
    </div>
    <div class="px-4 py-2 flex justify-between">
      <button>
        <i class="fab fa-regular fa-image"></i>
        <span class="hidden md:block">Photo</span>
      </button>
      <button>
        <i class="fab fa-solid fa-video"></i>
        <span class="hidden md:block">Video</span>
      </button>
      <button>
        <i class="fab fa-regular fa-calendar"></i>
        <span class="hidden md:block">Event</span>
      </button>
      <button>
        <i class="fab fa-solid fa-location"></i>
        <span class="hidden md:block">Location</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TheSpinner from './utils/TheSpinner.vue';
export default {
  name: "TheNewPost",
  data() {
    return {
      postContent: "",
      type: "text",
      posting: false,
    };
  },
  methods: {
    createPost() {
      this.posting = true;
      if (this.postContent.length > 0) {
          this.$store.dispatch("createPost", {
            title: this.postContent,
            content: this.postContent,
            type: "text",
            userId: this.user._id,
          })
          this.posting = false
          this.postContent = ""
      }
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  components: { TheSpinner }
};
</script>

<style>
</style>