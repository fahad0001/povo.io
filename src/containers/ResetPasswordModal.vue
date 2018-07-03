<template>
  <div class="default-modal-container" id="sign-up">
    <ResetPasswordForm
      :loading="user.loading"
      @submitForm="submit($event)"
    ></ResetPasswordForm>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import ResetPasswordForm from '@/forms/ResetPasswordForm'

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
    ResetPasswordForm
  },
  methods: {
    submit (payload) {
      this.$store.dispatch('resetPassword', payload)
        .then(res => {
          this.$emit('on-reset-btn-click')
          this.$router.push('/')
        })
    }
  },
  created () {

  }
}
</script>
