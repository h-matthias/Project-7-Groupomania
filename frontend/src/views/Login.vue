<template>
    <div class="bloc-page">
        <div>
            <h2>Bienvenue sur le résau social de <span>Groupomania</span>.</h2>
            <p class="info">Réserve aux employé</p>
        </div>

        <div class="container">
            <p>Entrez vos informations pour vous connecter.</p>

            <form class="form">
                <!-- login -->
                <div class="form__group">
                    <label class="form__group__label" for="email"
                        >Votre Email :
                        <span class="error" id="emailError">{{
                            error.email
                        }}</span></label
                    >
                    <input
                        class="form__group__input"
                        type="email"
                        name="email"
                        id="email"
                        v-model="user.email"
                        aria-describedby="emailError"
                    />
                </div>
                <div class="form__group">
                    <label class="form__group__label" for="password"
                        >Votre mot de passe :
                        <span class="error" id="passwordError">{{
                            error.pass
                        }}</span></label
                    >
                    <input
                        class="form__group__input"
                        type="password"
                        name="password"
                        id="password"
                        v-model="user.password"
                        aria-describedby="passwordError"
                    />
                </div>

                <button @click.prevent="sendForm" class="form__btn">
                    Se connecter
                </button>

                <!-- inscription -->
                <p>Vous n'avez pas de compte ?</p>
                <button
                    class="form__btn form__btn--signup"
                    @click.prevent="toggleModale"
                >
                    Créez un compte
                </button>
            </form>
            <ModaleSignup
                :class="{ 'enter-active': revele, 'out-active': animReverse }"
                :revele="revele"
                :toggleModale="toggleModale"
            />
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ModaleSignup from "../components/ModaleSignup.vue";

export default {
    components: {
        ModaleSignup,
    },
    setup() {
        const router = useRouter();
        const store = useStore();

        const state = reactive({
            user: {
                email: "",
                password: "",
            },
            error: {
                email: "",
                pass: "",
            },
            token: "",
            revele: false,
            animReverse: false,
        });
        //envoie formulaire pour la connection
        const sendForm = async () => {
            if (state.user.email === "") {
                state.error.email = "Entrez un email.";
            } else {
                const res = await store.dispatch("users/login", state.user);
                if (res === true) {
                    router.push("home");
                } else {
                    if (res === "mot de passe incorrect") {
                        state.error.pass = res;
                    } else {
                        state.error.email = res;
                    }
                }
            }
        };
        //Apparition modale inscription
        const toggleModale = () => {
            if (!state.revele) {
                state.revele = !state.revele;
            } else {
                state.animReverse = !state.animReverse;
                setTimeout(() => {
                    (state.revele = !state.revele),
                        (state.animReverse = !state.animReverse);
                }, 500);
            }
        };

        return {
            ...toRefs(state),
            sendForm,
            toggleModale,
        };
    },
};
</script>

<style lang="scss" scoped>
.bloc-page {
    background: white;
    padding: 0.5rem;
    box-shadow: 1px 1px 2px;
}

h2 {
    margin: 0.5rem;
    font-size: 1.6rem;
}
.info {
    margin: 0.6rem;
}

.container {
    margin-top: 1.2rem;
    padding: 0.5rem;
    width: 100%;
    max-width: 30rem;
}

.form {
    //margin-top: .5rem;
    padding: 0.5rem;
    &__group {
        display: flex;
        flex-direction: column;
        margin: 1rem 0;
        &__label {
            margin-bottom: 0.5rem;
        }
        &__input {
            padding: 0.3rem;
            border: solid 1px #6c757d;
            border-radius: 0.3rem;
            font-size: 1rem;
            font-family: Helvetica, sans-serif;
            &:focus {
                outline: none;
                border-color: #ffc107;
            }
        }
    }
    &__btn {
        cursor: pointer;
        padding: 0.3rem 0.4rem;
        border: 2px solid transparent;
        background: #0d6efd;
        color: white;
        border-radius: 0.3rem;
        font-size: 1rem;
        margin: 1rem 0;
        &:focus {
            outline: none;
            border-color: black;
        }
        &:hover {
            background: darken($color: #0d6efd, $amount: 15);
        }
        &--signup {
            background: #198754;
            &:hover {
                background: darken($color: #198754, $amount: 15);
            }
        }
    }
    & > p {
        margin-top: 1rem;
    }
}
.error {
    font-size: 0.8rem;
    color: #dc3545;
}
</style>
<style>
.enter-active {
    animation: appare 0.5s;
}
@keyframes appare {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
.out-active {
    animation: dispare 0.5s;
}
@keyframes dispare {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>
