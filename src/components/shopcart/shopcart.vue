<template>
  <div>
    <div class="shopcart">

      <div class="content" @click="toggleList">

        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight': totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">
              {{totalCount}}
            </div>
          </div>

          <div class="price" :class="{'highlight': totalPrice>0}">
            &yen;{{totalPrice}}
          </div>

          <div class="desc">
            另需配送费&yen;{{deliveryPrice}}元
          </div>
        </div>

        <div class="content-right" >
          <div class="pay" :class="payClass" @click.stop.prevent="pay">
            {{payDesc}}
          </div>
        </div>

      </div>

      <transition name="expand">
        <div class="shopcart-list" v-show="listShow" :class="{'show': listShow === true }">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="cartFood in selectFoods" v-show="cartFood.count && cartFood.count>0">
                <span class="name">{{cartFood.food.name}}</span>

                <div class="price">
                  <span>&yen;{{cartFood.food.price * cartFood.count}}</span>
                </div>

                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="cartFood.food" :shop-foods="selectFoods"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>

    <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>

</template>

<script>

  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import BScroll from 'better-scroll';

  export default {
    data: function(){
      return {
        expand: false
      }
    },
    components: {
      cartcontrol: cartcontrol
    },
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectFoods: {
        type: Object,
        default: function(){
          return {};
        }
      }
    },
    computed: {
      totalPrice: function(){
        let total = 0;
        for (var key in this.selectFoods){
          let cartFood = this.selectFoods[key];
          total += cartFood.count * cartFood.food.price;
        }
        return total;
      },
      totalCount: function(){
        let total = 0;
        for (var key in this.selectFoods){
          let cartFood = this.selectFoods[key];
          total += cartFood.count;
        }
        return total;
      },
      payDesc: function(){
        if (this.totalPrice === 0){
          return `${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice){
          let diff = this.minPrice - this.totalPrice;
          return `还差${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass: function(){
        if (this.totalPrice < this.minPrice){
          return 'not-enough';
        } else {
          return 'enough';
        }
      },
      listShow: function(){
        if (!this.totalCount){
          return (this.expand = false);
        }
        let show = this.expand;
        if (show){
          this.$nextTick(function(){
            if (!this.scroll){
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      toggleList: function(){
        if (!this.totalCount){
          return;
        }
        this.expand = !this.expand;
      },
      empty: function(){
        this.$store.dispatch('empty');
      },
      hideList: function(){
        this.expand = false;
      },
      pay: function(){
        if (this.totalPrice < this.minPrice){
          return;
        }
        window.alert(`支付${this.totalPrice}元`);
        this.$store.dispatch('empty');
      }
    }
  };






  //      ,
  //      beforeEnter: function(el){
  //        console.log('el1: ' + el);
  //        let count = this.balls.length;
  //        while (count--){
  //          let ball = this.balls[count];
  //          if (ball.show){
  //            let rect = ball.el.getBoundingClientRect();     // 获取当前元素视图的位置
  //            let x = rect.left - 32;
  //            let y = -(window.innerHeight - rect.top -22);
  //            el.style.display = '';
  //            el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
  //            el.style.transform = `translate3d(0, ${y}px, 0)`;
  //            let inner = el.getElementsByClassName('inner-hook')[0];
  //            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
  //            inner.style.transform = `translate3d(${x}px, 0, 0)`;
  //          }
  //        }
  //      },
  //      enter: function(el){
  //        console.log('el2: ' + el);
  //        /* eslint-disable no-unused-vars */
  //        let rf = el.offsetHeight;
  //        this.$nextTick(function(){
  //          el.style.webkitTransform = 'translate3d(0, 0, 0)';
  //          el.style.transform = 'translate3d(0, 0, 0)';
  //          let inner = el.getElementsByClassName('inner-hook')[0];
  //          inner.style.webkitTransform = 'translate3d(0, 0, 0)';
  //          inner.style.transform = 'translate3d(0, 0, 0)';
  //        });
  //      },
  //      afterEnter: function(el){
  //        console.log('el3: ' + el);
  //        let ball = this.dropBalls.shift();
  //        if (ball){
  //          ball.show = false;
  //          el.style.display = 'none';
  //        }
  //      }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%;
    height: 2.4rem
    .content
      display: flex
      background: #141d27
      font-size: 0
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          position: relative
          top: -0.5rem
          margin: 0 0.5rem
          padding: 0.3rem
          width: 2.6rem
          height: 2.6rem
          box-sizing: border-box
          vertical-align: top
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 2.2rem
              font-size: 1.2rem
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 1.2rem
            height: 0.8rem
            line-height: 0.8rem
            text-align: center
            border-radius: 16px
            font-size: 0.5rem
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 0.6rem
          line-height: 1.2rem
          padding-right: 0.6rem
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 0.8rem
          font-weight: 700
          color: rgba(255, 255, 255, 0.4)
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          line-height: 1.2rem
          margin: 0.6rem 0 0 0.6rem
          color: rgba(255, 255, 255, 0.4)
          font-size: 0.5rem
      .content-right
        flex: 0 0 5.25rem
        width: 5.25rem
        .pay
          height: 2.4rem
          line-height: 2.4rem
          text-align: center
          font-size: 0.6rem
          font-weight: 700
          color: rgba(255, 255, 255, 0.4)
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .shopcart-list
      position: absolute
      top: 0
      left: 0
      z-index: -1
      width: 100%
      transition: all 0.5s
      &.show
        transform: translate3d(0, -100%, 0)
      &.expand-enter, &.expand-leave-active
        transform: translate3d(0, 0, 0)
      .list-header
        padding: 0 0.9rem
        height: 2rem
        line-height: 2rem
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          display: inline-block
          width: 50%
          font-size: 0.7rem
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 0.6rem
          color: rgb(0, 160, 220)
      .list-content
        padding: 0 0.8rem
        max-height: 10.8rem
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 0.6rem 0
          box-sizing: border-box
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border-bottom: 0
          .name
            line-height: 1.2rem
            font-size: 0.7rem
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 4.5rem
            bottom: 0.6rem
            line-height: 1.2rem
            font-size: 0.7rem
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 0.3rem
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    backdrop-filter: blur(10px)
    transition: all 0.4s linear
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0)


</style>
