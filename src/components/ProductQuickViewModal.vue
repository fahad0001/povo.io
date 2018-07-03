<template>
  <div class="quick-view quick-view__modal-container">
    <template v-if='Object.keys(product).length > 0'>
      <div class="quick-view__image">
        <img v-if="product.image" :src="product.image.url" >
        <img src="../assets/img/povo-logo.svg" v-else>
      </div>

      <div class="quick-view__information">
        <div class="quick-view__title">{{product.name}}</div>
        <div class="quick-view__author" v-if="product.author">By {{product.author}}</div>

        <div v-if="rewards" class="quick-view__points">
          {{+(product.price)}} points
        </div>

<!--         <div v-else class="quick-view__colors">
          <div class="color color-01"></div>
          <div class="color color-02"></div>
          <div class="color color-03"></div>
        </div> -->

        <div
          class="quick-view__description"
          v-html="rewards && product.desc || product.description"
        >
        </div>

        <div v-if="rewards" class="quick-view__footer">
          <button class="btn btn_lightblue btn__full-size" @click="redeemedProduct">Redeem</button>
        </div>

        <div v-else class="quick-view__footer">
          <a :href="product.buy_link" target="_blank" class="btn btn_lightblue-outline">Buy now</a>
          <button class="btn btn_lightblue" @click="selectProduct" v-if="!hideSelectBtn">Select</button>
        </div>

      </div>
    </template>
    <template v-else>
      <loader :sizeInPx="'80px'"></loader>
    </template>
  </div>
</template>
<script>
import Loader from '@/components/shared/Loader'

export default {
  name: 'ProductQuickView',

  components: {
    Loader
  },

  props: {
    rewards: false,
    hideSelectBtn: {
      type: Boolean,
      default: false
    },
    product: {
      type: Object
    }
  },

  data () {
    return {
      server_url: process.env.SERVER_URL
    }
  },

  methods: {
    // TODO refactor to one method with object as paran instead of id only
    redeemedProduct () {
      this.$emit('add-to-selected-click', this.product, true)
    },

    selectProduct () {
      this.$emit('add-to-selected-click', this.product.id)
      this.$emit('close-click')
    }
  }
}
</script>
<style lang="scss" scoped>
  .quick-view {
    &__modal-container {
      max-width: 776px;
      width: 100%;
      padding: 30px;
      display: flex;
      flex-direction: column;

      @media #{$mobile-screen-lg-min} {
        flex-direction: row;
      }

      @media #{$tablet-screen-sm-min} {
        padding: 69px 54px 56px;
      }
    }

    &__image {
      text-align: center;

      @media #{$mobile-screen-lg-min} {
        width: 50%;
      }

      img {
        width: 100%
      }
    }

    &__information {
      margin-top: 15px;

      @media #{$mobile-screen-lg-min} {
        margin-top: 0;
        width: 50%;
        padding-left: 18px;
        min-width: 340px;
      }
    }

    &__title {
      margin-bottom: 5px;
      font-size: 20px;
      color: $skyblue;
    }

    &__author {
      margin-bottom: 26px;
      color: $gray-light;
    }

    &__points {
      margin-bottom: 24px;
      font-size: 18px;
      color: $gray;
    }

    &__colors {
      margin-bottom: 24px;
      display: flex;

      .color {
        width: 14px;
        height: 14px;
        margin-right: 8px;
        border-radius: 100px;
        cursor: pointer;

        &-01 {
          background-color: #ae6731;
        }

        &-02 {
          background-color: #4a4a4a;
        }

        &-03 {
          background-color: #f8f8f8;
          border: solid 1px #979797;
        }
      }
    }

    &__description {
      margin-bottom: 31px;
      line-height: 1.25;
      color: $gray;
      max-height: 350px;
      overflow-y: auto;
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
      flex-direction: column;

      @media #{$mobile-screen-sm-min} {
        flex-direction: row;
      }

      @media #{$mobile-screen-lg-min} {
        justify-content: flex-start;
      }

      .btn:not(:first-child) {
        margin-top: 10px;

        @media #{$mobile-screen-sm-min} {
          margin-top: 0;
          margin-left: 6px;
        }
      }
    }
  }
</style>
