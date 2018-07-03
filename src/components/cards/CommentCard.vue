<template>
  <div class="card card__container">

    <div class="card__header">
      <div class="author">
        <div class="author__avatar" :style="`background-image: url(${ comment.user.avatar })`"></div>

        <div class="author__info">
          <div class="author__name">{{ comment.user.name }}</div>
          <div class="author__date">{{ createdDate }}</div>
        </div>

      </div>

      <button
        class="btn btn_lightblue-outline like"
        :class="{'active': isLiked}">
        <!-- <span v-if="isLiked" @click='removeLike'>Super Liked</span> -->
        <span @click='addLike'>Super Like</span>
      </button>

    </div>

    <div class="card__text">
      <p class="comment">
        <span class="product">{{ comment.poll_item.item.name }}:</span>
        {{ comment.comment }}
      </p>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'

  export default {
    name: 'CommentCard',

    data () {
      return {
        active: this.comment.liked
      }
    },

    props: {
      comment: {}
    },

    computed: {
      isLiked () {
        return this.comment.liked
      },
      createdDate () {
        return moment(this.comment.created_at).format('MM/D/YY [at] h:mm:ss a')
      }
    },

    methods: {
      addLike () {
        if (confirm('Are you sure you want to SuperLike this comment? (You will be not able to Superike another comment in this poll)')) {
          this.$emit('like', this.comment)
        }
      },
      removeLike () {
        this.$emit('unlike', this.comment)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .card {
    &__container {
      display: inline-block;
      padding-bottom: 10px;
      margin-bottom: 20px;
      background: #fff;
      width: 100%;

      @media #{$tablet-screen-sm-min} {
        width: initial;
        max-width: 474px;
        margin: 0 20px 20px 0;
        break-inside: avoid;
      }
    }

    &__header {
      display: flex;
      flex-direction: column;
      padding: 10px;
      border-bottom: 1px solid $gray-extra-light;

      @media #{$mobile-screen-sm-min} {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }

      @media #{$mobile-screen-md-min} {
        padding: 15px 20px 13px;
      }

      .author {
        margin-bottom: 10px;

        @media #{$mobile-screen-sm-min} {
          margin-bottom: 0;
        }
      }

      .like {
        width: 168px;
        background-image: url('../../assets/img/super_like.svg');
        background-repeat: no-repeat;
        background-position: calc(100% - 10px);
        background-size: 20px 16px;
        padding-right: 45px;
        transition: $base-animation-duration;

        &.active {
          background-image: url('../../assets/img/super_liked.svg');
        }
      }
    }

    &__text {
      padding: 20px;

      .product {
        font-weight: 600;
      }

      .comment,
      .product {
        color: $gray;
      }
    }
  }

  .author {
    display: flex;
    align-items: center;

    &__avatar {
      width: 45px;
      min-width: 45px;
      height: 45px;
      margin-right: 15px;
      border-radius: 50%;
      background: $gray;
      background-size: contain;
      background-repeat: no-repeat;
    }

    &__info {
      margin-right: 20px;
    }

    &__name {
      color: $gray;
    }

    &__date {
      color: $gray-light;
    }
  }
</style>
