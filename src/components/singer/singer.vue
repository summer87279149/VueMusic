<template>
    <div class="singer">
      <div class="singer" ref="singer">
        <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
        <router-view></router-view>
      </div>
    </div>
</template>
<script>
  import ListView from '../../base/listview/listview'
  import {ERR_OK} from '../../api/config'
  import {getSingerList} from '../../api/singer'
  import Singer from '../../common/js/singer'
  import {mapMutations} from 'vuex'
  import {playlistMixin} from '../../common/js/mixin'

    export default {
      mixins: [playlistMixin],
        data() {
            return {
                singers:[]
            }
        },

        methods: {
          handlePlaylist(playlist) {
            const bottom = playlist.length > 0 ? '60px' : ''
            this.$refs.singer.style.bottom = bottom
            this.$refs.list.refresh()
          },
          ...mapMutations({
            setSinger: 'SET_SINGER'
          }),
          _getSingerList(){
            getSingerList().then((res)=>{
              if (res.code === ERR_OK){
                this.singers=this._normalizeSinger(res.data.list)
              }
            })
          },
          selectSinger(singer) {
            this.$router.push({
              path: `/singer/${singer.id}`
            })
            this.setSinger(singer)
          },
          _normalizeSinger(list) {
            let map = {
              hot: {
                title: "热门",
                items: []
              }
            }
            list.forEach((item, index) => {
              if (index < 10) {
                map.hot.items.push(new Singer({
                  name: item.Fsinger_name,
                  id: item.Fsinger_mid
                }))
              }
              const key = item.Findex
              if (!map[key]) {
                map[key] = {
                  title: key,
                  items: []
                }
              }
              map[key].items.push(new Singer({
                name: item.Fsinger_name,
                id: item.Fsinger_mid
              }))
            })
            console.log("da",map)
            // 为了得到有序列表，我们需要处理 map
            let ret = []
            let hot = []
            for ( let key in map) {
              let val = map[key]
              if (val.title.match(/[a-zA-Z]/)) {
                ret.push(val)
              } else if (val.title === "热门") {
                hot.push(val)
              }
            }
            ret.sort((a, b) => {
              return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            return hot.concat(ret)

          }
        },
        props: {

        },
        computed: {},
        watch: {},
        components: {
          ListView
        },
        beforeCreate () {
        },
        created () {
            this._getSingerList()
        },
        beforeMount () {
        },
        mounted () {
        },
        beforeUpdate () {
        },
        updated () {
        },
        beforeDestroy () {
        },
        destroyed () {
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 138px
    bottom: 0
    width: 100%
</style>
