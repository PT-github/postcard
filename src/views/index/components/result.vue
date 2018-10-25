<template>
  <div class="result">
    <div class="header">
      <p class="user-name">尊敬的{{phone}}</p>
      <p style="margin-top: 10px">感谢您完成了本次满意度调查</p>
      <p>我们将竭诚为您提供更好的服务!</p>
    </div>
    <!-- <div class="code">
      <img src="../../../assets/img/bgimg/bgimg_01.jpg" alt="">
    </div> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      phone: null
    }
  },
  created () {
    if (this.$route.query.phone) {
      this.phone = this.$route.query.phone;
    }
  }
}
</script>
<style lang="scss" scoped>
.result {
  width: 100%;
  height: 100%;
  background-image: url(../../../assets/img/question/result.png);
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
  background-position: 0 0;
  background-repeat: no-repeat;
  .header {
    width: 100%;
    position: absolute;
    bottom: 15%;
    padding: 0 5%;
    color: #fff;
    text-align: center;
    .user-name {
      width: 60%;
      height: 50px;
      margin: 0 auto;
      line-height: 50px;
      background-color: #fff;
      border-radius: 15px;
      font-size: 18px;
      font-weight:bold;
      z-index:1;
      color: #45a7d9;
    }
  }
}
@media screen and (max-width: 330px) {
  .result {
    .header {
      .user-name {
        font-size: 16px;
      }
    }
  }
}
</style>
