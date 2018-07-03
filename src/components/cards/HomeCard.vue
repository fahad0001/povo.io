<template>
  <div
    v-if="poll.poll_items"
    class="card poll-card"
    :class="{'home-card_big': isCardBig, 'home-card_small': !isCardBig}"
    @click="followThePoll"
  >

    <div v-if="poll.poll_items.length === 2" class="poll-card__images">
      <div class="image-container">
        <div class="image" :style="`background-image: url(${poll.poll_items[0].item.image.url})`">
        </div>
      </div>
      <div class="image-container">
        <div class="image" :style="`background-image: url(${poll.poll_items[1].item.image.url})`">
        </div>
      </div>
    </div>

    <div v-if="poll.poll_items.length === 3" class="poll-card__images">
      <div class="image-container">
        <div class="image" :style="`background-image: url(${poll.poll_items[0].item.image.url})`">
        </div>
      </div>
      <div class="image-container">

        <div class="image_half" :style="`background-image: url(${poll.poll_items[1].item.image.url})`">
        </div>

        <div class="image_half" :style="`background-image: url(${poll.poll_items[2].item.image.url})`">
        </div>

      </div>
    </div>

    <div v-if="poll.poll_items.length === 4" class="poll-card__images">
      <div class="image-container">
        <div class="image_half" :style="`background-image: url(${poll.poll_items[0].item.image.url})`">
        </div>
        <div class="image_half" :style="`background-image: url(${poll.poll_items[1].item.image.url})`">
        </div>
      </div>

      <div class="image-container">
        <div class="image_half" :style="`background-image: url(${poll.poll_items[2].item.image.url})`">
        </div>
        <div class="image_half" :style="`background-image: url(${poll.poll_items[3].item.image.url})`">
        </div>
      </div>
    </div>

    <div class="poll-card__info">
      <div :title="poll.title" class="poll-card__title">
        {{ poll.title }}
      </div>
      <div class="col-wrapper">
        <div class="content">

          <div :title="poll.description" v-if="isCardBig" class="poll-card__description description-content">
            {{ longDescriptionText }}
          </div>

          <div :title="poll.description" v-else class="poll-card__description description-content">
            {{ descriptionText }}
          </div>

          <div class="poll-card__footer">
            <span class="author">{{ poll.user.name }}</span> • <span class="date">{{ createdDate }}</span>
          </div>
        </div>

        <div class="actions" v-if="isCardBig">
          <button
            class="btn btn_lightblue"
          >Vote</button>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import moment from 'moment'
  import { mapGetters } from 'vuex'

  export default {
    name: 'HomeCard',

    data () {
      return {
        server_url: process.env.SERVER_URL,
        createdDate: moment(this.poll.created_at).format('MMM D, YYYY')
      }
    },

    props: {
      poll: {},
      isCardBig: false
    },

    computed: {
      ...mapGetters([
        'currentUser',
        'loggedIn'
      ]),

      descriptionText () {
        if (this.poll.description.length > 35) {
          return this.poll.description.slice(0, 35) + '...'
        } else {
          return this.poll.description
        }
      },

      longDescriptionText () {
        if (this.poll.description.length > 210) {
          return this.poll.description.slice(0, 210) + '...'
        } else {
          return this.poll.description
        }
      }
    },

    created () {
      this.$store.dispatch('getCurrentUser')
        .then(res => {
        })
    },

    methods: {
      followThePoll () {
        if (this.poll.user.id === this.currentUser.id && this.loggedIn) {
          this.$router.push({name: 'PollResults', params: {pollId: this.poll.id}})
        } else {
          this.$router.push({name: 'polls', params: {pollId: this.poll.id}})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .poll-card__info {
    display: flex;

    .col-wrapper {
      display: flex;
      flex-direction: column;

      @media #{$tablet-screen-lg-min} {
        flex-direction: row;
      }
    }

    .actions {
      margin-left: auto;
      text-align: right;
      display: flex;
      align-items: flex-end;
    }

    .content {
      width: 100%;
    }
  }

  .image-container {
    width: 50%;
    &:not(:last-child) {
      .image {
        border-right: 1px solid $gray-lighter;
      }

      .image_half {
        border-right: 1px solid $gray-lighter;
      }
    }
  }

  .image {
    display: block;
    width: 100%;
    height: 0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .home-card {
    &_big {
      width: calc(50% - 10px);

      .image {
        padding-top: calc( 294 / 333 * 100%);
        background-repeat: no-repeat;
        background-position: center;
        background-size: 80%;
      }

      .image_half {
        padding-top: calc( 147 / 333 * 100%);
        background-repeat: no-repeat;
        background-position: center;
        background-size: 50%;

        &:not(:last-child) {
          border-bottom: 1px solid $gray-lighter;
        }
      }

      .content {
        margin-bottom: 15px;

        @media #{$tablet-screen-lg-min} {
          margin-bottom: 0;
        }
      }

      .poll-card__info {
        padding: 20px;
        height: 50%;

        .col-wrapper {
          flex-direction: column;
        }

        @media #{$tablet-screen-lg-min} {
          padding: 27px 45px;
        }
      }

      .poll-card__title {
        margin-bottom: 18px;
        font-size: 30px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .poll-card__description {
        margin-bottom: 15px;
        font-size: 18px;
        // min-height: 129px;
        max-height: 129px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .btn {
        width: 169px;
      }
    }

    &_small {
      width: calc((100% - 60px) / 4);
      cursor: pointer;
      transition: $base-animation-duration;

      &:hover {
        box-shadow: $poll-hover-box-shadow;
      }

      .image {
        padding-top: calc( 151 / 161 * 100%);
        background-repeat: no-repeat;
        background-position: center;
        background-size: 80%;
      }

      .image_half {
        padding-top: calc( 75 / 161 * 100%);
        background-repeat: no-repeat;
        background-position: center;
        background-size: 50%;

        &:not(:last-child) {
          border-bottom: 1px solid $gray-lighter;
        }
      }

      .poll-card__info {
        padding: 14px 16px;
        height: 50%;
      }

      .poll-card__title {
        margin-bottom: 2px;
        font-size: 18px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .poll-card__description {
        margin-bottom: 8px;
        font-size: 18px;
        // min-height: 42px;
        max-height: 42px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
</style>
