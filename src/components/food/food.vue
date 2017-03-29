<template>
  <transition name="move">
    <div ref="food" class="food-detail" v-show="showFlag">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image"/>
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>

        <div class="content">
          <h1 class="title">{{food.name}}</h1>

          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>

          <div class="price">
            <span class="now">&yen;{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">&yen;{{food.oldPrice}}</span>
          </div>

          <div class="carcontrol-wrapper">
            <cartcontrol :food="food" :shop-foods="shopFoods"></cartcontrol>
          </div>
          <div class="buy" v-show="!isShow" @click="addFirst">加入购物车</div>

        </div>

        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品介绍</h1>
          <p class="text">{{food.info}}</p>
        </div>

        <split></split>

        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc"
                        :ratings="food.ratings" @ratingtype-select="ratingtypeSelect"
              @ratingtype-toggle="ratingtypeToggle"></ratingselect>

          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" class="rating-item">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" width="12" height="12" class="avatar"/>
                </div>

                <div class="time">
                  {{rating.rateTime | formatDate}}
                </div>

                <p class="text">
                  <span :class="{'icon-thumb_up': rating.rateType===0, 'icon-thumb_down': rating.rateType===1}"></span>
                  {{rating.text}}
                </p>

              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>

        </div>

      </div>
    </div>
  </transition>

</template>

<script>
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect';
  import {formatDate} from 'common/js/date';
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

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
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
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
      }
    },
    methods: {
      show: function(){
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = false;
        this.$nextTick(function(){
          if (!this.scroll){
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide: function(){
        this.showFlag = false;
      },
      addFirst: function(event){
        if (!event._constructed){
          return;
        }
        let food = this.food;
        this.$store.dispatch('updateCart', {food: food, count: 1});
      },
      ratingtypeSelect: function(type){
        this.selectType = type;
        this.$nextTick(function(){
          if (!this.scroll){
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      ratingtypeToggle: function(onlyContent){
        this.onlyContent = onlyContent;
        this.$nextTick(function(){
          if (!this.scroll){
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      needShow: function(type, text){
        if (this.onlyContent && !text){
          return false;
        }
        if (this.selectType === ALL){
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    components: {
      cartcontrol: cartcontrol,
      split: split,
      ratingselect: ratingselect
    },
    filters: {
      formatDate: function(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
  }

</script>


<style lang="stylus" rel="stylesheet/stylus">
  .food-detail
    position: fixed
    left: 0
    top: 0
    bottom: 2.4rem
    z-index: 30
    width: 100%
    background: #fff
    transition: all, 0.2s linear
    transform: translate3d(0, 0, 0)
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 0.5rem
        left: 0
        .icon-arrow_lift
          display: block
          padding: 0.5rem
          font-size: 1rem
          color: #fff
    .content
      position: relative
      padding: 0.9rem
      .title
        line-height: 0.7rem
        margin-bottom: 0.4rem
        font-size: 0.7rem
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 0.9rem
        height: 0.5rem
        line-height: 0.5rem
        font-size: 0
        .sell-count, .rating
          font-size: 0.5rem
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 0.6rem
      .price
        font-weight: 700
        line-height: 1.2rem
        .now
          margin-right: 0.4rem
          font-size: 0.7rem
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 0.5rem
          color: rgb(147, 153, 159)
      .carcontrol-wrapper
        position: absolute
        right: 0.6rem
        bottom: 0.6rem
      .buy
        position: absolute
        right: 0.9rem
        bottom: 0.9rem
        z-index: 10
        line-height: 1.2rem
        padding: 0 0.6rem
        box-sizing: border-box
        border-radius: 12px
        font-size: 0.5rem
        color: #fff
        background: rgb(0, 160, 220)
    .info
      padding: 0.9rem
      .title
        line-height: 0.7rem
        margin-bottom: 0.3rem
        font-size: 0.7rem
        color: rgb(7, 17, 27)
      .text
        padding: 0 0.3rem
        line-height: 1.2rem
        font-size: 0.6rem
        font-weight: 200
        color: rgb(77, 85, 93)
    .rating
      padding-top: 0.9rem
      .title
        line-height: 0.7rem
        margin-left: 0.9rem
        font-size: 0.7rem
        color: rgb(7, 17, 27)
      .rating-wrapper
        padding: 0 0.9rem
        .rating-item
          position: relative
          padding: 0.8rem 0
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          .user
            position: absolute
            right: 0
            top: 0.8rem
            line-height: 0.6rem
            font-size: 0
            .name
              display: inline-block
              margin-right: 0.8rem
              vertical-align: top
              font-size: 0.5rem
              color: rgb(147, 153, 159)
            .avatar
              border-radius: 50%
          .time
            margin-bottom: 0.3rem
            line-height: 0.6rem
            font-size: 0.5rem
            color: rgb(147, 153, 159)
          .text
            line-height: 0.8rem
            font-size: 0.6rem
            color: rgb(7, 17, 27)
            .icon-thumb_up, .icon-thumb_down
              line-height: 0.8rem
              margin-right: 0.2rem
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)
        .no-rating
          padding: 0.8rem 0
          font-size: 0.6rem
          color: rgb(147, 153, 159)
</style>
