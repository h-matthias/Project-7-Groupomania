<template>
    <form class="form">
        <div class="form__group">
            <div class="form__group__profil">
                <p>{{ currentUser.initial }}</p>
            </div>

            <textarea
                ref="textarea"
                aria-label="ecrire un commentaire"
                name="contentComment"
                id="input-comment"
                cols="30"
                rows="1"
                v-model="contentComment"
                :class="errorContentComment ? 'errorComment' : ''"
                class="form__group__input"
                placeholder="Ecrivez un commentaire :"
            >
            </textarea>
        </div>
        <button
            v-if="contentComment"
            @click.prevent="verifBeforeSendComment()"
            class="btn"
            type="submit"
        >
            Envoyer
        </button>
    </form>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";

export default {
    props: ["postId"],
    setup(props) {
        const store = useStore();

        const token = `Bearer ${store.state.users.currentUser.token}`

        const state = reactive({
            errorContentComment: false,
            contentComment: "",
            currentUser: store.state.users.currentUser,
        });

        async function verifBeforeSendComment() {
            if (state.contentComment === "") {
                state.errorContentComment = true;
            } else {
                const comment = {
                    userId: state.currentUser.userId,
                    contentComment: state.contentComment,
                    postId: props.postId,
                };
                await sendcomment(comment);
                state.contentComment=""
            }
        }

        const sendcomment = async (comment) => {
            await store.dispatch("posts/sendComment", { comment, token });
        };

        return {
            ...toRefs(state),
            verifBeforeSendComment,
        };
    },
};
</script>

<style lang="scss" scoped>
.form {
    margin-top: 0.5rem;
    background: #f9f9f9;
    border-radius: 0.5rem;
    box-shadow: 1px 1px 2px;
    padding: 0.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    &__group {
        width: 100%;
        display: flex;
        align-items: baseline;
        margin: 0.5rem 0;
        &__input {
            flex-grow: 1;
            margin: 0.3rem 0;
            padding: 0.3rem;
            border: solid 1px #6c757d;
            border-radius: 0.3rem;
            font-size: 0.8rem;
            font-family: Helvetica, sans-serif;
            overflow: visible;
            &:focus {
                outline: none;
                border-color: #ffc107;
            }
        }
        &__profil {
            flex-shrink: 0;
            width: 1.5rem;
            height: 1.5rem;
            margin-right: 0.5rem;
            font-size: 0.8rem;
            display: flex;
            box-shadow: 1px 1px 5px;
            //border:  1px solid black;
            border-radius: 50%;
            & p {
                margin: auto;
                font-weight: 500;
            }
        }
    }
}
.btn {
    bottom: 0;
    right: 0.5rem;
    cursor: pointer;
    padding: 0.1rem 0.6rem;
    border: 2px solid transparent;
    background: #0d6efd;
    color: white;
    border-radius: 0.3rem;
    font-size: 1rem;
    margin: 0.3rem 0;
    transition: all 0.2s linear;
    align-self: flex-end;
    &:focus {
        outline: none;
        border-color: black;
    }
    &:hover {
        background: darken($color: #0d6efd, $amount: 15);
    }
}
textarea {
    resize: vertical;
}
.errorComment {
    border-color: red;
}
</style>
