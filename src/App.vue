<template>
  <div id="app">
    <!-- TODO add move login/out headers to separete components and move to layout -->
    <logged-in-layout v-if="loggedIn">
      <logged-in-header :isMenuShow.sync="isMenuShow"></logged-in-header>
      <account-menu :isMenuShow.sync="isMenuShow"></account-menu>
      <div class="main-loader-wrapper" v-if="showAuthLoader">
        <loader :sizeInPx="'80px'" ></loader>
      </div>
      <template v-else>
        <router-view></router-view>
      </template>
    </logged-in-layout>

    <main-layout v-else>
      <main-header
        :isMenuShow.sync="isMenuShow"
        @ScrollToHIW="scrollToHIW()"
      ></main-header>
      <main-header-menu
        :isMenuShow.sync="isMenuShow"
        @ScrollToHIW="scrollToHIW"
      ></main-header-menu>
      <div v-if="$route.fullPath==='/'">
        <landing-page></landing-page>
        <about-page></about-page>
        <HowItWorks></HowItWorks>
        <reward-page></reward-page>
        <main-footer></main-footer>
      </div>
      <div v-else>
        <router-view></router-view>
      </div>
    </main-layout>


  </div>
</template>

<script>
  import MainHeader from '@/components/MainHeader'
  import MainHeaderMenu from '@/components/MainHeaderMenu'
  import HowItWorks from '@/components/HomePage/HowItWorks'
  import LandingPage from '@/components/HomePage/LandingPage'
  import AboutPage from '@/components/HomePage/AboutPage'
  import RewardPage from '@/components/HomePage/RewardPage'
  import LoggedInHeader from '@/components/LoggedInHeader'
  import AccountMenu from '@/components/AccountMenu'
  import Loader from '@/components/shared/Loader'
  import MainFooter from '@/components/HomeFooter'
  import LoggedInLayout from '@/layouts/LoggedInLayout'
  import MainLayout from '@/layouts/MainLayout'
  import {mapGetters} from 'vuex'
  import VueScrollTo from 'vue-scrollto'

  export default {
    name: 'app',
    components: {
      HowItWorks,
      MainHeader,
      MainHeaderMenu,
      LandingPage,
      AboutPage,
      RewardPage,
      MainFooter,
      LoggedInHeader,
      AccountMenu,
      LoggedInLayout,
      MainLayout,
      Loader
    },
    data () {
      return {
        isMenuShow: false,
        isScrollToHIW: false
      }
    },
    created () {
      this.checkToken()
    },
    computed: {
      ...mapGetters(['token', 'currentUser', 'loggedIn', 'showAuthLoader'])
    },
    methods: {
      // TODO use vuex
      checkToken () {
        const token = localStorage.getItem('token')
        if (token && !this.token) {
          this.$store.dispatch('setToken', token)
        }
      },
      scrollToHIW () {
        this.$router.push('/')
        let container = this.$el.querySelector('#how-it-works')
        VueScrollTo.scrollTo(container, 500)
      }
    }
  }
</script>

<style src="./assets/css/app.css"></style>
<style lang="css">
  .main-loader-wrapper {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
  }

  .error {
    color: red
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    width: 100%;
    background: #f8f8f8;
    -webkit-overflow-scrolling : touch !important;
    overflow: auto !important;
    height: 100% !important;
  }

  body {
    /*overflow-x: hidden;*/
  }

  a {
    text-decoration: none;
    transition: 0.2s;
    cursor: pointer;
  }

  li {
    list-style: none;
  }

  #app {
    min-height: 100%;
    position: relative;
    overflow-x: hidden;
  }
</style>
