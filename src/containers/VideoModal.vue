<template>
  <div class="default-modal-container">
    <video width="100%"
           src="https://res.cloudinary.com/relymer-group/video/upload/v1532814743/povo-media/povo_about.mp4"
           controls>
    </video>
  </div>
</template>
<script>
  export default {
    name: 'VideoModal'
  }
</script>
<style lang="scss" scoped>
  .default-modal-container {
    padding: 35px 15px 15px;
    max-width: 800px;
  }
</style>
