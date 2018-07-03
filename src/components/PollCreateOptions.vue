<template>
  <div class="options">

    <div class="option">

      <label for="products_number" class="description">
        Number of products in this poll
      </label>

      <select
        class="select"
        id="products_number"
        :value="productsNumber"
        @change="selectProductsNumber($event.target.value)"
      >
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>

    </div>

    <div class="option">

      <label for="votes_number" class="description">
        Number of votes in this poll
      </label>

      <select
        class="select"
        id="votes_number"
        :value="votesNumber"
        @change="selectVotesNumber($event.target.value)"
      >
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="80">80</option>
        <option value="100">100</option>
      </select>

    </div>

  </div>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'PollCreateOptions',

    computed: {
      ...mapGetters([
        'productsNumber',
        'votesNumber'
      ])
    },

    methods: {
      selectProductsNumber (productsNumber) {
        this.$store.commit('setProductsNumber', productsNumber)
      },

      selectVotesNumber (votesNumber) {
        this.$store.commit('setVotesNumber', votesNumber)
      }
    }
  }
</script>
<style lang="scss" scoped>

  .select {
    width: 100px;
  }

  .options {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid $gray-extra-light;
  }

  .option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .description {
      color: $gray;
      margin-right: 24px;
    }
  }
</style>
