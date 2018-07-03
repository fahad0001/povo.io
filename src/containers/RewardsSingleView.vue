<template>
  <section class="rewards">
    <base-layout :sectionIcon="sectionIcon">

      <div slot="aside" class="rewards__aside">
        <aside-information :aside="aside"></aside-information>
      </div>

      <div slot="main" class="rewards__main">

        <div class="single-view">

          <single-view-card>
            <div slot="title" class="sv__title">Mini Cooling Fan, Pink</div>
            <div slot="author" class="sv__author">By Kul</div>
            <div slot="price" class="sv__price">100 points</div>
            <div slot="description" class="sv__description greater-gray">
              Super Strong Large Airflow:double fan blades driven by two high speed quite motors rotates
              in opposite directions,cooling you down soon. Whisper Quite Operation:this cute personal
              cooling fan works quietly with lower sound frequency,less than 40dB. Adjustable Fan Speed
              Control: fantastic knob switch design personalizes your wind blowing experience with 2 speed
              control(0-Stop, 2-Middle Fast, 3-fatest).
            </div>
            <button slot="btn" class="btn btn_lightblue sv__btn">Add to Bag</button>
          </single-view-card>

        </div>

        <div class="related">

          <div class="title">Related Rewards</div>

          <div class="flex-row">

            <product-card :cardIcon="cardIcon">
              <div slot="title" class="poll-card__title product-card__title">Contemporary Two Dr...</div>
              <div slot="author" class="author">By BORAAM</div>
            </product-card>

            <product-card :cardIcon="cardIcon">
              <div slot="title" class="poll-card__title product-card__title">Contemporary Two Dr...</div>
              <div slot="author" class="author">By BORAAM</div>
            </product-card>

            <product-card :cardIcon="cardIcon">
              <div slot="title" class="poll-card__title product-card__title">Contemporary Two Dr...</div>
              <div slot="author" class="author">By BORAAM</div>
            </product-card>

            <product-card :cardIcon="cardIcon">
              <div slot="title" class="poll-card__title product-card__title">Contemporary Two Dr...</div>
              <div slot="author" class="author">By BORAAM</div>
            </product-card>

          </div>

        </div>

      </div>

    </base-layout>

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
  import SingleViewCard from '@/components/cards/SingleViewCard'

  export default {
    name: 'RewardsSingleView',

    components: {
      AsideInformation,
      BaseLayout,
      HomeFooter,
      ProductCard,
      ModalWrapper,
      ProductQuickViewModal,
      SingleViewCard
    },

    data () {
      return {
        sectionIcon: 'rewards',
        rewards: false,
        cardIcon: false,
        asideShort: false,
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
  .related {
    .title {
      margin-bottom: 28px;
    }
  }
</style>
