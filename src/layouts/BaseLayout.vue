<template>
  <div class="container">
    <div class="layout">

      <div class="layout__icon"
           :class="{'poll': sectionIcon==='poll', 'account': sectionIcon==='account', 'rewards': sectionIcon==='rewards'}"
      >
      </div>

      <aside class="layout__aside">
        <slot name="aside"></slot>
      </aside>

      <main class="layout__main">
        <slot name="main"></slot>
      </main>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'BaseLayout',
    props: {
      sectionIcon: ''
    }
  }
</script>

<style lang="scss" scoped>
  .layout {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 61px 0 50px;

    @media #{$tablet-screen-lg-min} {
      flex-direction: row;
    }

    &__icon {
      width: 20px;
      height: 20px;
      position: absolute;
      top: 22px;
      left: 0;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;

      &.poll {
        background-image: url("../assets/img/navIconPolls.svg");
      }

      &.account {
        background-image: url("../assets/img/navIconAccount.svg");
      }

      &.rewards {
        background-image: url("../assets/img/navIconRewards.svg");
      }
    }

    &__aside {
      margin-bottom: 40px;

      @media #{$tablet-screen-lg-min} {
        min-width: 383px;
        max-width: 383px;
        padding-right: 44px;
      }
    }

    &__main {
      // flex: 1;

      @media #{$tablet-screen-lg-min} {
        width: calc(100% - 383px);
      }
    }
  }
</style>
