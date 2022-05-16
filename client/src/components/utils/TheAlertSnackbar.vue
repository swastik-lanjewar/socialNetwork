<template>
  <div class="text-center absolute top-10 left-50" v-show="showAlert == true">
  <div 
  class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none rounded-full flex " 
  role="alert"
  :class="{'bg-red-600 text-red-100': type === 'error', 'bg-green-800 text-green-100': type === 'success'}"
  >
    <span 
    class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3"
    :class="{'bg-red-400': type === 'error', 'bg-green-500': type === 'success'}"
    >{{ type }}</span>
    <span class="font-semibold mr-2 text-left flex-auto">{{ message }}</span>
  </div>
</div>
</template>

<script>
export default {
    name:"TheAlertSnackbar",
    data(){
        return {
            showAlert: false,
            type: '',
            message: ''
        }
    },
    methods:{
        show(type, message){
            this.showAlert = true;
            this.type = type;
            this.message = message;
            setTimeout(() => {
                this.showAlert = false;
                this.message = ''
                this.type = ''
            }, 3000);
        },
    }
}
</script>

<style>

</style>