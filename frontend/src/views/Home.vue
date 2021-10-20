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
}
</script>

<style>

</style>