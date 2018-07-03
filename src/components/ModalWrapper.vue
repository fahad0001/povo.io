<template>
  <transition name="modal-transition">
    <div class="modal">
      <div class="modal__body">
        <div class="modal__overlay" @click="hideModal()"></div>
        <div class="modal__dialog">
          <div class="modal__close" @click="hideModal()"></div>

          <slot></slot>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'ModalWrapper',
    props: {
      canShow: Boolean
    },

    methods: {
      hideModal () {
        this.$emit('update:canShow', false)
        this.$emit('close-click', false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .modal {
    position: relative;
    z-index: 999999;

    &__body {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
      width: 100%;
      z-index: 10;
      padding: 15px;
      overflow: auto;

      @media #{$mobile-screen-lg-min} {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
      }
    }

    &__overlay {
      position: fixed;
      z-index: 4;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
    }

    &__close {
      position: absolute;
      right: 2px;
      top: 2px;
      width: 30px;
      height: 30px;
      background: url('../assets/img/close.svg') no-repeat 50% 50%;
      background-size: 55%;
      cursor: pointer;

      @media #{$mobile-screen-lg-min} {
        right: 5px;
        top: 5px;
      }

      &:hover {
        opacity: 0.7;
      }
    }

    &__dialog {
      position: relative;
      z-index: 15;
      margin: 0 auto;
      background-color: #fff;
      box-shadow: $base-box-shadow;
      border-radius: 4px;
      animation-name: modal-animate;
      animation-duration: 0.5s;
    }
  }

  .modal-transition-enter-active, .modal-transition-leave-active {
    transition: opacity 0.25s ease-out;
  }

  .modal-transition-enter, .modal-transition-leave-to {
    // opacity: 0;
  }

</style>
