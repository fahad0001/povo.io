<template>
  <div slot="aside" class="account__aside">
    <div class="title">My Account <router-link v-if="!edit" :to="'/account-edit'" class="underlined-link">EDIT</router-link></div>

    <div class="personal">
      <div v-if="!currentUser.loading" class="personal__avatar" :style="`background-image: url(${ avatar })`"></div>
      <Loader v-else></Loader>
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
        <div class="level__count">Level 0</div>
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
        v-for="activity in activities"
        :key="activity.id">
        <div @click="gotoActivity(activity)" slot="name" class="activity__name" v-if="activity.name">{{activity.name}}</div>
        <div @click="gotoActivity(activity)" slot="name" class="activity__name" v-else>{{activity.key}}</div>
        <div slot="time" class="activity__time">{{getDateRange(activity.updated_at)}}</div>
        <div slot="points" class="activity__points" v-if="activity.points">{{activity.points}}</div>
      </activity-block>

    </div>
  </div>

</template>

<script>
import moment from 'moment'
import ActivityBlock from '@/components/ActivityBlock'
import Loader from '@/components/shared/Loader'

export default {
  name: 'account-aside-desktop',

  components: {
    ActivityBlock,
    Loader
  },

  props: {
    currentUser: Object,
    activities: [Object, Array],
    avatar: String,
    edit: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      joinDate: moment(this.currentUser.created_at).format('MM/DD/YY')
    }
  },

  methods: {
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
    margin-bottom: 23px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .personal {
    display: flex;
    padding-bottom: 20px;
    border-bottom: 1px solid $gray-extra-light;

    .loader {
      width: 70px;
      height: 70px;
      margin-right: 25px;
    }

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
    .activity__name {
      cursor: pointer;
    }
  }

</style>
