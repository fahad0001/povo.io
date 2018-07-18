<template>
  <div class="how-it-works">
  <div class="grid-container">
    <div class="item-1">How It Works?</div>
    <div class="item-2">1<span class="icon"><img src="./../../assets/img/polls@svg.svg" width="35%" alt="Logo"></span></div>
    <div class="item-3">2<span class="icon"><img src="./../../assets/img/cursor.png" width="35%" alt="Logo"></span></div>
    <div class="item-4">You have opinions. Why shouldn’t you be rewarded for them? At Povo, there are lots of way to earn points towards your next reward.</div>
    <div class="item-5"><div class="heading">Create your own polls</div>
      You’ve got a question. Ask fellow shoppers for their opinions on the latest trends, clothes, and accessories.</div>
    <div class="item-6"><div class="heading">Give us your two cents</div>
      You’ve got the trendy touch. Vote on the latest polls to help other online shoppers find the right product for them.</div>
    <div class="item-7">3<span class="icon"><img src="./../../assets/img/polls.png" width="35%" alt="Logo"></span></div>
    <div class="item-8">4<span class="icon"><img src="./../../assets/img/like.png" width="35%" alt="Logo"></span></div>
    <div class="item-9">5<span class="icon"><img src="./../../assets/img/shopping.png" width="35%" alt="Logo"></span></div>
    <div class="item-10"><div class="heading">Leave a comment</div>
      You’ve got more to say. Offer some helpful insights on polls to inspire your peers to make the perfect purchase.</div>
    <div class="item-11"><div class="heading">Get your comment Super Liked</div>
      You’re an expert. Get your Earn even more points by getting your comments noticed by poll creators.</div>
    <div class="item-12"><div class="heading">Buy products through Povo</div>
      You’re looking to shop. Buy the latest products through Povo and earn points on your purchases.</div>

  </div>
  </div>
</template>

<script>
    export default {
      name: 'HowItWorks'
    }
</script>

<style scoped>

  .how-it-works{

  }
  .icon{
    position: relative;

    bottom: 140px;
  }
  .heading{
    color: #FFFFFF;
    font-family: "F37 Ginger";
    font-size: 20px;
    font-weight: bold;
    line-height: 64px;
  }
  .grid-container {


    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-template-rows: auto auto auto auto ;
    background-color: #272E31;
    /*grid-column-gap: 1px;*/
    grid-gap: 25px 50px;
    padding: 10% 18% 10% 12%;




      }


  /*@media only screen and (max-width: 720px){*/

    /*.grid-container{*/
      /*grid-template-columns: 50% 50%;*/
    /*}*/
    /**/

  /*}*/

  .item-7,.item-8,.item-9{
    margin-top: 80px;
  }
  /*Numbers*/
  .item-2, .item-3, .item-7, .item-8, .item-9{
    height: 144px;
    width: 58px;
    opacity: 0.1;
    color: #FFFFFF;
    font-family: "F37 Ginger";
    font-size: 144px;
    font-weight: bold;
    line-height: 144px;

  }


  .item-1{
    color: #FFFFFF;
    font-family: "F37 Ginger";
    font-size: 45px;
    font-weight: bold;
    line-height: 64px;
    margin-top: 100px;
  }
  .item-4{
    opacity: 0.8;
    color: #FFFFFF;
    font-family: "F37 Ginger";
    font-size: 18px;
    line-height: 30px;
    margin-top: 50px;

  }

  .item-5 {

    color: rgba(255,255,255,0.8);
    font-family: "F37 Ginger";
    font-size: 18px;
    line-height: 30px;
  }
  .item-6 {

    color: rgba(255,255,255,0.8);
    font-family: "F37 Ginger";
    font-size: 18px;
    line-height: 30px;
  }
  .item-10 {

    color: rgba(255,255,255,0.8);
    font-family: "F37 Ginger";
    font-size: 18px;
    line-height: 30px;
  }
  .item-11 {

    color: rgba(255,255,255,0.8);
    font-family: "F37 Ginger";
    font-size: 19px;
    line-height: 30px;
  }
  .item-12 {

    color: rgba(255,255,255,0.8);
    font-family: "F37 Ginger";
    font-size: 18px;
    line-height: 30px;
  }
  .item-4,.item-5,.item-6,.item-10,.item-11,.item-12{

  }
</style>
