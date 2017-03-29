<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="titles">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}% </div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="intro">服务态度</span>
            <star class="stars" :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>

          <div class="score-wrapper">
            <span class="intro">商品评分</span>
            <star class="stars" :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>

          <div class="delivery-wrapper">
            <span class="intro">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>

        </div>
      </div>

      <split></split>

      <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc"
                    :ratings="ratings"  @ratingtype-select="ratingtypeSelect"
                    @ratingtype-toggle="ratingtypeToggle"></ratingselect>

      <div class="ratings-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType, rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28"/>
            </div>

            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score" class="stars"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length>0">
                <span :class="{'icon-thumb_up': rating.rateType===0, 'icon-thumb_down': rating.rateType===1}"></span>
                <span v-for="item in rating.recommend" class="item">{{item}}</span>
              </div>

              <div class="time">{{rating.rateTime | formatTime}}</div>

            </div>

          </li>
        </ul>
      </div>
    </div>



  </div>
</template>

<script>

  import star from 'components/star/star';
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect';
  import BScroll from 'better-scroll';
  import {formatDate} from 'common/js/date';

  const ALL = 2;
  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star: star,
      split: split,
      ratingselect: ratingselect
    },
    methods: {
      ratingtypeSelect: function(type){
        this.selectType = type;
        this.$nextTick(function(){
          if (!this.scroll){
            this.scroll = new BScroll(this.$refs.ratings, {
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
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      _initScroll: function(){
        this.scroll = new BScroll(this.$refs.ratings, {
          click: true
        });
      },
      needShow: function(rateType, text){
        if (this.onlyContent && !text){
          return false;
        }
        if (this.selectType === ALL){
          return true;
        } else {
          return this.selectType === rateType;
        }
      }
    },
    filters: {
      formatTime: function(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    data: function() {
      return {
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        },
        ratings: [],
        scroll: null
      }
    },
    created: function(){
      this.$http.get('/api/ratings').then(function(response){
        response = response.body;
        if (response.errno === ERR_OK){
          this.ratings = response.data;
          this.$nextTick(function(){
            this._initScroll();
          });
        }
      });
    }
  }

</script>


<style lang="stylus" rel="stylesheet/stylus">
  .ratings
    position: absolute
    top: 8.7rem
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      display: flex
      padding: 0.9rem 0
      .overview-left
        padding-bottom: 0.3rem
        flex: 0 0 6.87rem
        width: 6.87rem
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 6rem
          width: 6rem
        .score
          margin-bottom: 0.3rem
          line-height: 1.4rem
          font-size: 1.2rem
          color: rgb(255, 153, 0)
        .titles
          margin-bottom: 0.4rem
          line-height: 0.6rem
          font-size: 0.6rem
          color: rgb(7, 17, 27)
        .rank
          line-height: 0.5rem
          font-size: 0.5rem
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 0.3rem 0 0.3rem 1.2rem
        @media only screen and (max-width: 320px)
          padding-left: 0.5rem
        .score-wrapper
          margin-bottom: 0.4rem
          font-size: 0
          .intro
            display: inline-block
            line-height: 0.9rem
            font-size: 0.6rem
            color: rgb(7, 17, 27)
            vertical-align: top
          .stars
            display: inline-block
            margin: 0 0.6rem
            vertical-align: top
          .score
            display: inline-block
            line-height: 0.9rem
            vertical-align: top
            font-size: 0.6rem
            color: rgb(255, 153, 0)
        .delivery-wrapper
          font-size: 0
          .intro
            display: inline-block
            line-height: 0.9rem
            font-size: 0.6rem
            color: rgb(7, 17, 27)
            vertical-align: top
          .delivery
            margin-left: 0.6rem
            line-height: 0.9rem
            font-size: 0.6rem
            color: rgb(147, 153, 159)
    .ratings-wrapper
      padding: 0 0.9rem
      .rating-item
        display: flex
        padding: 0.9rem 0
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .avatar
          flex: 0 0 1.4rem
          width: 1.4rem
          margin-right: 0.6rem
          img
            border-radius: 50%
        .content
          flex: 1
          position: relative
          .name
            margin-bottom: 0.2rem
            line-height: 0.6rem
            font-size: 0.5rem
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-bottom: 0.3rem
            font-size: 0
            .stars
              display: inline-block
              margin-right: 0.3rem
              vertical-align: top
            .delivery
              display: inline-block
              font-size: 0.5rem
              color: rgb(147, 153, 159)
              vertical-align: top
          .text
            margin-bottom: 0.4rem
            line-height: 0.9rem
            font-size: 0.6rem
            color: rgb(7, 17, 27)
          .recommend
            line-height: 0.8rem
            font-size: 0
            .icon-thumb_up, .item
              display: inline-block
              margin: 0 0.4rem 0.2rem 0
              font-size: 0.5rem
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .item
              padding: 0.1rem 0.3rem
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
          .time
            position: absolute
            top: 0
            right: 0
            line-height: 0.6rem
            font-size: 0.5rem
            color: rgb(147, 153, 159)



</style>
