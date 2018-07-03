<template>
  <section class="rewards">
    <base-layout :sectionIcon="sectionIcon">

      <div slot="aside" class="rewards__aside">
        <aside-information :aside="aside"></aside-information>
      </div>

      <div slot="main" class="rewards__main">
        <div class="cart__container">

          <div class="cart__title">Add new address</div>

          <cart-shipping-form></cart-shipping-form>
        </div>
      </div>
    </base-layout>

    <cart-footer :step="step"></cart-footer>

  </section>
</template>
<script>
  import BaseLayout from '@/layouts/BaseLayout'
  import AsideInformation from '@/components/AsideInformation'
  import CartItem from '@/components/cards/CartItem'
  import CartFooter from '@/components/CartFooter'
  import CartShippingForm from '@/forms/CartShippingForm'

  export default {
    name: 'RewardsCart',

    components: {
      AsideInformation,
      BaseLayout,
      CartItem,
      CartFooter,
      CartShippingForm
    },

    data () {
      return {
        sectionIcon: 'rewards',
        asideShort: true,
        step: 2,
        aside: {
          title: 'Rewards',
          balanceBlocks: [
            {
              title: 'Points Balance',
              count: '2500',
              icon: 'points'
            },
            {
              title: 'Bag',
              count: '1 item(s)',
              icon: 'bag'
            }
          ]
        }
      }
    }
  }
</script>
<style lang="scss">
  .cart {
    &__container {
      width: 100%;
      padding: 39px 50px 46px;
      background: #fff;
      box-shadow: $base-box-shadow;
    }

    &__title {
      margin-bottom: 17px;
      font-size: 20px;
      color: $gray;
    }
  }
</style>
