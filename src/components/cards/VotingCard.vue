<template>
  <div class="voting-card__wrapper">
    <input type="radio"
           name="card-select"
           class="hidden"
           @change="handleRadioChange($event)"
           v-model="localPicked"
           :id="value"
           :value="value">

    <label :for="value"
           class="card poll-card voting-card"
    >

      <div class="poll-card__images">
        <div class="image-container">
          <div class="image-wrapper" :style="`background-image: url(${product.image.url})`">
          </div>
        </div>
      </div>

      <div class="poll-card__info voting-card__info">

        <div class="poll-card__title title">
          {{ product.name }}
        </div>

        <span class="author">By {{ product.author }}</span>

      </div>

      <a
        class="voting-card__icon hover-link"
        @click="showModal"
      ></a>

    </label>
  </div>
</template>

<script>
  export default {
    name: 'VotingCard',

    data () {
      return {
        localPicked: '',
        server_url: process.env.SERVER_URL
      }
    },

    props: {
      pickedCard: '',
      value: '',
      product: Object
    },

    methods: {
      handleRadioChange (e) {
        this.$emit('pick', this.product)
      },

      showModal () {
        this.$emit('show-modal-btn-click', this.product.id)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .voting-card {
    position: relative;
    display: block;
    margin: 0;
    cursor: pointer;
    transition: $base-animation-duration;

    &__wrapper {
      width: 100%;
      margin-bottom: 20px;

      @media #{$mobile-screen-md-min} {
        width: calc(50% - 10px);
      }

      &:not(:nth-child(2n)) {
        @media #{$mobile-screen-md-min} {
          margin-right: 20px;
        }
      }
    }

    &__info {
      padding: 13px 21px;
    }

    &__icon {
      position: absolute;
      top: 8px;
      left: 12px;
      display: block;
      width: 20px;
      height: 20px;
      cursor: pointer;
      background: url('../../assets/img/infoIcon.svg') no-repeat 50% 50%;
    }

    .title {
      margin-bottom: 2px;
      font-size: 18px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    .author {
      color: $gray-light;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

  }

  .image-container {
    width: 100%;
  }

  .image-wrapper {
    display: block;
    width: 100%;
    height: 0;
    padding-top: calc( 236 / 473 * 100%);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  input[type=radio] {
    display: none;

    &:checked + label {
      box-shadow: 0 0 1px 3px $skyblue;
    }
  }
</style>
