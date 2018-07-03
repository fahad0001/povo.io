<template>
  <div class="sv__container">
    <div class="sv__image"></div>
    <div class="sv__info">
      <slot name="title"></slot>
      <slot name="author"></slot>
      <slot name="price"></slot>
      <slot name="description"></slot>
      <slot name="btn"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'SingleViewCard'
  }
</script>
<style lang="scss" scoped>
  .sv {
    &__container {
      width: 100%;
      display: flex;
      padding-bottom: 36px;
    }

    &__image {
      background: #fff;
      box-shadow: $base-box-shadow;
      flex: 1;
      max-width: 503px;
      margin-right: 43px;
    }

    &__info {
      max-width: 422px;
    }

    &__title {
      margin-bottom: 4px;
      font-size: 20px;
    }

    &__author {
      margin-bottom: 28px;
      color: $gray-light;
    }

    &__price {
      margin-bottom: 30px;
      font-size: 18px;
      color: $gray;
    }

    &__description {
      margin-bottom: 39px;
    }

    &__btn {
      width: 235px;
      margin-bottom: 49px;
    }
  }
</style>
