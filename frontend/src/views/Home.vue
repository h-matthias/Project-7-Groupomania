<template>
    <headerHome/>
    <main>
        <formPost :token="token" :userId="userId"/>
        <post :token="token" :userId="userId" />
    </main>
</template>

<script>
import headerHome from "../components/HeaderHome"
import post from "../components/Post"
import formPost from "../components/FormPost"
export default {
    name: "home",
    components:{
        headerHome,
        formPost,
        post
    },
    data() {
        return {
            token: "Bearer " + localStorage.getItem("token"),
            userId: localStorage.getItem("userId"),
        }
    },
   
}
</script>

<style>

</style>