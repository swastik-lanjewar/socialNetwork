<template>
  <section
    ref="draggableContainer"
    id="draggable-container"
    class="absolute top-0 left-0 aspect-video w-fit z-50 bg-white text-white rounded-lg pl-1 drop-shadow-lg"
  >
    <header
      class="p-2 px-4 hover:cursor-grab flex justify-between text-black font-semibold text-xl"
      id="draggable-header"
      @mousedown="dragMouseDown"
    >
      Hacker101
    </header>
    <main class="relative">
      <!-- <img class="absolute inset w-20" src="https://source.unsplash.com/random/200x200/" alt=""> -->
      <video
        ref="video-preview"
        class="max-h-96"
        autoplay
        loop
        v-show="file != ''"
      />
    </main>
    <footer class="flex justify-evenly py-2">
      <button
        class="p-2 bg-white text-gray-900 font-bold w-10 h-10 rounded-full bg-gray-200"
        @click="options.video = !options.video"
      >
        <span v-if="!options.video">
          <i class="fas fa-video"></i>
        </span>
        <span v-else>
          <i class="fas fa-video-slash"></i> 
        </span>
      </button>
      <button
        @click="handleCancel"
        class="p-2 bg-red-500 text-white font-bold w-10 h-10 rounded-full"
      >
        <i class="fas fa-phone"></i>
      </button>
      <button
        class="p-2 bg-white text-gray-900 font-bold w-10 h-10 rounded-full bg-gray-200"
        @click="options.audio = !options.audio"
      >
        <span v-if="!options.audio">
          <i class="fas fa-microphone"></i>
        </span>
        <span v-else>
          <i class="fas fa-microphone-slash"></i>
        </span>
      </button>
    </footer>
    <!-- <input type="file" accept="video/*" @change="handleFileUpload($event)" /> -->
  </section>
</template>

<script>
export default {
  name: "TheVideoCallWindow",
  props: {
    inStream: {
      type: Boolean,
      default: false,
    },
    outStream: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      file: "",
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0,
      },
      options: {
        audio: true,
        video: true,
      },
    };
  },
  mounted() {
    navigator.mediaDevices
      .getUserMedia({ video: this.options.video, audio: this.options.audio })
      .then((stream) => {
        // set the video stream to the video element
        this.$refs.videoPreview.srcObject = stream;
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong!");
        this.handleCancel()
      });
  },
  methods: {
    // handleFileUpload(event) {
    //   this.file = event.target.files[0];
    //   this.previewVideo();
    // },
    // previewVideo() {
    //   let video = document.getElementById("video-preview");
    //   let reader = new FileReader();

    //   reader.readAsDataURL(this.file);
    //   reader.addEventListener("load", function () {
    //     video.src = reader.result;
    //   });
    // },

    dragMouseDown(event) {
      event.preventDefault();
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      document.onmousemove = this.elementDrag;
      document.onmouseup = this.closeDragElement;
    },

    elementDrag(event) {
      event.preventDefault();

      this.positions.movementX = this.positions.clientX - event.clientX;
      this.positions.movementY = this.positions.clientY - event.clientY;
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;

      this.$refs.draggableContainer.style.top =
        this.$refs.draggableContainer.offsetTop -
        this.positions.movementY +
        "px";

      this.$refs.draggableContainer.style.left =
        this.$refs.draggableContainer.offsetLeft -
        this.positions.movementX +
        "px";
    },

    closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    },

    handleCancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style></style>
