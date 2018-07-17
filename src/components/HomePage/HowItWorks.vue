<template>
  <div class="grid-container">
    <div class="grid-item">1</div>
    <div class="grid-item">2</div>
    <div class="grid-item">3</div>
    <div class="grid-item">4</div>
    <div class="grid-item">5</div>
    <div class="grid-item">6</div>
    <div class="grid-item section-two">7</div>
    <div class="grid-item section-two">8</div>
    <div class="grid-item section-two">9</div>
    <div class="grid-item">10</div>
    <div class="grid-item">11</div>
    <div class="grid-item">12</div>

  </div>
</template>

<script>
    export default {
      name: 'HowItWorks'
    }
</script>

<style scoped>
  .grid-container {

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto auto auto ;
    background-color: #6b0392;
    grid-column-gap: 50px;
    grid-row-gap: 25px;
    padding-left: 10%;
    padding-top: 5%;
    padding-bottom: 5%;
    padding-right: 10%;
      }
  .grid-item{
    background-color: #d17905;
  }

  .section-two{
    margin-top: 80px;
  }



</style>
