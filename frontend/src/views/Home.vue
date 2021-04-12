<template>
        <formPost />
        <post />
</template>

<script>

import post from "../components/Post"
import formPost from "../components/FormPost"
export default {
    name: "home",
    components:{

        formPost,
        post
    },
    mounted() {
        this.isConnected()
    },
    methods: {
        isConnected () {
            if (!localStorage.getItem("token") || !localStorage.getItem("userId")){
                this.$router.push("/")
            }
        },
    }
}
</script>

<style>

</style>