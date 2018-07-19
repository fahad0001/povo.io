<template>
  <transition-group name="fade">
    <modal-wrapper v-if="videoModal" v-on:close-click="closeMediaModals" v-cloak :key="0">
      <video-modal></video-modal>
    </modal-wrapper>
  </transition-group>
</template>
<script>
  import ModalWrapper from '@/components/ModalWrapper'

  import VideoModal from '@/containers/VideoModal'
  import { mapGetters } from 'vuex'

  export default {
    name: 'MediaModal',
    components: {
      ModalWrapper,
      VideoModal
    },
    computed: {
      ...mapGetters([
        'videoModal'
      ])
    },
    methods: {
      closeMediaModals () {
        this.$store.commit('closeMediaModals')
      }
    }
  }
</script>
<style lang="scss" scoped></style>
