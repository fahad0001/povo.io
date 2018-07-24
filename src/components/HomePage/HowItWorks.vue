<template>
  <div class="how-it-works">
    <span id="walletandcoins"><img src="./../../assets/img/wallet and coins@2x.png" width="10%" alt="Logo"></span>
    <span id="darkbg1"><img src="./../../assets/img/darkbg1.png" alt="Logo"></span>
    <span id="darkbg2"><img src="./../../assets/img/darkbg2.png" alt="Logo"></span>

    <div class="grid-container">
    <div class="item-1">How It Works?</div>
      <div class="item-2"><span class="number">1</span><span class="number-icons"><img src="./../../assets/img/polls@svg.svg" width="6%" alt="Logo"></span></div>
    <div class="item-3"><span class="number">2</span><span class="number-icons"><img src="./../../assets/img/cursor.png" width="6%" alt="Logo"></span></div>
    <div class="item-4">You have opinions. Why shouldn’t you be rewarded for them? At Povo, there are lots of way to earn points towards your next reward.</div>
    <div class="item-5"><div class="text-headings">Create your own polls</div>
      You’ve got a question. Ask fellow shoppers for their opinions on the latest trends, clothes, and accessories.</div>
    <div class="item-6"><div class="text-headings">Give us your two cents</div>
      You’ve got the trendy touch. Vote on the latest polls to help other online shoppers find the right product for them.</div>
    <div class="item-7"><span class="number">3</span><span class="number-icons"><i style="color: #46b4e8" class="fa fa-commenting"></i></span></div>
    <div class="item-8"><span class="number">4</span><span class="number-icons"><img src="./../../assets/img/like.png" width="6%" alt="Logo"></span></div>
    <div class="item-9"><span class="number">5</span><span class="number-icons"><img src="./../../assets/img/shopping.png" width="6%" alt="Logo"></span></div>
    <div class="item-10"><div class="text-headings">Leave a comment</div>
      You’ve got more to say. Offer some helpful insights on polls to inspire your peers to make the perfect purchase.</div>
    <div class="item-11"><div class="text-headings">Get your comment Super Liked</div>
      You’re an expert. Get your Earn even more points by getting your comments noticed by poll creators.</div>
    <div class="item-12"><div class="text-headings">Buy products through Povo</div>
      You’re looking to shop. Buy the latest products through Povo and earn points on your purchases.</div>

  </div>

    <span id="tickets"><img src="./../../assets/img/tickets.png" width="6%" alt="Logo"></span>
  </div>
</template>

<script>
    export default {
      name: 'HowItWorks'
    }
</script>

<style lang="scss" scoped>

  #darkbg1{
    position: absolute;
    left: 15%;
  }
  #darkbg2{
    position: absolute;
    top: 56px;
    left: 88%;
  }
  #walletandcoins{

    position: relative;
    top: 134px;
    left: 3%;

  }
  #tickets{
    position: relative;
    left: 90%;
    bottom: 48px;
  }
  .how-it-works{
    position: relative;
    background-color: #272E31;
  }
  .number-icons{
    position: relative;
    right: 26%;
  }
  .text-headings{
    color: #FFFFFF;
    font-size: 20px;
    font-weight: bold;
    line-height: 64px;
  }
  .grid-container {
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-template-rows: auto auto 200px auto ;
    /*grid-column-gap: 1px;*/
    grid-gap: 5px 50px;
    margin: 5% 18% 5% 12%;
  }

  /*Numbers in second row*/
  .item-7,.item-8,.item-9{
    align-self: end;
  }
  /*Numbers*/
  .number{
    height: 144px;
    width: 58px;
    opacity: 0.1;
    color: #FFFFFF;
    font-size: 144px;
    font-weight: bold;
    line-height: 144px;

  }
  /*Text*/
  .item-12,.item-11,.item-10,.item-6,.item-5,.item-4 {

    color: rgba(255,255,255,0.8);
    font-size: 16px;
    line-height: 30px;
  }
  .item-1{
    color: #FFFFFF;
    font-size: 40px;
    font-weight: bold;
    line-height: 64px;
    /*margin-top: 100px;*/
    align-self: end;
  }
  .item-4{

    align-self: end;
    margin-top: 50px;

  }
  @media only screen and (max-width: 720px) {

    .grid-container{
      grid-template-columns: 50% 50%;
      grid-template-rows: auto auto auto auto auto auto;

    }
    .item-3{
      grid-row: 3/4;
      grid-column: 1/2;
    }
    .item-6{
      grid-row: 4/5;
      grid-column: 1/2;
    }
    .item-10{
      grid-row:4/5 ;
      grid-column: 2/3;
    }

  }
</style>
