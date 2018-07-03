<template>
  <section class="home">
    <div class="container">

      <div class="home__menu">

        <div class="links" v-if="!(Object.keys(actualPolls).length == 0 && !showMainLoader)">
          <div class="link underlined-link" :class="{ 'active': isNewest }" @click="changeOrder('newest')">Newest</div>
          <div class="link underlined-link" :class="{ 'active': isPopular }" @click="changeOrder('popular')">Popular</div>
          <div class="link underlined-link" :class="{ 'active': isEndingSoon }" @click="changeOrder('endingSoon')">Ending Soon</div>
        </div>

        <select class="select" v-if="!(Object.keys(actualPolls).length == 0 && !showMainLoader)">
          <option value="all">View all polls</option>
        </select>

      </div>
      <loader v-if="isCurrentPollsBlank && showMainLoader" :sizeInPx="'120px'"></loader>

      <div v-if="!isCurrentPollsBlank && !showMainLoader" class="flex-row">
        <home-card
          v-for="(poll, index) in currentPolls"
          v-if="+index === 0"
          :key="index"
          :poll="poll"
          :isCardBig="+index === 0"
        ></home-card>

        <div class="row-container">
          <div class="flex-row">
            <home-card
              v-for="(poll, index) in currentPolls"
              v-if="+index > 0 && +index < 3"
              :poll="poll"
              :key="index"
              :isCardBig="false"
            ></home-card>
          </div>

          <div class="flex-row">
            <home-card
              v-for="(poll, index) in currentPolls"
              v-if="+index > 2 && +index < 5"
              :poll="poll"
              :key="index"
              :isCardBig="false"
            ></home-card>
          </div>
        </div>

      </div>

      <div v-if="!isCurrentPollsBlank" class="flex-row">
        <home-card
          v-for="(poll, index) in currentPolls"
          v-if="+index > 4"
          :poll="poll"
          :key="index"
          :isCardBig="false"
        ></home-card>
      </div>


      <div  v-if="!loggedIn && Object.keys(actualPolls).length == 0 && !showMainLoader" class="nothing-block">
        <h2>Nothing found!</h2>
        <router-link :to="'poll/create'" class="btn btn_gray">Create Poll</router-link>
      </div>

      <div  v-if="loggedIn && Object.keys(actualPolls).length == 0 && !showMainLoader"  class="nothing-block card">
        <h2>You've already voted for all polls.</h2>
      </div>

      <div class="home__btn-container">
        <div class="btn btn_gray" @click='loadMorePolls' v-if="Object.keys(actualPolls).length !== 0 && showLoadMore">Load more</div>
        <loader v-if="showBtnLoader" :sizeInPx="'40px'"></loader>
      </div>

    </div>

    <home-footer></home-footer>

    <modal-wrapper v-if="false">
      <poll-winner-modal></poll-winner-modal>
    </modal-wrapper>

  </section>
</template>

<script>
  import HomeCard from '@/components/cards/HomeCard'
  import HomeFooter from '@/components/HomeFooter'
  import Loader from '@/components/shared/Loader'

  import { mapGetters } from 'vuex'

  export default {
    name: 'Home',

    components: {
      HomeCard,
      HomeFooter,
      Loader
    },

    data () {
      return {
        currentPage: 0,
        showLoadMore: true,
        showBtnLoader: false,
        isNewest: true,
        isPopular: false,
        isEndingSoon: false,
        currentOrder: 'newest',
        showMainLoader: false
      }
    },

    computed: {
      ...mapGetters([
        'loggedIn',
        'polls',
        'popularPolls',
        'endingSoonPolls',
        'actualPolls'
      ]),

      currentPolls () {
        if (this.isPopular) {
          return this.popularPolls
        } else if (this.isEndingSoon) {
          return this.endingSoonPolls
        } else {
          return (this.loggedIn ? this.actualPolls : this.polls)
        }
      },

      isCurrentPollsBlank () {
        return this.currentPolls.length === 0
      }
    },

    methods: {
      setActiveTabByOrderType (order) {
        this.dropActiveTab()
        this.$set(this, 'currentPage', 1)
        switch (order) {
          case 'newest': this.isNewest = true; break
          case 'popular': this.isPopular = true; break
          case 'endingSoon': this.isEndingSoon = true; break
          default: this.isNewest = true; break
        }
      },

      dropActiveTab () {
        this.isNewest = false
        this.isPopular = false
        this.isEndingSoon = false
      },

      changeOrder (order) {
        this.setActiveTabByOrderType(order)
        this.$set(this, 'currentOrder', order)
        if (this.loggedIn && this.currentOrder === 'newest') {
          this.$set(this, 'currentOrder', 'actual')
        }
        const data = { type: this.currentOrder, page: 1 }
        this.showMainLoader = true
        this.$store.commit('deletePollsList')
        this.$store.dispatch('getPollsListByOrder', data)
          .then(() => {
            this.showMainLoader = false
          })
      },

      loadMorePolls () {
        this.$set(this, 'currentPage', this.currentPage + 1)
        console.log('loadMorePolls this.currentPage: ', this.currentPage)
        if (this.loggedIn && this.currentOrder === 'newest') {
          this.$set(this, 'currentOrder', 'actual')
        }
        const data = { type: this.currentOrder, page: this.currentPage }

        this.showBtnLoader = true
        this.showLoadMore = false

        this.$store.dispatch('getPollsListByOrder', data)
          .then(res => {
            this.showMainLoader = false
            this.showLoadMore = true
            this.showBtnLoader = false
          })
      }

    },

    created () {
      this.showMainLoader = true
      this.$store.commit('deletePollsList')
      this.loadMorePolls()
      this.$store.commit('deleteCreatingPoll')
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.32);
    border-radius: 4px;
    overflow: hidden;
    padding: 20px;
    background-color: #fff;
    align-self: center;
  }
  .nothing-block {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-direction: column;

    h2 {
      display: block;
      margin-bottom: 15px;
    }
  }

  .home {
    .card {
      min-height: 246px;
      max-height: 246px;
      height: 246px;

      &.home-card_big {
        min-height: 512px;
        max-height: 512px;
        height: 512px;
      }
    }

    .flex-row {
      @media #{$tablet-screen-sm-max} {
        flex-direction: column;

        .row-container,
        .flex-row {
          .card {
            width: 100%;
            min-height: auto;
            max-height: initial;
            height: auto;
          }
          width: 100%;
        }

        .card {
          width: 100%;
          min-height: auto;
          max-height: initial;
          height: auto;
        }

      }
      .card {
        &:last-child,
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }

    .row-container {
      display: flex;
      flex-direction: column;
      width: calc(50% - 10px);

      .card {
        width: calc((100% - 20px) / 2);
      }
    }

    &__menu {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 3px;
      padding: 12px 0;

      @media #{$tablet-screen-lg-min} {
        flex-direction: row;
        align-items: center;
      }

      .select {
        width: 187px;
        margin-bottom: 10px;

        @media #{$tablet-screen-lg-min} {
          margin-bottom: 0;
        }
      }

      .links {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        @media #{$tablet-screen-lg-min} {
          margin-bottom: 0;
          margin-right: auto;
        }
      }

      .link {
        &:not(:last-child) {
          margin-right: 35px;
        }
      }
    }

    &__btn-container {
      display: flex;
      justify-content: center;
      margin: 46px 0;
    }
  }


</style>
