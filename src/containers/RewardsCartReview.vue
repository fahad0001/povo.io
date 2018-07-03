<template>
  <section class="rewards">
    <base-layout :sectionIcon="sectionIcon">

      <div slot="aside" class="rewards__aside">
        <rewards-aside :shortAside="shortAside"></rewards-aside>
      </div>

      <div slot="main" class="rewards__main">
        <div class="cart__container">
          <cart-item
            v-if="Object.keys(creatingOrder).length > 0 && goods.length > 0"
            v-on:remove="removeGoodFromOrder"
            v-for="good in goods"
            :key="good.id"
            :product="good"></cart-item>
          <div class="cart__total">
            <div class="text">Total Points:</div>

            <div class="count">{{totalPoints}}</div>
          </div>

        </div>



        <div class="cart__container">
          <div class="cart__title">Shipping address</div>

          <div class="cart__address-block">
            <div class="greater-gray">
              {{selectedAddress.line_first + ' ' + selectedAddress.line_second + ' ' + selectedAddress.city + ' ' + selectedAddress.country}}
            </div>
            <router-link :to="'/rewards/shipping_address'" class="address-edit hover-link">Edit</router-link>
          </div>

        </div>

      </div>

    </base-layout>

    <cart-footer :step="step" v-on:finishOrder='finishOrder'></cart-footer>

  </section>
</template>
<script>
  import {mapGetters} from 'vuex'
  import _ from 'lodash'
  import notificationService from '../services/notification.service'

  import BaseLayout from '@/layouts/BaseLayout'
  import RewardsAside from '@/components/RewardsAside'
  import CartItem from '@/components/cards/CartItem'
  import CartFooter from '@/components/CartFooter'

  export default {
    name: 'RewardsCart',

    components: {
      RewardsAside,
      BaseLayout,
      CartItem,
      CartFooter
    },

    data () {
      return {
        sectionIcon: 'rewards',
        shortAside: true,
        step: 3
      }
    },

    computed: {
      ...mapGetters(['creatingOrder']),
      goods () {
        return this.creatingOrder ? [...this.creatingOrder.goods] : []
      },

      selectedAddress () {
        return this.creatingOrder ? this.creatingOrder.address || {} : {}
      },

      totalPoints () {
        return this.goods.reduce((prevVal, elem) => prevVal + (elem.price ? +(elem.price) : 0), 0)
      }
    },

    methods: {
      removeGoodFromOrder (good) {
        let updatedGoods = _.clone(this.creatingOrder.goods)
        updatedGoods.delete(good)
        this.$store.dispatch('setOrderGoods', updatedGoods)
      },

      finishOrder () {
        this.$store.dispatch('finishOrder')
          .then((res) => {
            notificationService.showSuccess('Order successfully placed.')
            this.$store.dispatch('dropCreatingOrder')
              .then((res) => {
                this.$router.push({name: 'RewardsCartConfirmed'})
              })
          })
      }
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
      margin-bottom: 14px;
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

    &__address-block {
      display: flex;
      justify-content: space-between;

      .address-edit {
        color: $gray;
      }
    }
  }
</style>
