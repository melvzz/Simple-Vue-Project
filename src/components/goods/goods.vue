<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, $index) in goods" class="menu-item"
            :class="{'current': currentIndex == $index}" @click="selectMenu($index, $event)">
          <span class="text">
            <span class="icon-wrapper" v-show="item.type>0">
              <icon class="bg-icon" :index="item.type" :num="3"></icon>
            </span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>

    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" @click="selectFood(food, $event)">
              <div class="icon">
                <img :src="food.icon" width="57" height="57"/>
              </div>

              <div class="content">
                <h2 class="name">{{food.name}}</h2>

                <p v-show="food.description" class="desc">{{ food.description }}</p>

                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>

                <div class="price">
                  <span class="now">&yen;{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">&yen;{{food.oldPrice}}</span>
                </div>

                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" :shop-foods="cartFoods"></cartcontrol>
                </div>
              </div>

            </li>
          </ul>
        </li>
      </ul>
    </div>

    <shopcart ref="shopcart" :select-foods="cartFoods" :delivery-price="seller.deliveryPrice"
              :min-price="seller.minPrice"></shopcart>
    <food :food="selectedFood" :shop-foods="cartFoods" ref="foodDetail" ></food>
  </div>
</template>

<script>

  import icon from 'components/icon/icon';
  import BScroll from 'better-scroll';
  import shopcart from 'components/shopcart/shopcart';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import food from 'components/food/food';

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    computed: {
      cartFoods: function(){
        return this.$store.getters.currentCartFoods;
      }
    },
    data: function(){
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        currentIndex: 0,
        selectedFood: {},
        shopFoods: []
      }
    },
    created: function(){
      this.$http.get('/api/goods').then(function(response){
        response = response.body;
        if (response.errno === ERR_OK){
          this.goods = response.data;
          this.$nextTick(function() {
            this._initScroll();
            this._calculateHeight();
          });

        }
      });
    },
    components: {
      icon: icon,
      shopcart: shopcart,
      cartcontrol: cartcontrol,
      food: food
    },
    methods: {
      selectMenu: function(index, event){
        if (!event._constructed){   // 阻止浏览器的点击事件, 派发 better-scroll 的点击事件
          return;
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      _initScroll: function(){
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });
        this.foodsScroll.on('scroll', function(pos){
          this.scrollY = Math.abs(Math.round(pos.y));
          this.currentIndex = this._getCurrentIndex();
        }.bind(this));
      },
      _calculateHeight: function(){
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i=0; i<foodList.length; i++){
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      _getCurrentIndex: function(){
        for (let i=0; i<this.listHeight.length; i++){
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i+1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
            return i;
          }
        }
        return 0;
      },
      selectFood: function(food, event){
        if (!event._constructed){   // 阻止浏览器的点击事件, 派发 better-scroll 的点击事件
          return;
        }
        this.selectedFood = food;
        this.$refs.foodDetail.show();
      }
    }
  };
</script>


<style lang="stylus" rel="stylesheet/stylus">

  .goods
    display: flex
    position: absolute
    top: 8.7rem
    bottom: 2.3rem
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 4rem
      width: 4rem
      background: #f3f5f7
      .menu-item
        display: table
        height: 2.7rem
        width: 2.8rem
        padding:0 0.6rem
        line-height: 0.7rem
        &.current
          position: relative
          margin-top: -1px
          z-index: 10
          background: #fff
          font-weight: 700
          .text
            border-bottom: 0
        .text
          display: table-cell
          width: 2.8rem
          vertical-align: middle
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          font-size: 0.6rem
          .icon-wrapper
            display: inline-block
            vertical-align: top
            width: 0.6rem
            height: 0.6rem
            margin-right: 0.1rem
            .bg-icon
              background-size: 0.6rem 0.6rem
    .foods-wrapper
      flex: 1
      .title
        padding-left: 0.7rem
        height: 1.3rem
        line-height: 1.3rem
        border-left: 2px solid #d9dde1
        font-size: 0.6rem
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 0.9rem
        padding-bottom: 0.9rem
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        &:last-child
          border-bottom: 0
          margin-bottom: 0
        .icon
          flex: 0 0 2.85rem
          margin-right: 0.5rem
        .content
          position: relative
          flex: 1
          .name
            margin: 0.1rem 0 0.4rem 0
            line-height: 0.7rem
            font-size: 0.7rem
            color: rgb(7, 17, 27)
          .desc, .extra
            margin-bottom: 0.4rem
            line-height: 0.5rem
            font-size: 0.5rem
            color: rgb(147, 153, 159)
          .desc
            line-height: 0.7rem
          .count
              display: inline-block
              margin-right: 0.4rem
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
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: -0.7rem


</style>
