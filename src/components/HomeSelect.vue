<template>
  <div class="select">

    <div class="select__container" @click="toggle">
      <div class="select__title">View all polls</div>
      <div class="select__triangle-container">
        <div class="select__triangle" :class="{'triangle-up': active, 'triangle-down': !active}"></div>
      </div>
    </div>

    <!--<div :class="{'opened': active, 'collapsed': !active}">

    </div>-->

  </div>
</template>

<script>
  export default {
    name: 'HomeSelect',
    data () {
      return {
        active: false
      }
    },
    methods: {
      toggle () {
        this.active = !this.active
      }
    }
  }
</script>

<style lang="scss" scoped>
  .select {
    position: relative;
    width: 187px;
    border-radius: $base-border-radius;
    border: 1px solid $gray-lighter;
    cursor: pointer;

    &__container {
      padding: 10px 0;
    }

    &__triangle-container {
      position: absolute;
      top: 50%;
      right: 18px;
      width: 8px;
      height: 8px;
      transform: translateY(-50%);
    }

    &__triangle {
      position: absolute;
      width: 8px;
      height: 8px;
      transform: rotate(-45deg);
      border-left: solid 1px #46b4e8;
      border-bottom: solid 1px #46b4e8;

      &.triangle-up {
        transform: rotate(135deg);
        transition: 0.3s;
      }

      &.triangle-down {
        transition: 0.3s;
      }
    }

    &__title {
      text-align: center;
    }
  }
</style>
