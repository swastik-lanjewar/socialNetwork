<template>
  <aside class="ml-7 w-1/4 hidden md:block">
    <div class="rounded-md shadow-md p-2 flex justify-start my-2">
      <div class="w-1/6 h-1/6 rounded-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558898479-33c0057a5d12?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8cHJvZmlsZXx8fHx8fDE2NTIyNjU3MTU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=200"
        />
      </div>
      <div class="ml-5">
        <h2 class="font-bold">{{ user.username }}</h2>
        <p>{{ user.name }}</p>
      </div>
    </div>
    <div class="rounded-md shadow-md p-4 my-4">
      <div class="flex justify-evenly">
        <div class="text-center">
          <h1 class="font-semibold text-gray-800">1</h1>
          <h1 class="font-semibold text-gray-600">Posts</h1>
        </div>
        <div class="text-center">
          <h1 class="font-semibold text-gray-800">{{user.connections.length}}</h1>
          <h1 class="font-semibold text-gray-600">Friends</h1>
        </div>
      </div>
      <div>
        <h2 class="font-semibold">Bio</h2>
        <p>
         {{ user.bio }}
        </p>
      </div>
      <div></div>
    </div>
    <div class="rounded-md shadow-md p-2 my-2">
      <div class="flex flex-row justify-between">
        <button class="p-1 px-2 border rounded-md text-gray-700 border-black">
          Edit Profile
        </button>
        <button class="p-1 px-2 border rounded-md text-gray-700 border-black">
          Contact
        </button>
        <button class="p-1 px-2 border rounded-md text-gray-700 border-black">
          Setting
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
    ...mapGetters(['user'])
  },
};
</script>

<style>
</style>