<template>
  <div class="card-container">
    <div class="image-container">
      <div class="image" :style="`background-image: url(${product.item.image.url})`">
      </div>
    </div>
    <div class="buttons-block">
      <save-product-btn
        :loading="saveLoading"
        :isSaved="product.item.saved"
        @removeSavedProduct="removeSavedProduct"
        @saveForLater="saveProduct"
      ></save-product-btn>
      <a :href="product.item.buy_link" target="_blank" class="btn btn_lightblue" >Buy Now</a>
    </div>
  </div>
</template>
<script>
  import Loader from '@/components/shared/Loader'
  import SaveProductBtn from '@/components/shared/SaveProductBtn'

  export default {
    name: 'PollsResultsWinner',

    data () {
      return {
        server_url: process.env.SERVER_URL,
        saveLoading: false
      }
    },

    components: {
      Loader,
      SaveProductBtn
    },

    props: {
      product: {
        type: Object,
        required: true,
        default: null
      }
    },

    methods: {
      saveProduct () {
        this.saveLoading = true
        let pollId = this.$route.params.pollId
        this.$store.dispatch('getPollById', pollId)
        this.$store.dispatch('saveProduct', this.product.item)
          .then(res => {
            this.saveLoading = false
          })
      },

      removeSavedProduct () {
        this.saveLoading = true
        let pollId = this.$route.params.pollId
        this.$store.dispatch('getPollById', pollId)
        this.$store.dispatch('removeSavedProduct', this.product.item)
          .then(res => {
            this.saveLoading = false
          })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .card-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .image-container {
    height: 177px;
  }

  .image {
    display: block;
    width: 100%;
    height: 0;
    padding-top: calc( 177 / 338 * 100%);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .buttons-block {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 10px;
    background: #faffff;
    border-top: 1px solid $gray-extra-light;

    .saveBtn,
    .btn:first-child {
      margin-right: 9px;
      width: 100%;
    }

    .save {
      /*padding: 8px 15px 8px 0;*/
      padding: 8px 35px 8px 35px;
      background-image: url('../../assets/img/starIcon.svg');
      background-repeat: no-repeat;
      background-position: calc(100% - 11px);
    }
  }
</style>
