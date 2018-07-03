<template>
  <section class="rewards">
    <base-layout :sectionIcon="sectionIcon">

      <div slot="aside" class="rewards__aside">
        <rewards-aside :shortAside="shortAside" :orderGoods="goods" :currentUser="currentUser"></rewards-aside>
      </div>

      <div slot="main" class="rewards__main">
        <div class="cart__container" v-if="Object.keys(creatingOrder).length > 0 && goods.length > 0">
          <cart-item
            v-on:remove="removeGoodFromOrder"
            v-for="good in goods"
            :key="good.id"
            :product="good"></cart-item>
          <div class="cart__total">
            <div class="text">Total Points:</div>

            <div class="count">{{totalPoints}}</div>
          </div>

        </div>
        <div class="cart__container blank" v-else>
          <h1>No products yet</h1>
          <router-link :to="'/rewards/'" class="btn btn_lightblue">
            Back to products
          </router-link>
        </div>
      </div>
    </base-layout>
    <cart-footer :step="step" :isDisabled="isNextBtnDisable"></cart-footer>

  </section>
</template>
<script>
  import _ from 'lodash'
  import BaseLayout from '@/layouts/BaseLayout'
  import RewardsAside from '@/components/RewardsAside'
  import CartItem from '@/components/cards/CartItem'
  import CartFooter from '@/components/CartFooter'

  import {mapGetters} from 'vuex'

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
        step: 1
      }
    },

    computed: {
      ...mapGetters(['creatingOrder', 'currentUser']),
      goods () {
        return this.creatingOrder ? [...this.creatingOrder.goods] : []
      },

      totalPoints () {
        return this.goods.reduce((prevVal, elem) => prevVal + (elem.price ? +(elem.price) : 0), 0)
      },

      isNextBtnDisable () {
        return this.goods.length === 0 || this.totalPoints > this.currentUser.points
      }
    },

    methods: {
      removeGoodFromOrder (good) {
        let updatedGoods = _.clone(this.creatingOrder.goods)
        updatedGoods.delete(good)
        this.$store.dispatch('setOrderGoods', updatedGoods)
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
