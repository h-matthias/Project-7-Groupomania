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
                    />
                    <div class="form__bloc__error" v-if="error.lastname">
                        <p
                            v-if="error.lastname"
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
                    />
                    <div class="form__bloc__error" v-if="error.firstname">
                        <p
                            v-if="error.firstname"
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
                    />
                    <div class="form__bloc__error" v-if="error.email">
                        <p v-if="error.email" class="form__bloc__error--danger">
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
                    />
                    <div class="form__bloc__error">
                        <p
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
import axios from "axios";
export default {
    props: ["revele", "toggleModale", "userCurrent"],
    name: "modaleSignup",
    data() {
        return {
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
        };
    },
    methods: {
        regexCheckName(name) {
            return /^[A-Za-z]{1,}$/.test(name);
        },
        regexCheckEmail(email) {
            return /^[\w-\\.]+@groupomania.fr$/.test(email);
        },
        regexCheckPass(pass) {
            return /^(?=.*[A-Z]{1,})(?=.*[a-z]{1,})(?=.*[0-9]{1,})[a-zA-Z0-9]{6,15}$/.test(pass);
        },
        checkLastname() {
            if (!this.regexCheckName(this.user.lastname)) {
                this.errorText.lastname =
                    "Entrez un seul nom sans espace ni caractéres spéciaux.";
                this.user.lastname = "";
            } else {
                this.errorText.lastname = "";
                this.error.lastname = false;
            }
            this.checkForm();
        },
        checkFirstname() {
            if (!this.regexCheckName(this.user.firstname)) {
                this.errorText.firstname =
                    "Entrez un seul prénom sans espace ni caractéres spéciaux.";
                this.user.firstname = "";
            } else {
                this.errorText.firstname = "";
                this.error.firstname = false;
            }
            this.checkForm();
        },
        checkEmail() {
            if (!this.regexCheckEmail(this.user.email)) {
                this.errorText.email =
                    'Entrez votre email Groupomania " votreNom@groupomania.fr ". ';
                this.user.email = "";
            } else {
                this.errorText.email = "";
                this.error.email = false;
            }
            this.checkForm();
        },
        checkPassword() {
            if (!this.regexCheckPass(this.user.password)) {
                this.error.password = true;
                this.user.password = null;
            } else {
                this.error.password = false;
            }
            this.checkForm();
        },
        checkForm() {
            if (
                this.error.lastname ||
                this.error.firstname ||
                this.error.email ||
                this.error.password
            ) {
                this.formValide = false;
            } else {
                this.formValide = true;
            }
        },
        sendFormCreateUser() {
            if (this.formValide) {
                axios
                    .post("http://localhost:3000/api/auth/signup", this.user)
                    .then(() => {
                        this.loginAfterRegister();
                    })
                    .catch(
                        (error) =>{
                            //erreur mail deja enregistre
                           this.error.email = true;
                            this.errorText.email = error.response.data.error
                            }
                    );
            }
        },
        loginAfterRegister() {
            axios
                .post("http://localhost:3000/api/auth/login", this.user)
                .then((res) => {
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("userId", res.data.userId);
                    this.userCurrent();
                    this.$router.push("/home")   
                })
        },
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
