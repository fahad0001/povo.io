<template>
  <div class="card">
    <h1>Confirmation success!</h1>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'Confirmation Finish',
  data () {
    return {}
  },

  computed: {
    ...mapState({
      user: state => state.user
    })
  },

  created () {
    this.$analytics.fbq.event('CompleteRegistration')
    this.$store.dispatch('setUser', this.$route.query)
      .then(res => {
        this.$router.push('/')
      })
  }
}
</script>

<style lang="scss" scoped>
  .card {
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.32);
    border-radius: 4px;
    overflow: hidden;
    padding: 20px;
    background-color: #fff;
    align-self: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
</style>
