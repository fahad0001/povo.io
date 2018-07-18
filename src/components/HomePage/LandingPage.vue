<template>
  <div id="landing-page">
    <div class="content-wrapper">
      <div class="first-section">
        <div class="first-section__bar">
          <img src="./../../assets/img/bg1@svg.svg" width="100%" alt="Logo">
        </div>
        <div class="first-section__coin">
          <img src="./../../assets/img/coins1@svg.svg" width="100%" alt="Logo">
        </div>
        <div class="first-section__backcard">
          <img src="./../../assets/img/card back@svg.svg" width="100%" alt="Logo">
        </div>
      </div>
      <div class="middle-section">
        <div class="middle-section__top">
          <div class="middle-section__top__img">
            <img src="./../../assets/img/bf2@svg.svg" width="22%" alt="Logo">
          </div>
        </div>
        <div class="middle-section__middle">
          <div class="middle-section__middle__heading">
            Put points in your pocket with Povo
          </div>
          <div class="middle-section__middle__para">
            Povo is the only online community that rewards your feedback with free gift cards to your favourite retailers.
          </div>
          <div class="middle-section__middle__button1">
            <button @click="showSignUpModal()" class="btn btn_white">Sign up today for free</button>
          </div>
          <div class="middle-section__middle__button2">
            <button class="btn btn_lightblue-outline">Watch the video <span class="play-icon"><i class="fa">&#xf04b;</i></span></button>
          </div>
        </div>
        <div class="middle-section__bottom">
          <div class="middle-section__bottom__img">
            <img src="./../../assets/img/bg5@svg.svg" width="45%" alt="Logo">
          </div>
        </div>
      </div>
      <div class="last-section">
        <div class="last-section__bar">
          <img src="./../../assets/img/bg3@svg.svg" width="100%" alt="Logo" @click="handleLogoClick">
        </div>
        <div class="last-section__card">
          <img src="./../../assets/img/card@svg.svg" width="100%" alt="Logo">
        </div>
        <div class="last-section__coin">
          <img src="./../../assets/img/coins2@svg.svg" width="100%" alt="Logo">
        </div>
      </div>
    </div>
    <auth-modals></auth-modals>
  </div>
</template>
<script>
  import AuthModals from '@/containers/AuthModals'
  import { mapGetters } from 'vuex'

  export default {
    name: 'LandingPage',
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
  [id="landing-page"] {
    background: #309ce0;
    position: relative;
    height: 100vh;

    .content-wrapper {
      display: flex;
      flex-flow: row wrap;
      height: 100vh;

      > * { flex: 1 1 0}

      .first-section {
        &__bar {
          position: absolute;
          opacity: 1.2;
          width: 15%;
        }

        &__coin {
          position: absolute;
          top: 10%;
          left: 2%;
          width: 7%;
        }

        &__backcard {
          position: absolute;
          bottom: 15%;
          left: 10%;
          width: 9%;
        }
      }

      .middle-section {
        flex-grow: 3;
        display: flex;
        flex-direction: column;

        &__top {
          flex-grow: 1;

          &__img {
            position: relative;
            text-align: center;
            margin-left: 20%;
          }
        }

        &__middle {
          flex-grow: 25;
          text-align: center;


          &__heading {
            margin-top: 140px;
            color: white;
            font-size: 58px;

            @media #{$tablet-screen-sm-max} {
              margin-top: 70px;
              font-size: 48px;
            }

            @media #{$tablet-screen-lg-min} {
              margin-top: 80px;
              font-size: 48px;
            }

            @media #{$desktop-screen-lg-min} {
              margin-top: 190px;
              font-size: 58px;
            }
          }

          &__para {
            margin-top: 48px;
            color: white;
            font-size: 18px;

            @media #{$tablet-screen-sm-max} {
              margin-top: 28px;
            }

          }

          &__button1 {
            margin-top: 72px;

            @media #{$tablet-screen-sm-max} {
              margin-top: 32px;
            }


            button {
              padding: 19px 48px;
              color: #46B4E8;
            }
          }

          &__button2 {
            margin-top: 30px;

            button {
              position: relative;
              padding: 19px 88px 19px 48px;
              border: 1px solid #FFFFFF;
              color: white;

              > .play-icon {
                position: absolute;
                background: #64B5F3;
                right: 1%;
                top: 6%;
                width: 50px;
                height: 50px;
                padding: 16px 22px;
                border-radius: 50px;

                > i {
                  padding-right: 5px;
                  color: white;
                }
              }
            }
          }
        }

        &__bottom {
          position: relative;
          flex-grow: 1;
          display: flex;
          flex-direction: row-reverse;
          margin-left: 0;
          max-width: 100%;
          width: 100%;

          &__img {
            align-self: flex-end;
            text-align: center;
            width: 35%;
          }
        }
      }

      .last-section {
        &__bar {
          position: absolute;
          right: 1px;
          width: 10%;
        }
        &__card {
          position: absolute;
          top: 11%;
          right: 42px;
          width: 10%;
        }
        &__coin {
          position: absolute;
          z-index: 999;
          bottom: 0;
          margin-bottom: -3%;
          width: 6%;
        }
      }

    }
  }
</style>
