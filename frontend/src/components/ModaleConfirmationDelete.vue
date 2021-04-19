<template>
    <div class="bloc-modale" v-if="revele && action=='delete'">
        <div class="overlay" @click="toggleModale"></div>
        <div class="modale">
            <h2 class="modale__title">
                Ete-vous sur de vouloir supprimer votre
                {{ mode === "comment" ? "commentaire." : "publication." }}
            </h2>
            <p v-if="reponse !== ''">{{ reponse }}</p>
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
import axios from "axios";
export default {
    name: "delete",
    props: ["revele", "mode", "id", "toggleModale", "action"],
    data() {
        return {
            reponse: "",
            token: "Bearer " + localStorage.getItem("token"),
        };
    },
    methods: {
        remove() {
            axios
                .delete(`http://localhost:3000/api/${this.mode}/${this.id}`, {
                    headers: { Authorization: this.token },
                })
                .then(() => {
                    this.reponse = `${this.mode} supprimé`;
                    setTimeout(() => {
                        this.$router.go("/home");
                    }, 1000);
                })
                .catch(
                    (this.reponse = "Oups un erreur est survenue ré-essayer.")
                );
        }
    },
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
