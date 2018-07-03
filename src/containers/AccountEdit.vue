<template>
  <section v-if="currentUser" class="account">

    <base-layout :sectionIcon="sectionIcon">

      <account-aside-desktop
        slot="aside"
        :currentUser="currentUser"
        :activities="activities"
        :avatar="avatar"
        :edit="true"/>

        <div class="level">

          <div class="level__count">
            Level 8
          </div>

          <div class="level__row">
            <div class="greater-gray">9203 Points</div>
            <a href="#" class="greater-gray hover-link">Redeem History</a>
          </div>

        </div>

        <div class="activity">
          <div class="title">Activity</div>

          <activity-block>
            <div slot="name" class="activity__name">Poll ended</div>
            <div slot="time" class="activity__time">5 mons ago</div>
            <div slot="points" class="activity__points"></div>
          </activity-block>

          <activity-block>
            <div slot="name" class="activity__name">Voted on a poll and commented</div>
            <div slot="time" class="activity__time">21 mins ago</div>
            <div slot="points" class="activity__points">+10</div>
          </activity-block>

          <activity-block>
            <div slot="name" class="activity__name">Voted on a poll</div>
            <div slot="time" class="activity__time">54 mins ago</div>
            <div slot="points" class="activity__points">+5</div>
          </activity-block>

        </div>
      </div>

      <div slot="main" class="account__main">

        <div class="account__container">
          <div class="title">Edit your account</div>
          <account-edit-form :loading="currentUser.loading" :currentUser="currentUser" v-on:submit-form="submit($event)"></account-edit-form>

        </div>

      </div>

    </base-layout>

    <home-footer></home-footer>

  </section>
</template>

<script>
  import notificationService from '@/services/notification.service'
  import { mapGetters, mapState } from 'vuex'
  import moment from 'moment'
  import _ from 'lodash'
  // components
  import BaseLayout from '@/layouts/BaseLayout'
  import HomeFooter from '@/components/HomeFooter'
  import ActivityBlock from '@/components/ActivityBlock'
  import WinProductCard from '@/components/cards/WinProductCard'
  import AccountEditForm from '@/forms/AccountEditForm'
  import AccountAsideDesktop from '@/components/AccountAside/AccountAsideDesktop'

  export default {
    name: 'AccountEdit',

    data () {
      const currentUser = this.currentUser || {}
      return {
        notificationService: notificationService,
        sectionIcon: 'account',
        avatar: currentUser.avatar || require('../assets/img/no-avatar.jpg'),
        joinDate: moment(currentUser.created_at).format('MM/DD/YY')
      }
    },

    watch: {
      currentUser: function (updatedUser) {
        this.$set(this, 'avatar', updatedUser.avatar || require('../assets/img/no-avatar.jpg'))
        this.$set(this, 'joinDate', moment(updatedUser.created_at).format('MM/DD/YY'))
      }
    },
    components: {
      BaseLayout,
      HomeFooter,
      ActivityBlock,
      WinProductCard,
      AccountEditForm,
      AccountAsideDesktop
    },
    computed: {
      ...mapState({
        user: state => state.user
      }),
      ...mapGetters([
        'currentUser'
      ]),

      activities () {
        return this.currentUser ? _.orderBy(this.currentUser.activities, ['updated_at'], ['desc']) || [] : []
      }
    },
    methods: {
      submit (payload) {
        this.$store.dispatch('updateUser', payload)
          .then(res => {
            this.notificationService.showSuccess('Updated')
          })
      }
    },
    mounted () {
      this.$store.dispatch('getCurrentUser')
        .then(res => {
          this.$set(this, 'avatar', this.currentUser.avatar)
        })
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    font-size: 20px;
  }

  .account {
    &__aside {
      .title {
        margin-bottom: 23px;
      }
    }

    &__container {
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
      background: #fff;
      box-shadow: $base-box-shadow;

      @media #{$tablet-screen-lg-min} {
        padding: 39px 50px 46px;
        // margin: 0;
      }

      .title {
        margin-bottom: 35px;
      }
    }
  }

  .personal {
    display: flex;
    padding-bottom: 20px;
    border-bottom: 1px solid $gray-extra-light;

    &__avatar {
      width: 70px;
      height: 70px;
      margin-right: 25px;
      border-radius: 50%;
      background: $gray;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }

    &__name_and_join {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__name {
      margin-bottom: 1px;
      font-weight: 600;
    }
  }

  .level {
    padding: 21px 0 19px;
    border-bottom: 1px solid $gray-extra-light;

    &__count {
      margin-bottom: 9px;
      font-size: 18px;
      font-weight: 600;
      line-height: 1.11;
      color: $gray;
    }

    &__row {
      display: flex;
      justify-content: space-between;
    }
  }

  .activity {
    margin-top: 20px;

    .title {
      margin-bottom: 7px;
    }
  }

  .main {
    &__header {
      display: flex;
      margin-bottom: 35px;

      .title {
        margin-right: 187px;
      }

      .link {
        margin-left: 28px;
        position: relative;
        cursor: pointer;

        &:after {
          content: '';
          position: absolute;
          bottom: 2px;
          width: 0;
          left: 50%;
          transform: translateX(-50%);
          border-bottom: 1px solid $skyblue;
          transition: $base-animation-duration;
        }

        &:hover:after {
          width: calc(100% - 9px);
        }

        &.active:after {
          width: calc(100% - 9px);
        }

        &:not(:last-child) {
          margin-right: 57px;
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
