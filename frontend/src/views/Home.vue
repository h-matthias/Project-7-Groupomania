<template>
        <FormPost />
        <Post />
</template>

<script>

import Post from "../components/Post"
import FormPost from "../components/FormPost"
export default {
    name: "home",
    components:{

        FormPost,
        Post
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