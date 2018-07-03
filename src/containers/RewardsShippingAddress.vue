<template>
  <section class="rewards">
    <base-layout :sectionIcon="sectionIcon">

      <div slot="aside" class="rewards__aside">
        <rewards-aside :shortAside="shortAside" :currentUser="currentUser"></rewards-aside>
      </div>

      <div slot="main" class="rewards__main">

        <div class="cart__container">
          <div class="cart__title">Choose a shipping address</div>
          <div class="error" v-if='error.length > 0'>{{error}}</div>
          <custom-radio
            v-if="userAddresses.length > 0"
            v-for="(address, index) in userAddresses"
            v-on:on-change="handleRadioChange($event)"
            :label="address.line_first + address.line_second + address.city + address.country"
            :key="index"
            :inputId="index"
            :radioValue="address.id"
          ></custom-radio>

          <custom-radio
            v-on:on-change="handleRadioChange($event)"
            :label="'Add new address'"
            :inputId="userAddresses.length > 0 ? userAddresses.length + 1 : 0"
            :radioValue="'newAddress'"
          ></custom-radio>

          <transition name="visibility">
            <div v-if="isFormShow || userAddresses.length == 0" class="form-container">
              <cart-shipping-form v-on:formChange='setAddress'></cart-shipping-form>
            </div>
          </transition>
        </div>

      </div>
    </base-layout>

    <cart-footer :step="step" v-on:addAddress="handleAddressAdding"></cart-footer>

  </section>
</template>
<script>
  import { mapGetters } from 'vuex'

  import BaseLayout from '@/layouts/BaseLayout'
  import RewardsAside from '@/components/RewardsAside'
  import CartItem from '@/components/cards/CartItem'
  import CartFooter from '@/components/CartFooter'
  import CartShippingForm from '@/forms/CartShippingForm'
  import CustomRadio from '@/components/CustomRadio'

  export default {
    name: 'RewardsShippingAddress',

    components: {
      RewardsAside,
      BaseLayout,
      CartItem,
      CartFooter,
      CartShippingForm,
      CustomRadio
    },

    data () {
      return {
        sectionIcon: 'rewards',
        shortAside: true,
        step: 2,
        isFormShow: false,
        currentAddress: {},
        newAddress: {},
        error: '',
        isFormValid: false
      }
    },

    computed: {
      ...mapGetters(['currentUser']),

      userAddresses () {
        return this.currentUser ? this.currentUser.addresses || [] : []
      }
    },

    methods: {
      setAddress (address, isValid) {
        this.isFormValid = isValid
        this.newAddress = address
      },

      handleRadioChange (event) {
        this.error = ''
        if (event.target.value === 'newAddress') {
          this.isFormShow = true
        } else {
          this.isFormShow = false
          this.currentAddress = this.userAddresses.find((address) => +(address.id) === +(event.target.value))
        }
      },

      handleAddressAdding () {
        let oldAddressNotSelected = !this.currentAddress.fullname && !this.isFormShow
        let newAddressSelectedAndBlank = this.isFormShow && !this.isFormValid

        if (oldAddressNotSelected) {
          this.error = 'Please select the address.'
          return
        } else if (newAddressSelectedAndBlank) {
          this.error = 'Please fill in the form.'
          return
        }
        this.error = ''

        if (this.isFormShow) {
          this.$store.dispatch('createAddress', this.newAddress)
            .then((res) => {
              this.$set(this, 'currentAddress', res.data)
              this.$store.dispatch('addAddressToOrder', this.currentAddress).then(() => {
                this.$router.push({name: 'RewardsCartReview'})
              })
            })
        } else {
          this.$store.dispatch('addAddressToOrder', this.currentAddress).then(() => {
            this.$router.push({name: 'RewardsCartReview'})
          })
        }
      }
    },

    created () {
      this.$store.dispatch('getCurrentUser')
    }
  }
</script>
<style lang="scss">
  .error {
    padding-bottom: 10px;
  }

  .cart {
    &__container {
      width: 100%;
      padding: 20px;
      background: #fff;
      box-shadow: $base-box-shadow;

      @media #{$mobile-screen-lg-min} {
        padding: 39px 50px 46px;
      }
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
