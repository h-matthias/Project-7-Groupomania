<template>
      <nav class="nav">
        <img class="nav__logo" src="../assets/logo-mono.svg" alt="logo groupomania">
        
        <ul class="nav__list">
            <li class="nav__list__item">
                <router-link to="/home">Acceuil</router-link>
            </li>
            <li class="nav__list__item">
                <router-link to="/account">Mon compte</router-link>
            </li>
            <li class="nav__list__item">
                 <button>
                    Se deconnecter
                </button>
            </li>
        </ul>
        
    </nav>
</template>

<script>


export default {
    name: "headerHome",
    
}
</script>

<style lang="scss" scoped>
    button{
        cursor: pointer;
        border: none;
        background: none;
        font-size: 1rem;
    }
</style>
