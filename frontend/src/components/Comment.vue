<template>
        <div class="comment" v-for="comment in comments" :key="comment.id">

            <div v-if="comment.user" class="comment__profil" >
                <div class="comment__profil__initial-user">
                    <p>  {{ comment.user.initial }} </p>
                </div>

                <div class="comment__profil__info">
                    <p class="comment__profil__info__name">               
                        {{ comment.user.name }}
                    </p>
                    <p class="comment__profil__info__date-publish">
                        {{ comment.createdAt }} {{ comment.createdAt === comment.updatedAt ? "": "Modifié" }}
                    </p>
                </div>

                <div v-if="parseInt(userId) === comment.userId" class="comment__profil__option">
                        <button @click="deleteComment(comment.id)" class="btn btn--delete">Supprimer</button>
                        <button @click="modifyComment(comment.id)" class="btn btn--modify">Modifier</button>
                </div>
            </div>
            <div v-else>
                <p>Erreur de chargement des informations sur l'utilisateur du commentaire.</p>
            </div>
            <div class="comment__content">
                <p>
                    {{ comment.contentComment }}
                </p>
            </div>  
        </div>

</template>

<script>


export default {
    name: "comment",
    props: [ "comments", "userId", ],
    emits: ["modifyCom", "deleteCom"],
    data() {
        return {
            
        }
    },
    methods: {
        deleteComment(id) {
            const comId = id
            this.$emit("deleteCom", comId)
        },
        modifyComment(id){
             const comId = id
            this.$emit("modifyCom", comId)
        },
    }
}
</script>

<style lang="scss" scoped>
.comment{
    background: #f9f9f9;
    min-height: 5rem;
    border: #f1f1f1 solid 1px;
    box-shadow: 1px 1px 2px;
    padding: .4rem;
    border-radius: .5rem;
    margin-top: .5rem;
    &__profil {
        align-items: baseline;
        display: flex;
        padding-bottom: .3rem;
        &__initial-user{
            flex-shrink: 0;
            font-size: .8rem;
            display: flex;
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            box-shadow: 1px 1px 5px;
            //border: 1px solid black;
            margin-right: 1rem;
            & p{
                font-weight: 500;
                margin: auto;
            }
        }
        &__info{
            display: flex;
            flex-grow: 1;
            align-items: baseline;
           //border-bottom: black 1px solid;
            &__name{
                font-size: .8rem;
                border-bottom: black 1px solid;
            }
            &__date-publish{
                margin-left: .5rem ;
                font-size: 0.7rem;
                
            }
        }
        &__option{
            display: flex;
            flex-direction: row;
            justify-content: flex-end;

        }
    }
    &__content{
        margin-left: 2.6rem;
        padding: .5rem 0;
        & p{
            font-size: 0.8rem;
            white-space: pre-line;
            word-wrap: break-word;
        }
    }
}
.btn {
    cursor: pointer;
    padding: 0.2rem 0.2rem;
    border: 2px solid transparent;
    background: #dc3545;
    color: white;
    border-radius: 0.3rem;
    font-size: .7rem;
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
        background: #5a4400;
        &:hover {
            background: darken($color: #5a4400, $amount: 15%);
        }
    }
}
@media (max-width: 410px) {
    .comment__profil__info{
        flex-direction: column;
    }
    
}
</style>