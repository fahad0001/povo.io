<template>
  <div class="cart__container cart__message" v-if="message">

    <div class="title"> {{ message.title }}</div>
    <div class="description greater-gray">
      {{ message.description }}
    </div>
    <div v-if="message.smile" class="smile happy"></div>
    <div v-else class="smile sad"></div>
    <router-link :to="'/rewards'" class="btn btn_lightblue-outline">{{ message.btn }}</router-link>
  </div>
</template>

<script>
  export default {
    name: 'RewardsMessage',
    props: {
      message: {
        type: Object
      }
    }
  }
</script>
<style lang="scss" scoped>
  .cart {
    &__message {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      background: #fff;
      box-shadow: $base-box-shadow;

      @media #{$mobile-screen-lg-min} {
        padding: 65px 50px 46px;
      }

      .title {
        margin-bottom: 2px;
        color: $skyblue;

        @media #{$tablet-screen-sm-max} {
          text-align: center;
          margin-bottom: 10px;
        }
      }

      .description {
        @media #{$tablet-screen-sm-max} {
          text-align: center;
        }

        margin-bottom: 26px;
      }

      .smile {
        width: 60px;
        height: 60px;
        margin-bottom: 20px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;

        @media #{$mobile-screen-lg-min} {
          margin-bottom: 35px;
        }

        &.happy {
          background-image: url('../assets/img/happy.svg');
        }

        &.sad {
          background-image: url('../assets/img/sad.svg');
        }
      }
    }
  }
</style>
