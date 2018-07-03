<template>
  <section class="rewards">
    <base-layout :sectionIcon="sectionIcon">

      <div slot="aside" class="rewards__aside">
        <aside-information :aside="aside"></aside-information>
      </div>

      <div slot="main" class="rewards__main">
        <div class="cart__container">
          <div class="cart__title">Choose a shipping address</div>

          <custom-radio
            v-on:on-change="handleRadioChange($event)"
            :label="'Mat Pat, 187 Fort York Blvd, Toronto, ON, M3B 4X5, Canada'"
            :inputId="1"
            :radioValue="'savedAddress'"
          ></custom-radio>

          <custom-radio
            v-on:on-change="handleRadioChange($event)"
            :label="'Mat Pat, 187 Fort York Blvd, Toronto, ON, M3B 4X5, Canada'"
            :inputId="2"
            :radioValue="'savedAddress02'"
          ></custom-radio>

          <custom-radio
            v-on:on-change="handleRadioChange($event)"
            :label="'Add new address'"
            :inputId="3"
            :radioValue="'newAddress'"
          ></custom-radio>

          <transition name="visibility">
            <div v-if="isFormShow" class="form-container">
              <cart-shipping-form></cart-shipping-form>
            </div>
          </transition>

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
  import CustomRadio from '@/components/CustomRadio'

  export default {
    name: 'RewardsCart',

    components: {
      AsideInformation,
      BaseLayout,
      CartItem,
      CartFooter,
      CartShippingForm,
      CustomRadio
    },

    data () {
      return {
        sectionIcon: 'rewards',
        asideShort: true,
        step: 3,
        isFormShow: false,
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
    },

    methods: {
      handleRadioChange: function (event) {
        if (event.target.value === 'newAddress') {
          this.isFormShow = true
        } else {
          this.isFormShow = false
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

  .form-container {
    padding-left: 30px;
  }

  .visibility-enter-active, .visibility-leave-active {
    transition: $base-animation-duration;
  }

  .visibility-enter, .visibility-leave-to {
    opacity: 0;
  }
</style>
