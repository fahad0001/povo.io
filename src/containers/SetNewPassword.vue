<template>
  <div class="wrapper">
    <div class="signup" id="sign-up">
      <SetNewPasswordForm
        :loading="user.loading"
        @submitForm="submit($event)"
      ></SetNewPasswordForm>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import SetNewPasswordForm from '@/forms/SetNewPasswordForm'

export default {
  name: 'Login',
  data () {
    return {}
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  components: {
    SetNewPasswordForm
  },
  methods: {
    submit (payload) {
      this.$store.dispatch('setNewPassword', payload)
        .then(res => {
          this.$router.push('/')
        })
    }
  },

  created () {
    this.$store.dispatch('setUser', this.$route.query)
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  max-width: 392px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: $base-box-shadow;
  border-radius: 4px;
  padding: 30px;
  margin-top: 40px
}
</style>
