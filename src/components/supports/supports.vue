<template>

  <ul class="supports">
    <li class="support-item" v-for="(item, $index) in supports">
      <span class="icon-wrapper">
        <icon class="bg-icon" :index="item.type" :num="num"></icon>
      </span>
      <span class="text">{{item.description}}</span>
    </li>
  </ul>

</template>

<script>
  import icon from 'components/icon/icon';

  export default {
    props: {
      supports: {
        type: Array,
        default: function(){
          return [];
        }
      },
      num: {
        type: Number
      }
    },
    components: {
      icon: icon
    }
  }

</script>


<style lang="stylus" rel="stylesheet/stylus">
  .supports
    width: 100%
    .support-item
      padding: 0 0.6rem
      margin-bottom: 0.6rem
      font-size: 0
      &:last-child
       margin-bottom: 0
      .icon-wrapper
        display: inline-block
        width: 0.8rem
        height: 0.8rem
        vertical-align: top
        margin-right: 0.3rem
        .bg-icon
          background-size: 0.8rem 0.8rem
      .text
        line-height: 0.8rem
        font-size: 0.7rem

</style>
