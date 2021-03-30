<template>

    <nav class="nav">
        <img class="nav__logo" src="../assets/logo-mono.svg" alt="logo groupomania">
        
        <ul class="nav__list">
            <li class="nav__list__item">
                <router-link class="nav-link" to="/">Se connecter</router-link>
            </li>
        </ul>
        
    </nav>

</template>


<script>
export default {
    name: "headerNav"

}
</script>

<style lang="scss">
.nav{
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