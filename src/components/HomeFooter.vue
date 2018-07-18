<template>
  <footer class="footer">
    <router-link :to="'/'" class="footer-logo-padding header__logo-container">
      <img src="../assets/img/povo-logo.svg" alt="Logo" class="header__logo">
    </router-link>
    <div class="footer__copyright">
      © Copyright 2018, Povo.io
    </div>
    <ul class="footer__menu">
      <li class="footer__menu-item">
        <router-link :to="'/about'" class="footer__link">About</router-link>
      </li>
      <li class="footer__menu-item">
        <router-link :to="'/faq'" class="footer__link">FAQ</router-link>
      </li>
      <li class="footer__menu-item">
        <router-link :to="'/privacy'" class="footer__link">Privacy</router-link>
      </li>
      <li class="footer__menu-item">
        <router-link :to="'/terms'" class="footer__link">Tentative Terms </router-link>
      </li>
    </ul>
  </footer>
</template>
<script>
  export default {
    name: 'MainFooter'
  }
</script>
<style lang="scss" scoped>
  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    background: #fff;
    border-top: 1px solid $gray-lighter;

    > .footer-logo-padding {
      padding-bottom: 7px;
    }

    &__copyright {
      padding-left: 45px;
      font-size: 13px;
    }

    @media #{$tablet-screen-lg-min} {
      padding: 30px 120px;
    }

    &__menu {
      margin-left: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-wrap: wrap;
      max-height: 65px;
      min-width: 108px;

      @media #{$tablet-screen-lg-min} {
        flex-direction: row;
        max-height: initial;
      }
    }

    &__menu-item:not(:last-child) {
      @media #{$tablet-screen-lg-min} {
        margin-right: 57px;
      }
    }

    &__menu-item:nth-child(1),
    &__menu-item:nth-child(2) {
      margin-right: 14px;

      @media #{$tablet-screen-lg-min} {
        margin-right: 57px;
      }
    }

    &__link {
      display: block;
      padding: 6px 0;

      @media #{$tablet-screen-lg-min} {
        padding: 10px 0;
      }

      &:hover {
        opacity: 0.8;
      }
    }
  }
</style>
