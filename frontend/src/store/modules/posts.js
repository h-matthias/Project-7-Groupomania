import * as ApiServices from "../../services/ApiService";

export default {

    namespaced: true,

    state() {
        return {
            allPosts: []
        }
    },

    mutations: {
        SET_LOAD_POST (state, posts) {
            state.allPosts = posts
        }
    },

    actions: {
        async loadPost( {commit}, token ) {
            const [res, error] = await ApiServices.loadPost(token)
            if (res !==null) {
                commit('SET_LOAD_POST', res)
                return true
            } else {
                return error
            }
        },
        async sendPost ({ dispatch}, {data, token}) {
            
            const [res, error] = await ApiServices.sendPost({data, token})
            if (res !==null) {
                await dispatch('loadPost',token)
                return true
            } else {
                return error
            }
        }
    },
};
