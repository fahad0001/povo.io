<template>
  <div>

    <div class="title">Rewards</div>

    <div class="balance">

      <div class="block" >
        <div class="block__header" v-if='currentUser'>
          <div class="block__title block__title-with-icon points">Points Balance</div>
          <div class="block__title">{{ currentUser.points }}</div>
        </div>
      </div>

      <router-link :to="'/rewards/cart'" class="block hover-link">
        <div class="block__header">
          <div class="block__title block__title-with-icon bag">Bag</div>
          <div class="block__title" v-if="goods">{{orderGoods.length}} item(s)</div>
        </div>
      </router-link>

    </div>

    <div v-if="!shortAside" class="statistic">

      <div class="block">
        <div class="block__header block__header_margined">
          <div class="block__title">Top Picks</div>
          <div class="greater-gray">Points</div>
        </div>
        <ul class="block__list">
          <li class="block__item" v-for="item in topPicks">
            <div>{{item.name}}</div>
            <div>{{+(item.price)}}</div>
          </li>
        </ul>
      </div>

      <div class="block">
        <div class="block__header block__header_margined">
          <div class="block__title">Staff Picks</div>
          <div class="greater-gray">Points</div>
        </div>
        <ul class="block__list">
          <li class="block__item" v-for="item in staffPicks">
            <div>{{item.name}}</div>
            <div>{{+(item.price)}}</div>
          </li>
        </ul>
      </div>

      <div class="block">
        <div class="block__header block__header_margined">
          <div class="block__title">Redeem History</div>
          <div class="greater-gray">Date</div>
        </div>
        <ul class="block__list">
          <li class="block__item" v-for="item in historyItems">
            <div>{{item.name}}</div>
            <div>{{+(item.price)}}</div>
          </li>
        </ul>
      </div>

    </div>

  </div>
</template>
<script>
import _ from 'lodash'

export default {
  name: 'AsideInformation',

  props: {
    shortAside: false,
    currentUser: { required: false },
    orderGoods: { required: false },
    orders: { required: false },
    goods: { required: false }
  },

  computed: {
    totalPoints () {
      return this.orderGoods ? this.orderGoods.reduce((prevVal, elem) => prevVal + (elem.points ? elem.points : 0), 0) : 0
    },

    ordersGoods () {
      const goods = []

      this.orders ? _.orderBy(this.orders, ['created_at'], ['desc']).map((order) => {
        _.orderBy(order.goods, ['created_at'], ['desc']).map((good) => {
          goods.push(good)
        })
      }) : []

      return _.uniqBy(goods, 'id')
    },

    topPicks () {
      return _.orderBy(this.ordersGoods, ['price'], ['asc']).slice(0, 5)
    },

    staffPicks () {
      return this.goods ? this.goods.filter((good) => good.staff_pick === true) : []
    },

    historyItems () {
      return this.ordersGoods.slice(0, 10)
    }
  }
}
</script>
<style lang="scss" scoped>
  .title {
    margin-bottom: 19px;
    font-size: 20px;
  }

  .balance {
    border-bottom: 1px solid $gray-extra-light;
  }

  .block {
    display: block;
    width: 100%;
    padding: 21px 0;
    border-top: 1px solid $gray-extra-light;

    &__header {
      display: flex;
      justify-content: space-between;

      &_margined {
        margin-bottom: 20px;
      }
    }

    &__title {
      font-size: 18px;
      font-weight: 600;
      line-height: 1.11;
      color: $gray;
    }

    .points,
    .bag {
      padding-left: 39px;
      background-position: left;
      background-repeat: no-repeat;
      background-size: contain;
    }

    .points {
      background-image: url('../assets/img/points.svg');
    }

    .bag {
      background-image: url('../assets/img/bag.svg');
    }

    &__item {
      display: flex;
      justify-content: space-between;

      div {
        font-size: 18px;
        line-height: 1.44;
        color: gray;
      }
    }
  }

  .statistic {
    .block:first-child {
      border-top: none;
    }
  }
</style>
