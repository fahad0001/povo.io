<template>
  <div class="page static">
    <h2>FAQ</h2>
    <p>Povo is comprised of a team e-commerce enthusiast who are looking to provide the best social shopping experience to our users. Your feedback is not only welcomed but greatly appreciated. If you have any questions or concerns, please feel free to contact us at <a href="mailto:info@povo.io">info@povo.io</a> or you can contact me personally at
      <a href="mailto:Daniel@povo.io">Daniel@povo.io</a>.</p>
  </div>
</template>

<script>
export default {
  name: 'about',
  computed: {
    videoPath () {
      return require('@/assets/videos/povo_about.mp4')
    }
  }
}
</script>

<style lang="scss" scoped>
  .page.static {
    max-width: 1080px;
    margin: 0 auto;
    padding-left: 30px;
    padding-right: 30px;

    h2 {
      font-size: 30px;
      font-weight: 500;
      margin-bottom: 20px;
      margin-top: 40px;
    }

    p {
      padding-bottom: 10px;
    }

    video {
      width: 100%;
    }
  }
</style>
