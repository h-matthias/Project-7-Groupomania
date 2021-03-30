<template>
<ul>
    <li v-for="post in posts" :key="post.id"  >
        <div class="carte">
            <div class="carte__profil" >
                <div class="carte__profil__initial-user">
                   <p>  {{ post.user.initial }} </p>
                </div>
                <div class="carte__profil__info">
                    <p class="carte__profil__info__name">               
                        {{ post.user.name }}
                    </p>
                    <p class="carte__profil__info__date-publish">
                        {{post.createdAt}} {{( post.createAt === post.updateAt) ? "": " Modifié" }}
                    </p>
                </div>
                
            </div>
            <div class="carte__content">
                <div class="carte__content__post">
                    <p>
                        {{post.contentPost}}
                    </p>
                </div>
                <img v-if="post.imageUrl" class="carte__content__image" :src="post.imageUrl" :alt="  `image publié par ${post.user.name}`">
                
            </div>
            
           
        </div>
    </li>         
</ul>
</template>

<script>
import axios from "axios"
export default {
    name: "post",
    props: ["token", "userId"],
    data() {
        return {
            posts: [],
        }
    },
    mounted() {
        
        this.loadPost();
            
        
    },
    methods: {
        loadPost(){
            //console.log(this.userId);
            axios.get("http://localhost:3000/api/post", {"headers": {"Authorization": this.token}},)
        .then( res => {
            this.posts = res.data;
        })
        .then(() => {
            for (const post of this.posts) {
                //formatage de lheure;
                let date = post.createdAt.split("T")[0].split("-").reverse().join("/");
                let heure = post.createdAt.split("T")[1].split(":")[0];
                let minute = post.createdAt.split("T")[1].split(":")[1];
                post["createdAt"] = `${date} ${heure}:${minute}`;
                axios.get("http://localhost:3000/api/auth/"+ post.userId)
                .then(res => {
                    post["user"] = res.data;
                })
                .catch(err => console.log({err}))
            }
        })
        .catch(error => console.log({error}))
        },
       
    }
}
</script>

<style lang="scss" scoped>
    ul{
        width: 100%;
        display: flex;
        flex-flow: column;
        justify-content: flex-start;
        align-items: center;
    }
   
    li{
        width: 95%;
        max-width: 600px;
        margin: .5rem 0;
    }
    .carte{
        min-height: 10rem;
        border: #f1f1f1 solid 1px;
        box-shadow: 1px 1px 4px;
        padding: .5rem;
        &__profil {
            display: flex;
            padding-bottom: .3rem;
            border-bottom: black 1px solid;
            &__initial-user{
                display: flex;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 1px solid black;
                margin-right: 1rem;
                & p{
                    font-size: 1.2rem;
                    font-weight: bold;
                    margin: auto;
                }
            }
            &__info__name{
                margin-bottom: .2rem;
                font-size: 1.1rem;
            }
            &__info__date-publish{
                font-size: 0.8rem;
            }
        }
        &__content{
            width: 100%;
            &__post{
                padding: .5rem 0;
                & p{
                    white-space: pre-line;
                }
            }
            & img{
                width: 100%;
                border-radius: .5rem;
            }
        }
    }
</style>
    
