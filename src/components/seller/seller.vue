<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>

        <div class="desc">
          <star :size="36" :score="seller.score" class="stars"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>

        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>

          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>

          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>

        </ul>

        <div class="favorite" @click="toggleFavorite" >
          <span class="icon-favorite" :class="{'active': favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>

      </div>

      <split></split>

      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
      </div>

      <div class="supports-wrapper" v-if="seller.supports">
        <supports :supports="seller.supports" :num="4"></supports>
      </div>

      <split></split>

      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90"/>
            </li>
          </ul>
        </div>
      </div>

      <split></split>

      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>


    </div>
  </div>
</template>

<script>

  import BScroll from 'better-scroll';
  import star from 'components/star/star';
  import split from 'components/split/split';
  import supports from 'components/supports/supports';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star: star,
      split: split,
      supports: supports
    },
    watch: {
      seller: function(){
        this._initScroll();
        this._initPics();
      }
    },
    mounted: function(){    // DOM 渲染完成后
      this._initScroll();
      this._initPics();
    },
    methods: {
      _initScroll: function(){
        if (!this.scroll){
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPics: function(){
        if (this.seller.pics){
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(function(){
            if (!this.picScroll){
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'        // 忽略垂直滚动
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      },
      toggleFavorite: function(event){
        if (!event._constructed){
          return;
        }
        this.favorite = !this.favorite;
      }
    },
    data: function(){
      return {
        favorite: false
      }
    },
    computed: {
      favoriteText: function(){
        return this.favorite? '已收藏':'收藏'
      }
    }
  }

</script>


<style lang="stylus" rel="stylesheet/stylus">
  .seller
    position: absolute
    top: 8.7rem
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      position: relative
      padding: 0.9rem
      .title
        margin-bottom: 0.4rem
        line-height: 0.7rem
        font-size: 0.7rem
        color: rgb(7, 17, 27)
      .desc
        padding-bottom: 0.9rem
        line-height: 0.9rem
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        font-size: 0
        .stars
          display: inline-block
          margin-right: 0.4rem
          vertical-align: top
        .text
          display: inline-block
          margin-right: 0.6rem
          line-height: 0.9rem
          font-size: 0.5rem
          color: rgb(77, 85, 93)
      .favorite
        position: absolute
        width: 2rem
        right: 0.9rem
        top: 0.9rem
        text-align: center
        .icon-favorite
          display: block
          margin-bottom: 0.2rem
          line-height: 1.2rem
          font-size: 1.2rem
          color: #d4d6d9
          &.active
            color: rgb(240, 20, 20)
        .text
          line-height: 0.5rem
          font-size: 0.5rem
          color: rgb(77, 85, 93)
      .remark
        display: flex
        padding-top: 0.9rem
        .block
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border-right: 0
          h2
            margin-bottom: 0.2rem
            line-height: 0.5rem
            font-size: 0.5rem
            color: rgb(147, 153, 159)
          .content
            line-height: 1.2rem
            font-size: 0.5rem
            font-weight: 200
            color: rgb(7, 17, 27)
          .stress
            font-size: 1.2rem
    .bulletin
      padding: 0.9rem 0.9rem 0 0.9rem
      .title
        margin-bottom: 0.4rem
        line-height: 0.7rem
        font-size: 0.7rem
        color: rgb(7, 17, 27)
      .content-wrapper
        padding: 0 0.6rem 0.8rem 0.6rem
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .content
          line-height: 1.2rem
          font-size: 0.6rem
          font-weight: 200
          color: rgb(240, 20, 0)
    .supports-wrapper
      padding: 0.8rem 0.6rem
    .pics
      padding: 0.9rem
      .title
        margin-bottom: 0.6rem
        line-height: 0.7rem
        font-size: 0.7rem
        color: rgb(7, 17, 27)
      .pic-wrapper
        width: 100%
        overflow: hidden
        white-space: nowrap
        .pic-list
          font-size: 0
          .pic-item
            display: inline-block
            margin-right: 0.3rem
            &:last-child
              margin-right: 0
    .info
      padding: 0.9rem 0.9rem 0 0.9rem
      .title
        padding-bottom: 0.6rem
        line-height: 0.7rem
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        font-size: 0.7rem
        color: rgb(7, 17, 27)
      .info-item
        padding: 0.8rem 0.6rem
        line-height: 0.8rem
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        font-size: 0.6rem
        font-weight: 200
        color: rgb(7, 17, 27)
        &:last-child
          border-bottom: 0







</style>
