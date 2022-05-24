<template>
  <div class="shadow-md rounded-md w-full mb-2">
    <div class="border-b border-gray-400 p-4">
      <label for="writeSomething" class="flex">
        <input
          id="writeSomething"
          type="text"
          placeholder="Write Something..."
          class="w-full focus:outline-none"
        />
        <button class="bg-blue-400 px-4 py-2 rounded-md text-white" @click="createPost">
          POST
        </button>
      </label>
    </div>
    <div class="p-4 flex justify-between">
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
  methods:{
     createPost(){
       
     }
  }
};
</script>

<style>
</style>