<template>
  <div id="reward-page">
    <div class="reward-wrapper">
      <div class="first-section">
        <div class="bar-left">
          <img src="./../../assets/img/footerbg1@svg.svg" width="100%" alt="Logo">
        </div>
      </div>
      <div class="middle-section">
        <div class="content-area">
          <div class="heading">
            Reward yourself while reinventing the online shopping experience.
          </div>
          <div class="button">
            <button @click="showSignUpModal()" class="btn btn_white">Sign up today for free</button>
          </div>
        </div>
        <div class="bar">
          <img src="./../../assets/img/footerbg2@svg.svg" width="100%" alt="Logo">
        </div>
      </div>
      <div class="last-section">
        <div class="bar-right">
          <img src="./../../assets/img/footerbg3@svg.svg" width="100%" alt="Logo">
        </div>
        <div class="bags">
          <img src="./../../assets/img/bags@svg.svg" width="100%" alt="Logo">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import AuthModals from '@/containers/AuthModals'
  import { mapGetters } from 'vuex'

  export default {
    name: 'RewardPage',
    components: {
      AuthModals
    },
    computed: {
      ...mapGetters([
        'signUpModal'
      ])
    },
    methods: {
      showSignUpModal () {
        this.$store.commit('signUpModal', true)
      }
    }
  }
</script>
<style lang="scss" scoped>
  [id="reward-page"] {
    height: 454px;
    background: #46B4E8;

    .reward-wrapper {
      position: relative;
      display: grid;
      height: 100%;
      grid-template-columns: 15% 70% 15%;

      > .first-section {

        > .bar-left {
          width: 50%;
        }
      }

      > .middle-section {

        > .content-area {
          height: 100%;
          display: grid;
          grid-template-columns: 60% 30%;
          grid-column-gap: 10%;
          align-items: center;
          align-content: center;

          @media #{$desktop-screen-sm-max} {
            display: flex;
            flex-direction: column;
            justify-content: space-around;

          }

          > .heading {
            color: white;
            font-size: 48px;
          }

          > .button {
            text-align: right;

            > button {
              color: #46B4E8;
              padding: 19px;
              width: 250px;
            }
          }
        }

        > .bar {
          width: 12%;
          position: absolute;
          bottom: 0;
          left: 50%;
          margin-bottom: -5px;
        }
      }

      > .last-section {

        > .bar-right {
          position: absolute;
          right: 0;
          width: 10%;
        }

        > .bags {
          position: absolute;
          width: 15%;
          margin-bottom: -5px;
          bottom: 0;
          right: 0;
        }
      }
    }
  }
</style>
