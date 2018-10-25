<template>
  <section class="card-main">
    <h1>模板选择</h1>
    <ul class="card-pls">
      <li @mouseup="selPlate('01')">
        <h3>模板一</h3>
        <!-- <img src="../../../assets/img/plate/plate_01.png" alt=""> -->
      </li>
      <li @mouseup="selPlate('02')">
        <h3>模板二</h3>
        <!-- <img src="../../../assets/img/plate/plate_02.jpg" alt=""> -->
      </li>
      <li @mouseup="selPlate('03')">
        <h3>模板三</h3>
        <!-- <img src="../../../assets/img/plate/plate_03.png" alt=""> -->
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    selPlate (id) {
      this.$router.push({name: 'edit', query: {id: id}})
    }
  }
}
</script>
<style lang="scss" scoped>
  .card-main { height: 100%; }
  .card-pls {
    > li {
      text-align: center;
      > img {
        max-width: 100%;
      }
    }
  }
</style>
