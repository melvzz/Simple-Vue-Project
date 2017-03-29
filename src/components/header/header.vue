<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64"/>
      </div>

      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>

        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
        </div>

        <div v-if="seller.supports" class="support">
          <span class="icon-wrapper">
            <icon class="bg-icon" :index="seller.supports[0].type" :num="1"></icon>
          </span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>

      </div>

      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>


    </div>

    <div class="bulletin-wrapper" @click="showDetail">
		  <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>

    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%"/>
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :score="seller.score" :size="48"></star>
            </div>

            <div class="msg-wrapper">
              <msg :msg="msg_1"></msg>
            </div>

            <div class="supports-wrapper" v-if="seller.supports">
              <supports :supports="seller.supports" :num="2"></supports>
            </div>

            <div class="msg-wrapper">
              <msg :msg="msg_2"></msg>
            </div>

            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>

          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
      </div>
    </transition>
  </div>
</template>

<script>

  import star from 'components/star/star';
  import msg from 'components/header-msg/header-msg';
  import icon from 'components/icon/icon';
  import supports from 'components/supports/supports';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data: function(){
      return {
        detailShow: false,
        msg_1: '优惠信息',
        msg_2: '商家公告'
      };
    },
    methods: {
      showDetail: function(){
        this.detailShow = true;
      },
      hideDetail: function(){
        this.detailShow = false;
      }
    },
    components: {
      star: star,
      msg: msg,
      icon: icon,
      supports: supports
    }
  };
</script>


<style lang="stylus" rel="stylesheet/stylus">

  @import "../../common/stylus/mixin.styl";

  .header
    position: relative
    color: #fff
    overflow: hidden
    background-color: rgba(7, 17, 27, 0.5)
    .content-wrapper
      position: relative
      padding: 1.2rem 0.6rem 0.9rem 1.2rem
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 0.8rem
        .title
          margin: 0.1rem 0 0.4rem 0
          .brand
            display: inline-block
            vertical-align: top
            width: 1.5rem
            height: 0.9rem
            bg-image('brand')
            background-size: 1.5rem 0.9rem
            background-repeat: no-repeat
          .name
            margin-left: 0.3rem
            font-size: 0.8rem
            font-weight: bold
            line-height: 0.9rem
        .description
          margin-bottom: 0.5rem
          font-size: 0.6rem
        .support
          .icon-wrapper
            display: inline-block
            vertical-align: top
            width: 0.6rem
            height: 0.6rem
            margin-right: 0.2rem
            .bg-icon
              background-size: 0.6rem 0.6rem
          .text
            line-height: 0.6rem
            font-size: 10px
      .support-count
        position: absolute
        right: 0.6rem
        bottom: 0.7rem
        padding: 0 0.4rem
        height: 1.2rem
        line-height: 1.2rem
        border-radius: 0.7rem
        background-color: rgba(0, 0, 0, 0.2)
        text-align: center
        .count
          vertical-align: top
          font-size: 0.5rem
        .icon-keyboard_arrow_right
          margin-left: 0.1rem
          line-height: 1.2rem
          font-size: 0.5rem
    .bulletin-wrapper
      position: relative
      height: 1.4rem
      line-height: 1.4rem
      padding: 0 1.1rem 0 0.6rem
      white-space: nowrap
      overflow: hidden;
      text-overflow: ellipsis
      background-color: rgba(7, 17, 27, 0.2)
      .bulletin-title
        display: inline-block
        vertical-align: top
        margin-top: 0.4rem
        width: 1.1rem
        height: 0.6rem
        bg-image('bulletin')
        background-size: 1.1rem 0.6rem
        background-repeat: no-repeat
      .bulletin-text
        vertical-align: top
        margin:0 0.2rem
        font-size: 0.5rem
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 0.5rem
        right: 0.6rem
        top: 0.4rem
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
    .detail
      position: fixed
      z-index: 100
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: auto
      background: rgba(7, 17, 27, 0.8)
      backdrop-filter: blur(10px)
      &.fade-enter-active, &.fade-leave-active
        transition: opacity 0.5s
      &.fade-enter, &.fade-leave-active
        opacity: 0
      .detail-wrapper
        width: 100%
        min-height: 100%
        .detail-main
          margin-top: 3.2rem
          padding-bottom: 3.2rem
          .name
            line-height: 0.8rem
            text-align: center
            font-size: 0.8rem
            font-weight: 700
          .star-wrapper
            margin-top: 0.9rem
            padding: 0.1rem 0
            text-align: center
          .msg-wrapper
            width: 80%
            margin: 1.4rem auto 1.2rem auto
          .supports-wrapper
            width: 80%
            margin: 0 auto
          .bulletin
            width: 80%
            margin: 0 auto
            .content
              padding: 0 0.6rem
              line-height: 1.2rem
              font-size: 0.6rem
      .detail-close
        position: relative
        width: 1.6rem
        height: 1.6rem
        margin: -3.2rem auto 0 auto
        clear: both
        font-size: 1.6rem

</style>
