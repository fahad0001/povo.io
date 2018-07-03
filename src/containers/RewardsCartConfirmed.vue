<template>
  <section class="rewards">
    <base-layout :sectionIcon="sectionIcon">

      <div slot="aside" class="rewards__aside">
        <rewards-aside :shortAside="shortAside" :orderGoods="goods" :currentUser="currentUser"></rewards-aside>
      </div>

      <div slot="main" class="rewards__main">

        <rewards-message :message="message"></rewards-message>

      </div>
    </base-layout>
    <home-footer></home-footer>

  </section>
</template>
<script>
  import BaseLayout from '@/layouts/BaseLayout'
  import RewardsAside from '@/components/RewardsAside'
  import CartItem from '@/components/cards/CartItem'
  import HomeFooter from '@/components/HomeFooter'
  import RewardsMessage from '@/components/RewardsMessage'

  import {mapGetters} from 'vuex'

  export default {
    name: 'RewardsCart',
    components: {
      RewardsAside,
      BaseLayout,
      CartItem,
      HomeFooter,
      RewardsMessage
    },
    data () {
      return {
        sectionIcon: 'rewards',
        shortAside: true,
        message: {
          title: 'Your order has been placed!',
          description: 'Your reward will arrive within 2 - 4 weeks. Check your email for confirmation.',
          smile: true,
          btn: 'Back to Browsing'
        }
      }
    },

    computed: {
      ...mapGetters(['creatingOrder', 'currentUser']),
      goods () {
        return this.creatingOrder ? [...this.creatingOrder.goods] : []
      }
    },

    methods: {
    },

    created () {
      this.$store.dispatch('getCurrentUser')
    }
  }
</script>
<style lang="scss">
  .cart {
    &__container {
      width: 100%;
      padding: 20px;
      background: #fff;
      box-shadow: $base-box-shadow;

      &.blank {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h1 {
          margin-bottom: 20px;
        }
      }

      a {
        display: inline-block;
      }

      @media #{$tablet-screen-sm-min} {
        padding: 39px 50px 46px;
      }
    }

    &__title {
      margin-bottom: 17px;
      font-size: 20px;
      color: $gray;
    }

    &__total {
      display: flex;
      padding-top: 13px;

      .text {
        margin-left: auto;
        margin-right: 30px;
      }

      .text,
      .count {
        color: $gray;
        font-size: 20px;
      }
    }
  }
</style>
