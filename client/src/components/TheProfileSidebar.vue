<template>
  <aside class="ml-7 w-1/4 hidden md:block">
    <div class="rounded-md shadow-md p-2 flex justify-start my-2">
      <div class="w-1/6 h-1/6 rounded-full overflow-hidden">
        <img
          v-if="user?.profilePicture != ''"
          :src="user?.profilePicture"
          loading="lazy"
        />
        <img
        v-else
          src="../assets/noAvatar.png"
          loading="lazy"
          />
      </div>
      <div class="ml-5">
        <h2 class="font-bold">{{ user.username }}</h2>
        <p>{{ user?.name }}</p>
      </div>
    </div>
    <div class="rounded-md shadow-md p-4 my-4">
      <div class="flex justify-evenly">
        <div class="text-center hover:cursor-pointer" @click="this.$router.push('/my-posts')">
          <h1 class="font-semibold text-gray-800">{{ posts?.length }}</h1>
          <h1 class="font-semibold text-gray-600">Posts</h1>
        </div>
        <div class="text-center">
          <h1 class="font-semibold text-gray-800">{{user?.connections?.length}}</h1>
          <h1 class="font-semibold text-gray-600">Connections </h1>
        </div>
      </div>
      <div>
        <h2 class="font-semibold">Bio</h2>
        <p class="text-gray-600">
         {{  user?.bio || 'No bio ☺' }}
        </p>
      </div>
      <div></div>
    </div>
    <div class="rounded-md shadow-md p-2 my-2">
      <div class="flex flex-row justify-between">
        <button class="px-1 border rounded text-gray-700 border-black">
          Edit Profile
        </button>
        <button class="px-1 border rounded text-gray-700 border-black">
          Contact
        </button>
        <button class="px-1 border rounded text-gray-700 border-black" @click="this.$router.push('/settings')">
          Settings
        </button>
      </div>
      <div></div>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "TheProfileSidebar",
 
  computed:{
    ...mapGetters(['user', 'posts'])
  },
};
</script>

<style>
</style>