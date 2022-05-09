<template>
<section class="mx-auto w-1/2">
  <form @submit.prevent="" class="bg-gray-100 p-6">
  <h1 class="bold">Login page</h1>
    <div class="form-group">
        <label for="email">Email address</label>
        <input type="email" class="form-control" id="email" v-model="email" placeholder="Enter email">
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" placeholder="Password">
    </div>
    <button type="submit" class="btn btn-primary" @click="login">Login</button>
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