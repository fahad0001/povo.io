<template>
  <header class="header" id="header">

    <router-link :to="'/'" class="header__logo-container">
      <img src="../assets/img/povo-logo.svg" alt="Logo" class="header__logo" @click="handleLogoClick">
    </router-link>

    <div class="header__menu">

      <router-link :to="'/poll/create'" class="btn btn_white header__btn">Create Poll</router-link>

      <div class="header__links">
        <router-link :to="'/account'" class="header__link account">My Account</router-link>

        <div class="hamburger" id="header-trigger" @click="showMenu()">
          <div class="hamburger__container">
            <div class="hamburger__bar"></div>
            <div class="hamburger__bar"></div>
            <div class="hamburger__bar"></div>
          </div>
        </div>

      </div>

    </div>
    <transition name="fade">
      <modal-wrapper v-if="finishedPoll.id" v-on:close-click="clearFinishedPoll">
        <poll-winner-modal :poll='finishedPoll' :closeModal='clearFinishedPoll'></poll-winner-modal>
      </modal-wrapper>
    </transition>
  </header>
</template>

<script>
  import AccountMenu from '@/components/AccountMenu'
  import PollWinnerModal from '@/containers/PollWinnerModal'
  import ModalWrapper from '@/components/ModalWrapper'

  export default {
    name: 'LoggedInHeader',
    components: {
      AccountMenu,
      PollWinnerModal,
      ModalWrapper
    },
    data () {
      return {
        finishedPoll: {}
      }
    },
    props: {
      isMenuShow: false
    },
    methods: {
      handleLogoClick () {
        this.$router.go({
          path: '/',
          force: true
        })
      },
      showMenu () {
        this.$emit('update:isMenuShow', true)
      },
      getNewFinishedPoll () {
        this.$store.dispatch('getUserNewFinishedPoll').then(res => {
          const poll = res || {}
          this.$set(this, 'finishedPoll', poll)
        })
      },
      clearFinishedPoll () {
        const poll = this.finishedPoll
        this.$store.dispatch('markPollAsShowed', poll).then((res) => {
          this.$set(this, 'finishedPoll', {})
          this.getNewFinishedPoll()
        })
      }
    },
    created () {
      this.getNewFinishedPoll()
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    position: relative;
    display: flex;
    align-items: center;
    height: $header-height;
    padding: 10px 20px;
    border-bottom: 1px solid $gray-lighter;
    background: #fff;

    @media #{$tablet-screen-lg-min} {
      padding: 12px 37px;
    }

    &__logo-container {
      margin-right: auto;
    }

    &__logo {
      width: 65px;
      height: auto;

      @media #{$tablet-screen-lg-min} {
        width: 86px;
      }
    }

    &__menu {
      margin-left: auto;
      display: flex;
      align-items: center;
    }

    &__links {
      display: flex;
      align-items: center;
    }

    &__link {
      margin-left: 52px;
      padding: 10px 0;
      font-weight: 600;
      cursor: pointer;

      &.account {
        display: none;

        @media #{$mobile-screen-md-min} {
          display: inline-flex;
        }
      }

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .hamburger {
    width: 21px;
    margin-left: 18px;
    padding: 7px 0;
    cursor: pointer;

    @media #{$tablet-screen-lg-min} {
      margin-left: 40px;
    }

    &__bar {
      position: relative;
      display: block;
      height: 2px;
      width: 100%;
      background-color: $skyblue;
      border-radius: $base-border-radius;

      &:not(:last-child) {
        margin-bottom: 4px;
      }
    }
  }
</style>
