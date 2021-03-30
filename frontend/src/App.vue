<template>
    <router-view />
</template>

<script>
export default {
   
};
</script>


<style lang="scss">
*, *::before, *::after{
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

</style>
