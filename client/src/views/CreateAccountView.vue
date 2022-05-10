<template>

<section class="w-full h-screen flex justify-center content-center bg-gray-50">
  <form @submit.prevent="" class="rounded bg-white  w-fit h-fit p-6 shadow-md">
    <h1 class=" text-2xl mb-4">Social Network | Create Account</h1>
    <div class="mb-4">
      <label for="name" class="block text-gray-700 text-sm font-bold mb-2">
        Name
      </label>
      <input type="text" id="name" class="w-full border border-gray-300 rounded px-2 py-1 ">
    </div>
    <div class="mb-4">
      <label for="username" class="block text-gray-700 text-sm font-bold mb-2">
        Username
      </label>
      <input type="text" id="username" class="w-full border border-gray-300 rounded px-2 py-1 ">
    </div>
    <div class="mb-4">
      <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
        Email
      </label>
      <input type="email" id="email" class="w-full border border-gray-300 rounded px-2 py-1 ">
    </div>
    <div class="mb-4">
      <label for="password" class="block text-gray-700 text-sm font-bold mb-2">
        Password
      </label>
      <input type="password" id="password" class="w-full border border-gray-300 rounded  px-2 py-1">
    </div>
    <div class="mb-4">
      <label for="cpassword" class="block text-gray-700 text-sm font-bold mb-2">
        Confirm Password
      </label>
      <input type="password" id="cpassword" class="w-full border border-gray-300 rounded  px-2 py-1">
    </div>
    <div class="mt-4 mb-2 flex justify-center">
      <button type="submit" class="bg-blue-400 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded">
       Create Account
    </button>
    </div>
    <p>Already Created?<a class="text-blue-600"> Login</a></p>
  </form>
</section>
</template>

<script>
export default {
name:'DashboardView'

}
</script>

<style>

</style>