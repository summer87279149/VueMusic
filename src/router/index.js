import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '../components/recommend/recommend.vue'
import Rank from  '../components/rank/rank.vue'
import  Search from '../components/search/search.vue'
import  Singer from '../components/singer/singer.vue'
import SingerDetail from '../components/singer-detail/singer-detail.vue'
// import Disc from '../components/disc/disc.vue'
const Disc = (resolve) => {
  import('../components/disc/disc').then((module) => {
    resolve(module)
  })
}
const TopList = (resolve) => {
  import('../components/top-list/top-list').then((module) => {
    resolve(module)
  })
}
Vue.use(Router)

export default new Router({
  mode:  'history',
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },,{
      path:'/rank',
      component:Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },{
      path:'/search',
      component:Search
    },{
      path:'/singer',
      component:Singer,
      children:[{
        path:':id',
        component:SingerDetail
      }]
    }
  ]
})
