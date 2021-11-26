<template>
    <div>
        <h1>Page introuvable</h1>
        <button @click="goToPreviousPage" >
            Revenir en arrière
        </button>
    </div>
</template>

<script>
import { useRouter} from "vue-router";
export default {
    setup() {
        const router = useRouter();

        const goToPreviousPage = function() {
            router.back();
        };

        return {
            goToPreviousPage,
        };
    },
};
</script>

<style lang="scss" scoped>

div{
    display: flex;
    justify-content: center;
    align-items:center ;
    flex-direction: column;
    margin-top: 1rem;
}

button{
    cursor: pointer;
    padding: 0.5rem 0.6rem;
    border: 2px solid transparent;
    background: #0d6efd;
    color: white;
    border-radius: 0.3rem;
    font-size: 1rem;
    margin: 1rem 0;
     transition: all 0.2s linear;
    &:focus {
        outline: none;
        border-color: black;
    }
    &:hover {
        background: darken($color: #0d6efd, $amount: 15);
    }
}

</style>
