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
            <FormComment :postId="post.id"/>
          
        </div>
    </li>         
</ul>
</template>

<script>
//import component
import ModaleConfirmationDelete from "./ModaleConfirmationDelete";
import FormComment from "./FormComment"
import Comments from "./Comment"
import ModifyPostOrComment from "./ModifyPostOrComment"

import { useStore } from 'vuex'
import { computed, reactive, toRefs } from 'vue';


export default {
    components: {
        ModaleConfirmationDelete,
        ModifyPostOrComment,
        FormComment,
        Comments,
    },
    setup(){

        const store = useStore(); 
        const token = `Bearer ${store.state.users.currentUser.token}`

        const state = reactive({
            userId: store.state.users.currentUser.userId,
            revele:false,
            id:"",
            mode:"",
            action:"",
            animReverse:false
        })

        const loadPost = async () => {
            await store.dispatch('posts/loadPost', token)
        }

        loadPost()

        let allPosts = computed(() => store.state.posts.allPosts )


        function toggleModale() {
            if (!state.revele) {
                state.revele = !state.revele;
            } else {
                state.animReverse = !state.animReverse;
                setTimeout(() => {
                    (state.revele = !state.revele),
                    (state.animReverse = !state.animReverse);
                }, 500);
            }
        }

        function deletePost(id) {
            state.mode = "post";
            state.id = id;
            state.action="delete";
            state.revele=true;
        }

        function modifyPost(id){
            state.mode = "post";
            state.id = id;
            state.action="modify";
            state.revele=true;
        }

        function deleteComment($event){
            state.mode = "comment";
            state.action="delete";
            state.id = $event;
            state.revele= true;
        }

        function modifyComment($event){
            state.action="modify";
            state.mode = "comment";
            state.id = $event;
            state.revele=true;
        }
        
        return {
            ...toRefs(state),
            allPosts,
            toggleModale,
            deletePost,
            modifyPost,
            deleteComment,
            modifyComment
        }
        
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
    
