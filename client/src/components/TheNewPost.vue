<template>
  <div class="bg-white shadow-md rounded-md w-full mb-2">
    <div class="border-b border-gray-400 p-4">
      <label for="writeSomething" class="flex">
        <input
          id="writeSomething"
          type="text"
          placeholder="Write Something..."
          class="w-full focus:outline-none"
        />
        <button
          class="bg-blue-400 px-4 py-1 rounded-full text-white"
          @click="createPost"
        >
          <i class="fa-solid fa-paper-plane"></i>
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
export default {
  name: "TheNewPost",
  methods: {
    createPost() {},
  },
};
</script>

<style>
</style>