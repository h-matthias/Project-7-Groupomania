<template>
<div class="modale" v-if="revele && action=='modify'">
    <div class="overlay" @click="toggleModale"></div>
    <FormModifyPost class="formPost" v-if="mode == 'post'" :id="id" :toggleModale="toggleModale" />
    <FormModifyComment class="formComment" v-if="mode == 'comment'" :id="id" :toggleModale="toggleModale" />
    
</div>
</template>

<script>
import FormModifyPost from "./FormModifyPost.vue";
import FormModifyComment from "./FormModifyComment";
export default {
    
    props: ["mode", "id", "revele", "action", "toggleModale"],

	components: { 
        FormModifyPost, 
        FormModifyComment
    },

}
</script>

<style lang="scss" scoped>
.modale, .overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
.modale{
    display: flex;
    justify-content: center;
    align-items: center;
}
.overlay{
    background: rgba(0, 0, 0, 0.5);
}
.formPost, .formComment{
    position: fixed
}
.formComment{
    width: 95%;
    max-width: 600px;
}
</style>