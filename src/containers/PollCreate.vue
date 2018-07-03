<template>
  <section class="poll">

    <div class="poll__desktop">
      <base-layout :sectionIcon="sectionIcon">

        <div slot="aside" class="poll__aside">
          <poll-create-aside
            :invalidTitle="invalidTitle"
            @changeTitle="addTitle($event.target.value)"
            @changeDescription="addDescription($event.target.value)"
            @changePollExpires="selectPollExpires($event.target.value)"
            @changeVotesNumber="selectVotesNumber($event.target.value)"
            @removeFromSelected="unselectProduct($event)"
          ></poll-create-aside>
        </div>

        <div slot="main" class="main">
          <div class="main__title">
            Select Product(s)
          </div>
          <div class="sort__block">
            <div class="sort__title greater-gray">
              Sort by
            </div>

            <select class="sort__select-wide" @change.number="changeCategory($event)">
              <option value=''>All Categories</option>
              <option v-if='categories.length > 0'  v-for="option in categories" :value="option.id">{{ option.name }}</option>
            </select>

          </div>


          <search-input
            v-on:input-use="handleSearchInput"
            :searchPlaceholder="searchPlaceholder"></search-input>

          <div class="flex-row">
            <div v-if="showNothigNotification" class="nothing-block">
              <h2>Nothig found.</h2>
              <h3>Please try again with some different keywords.</h3>
            </div>
            <loader v-if="showLoader && !showNothigNotification" :sizeInPx="'120px'"></loader>
            <product-card
              :product="product"
              :cardIcon="cardIcon"
              :key="index"
              v-else
              v-on:show-modal-btn-click="handleProductModalBtn"
              v-on:add-to-selected-click="selectProduct"
              v-on:remove-from-selected-click="unselectProduct"
              v-for="(product, index) in products">
              <div slot="title" class="poll-card__title product-card__title">
                <template v-if="product">{{product.name}}</template>
              </div>
              <div slot="author" class="author">
                <template v-if="product">By {{product.author}}</template>
              </div>
            </product-card>


          </div>
          <div class="load-more-container">
            <div class="btn btn_gray" @click='loadMoreProducts' v-if="showLoadMore">Load more</div>
            <loader v-if="showBtnLoader" :sizeInPx="'40px'"></loader>
          </div>
        </div>

      </base-layout>
    </div>

    <div class="poll__mobile">
      <tabs>
        <tab title="Poll Options" active="true">
          <poll-create-aside
            :invalidTitle="invalidTitle"
            @changeTitle="addTitle($event.target.value)"
            @changeDescription="addDescription($event.target.value)"
            @changePollExpires="selectPollExpires($event.target.value)"
            @changeVotesNumber="selectVotesNumber($event.target.value)"
            @removeFromSelected="unselectProduct($event)"
          ></poll-create-aside>
        </tab>

        <tab title="Items">
          <div class="main__title">
            Select Product(s)
          </div>
          <div class="sort__block">
            <select class="sort__select-wide" @change.number="changeCategory($event)">
              <option value=''>All Categories</option>
              <option v-if='categories.length > 0'  v-for="option in categories" :value="option.id">{{ option.name }}</option>
            </select>
          </div>
          <search-input
            v-on:input-use="handleSearchInput"
            :searchPlaceholder="searchPlaceholder"></search-input>

          <div class="flex-row">
            <div v-if="showNothigNotification" class="nothing-block">
              <h2>Nothig found.</h2>
              <h3>Please try again with some different keywords.</h3>
            </div>

            <loader v-if="showLoader && !showNothigNotification" :sizeInPx="'120px'"></loader>

            <product-card
              :product="product"
              :cardIcon="cardIcon"
              :key="index"
              v-else
              v-on:show-modal-btn-click="handleProductModalBtn"
              v-on:add-to-selected-click="selectProduct"
              v-on:remove-from-selected-click="unselectProduct"
              v-for="(product, index) in products">
              <div slot="title" class="poll-card__title product-card__title">
                <template v-if="product">{{product.name}}</template>
              </div>
              <div slot="author" class="author">
                <template v-if="product">By {{product.author}}</template>
              </div>
            </product-card>

            <div
              class="to-top-button"
              @click="goToTop"
            ></div>

          </div>
          <div class="load-more-container">
            <div class="btn btn_gray" @click='loadMoreProducts' v-if="showLoadMore">Load more</div>
            <loader v-if="showBtnLoader" :sizeInPx="'40px'"></loader>
          </div>
        </tab>
      </tabs>
    </div>

    <modal-wrapper v-if="showModal" v-on:close-click="toggleProductModal(false)">
      <product-quick-view-modal
        :product='modalProduct'
        v-on:add-to-selected-click="selectProduct"
      ></product-quick-view-modal>
    </modal-wrapper>

    <poll-create-footer
      :active="'create-poll'"
      :invalid="invalidCreation"
      v-on:invalid-button-click="emptyPollInformation"
    ></poll-create-footer>

  </section>
