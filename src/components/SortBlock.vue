<template>
  <div>
    <div class="sort__block">
      <div class="sort__title greater-gray">
        Sort by
      </div>

     <!--  <select class="sort__select-slim">
        <option v-for="option in sortData.select1" :value="option.value">{{ option.text }}</option>
      </select> -->

      <select class="sort__select-wide" @change.number="changeCategory($event)">
        <option value=''>All Categories</option>
        <option v-for="option in categories" v-if='categories.length > 0' :value="option.id">{{ option.name }}</option>
      </select>

    </div>

    <search-input :searchPlaceholder="sortData.search" v-on:input-use="handleSearchInput"></search-input>

  </div>
</template>
<script>
  import SearchInput from '@/components/SearchInput'

  export default {
    name: 'SortBlock',

    components: {
      SearchInput
    },

    props: {
      sortData: {},
      categories: {
        default: () => []
      }
    },

    methods: {
      changeCategory (e) {
        this.$emit('change-category', e)
      },

      handleSearchInput (e) {
        this.$emit('input-use', e)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sort {
    &__title {
      margin-right: 17px;
      margin-bottom: 10px;

      @media #{$mobile-screen-sm-min} {
        margin-bottom: 0;
      }
    }

    &__block {
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;

      @media #{$mobile-screen-sm-min} {
        align-items: center;
        flex-direction: row;
      }
    }

    &__select-slim {
      width: 156px;
      margin-right: 20px;
      margin-bottom: 15px;

      @media #{$mobile-screen-sm-min} {
        margin-bottom: 0;
      }
    }

    &__select-wide {
      flex: 1;
    }
  }
</style>
