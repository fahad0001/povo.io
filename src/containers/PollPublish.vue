<template>
  <section>

    <message>
      <div slot="text" class="message__text">Your poll is now live! Come back in 24 hours to see the results.</div>
    </message>

    <poll-layout>

      <voting-card
        :pickedCard.sync="pickedCard"
        :value="'1'"
      >
        <div slot="title" class="poll-card__title title">
          Modern Couch
        </div>
        <span slot="author" class="author">By Plush</span>
      </voting-card>

      <voting-card
        :pickedCard.sync="pickedCard"
        :value="'2'"
      >
        <div slot="title" class="poll-card__title title">
          Grill Master 9000
        </div>
        <span slot="author" class="author">By Fyre</span>
      </voting-card>

      <voting-card
        :pickedCard.sync="pickedCard"
        :value="'3'"
      >
        <div slot="title" class="poll-card__title title">
          Interesting book
        </div>
        <span slot="author" class="author">By Fyre</span>
      </voting-card>

    </poll-layout>

    <home-footer
      :active="'preview'"
    ></home-footer>

  </section>
</template>

<script>
  import HomeFooter from '@/components/HomeFooter'
  import PollLayout from '@/layouts/PollLayout'
  import Message from '@/components/Message'
  import VotingCard from '@/components/cards/VotingCard'

  export default {
    name: 'PollPublish',
    components: {
      HomeFooter,
      PollLayout,
      Message,
      VotingCard
    },
    data () {
      return {
        pickedCard: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .poll {

    &__icon {
      width: 20px;
      height: 20px;
      position: absolute;
      top: 22px;
      left: 0;
      background-image: url('../assets/img/navIconPolls.svg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }

    &__container {
      display: flex;
      padding: 61px 0 50px;
      position: relative;
    }

    &__title {
      margin-bottom: 17px;
      font-size: 20px;
    }

    &__info {
      display: flex;
      flex-direction: column;
      width: 339px;
      margin-right: 44px;
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

    &__cards {
      flex: 1;
    }
  }
</style>
