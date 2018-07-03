<template>
  <footer class="footer">

    <div class="footer__breadcrumbs">
      <div
        class="bc-el"
        :class="{'active': step === 1}"
      >
        Rewards Bag
      </div>

      <div class="bc-arrow-container">
        <div class="bc-arrow"></div>
      </div>

      <div
        class="bc-el"
        :class="{'active': step === 2}"
      >
        Shipping Address
      </div>

      <div class="bc-arrow-container">
        <div class="bc-arrow"></div>
      </div>

      <div
        class="bc-el"
        :class="{'active': step === 3}"
      >
        Review
      </div>

    </div>

    <div class="footer__menu" v-if="step === 1">
      <router-link :to="'/rewards'" class="footer__link hover-link">Back to browsing</router-link>
      <router-link :to="'/rewards/shipping_address'" class="btn btn_lightblue" :class="{ 'disabled': isDisabled }">Review order</router-link>
    </div>

    <div class="footer__menu" v-if="step === 2">
      <router-link :to="'/rewards'" class="footer__link hover-link">Back to browsing</router-link>
      <a href="#" class="btn btn_lightblue" @click.prevent="addAddress">Continue Checkout</a>
    </div>

    <div class="footer__menu" v-if="step === 3">
      <router-link :to="'/rewards'" class="footer__link hover-link">Back to browsing</router-link>
      <a href="#" class="btn btn_lightblue" @click.prevent="finishOrder">
        Place Order
      </a>
    </div>

  </footer>
</template>

<script>
  export default {
    name: 'CreatePollFooter',
    props: {
      step: '',
      isDisabled: true
    },

    methods: {
      addAddress () {
        this.$emit('addAddress')
      },

      finishOrder () {
        this.$emit('finishOrder')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .disabled {
    pointer-events: none;
    cursor: default;
  }

  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background: #fff;
    border-top: 1px solid $gray-lighter;

    @media #{$tablet-screen-sm-min} {
      flex-direction: row;
      padding: 31px 44px;
    }

    &__breadcrumbs {
      padding-left: 30px;
      margin-bottom: 2px;
      position: relative;
      display: flex;

      @media #{$mobile-screen-xs-min} {
        margin-bottom: 15px;
      }

      @media #{$tablet-screen-sm-min} {
        margin-bottom: 0;
      }

      &:before {
        content: '';
        width: 20px;
        height: 100%;
        position: absolute;
        left: 0;
        background-image: url('../assets/img/navIconRewards.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }

      .bc-el {
        margin-right: 5px;
        font-size: 13px;
        color: $gray-light;

        @media #{$mobile-screen-xs-min} {
          font-size: 16px;
        }

        @media #{$tablet-screen-sm-min} {
          margin-right: 20px;
        }

        &.active {
          color: $gray;
        }
      }

      .bc-arrow-container {
        display: flex;
        align-items: center;
        margin-right: 10px;

        @media #{$tablet-screen-sm-min} {
          margin-right: 26px;
        }
      }

      .bc-arrow {
        width: 8px;
        height: 8px;
        transform: rotate(-45deg);
        border-right: solid 1px #46b4e8;
        border-bottom: solid 1px #46b4e8;
      }
    }

    &__menu {
      display: flex;
      flex-direction: column;
      align-items: center;

      @media #{$mobile-screen-xs-min} {
        flex-direction: row;
      }

      @media #{$tablet-screen-sm-min} {
        margin-left: auto;
      }
    }

    &__link {
      display: block;
      padding: 10px 0;
      color: $gray;

      @media #{$mobile-screen-xs-min} {
        margin-right: 27px;
      }
    }
  }
</style>
