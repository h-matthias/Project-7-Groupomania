import { createStore } from 'vuex'
import UserModule from './modules/users'
import PostModule from './modules/posts'

export default createStore({

  modules: {
    users: UserModule,
    posts: PostModule
  },

  state: {
  },
  mutations: {
  },
  actions: {
  },
  
})
