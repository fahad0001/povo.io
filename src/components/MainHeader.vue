<template>
  <header class="header">

    <router-link :to="'/'" class="header__logo-container">
      <img src="../assets/img/povo-logo.svg" alt="Logo" class="header__logo">
    </router-link>

    <div class="header__menu">
      <div class="header__links">
        <router-link :to="'/about'" class="header__btn header__text-color">How It Works</router-link>

        <a class="header__link header__text-color header__btn hover-link" @click="showLoginModal()">Login</a>
        <a class="header__link btn btn_lightblue header__btn hover-link" @click="showSignUpModal()">Sign up</a>
        <div class="hamburger" id="header-trigger">
          <div @click="showMenu()" class="header__hamburger-show">
            <img src="../assets/img/hamburger.svg" alt="Logo" class="nav-toggle">
            <!--<button @click="showMenu()" v-bind:class="{'nav-toggle': !isMenuShow,  'nav-toggle opened': isMenuShow}">-->
              <!--<span class="bar-top"></span>-->
              <!--<span class="bar-mid"></span>-->
              <!--<span class="bar-bot"></span>-->
            <!--</button>-->
          </div>
        </div>
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
    padding: 25px 20px;
    border-bottom: 1px solid $gray-lighter;
    background-color: #FFF;

    @media #{$mobile-screen-lg-min} {
      padding: 25px 28px;
    }

    @media #{$tablet-screen-sm-min} {
      padding: 25px 120px;
    }

    &__logo {
      width: 86px;
      height: auto;
    }

    &__btn {
      @media #{$mobile-screen-lg-max} {
        display: none;
      }
    }

    &__hamburger-show {
      @media #{$mobile-screen-sm-max} {
        padding-top:5px;
        display: block;
      }

      @media #{$mobile-screen-lg-min} {
        display: none;
      }
    }

    &__menu {
      margin-left: auto;
      display: flex;
      align-items: center;
    }

    &__text-color {
      color: #6B808B;
    }

    &__links {
      display: flex;
      align-items: center;
    }

    &__link {
      margin-left: 25px;
      padding: 20px 15px;
      font-weight: 600;
      cursor: pointer;

      @media #{$mobile-screen-md-min} {
        margin-left: 52px;
      }
    }
  }


  //hamburger
  .nav-toggle {
    padding: 18px 20px 8px 0;
    background: transparent;
    border: 1px solid transparent;
    margin: 7px 0;
    top: 50%;
    left: 50%;
    cursor: pointer;
  }

  .nav-toggle:focus {
    outline-width: 0;
  }

  .nav-toggle [class*='bar-'] {
    background: #46b4e8;
    display: block;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: .2s ease all;
    transition: .2s ease all;

    /*
     * ENLARGED FOR PRESENTATION
     * Keep these values at the same proportion
     * for it to look correct
    */
    border-radius: 8px;
    height: 3px;
    width: 34px;
    margin-bottom: 5px;
  }

  .nav-toggle .bar-bot {
    margin-bottom: 0;
  }

  .opened .bar-top {
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-transform-origin: 15% 15%;
    transform-origin: 15% 15%;
  }
  .opened .bar-mid {
    opacity: 0;
  }
  .opened .bar-bot {
    -webkit-transform: rotate(45deg);
    transform: rotate(-45deg);
    -webkit-transform-origin: 15% 95%;
    transform-origin: 15% 95%;
  }
</style>
