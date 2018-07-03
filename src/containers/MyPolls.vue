<template>
  <section class="my-polls">

    <div class="my-polls__desktop">
      <base-layout :sectionIcon="sectionIcon">

        <div slot="aside" class="my-polls__aside">
          <my-polls-aside
            :polls="currentUser.polls"
          ></my-polls-aside>
        </div>

        <div slot="main" class="my-polls__main">

          <sort-block
            :sortData="sortData"
            @input-use="handleSearchInput"
          ></sort-block>

          <loader v-if="userPollsLoader" :sizeInPx="'100px'"></loader>

          <my-poll-card
            v-if="currentUser.polls"
            v-for="(poll, index) in currentUser.polls"
            :key="index"
            :poll="poll"
          ></my-poll-card>

        </div>

      </base-layout>
    </div>

    <div class="my-polls__mobile">
      <tabs>
        <tab title="Statistic" active="true">
          <my-polls-aside
            :polls="currentUser.polls"
          ></my-polls-aside>
        </tab>

        <tab title="Polls">
          <sort-block :sortData="sortData"></sort-block>

          <loader v-if="userPollsLoader" :sizeInPx="'100px'"></loader>

          <my-poll-card
            v-if="currentUser.polls"
            v-for="(poll, index) in currentUser.polls"
            :key="index"
            :poll="poll"
          ></my-poll-card>
        </tab>
      </tabs>
    </div>

    <home-footer></home-footer>

  </section>
</template>

<script>
  import BaseLayout from '@/layouts/BaseLayout'
  import SearchInput from '@/components/SearchInput'
  import HomeFooter from '@/components/HomeFooter'
  import MyPollCard from '@/components/cards/MyPollCard'
  import ModalWrapper from '@/components/ModalWrapper'
  import ProductQuickViewModal from '@/components/ProductQuickViewModal'
  import SortBlock from '@/components/SortBlock'
  import MyPollsAside from '@/components/MyPollsAside'
  import Loader from '@/components/shared/Loader'
  import Tabs from '@/components/tabs/Tabs'
  import Tab from '@/components/tabs/Tab'

  import { myPollsSortData } from '../data/sortData'

  import { mapGetters } from 'vuex'

  import { debounce } from 'lodash'

  export default {
    name: 'MyPolls',

    components: {
      MyPollsAside,
      BaseLayout,
      SearchInput,
      HomeFooter,
      MyPollCard,
      ModalWrapper,
      ProductQuickViewModal,
      SortBlock,
      Loader,
      Tabs,
      Tab
    },

    data () {
      return {
        sectionIcon: 'poll',
        rewards: false,
        cardIcon: false,
        asideShort: false,
        sortData: myPollsSortData
      }
    },

    computed: {
      ...mapGetters([
        'currentUser',
        'userPollsLoader'
      ])
    },

    created () {
      this.$store.commit('userPollsLoader', true)
      this.$store.dispatch('getCurrentUser')
        .then(res => {
          this.getUserPollsList()
        })
    },

    methods: {
      handleSearchInput: debounce(function (text) {
        this.searchPoll(text)
      }, 1000),
      searchPoll (text) {
        this.$store.dispatch('getUserPollsList', text)
      },
      getUserPollsList () {
        this.$store.dispatch('getUserPollsList')
      }
    }
  }

</script>

<style lang="scss" scoped>
  .my-polls {
    &__desktop {
      @media #{$tablet-screen-lg-max} {
        display: none;
      }
    }

    &__mobile {
      padding: 40px 20px;

      @media #{$tablet-screen-lg-min} {
        display: none;
      }
    }
  }

  .sort {
    &__title {
      margin-right: 17px;
    }

    &__block {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }

    &__select-slim {
      width: 156px;
      margin-right: 20px;
    }

    &__select-wide {
      flex: 1;
    }
  }
</style>
