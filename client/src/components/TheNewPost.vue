<template>
  <div class="bg-white shadow-md rounded-md w-full mb-2">
    <div  v-if="previewImage != null">
      <div class="relative">
        <img
          v-if="previewImage != null"
          :src="previewImage"
          alt="selected image"
        />
        <button
          class="
            absolute
            -top-0
            left-full
            transform
            -translate-x-6
            bg-red-500
            px-2
            rounded-full
            text-white
          "
          @click="(previewImage = null), (image = null)"
        >
          <i class="-mt-4 fa fa-times"></i>
        </button>
      </div>
    </div>

    <div class="border-b border-gray-400 p-4">
      <label for="writeSomething" class="flex">
        <input
          id="writeSomething"
          type="text"
          placeholder="Write Something..."
          class="w-full focus:outline-none"
          v-model="postContent"
        />
        <button
          class="bg-blue-400 px-4 py-1 rounded-full text-white"
          @click="createPost"
        >
          <i class="fa-solid fa-paper-plane" v-if="posting !== true"></i>
          <TheSpinner v-if="posting" text="" />
        </button>
      </label>
    </div>
    <div class="px-4 py-2 flex justify-between">
      <label class="text-center cursor-pointer">
        <input
          type="file"
          class="hidden"
          accept="image/png, image/jpeg"
          multiple
          @change="imgSelected"
        />
        <i class="fab fa-regular fa-image"></i>
        <span class="hidden md:block">Photo</span>
      </label>
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
import { mapGetters } from "vuex";
import TheSpinner from "./utils/TheSpinner.vue";
export default {
  name: "TheNewPost",
  data() {
    return {
      postContent: "",
      posting: false,
      previewImage: null,
      image: null,
    };
  },
  methods: {
    async createPost() {
      if (this.image == null && this.postContent == "") {
        return;
      }
      this.posting = true;
      try {
        const formData = new FormData();
        formData.append("content", this.postContent);
        formData.append("userId", this.user._id);
        if (this.image) {
          formData.append("postImage", this.image);
        }
        await this.$store.dispatch("createPost", formData);

        this.posting = false;
        this.postContent = "";
        this.previewImage = null;
        this.image = null;
      } catch (error) {
        this.posting = false;
        this.postContent = "";
        this.image = null;
        this.previewImage = null;
      }
    },
    imgSelected(e) {
      this.image = e.target.files[0];
      this.previewImage = URL.createObjectURL(this.image);
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  components: { TheSpinner },
};
</script>