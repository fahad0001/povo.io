<template>
  <section>

    <poll-layout
      :pollTitle="poll.title"
      :pollDescription="poll.description"
      v-on:comment-change="handleCommentChange"
      v-if="!showSkipLoader"
    >

      <voting-card
        v-if="Object.keys(poll).length > 0"
        v-for="(pollItem, index) in poll.poll_items"
        v-on:pick="handleProductPicked"
        v-on:show-modal-btn-click="handleProductModalBtn"
        :pickedCard.sync="pickedCard"
        :value="index"
        :key="index"
        :product="pollItem.item"
      >
      </voting-card>
      <loader v-if="!Object.keys(poll).length > 0" :sizeInPx="'120px'"></loader>

    </poll-layout>
    <loader v-else :sizeInPx="'200px'"></loader>

    <modal-wrapper
      v-if="showModal"
      v-on:close-click="toggleProductModal(false)"
    >
      <product-quick-view-modal
        :product="modalProduct"
        v-on:add-to-selected-click="handleProductPicked"
        v-on:close-click="toggleProductModal(false)"
      ></product-quick-view-modal>
    </modal-wrapper>

    <poll-footer
      v-on:skip-btn-click="handleSkipVoteClick"
      v-on:submit-click="handleSubmitVoteClick"
      :showSkipLoader="showSkipLoader"
      :isDisabled="isSubmitDisabled"></poll-footer>

  </section>
</template>

<script>
  import PollLayout from '@/layouts/PollLayout'
  import PollFooter from '@/components/PollFooter'
  import VotingCard from '@/components/cards/VotingCard'
  import Loader from '@/components/shared/Loader'
  import ModalWrapper from '@/components/ModalWrapper'
  import ProductQuickViewModal from '@/components/ProductQuickViewModal'

  import { mapGetters } from 'vuex'

  import notificationService from '../services/notification.service'

  import _ from 'lodash'

  export default {
    name: 'Poll',

    components: {
      PollLayout,
      PollFooter,
      VotingCard,
      Loader,
      ModalWrapper,
      ProductQuickViewModal
    },

    data () {
      return {
        pickedCard: '',
        pickedItem: {},
        poll: {},
        isSubmitDisabled: true,
        showModal: false,
        modalProduct: {},
        showSkipLoader: false,
        showedPolls: this.polls ? this.polls.filter(p => p.voted) : []
      }
    },

    computed: {
      ...mapGetters([
        'polls',
        'actualPolls',
        'loggedIn',
        'products',
        'currentUser'
      ]),

      showLoader () {
        return !this.poll.poll_items
      }
    },

    created () {
      this.$store.dispatch('getCurrentUser')
      this.getPollById()
    },

    watch: {
      polls: function (newPolls) {
        let pollId = +this.$route.params.pollId
        let nextPoll = newPolls.filter((poll) => poll['skipped'] !== true)[0]
        let currentPoll = newPolls.filter((poll) => poll.id === pollId)[0]
        if (currentPoll.skipped === true) {
          this.$router.push({name: 'polls', params: {pollId: nextPoll.id}})
        }
        this.poll = currentPoll
      },

      pickedItem: function (newItem) {
        Object.keys(newItem).length > 0 ? this.isSubmitDisabled = false : this.isSubmitDisabled = true
      }
    },

    methods: {
      getPollById () {
        let pollId = this.$route.params.pollId
        return this.$store.dispatch('getPollById', pollId)
      },

      handleProductPicked (item) {
        this.pickedItem = item
      },

      handleSubmitVoteClick () {
        if (this.loggedIn) {
          if (this.poll.voted) {
            this.handleSkipVoteClick()
          } else {
            this.$store.commit('toggleVoteSubmitLoader', true)
            const data = { item: this.pickedItem, poll: this.poll, comment: this.commentText }
            this.$store.dispatch('voteForPollItem', data)
              .then((res) => {
                this.$store.commit('toggleVoteSubmitLoader', false)
                this.handleSkipVoteClick()
              })
          }
        } else {
          notificationService.showError('You need to sign in or sign up before continuing.')
        }
      },

      handleSkipVoteClick () {
        this.showSkipLoader = true
        this.showedPolls.push(this.poll)

        this.loggedIn ? this.$store.dispatch('getPollsUnvoted')
          .then(() => {
            const polls = this.actualPolls
            const filteredPolls = polls.filter((poll) => {
              return poll.voted || this.showedPolls.find(p => p.id === poll.id)
            })
            const otherPolls = _.differenceBy(polls, filteredPolls, 'id')
            this.showNextPoll(otherPolls)
          }) : null
      },

      showNextPoll (unshowedPolls) {
        this.dropLocalStateToInitial()

        if (unshowedPolls.length > 0) {
          this.$router.replace({ name: 'polls', params: { pollId: unshowedPolls[0].id } })
          this.getPollById()
            .then((res) => {
              this.showSkipLoader = false
            })
        } else {
          this.showSkipLoader = false
          this.$router.push({ path: '/' })
        }
      },

      handleCommentChange (text) {
        this.commentText = text
      },

      toggleProductModal (modalState) {
        this.showModal = modalState
      },

      handleProductModalBtn (productId) {
        this.toggleProductModal(true)
        this.modalProduct = {}
        this.$store.dispatch('getProductById', productId)
          .then(res => {
            // todo
            this.modalProduct = this.products.filter((product) => product.id === productId)[0]
          })
      },

      dropLocalStateToInitial () {
        this.$set(this, 'modalProduct', {})
        this.$set(this, 'pickedItem', {})
        this.$set(this, 'pickedCard', '')
        this.pickedCard = null
      }
    }
  }
</script>
