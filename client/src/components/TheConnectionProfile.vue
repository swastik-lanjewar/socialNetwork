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
    "
  >
    <div class="flex flex-col items-center">
      <img
        class="mb-3 w-24 h-24 rounded-full shadow-lg"
        src="https://source.unsplash.com/random/300x300/?profile"
        alt="Bonnie image"
      />
      <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
        Bonnie Green
      </h5>
      <span class="text-sm text-gray-500 dark:text-gray-400"
        >Visual Designer</span
      >
      <div class="flex mt-4 space-x-3 lg:mt-6 items-center">
        <span class="font-semibold">14 Connections</span>
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
        >
          Add friend
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheConnectionProfile",
};
</script>

<style>
</style>