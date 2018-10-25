<template>
  <section class="card-main">
    <div class="card-box">
      <div class="img-box" :style="{backgroundImage: 'url(' + imgUrl + ')'}">
      </div>
    </div>
    <ul class="card-pls">
      <li :class="{active: id === '01'}" @click="selPlate('01')"></li>
      <li :class="{active: id === '02'}" @click="selPlate('02')"></li>
      <li :class="{active: id === '03'}" @click="selPlate('03')"></li>
      <li :class="{active: id === '04'}" @click="selPlate('04')"></li>
    </ul>
    <div class="card-next">
      <span class="btn" @click="goNext">下一步</span>
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      id: '01',
      imgUrl: require('../../../assets/img/plate/plate_01.png')
    }
  },
  methods: {
    selPlate (id) {
      this.imgUrl = require('../../../assets/img/plate/plate_' + id + '.png')
      this.id = id
    },
    goNext () {
      this.$router.push({name: 'edit', query: {id: this.id}})
    }
  }
}
</script>
<style lang="scss" scoped>
  .card-main {
    width: 100%;
    height: 100%;
    .card-box {
      width: 100%;
      height: calc(100% - 183px);
      background: #282828;
      padding: 20px 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      .img-box {
        width: 100%;height: 100%;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
      }
    }
    .card-pls {
      width: 100%;
      height: 109px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding: 18px 0 10px;
      > li {
        margin-right: 5px;
        width: 22%;height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        &:last-child {margin-right: 0;}
      }
      > li:nth-child(1) {
        background: url(../../../assets/img/plate/thumb_01.jpg) no-repeat;
        background-size: 100% 100%;
      }
      > li:nth-child(2) {
        background: url(../../../assets/img/plate/thumb_02.jpg) no-repeat;
        background-size: 100% 100%;
      }
      > li:nth-child(3) {
        background: url(../../../assets/img/plate/thumb_03.jpg) no-repeat;
        background-size: 100% 100%;
      }
      > li:nth-child(4) {
        background: url(../../../assets/img/plate/thumb_04.jpg) no-repeat;
        background-size: 100% 100%;
      }
      > li.active {
        border: 4px solid #82756A;
      }
    }
    .card-next {
      width: 100%;
      height: 66px;
      padding-top: 8px;
      .btn {
        display: inline-block;
        width: 92%;
        height: 50px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #82756A;
        border-radius:4px;
        color: #fff;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
      }
    }
  }
</style>
