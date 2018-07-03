<template>
  <section>

    <message>
      <div slot="text" class="message__text">{{message}}</div>
    </message>

    <poll-layout
    :pollTitle="pollTitle"
    :pollDescription="pollDescription"
    >

      <voting-card
        :pickedCard.sync="pickedCard"
        v-for="(product, index) in selectedProducts"
        :value="index"
        :key="index"
        :product="product"
        v-on:show-modal-btn-click="handleProductModalBtn"
      >
      </voting-card>

    </poll-layout>

    <modal-wrapper
      v-if="showModal"
      v-on:close-click="toggleProductModal(false)"
    >
      <product-quick-view-modal
        :product="modalProduct"
      ></product-quick-view-modal>
    </modal-wrapper>

    <poll-create-footer
      :active="activeStep"
      v-on:publish-poll-click="createPoll()"
    ></poll-create-footer>

  </section>
</template>

<script>
  import PollCreateFooter from '@/components/PollCreateFooter'
  import PollLayout from '@/layouts/PollLayout'
  import Message from '@/components/Message'
  import VotingCard from '@/components/cards/VotingCard'
  import ModalWrapper from '@/components/ModalWrapper'
  import ProductQuickViewModal from '@/components/ProductQuickViewModal'

  import { mapGetters } from 'vuex'

  export default {
    name: 'PollPreview',

    components: {
      PollCreateFooter,
      PollLayout,
      Message,
      VotingCard,
      ModalWrapper,
      ProductQuickViewModal
    },

    data () {
      return {
        pickedCard: '',
        message: 'This is a preview',
        activeStep: 'preview',
        showModal: false,
        modalProduct: {}
      }
    },

    computed: {
      ...mapGetters([
        'pollTitle',
        'pollDescription',
        'selectedProducts',
        'currentPoll',
        'currentUser',
        'products'
      ])
    },

    methods: {
      createPoll () {
        const header = document.getElementById('header')
        this.$store.subscribe(mutation => {
          if (mutation.type === 'pollCreateSuccess') {
            this.message = `Your poll is now live! Come back in ${+(this.currentPoll.expires) * 24} hours to see the results.`
            this.activeStep = 'publish'
            header.scrollIntoView()
          }
        })

        this.$store.dispatch('createPoll', this.currentPoll)
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
