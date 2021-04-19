<template>
    <form class="form">
        <div class="form__group">
            <div class="form__group__profil">
                <p> {{ userCurrent.initial }} </p>
            </div>
            
            <textarea
                ref="textarea"
                aria-label="ecrire un commentaire"
                name="contentComment" 
                id="input-comment" 
                cols="30" rows="1"
                v-model="contentComment"
                :class="errorContentComment ? 'errorComment' : ''"
                class="form__group__input"
                placeholder="Ecrivez un commentaire :">
            </textarea>
            
        </div>
        <button v-if="contentComment" @click.prevent="sendComment()" class="btn" type="submit">Envoyer</button>
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
            userCurrent: JSON.parse(localStorage.getItem("userCurrent"))
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
                .then (this.$router.go(("/home")))
                .catch(error => console.log({error}))
            }
        }
    }
}
</script>

<style lang="scss" scoped>

    .form{
        margin-top: .5rem;
        background:#f9f9f9;
        border-radius: .5rem;
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
                font-size: .8rem;
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
                margin-right: .5rem;
                font-size: .8rem;
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
    textarea{
        resize: vertical;
    }
    .errorComment{
        border-color: red;
    }

</style>