<template>
  <div class="create-aside">
    <input
      class="title-input blueline-input"
      :class="{'invalid': invalidTitle}"
      placeholder="Your poll title/question"
      :value="pollTitle"
      @input="changeTitle"
    >

    <div class="aside__comment">
            <textarea name="comment"
                      id="comment"
                      class="text-field"
                      placeholder="Enter your description here"
                      :value="pollDescription"
                      @input="changeDescription"
            >
            </textarea>
    </div>

    <div class="options">

      <div class="option">

        <label for="poll_expires" class="description">
          Expires
        </label>

        <select
          class="select"
          id="poll_expires"
          :value="pollExpires"
          @change="changePollExpires"
        >
          <option value="1" selected>1 day</option>
          <option value="3">3 days</option>
          <option value="7">1 week</option>
        </select>

      </div>

      <div class="option">

        <label for="votes_number" class="description">
          Number of votes in this poll
        </label>

        <select
          class="select"
          id="votes_number"
          :value="votesNumber"
          @change="changeVotesNumber"
        >
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="80">80</option>
          <option value="100">100</option>
        </select>

      </div>

    </div>

    <div class="counter" :class="{'invalid': exceedingLimit}">
      <div class="counter__text">Selected items</div>
      <div class="counter__numbers">{{ selectedProducts.length }}/{{ productsNumber }}</div>
    </div>

    <div class="selected-items">

      <div v-if="!selectedProducts.length && !selectedProductsLoader" class="empty">No items selected</div>
      <loader v-else-if="selectedProductsLoader && selectedProducts.length < 1" :sizeInPx="'60px'"></loader>
      <div v-else>
        <selected-product-card
          v-for="(product, index) in selectedProducts"
          :key="index"
          :product="product"
          @remove-from-selected-click="unselectProduct"
        ></selected-product-card>
        <loader v-if="selectedProductsLoader" :sizeInPx="'60px'"></loader>

      </div>

    </div>
  </div>
</template>

<script>
  import SelectedProductCard from '@/components/cards/SelectedProductCard'
  import Loader from '@/components/shared/Loader'

  import { mapGetters } from 'vuex'

  export default {
    name: 'PollCreateAside',

    components: {
      SelectedProductCard,
      Loader
    },

    props: {
      invalidTitle: false
    },

    computed: {
      ...mapGetters([
        'productsNumber',
        'pollExpires',
        'pollTitle',
        'pollDescription',
        'selectedProducts',
        'votesNumber',
        'selectedProductsLoader'
      ]),

      exceedingLimit () {
        return (this.selectedProducts.length > this.productsNumber || this.selectedProducts.length < 2)
      }
    },

    methods: {
      unselectProduct (event) {
        this.$emit('removeFromSelected', event)
      },

      changeTitle: function (event) {
        this.$emit('changeTitle', event)
      },

      changeDescription: function (event) {
        this.$emit('changeDescription', event)
      },

      changePollExpires: function (event) {
        this.$emit('changePollExpires', event)
      },

      changeVotesNumber: function (event) {
        this.$emit('changeVotesNumber', event)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .create-aside {
    .title-input {
      font-size: 20px;
      padding: 5px 0;
      margin-bottom: 20px;
      background: transparent;
      width: 100%;

      &::placeholder {
        color: $gray;
      }
    }

    .aside {
      &__comment {
        margin-bottom: 21px;
      }
    }

    .counter {
      display: flex;
      justify-content: space-between;
      margin-bottom: 19px;

      &__text {
        margin-right: 10px;
        font-size: 18px;
        line-height: 1.11;
        color: $gray;
      }

      &__numbers {
        font-size: 18px;
        line-height: 1.11;
        color: $gray;
      }

      &.invalid {
        .counter__text,
        .counter__numbers {
          color: $red;
        }
      }
    }

    .selected-items {
      width: 100%;
      display: flex;
      flex-direction: column;

      .empty {
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: $base-border-radius;
        background: #ededed;
        color: $gray-light;
      }
    }

    .select {
      width: 100px;
    }

    .options {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid $gray-extra-light;
    }

    .option {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      .description {
        color: $gray;
        margin-right: 24px;
      }
    }
  }
</style>
