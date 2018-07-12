<!--<template>-->
  <!--<header>-->
    <!--<router-link :to="'/'" class="header__logo-container">-->
      <!--<img src="../assets/img/povo-logo.svg" alt="Logo" class="header__logo">-->
    <!--</router-link>-->
    <!--<div class="header__menu">-->

      <!--<router-link :to="'/poll/create'" class="btn btn_white header__btn">How It Works</router-link>-->

      <!--<div class="header__links">-->
        <!--<a class="header__link hover-link" @click="showLoginModal()">Login</a>-->
        <!--<a class="btn btn_blue header__btn hover-link" @click="showSignUpModal()">Sign up</a>-->
      <!--</div>-->
    <!--</div>-->
  <!--</header>-->
<!--</template>-->

<!--<script>-->
  <!--// import AuthModals from '@/containers/AuthModals'-->
  <!--import { mapGetters } from 'vuex'-->

  <!--export default {-->
    <!--name: 'MainHeader',-->
    <!--components: {-->
      <!--// AuthModals-->
    <!--},-->

    <!--data () {-->
      <!--return {-->
        <!--isMenuShow: false-->
      <!--}-->
    <!--},-->

    <!--computed: {-->
      <!--...mapGetters([-->
        <!--'loginModal',-->
        <!--'signUpModal'-->
      <!--])-->
    <!--},-->

    <!--methods: {-->
      <!--showMenu () {-->
        <!--this.$emit('update:isMenuShow', true)-->
      <!--},-->

      <!--showSignUpModal () {-->
        <!--this.$store.commit('signUpModal', true)-->
      <!--},-->

      <!--showLoginModal () {-->
        <!--this.$store.commit('loginModal', true)-->
      <!--},-->

      <!--logOut () {-->
        <!--this.$store.dispatch('logout')-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
  <!--/*.how-it-works {*/-->
    <!--/*height: 22px;	width: 102px;*/-->
    <!--/*color: #6B808B;*/-->
    <!--/*font-size: 16px;*/-->
    <!--/*font-weight: bold;*/-->
    <!--/*line-height: 22px;*/-->
  <!--/*}*/-->
  <!--.header {-->
    <!--display: flex;-->
    <!--align-items: center;-->
    <!--padding: 10px 20px;-->
    <!--border-bottom: 1px solid $gray-lighter;-->
    <!--background-color: #FFF;-->

    <!--@media #{$mobile-screen-md-min} {-->
      <!--padding: 12px 36px;-->
    <!--}-->

    <!--&__logo {-->
      <!--width: 86px;-->
      <!--height: auto;-->
    <!--}-->

    <!--&__btn {-->
      <!--@media #{$mobile-screen-md-max} {-->
        <!--display: none;-->
      <!--}-->
    <!--}-->

    <!--&__menu {-->
      <!--margin-left: auto;-->
      <!--display: flex;-->
      <!--align-items: center;-->
    <!--}-->

    <!--&__links {-->
      <!--display: flex;-->
      <!--align-items: center;-->
    <!--}-->

    <!--&__link {-->
      <!--margin-left: 25px;-->
      <!--padding: 10px 0;-->
      <!--font-weight: 600;-->
      <!--cursor: pointer;-->

      <!--@media #{$mobile-screen-md-min} {-->
        <!--margin-left: 52px;-->
      <!--}-->
    <!--}-->
  <!--}-->

  <!--.hamburger {-->
    <!--width: 21px;-->
    <!--margin-left: 40px;-->
    <!--padding: 7px 0;-->
    <!--cursor: pointer;-->

    <!--&__bar {-->
      <!--position: relative;-->
      <!--display: block;-->
      <!--height: 2px;-->
      <!--width: 100%;-->
      <!--background-color: $skyblue;-->
      <!--border-radius: $base-border-radius;-->

      <!--&:not(:last-child) {-->
        <!--margin-bottom: 4px;-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</style>-->


<template>
  <header class="header">

    <router-link :to="'/'" class="header__logo-container">
      <img src="../assets/img/povo-logo.svg" alt="Logo" class="header__logo">
    </router-link>

    <div class="header__menu">
      <div class="header__links">
        <router-link :to="'/about'" class="header__btn header__text-color">How It Works</router-link>

        <a class="header__link header__text-color hover-link" @click="showLoginModal()">Login</a>
        <a class="header__link btn btn_lightblue header__btn hover-link" @click="showSignUpModal()">Sign up</a>
        <div class="hamburger" id="header-trigger" @click="showMenu()">
          <div class="header__hamburger-show hamburger__container">
            <div class="hamburger__bar"></div>
            <div class="hamburger__bar"></div>
            <div class="hamburger__bar"></div>
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
    padding: 38px 20px;
    border-bottom: 1px solid $gray-lighter;
    background-color: #FFF;

    @media #{$mobile-screen-lg-min} {
      padding: 38px 28px;
    }

    @media #{$tablet-screen-sm-min} {
      padding: 38px 120px;
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
