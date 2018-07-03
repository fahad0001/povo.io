<template>
  <base-layout :sectionIcon="sectionIcon">

    <div slot="aside" class="poll__aside">

      <div class="poll__title">
        {{ pollTitle }}
      </div>

      <div class="poll__description">
        {{ pollDescription }}
      </div>

      <div class="poll__comment">
        <label for="comment">Comment</label>
        <textarea name="comment"
                  id="comment"
                  class="text-field"
                  placeholder="Write a comment to earn an additional 20 points."
                  @input="handleCommentChange($event)"
        ></textarea>
      </div>

    </div>

    <div slot="main" class="poll__main">

      <div class="poll__title">
        Vote for one of the following
      </div>

      <div class="flex-row">
        <slot></slot>
      </div>

    </div>
  </base-layout>
</template>

<script>
  import BaseLayout from '@/layouts/BaseLayout'

  export default {
    name: 'PollLayout',

    components: {
      BaseLayout
    },

    data () {
      return {
        sectionIcon: 'poll'
      }
    },

    props: {
      pollTitle: '',
      pollDescription: ''
    },

    methods: {
      handleCommentChange (event) {
        const text = event.target.value
        this.$emit('comment-change', text)
      }
    }

  }
</script>

<style lang="scss" scoped>
  .poll {
    &__title {
      margin-bottom: 17px;
      font-size: 20px;
    }

    &__description {
      margin-bottom: 40px;
      color: $gray;
      font-size: 18px;
    }

    &__comment {
      label {
        display: inline-block;
        margin-bottom: 18px;
        color: $gray;
      }
    }
  }
</style>
