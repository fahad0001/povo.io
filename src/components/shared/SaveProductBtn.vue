<template>
  <span class="saveBtn">
    <template v-if="!loading">
      <button v-if="isSaved" v-cloak class="btn btn_lightblue-outline information__header-btn active save" @click="$emit('removeSavedProduct')">Saved!</button>
      <button v-else v-cloak class="btn btn_lightblue-outline information__header-btn save" @click="$emit('saveForLater')">Save for later</button>
    </template>
    <loader v-else></loader>
  </span>
</template>

<script>
import Loader from '@/components/shared/Loader'

export default {
  name: 'save-product-btn',

  components: {Loader},

  props: {
    loading: {
      type: Boolean,
      default: false
    },
    isSaved: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .save {
    padding: 8px 15px 8px 0;
    background-image: url('../../assets/img/starIcon.svg');
    background-repeat: no-repeat;
    background-position: calc(100% - 11px);
  }

  .loader {
    width: 100%;
  }
</style>
