<template>
  <div>

    <div class="title">{{ aside.title }}</div>

    <div class="balance">
      <div class="block" :key="index" v-for="(block, index) in aside.balanceBlocks">
        <div class="block__header">

          <div
            v-if="block.icon"
            class="block__title block__title-with-icon"
            :class="{'points': block.icon === 'points', 'bag': block.icon === 'bag'}"
          >
            {{ block.title }}
          </div>

          <div v-else class="block__title">
            {{ block.title }}
          </div>

          <div class="block__title">
            {{ block.count }}
          </div>
        </div>
      </div>
    </div>

    <div class="statistic" v-if="aside.statisticBlocks">

      <div class="block" v-for="block in aside.statisticBlocks">
        <div class="block__header block__header_margined">
          <div class="block__title">
            {{ block.title }}
          </div>
          <div class="greater-gray">
            {{ block.units }}
          </div>
        </div>

        <ul class="block__list" v-for="element in block.elements">
          <li class="block__item">
            <div>{{ element.title }}</div>
            <div>{{ element.count }}</div>
          </li>
        </ul>

      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'AsideInformation',

    props: {
      aside: {}
    }
  }
</script>
<style lang="scss" scoped>
  .title {
    margin-bottom: 19px;
    font-size: 20px;
  }

  .balance {
    border-bottom: 1px solid $gray-extra-light;
  }

  .points {
    background-image: url('../assets/img/points.svg');
  }

  .bag {
    background-image: url('../assets/img/bag.svg');
  }

  .block {
    width: 100%;
    padding: 21px 0;
    border-top: 1px solid $gray-extra-light;

    &__header {
      display: flex;
      justify-content: space-between;

      &_margined {
        margin-bottom: 20px;
      }
    }

    &__title {
      font-size: 18px;
      font-weight: 600;
      line-height: 1.11;
      color: $gray;
    }

    &__title-with-icon {
      padding-left: 39px;
      background-position: left;
      background-repeat: no-repeat;
      background-size: contain;
    }

    &__item {
      display: flex;
      justify-content: space-between;

      div {
        font-size: 18px;
        line-height: 1.44;
        color: gray;
      }
    }
  }

  .statistic {
    .block:first-child {
      border-top: none;
    }
  }
</style>
