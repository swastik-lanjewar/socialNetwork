<template>
  <div class="shadow-md rounded-md w-full md:min-w-fit">
    <div class="flex justify-between p-4">
      <div class="flex items-center">
        <img
          class="w-1/12 rounded-full"
          src="https://images.unsplash.com/photo-1558898479-33c0057a5d12?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8cHJvZmlsZXx8fHx8fDE2NTIyNjU3MTU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=200"
          alt=""
        />
        <h2 class="pl-2 font-semibold">{{'username' }}</h2>
      </div>
      <button>
        <i class="fab fa-solid fa-ellipsis-vertical"></i>
      </button>
    </div>
    <div class="">
      <img
        class="w-full"
        src="https://images.unsplash.com/photo-1558898479-33c0057a5d12?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8cHJvZmlsZXx8fHx8fDE2NTIyNjU3MTU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=200"
        alt=""
      />
    </div>

    <div class="flex justify-between py-2 px-4">
      <div>
        <button class="mr-4">
          <i class="fab fa-regular fa-heart"></i>
        </button>
        <button class="">
          <i class="fab fa-regular fa-comment"></i>
        </button>
      </div>
      <button class="ml-2">
        <i class="fab fa-regular fa-bookmark"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ThePost",
  props: {
    post: {
      type: Object,
        // required: true,
    },
  },
};
</script>

<style>
</style>