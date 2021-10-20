import * as ApiServices from '../../services/ApiService'

let userInStorage
try {
    userInStorage = JSON.parse(localStorage.getItem('currentUser') || null )
} catch (error) {
    userInStorage = null
}

export default {
    namespaced: true,
    state() {
        return {
            currentUser: userInStorage
        }
    },
    mutations: {
        SET_INFO_USER ( state, user ) {
            state.currentUser = user
            if (user) {
                localStorage.setItem('currentUser',JSON.stringify(user))
            } else {
                localStorage.removeItem('currentUser')
            }
        }
    },
    actions: {
        async login( {commit} , user ) {
            const [res, error] = await ApiServices.loginUser(user)

            if ( res !== null ) {
                commit('SET_INFO_USER', res)
                return true
            } else {
                return error
            }
        },
        async signup ({dispatch}, user) {
            const [res, error] = await ApiServices.signUp(user)

            if ( res !== null) {
                await dispatch('login', user)
                return true
            } else {
                return error
            }
        },
        logout ({commit}) {
            commit('SET_INFO_USER', null)
        },
        async removeUser ({dispatch}, {id, token}){
            const [res, error] = await ApiServices.removeUser({id, token})

            if (res  !== null) {
                dispatch('logout')
                return true
            } else {
                return error
            }
        }

    },
}