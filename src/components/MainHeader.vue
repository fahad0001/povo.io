<template>
  <header class="header">

    <router-link :to="'/'" class="header__logo-container">
      <img src="../assets/img/povo-logo.svg" alt="Logo" class="header__logo">
    </router-link>

    <div class="header__menu">

      <router-link :to="'/poll/create'" class="btn btn_white header__btn">Create Poll</router-link>

      <div class="header__links">
        <a class="header__link hover-link" @click="showLoginModal()">Login</a>
        <a class="header__link hover-link" @click="showSignUpModal()">Sign up</a>
      </div>
      <auth-modals></auth-modals>
    </div>
  </header>
</template>

<script>
  import AuthModals from '@/containers/AuthModals'
  import { mapGetters } from 'vuex'

  export default {
    name: 'MainHeader',
    components: {
      AuthModals
    },

    data () {
      return {
        isMenuShow: false
      }
    },

    computed: {
      ...mapGetters([
        'loginModal',
        'signUpModal'
      ])
    },

    methods: {
      showMenu () {
        this.$emit('update:isMenuShow', true)
      },

      showSignUpModal () {
        this.$store.commit('signUpModal', true)
      },

      showLoginModal () {
        this.$store.commit('loginModal', true)
      },

      logOut () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid $gray-lighter;
    background-color: #FFF;

    @media #{$mobile-screen-md-min} {
      padding: 12px 36px;
    }

    &__logo {
      width: 86px;
      height: auto;
    }

    &__btn {
      @media #{$mobile-screen-md-max} {
        display: none;
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
      margin-left: 25px;
      padding: 10px 0;
      font-weight: 600;
      cursor: pointer;

      @media #{$mobile-screen-md-min} {
        margin-left: 52px;
      }
    }
  }

  .hamburger {
    width: 21px;
    margin-left: 40px;
    padding: 7px 0;
    cursor: pointer;

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
