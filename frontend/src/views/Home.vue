<template>
    <headerHome/>
    <main>
        <!-- TODO ajout composent creation post -->
        <post :token="this.token" :userId="this.userId" />
    </main>
</template>

<script>
import headerHome from "../components/HeaderHome"
import post from "../components/Post"
//import axios from "axios"
export default {
    name: "home",
    components:{
        headerHome,
        post
    },
    data() {
        return {
            token: "Bearer " + localStorage.getItem("token"),
            userId: localStorage.getItem("userId"),
        }
    },
    // mounted() {
    //     console.log(this.token);
    //     axios.get("http://localhost:3000/api/post", {"headers": {"Authorization": this.token}}, this.userId)
    //     .then( res => {
    //         console.log(res.data);
    //         this.post = res.data
    //         console.log(this.post);
    //     })
    //     .catch(error => console.log({error}))
    // }

}
</script>

<style>

</style>