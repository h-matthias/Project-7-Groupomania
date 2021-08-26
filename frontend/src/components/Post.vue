<template>
<ul>
    <ModaleConfirmationDelete 
        :class="{ 'enter-active': revele, 'out-active': animReverse }"
        :revele="revele"
        :toggleModale="toggleModale" 
        :mode="mode" 
        :id="id"
        :action="action"
    />
    <ModifyPostOrComment 
        :class="{ 'enter-active': revele, 'out-active': animReverse }"
        :revele="revele"
        :toggleModale="toggleModale" 
        :mode="mode" 
        :id="id"
        :action="action"
        />
    <li v-for="post of allPosts" :key="post.id"  >
        <div class="card">
            <div v-if="post.user" class="card__profil" >
                <div class="card__profil__initial-user">
                   <p>  {{ post.user.initial }} </p>
                </div>
                <div class="card__profil__info">
                    <p class="card__profil__info__name">               
                        {{ post.user.name }}
                    </p>
                    <p class="card__profil__info__date-publish">
                        {{ post.createdAt }} {{ post.createdAt === post.updatedAt ? "": "Modifié" }}
                    </p>
                </div>
                <div v-if="parseInt(userId) === post.userId" class="card__profil__option">
                        <button @click="deletePost(post.id)" class="btn btn--delete">Supprimer</button>
                        <button @click="modifyPost(post.id)" class="btn btn--modify">Modifier</button>
                </div>
            </div>
            <div v-else>
                <p>Erreur de chargement des informations sur l'utilisateur de la publication.</p>
            </div>
            <div class="card__content">
                <div class="card__content__post">
                    <p>
                        {{ post.contentPost }}
                    </p>
                </div>
                <img v-if="post.imageUrl" 
                    class="card__content__image" 
                    :src="post.imageUrl" 
                    :alt="  `image publié par ${post.user ? post.user.name:'' }`">
                
            </div>
            <br>
            <hr>
            <p style="font-size:.8rem; margin-top: .8rem">
               {{ post.comments.length}} Commentaires
            </p>
            <Comments
                :comments="post.comments" 
                :userId="userId" 
                @deleteCom="deleteComment($event)" 
                @modifyCom="modifyComment($event)"
            />
            <!-- <FormComment :postId="post.id"/> -->
          
        </div>
    </li>         
</ul>
</template>

<script>
//import component
import ModaleConfirmationDelete from "./ModaleConfirmationDelete";
//import FormComment from "./FormComment"
import Comments from "./Comment"
import ModifyPostOrComment from "./ModifyPostOrComment"

import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core';


export default {
    components: {
        ModaleConfirmationDelete,
        ModifyPostOrComment,
        //FormComment,
        Comments,
    },
    setup(){

        const store = useStore();
        const token = `Bearer ${store.state.users.currentUser.token}`

        const loadPost = async () => {
            const res = await store.dispatch('posts/loadPost', token)
            if (res) {
                console.log("!");
            }
            
        }

        loadPost()

        let allPosts = computed(() => store.state.posts.allPosts )
        
        return {
            allPosts
        }
        
    },

    data() {
        return {
            //posts: [],
            revele: false,
            id: "",
            mode:"",
            action:"",
            animReverse: false,
            userId:""
        }
    },
    methods:{
        deletePost(id) {
            this.mode = "post";
            this.id = id;
            this.action="delete";
            this.revele=true;
        },
        modifyPost(id){
            this.mode = "post";
            this.id = id;
            this.action="modify";
            this.revele=true;
        },
        deleteComment($event){
            this.mode = "comment";
            this.action="delete";
            this.id = $event;
            this.revele= true;
        },
        modifyComment($event){
            this.action="modify";
            this.mode = "comment";
            this.id = $event;
            this.revele=true;
            console.log($event);
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
    .card{
        background: white;
        min-height: 10rem;
        border: #f1f1f1 solid 1px;
        box-shadow: 1px 1px 2px;
        padding: .4rem;
        border-radius: .5rem;
        &__profil {
            display: flex;
            padding-bottom: .3rem;
            border-bottom: black 1px solid;
            &__initial-user{
                display: flex;
                width: 2.7rem;
                height: 2.7rem;
                border-radius: 50%;
                //border: 1px solid black;
                box-shadow: 1px 1px 5px;
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
        box-shadow: 1px 1px 5px;
         transition: all 0.2s linear;
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
        .card__profil__option{
            flex-direction: column;
        }
        .btn{
            padding: 0.2rem 0.4rem;
        }
    }
</style>
    
