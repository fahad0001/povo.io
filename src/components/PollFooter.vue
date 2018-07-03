<template>
  <footer class="poll-footer">

    <router-link :to="'/'" class="poll-footer__back-link hover-link">At the polls</router-link>

    <div class="poll-footer__menu">
      <loader v-if="showSkipLoader"></loader>
      <a href="#" class="poll-footer__link hover-link" @click.prevent='skipBtnClick' v-else>Skip to next poll</a>
      <loader v-if="user.showVoteSubmitLoader"></loader>
      <button v-else class="btn btn_lightblue" :disabled="isDisabled" @click='submitClick'>Submit Vote</button>
    </div>

  </footer>
</template>

<script>
  import Loader from '@/components/shared/Loader'
  import {mapState} from 'vuex'

  export default {
    name: 'PollFooter',

    components: {
      Loader
    },

    computed: {
      ...mapState(['user'])
    },

    props: {
      isDisabled: {
        type: Boolean,
        default: true
      },
      showSkipLoader: {
        type: Boolean,
        default: false
      }
    },

    methods: {
      submitClick () {
        this.$emit('submit-click')
      },

      skipBtnClick () {
        this.$emit('skip-btn-click')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .poll-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background: #fff;
    border-top: 1px solid $gray-lighter;

    @media #{$mobile-screen-lg-min} {
      padding: 31px 44px;
    }

    &__back-link {
      padding-left: 25px;
      color: $gray;
      position: relative;

      @media #{$mobile-screen-lg-min} {
        padding-left: 40px;
      }

      &:before {
        content: '';
        width: 20px;
        height: 20px;
        position: absolute;
        left: 0;
        background-image: url('../assets/img/navIconPolls.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }
    }

    &__menu {
      margin-left: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      @media #{$mobile-screen-lg-min} {
        flex-direction: row;
        margin-left: auto;
      }

      .loader {
        width: 155px;
      }
    }

    &__link {
      display: block;
      padding: 10px 0;
      margin-bottom: 5px;

      @media #{$mobile-screen-lg-min} {
        margin-right: 27px;
        margin-bottom: 0;
      }
    }
  }
</style>
