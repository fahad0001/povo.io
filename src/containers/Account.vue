<template>
  <section v-if="currentUser" class="account">

    <div class="account__desktop">
      <base-layout :sectionIcon="sectionIcon">

        <account-aside-desktop
          slot="aside"
          :currentUser="currentUser"
          :activities="activities"
          :avatar="avatar" />

        <div slot="main" class="account__main">

          <div class="main__header">
            <div class="title">Your Winning Products</div>
            <div class="links">
              <div class="link underlined-link newest" :class="{active: activeTab === 'newest'}" @click="setActiveTab('newest')">Newest</div>
              <div class="link underlined-link saved" :class="{active: activeTab === 'saved'}" @click="setActiveTab('saved')">Saved</div>
            </div>
          </div>
          <template v-if="!pollsLoading">
            <template v-if="currentUser.polls && activeTab === 'newest'">
              <win-product-card v-for="(poll, index) in currentUser.polls"
                                v-if="poll.winner !== null"
                                :key="index"
                                :poll="poll"
                                :product="getWinner(poll)"
                                :loading="saveLoading"
                                @saveForLater="saveProduct(getWinner(poll))"
                                @removeSavedProduct="removeSavedProduct(getWinner(poll))">
                <div slot="update" class="information__update">{{poll.expiration_date}}</div>
                <div slot="title" class="information__title">{{poll.poll_items[0].item.name}}</div>
                <div slot="author" class="information__author">By {{poll.user.name}}</div>
                <div slot="description" class="information__description">
                  {{poll.poll_items[0].item.description}}
                </div>
              </win-product-card>
            </template>

            <template v-if="currentUser.savedProducts && activeTab === 'saved'">
              <saved-product-card v-for="(product, index) in currentUser.savedProducts"
                                :key="index"
                                :item="product"
                                :loading="saveLoading"
                                @removeSavedProduct="removeSavedProduct(product)">
                <div slot="title" class="information__title">{{product.name}}</div>
                <div slot="author" class="information__author">By {{product.author}}</div>
                <div slot="description" class="information__description">
                  {{product.description}}
                </div>
              </saved-product-card>
            </template>
          </template>
          <loader v-else></loader>
        </div>

      </base-layout>
    </div>

    <div class="account__mobile">
      <tabs>
        <tab title="My Account" active="true">
          <div class="account__aside">
            <div class="title">My Account <router-link :to="'/account-edit'" class="underlined-link">EDIT</router-link></div>

            <div class="personal">
              <div class="personal__avatar" :style="`background-image: url(${ avatar })`"></div>

              <div class="personal__name_and_join">
                <div class="personal__name">
                  {{ currentUser.name }}
                </div>
                <div class="personal__join">
                  Joined: {{ joinDate }}
                </div>
              </div>
            </div>

            <div class="level">

              <div class="level__row">
                <div class="level__count">Level 8</div>
                <router-link :to="'/my_polls'" class="greater-gray hover-link">My Polls</router-link>
              </div>

              <div class="level__row">
                <div class="greater-gray">{{ currentUser.points }} Points</div>
                <router-link :to="'/rewards/cart'" class="greater-gray hover-link">Redeem History</router-link>
              </div>

            </div>

            <div class="activity">
              <div class="title">Activity</div>

              <activity-block
                v-if="currentUser && currentUser.activities"
                v-for="activity in currentUser.activities"
                :key="activity.id">
                <div @click="gotoActivity(activity)" slot="name" class="activity__name" v-if="activity.name">{{activity.name}}</div>
                <div @click="gotoActivity(activity)" slot="name" class="activity__name" v-else>{{activity.key}}</div>
                <div slot="time" class="activity__time">{{getDateRange(activity.updated_at)}}</div>
                <div slot="points" class="activity__points" v-if="activity.points">{{activity.points}}</div>
              </activity-block>

            </div>
          </div>
        </tab>

        <tab title="Your Winning Products">
          <div class="account__main">

            <div class="main__header">
              <div class="title">Your Winning Products</div>
              <div class="links">
                <div class="link underlined-link newest" :class="{active: activeTab === 'newest'}" @click="setActiveTab('newest')">Newest</div>
                <div class="link underlined-link saved" :class="{active: activeTab === 'saved'}" @click="setActiveTab('saved')">Saved</div>
              </div>
            </div>
            <template v-if="!pollsLoading">
              <template v-if="currentUser.polls && activeTab === 'newest'">
                <win-product-card v-for="(poll, index) in currentUser.polls"
                                  v-if="poll.winner !== null"
                                  :key="index"
                                  :poll="poll"
                                  :product="getWinner(poll)"
                                  :loading="saveLoading"
                                  @saveForLater="saveProduct(getWinner(poll))"
                                  @removeSavedProduct="removeSavedProduct(getWinner(poll))">
                  <div slot="update" class="information__update">{{poll.expiration_date}}</div>
                  <div slot="title" class="information__title">{{poll.poll_items[0].item.name}}</div>
                  <div slot="author" class="information__author">By {{poll.user.name}}</div>
                  <div slot="description" class="information__description">
                    {{poll.poll_items[0].item.description}}
                  </div>
                </win-product-card>
              </template>

              <template v-if="currentUser.savedProducts && activeTab === 'saved'">
                <saved-product-card v-for="(product, index) in currentUser.savedProducts"
                                    :key="index"
                                    :item="product"
                                    :loading="saveLoading"
                                    @removeSavedProduct="removeSavedProduct(product)">
                  <div slot="title" class="information__title">{{product.name}}</div>
                  <div slot="author" class="information__author">By {{product.author}}</div>
                  <div slot="description" class="information__description">
                    {{product.description}}
                  </div>
                </saved-product-card>
              </template>
            </template>
            <loader v-else></loader>
          </div>
        </tab>
      </tabs>
    </div>

    <home-footer></home-footer>

  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import moment from 'moment'
  import _ from 'lodash'
  // components
  import BaseLayout from '@/layouts/BaseLayout'
  import HomeFooter from '@/components/HomeFooter'
  import ActivityBlock from '@/components/ActivityBlock'
  import WinProductCard from '@/components/cards/WinProductCard'
  import SavedProductCard from '@/components/cards/SavedProductCard'
  import Tabs from '@/components/tabs/Tabs'
  import Tab from '@/components/tabs/Tab'
  import ProductCard from '@/components/cards/ProductCard'
  import Loader from '@/components/shared/Loader'

  import AccountAsideDesktop from '@/components/AccountAside/AccountAsideDesktop'

  export default {
    name: 'Account',

    components: {
      BaseLayout,
      HomeFooter,
      ActivityBlock,
      WinProductCard,
      Tabs,
      Tab,
      AccountAsideDesktop,
      ProductCard,
      SavedProductCard,
      Loader
    },

    data () {
      const currentUser = this.currentUser || {}
      return {
        sectionIcon: 'account',
        avatar: currentUser.avatar || require('../assets/img/no-avatar.jpg'),
        joinDate: moment(currentUser.created_at).format('MM/DD/YY'),
        activeTab: 'newest',
        saveLoading: false,
        pollsLoading: false
      }
    },

    watch: {
      currentUser: function () {
        this.$set(this, 'avatar', this.currentUser.avatar)
        this.$set(this, 'joinDate', moment(this.currentUser.created_at).format('MM/DD/YY'))
      }
    },

    computed: {
      ...mapGetters([
        'currentUser'
      ]),

      activities () {
        return this.currentUser ? _.orderBy(this.currentUser.activities, ['updated_at'], ['desc']) || [] : []
      }
    },

    mounted () {
      this.$store.dispatch('getCurrentUser')
        .then(res => {
          this.$set(this, 'avatar', this.currentUser.avatar)
          this.getUserPollsList()
        })
    },

    methods: {
      saveProduct (product) {
        this.saveLoading = true
        Promise.all([
          this.$store.dispatch('saveProduct', product.item),
          this.$store.dispatch('getUserPollsList')
        ])
          .then(res => {
            this.saveLoading = false
          })
      },

      removeSavedProduct (product) {
        this.saveLoading = true
        let item = product.item ? product.item : product
        Promise.all([
          this.$store.dispatch('removeSavedProduct', item),
          this.$store.dispatch('getUserPollsList')
        ])
          .then(res => {
            this.saveLoading = false
          })
      },

      setActiveTab (tab) {
        this.activeTab = tab
      },

      getUserPollsList () {
        this.pollsLoading = true
        Promise.all([
          this.$store.dispatch('getUserPollsList'),
          this.$store.dispatch('getUserSavedProductsList')
        ])
          .then(() => {
            this.pollsLoading = false
          })
      },

      getWinner (poll) {
        console.log(poll)
        let winnerId = poll.winner ? poll.winner.id : undefined
        let item
        if (winnerId) {
          item = poll.poll_items.find((pollItem) => pollItem.id === winnerId)
        } else {
          item = undefined
        }
        return item
      },

      gotoActivity (activity) {
        const type = activity.trackable_type
        switch (type) {
          case 'Poll':
            this.$router.push({name: 'polls', params: {pollId: activity.trackable.id}})
            break
          case 'Comment':
            this.$router.push({name: 'polls', params: {pollId: activity.trackable.commentable_id}})
            break
          default:
            break
        }
      },

      getDateRange (date) {
        return moment(date).fromNow()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    font-size: 20px;
  }

  .account {

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

    &__aside {
      .title {
        margin-bottom: 23px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  .main {
    &__header {
      display: flex;
      flex-direction: column;
      margin-bottom: 35px;

      @media #{$mobile-screen-sm-min} {
        flex-direction: row;
        padding: 25px 10px;
      }

      @media #{$desktop-screen-sm-min} {
        padding: 27px 45px;
      }

      .title {
        margin-right: auto;
        margin-bottom: 15px;

        @media #{$desktop-screen-xs-min} {
          margin-bottom: 0;
        }

        @media #{$desktop-screen-sm-min} {
          margin-right: 187px;
        }
      }

      .links {
        display: flex;
      }

      .link {
        margin-left: 28px;

        &:not(:last-child) {
          margin-right: 25px;

          @media #{$desktop-screen-sm-min} {
            margin-right: 57px;
          }
        }
      }

      .newest:before,
      .saved:before {
        content: '';
        position: absolute;
        left: -28px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }

      .newest:before {
        width: 18px;
        height: 18px;
        top: 2px;
        background-image: url('../assets/img/recentSymbol.svg');
      }

      .saved:before {
        width: 20px;
        height: 20px;
        top: -1px;
        background-image: url('../assets/img/starIcon.svg');
      }
    }
  }
</style>
