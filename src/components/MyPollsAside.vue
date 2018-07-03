<template>
  <div>

    <div class="title">My Polls</div>

    <div v-if="pollsCount" class="balance">
      <div class="block">
        <div class="block__header">
          <div class="block__title">Total Polls Created</div>

          <div class="block__title">{{ pollsCount }}</div>
        </div>
      </div>
    </div>

    <div v-if="pollsCount" class="statistic">

      <div class="block">
        <div class="block__header block__header_margined">
          <div class="block__title">Created Recently</div>
          <div class="greater-gray">Responses</div>
        </div>

        <ul class="block__list">
          <li class="block__item"
              v-for="(poll, index) in newestPolls"
              :key="index"
              v-if="index < 5"
          >
            <div>{{ poll.title }}</div>
            <div>{{ poll.votes_count }}</div>
          </li>
        </ul>

      </div>

      <div class="block">
        <div class="block__header block__header_margined">
          <div class="block__title">Most Popular</div>
          <div class="greater-gray">Responses</div>
        </div>

        <ul class="block__list">
          <li class="block__item"
              v-for="(poll, index) in popularPolls"
              :key="index"
              v-if="index < 5 && poll.votes_count > 0"
          >
            <div>{{ poll.title }}</div>
            <div>{{ poll.votes_count }}</div>
          </li>
        </ul>

      </div>
    </div>

  </div>
</template>
<script>
  import _ from 'lodash'

  export default {
    name: 'MyPollsAside',

    props: {
      polls: Array
    },

    computed: {
      pollsCount () {
        if (this.polls) {
          return this.polls.length
        }
      },

      popularPolls () {
        return _.orderBy(this.polls, ['votes_count'], ['desc'])
      },

      newestPolls () {
        return _.orderBy(this.polls, ['created_at'], ['desc'])
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

  .points {
    background-image: url('../assets/img/points.svg');
  }

  .bag {
    background-image: url('../assets/img/bag.svg');
  }

  .block {
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

    &__title-with-icon {
      padding-left: 39px;
      background-position: left;
      background-repeat: no-repeat;
      background-size: contain;
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
