<template>
    <div class="card">
        <div class="card__profil">
            <div class="card__profil__initial-user">
                <p>{{ currentUser.initial }}</p>
            </div>
            <div class="card__profil__name">
                <p>
                    {{ currentUser.name }}
                </p>
            </div>
        </div>
        <form :id="formPost" class="form" enctype="multipart/form-data">
            <div class="form__group">
                <label class="form__group__label" for="input"
                    >Vous voulez modifier votre post !!!</label
                >
                <textarea
                    :class="errorContentPost ? 'errorPost': ''"
                    class="form__group__input"
                    v-model="contentPost"
                    name="contentPost"
                    id="input"
                    cols="30"
                    rows="4"
                ></textarea>
            </div>
            <div class="form__group form__group--file">
                <input
                    @change="modifyUploadImage()"
                    ref="img"
                    id="input-file-modify"
                    class="form__group__input form__group__input--file"
                    type="file"
                    name="img"
                    accept=".jpg, .jpeg, .png, .gif"
                />
                <label
                    class="form__group__label form__group__label--file"
                    for="input-file-modify"
                    >Modifier votre photo</label
                >
            </div>
            <p class="file-return" v-if="img != null" >
                votre image : {{ nameImage}}
            </p>
            <button @click.prevent="verifBeforeSendModifyPost()" class="btn" type="submit">Modifier</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
    props: ["id", "toggleModale"],
    name: "formModifyPost",

    setup(props) {
        const store = useStore()

        const token = `Bearer ${store.state.users.currentUser.token}`
        const currentUser = store.state.users.currentUser
        
        const img = ref(null)
        const nameImage = ref(null)
        const formPost = ref({})
        const contentPost = ref("")
        const errorContentPost = ref(false)

        function modifyUploadImage () {
            img.value = img.value.files[0];
            nameImage.value = img.value.name;  
        }

        async function  verifBeforeSendModifyPost  () {
            const data = new FormData()
            //errur si aucun contenu
            if (!img.value.files.length  && !contentPost.value  ) {
                errorContentPost.value = true
            }
            // erreur si texte vide avec image
            else if (!contentPost.value) {
                errorContentPost.value = true
            }
            // envoie post texte sans image
            else if ( !img.value.files.length && contentPost.value !== "" ) {
                errorContentPost.value = false
                data.append("userId", currentUser.userId)
                data.append("contentPost", contentPost.value)
                await sendModifyPost(data)

            }
            // envoie post avec image
            else {
                errorContentPost.value = false
                data.append("userId", currentUser.userId);
                data.append("contentPost", contentPost.value);
                data.append("image", img.value.files[0], nameImage.value);
                await sendModifyPost(data)               
            }
        }

        const sendModifyPost = async ( data ) => {
            let id = props.id
            await store.dispatch("posts/modifyPost", {data, token, id})
            props.toggleModale()
        }

        return {
            store,
            modifyUploadImage,
            img,
            nameImage,
            formPost,
            contentPost,
            errorContentPost,
            currentUser,
            verifBeforeSendModifyPost
        }

    },

    
}
</script>

<style lang="scss" scoped>
.card {
    background: white;
    width: 95%;
    max-width: 600px;
    margin: 0.5rem 0;
    min-height: 10rem;
    border: #f1f1f1 solid 1px;
    box-shadow: 1px 1px 2px;
    padding: 0.5rem;
    border-radius: .5rem;
    &__profil {
        display: flex;
        padding-bottom: 0.3rem;
        border-bottom: black 1px solid;
        &__initial-user {
            display: flex;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            box-shadow: 1px 1px 5px;
            //border: 1px solid black;
            margin-right: 1rem;
            & p {
                font-size: 1.2rem;
                font-weight: bold;
                margin: auto;
            }
        }
        &__name {
            display: flex;
            align-items: center;
            font-size: 1.1rem;
        }
    }
    &__content {
        width: 100%;
        &__post {
            padding: 0.5rem 0;
            & p {
                white-space: pre-line;
            }
        }
        & img {
            width: 100%;
            border-radius: 0.5rem;
        }
    }
}
.form {
    padding: 0.5rem;
    position: relative;
    &__group {
        display: flex;
        flex-direction: column;
        margin: 0.5rem 0;
        &--file {
            width: 9rem;
            height: 1.4rem;
            margin: 0;
            position: relative;
        }
        &__label {
            margin-bottom: 0.2rem;
            &--file {
                cursor: pointer;
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                font-size: 0.8rem;
                color: white;
                background: #198754;
                width: 9rem;
                text-align: center;
                padding: 0.3rem;
                 transition: all 0.2s linear;
                 border-radius: .3rem;
                &:hover {
                    background: darken($color: #198754, $amount: 15);
                }
                &:focus {
                    background: darken($color: #198754, $amount: 15);
                }
            }
        }
        &__input {
            width: 100%;
            margin: 0.3rem 0;
            padding: 0.3rem;
            border: solid 1px #6c757d;
            border-radius: 0.3rem;
            font-size: 1rem;
            font-family: Helvetica, sans-serif;
            &:focus {
                outline: none;
                border-color: #ffc107;
            }
            &--file {
                width: 9rem;
                font-size: 0.8rem;
                margin: 0;
                cursor: pointer;
                position: absolute;
                top: 0;
                left: 0;
                padding: 0;
                opacity: 0;
                &:hover + .form__group__label--file {
                    background: darken($color: #198754, $amount: 15);
                }
                &:focus + .form__group__label--file {
                    background: darken($color: #198754, $amount: 15);
                }
            }
        }
    }
}
.file-return {
    margin-top: 0.2rem;
    font-size: 0.8rem;
}
textarea{
    resize: vertical;
}
.errorPost{
    border-color: red;
}
.btn {
    position: absolute;
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
    &:focus {
        outline: none;
        border-color: black;
    }
    &:hover {
        background: darken($color: #0d6efd, $amount: 15);
    }
}
</style>
