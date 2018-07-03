<template>
  <footer class="footer">
    <div class="footer__copyright">
      © Povo 2017
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

    @media #{$tablet-screen-lg-min} {
      padding: 12px 37px;
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
