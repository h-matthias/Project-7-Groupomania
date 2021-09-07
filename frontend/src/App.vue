<template>
    <header>
        <headerNav />
    </header>
    <main>
        <router-view />
    </main>
</template>

<script>
import headerNav from './components/HeaderNav';
export default {
    components: {
        headerNav
    }
   
};
</script>


<style lang="scss">
*, ::before, ::after{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}
a{
    text-decoration: none;
    color: black;
}
li{
    list-style: none;
}
#app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
body{
    background: #f3f3f3;
    height: 100vh;
}

main{
    padding-top: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    
}
 @media (max-width:680px) {
    main{
        padding-top: 8rem;
    }
}
.enter-active {
    animation: appare 0.5s;
}
@keyframes appare {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
.out-active {
    animation: dispare 0.5s;
}
@keyframes dispare {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

</style>
