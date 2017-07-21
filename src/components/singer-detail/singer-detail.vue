<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
  import MusicList from '../../components/music-list/music-list'
  import {getSingerDetail} from '../../api/singer'
  import {mapGetters} from 'vuex'
  import {createSong} from '../../common/js/song'

  export default {
    computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getDetail()
    },
    methods: {
      _getDetail() {
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === 0) {
            this.songs = this._normalizeSongs(res.data.list)

            console.log("歌曲列表是:",this.songs)

          }
        })
      },
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
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 .ww
   position :fixed
   z-index 100
   top:0
   left: 0
   right: 0
   bottom: 0
 .slide-enter-active, .slide-leave-active
   transition:all 0.5s

 .slide-enter, .slide-leave-to
   transform : translate3d(100%, 0, 0)

</style>
