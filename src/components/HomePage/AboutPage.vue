<template>
  <div id="about-page">
    <div class="about-wrapper">
      <div class="about-wrapper__scroll-icon">
        <div>
          <img src="./../../assets/img/scroll@svg.svg" width="65%" alt="Logo">
        </div>
      </div>
      <div class="about-wrapper__brand-pattern">
        <img src="./../../assets/img/Brand pattern@svg.svg" height="100%" width="100%" alt="Logo">
      </div>
      <div class="about-wrapper__bg-about">
        <img src="./../../assets/img/about bg@svg.svg" width="100%" alt="Logo">
      </div>
      <div class="about-wrapper__head-container">
        <div class="head-content">
          <div>
            <h1>About the<br/> platform</h1>
          </div>
          <div>
            <p class="head-para">Povo is a <span>free social shopping experience</span> where you can earn rewards in the form of gift cards in exchange for feedback on the latest cloths, accessories and products.</p>
          </div>
          <div>
            <p>To build a better online shopping experience, collaborate with others and earn points to redeem rewards.</p>
          </div>
        </div>
        <div class="body-content">
          <div>
            <img src="./../../assets/img/nike.png" width="65%" alt="Logo">
          </div>
          <div>
            <img src="./../../assets/img/adidas.png" width="65%" alt="Logo">
          </div>
          <div>
            <img src="./../../assets/img/american apparel.png" width="65%" alt="Logo">
          </div>
          <div>
            <img src="./../../assets/img/vans.png" width="65%" alt="Logo">
          </div>
          <div>
            <img src="./../../assets/img/levis.png" width="65%" alt="Logo">
          </div>
          <div>
            <img src="./../../assets/img/puma.png" width="65%" alt="Logo">
          </div>
          <div>
            <img src="./../../assets/img/reebok.png" width="65%" alt="Logo">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'AboutPage'
  }
</script>
<style lang="scss" scoped>
  [id="about-page"] {
    height: 625px;

    .about-wrapper {
      position: relative;
      &__brand-pattern {
        position: absolute;
        z-index: 999;
        margin-top: -6%;
        width: 28%;
      }

      &__scroll-icon {
        display: flex;
        width: 100%;
        justify-content: center;

        div {
          position: absolute;
          text-align: center;
          align-self: center;
          padding: 22px 20px 16px 20px;
          border-radius: 32px;
          width: 60px;
          background-color: #FFFFFF;
          box-shadow: 0 10px 30px 0 rgba(107,128,139,0.2);        }
      }

      &__bg-about {
        position: absolute;
        right: 0;
        width: 20%;
      }

      &__head-container {
        margin-left: 15%;
        width: 75%;
        height: 100%;
        display: grid;
        grid-template-rows: 340px 280px;

        @media #{$tablet-screen-sm-max} { grid-template-rows: 420px 200px;}

        > .head-content {
          display: grid;
          align-content: space-around;
          grid-auto-flow: column;

          @media #{$tablet-screen-sm-max} { grid-auto-flow: row; margin-top: 2%}

          > div {
            margin: 5px;
            padding: 10px;

            > h1 {
              font-size: 48px;
              font-weight: bolder;
            }

            > p {
              font-size: 18px;

              > span {
                font-weight: bolder;
              }
            }

            > .head-para {
              margin-left: 25%;

              @media #{$tablet-screen-md-max} {margin-left: 0;}
            }
          }
        }
        > .body-content {
          display: grid;
          text-align: center;
          align-content: space-evenly;
          align-self: flex-start;
          grid-auto-flow: column;
          grid-gap: 2%;

          @media #{$tablet-screen-sm-max} {align-self: center}

        }
      }

    }
  }
</style>
