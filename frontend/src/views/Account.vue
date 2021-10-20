<template>
    <div class="container">
        <h2 class="title" >
            Mon compte
        </h2>
        <div class="info-user">
            <p class="info-user__name">
                Nom : {{currentUser.name}}
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
            <button @click="reveleDeleteConfirmation" v-if="!reveleConfirmation" class="delete-user__btn btn">Supprimer mon compte</button>
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
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    name: "account",
    setup() {
        const store = useStore()
        const router = useRouter()
        const currentUser = store.state.users.currentUser
        const reveleConfirmation = ref(false)
        const token =`Bearer ${currentUser.token}`

        function reveleDeleteConfirmation () {
            reveleConfirmation.value = !reveleConfirmation.value
        }

        async function deleteAccount () {
            let id = currentUser.userId
            await store.dispatch('users/removeUser', {id, token})
            router.push('/')
        }

        return {
            currentUser,
            reveleConfirmation,
            reveleDeleteConfirmation,
            deleteAccount
        }
    },
    
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