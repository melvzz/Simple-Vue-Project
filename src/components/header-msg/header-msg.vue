<template>
  <div class="title">
    <div class="line"></div>
    <div class="text">{{msg}}</div>
    <div class="line"></div>
  </div>

</template>

<script>
  export default {
    props: {
      msg: {
        type: String
      }
    }
  }

</script>


<style lang="stylus" rel="stylesheet/stylus">
  .title
    display: flex
    width: 100%
    .line
      flex: 1
      position: relative
      top: -0.3rem
      border-bottom: 1px solid rgba(255, 255, 255, 0.2)
    .text
      padding: 0 0.6rem
      font-weight: 700
      font-size: 0.7rem


</style>
