<template>
    <div class="bloc-modale" v-if="revele">
        <div class="overlay" @click="toggleModale"></div>

        <div class="modale">
            <div class="modale__header">
                <h2 class="modale__header__title">Créer un compte</h2>
                <div class="modale__header__btn" @click="toggleModale">X</div>
            </div>

            <form class="form">
                <!-- lastname -->
                <div class="form__bloc">
                    <label for="lastname" class="form__bloc__label"
                        >Votre nom :</label
                    >
                    <input
                        type="text"
                        class="form__bloc__input"
                        v-model="user.lastname"
                        @blur="checkLastname"
                        id="lastname"
                        name="lastname"
                        required
                        aria-describedby="lastnameError"
                    />
                    <div class="form__bloc__error" >
                        <p
                            id="lastnameError"
                            class="form__bloc__error--danger"
                        >
                            {{ errorText.lastname }}
                        </p>
                    </div>
                </div>
                <!-- firstname -->
                <div class="form__bloc">
                    <label for="firstname" class="form__bloc__label"
                        >Votre prénom :</label
                    >
                    <input
                        type="text"
                        class="form__bloc__input"
                        v-model="user.firstname"
                        @blur="checkFirstname"
                        id="firstname"
                        name="firstname"
                        required
                        aria-describedby="firstnameError"

                    />
                    <div class="form__bloc__error">
                        <p
                            id="firstnameError"
                            class="form__bloc__error--danger"
                        >
                            {{ errorText.firstname }}
                        </p>
                    </div>
                </div>
                <!-- email -->
                <div class="form__bloc">
                    <label for="emailsignup" class="form__bloc__label"
                        >Votre email :</label
                    >
                    <input
                        type="email"
                        class="form__bloc__input"
                        v-model="user.email"
                        @blur="checkEmail"
                        id="emailsignup"
                        name="email"
                        required
                        aria-describedby="emailError"

                    />
                    <div class="form__bloc__error">
                        <p class="form__bloc__error--danger"
                            id="emailError"
                        >
                            {{ errorText.email }}
                        </p>
                    </div>
                </div>
                <!-- password -->
                <div class="form__bloc">
                    <label for="passsignup" class="form__bloc__label"
                        >Votre password :</label
                    >
                    <input
                        type="password"
                        class="form__bloc__input"
                        v-model="user.password"
                        @blur="checkPassword"
                        id="passsignup"
                        name="password"
                        required
                        aria-describedby="passwordError"

                    />
                    <div class="form__bloc__error">
                        <p
                            id="passwordError"
                            :class="{
                                'form__bloc__error--danger': error.password,
                            }"
                        >
                            Votre mot de passe doit comporter entre 6 et 15
                            caractères, contenir au moin une lettre majuscule,
                            une lettre minuscule et un chiffre.
                        </p>
                    </div>
                </div>
                <!-- validation -->
                <button
                    :disabled="!formValide"
                    :class="{ 'form__bloc__btn--disable': !formValide }"
                    class="form__bloc__btn"
                    @click.prevent="sendFormCreateUser()"
                >
                    S'inscrire
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

export default {
    props: ["revele", "toggleModale"],


    setup() {
        
        const router = useRouter()
        const store = useStore()

        const state = reactive({
            user: {
                lastname: "",
                firstname: "",
                email: "",
                password: "",
            },
            errorText: {
                lastname: "",
                firstname: "",
                email: "",
            },
            error: {
                lastname: true,
                firstname: true,
                email: true,
                password: true,
            },
            formValide: false,
        })

        /** Regex de validation */
        const regexCheckName = (name) => {
            return /^[A-Za-z]{1,}$/.test(name);
        }
        const regexCheckEmail = (email) => {
            return /^[\w-\\.]+@groupomania.fr$/.test(email);
        }
        const regexCheckPass = (pass) => {
            return /^(?=.*[A-Z]{1,})(?=.*[a-z]{1,})(?=.*[0-9]{1,})[a-zA-Z0-9]{6,15}$/.test(pass);
        }

        /*** controle de donnée utilisant les regex */
        const checkLastname = () => {
            if (!regexCheckName(state.user.lastname)) {
                state.errorText.lastname =
                    "Entrez un seul nom sans espace ni caractéres spéciaux.";
                state.user.lastname = "";
            } else {
                state.errorText.lastname = "";
                state.error.lastname = false;
            }
            checkForm();
        }

        const checkFirstname = () => {
            if (!regexCheckName(state.user.firstname)) {
                state.errorText.firstname =
                    "Entrez un seul prénom sans espace ni caractéres spéciaux.";
                state.user.firstname = "";
            } else {
                state.errorText.firstname = "";
                state.error.firstname = false;
            }
            checkForm();
        }

        const checkEmail = () => {
            if (!regexCheckEmail(state.user.email)) {
                state.errorText.email =
                    'Entrez votre email Groupomania " votreNom@groupomania.fr ". ';
                state.error.email = true;
            } else {
                state.errorText.email = "";
                state.error.email = false;
            }
            checkForm();
        }

        const checkPassword = () => {
            if (!regexCheckPass(state.user.password)) {
                state.error.password = true;
                state.user.password = null;
            } else {
                state.error.password = false;
            }
            checkForm();
        }

        const checkForm = () => {
            if (
                state.error.lastname ||
                state.error.firstname ||
                state.error.email ||
                state.error.password
            ) {
                state.formValide = false;
            } else {
                state.formValide = true;
            }
        }

        const sendFormCreateUser = async () => {
            if (state.formValide) {
                const res = await store.dispatch('users/signup', state.user )
                if (res ===  true) {
                    router.push('home')
                } else {
                    state.error.email = true;
                    state.errorText.email = res
                }
            }
        }


        return {
            ...toRefs(state),
            checkLastname,
            checkFirstname,
            checkEmail,
            checkPassword,
            sendFormCreateUser
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
    padding: 1.3rem;
    position: fixed;
    min-width: 310px;
    width: 45%;
    border-radius: 0.3rem;
    &__header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1.2rem;
        &__title {
            font-size: 1.4rem;
        }
        &__btn {
            background: #dc3545;
            color: white;
            top: 0.8rem;
            right: 0.8rem;
            padding: 0.2rem 0.4rem;
            border-radius: 0.3rem;
        }
    }
}
.form {
    &__bloc {
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
            &--disable {
                cursor: default;
                background: #6c757d;
                &:focus {
                    background: #6c757d;
                    outline: none;
                    border-color: black;
                }
                &:hover {
                    background: darken($color: #6c757d, $amount: 15);
                }
            }
        }
        &__error {
            padding: 0.2rem;
            font-size: 0.8rem;
            &--danger {
                color: #dc3545;
            }
        }
    }
}
</style>
