<template>

<section class="w-full h-screen flex justify-center content-center bg-gray-50">
  <form @submit.prevent="createAccount" ref="createAccountForm" class="rounded bg-white  w-fit h-fit p-6 shadow-md">
    <h1 class=" text-2xl mb-4">Social Network | Create Account</h1>
    <div class="mb-4">
      <label for="name" class="block text-gray-700 text-sm font-bold mb-2">
        Name
      </label>
      <input type="text" v-model="name" required id="name" 
      class="w-full border border-gray-300 rounded px-2 py-1 "
      :class="{'border-red-500 outline-1 outline-red-500': nameError}"
      >
    </div>
    <div class="mb-4">
      <label for="username" class="block text-gray-700 text-sm font-bold mb-2">
        Username
      </label>
      <input type="text" v-model="username" required id="username" 
      class="w-full border border-gray-300 rounded px-2 py-1 "
      :class="{'border-red-500 outline-1 outline-red-500': usernameError}"
      >
    </div>
    <div class="mb-4">
      <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
        Email
      </label>
      <input type="email" v-model="email" required id="email" 
      class="w-full border border-gray-300 rounded px-2 py-1 "
      :class="{'border-red-500 outline-1 outline-red-500': emailError}"
      >
    </div>
    <div class="mb-4">
      <label for="password" class="block text-gray-700 text-sm font-bold mb-2">
        Create Password
      </label>
      <input type="password" v-model="password" required id="password" 
      class="w-full border border-gray-300 rounded  px-2 py-1"
      :class="{'border-red-500 outline-1 outline-red-500': passwordError}"
      >
    </div>
    <div class="mb-4">
      <label for="cpassword" class="block text-gray-700 text-sm font-bold mb-2">
        Confirm Password
      </label>
      <input type="password" v-model="cpassword" required id="cpassword" 
      class="w-full border border-gray-300 rounded  px-2 py-1"
      :class="{'border-red-500 outline-1 outline-red-500': cpassword !== password}">
    </div>
    <div class="mt-4 mb-2 flex justify-center">
      <button type="submit" required class="bg-blue-400 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded">
       Create Account
    </button>
    </div>
    <p>Already Created?<a class="text-blue-600"> Login</a></p>
  </form>
</section>
</template>

<script>
export default {
name:'CreateAccountView',
data(){
  return{
    name:'',
    username:'',
    email:'',
    password:'',
    cpassword:'',

    nameError:false,
    usernameError:false,
    emailError:false,
    passwordError:false,

  }
},
methods:{
  createAccount(){
    if(this.password === this.cpassword){
      const user = {
        name:this.name,
        username:this.username,
        email:this.email,
        password:this.password
      }
      this.$refs.createAccountForm.reset();
      console.log(user)
      this.$store.dispatch('createAccount',user).then(res=>{
        // save the token to local storage
        localStorage.setItem('token',res.data.token)
        this.$router.push('/')
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}

}
</script>

<style>

</style>