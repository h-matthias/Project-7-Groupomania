<template>
    <header>
        <headerNav />
    </header>

    <main>
        <h1>Bienvenue sur le résau social de <span>Groupomania</span>.</h1>
        <p>Réserve aux employé</p>

        <div class="container">
            <p>Entrez vos informations pour vous connecter.</p>

            <form class="form">
                <!-- login -->
                <div class="form__group">
                    <label class="form__group__label" for="email"
                        >Votre Email :</label
                    >
                    <input
                        class="form__group__input"
                        type="email"
                        name="email"
                        id="email"
                        v-model="user.email"
                    />
                </div>
                <div class="form__group">
                    <label class="form__group__label" for="password"
                        >Votre mot de passe :</label
                    >
                    <input
                        class="form__group__input"
                        type="password"
                        name="password"
                        id="password"
                        v-model="user.password"
                    />
                </div>

                <button 
                    @click.prevent="login" 
                    class="form__btn">
                        Se connecter
                </button>

                <!-- inscription -->
                <p>Vous n'avez pas de compte ?</p>
                <button class="form__btn form__btn--signup">
                    Créez un compte
                </button>
            </form>
        </div>
    </main>
</template>

<script>
import headerNav from "../components/HeaderLogin";
import axios from "axios";
export default {
    name: "login",
    components: {
        headerNav,
    },
    data() {
        return {
            user: {
                email: "",
                password: "",
            },
            token:""
        };
    },
    methods: {
        login: function() {
            axios
                .post("http://localhost:3000/api/auth/login", this.user)
                .then((res) => {
                    localStorage.setItem("token", JSON.stringify(res.data.token))
                    
                })
                .catch((error) => console.log(error));
        },
    },
};
</script>

<style lang="scss" scoped>
h1 {
    margin: 0.5rem;
    font-size: 1.4rem;
}
main > p {
    white-space: nowrap;
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
            border: solid 2px #0d6efd;
            border-radius: 5px;
            font-size: 1rem;
            font-family: Helvetica, sans-serif;
            &:focus {
                outline: none;
                border-color: #ffc107;
            }
        }
    }
    &__btn {
        padding: 0.3rem 0.4rem;
        border: none;
        background: #0d6efd;
        color: white;
        border-radius: 5px;
        font-size: 1rem;
        margin: 1rem 0;
        &--signup {
            background: #198754;
        }
    }
    & > p {
        margin-top: 1rem;
    }
}
</style>
