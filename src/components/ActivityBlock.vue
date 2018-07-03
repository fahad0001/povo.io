<template>
  <div class="activity__container">
    <div class="name_and_time">
      <slot name="name"></slot>
      <slot name="time"></slot>
    </div>

    <slot name="points"></slot>
  </div>
</template>

<script>
  export default {
    name: 'ActivityBlock'
  }
</script>

<style lang="scss" scoped>
  .activity {
    &__container {
      display: flex;
      justify-content: space-between;
      padding: 7px 0 9px;
      border-bottom: 1px solid $gray-extra-light;

      .name_and_time {
        padding-right: 15px;
      }
    }

    &__name {
      font-size: 18px;
      line-height: 1.44;
      color: $gray;
      // max-width: 100%;
      word-wrap: break-word;

      @media #{$tablet-screen-lg-min} {
        // max-width: 300px;
      }
    }

    &__time {
      color: $gray-light;
    }

    &__points {
      display: flex;
      align-items: center;
      font-size: 18px;
      line-height: 1.44;
      color: $skyblue;
    }
  }
</style>
