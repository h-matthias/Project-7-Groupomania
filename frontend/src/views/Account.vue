<template>
    <div class="container">
        <h2 class="title" >
            Mon compte
        </h2>
        <div class="info-user">
            <p class="info-user__name">
                Nom : {{nameUser.name}}
            </p>
        </div>

        <div class="update-info">
            <div class="update-info__password">

            </div>
        </div>

        <h2 class="title" >
            Supprimer le compte
        </h2>
        <div class="delete-user">
            <p class="delete-user__info">
                Cette opération est irreversible. Votre compte sera totalement supprimer, vous ne pourrez plus utiliser les services du résaux social de groupomania.
            </p>
            <button @click="deleteConfirmation" v-if="!reveleConfirmation" class="delete-user__btn btn">Supprimer mon compte</button>
            <div class="confirmed-delete" v-if="reveleConfirmation">
                <p class="delete-user__info">
                    Ete-vous sur de vouloir supprimer votre compte ?
                </p>
                <button @click="deleteAccount" class="delete-user__btn btn">Supprimer mon compte</button>
            </div>
        </div>




    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "account",
    components: {
        
    },
    data(){
        return {
            nameUser:JSON.parse(localStorage.getItem("userCurrent")),
            userId: localStorage.getItem("userId"),
            reveleConfirmation: false,
            token: "Bearer " + localStorage.getItem("token"),
        }
    },
    methods: {
        deleteConfirmation() {
            this.reveleConfirmation = !this.reveleConfirmation
            console.log(this.userId);
        },
        deleteAccount() {
            axios.delete("http://localhost:3000/api/auth/" + this.userId, {"headers": {"Authorization": this.token}})
            .then( () => {
                localStorage.removeItem("userCurrent");
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                this.$router.push("/");
            })
            .catch(err => console.log({err}))
            
        }
    }
}
</script>

<style lang="scss" scoped>
.container{
    padding: 1rem;
    width: 95%;
    max-width: 600px;
    background: white;
    box-shadow: 1px 1px 2px;
}

.title{
    margin: 1rem 0;
}
.info-user{
    margin: 0 2rem;
}

.delete-user{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    border: 1px solid #dc3545;
    &__info{
        color: #dc3545;
        text-align: justify;
        margin-bottom: 1rem;
    }
    &__btn {
        align-self: flex-end;
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
    }
}

</style>