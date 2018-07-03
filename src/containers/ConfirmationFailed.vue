<template>
  <h1>Confirmation failed.</h1>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'Confirmation Failed',
  data () {
    return {}
  },

  computed: {
    ...mapState({
      user: state => state.user
    })
  }
}
</script>
