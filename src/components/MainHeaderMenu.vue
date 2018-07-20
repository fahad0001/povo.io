<template>
  <div class="menu" v-bind:class="{ 'active': isMenuShow }">

    <div class="menu__close" @click="hideMenu()"></div>

    <ul class="menu__container">
      <li>
        <router-link :to="'/'" class="menu__link home">
          <span @click="hideMenu()">Home</span>
        </router-link>
      </li>
      <li>
        <router-link :to="'/about'" class="menu__link logout"><span class="icon-setting fa fa-wrench"></span>How It Works</router-link>
      </li>
      <li>
        <a class="menu__link" @click="showLoginModal()"><span class="icon-setting fa fa-sign-in"></span>Login up</a>
      </li>
      <li>
        <a class="menu__link" @click="showSignUpModal()"><span class="icon-setting fa fa-user-plus"></span>Sign up</a>
      </li>
    </ul>
    <auth-modals></auth-modals>
  </div>
</template>

<script>
  import AuthModals from '@/containers/AuthModals'
  import { mapGetters } from 'vuex'

  export default {
    name: 'MainHeaderMenu',

    components: {
      AuthModals
    },

    props: {
      isMenuShow: false
    },

    computed: {
      ...mapGetters([
        'loginModal',
        'signUpModal'
      ])
    },
    methods: {
      hideMenu () {
        this.$emit('update:isMenuShow', false)
      },
      showLoginModal () {
        this.$store.commit('loginModal', true)
      },
      showSignUpModal () {
        this.$store.commit('signUpModal', true)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .menu {
    // display: none;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 12;
    min-height: 100%;
    padding: $header-height 0 20px;
    background: #fff;
    width: $account-menu-width;
    transition: 0.2s;
    transform: translateX(280px);

    @media #{$tablet-screen-sm-min} {
      min-height: 100%;
    }

    &.active {
      transform: translateX(0);
      box-shadow: $account-menu-box-shadow;
    }

    &__close {
      position: absolute;
      right: 15px;
      top: calc( 62px / 2 );
      transform: translateY(-50%);
      width: 30px;
      height: 30px;
      background: url('../assets/img/close.svg') no-repeat 50% 50%;
      background-size: 60%;
      cursor: pointer;
      transition: $base-animation-duration;

      @media #{$tablet-screen-lg-min} {
        right: 38px;
      }

      &:hover {
        opacity: 0.7;
      }
    }

    &__container {
      li:first-child {
        margin-bottom: 30px;
      }

      li:last-child {
        margin-top: 36px;
      }
    }

    &__link {
      display: block;
      padding: 10px 87px;
      font-weight: 600;

      &:hover {
        color: $skyblue;
      }

      &.router-link-exact-active {
        background-color: $skyblue;

        span {
          color: #fff;
        }
      }

      span {
        display: block;
        line-height: 19px;
        font-weight: 600;
      }
    }

    .home:before,
    .icon-setting,
    .logout:before {
      content: '';
      position: absolute;
      left: 47px;
      width: 20px;
      height: 20px;
    }

    .icon-setting {color: #49b4e8}

    .home {
      &:before {
        background-image: url('../assets/img/navIconHome.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }

      &.router-link-exact-active:before {
        background-image: url('../assets/img/navIconHome-active.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }
    }

    .logout {
      &:before {
        background-image: url('../assets/img/navIconLogout.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }
    }
  }
</style>
