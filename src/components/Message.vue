<template>
  <div class="message" :class="{'hidden': !showMessage}">
    <div class="message__close hover-link" @click="close"></div>
    <slot name="text"></slot>
  </div>
</template>
<script>
  export default {
    name: 'Message',

    data () {
      return {
        showMessage: true
      }
    },

    methods: {
      close: function () {
        this.showMessage = false
      }
    }
  }
</script>
<style lang="scss" scoped>
  .message {
    position: relative;
    width: 100%;
    padding: 11px 35px;
    background: $skyblue;
    text-align: center;

    &__close {
      position: absolute;
      top: 50%;
      right: 15px;
      transform: translateY(-50%);
      width: 14px;
      height: 14px;
      background: url('../assets/img/close-white.svg') no-repeat center;
      background-size: contain;
      cursor: pointer;
    }

    &__text {
      color: #fff;
      font-weight: 600;
    }
  }
</style>
