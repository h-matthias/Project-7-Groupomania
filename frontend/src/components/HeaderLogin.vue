<template>

    <nav class="nav">
        <img class="nav__logo" src="../assets/logo-mono.svg" alt="logo groupomania">
        
        <ul class="nav__list">
            <li class="nav__list__item">
                <router-link class="nav-link" to="/">Se connecter</router-link>
            </li>
            <li class="nav__list__item">
                <router-link class="nav-link" to="/signup">S'inscrire</router-link>
            </li>
        </ul>
        
    </nav>

</template>


<script>
export default {
    name: "headerNav"

}
</script>

<style lang="scss" scoped>
.nav{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-grow: 2;
    justify-content: space-between;
    padding: .5rem;
    
    box-shadow: 0 0 5px;
    &__logo{
        width: 16rem;
        padding: .3rem;
    }
    &__list{
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-right: 5rem;
        &__item{
            margin: 0 2rem;
            border-bottom: transparent 2px solid;
        }
    }
}
.nav-link{
    display: inline-block;
    position: relative;
    &:not(.router-link-active)::before{
        content: "";
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 2px;
        background: #333;
        transform-origin: 100% 0;
        transform: scaleX(0);
        transition: transform 0.4s;
    }
    &:hover:not(.router-link-active)::before{
        transform: scaleX(1);
        transform-origin: 0 0;
    }
}


.router-link-active{
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


@media (max-width:600px){
    .nav__logo{
        width: 100%;
    }
    .nav__list{
        margin: 0;
        margin-top: 1rem;
        padding-bottom: 1rem;
        width: 100%;
    }
} 


</style>