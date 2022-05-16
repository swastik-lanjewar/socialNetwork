<template>
  <dialog class="rounded-mg border shadow-lg">
      <slot></slot>
      
  </dialog>
</template>

<script>
export default {
name: 'TheDialog',
data(){
    return{
        dialog: false
    }
}
}
</script>

<style>

</style>