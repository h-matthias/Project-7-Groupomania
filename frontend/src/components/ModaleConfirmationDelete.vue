<template>
    <div class="bloc-modale" v-if="revele && action=='delete'">
        <div class="overlay" @click="toggleModale"></div>
        <div class="modale">
            <h2 class="modale__title">
                Ete-vous sur de vouloir supprimer votre
                {{ mode === "comment" ? "commentaire." : "publication." }}
            </h2>
            <p v-if="response !== ''">{{ response }}</p>
            <div class="modale__block-btn">
                <button class="modale__btn" @click="remove">
                    Oui
                </button>
                <button @click="toggleModale" class="modale__btn modale__btn--no">
                    Non
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from '@vue/reactivity';
export default {
    name: "delete",
    props: ["revele", "mode", "id", "toggleModale", "action"],

    setup(props) {
        const store = useStore()
        const token = `Bearer ${store.state.users.currentUser.token}`
        const response = ref("")

        const remove = async () => {
            let mode = props.mode
            let id = props.id

            const res = await store.dispatch("posts/removePostOrComment", {mode, token, id} )
            console.log(res);
            if (res) {
                response.value = `${mode} supprimé`
                setTimeout(() => {
                    props.toggleModale()
                }, 1000);  
            } else {
                response.value = "Un erreur est survenue ré-essayer."
            }
            setTimeout(() => {
                response.value = ""
            }, 1500);
        }
        return {
            remove,
            response
        }

    }
};
</script>

<style lang="scss" scoped>
.bloc-modale {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.overlay {
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
}
.modale {
    background: #f1f1f1;
    color: #333;
    position: fixed;
    padding: 1.3rem;
width: 95%;
    max-width: 600px;
    border-radius: 0.3rem;
    display: flex;
    flex-direction: column;
    &__title {
        font-size: 1.2rem;
    }
    &__block-btn {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    &__btn {
        margin: 1rem 0;
        width: 5rem;
        height: 3rem;
        cursor: pointer;
        padding: 0.3rem 0.4rem;
        border: 2px solid transparent;
        background: #dc3545;
        color: white;
        border-radius: 0.3rem;
        font-size: 1rem;
        &:focus {
            outline: none;
            border-color: black;
        }
        &:hover {
            background: darken($color: #dc3545, $amount: 15%);
        }
        &--no {
            background: #198754;
            &:hover {
                background: darken($color: #198754, $amount: 15%);
            }
        }
    }
}
</style>
