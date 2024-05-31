<script setup>
    
</script>

<template>

    <div v-for="button in Button" :class='`${button.Template} ctaButton`' v-if="Button[0].ButtonText != ''">
        <router-link :to="button.ButtonLink" v-html="button.ButtonText">
        
        </router-link>
    </div>

</template>

<script>
export default {
    props: {
        Button: Array,
    },
    mounted() {

    },
    methods: {

    }
}
</script>