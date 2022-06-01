<template>
  <img class="w-40 rounded-md shadow-md mb-2" :src="source" alt="" />
</template>

<script>
export default {
  name: "TheImg",
  data() {
    return {
      source: null,
    };
  },
  props: {
    blob: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    // conver the blob to a blob and then create a url from it
    const blob = new Blob([this.blob], { type: "image/jpeg" });
    const url = URL.createObjectURL(blob);
    this.source = url;
  },
};
</script>
