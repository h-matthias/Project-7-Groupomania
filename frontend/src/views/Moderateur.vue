<template>
    <ul v-if="isModerator">
        <li v-for="post of allPosts" :key="post.id">
            <div class="card">
                <div v-if="post.user" class="card__profil">
                    <div class="card__profil__info">
                        <p class="card__profil__info__name">
                            {{ post.user.name }}
                        </p>
                        <p class="card__profil__info__date-publish">
                            {{ post.createdAt }}
                            {{
                                post.createdAt === post.updatedAt
                                    ? ""
                                    : "Modifié"
                            }}
                        </p>
                    </div>
                    <div class="card__profil__option">
                        <button
                            @click="deletePost(post.id)"
                            class="btn btn--delete"
                        >
                            Supprimer
                        </button>
                    </div>
                </div>
                <div v-else>
                    <p>
                        Erreur de chargement des informations sur l'utilisateur
                        de la publication.
                    </p>
                </div>
                <div class="card__content">
                    <div class="card__content__post">
                        <p>
                            {{ post.contentPost }}
                        </p>
                    </div>
                    <img
                        v-if="post.imageUrl"
                        class="card__content__image"
                        :src="post.imageUrl"
                        :alt="
                            `image publié par ${
                                post.user ? post.user.name : ''
                            }`
                        "
                    />
                </div>
                <br />
                <hr />
                <p style="font-size:.8rem; margin-top: .8rem">
                    {{ post.comments.length }} Commentaires
                </p>
                <div
                    class="comment"
                    v-for="comment in post.comments"
                    :key="comment.id"
                >
                    <div v-if="comment.user" class="comment__profil">

                        <div class="comment__profil__info">
                            <p class="comment__profil__info__name">
                                {{ comment.user.name }}
                            </p>
                            <p class="comment__profil__info__date-publish">
                                {{ comment.createdAt }}
                                {{
                                    comment.createdAt === comment.updatedAt
                                        ? ""
                                        : "Modifié"
                                }}
                            </p>
                        </div>

                        <div class="comment__profil__option">
                            <button
                                @click="deleteComment(comment.id)"
                                class="btn btn--delete"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                    <div v-else>
                        <p>
                            Erreur de chargement des informations sur
                            l'utilisateur du commentaire.
                        </p>
                    </div>
                    <div class="comment__content">
                        <p>
                            {{ comment.contentComment }}
                        </p>
                    </div>
                </div>
            </div>
        </li>
    </ul>
    <div v-else class="warning">
        Vous n'êtes pas autoriser sur cette page
    </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";

export default {
    setup() {
        const store = useStore();
        const isModerator = computed(() => currentUser.userRole);

        const currentUser = store.state.users.currentUser;
        const token = `Baerer ${currentUser.token}`;

        const loadPost = async () => {
            await store.dispatch("posts/loadPost", token);
        };
        loadPost();

        let allPosts = computed(() => store.state.posts.allPosts);

        async function deleteComment (id) {
            let mode = "comment"
            await store.dispatch('posts/removePostOrComment', {mode, token, id})
        }

        async function deletePost (id) {
            let mode = "post"
            await store.dispatch('posts/removePostOrComment', {mode, token, id})
        }

        return {
            allPosts,
            isModerator,
            deleteComment,
            deletePost
        };
    },
};
</script>

<style lang="scss" scoped>
.warning{
    color: red;
    font-size: 2rem;
    margin-top: 5rem;
}
ul {
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
}

li {
    width: 95%;
    max-width: 600px;
    margin: 0.5rem 0;
}
.card {
    background: white;
    min-height: 10rem;
    border: #f1f1f1 solid 1px;
    box-shadow: 1px 1px 2px;
    padding: 0.4rem;
    border-radius: 0.5rem;
    &__profil {
        display: flex;
        padding-bottom: 0.3rem;
        border-bottom: black 1px solid;
        &__info {
            flex-grow: 1;
            &__name {
                margin-bottom: 0.2rem;
                font-size: 1.1rem;
            }
            &__date-publish {
                font-size: 0.8rem;
            }
        }
        &__option {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
        }
    }
    &__content {
        width: 100%;
        &__post {
            padding: 0.5rem 0;
            & p {
                white-space: pre-line;
                word-wrap: break-word;
            }
        }
        & img {
            width: 100%;
            border-radius: 0.5rem;
        }
    }
}

.comment {
    background: #f9f9f9;
    min-height: 5rem;
    border: #f1f1f1 solid 1px;
    box-shadow: 1px 1px 2px;
    padding: 0.4rem;
    border-radius: 0.5rem;
    margin-top: 0.5rem;
    &__profil {
        align-items: baseline;
        display: flex;
        padding-bottom: 0.3rem;
            border-bottom: black 1px solid;
        &__info {
            display: flex;
            flex-grow: 1;
            align-items: baseline;
            &__name {
                font-size: 0.8rem;
                margin-right: 0.5rem;
                //border-bottom: black 1px solid;
            }
            &__date-publish {
                font-size: 0.6rem;
            }
        }
        &__option {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
        }
    }
    &__content {
        margin-left: 2.6rem;
        padding: 0.5rem 0;
        & p {
            font-size: 0.8rem;
            white-space: pre-line;
            word-wrap: break-word;
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
    font-size: 0.8rem;
    margin-left: 0.3rem;
    box-shadow: 1px 1px 5px;
    transition: all 0.2s linear;
    &:focus {
        outline: none;
        border-color: black;
    }
    &:hover {
        background: darken($color: #dc3545, $amount: 15%);
    }
}
@media (max-width: 500px) {
    .card__profil__option {
        flex-direction: column;
    }
    .btn {
        padding: 0.2rem 0.4rem;
    }
}
@media (max-width: 410px) {
    .comment__profil__info {
        flex-direction: column;
    }
}
</style>
