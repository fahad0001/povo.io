<template>
  <div class="page static">
    <h2> About us</h2>
    <p>Short for PollVote, Povo is a Rewards based social shopping platform. Users are rewarded upon creating, sharing and upvoting content to offer the most reliable online shopping experience.</p>
    <p>We believe in enriching the online shopping experience with real world feedback from real users.</p>
    <video width="100%"
           src="https://res.cloudinary.com/relymer-group/video/upload/v1532814743/povo-media/povo_about.mp4"
           controls>
    </video>
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
