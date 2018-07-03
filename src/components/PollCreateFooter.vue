<template>
  <footer class="footer">

    <div class="footer__breadcrumbs">
      <div
        class="bc-el"
        :class="{'active': active === 'create-poll'}"
      >
        Create Poll
      </div>

      <div class="bc-arrow-container">
        <div class="bc-arrow"></div>
      </div>

      <div
        class="bc-el"
        :class="{'active': active === 'preview'}"
      >
        Preview
      </div>

      <div class="bc-arrow-container">
        <div class="bc-arrow"></div>
      </div>

      <div
        class="bc-el"
        :class="{'active': active === 'publish'}"
      >
        Publish
      </div>

    </div>

    <div class="counter" :class="{'invalid': exceedingLimit}">Selected items {{ selectedProducts.length }} / 4</div>

    <div class="footer__nav" v-if="active === 'create-poll'">
      <router-link :to="'/'" class="footer__link hover-link">Cancel</router-link>
      <button
        v-if="invalid"
        class="btn btn_lightblue disabled"
        @click="invalidButtonClick()"
      >Preview</button>
      <router-link v-else :to="'/poll/preview'" class="btn btn_lightblue preview">Preview</router-link>
    </div>

    <div class="footer__nav" v-else-if="active === 'preview'">
      <router-link :to="'/poll/create'" class="footer__link hover-link">Back</router-link>
      <loader v-if="showPublishPollLoader" :sizeInPx="'35px'"></loader>
      <router-link
        v-else
        :to="'/poll/preview'"
        class="btn btn_lightblue publish"
      >
        <span @click="publishPoll">Publish</span>
      </router-link>
    </div>

  </footer>
</template>

<script>
  import Loader from '@/components/shared/Loader'

  import { mapGetters } from 'vuex'

  export default {
    name: 'PollCreateFooter',

    components: {
      Loader
    },

    props: {
      active: '',
      invalid: Boolean
    },

    data () {
      return {
        showPublishPollLoader: false
      }
    },

    computed: {
      ...mapGetters([
        'selectedProducts'
      ]),

      exceedingLimit () {
        return (this.selectedProducts.length > 4 || this.selectedProducts.length < 2)
      }
    },

    methods: {
      publishPoll (event) {
        this.showPublishPollLoader = true
        this.$emit('publish-poll-click', event)
      },

      invalidButtonClick () {
        this.$emit('invalid-button-click')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .footer {
    position: fixed;
    z-index: 8;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 20px;
    background: #fff;
    border-top: 1px solid $gray-lighter;

    @media #{$tablet-screen-sm-min} {
      flex-direction: row;
      padding: 31px 44px;
    }

    &__breadcrumbs {
      padding-left: 40px;
      margin-bottom: 10px;
      position: relative;
      display: flex;

      @media #{$tablet-screen-sm-min} {
        margin-bottom: 0;
      }

      &:before {
        content: '';
        width: 20px;
        height: 100%;
        position: absolute;
        left: 0;
        background-image: url('../assets/img/navIconPolls.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }

      .bc-el {
        margin-right: 8px;
        color: $gray-light;
        font-size: 14px;

        @media #{$tablet-screen-sm-min} {
          margin-right: 20px;
          font-size: 16px;
        }

        &.active {
          color: $gray;
        }
      }

      .bc-arrow-container {
        display: flex;
        align-items: center;
        margin-right: 10px;

        @media #{$tablet-screen-sm-min} {
          margin-right: 26px;
        }
      }

      .bc-arrow {
        width: 8px;
        height: 8px;
        transform: rotate(-45deg);
        border-right: solid 1px #46b4e8;
        border-bottom: solid 1px #46b4e8;
      }
    }

    .counter {
      margin-bottom: 5px;
      font-size: 14px;
      color: $gray;

      &.invalid {
        color: $red;
      }

      @media #{$tablet-screen-sm-min} {
        display: none;
      }
    }

    &__nav {
      display: flex;
      align-items: center;

      @media #{$tablet-screen-sm-min} {
        margin-left: auto;
      }
    }

    &__link {
      display: block;
      margin-right: 27px;
      padding: 10px 0;
      color: $gray;
    }

    .publish {
      padding: 0;
      width: 155px;

      span {
        color: #fff;
        display: block;
        line-height: 37px;
      }
    }
  }
</style>
