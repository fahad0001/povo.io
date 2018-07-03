<template>
  <section class="poll-results">

    <base-layout :sectionIcon="sectionIcon">

      <div slot="aside" class="aside">

        <div class="aside__header">
          <div class="title">{{ poll.title }}</div>
          <div class="date">Created on {{ createdDate }}</div>
        </div>

        <div v-if="poll.winner" class="aside__block">
          <div class="block__header">
            <div class="greater-gray">Winning Product</div>
          </div>
          <div class="card block__card">
            <poll-results-winner
              :product='winningProduct'
              v-on:save="saveWinningProduct">
            </poll-results-winner>
          </div>
        </div>

        <div v-else class="aside__block">
          <div class="block__header">
            <div class="greater-gray">Current Standing</div>
            <div class="greater-gray">{{ poll.votes_count }}/{{ poll.votes_limit }} Votes</div>
          </div>
          <div class="card block__card chart__container">

            <chartist
              ratio="ct-major-second"
              type="Pie"
              :data="chartData"
              :options="chartOptions" >
            </chartist>

            <!-- <div class="selected-item-votes">100%</div>-->

          </div>
        </div>

        <div class="results-cards">
          <div class="greater-gray results-cards__title">Poll Results</div>

          <poll-results-card
            v-for="(item, index) in popularProducts"
            :key="index"
            :product="item"
          ></poll-results-card>

        </div>

      </div>

      <div slot="main" class="main">
        <div class="comments">
          <div class="title comments__title">Additional Comments ({{commentCounter}})</div>

          <loader v-if="userPollsLoader" :sizeInPx="'100px'"></loader>

          <div class="comments__container">
            <comment-card
              v-for="(comment, index) in pollComments"
              :comment="comment"
              :key="index"
              v-on:like="addLikeToComment"
              v-on:unlike="removeLikeFromComment"
            ></comment-card>
          </div>

        </div>
      </div>

    </base-layout>

    <home-footer></home-footer>

  </section>
</template>

<script>
  import BaseLayout from '@/layouts/BaseLayout'
  import HomeFooter from '@/components/HomeFooter'
  import PollResultsWinner from '@/components/cards/PollResultsWinner'
  import PollResultsCard from '@/components/cards/PollResultsCard'
  import CommentCard from '@/components/cards/CommentCard'
  import Loader from '@/components/shared/Loader'

  import Chartist from 'chartist'
  require('chartist-plugin-legend')

  import notificationService from '../services/notification.service'

  import { mapGetters } from 'vuex'
  import moment from 'moment'
  import _ from 'lodash'

  export default {
    name: 'PollResults',

    components: {
      BaseLayout,
      HomeFooter,
      PollResultsWinner,
      PollResultsCard,
      CommentCard,
      Loader
    },

    data () {
      return {
        sectionIcon: 'poll',
        chartData: {
          labels: [],
          series: [],
          colors: ['#333', '#222', '#111', '#000']
        },
        chartOptions: {
          width: 150,
          height: 150,
          donut: true,
          donutWidth: 28,
          donutSolid: true,
          startAngle: 270,
          showLabel: false,
          selectedItemVotes: '',
          plugins: [
            Chartist.plugins.legend({
              className: 'chart-legends'
            })
          ]
        },
        poll: {}
      }
    },

    computed: {
      ...mapGetters([
        'loggedIn',
        'currentUser',
        'polls',
        'userPollsLoader'
      ]),

      winningProduct () {
        return this.poll ? this.popularProducts.find(product => product.id === this.poll.winner.id) : {}
      },

      showLoader () {
        return !this.poll.poll_items
      },

      createdDate () {
        return moment(this.poll.created_at).format('MM/D/YY')
      },
      pollComments () {
        return this.poll.comments
      },
      commentCounter () {
        if (this.poll.comments) {
          return this.poll.comments.length
        }
      },

      popularProducts () {
        return _.orderBy(this.poll.poll_items, ['votes_count'], ['desc'])
      }
    },

    created () {
      this.$store.commit('userPollsLoader', true)
      this.$store.dispatch('getCurrentUser').then(() => {
        this.getPollById()
      })
    },

    watch: {
      polls: function (newPolls) {
        let pollId = +this.$route.params.pollId
        this.poll = newPolls.filter((poll) => poll.id === pollId)[0]
        if (this.poll.votes_count) {
          this.chartData.labels = this.poll.poll_items.map((pollItem) => pollItem.item.name)
          this.chartData.series = this.poll.poll_items.map((pollItem) => pollItem.votes_count)
        } else {
          this.chartData.labels = ['No voices yet']
          this.chartData.series = [1]
        }
      }
    },

    methods: {
      saveWinningProduct (product) {
        console.log(product)
      },
      addLikeToComment (comment) {
        this.$store.dispatch('addLikeToComment', comment).then((res) => {
          const errors = res.data.errors
          if (!errors) {
            this.$set(this, 'poll', res.data)
          } else {
            errors.poll.map((err) => {
              notificationService.showError(err)
            })
          }
        })
      },
      removeLikeFromComment (comment) {
        this.$store.dispatch('removeLikeFromComment', comment).then((res) => {
          const errors = res.data.errors
          if (!errors) {
            this.$set(this, 'poll', res.data)
          } else {
            errors.poll.map((err) => {
              notificationService.showError(err)
            })
          }
        })
      },
      getPollById () {
        let pollId = this.$route.params.pollId
        this.$store.dispatch('getPollById', pollId)
          .then(res => {
            const pollUser = this.poll.user
            if (pollUser.id !== this.currentUser.id) {
              notificationService.showError('You can`t view the results of this poll.')
              this.$router.replace({ name: 'polls', params: { pollId: pollId } })
            }
            this.$store.commit('userPollsLoader', false)
            if (this.poll.user.uid === this.currentUser.uid) {}
          })
      }
    }
  }
</script>

<style lang="scss">

  .poll-results {
    .ct-major-second {
      max-height: 100%;
      align-items: center;

      .ct-chart-donut {
        position: static;
        order: 0;
      }

      .ct-legend {
        max-width: 110px;
        margin-left: 170px;
        order: 1;

        li {
          margin-bottom: 20px;
          padding-left: 19px;
          font-size: 10px;
          font-weight: 600;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }

  @for $i from 0 to length($ct-series-colors) {
    .ct-series-#{$i}:before {
      background-color: nth($ct-series-colors, $i + 1);
      border-color: nth($ct-series-colors, $i + 1);
    }
  }

</style>
<style lang="scss" scoped>

  .aside {
    &__header {
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid $gray-extra-light;

      .date {
        color: $gray-light;
      }
    }

    &__block {
      margin-bottom: 20px;
    }

    .results-cards {
      &__title {
        margin-bottom: 20px;
      }
    }
  }

  .block {
    &__header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    &__card {
      position: relative;
      height: 236px;
      background: #fff;

      .selected-item-votes {
        position: absolute;
        left: 27px;
        top: 0;
        bottom: 0;
        width: 142px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .chart {
    &__container {
      padding: 10px;

      @media #{$mobile-screen-sm-min} {
        padding: 23px;
      }
    }
  }

  .comments {
    &__title {
      margin-bottom: 20px;
    }

    &__container {
      @media #{$tablet-screen-sm-min} {
        margin-right: -20px;
        column-gap: 0;
        column-count: 2;
      }
    }
  }
</style>
