<template>
  <div class="cart-control">
    <transition name="move">
      <div class="cart-decrease" v-show="isShow" @click.stop.prevent="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="isShow">{{count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      },
      shopFoods: {
        type: Object,
        default: function () {
          return {};
        }
      }
    },
    data: function(){
      return {
      }
    },
    computed: {
      isShow: function(){
        let currentFood = this.shopFoods[this.food.id];
        if (currentFood !== undefined){
          if (currentFood.count > 0){
            return true;
          }
        }
        return false;
      },
      count: function(){
        let currentFood = this.shopFoods[this.food.id];
        if (currentFood !== undefined){
          if (currentFood.count > 0){
            return currentFood.count;
          }
        }
        return 0;
      }
    },
    methods: {
      addCart: function(event){
        if (!event._constructed){   // 阻止浏览器的点击事件, 派发 better-scroll 的点击事件
          return;
        }
        let food = this.food;
        let count = this.count;
        count++;
        this.$store.dispatch('updateCart', {food: food, count: count});
      },
      decreaseCart: function(event){
        if (!event._constructed){   // 阻止浏览器的点击事件, 派发 better-scroll 的点击事件
          return;
        }
        let food = this.food;
        if (this.count){
          let count = this.count-1;
          this.$store.dispatch('updateCart', {food: food, count: count});
        }
      }
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  .cart-control
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 0.3rem
      transition: all 0.4s linear
      .inner
        display: inline-block
        line-height: 1.2rem
        font-size: 1.2rem
        color: rgb(0, 160, 220)
        transition: all 0.4s linear
        transform: rotate(0)
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3d(1.2rem, 0, 0)
        .inner
          transform: rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 0.6rem
      padding-top: 0.3rem
      line-height: 1.2rem
      font-size: 0.5rem
      color: rgb(147, 153, 159)
      text-align: center
    .cart-add
      display: inline-block
      padding: 0.3rem
      line-height: 1.2rem
      font-size: 1.2rem
      color: rgb(0, 160, 220)
</style>
