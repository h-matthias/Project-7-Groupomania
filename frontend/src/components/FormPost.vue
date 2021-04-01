<template>
    <div class="carte">
        <div class="carte__profil">
            <div class="carte__profil__initial-user">
                <p>{{ user.initial }}</p>
            </div>
            <div class="carte__profil__name">
                <p>
                    {{ user.name }}
                </p>
            </div>
        </div>
        <form :id="formPost" class="form" enctype="multipart/form-data">
            <div class="form__group">
                <label class="form__group__label" for="input"
                    >Comment était votre journée ?</label
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
                    @change="uploadImage()"
                    ref="image"
                    id="input-file"
                    class="form__group__input form__group__input--file"
                    type="file"
                    name="image"
                    accept=".jpg, .jpeg, .png, .gif"
                />
                <label
                    class="form__group__label form__group__label--file"
                    for="input-file"
                    >Ajouter une photo</label
                >
            </div>
            <p class="file-return" v-if="image != null" >
                <!-- Votre image : {{ nameImage.split("fakepath\\")[1] }} -->
                votre image : {{ image.name}}
            </p>
            <button @click.prevent="sendPost()" class="btn" type="submit">Envoyer</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "formPost",
    props: [ "token", "userId"],
    data() {
        return {
            user: {},
            image: null,
            contentPost: "",
            formPost: {},
            errorContentPost: false
        };
    },
    mounted() {
        this.loadInfoUser();
    },
    methods: {
        loadInfoUser() {
            axios
                .get("http://localhost:3000/api/auth/" + this.userId)
                .then((res) => {
                    this.user = res.data;
                })
                .catch((error) => console.log({ error }));
        },
        uploadImage(){

            this.image = this.$refs.image.files[0];
            console.log(this.$refs.image.files[0]);

        },
        sendPost(){
            const data = new FormData()
            if (this.image === null && !this.contentPost){
                this.errorContentPost = true;
                console.log("post vide et image vide");

            } else if (this.contentPost === "") {
                this.errorContentPost = true;
                console.log("content vide");
                return
            } else if (this.image === null && this.contentPost!=="") {
                this.errorContentPost=false
                data.append("userId", this.userId);
                data.append("contentPost", this.contentPost);
                console.log(data, this.contentPost );
                this.axiosPost(data);
                
            } else {
                data.append("userId", this.userId);
                data.append("contentPost", this.contentPost);
                data.append("image", this.image, this.image.name);
                console.log(data, this.contentPost, this.image);
                this.axiosPost(data);
                
            }
        },
        axiosPost(data) {
            axios.post("http://localhost:3000/api/post",
                data,
                {"headers": 
                    {"Authorization": this.token}
                })
            .then( console.log("post créer") )
            .then( this.$router.go('/home') )
            .catch( error => console.log({error}))
        }
    },
};
</script>

<style lang="scss" scoped>
.carte {
    width: 95%;
    max-width: 600px;
    margin: 0.5rem 0;
    min-height: 10rem;
    border: #f1f1f1 solid 1px;
    box-shadow: 1px 1px 4px;
    padding: 0.5rem;
    &__profil {
        display: flex;
        padding-bottom: 0.3rem;
        border-bottom: black 1px solid;
        &__initial-user {
            display: flex;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 1px solid black;
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
        &--file {
            width: 9rem;
            height: 1.4rem;
            margin: 0;
            position: relative;
        }
        display: flex;
        flex-direction: column;
        margin: 0.5rem 0;
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
    resize: none;
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
    &:focus {
        outline: none;
        border-color: black;
    }
    &:hover {
        background: darken($color: #0d6efd, $amount: 15);
    }
}
</style>
