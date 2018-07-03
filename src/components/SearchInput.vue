<template>
  <input class="search-input" @input='onInputUse($event)' :placeholder="searchPlaceholder">
</template>
<script>
  export default {
    name: 'SearchInput',
    props: {
      searchPlaceholder: ''
    },

    methods: {
      onInputUse (e) {
        this.$emit('input-use', e.target.value)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .search-input {
    width: 100%;
    margin-bottom: 20px;
    padding: 9px 55px 10px;
    border: 1px solid $gray-lighter;
    border-radius: $base-border-radius;
    background: transparent;
    text-align: center;
    font-weight: 600;
    transition: $base-animation-duration;
    background: url('../assets/img/search.svg') no-repeat 19px center;
    background-size: 20px;

    &::placeholder {
      color: #000;
      transition: $base-animation-duration;
    }

    &:focus {
      border-color: $gray-light;

      &::placeholder {
        color: transparent;
      }
    }
  }
</style>
