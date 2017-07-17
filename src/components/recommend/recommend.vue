<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div  >
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div @click="diannima" v-for="item in recommends">
              <a href="javascript:void(0)">
                <img class="needsclick" @load="loadImage" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click.stop="selectItem(item)" v-for="item in discList" class="item">
              <div class="icon">
                <img v-lazy="item.imgurl" width="60" height="60">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>

    </scroll>
    <router-view></router-view>
  </div>

</template>

<script>
  import Slider from '../../base/slider/slider.vue'
  import {getRecommend,getDiscList} from '../../api/recommend'
  import {ERR_OK} from '../../api/config'
  import Scroll from '../../base/scroll/scroll.vue'
  import Loading from '../../base/loading/loading.vue'
  import {playlistMixin} from '../../common/js/mixin'
  import {mapMutations} from 'vuex'
  import alistjson from './list.json'
    export default {
      mixins: [playlistMixin],
        data() {
            return {
                   recommends: [],
                   discList: []
            }
        },
        methods: {
          diannima(){
            alert(" 点尼玛! ")
          },
          selectItem(item){
              console.log("push啊啊啊")
              this.$router.push({
                path:`/recommend/${item.dissid}`
//                path:'/singer'
              })
              this.setDisc(item);
          },
          handlePlaylist(playlist) {
            const bottom = playlist.length > 0 ? '60px' : ''
            this.$refs.recommend.style.bottom = bottom
            this.$refs.scroll.refresh()
          },
          _getRecommend(){
            getRecommend().then((res)=>{
                if (res.code === ERR_OK){
                  this.recommends=res.data.slider
                }
            })
          },
          loadImage() {
            if (!this.checkloaded) {
              this.checkloaded = true
              this.$refs.scroll.refresh()
            }
          },
          _getDiscList() {
            this.discList = alistjson.list
//            getDiscList().then((res) => {
//              if (res.code === ERR_OK) {
//                this.discList = res.data.list
//                console.log("打印并保存:",this.discList)
//
//              }
//            })
          },
          ...mapMutations({
            setDisc: 'SET_DISC'
          })
        },
        props: {
        },
        computed: {},
        watch: {},
        components: {
          Slider,
          Scroll,
          Loading
        },
        created () {
          this._getRecommend()

        },
        mounted(){
          setTimeout(()=>{
            this._getDiscList()
          },21)
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 118px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden

      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            align-items: flex-start
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              text-align: left
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
