<template>
  <div>
    <button
      class="
        block
        text-white
        bg-blue-500
        hover:bg-blue-600
        font-medium
        rounded-lg
        text-sm
        px-4
        py-2
        text-center
        uppercase
      "
      type="button"
        @click="dialog = !dialog"
    >
      modal
    </button>

    <div
      tabindex="-1"
      class="
        overflow-y-auto overflow-x-hidden
        fixed
        top-0
        right-0
        left-0
        z-50
        md:inset-0
        h-modal
        md:h-full
      "
      
    >
      <div class="relative p-4 w-full max-w-md h-full md:h-auto">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            class="
              absolute
              top-3
              right-2.5
              text-gray-400
              bg-transparent
              hover:bg-gray-200 hover:text-gray-900
              rounded-lg
              text-sm
              p-1.5
              ml-auto
              inline-flex
              items-center
            "
            
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div class="p-6 text-center">
            

            <button
              
              type="button"
              class="
                text-white
                bg-red-600
                hover:bg-red-800
                
                font-medium
                rounded-lg
                text-sm
                inline-flex
                items-center
                px-5
                py-2.5
                text-center
                mr-2
              "
            >
              Yes, I'm sure
            </button>
            <button
              
              type="button"
              class="
                text-gray-500
                bg-white
                hover:bg-gray-100
                
                rounded-lg
                border border-gray-200
                text-sm
                font-medium
                px-5
                py-2.5
                hover:text-gray-900
                focus:z-10
                dark:bg-gray-700
                dark:text-gray-300
                dark:border-gray-500
                dark:hover:text-white
                dark:hover:bg-gray-600
                dark:focus:ring-gray-600
              "
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheDialog",
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style>
</style>