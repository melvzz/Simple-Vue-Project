<template>
  <div class="rating-select">
    <div class="rating-type">
      <span class="block positive" :class="{'active': mySelectType === 2 }" @click="select(2, $event)">
        {{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span class="block positive" :class="{'active': mySelectType === 0 }" @click="select(0, $event)">
        {{desc.positive}}
        <span class="count">{{positives.length}}</span>
      </span>
      <span class="block negative" :class="{'active': mySelectType === 1 }" @click="select(1, $event)">
        {{desc.negative}}
        <span class="count">{{negatives.length}}</span>
      </span>
    </div>

    <div @click="toggleContent" class="switch" :class="{'on': onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>

  </div>

</template>

<script>
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: {
      ratings: {
        type: Array,
        default: function(){
          return [];
        }
      },
      selectType: {
        type: Number,
        default: NEGATIVE
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default: function(){
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    data: function(){
      return {
        mySelectType: this.selectType,
        myOnlyContent: this.onlyContent
      }
    },
    methods: {
      select: function(type, event){
        if (!event._constructed){
          return;
        }
        console.log('111 ' + type);
        this.mySelectType = type;
      },
      toggleContent: function(event){
        if (!event._constructed){
          return;
        }
        this.myOnlyContent = !this.myOnlyContent;
      }
    },
    watch: {
      mySelectType: function(type){
        this.$emit('ratingtype-select', type);
      },
      myOnlyContent: function(onlyContent){
        this.$emit('ratingtype-toggle', onlyContent);
      },
      selectType: function(type){
        this.mySelectType = type;
      },
      onlyContent: function(onlyContent){
        this.myOnlyContent = onlyContent;
      }
    },
    computed: {
      positives: function(){
        return this.ratings.filter(function(rating){
          return rating.rateType === POSITIVE;
        });
      },
      negatives: function(){
        return this.ratings.filter(function(rating){
          return rating.rateType === NEGATIVE;
        });
      }
    }
  };
</script>


<style lang="stylus" rel="stylesheet/stylus">
  .rating-select
    .rating-type
      padding: 0.9rem 0
      margin: 0 0.9rem
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      font-size: 0
      .block
        display: inline-block
        padding: 0.4rem 0.6rem
        margin-right: 0.4rem
        line-height: 0.8rem
        border-radius: 1px
        font-size: 0.6rem
        color: rgb(77, 85, 93)
        &.active
          color: #fff
        &.positive
          background: rgba(0, 160, 220, 0.2)
          &.active
           background: rgb(0, 160, 220)
        &.negative
          background: rgba(77, 85, 93, 0.2)
          &.active
            background: rgb(77, 85, 93)
        .count
          margin-left: 0.1rem
          font-size: 0.4rem
    .switch
      padding: 0.6rem 0.9rem
      line-height: 1.2rem
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      &.on
        .icon-check_circle
          color: #00c850
      .icon-check_circle
        display: inline-block
        font-size: 1.2rem
        margin-right: 0.2rem
        vertical-align: top
      .text
        display: inline-block
        font-size: 0.6rem
        vertical-align: top



</style>
