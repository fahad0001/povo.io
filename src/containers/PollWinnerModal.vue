<template>
  <div class="winner__container">
    <template v-if="winnerItem">
      <div class="winner__title">“{{ winnerItem.name }}” is the winner!</div>

      <div class="winner__block">

        <div class="winner__image-container">
          <div class="winner__image" :style="`background-image: url(${winnerItem.image.url})`">
          </div>
        </div>

        <div class="winner__info">
          <div class="statistic greater-gray" v-if="poll.votes_count > 0">
            {{ poll.winner.votes_count/poll.votes_count * 100 }}%  of users voted for this product!
          </div>

          <div class="statistic greater-gray" v-else>
            100%  of users voted for this product!
          </div>

          <div class="commentary" v-if="comment.user">
            <div class="commentary__avatar" :style="`background-image: url(${commentatorAvatar})`"></div>
            <div>
              <div class="commentary__name greater-gray">{{comment.user.name}} said:</div>
              <div class="commentary__text greater-gray">
                “{{comment.comment}}”
              </div>
            </div>
          </div>
          <div class="buttons">
            <button class="btn btn_lightblue" @click="buyNowClick()">Buy now</button>
          </div>

        </div>
      </div>
    </template>
    <loader v-else></loader>

  </div>
</template>
<script>
  import Loader from '@/components/shared/Loader'
  import SaveProductBtn from '@/components/shared/SaveProductBtn'

  export default {
    name: 'PollWinner',

    components: {
      Loader,
      SaveProductBtn
    },

    data () {
      return {
        winnerItem: {},
        comment: {},
        commentatorAvatar: require('../assets/img/no-avatar.jpg'),
        server_url: process.env.SERVER_URL,
        saveLoading: false
      }
    },
    props: {
      poll: Object,
      closeModal: Function
    },
    methods: {
      saveProduct () {
        this.saveLoading = true
        this.$store.dispatch('saveProduct', this.winnerItem)
          .then(res => {
            let pollId = this.winnerItem ? this.winnerItem.id : null
            this.$store.dispatch('getPollById', pollId)
              .then(() => {
                this.saveLoading = false
              })
              .catch((error) => {
                console.log(error)
                this.saveLoading = false
              })
          })
      },

      removeSavedProduct () {
        this.saveLoading = true
        this.$store.dispatch('removeSavedProduct', this.winnerItem)
          .then(res => {
            let pollId = this.$route.params.pollId
            this.$store.dispatch('getPollById', pollId)
              .then(() => {
                this.saveLoading = false
              })
          })
      },

      buyNowClick () {
        window.open(this.winnerItem.buy_link, '_blank')
        this.closeModal()
      },
      getWinnerItem () {
        const winner = this.poll.winner
        const pollItems = this.poll.poll_items
        const items = pollItems.map((pollItem) => pollItem.item)
        const winnerItem = items.filter((item) => item.id === winner.item.id)[0]
        this.$set(this, 'winnerItem', winnerItem)
        return winnerItem
      },
      getComment () {
        return new Promise((resolve, reject) => {
          const comments = this.poll.comments
          let suggestedComment = comments.filter((comment) => comment.liked)[0]
          if (!suggestedComment) {
            suggestedComment = comments[0] || {}
          }
          this.$set(this, 'comment', suggestedComment)
          resolve(suggestedComment)
        })
      },
      getCommentatorAvatar (comment) {
        let avatarUrl = comment.user.image.thumb.url
        if (!avatarUrl) {
          avatarUrl = require('../assets/img/no-avatar.jpg')
        } else {
          avatarUrl = this.server_url + avatarUrl
        }
        this.$set(this, 'commentatorAvatar', avatarUrl)
        return avatarUrl
      }
    },
    created () {
      this.getWinnerItem()
      this.getComment().then((comment) => {
        if (comment.user) {
          this.getCommentatorAvatar(comment)
        }
      })
    }
  }
</script>
<style lang="scss" scoped>
  .winner {
    &__container {
      width: 737px;
      max-width: 100%;
      padding: 37px 25px 30px;
    }

    &__title {
      width: 100%;
      padding-bottom: 33px;
      margin-bottom: 25px;
      border-bottom: 1px solid $gray-extra-light;
      text-align: center;
      font-size: 20px;
      color: $skyblue;
    }

    &__block {
      display: flex;
    }

    &__image-container {
      flex: 1;
      max-width: 256px;
    }

    &__image {
      display: block;
      width: 100%;
      height: 0;
      padding-top: calc( 251 / 256 * 100%);
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
    }

    &__info {
      max-width: 56%;
      margin-left: 45px;
    }
  }

  .statistic {
    margin-bottom: 25px;
  }

  .commentary {
    display: flex;
    align-items: flex-start;

    &__avatar {
      min-width: 40px;
      min-height: 40px;
      margin-right: 19px;
      border-radius: 50%;
      background: $gray;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }

    &__name {
      margin: 2px 0 8px;
    }

    &__text {
      margin-bottom: 33px;
    }
  }

  .buttons {
    display: flex;
    margin-bottom: 25px;

    .btn {
      flex: 1;
    }

    .btn:first-child {
      margin-right: 8px;
    }
  }
</style>
