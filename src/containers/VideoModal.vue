<template>
  <div class="default-modal-container">
    <video width="100%" :src="videoPath" controls></video>
  </div>
</template>
<script>
  export default {
    name: 'VideoModal',
    computed: {
      videoPath () {
        return require('@/assets/videos/povo_about.mp4')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .default-modal-container {
    padding: 35px 15px 15px;
    max-width: 800px;
  }
</style>
