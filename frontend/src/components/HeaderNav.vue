<template>

    <nav class="nav">
        <img class="nav__logo" src="../assets/logo-mono.svg" alt="logo groupomania">
        
        <ul class="nav__list" v-if="currentUser">
            <li class="nav__list__item">
                <router-link to="/home">Acceuil</router-link>
            </li>
            <li class="nav__list__item">
                <router-link to="/account">Mon compte</router-link>
            </li>
            <li class="nav__list__item">
                 <button @click="logout">
                    Se deconnecter
                </button>
            </li>
        </ul>
        
    </nav>

</template>


<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {

    setup() {

        const router = useRouter()
        const store = useStore()
        
        let currentUser = computed(() => store.state.users.currentUser )

        const logout = () => {
            store.dispatch('users/logout')
            router.push("/");
        }

        return {
            logout,
            currentUser
        }

    }
}
</script>

<style lang="scss">
.nav{
    z-index: 1;
    position: fixed;
    background: white;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    //flex-grow: 1;
    justify-content: space-between;
    padding: .5rem;
    
    box-shadow: 0 0 5px;
    &__logo{
        width: 16rem;
        padding: .3rem;
    }
    &__list{
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        &__item{
            margin: auto 1rem;
            border-bottom: transparent 2px solid;
        }
    }
}

button{
    cursor: pointer;
    border: none;
    background: none;
    font-size: 1rem;
}

.router-link-active{
    position: relative;
    cursor: default;
    &::before{
        content: "";
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 2px;
        background: #333;
    }
}


@media (max-width:680px){
    
    .nav__list{
        margin: 0;
        margin-top: 1rem;
        padding-bottom: 1rem;
        width: 100%;
        &__item{
            margin: 0;
        }
    }
} 


</style>