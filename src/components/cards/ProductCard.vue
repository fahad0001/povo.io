<template>
  <div class="product-card card poll-card">
    <div class="product-card__icon" v-if="cardIcon" :class="{'active': active}" @click="selectProduct"></div>

    <div class="poll-card__images product-card__image-container">
      <div class="product-card__image" :style="`background-image: url(${product.image.url})`">
      </div>
      <div class="btn btn_lightblue product-card__btn" @click="showModal">Quick View</div>
    </div>

    <div class="poll-card__info product-card__information">
      <div class="poll-card__title product-card__title">{{product.name}}</div>
      <div class="author" v-if='rewards'>{{+(product.price)}} points</div>
      <div class="author" v-else>By {{product.author}}</div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'ProductCard',

    data () {
      return {
        active: false,
        server_url: process.env.SERVER_URL
      }
    },

    props: {
      cardIcon: false,
      rewards: false,
      product: {
        type: Object
      }
    },

    methods: {
      selectProduct () {
        this.active = !this.active
        if (this.active) {
          this.$emit('add-to-selected-click', this.product.id)
        } else {
          this.$emit('remove-from-selected-click', this.product.id)
        }
      },

      showModal () {
        this.$emit('show-modal-btn-click', this.product.id)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .product-card {
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 200px;
    width: 100%;
    margin: 0 0 20px 0;

    @media #{$mobile-screen-md-min} {
      width: calc((100% - 20px) / 2);
      margin: 0 20px 20px 0;
    }

    @media #{$tablet-screen-sm-min} {
      width: calc((100% - 40px) / 3);
    }

    @media #{$tablet-screen-lg-min} {
      width: calc((100% - 20px) / 2);
    }

    @media #{$desktop-screen-sm-min} {
      width: calc((100% - 40px) / 3);
    }

    @media (min-width: 1420px) {
      width: calc((100% - 60px) / 4);
    }

    &:nth-child(2n) {
      @media #{$mobile-screen-md-min} {
        margin-right: 0;
      }
    }

    &:nth-child(2n) {
      @media #{$tablet-screen-sm-min} {
        margin-right: 20px;
      }
    }

    &:nth-child(3n) {
      @media #{$tablet-screen-sm-min} {
        margin-right: 0;
      }

      @media #{$tablet-screen-lg-min} {
        margin-right: 20px;
      }
    }

    &:nth-child(2n) {
      @media #{$tablet-screen-lg-min} {
        margin-right: 0;
      }
    }

    &:nth-child(2n) {
      @media #{$desktop-screen-sm-min} {
        margin-right: 20px;
      }
    }

    &:nth-child(3n) {
      @media #{$desktop-screen-sm-min} {
        margin-right: 0;
      }

      @media (min-width: 1420px) {
        margin-right: 20px;
      }
    }

    &:nth-child(4n) {
      @media (min-width: 1420px) {
        margin-right: 0;
      }
    }

    &:hover .product-card__btn {
      opacity: 1;
    }

    &__icon {
      width: 20px;
      height: 20px;
      position: absolute;
      top: 12px;
      left: 12px;
      z-index: 5;
      background-image: url('../../assets/img/checkUnactive.svg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      cursor: pointer;
      transition: $base-animation-duration;

      &.active {
        background-image: url('../../assets/img/checkFilled.svg');
      }
    }

    &__information {
      padding: 14px 16px;
    }

    &__title {
      margin-bottom: 1px;
      font-size: 18px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    &__image-container {
      width: 100%;
      position: relative;
    }

    &__image {
      display: block;
      width: 100%;
      height: 250px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }

    &__btn {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateY(-50%) translateX(-50%);
      opacity: 0;
      transition: $base-animation-duration;
    }
  }
</style>
