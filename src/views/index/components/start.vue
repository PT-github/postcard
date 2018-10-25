<template>
  <div class="start">
    <div class="footer">
      <router-link class="submit" :to="{ path: '/plates' }">制作我的专属贺卡</router-link>
      <img class="ewm" src="../../../assets/img/plate/start_bottom.jpg" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name: 'start',
  data () {
    return {
      imageUrl: require('../../../assets/img/plate/start_top.jpg')
    }
  },
  created () {
    const loading = this.$loading({
      lock: true,
      text: '加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.3)'
    });
    var image = new Image()
    image.onload = function () {
      loading.close()
    }
    image.src = this.imageUrl
  }
}
</script>
<style lang="scss" scoped>
.start {
  width: 100%;
  height: 100%;
  background-image: url('../../../assets/img/plate/start_top.jpg');
  background-size: 100% auto;
  background-repeat: no-repeat;
  text-align: center;
  .footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    .ewm {
      width: 100%;
    }
    .submit {
      display: block;
      width: 94%;
      height: 50px;
      line-height: 50px;
      margin: 0 auto;
      background: #82756A;
      font-size: 16px;
      color: #FFF;
      border-radius: 4px;
    }
  }
  
  // > img {
  //   display: block;
  //   width:100%;
  //   height: auto;
  // }
  // .start-bottom {
  //   width: 100%;
  //   height: 14%;
  //   position: absolute;
  //   bottom: 0;
  //   background: url('../../../assets/img/plate/start_bottom.jpg') no-repeat;
  //   background-size: contain;
  //   background-position: center center;
  // }
}
</style>

