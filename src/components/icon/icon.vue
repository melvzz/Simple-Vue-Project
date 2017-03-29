<template>
  <span class="v-icon" :class="iconType"></span>
</template>

<script>
  export default {
    created: function(){
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    props: {
      index: {
        type: Number
      },
      num: {
        type: Number
      }
    },
    computed: {
      iconType: function(){
        let iconClass = '';
        if (this.index >= 0){
          iconClass = this.classMap[this.index] + '-' + this.num;
        }
        return iconClass;
      }
    }
  }

</script>


<style lang="stylus" rel="stylesheet/stylus">

  @import "../../common/stylus/mixin.styl";

  .v-icon
    display: inline-block
    width: 100%
    height: 100%
    background-repeat: no-repeat
    &.decrease-1
      bg-image('decrease_1')
    &.discount-1
      bg-image('discount_1')
    &.guarantee-1
      bg-image('guarantee_1')
    &.invoice-1
      bg-image('invoice_1')
    &.special-1
      bg-image('special_1')
    &.decrease-2
      bg-image('decrease_2')
    &.discount-2
      bg-image('discount_2')
    &.guarantee-2
      bg-image('guarantee_2')
    &.invoice-2
      bg-image('invoice_2')
    &.special-2
      bg-image('special_2')
    &.decrease-3
      bg-image('decrease_3')
    &.discount-3
      bg-image('discount_3')
    &.guarantee-3
      bg-image('guarantee_3')
    &.invoice-3
      bg-image('invoice_3')
    &.special-3
      bg-image('special_3')
    &.decrease-4
      bg-image('decrease_4')
    &.discount-4
      bg-image('discount_4')
    &.guarantee-4
      bg-image('guarantee_4')
    &.invoice-4
      bg-image('invoice_4')
    &.special-4
      bg-image('special_4')


</style>
