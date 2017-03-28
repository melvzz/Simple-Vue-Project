<template>
  <div>
    <v-header :seller="seller"></v-header>

    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>

    <quick-tip></quick-tip>
    <msg-box></msg-box>

    <router-view :seller="seller">

    </router-view>

  </div>
</template>

<script>
  import header from './components/header/header';
  import quickTip from './components/quicktip/quicktip';
  import msgBox from './components/msgbox/msgbox';

  const ERR_OK = 0;

  export default {
    data: function(){
      return {
        seller: {}
      }
    },
    created: function(){
      this.$http.get('/api/seller').then(function(response){
        response = response.body;
        if (response.errno === ERR_OK){
          this.seller = response.data;
        }
      })
    },
    components: {
      'v-header': header,
      'quick-tip': quickTip,
      'msg-box': msgBox
    }
  };

</script>

<style>
  .tab{
    display: flex;
    position: relative;
    width: 100%;
    height: 2rem;
    line-height: 2rem;
  }

  .tab:after{
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    content: ' ';
  }

  .tab .tab-item{
    flex: 1;
    text-align: center;
  }

  .tab .tab-item>a{
    display: block;
    font-size: 0.7rem;
    color: rgb(77, 85, 93);
  }

  .tab .tab-item>a.active{
    color: rgb(240, 20, 20);
  }



</style>
