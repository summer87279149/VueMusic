<template>
  <div class="recommend" ref="recommend">
    <div class="hint">本站仅用作个人学习demo,不用做任何商业用途,如有侵犯您的权益,请发邮件至1033948449@qq.com,本人将立刻删除</div>
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
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
  import {getRecommend, getDiscList} from '../../api/recommend'
  import {ERR_OK} from '../../api/config'
  import Scroll from '../../base/scroll/scroll.vue'
  import Loading from '../../base/loading/loading.vue'
  import {playlistMixin} from '../../common/js/mixin'
  import {mapMutations, mapActions} from 'vuex'
  import alistjson from './list.json'
  import HomePlayLists from './HomePlayLists.json'
  import {createSong} from '../../common/js/song'

  export default {
    mixins: [playlistMixin],
    data() {
      return {
        recommends: [],
        discList: []
      }
    },
    methods: {
      diannima() {

      },
      selectItem(item) {
        console.log("push啊啊啊")
        this.$router.push({
          path: `/recommend/${item.dissid}`
//        path:'/singer'
        })
        this.setDisc(item);
      },
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
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
//            this.discList = alistjson.list
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
            console.log("打印并保存:", this.discList)

          }
        })
      },
      ...mapMutations({
        setDisc: 'SET_DISC',
        setFullScreen: 'SET_FULL_SCREEN',
      }),
      ...mapActions([
        'selectPlay',
      ]),
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    props: {},
    computed: {},
    watch: {},
    components: {
      Slider,
      Scroll,
      Loading
    },
    created() {
      this._getRecommend()
    },
    mounted() {
      clearTimeout(this.timer1)
      this.timer1 = setTimeout(() => {
        this._getDiscList()
      }, 21)
      this.songs = this._normalizeSongs(HomePlayLists)
      this.selectPlay({
        list: this.songs,
        index: 4
      })
      this.setFullScreen(false)


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
    .hint
      font-size: 12px
      padding-left: 10px
      padding-right: 10px
      margin-bottom: 5px
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
