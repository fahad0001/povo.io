<template>
  <footer class="footer">

    <div class="logo">
    <router-link :to="'/'" class="footer-logo-padding header__logo-container">
      <img src="../assets/img/povo-logo.svg" alt="Logo" class="header__logo">
    </router-link>


    <div class="footer__copyright">
      © Copyright 2018, Povo.io
    </div>
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
  .footer{
    bottom: 0;
    left: 0;
    right: 0;
    align-items: center;
    padding: 10px 20px;
    display: grid;
    grid-template-rows: 100px;
    grid-template-columns: 1fr 1fr;
    position: relative;
    background: #fff;
    border-top: 1px solid $gray-lighter;

    > .footer-logo-padding {
      padding-bottom: 7px;

    }

    &__link {
      font-size: 14px;
    }

    &__copyright {

        height: 24px;
        width: 145px;
        color: #6B808B;
        font-size: 12px;
        line-height: 24px;
        text-align: right;
        padding-top: 5px;

    }
  }
  .footer__menu{
    display: grid;
    grid-template-columns: 30% 30% 30% 50%;
    grid-template-rows: auto;
    grid-column-gap: 15%;
    justify-self: center;
    color: #6B808B;
    font-size: 16px;
    line-height: 24px;
    padding-top: 2%;
  }

  .logo{
    display: grid;
    grid-template-columns: 20% 30%;
    grid-template-rows: auto;

    padding-left: 5%;
  }
  @media only screen and (max-width: 720px) {
    .footer{
      grid-template-rows: auto auto;
      grid-template-columns: auto;
      grid-row-gap: 30px;
    }
    .footer__menu{
      grid-template-rows: auto auto;
      grid-template-columns: 1fr 1fr;
      justify-self: normal;
      grid-column-gap: 5%;
      grid-row-gap: 20px;
    }
    .logo{
      grid-template-columns: 1fr 1fr;
      padding-left: 0%;

    }
  }
</style>
