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
            }
        }
    },
    actions: {
        async login( {commit} , user ) {
            const [res, errorCode] = await ApiServices.loginUser(user)
            console.log(res, errorCode);

            if ( res !== null ) {
            console.log(res, errorCode);

                commit('SET_INFO_USER', res)
                return true
            } else {
            console.log(res, errorCode);

                return errorCode
            }
        },
    },
}