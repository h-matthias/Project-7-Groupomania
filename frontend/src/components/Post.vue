<template>
<ul>
    <modale-delete :class="{ 'enter-active': revele, 'out-active': animReverse }"
                :revele="revele"
                :toggleModale="toggleModale" :mode="mode" :id="id"/>
    <li v-for="post in posts" :key="post.id"  >
        <div class="carte">
            <div class="carte__profil" >
                <div class="carte__profil__initial-user">
                   <p>  {{ user.initial }} </p>
                </div>
                <div class="carte__profil__info">
                    <p class="carte__profil__info__name">               
                        {{ user.name }}
                    </p>
                    <p class="carte__profil__info__date-publish">
                        {{post.createdAt}} {{( post.createAt === post.updateAt) ? "": " Modifié" }}
                    </p>
                </div>
                <div v-if="parseInt(userId) === post.userId" class="carte__profil__option">
                        <button @click="deletePost(post.id)" class="btn btn--delete">Supprimer</button>
                        <button @click="modifyPost(post.id)" class="btn btn--modify">Modifier</button>
                </div>
                
            </div>
            <div class="carte__content">
                <div class="carte__content__post">
                    <p>
                        {{post.contentPost}}
                    </p>
                </div>
                <img v-if="post.imageUrl" class="carte__content__image" :src="post.imageUrl" :alt="  `image publié par ${user.name}`">
                
            </div>
        </div>
    </li>         
</ul>
</template>

<script>
import axios from "axios"
import modaleDelete from "../components/ModaleConfirmationDelete"
export default {
    name: "post",
    props: ["token", "userId"],
    components: {
        modaleDelete
    },
    data() {
        return {
            posts: [],
            revele: false,
            id: "",
            mode:"",
            animReverse: false,
            user:{}
        }
    },
    mounted() {
        
        this.loadPost();
            
        
    },

    methods: {
        loadPost(){
            //console.log(this.userId);
            axios.get("http://localhost:3000/api/post", {"headers": {"Authorization": this.token}}, this.userId)
            .then( res => {
                this.posts = res.data;
            })
            .then(() => {
                for (const post of this.posts) {
                    //formatage de l'heure;
                    let date = post.createdAt.split("T")[0].split("-").reverse().join("/");
                    let heure = post.createdAt.split("T")[1].split(":")[0];
                    let minute = post.createdAt.split("T")[1].split(":")[1];
                    post["createdAt"] = `${date} ${heure}:${minute}`;
                    axios.get("http://localhost:3000/api/auth/"+ post.userId)
                    .then(res => {
                        this.user = res.data;
                    })
                    .catch(err => console.log({err}))
                }
            })
            .catch(error => console.log({error}))
        },
        deletePost(id) {
            this.mode = "post";
            this.id = id;
            this.revele=true
        },
        modifyPost(id){
            this.mode = "post"
            this.id = id;

        },
        toggleModale() {
            if (!this.revele) {
                this.revele = !this.revele;
            } else {
                this.animReverse = !this.animReverse;
                setTimeout(() => {
                    (this.revele = !this.revele),
                    (this.animReverse = !this.animReverse);
                }, 500);
            }
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
            &__info{
                flex-grow: 1;
                &__name{
                margin-bottom: .2rem;
                font-size: 1.1rem;
                }
                &__date-publish{
                    font-size: 0.8rem;
                }
            }
            &__option{
                display: flex;
                flex-direction: row;
                justify-content: flex-end;

            }
        }
        &__content{
            width: 100%;
            &__post{
                padding: .5rem 0;
                & p{
                    white-space: pre-line;
                    word-wrap: break-word;
                }
            }
            & img{
                width: 100%;
                border-radius: .5rem;
            }
        }
    }
    .btn {
        cursor: pointer;
        padding: 0.3rem 0.4rem;
        border: 2px solid transparent;
        background: #dc3545;
        color: white;
        border-radius: 0.3rem;
        font-size: .8rem;
        margin-left: .3rem;
        &:focus {
            outline: none;
            border-color: black;
        }
        &:hover {
            background: darken($color: #dc3545, $amount: 15%);
        }
        &--modify {
            background: #ffc107;
            &:hover {
                background: darken($color: #ffc107, $amount: 15%);
            }
        }
    }
    @media (max-width:500px) {
        .carte__profil__option{
            flex-direction: column;
        }
        .btn{
            padding: 0.2rem 0.4rem;
        }
    }
</style>
    
