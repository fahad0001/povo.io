<template>
  <section class="rewards">

    <div class="rewards__desktop">
      <base-layout :sectionIcon="sectionIcon">

        <div slot="aside" class="rewards__aside">
          <rewards-aside
            :currentUser="currentUser"
            :shortAside="shortAside"
            :orderGoods="orderGoods"
            :goods="goods"
            :orders="userOrders"></rewards-aside>
        </div>

        <div slot="main" class="rewards__main">

          <search-input
            :searchPlaceholder="sortData.search"
            v-on:input-use="handleSearchInput"></search-input>

          <div class="flex-row">
            <loader v-if="showLoader" :sizeInPx="'60px'"></loader>
            <reward-card
              :product="product"
              :cardIcon="cardIcon"
              :key="index"
              :rewards="true"
              v-if="!showLoader"
              v-on:show-modal-btn-click="handleProductModalBtn(product.id)"
              v-on:add-to-selected-click="addToCart(product)"
              v-on:remove-from-selected-click="removeFromCart(product)"
              v-for="(product, index) in goods">
              <div slot="title" class="poll-card__title product-card__title">
                <template v-if="product">{{product.name}}</template>
              </div>
              <div slot="author" class="author">
                <template v-if="product">{{product.price}} points</template>
              </div>
            </reward-card>
          </div>

        </div>

      </base-layout>
    </div>

    <div class="rewards__mobile">


      <tabs>
        <tab title="Rewards Information" active="true">
          <rewards-aside :shortAside="shortAside"></rewards-aside>
        </tab>
        <tab title="Products">
          <sort-block :sortData="sortData" :categories="categories" v-on:change-category="changeCategory($event)"></sort-block>
          <div class="flex-row">
            <reward-card
              :product="product"
              :cardIcon="cardIcon"
              :key="index"
              :rewards="true"
              v-if="Object.keys(goods).length > 0"
              v-on:show-modal-btn-click="handleProductModalBtn(product.id)"
              v-on:add-to-selected-click="addToCart(product)"
              v-on:remove-from-selected-click="removeFromCart(product)"
              v-for="(product, index) in goods">
              <div slot="title" class="poll-card__title product-card__title">
                <template v-if="product">{{product.name}}</template>
              </div>
              <div slot="author" class="author">
                <template v-if="product">{{product.price}} points</template>
              </div>
            </reward-card>
          </div>
        </tab>
      </tabs>
    </div>

    <modal-wrapper v-if="showModal" v-on:close-click="toggleProductModal(false)">
      <product-quick-view-modal :product="modalProduct" :rewards="true" v-on:add-to-selected-click='addToCart'></product-quick-view-modal>
    </modal-wrapper>

    <home-footer></home-footer>

  </section>
</template>

<script>
  import _ from 'lodash'

  import BaseLayout from '@/layouts/BaseLayout'
  import SearchInput from '@/components/SearchInput'
  import HomeFooter from '@/components/HomeFooter'
  import RewardCard from '@/components/cards/RewardCard'
  import ModalWrapper from '@/components/ModalWrapper'
  import ProductQuickViewModal from '@/components/ProductQuickViewModal'
  import RewardsAside from '@/components/RewardsAside'
  import Loader from '@/components/shared/Loader'
  import SortBlock from '@/components/SortBlock'
  import Tabs from '@/components/tabs/Tabs'
  import Tab from '@/components/tabs/Tab'

  import { rewardsSortData } from '../data/sortData'

  import { mapGetters } from 'vuex'

  import notificationService from '../services/notification.service'

  export default {
    name: 'Rewards',

    components: {
      RewardsAside,
      BaseLayout,
      SearchInput,
      HomeFooter,
      RewardCard,
      ModalWrapper,
      ProductQuickViewModal,
      SortBlock,
      Tab,
      Tabs,
      Loader
    },

    data () {
      return {
        sectionIcon: 'rewards',
        rewards: true,
        cardIcon: true,
        sortData: rewardsSortData,
        shortAside: false,
        showModal: false,
        modalProduct: {},
        showLoader: false
      }
    },

    computed: {
      ...mapGetters([
        'goods',
        'categories',
        'creatingOrder',
        'currentUser',
        'orders'
      ]),

      orderGoods () {
        return this.creatingOrder ? [...this.creatingOrder.goods] : []
      },

      userOrders () {
        return this.currentUser ? this.currentUser.orders || [] : []
      }
    },

    methods: {
      handleSearchInput: _.debounce(function (text) {
        this.searchProducts(text)
      }, 1000),

      searchProducts (text) {
        this.$store.commit('deleteGoodsList')
        this.showLoadMore = false
        this.showNothigNotification = false
        this.$store.dispatch('searchGoods', text)
          .then(res => {
            if (res.length === 0) {
              this.showNothigNotification = true
            }
            this.showLoader = false
            res.length > 0 ? this.showLoadMore = false : this.showLoadMore = true
          })
      },

      getGoodsList () {
        this.$store.dispatch('getGoodsList')
      },

      addToCart (good, redirect) {
        const balance = this.currentUser.points
        if (balance >= good.price) {
          let updatedGoods = _.clone(this.creatingOrder.goods)
          updatedGoods.add(good)
          this.$store.dispatch('setOrderGoods', updatedGoods).then(() => {
            if (redirect) {
              this.$router.push({ path: '/rewards/cart' })
            }
          })
        } else {
          notificationService.showError('Not enough points')
        }
      },

      removeFromCart (good) {
        // this.$store.dispatch('removeGoodToOrder', good)
        let updatedGoods = _.clone(this.creatingOrder.goods)
        updatedGoods.delete(good)
        this.$store.dispatch('setOrderGoods', updatedGoods)
      },

      toggleProductModal (modalState) {
        this.showModal = modalState
      },

      handleProductModalBtn (productId) {
        this.toggleProductModal(true)
        this.modalProduct = {}
        this.$store.dispatch('getGoodById', productId)
          .then(res => {
            // todo
            this.modalProduct = this.goods.find((product) => product.id === productId)
          })
      },

      getCategoriesList () {
        this.$store.dispatch('getCategoriesList')
      },

      changeCategory (e) {
        this.showLoadMore = false
        this.showLoader = true
        let categoryId = e.target.value
        this.$store.dispatch('getGoodsByCategoryId', categoryId)
          .then(res => {
            if (res.length === 0) {
            }
            this.showLoader = false
            categoryId.length > 0 ? this.showLoadMore = false : this.showLoadMore = true
          })
      }
    },

    created () {
      this.getGoodsList()
      this.getCategoriesList()
      this.$store.dispatch('getCurrentUser')
      this.$store.dispatch('getUserOrders')
    }
  }
</script>
<style lang="scss" scoped>
  .rewards {
    &__desktop {
      @media #{$tablet-screen-lg-max} {
        display: none;
      }
    }

    &__mobile {
      padding: 40px 20px;

      @media #{$tablet-screen-lg-min} {
        display: none;
      }
    }
  }
</style>