</template>

<script>
  import BaseLayout from '@/layouts/BaseLayout'
  import PollCreateFooter from '@/components/PollCreateFooter'
  import PollCreateAside from '@/components/PollCreateAside'
  import ProductCard from '@/components/cards/ProductCard'
  import ModalWrapper from '@/components/ModalWrapper'
  import ProductQuickViewModal from '@/components/ProductQuickViewModal'
  import SearchInput from '@/components/SearchInput'
  import Loader from '@/components/shared/Loader'
  import Tabs from '@/components/tabs/Tabs'
  import Tab from '@/components/tabs/Tab'

  import { mapGetters } from 'vuex'
  import _ from 'lodash'
  import notificationService from '../services/notification.service'

  export default {
    name: 'PollCreate',

    components: {
      BaseLayout,
      PollCreateFooter,
      PollCreateAside,
      ProductCard,
      ModalWrapper,
      ProductQuickViewModal,
      SearchInput,
      Loader,
      Tabs,
      Tab
    },

    data () {
      return {
        sectionIcon: 'poll',
        cardIcon: true,
        searchPlaceholder: 'Search for products',
        showModal: false,
        showLoadMore: true,
        showBtnLoader: false,
        showNothigNotification: false,
        modalProduct: {},
        currentPage: 1,
        selectedProduct: {},
        invalidTitle: false
      }
    },

    computed: {
      ...mapGetters([
        'products',
        'productsNumber',
        'pollTitle',
        'pollDescription',
        'selectedProducts',
        'categories'
      ]),

      showLoader () {
        return this.products.length === 0
      },

      exceedingLimit () {
        return (this.selectedProducts.length > this.productsNumber || this.selectedProducts.length < 2)
      },

      unfilledInformation () {
        return !(!!this.pollTitle && !!this.pollDescription)
      },

      invalidCreation () {
        return (this.exceedingLimit || this.unfilledInformation)
      }
    },

    methods: {
      changeCategory (e) {
        this.showLoadMore = false
        this.showNothigNotification = false
        let categoryId = e.target.value
        this.$store.dispatch('getProductsByCategoryId', categoryId)
          .then(res => {
            if (res.length === 0) {
              this.showNothigNotification = true
            }
            categoryId.length > 0 ? this.showLoadMore = false : this.showLoadMore = true
          })
      },

      toggleProductModal (modalState) {
        this.showModal = modalState
      },

      handleProductModalBtn (productId) {
        this.toggleProductModal(true)
        this.modalProduct = {}
        this.$store.dispatch('getProductById', productId)
          .then(res => {
            // todo
            this.modalProduct = this.products.filter((product) => product.id === productId)[0]
          })
      },

      loadMoreProducts () {
        const page = this.currentPage += 1
        this.showBtnLoader = true
        this.showLoadMore = false
        this.$store.dispatch('loadMoreProducts', page)
          .then(res => {
            this.showLoadMore = true
            this.showBtnLoader = false
          })
      },

      handleSearchInput: _.debounce(function (text) {
        this.searchProducts(text)
      }, 1000),

      searchProducts (text) {
        this.$store.commit('deleteProductsList')
        this.showLoadMore = false
        this.showNothigNotification = false
        this.$store.dispatch('searchProducts', text)
          .then(res => {
            if (res.length === 0) {
              this.showNothigNotification = true
            }
            text.length > 0 ? this.showLoadMore = false : this.showLoadMore = true
          })
      },

      getProductsList () {
        this.showNothigNotification = false
        this.$store.dispatch('getProductsList')
      },

      getCategoriesList () {
        this.$store.dispatch('getCategoriesList')
      },

      selectProduct (productId) {
        this.$store.commit('selectedProductsLoader', true)
        this.$store.dispatch('getProductById', productId)
          .then(res => {
            this.$store.commit('selectedProductsLoader', false)
            this.selectedProduct = this.products.filter((product) => product.id === productId)[0]
            this.addToSelectedProducts(this.selectedProduct)
          })
      },

      addToSelectedProducts (selectedProduct) {
        this.$store.commit('addToSelectedProducts', selectedProduct)
      },

      unselectProduct (productId) {
        let filteredSelectedProducts = this.selectedProducts.filter((product) => product.id !== productId)
        this.$store.commit('setSelectedProducts', filteredSelectedProducts)
      },

      addTitle (title) {
        if (this.pollTitle) {
          this.invalidTitle = false
        } else {
          this.invalidTitle = true
        }
        this.$store.commit('setPollTitle', title)
      },

      addDescription (description) {
        this.$store.commit('setPollDescription', description)
      },

      selectPollExpires (expires) {
        this.$store.commit('setPollExpires', expires)
      },

      selectVotesNumber (votesNumber) {
        this.$store.commit('setVotesNumber', votesNumber)
      },

      emptyPollInformation () {
        if (this.unfilledInformation) {
          this.goToTop()
          if (!this.pollTitle) {
            this.invalidTitle = true
          }
          notificationService.showError('You need to fill poll title and description fields.')
        } else {
          notificationService.showError('You need to select at least two products.')
        }
      },

      goToTop () {
        const header = document.getElementById('header')
        header.scrollIntoView()
      }
    },

    created () {
      this.$store.commit('deleteCreatingPoll')
      this.getProductsList()
      this.getCategoriesList()
    }
  }
