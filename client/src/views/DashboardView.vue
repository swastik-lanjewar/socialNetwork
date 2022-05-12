<template>
<div>
  <nav class="flex justify-between p-3 shadow mb-3">
      <div class="ml-7">
          <h3 class="font-bold text-blue-800 tracking-wide">SOCIAL NETWORK</h3>
      </div>
      <div class="w-1/5">
          <ul class="flex justify-around text-blue-800">
              <li class=""><i class="fab fa-solid fa-house"></i></li>
              <li><i class="fab fa-solid fa-user-group"></i></li>
              <li><i class="fab fa-solid fa-bell"></i></li>
              <li><i class="fab fa-solid fa-comment"></i></li>
          </ul>
      </div>
      <div class="mr-7">
          <input type="search" class="bg-gray-100 pl-8 py-1 rounded-md" placeholder="Search People" >
      </div>
  </nav>




<main class="flex justify-between ">
    <!-- profile section -->
    <aside class="ml-7 w-1/4">
        <div class="w-fit rounded-md shadow-md p-2 flex justify-start my-2">
            <div class="w-1/6 h-1/6 rounded-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1558898479-33c0057a5d12?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8cHJvZmlsZXx8fHx8fDE2NTIyNjU3MTU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=200">
            </div>
            <div class="ml-5">
                <h2 class="font-bold">Jin Keguar</h2>
                <p>Manager</p>
            </div>
        </div>
        <div class="rounded-md shadow-md p-2 my-4">
            <ul>
                <li>Reddit</li>
                <li>Google Search</li>
                <li>TikTok Inc.</li>
                <li>Add new page</li>
            </ul>
        </div>
        <div class="rounded-md shadow-md p-2 my-2">
            <ul>                
                <li>Learning</li>
                <li>Statistics</li>
                <li>Bookmarks</li>
                <li>Gaming</li>
                <li>Share</li>
            </ul>
        </div>
    </aside>
    <!-- post section -->
    <section class="w-1/2 flex flex-col items-center p-6">
       <!-- new post section -->
       <div class="shadow-md rounded-md p-4 w-full mb-2">
           <div class="border-b-2">
               <input type="text" placeholder="Write Something...">
           </div>
           <div class="flex justify-around pt-1 m-0">
               <button>
                   <i class="fab fa-solid fa-image"></i>
               </button>
               <button>
                   <i class="fab fa-solid fa-video"></i>
               </button>
               <button>
                   <i class="fab fa-solid fa-calendar"></i>
               </button>
               <button>
                   <i class="fab fa-solid fa-location"></i>
               </button>
           </div>
       </div>

    <!-- // post section -->
    <div class="shadow-md rounded-md p-4 w-full">
        <div class="flex justify-between py-4">
            <div class="flex items-center">
                <img class="w-1/12 rounded-full" src="https://images.unsplash.com/photo-1558898479-33c0057a5d12?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8cHJvZmlsZXx8fHx8fDE2NTIyNjU3MTU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=200" alt="">
                <h2 class="pl-2 font-semibold">Prelly Kilman</h2>
            </div>
            :
       </div>
        <div>
            <img src="https://images.unsplash.com/photo-1558898479-33c0057a5d12?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8cHJvZmlsZXx8fHx8fDE2NTIyNjU3MTU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=200" alt="">
        </div>
        <div class="flex justify-between">
            <div>
                <button> <i class="fab fa-solid fa-heart"></i> </button>
                <button> <i class="fab fa-solid fa-comment"></i></button>
            </div>
            <button><i class="fab fa-solid fa-bookmark"></i> </button>
            </div>
    </div>
    </section>

    <aside class="w-1/4">
      
      <div class="pl-3">
          <h2 class="font-bold pl-5">people you may know</h2>
          <div class="pl-9 shadow-md rounded-md p-4 w-full items-end">
          <div class="flex justify-between items-center">
              <img  >
              <h2>aniket singh</h2>
              <button class="bg-blue-500  rounded-md m-2 pr-2 pl-2 " >connect</button>
          </div>
          <div ><button class="bg-blue-500 rounded-md m-2 pr-2 pl-2">connect</button>
          </div>
          <div><button class="bg-blue-500 rounded-md m-2 pr-2 pl-2" >connect</button>
          </div>
          </div>
      </div>
      <div class="shadow-md rounded-md p-4 w-full pl-3">
          <div>
              <h2 class="font-bold pl-5">join discussion</h2>
          </div>
      </div>
          
    </aside>
</main>

</div>

</template>

<script>
export default {
name:'DashboardView'

}
</script>

<style>

</style>