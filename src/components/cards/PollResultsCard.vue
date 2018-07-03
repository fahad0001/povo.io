<template>
  <div class="card card-container">
    <div class="image-container" @click="toggleModal">
      <div class="image" :style="`background-image: url(${product.item.image.url})`"></div>
    </div>

    <div class="info" @click.self="toggleModal">
      <div class="card-header" @click.self="toggleModal">
        <div :title="product.item.name" class="name" @click="toggleModal">{{ product.item.name }}</div>
        <div class="votes" @click="toggleModal">{{ product.votes_count }} Votes</div>
      </div>

      <div class="slider">
        <swiper :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide
            v-for="(voter, index) in product.voters"
            :key="index"
          >
            <a :title="voter.name" class="user" :style="`background-image: url(${ voter.image.thumb.url })`"></a>
          </swiper-slide>
          <!-- Optional controls -->
          <div
            class="swiper-button-prev"
            slot="button-prev"
            v-if="product.voters.length > 0"
            @click="prevClick()"
            :class="{ 'disabled': noPrevSlides }"
          ></div>
          <div
            class="swiper-button-next"
            slot="button-next"
            v-if="product.voters.length > 0"
            @click="nextClick()"
            :class="{ 'disabled': noNextSlides }"
          ></div>
        </swiper>
      </div>

      <!--<div class="slider">
        <swiper
          :options="swiperOption"
          ref="mySwiper"
        >
          &lt;!&ndash; slides &ndash;&gt;
          <swiper-slide
            v-for="(user, index) in users"
            :key="index"
          >
            <a :title="user.name" class="user"></a>
          </swiper-slide>
          &lt;!&ndash; Optional controls &ndash;&gt;
          <div
            v-if="users.length > 0"
            @click="prevClick()"
            class="swiper-button-prev"
            :class="{ 'disabled': noPrevSlides }"
            slot="button-prev">
          </div>
          <div
            v-if="users.length > 0"
            @click="nextClick()"
            class="swiper-button-next"
            :class="{ 'disabled': noNextSlides }"
            slot="button-next">
          </div>
        </swiper>
      </div>-->

    </div>

    <modal-wrapper
      v-if="showModal"
      v-on:close-click="toggleModal()"
    >
      <product-quick-view-modal
        :product="product.item"
        :hideSelectBtn="true"
      ></product-quick-view-modal>
    </modal-wrapper>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import ModalWrapper from '@/components/ModalWrapper'
  import ProductQuickViewModal from '@/components/ProductQuickViewModal'

  export default {
    name: 'PollResultsCard',

    components: {
      swiper,
      swiperSlide,
      ModalWrapper,
      ProductQuickViewModal
    },

    data () {
      return {
        showModal: false,
        server_url: process.env.SERVER_URL,
        noPrevSlides: true,
        noNextSlides: false,
        swiperOption: {
          slidesPerView: 5,
          spaceBetween: 12,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        users: [
          {name: 'Test1'},
          {name: 'Test2'},
          {name: 'Test3'},
          {name: 'Test4'},
          {name: 'Test5'},
          {name: 'Test6'},
          {name: 'Test7'}
        ]
      }
    },

    props: {
      product: Object
    },

    computed: {
      swiper () {
        return this.$refs.mySwiper.swiper
      }
    },

    mounted () {
      if (this.product.voters.length < 6) {
        this.noNextSlides = true
      }
    },

    methods: {
      toggleModal () {
        this.showModal = !this.showModal
      },
      prevClick () {
        if (this.product.voters.length > 5) {
          this.swiper.slidePrev(300)
          this.noNextSlides = false
          if (this.swiper.activeIndex === 0) {
            this.noPrevSlides = true
          }
        }
      },

      nextClick () {
        if (this.product.voters.length > 5) {
          this.swiper.slideNext(300)
          this.noPrevSlides = false
          if (this.swiper.activeIndex === (this.product.voters.length - 5)) {
            this.noNextSlides = true
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .slider {
    .user {
      display: block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: gray;
      background-size: contain;
      background-position: center;
    }

    .swiper-container {
      height: 30px;
      padding: 0 30px;
    }

    .swiper-button-prev,
    .swiper-button-next {
      width: 22px;
      height: 32px;
      background-color: #faffff;
      top: 21px;
      background-size: 20px 20px;

      &.disabled {
        opacity: 0.3;
      }
    }

    .swiper-button-prev {
      left: -1px;
    }

    .swiper-button-next {
      right: -1px;
    }
  }

  .card-container {
    display: flex;
    width: 100%;
    margin-bottom: 20px;

    @media #{$mobile-screen-xs-min} {
      height: 90px;
    }
  }

  .image-container {
    width: 61px;
    min-width: 61px;
    display: flex;
    align-items: center;
    background: #fff;
    border-right: 1px solid $gray-extra-light;

    @media #{$mobile-screen-xs-min} {
      height: 100%;
      border: none;
    }
  }

  .image {
    display: block;
    width: 100%;
    height: 0;
    padding-top: calc( 90 / 61 * 100%);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80%;

    @media #{$mobile-screen-xs-min} {
      border-right: 1px solid $gray-extra-light;
    }
  }

  .info {
    width: calc(100% - 61px);
    padding: 14px 15px;
    background: #faffff;
  }

  .card-header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 13px;

    @media #{$mobile-screen-xs-min} {
      flex-direction: row;
    }

    .name {
      max-width: 175px;
      margin-right: 10px;
      margin-bottom: 5px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      color: $gray;
      cursor: pointer;

      @media #{$mobile-screen-xs-min} {
        margin-bottom: 0;
      }
    }

    .votes {
      cursor: pointer;
      color: $gray;
    }
  }
</style>
