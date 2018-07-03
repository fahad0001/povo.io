<template>
  <div class="mp-card__container" @click="followThePoll">

    <div class="mp-card__images" v-if="poll.poll_items.length === 2">
      <div class="mp-card__image-container">
        <div class="mp-card__image" :style="`background-image: url(${poll.poll_items[0].item.image.url})`">
        </div>
      </div>
      <div class="mp-card__image-container">
        <div class="mp-card__image" :style="`background-image: url(${poll.poll_items[1].item.image.url})`">
        </div>
      </div>
    </div>

    <div class="mp-card__images" v-if="poll.poll_items.length === 3">
      <div class="mp-card__image-container">
        <div class="mp-card__image" :style="`background-image: url(${poll.poll_items[0].item.image.url})`">
        </div>
      </div>
      <div class="mp-card__image-container">

        <div class="mp-card__image_half" :style="`background-image: url(${poll.poll_items[1].item.image.url})`">
        </div>

        <div class="mp-card__image_half" :style="`background-image: url(${poll.poll_items[2].item.image.url})`">
        </div>

      </div>
    </div>

    <div class="mp-card__images" v-if="poll.poll_items.length === 4">

      <div class="mp-card__image-container">
        <div class="mp-card__image_half" :style="`background-image: url(${poll.poll_items[0].item.image.url})`">
        </div>
        <div class="mp-card__image_half" :style="`background-image: url(${poll.poll_items[1].item.image.url})`">
        </div>
      </div>

      <div class="mp-card__image-container">
        <div class="mp-card__image_half" :style="`background-image: url(${poll.poll_items[2].item.image.url})`">
        </div>
        <div class="mp-card__image_half" :style="`background-image: url(${poll.poll_items[3].item.image.url})`">
        </div>
      </div>

    </div>

    <div class="mp-card__info">
      <div class="title">{{ poll.title }}</div>
      <div v-if="poll.ended_at" class="subtitle">Ended on {{ endedDate }}</div>
      <div v-else class="subtitle">Created {{ createdDate }}</div>
      <div class="votes-counter">{{ poll.votes_count }}/{{ poll.votes_limit }} Votes</div>

      <div class="my-polls-chart" v-if="poll.votes_count">
        <chartist
          ratio="ct-major-second"
          type="Pie"
          :data="chartData"
          :options="chartOptions" >
        </chartist>
      </div>

    </div>
  </div>
</template>
<script>
  import moment from 'moment'

  import Chartist from 'chartist'
  require('chartist-plugin-legend')

  export default {
    name: 'MyPollCard',

    props: {
      poll: {}
    },

    data () {
      return {
        server_url: process.env.SERVER_URL,
        createdDate: moment(this.poll.created_at).startOf('minute').fromNow(),
        endedDate: moment(this.poll.ended_at).format('MM/D/YY'),
        chartData: {
          labels: [],
          series: [],
          colors: ['#333', '#222', '#111', '#000']
        },
        chartOptions: {
          width: 128,
          height: 128,
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
        }
      }
    },

    mounted () {
      this.chartData.labels = this.poll.poll_items.map((pollItem) => pollItem.item.name)
      this.chartData.series = this.poll.poll_items.map((pollItem) => pollItem.votes_count)
    },

    methods: {
      followThePoll () {
        this.$router.push({name: 'PollResults', params: {pollId: this.poll.id}})
      }
    }
  }
</script>

<style lang="scss">
  .my-polls-chart {
    .ct-major-second {
      @media #{$mobile-screen-xs-min} {
        max-height: 130px;
      }

      @media #{$mobile-screen-lg-min} {
        max-height: 92px;
      }

      .ct-chart-donut {
        position: absolute;
        left: inherit;
        top: 0;
        right: -6px;
        // right: 179px;
        bottom: 0;

        @media #{$mobile-screen-lg-min} {
          right: 80px;
          top: inherit;
        }

        @media #{$desktop-screen-md-min} {
          right: 150px;
        }
      }

      .ct-legend {
        margin-left: 0 !important;
        width: 354px !important;
        max-width: 50%;

        li {
          max-width: 200px;
          padding-left: 24px;
          font-size: 16px;
          line-height: 1.44;
          white-space: normal;

          @media #{$tablet-screen-sm-min} {
            white-space: nowrap;
          }

          @media #{$desktop-screen-md-min} {
            max-width: 354px;
          }

          &:before {
            @media #{$mobile-screen-sm-max} {
              top: 12px;
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
    }
  }
</style>

<style lang="scss" scoped>
  .mp-card {
    &__container {
      width: 100%;
      display: flex;
      flex-direction: row;
      margin-bottom: 20px;
      box-shadow: $base-box-shadow;
      border-radius: $base-border-radius 0 0 $base-border-radius;
      overflow: hidden;
      cursor: pointer;
      transition: $base-animation-duration;

      @media #{$tablet-screen-sm-min} {
        min-height: 215px;
      }

      &:hover {
        box-shadow: $poll-hover-box-shadow;
      }
    }

    &__images {
      background: #fff;
      display: none;
      border-right: 1px solid $gray-lighter;

      @media #{$tablet-screen-sm-min} {
        display: flex;
        width: 215px;
      }
    }

    &__image-container {
      width: 50%;
      height: 100%;
      &:not(:last-child) {

      }
    }

    &__image {
      display: block;
      width: 100%;
      height: 0;
      padding-top: calc( 215 / 107.5 * 100%);
      background-repeat: no-repeat;
      background-position: center;
      background-size: 80%;
      border-right: 1px solid $gray-lighter;
    }

    &__image_half {
      padding-top: calc( 107.5 / 107.5 * 100%);
      background-repeat: no-repeat;
      background-position: center;
      background-size: 80%;
      border-right: 1px solid $gray-lighter;

      &:not(:last-child) {
        border-bottom: 1px solid $gray-lighter;
      }
    }

    &__info {
      position: relative;
      flex: 1;
      padding: 15px;
      background: #faffff;
      max-width: 100%;

      @media #{$tablet-screen-sm-min} {
        padding: 32px 24px 32px 39px;
      }

      .votes-counter {
        color: $gray;
        margin-bottom: 10px;

        @media #{$tablet-screen-sm-min} {
          margin-bottom: 0;
          position: absolute;
          top: 45px;
          right: 24px;
        }
      }

      .title {
        color: $skyblue;
      }

      .subtitle {
        margin-bottom: 5px;
        color: $gray-light;

        @media #{$tablet-screen-sm-min} {
          margin-bottom: 17px;
        }
      }
    }
  }
</style>
