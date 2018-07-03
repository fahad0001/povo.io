<template v-if='Object.keys(product).length > 0'>
  <div class="ci__container">
    <div class="ci__image-container">
      <!-- <div class="ci__image" :style="`background-image: url(${require('../../assets/img/Bitmap Copy 9.png')})`"></div> -->
      <img :src="product.image.url" v-if="product.image">
      <img src="../../assets/img/povo-logo.svg" v-else>
    </div>

    <div class="ci__meta">
      <div class="ci__description">
        <div class="title" v-if="product.name">{{product.name}}</div>
        <div class="price" v-if="product.price">{{product.price}} points</div>
      </div>

      <a class="ci__remove hover-link" @click='removeFromCart'>Remove</a>

     <!--  <select class="slim">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select> -->
    </div>

  </div>
</template>
<script>
  export default {
    name: 'CartItem',

    props: {
      product: {
        type: Object
      }
    },

    data () {
      return {
        slimSelect: true,
        server_url: process.env.SERVER_URL
      }
    },

    methods: {
      removeFromCart () {
        this.$emit('remove', this.product)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .ci {
    &__container {
      display: flex;
      align-items: center;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border-bottom: 1px solid $gray-extra-light;

      @media #{$tablet-screen-sm-min} {
        padding-bottom: 34px;
        margin-bottom: 34px;
      }
    }

    &__image-container {
      margin-right: 49px;
      width: 106px;

      img {
        max-width: 100%;
      }
    }

    &__image {
      display: block;
      width: 100%;
      height: 0;
      padding-top: calc( 109 / 106 * 100%);
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }

    &__meta {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;

      @media #{$mobile-screen-lg-min} {
        flex-direction: row;
        align-items: center;
      }
    }

    &__description {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .title {
        font-size: 20px;
        color: $gray;
      }

      .price {
        color: $gray;
      }
    }

    &__remove {
      margin: 10px 0;
      padding: 7px 0;
      color: $gray;
      cursor: pointer;

      @media #{$mobile-screen-lg-min} {
        margin: 0 28px 0 auto;
      }
    }
  }
</style>
