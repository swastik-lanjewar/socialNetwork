<template>
  <section class="w-full md:w-1/2 px-6">
    <!-- // chat window -->
    <div
      class="w-full rounded-md shadow-md h-full flex flex-col justify-evenly"
    >
      <div
        class="p-4 flex justify-between border-b items-center border-gray-400"
      >
        <div class="flex">
          <img
            src="https://images.unsplash.com/photo-1558898479-33c0057a5d12?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8cHJvZmlsZXx8fHx8fDE2NTIyNjU3MTU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=200"
            class="w-1/12 rounded-full mr-4"
            alt=""
          />
          <h2 class="font-semibold text-xl">Aniket singh</h2>
        </div>
        <button>
          <i class="fab fa-solid fa-ellipsis-vertical"></i>
        </button>
      </div>

      <section class="p-2 flex-row overflow-auto flex-grow" >
       
        <div 
        :class="{'flex w-full justify-end':message.received !== true}"
        v-for="message in conversation"
        :key="message.data"
        >
          <div 
          class="rounded-lg bg-blue-100 w-fit p-1 px-4 my-2 "
          :class="{'text-right':message.received !== true}"
          >
            <p class="w-full text-left"> {{ message.data }}</p>
            <p class="text-xs">{{ message.time }}</p>
          </div>
        </div>
        <div v-show="isTyping">
          typing...
        </div>
      </section>

      <div class="p-4 border-t border-gray-400">
        <label for="writeSomething" class="flex items-center">
          <input
            id="writeSomething"
            type="text"
            placeholder="Write Something..."
            class="w-full focus:outline-none"
            v-model="message"
            @keypress="typing"
          />
          <button class="bg-blue-400 px-4 py-2 rounded-md text-white" @click="sendMessage">
            Send
          </button>
        </label>
      </div>
    </div>
  </section>
</template>

<script>
import io from 'socket.io-client'
import { mapGetters } from 'vuex';
export default {
  name: "TheChatWindow",
  data() {
    return {
      socket:{},
      greeting:null,
      message:'',
      conversation:[],
      isTyping:false,
    }
  },
  methods:{
    typing(){
      this.socket.emit('typing',{
        userid:this.userid,
      })
    },  
    sendMessage(){
      if(this.message.length <= 0) return 
      this.conversation.push({
        received:false,
        data:this.message,
        userid:'',
        time:'10:21 PM'
      })
      this.socket.emit('message', {message:this.message})
      this.message = ''
    }
  },
  created(){
    
     this.socket = io('http://localhost:3000', {
        transports: ['websocket'],
      }, )
      this.socket.on('greeting', (data)=>{
        this.greeting = data.message
        console.log(data)
      })

      this.socket.on('chat', (data)=>{
        console.log(data.message)
        this.conversation.push({
          received:true,
          data:data.message,
          userid:'',
          time:'10:21 PM'
        })
      })

      this.socket.on('typing', (data)=>{
        console.log(data)
        this.isTyping = true

        setTimeout(()=>{
          this.isTyping = false
        },500)
      })
  },
  computed:{
    ...mapGetters(['user', 'currentConversation'])
  }
};
</script>

<style>
</style>