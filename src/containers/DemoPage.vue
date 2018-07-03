<template>
  <div class="demo__container">
    <router-link class="underlined-link demo__link" :to="'/'">Home</router-link>
    <router-link class="underlined-link demo__link" :to="'/account'">Account</router-link>
    <router-link class="underlined-link demo__link" :to="'/account-edit'">Edit Account</router-link>
    <router-link class="underlined-link demo__link" :to="'/poll'">Poll</router-link>
    <router-link class="underlined-link demo__link" :to="'/poll/create'">Create Poll</router-link>
    <router-link class="underlined-link demo__link" :to="'/poll/preview'">Preview Poll</router-link>
    <router-link class="underlined-link demo__link" :to="'/poll/publish'">Publish Poll</router-link>
    <router-link class="underlined-link demo__link" :to="'/rewards'">Rewards</router-link>
    <router-link class="underlined-link demo__link" :to="'/rewards_single_view'">Rewards Single View</router-link>
    <router-link class="underlined-link demo__link" :to="'/rewards/cart'">Rewards Cart</router-link>
    <router-link class="underlined-link demo__link" :to="'/rewards/add_address'">Rewards Add Address</router-link>
    <router-link class="underlined-link demo__link" :to="'/rewards/choose_address'">Rewards Choose Address</router-link>
    <router-link class="underlined-link demo__link" :to="'/rewards/cart_review'">Rewards Cart Review</router-link>
    <router-link class="underlined-link demo__link" :to="'/rewards/cart_confirmed'"> Rewards Cart Confirmed</router-link>
    <router-link class="underlined-link demo__link" :to="'/rewards_history'">Rewards History</router-link>
    <router-link class="underlined-link demo__link" :to="'/my_polls'">My Polls</router-link>
    <router-link class="underlined-link demo__link" :to="'/poll/results'">Poll Results</router-link>

    <home-footer></home-footer>

  </div>
</template>
<script>
  import HomeFooter from '@/components/HomeFooter'
  export default {
    name: 'DemoPage',

    components: {
      HomeFooter
    }
  }
</script>
<style lang="scss">
  .demo {
    &__container {
      max-width: 350px;
      margin: 50px auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      box-shadow: $base-box-shadow;
      border-radius: $base-border-radius;
      overflow: hidden;
      background: #fff;
    }

    &__link {
      margin-bottom: 5px;
      color: $gray;
    }
  }
</style>
