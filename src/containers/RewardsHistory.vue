<template>
  <section class="rewards">

    <div class="rewards__desktop">
      <base-layout :sectionIcon="sectionIcon">

        <div slot="aside" class="rewards__aside">
          <aside-information :aside="aside"></aside-information>
        </div>

        <div slot="main" class="rewards__main">

          <div class="history__title title">Redeem History</div>

          <div v-if="false" class="flex-row">
            <product-card :cardIcon="cardIcon">
              <div slot="title" class="poll-card__title product-card__title">8GB USB Key</div>
              <div slot="author" class="author">100 points</div>
            </product-card>

            <product-card :cardIcon="cardIcon">
              <div slot="title" class="poll-card__title product-card__title">Ceramic Concrete Planter</div>
              <div slot="author" class="author">150 points</div>
            </product-card>

            <product-card :cardIcon="cardIcon">
              <div slot="title" class="poll-card__title product-card__title">Brooklyn Mid-Century Si...</div>
              <div slot="author" class="author">350 points</div>
            </product-card>

            <product-card :cardIcon="cardIcon">
              <div slot="title" class="poll-card__title product-card__title">Unisex Backpack</div>
              <div slot="author" class="author">450 points</div>
            </product-card>

            <product-card :cardIcon="cardIcon">
              <div slot="title" class="poll-card__title product-card__title">Unisex Backpack</div>
              <div slot="author" class="author">450 points</div>
            </product-card>

          </div>

          <rewards-message v-else :message="message"></rewards-message>

        </div>

      </base-layout>
    </div>

    <div class="rewards__mobile">
      <tabs>
        <tab title="Rewards Information" active="true">
          <aside-information :aside="aside"></aside-information>
        </tab>

        <tab title="History">
          <div class="history__title title">Redeem History</div>

          <div v-if="false" class="flex-row">
            <product-card :cardIcon="cardIcon">
              <div slot="title" class="poll-card__title product-card__title">8GB USB Key</div>
              <div slot="author" class="author">100 points</div>
            </product-card>

            <product-card :cardIcon="cardIcon">
              <div slot="title" class="poll-card__title product-card__title">Ceramic Concrete Planter</div>
              <div slot="author" class="author">150 points</div>
            </product-card>

            <product-card :cardIcon="cardIcon">
              <div slot="title" class="poll-card__title product-card__title">Brooklyn Mid-Century Si...</div>
              <div slot="author" class="author">350 points</div>
            </product-card>

            <product-card :cardIcon="cardIcon">
              <div slot="title" class="poll-card__title product-card__title">Unisex Backpack</div>
              <div slot="author" class="author">450 points</div>
            </product-card>

            <product-card :cardIcon="cardIcon">
              <div slot="title" class="poll-card__title product-card__title">Unisex Backpack</div>
              <div slot="author" class="author">450 points</div>
            </product-card>

          </div>

          <rewards-message v-else :message="message"></rewards-message>
        </tab>
      </tabs>
    </div>

    <modal-wrapper v-if="false">
      <product-quick-view-modal :rewards="rewards"></product-quick-view-modal>
    </modal-wrapper>

    <home-footer></home-footer>

  </section>
</template>

<script>
  import BaseLayout from '@/layouts/BaseLayout'
  import HomeFooter from '@/components/HomeFooter'
  import ProductCard from '@/components/cards/ProductCard'
  import ModalWrapper from '@/components/ModalWrapper'
  import ProductQuickViewModal from '@/components/ProductQuickViewModal'
  import AsideInformation from '@/components/AsideInformation'
  import RewardsMessage from '@/components/RewardsMessage'
  import Tabs from '@/components/tabs/Tabs'
  import Tab from '@/components/tabs/Tab'

  export default {
    name: 'RewardsHistory',

    components: {
      RewardsMessage,
      AsideInformation,
      BaseLayout,
      HomeFooter,
      ProductCard,
      ModalWrapper,
      ProductQuickViewModal,
      Tab,
      Tabs
    },

    data () {
      return {
        sectionIcon: 'rewards',
        rewards: false,
        cardIcon: false,
        asideShort: false,
        message: {
          title: 'You haven’t redeemed anything yet.',
          description: 'Use your points to redeem a reward.',
          smile: false,
          btn: 'View Rewards'
        },
        aside: {
          title: 'Rewards',
          balanceBlocks: [
            {
              title: 'Points Balance',
              count: '2500',
              icon: 'points'
            },
            {
              title: 'Bag',
              count: '1 item(s)',
              icon: 'bag'
            }
          ],
          statisticBlocks: [
            {
              title: 'Top Picks',
              units: 'Points',
              elements: [
                {
                  title: 'Big Screen TV',
                  count: '1290'
                },
                {
                  title: '4k Ultra Monitor',
                  count: '1800'
                },
                {
                  title: 'Ultimate Fishing Gears',
                  count: '3000'
                },
                {
                  title: 'Wearable Watch',
                  count: '6000'
                },
                {
                  title: 'Home Monitoring System',
                  count: '9080'
                }
              ]
            },
            {
              title: 'Staff Picks',
              units: 'Points',
              elements: [
                {
                  title: 'Big Screen TV',
                  count: '1290'
                },
                {
                  title: '4k Ultra Monitor',
                  count: '1800'
                },
                {
                  title: 'Ultimate Fishing Gears',
                  count: '3000'
                },
                {
                  title: 'Wearable Watch',
                  count: '6000'
                },
                {
                  title: 'Home Monitoring System',
                  count: '9080'
                }
              ]
            },
            {
              title: 'Redeem History',
              units: 'Date',
              elements: [
                {
                  title: 'Big Screen TV',
                  count: '12/30/17'
                },
                {
                  title: '$5 Gift Card',
                  count: '12/5/17'
                },
                {
                  title: '$5 Gift Card',
                  count: '11/21/17'
                },
                {
                  title: '8GB USB Key',
                  count: '10/13/17'
                }
              ]
            }
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .rewards {
    &__desktop {
      @media #{$tablet-screen-lg-max} {
        display: none;
      }
    }

    &__mobile {
      padding: 40px 20px;

      @media #{$tablet-screen-lg-min} {
        display: none;
      }
    }
  }

  .history {
    &__title {
      margin-bottom: 20px;
    }
  }
</style>