</script>

<style lang="scss" scoped>
  .poll {
    &__desktop {
      @media #{$tablet-screen-lg-max} {
        display: none;
      }
    }

    &__mobile {
      padding: 30px 20px;

      @media #{$tablet-screen-lg-min} {
        display: none;
      }
    }
  }

  .nothing-block {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    width: 100%
  }

  .load-more-container {
    display: flex;
    text-align: center;
    justify-content: center;
  }

  .main {
    &__title {
      margin-bottom: 28px;
      font-size: 18px;
      line-height: 1.11;
      color: $gray;
    }
  }

  .sort {
    &__title {
      margin-right: 17px;
      margin-bottom: 10px;

      @media #{$mobile-screen-sm-min} {
        margin-bottom: 0;
      }
    }

    &__block {
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;

      @media #{$mobile-screen-sm-min} {
        align-items: center;
        flex-direction: row;
      }
    }

    &__select-slim {
      width: 156px;
      margin-right: 20px;
      margin-bottom: 15px;

      @media #{$mobile-screen-sm-min} {
        margin-bottom: 0;
      }
    }

    &__select-wide {
      flex: 1;
    }
  }

  .to-top-button {
    position: fixed;
    right: 15px;
    top: 70px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #fff url('../assets/img/select-arrow.svg') no-repeat center;
    box-shadow: 0 -1px 4px 0 rgba(0, 0, 0, 0.5);
    transform: rotate(180deg);
  }
</style>
