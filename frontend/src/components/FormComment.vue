<template>
    <form class="form">
        <div class="form__group">
            
            <textarea
                ref="textarea"
                aria-label="ecrire un commentaire"
                name="contentComment" 
                id="input-comment" 
                cols="30" rows="3"
                v-model="contentComment"
                :class="errorContentComment ? 'errorComment' : ''"
                class="form__group__input"
                placeholder="Ecrivez un commentaire :">
            </textarea>
        </div>
        <button @click.prevent="sendComment()" class="btn" type="submit">Envoyer</button>
    </form>
</template>

<script>
import axios from 'axios'
export default {
    props:  ["postId"],
    name: "formComment",
    data() {
        return {
            errorContentComment: false,
            contentComment:"",
            token: "Bearer " + localStorage.getItem("token"),
            userId: localStorage.getItem("userId"),
        }
    },
    methods: {
        openFormComment() {
            this.writeComment = !this.writeComment
        },
        sendComment() {
            if (this.contentComment === "") {
                this.errorContentComment = true
            }
            else {
                const data = {
                    userId: parseInt(this.userId),
                    contentComment: this.contentComment,
                    postId: this.postId
                }
                console.log(data);
                axios.post("http://localhost:3000/api/comment",
                data,
                {"headers": 
                    {"Authorization": this.token}
                })
                .then(
                    
                    console.log("commentaire créer")
                    )
                //.then (this.$router.go(("/home")))
                .catch(error => console.log({error}))
            }
        }
    }
}
</script>

<style lang="scss" scoped>

    .form{
        padding: 0.5rem;
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
        &__group {
            display: flex;
            flex-direction: column;
            margin: 0.5rem 0;
            &__input {
                width: 100%;
                margin: 0.3rem 0;
                padding: 0.3rem;
                border: solid 1px #6c757d;
                border-radius: 0.3rem;
                font-size: 1rem;
                font-family: Helvetica, sans-serif;
                overflow: visible;
                &:focus {
                    outline: none;
                    border-color: #ffc107;
                }
            }
        }
    }
    .btn {
    bottom: 0;
    right: 0.5rem;
    cursor: pointer;
    padding: 0.1rem 0.6rem;
    border: 2px solid black;
    background: none;
    color: black;
    border-radius: 0.3rem;
    font-size: 1rem;
    margin: 0.3rem 0;
    transition: all 0.2s linear;
    align-self: flex-end;
    &:focus {
        outline: none;
        border-color: black;
        color: white;
        background: #000;
    }
    &:hover {
        color: white;
        background: #000;
    }
}
    textarea{
        resize: vertical;
    }
    .errorComment{
    border-color: red;
}

</style>