<template>
  <section class="card-main">
    <h1>欢迎页面</h1>
    <el-button @click="selPlates" class="com-trans50-l card-btn-c" type="primary" round>制作专属贺卡</el-button>
  </section>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
      selPlates () {
          this.$router.push({name: 'plates'})
      }
  }
}
</script>
<style lang="scss" scoped>
  .card-main { height: 100%; }
  .card-btn-c {
    bottom: 15%;
  }
</style>
