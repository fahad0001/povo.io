<template>
  <div class="selected-product card poll-card">

    <div class="selected-product__icon" @click="unselectProduct"></div>

    <div class="poll-card__images selected-product__image-container">
      <div class="selected-product__image" :style="`background-image: url(${product.image.url})`">
      </div>
    </div>

    <div class="poll-card__info selected-product__information">
      <div class="poll-card__title selected-product__title">{{ product.name }}</div>
      <div class="author selected-product__author">by {{ product.author }}</div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'SelectedProductCard',

    data () {
      return {
        server_url: process.env.SERVER_URL
      }
    },

    props: {
      product: {
        type: Object
      }
    },

    methods: {
      unselectProduct () {
        this.$emit('remove-from-selected-click', this.product.id)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .selected-product {
    display: flex;
    position: relative;
    width: 100%;
    margin: 0 0 5px;

    &__icon {
      width: 20px;
      height: 20px;
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translateY(-50%);
      background-image: url('../../assets/img/checkFilled.svg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      cursor: pointer;

      @media #{$mobile-screen-sm-min} {
        right: 22px;
      }
    }

    .poll-card__images {
      border-bottom: none;
    }

    &__image-container {
      width: 84px;
    }

    &__image {
      display: block;
      width: 100%;
      height: 0;
      padding-top: calc( 79 / 84 * 100%);
      background-repeat: no-repeat;
      background-position: center;
      background-size: 90%;
    }

    &__information {
      width: calc(100% - 84px);
      padding: 19px 24px 20px;
      border-left: 2px solid $gray-extra-light;
    }

    &__title {
      font-size: 18px;
      // max-width: 180px;
      max-width: 90%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    &__author {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
</style>
