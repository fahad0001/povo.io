<template>
  <div class="win-prod-card card">
    <div class="image-container">
      <div class="image" :style="`background-image: url(${product.item.image.url})`">
      </div>
    </div>

    <div class="information">
      <div class="information__header">
        <div class="date" >Ended {{ endedDate }}</div>
        <save-product-btn
          :loading="loading"
          :isSaved="isSaved"
          @removeSavedProduct="$emit('removeSavedProduct')"
          @saveForLater="$emit('saveForLater')"
        ></save-product-btn>
      </div>
      <slot name="title"></slot>
      <slot name="author"></slot>
      <slot name="description"></slot>
      <div class="information__footer">
        <router-link :to="`/polls/${poll.id}/results`" class="btn btn_lightblue-outline information__footer-btn">View Results</router-link>
        <a :href="product.item.buy_link" target="_blank" class="btn btn_lightblue information__footer-btn" >Buy Now</a>
      </div>
    </div>

  </div>
</template>

<script>
  import moment from 'moment'
  import Loader from '@/components/shared/Loader'
  import SaveProductBtn from '@/components/shared/SaveProductBtn'

  export default {
    name: 'WinProductCard',

    components: {
      Loader,
      SaveProductBtn
    },

    data () {
      return {
        server_url: process.env.SERVER_URL
      }
    },

    props: {
      product: {
        type: Object,
        required: true,
        default: null
      },
      loading: {
        type: Boolean,
        default: false
      },
      poll: {
        type: Object,
        required: true
      }
    },

    computed: {
      endedDate () {
        return moment(this.product.poll.updated_at).startOf('minute').fromNow()
      },

      isSaved () {
        return this.product.item.saved
      }
    }
  }
</script>

<style lang="scss" scoped>
  .loader {
    width: 150px;
  }

  .win-prod-card {
    width: 100%;
    display: flex;
    margin: 0 0 20px;
  }

  .image-container {
    width: 367px;
    background: #fff;
    border-right: 1px solid $gray-extra-light;
  }

  .image {
    width: 100%;
    height: 0;
    padding-top: calc( 304 / 367 * 100%);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 70%;
  }

  .information {
    flex: 1;
    padding: 31px 40px 39px;
    background: #faffff;
    &__header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 23px;
      .date {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }

    &__update {
      margin-top: 7px;
      color: $gray;
    }

    &__header-btn {
      position: relative;
      margin-left: auto;
      padding: 9px 30px 9px 15px;
      min-width: 152px;

      &:before {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
        background-image: url('../../assets/img/starIcon.svg');
      }
    }

    &__title {
      margin-bottom: 4px;
      font-size: 20px;
      color: $skyblue;
    }

    &__author {
      margin-bottom: 20px;
      color: $gray-light;
    }

    &__description {
      margin-bottom: 27px;
      font-size: 18px;
      line-height: 1.11;
      color: $gray;
    }

    &__footer {
      display: flex;
    }

    &__footer-btn {
      flex: 1;

      &:not(:last-child) {
        margin-right: 21px;
      }
    }
  }
</style>
