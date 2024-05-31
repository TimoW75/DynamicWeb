<script setup>
    
</script>

<template>

    <div :class="extraButton.Template" class="ctaButton" v-for="extraButton in ExtraButton" v-if="ExtraButton[0].ExtraButtonText != ''">
        <router-link :to="extraButton.ExtraButtonLink" v-html="extraButton.ExtraButtonText" :class="extraButton.Template"></router-link>
    </div>

</template>

<script>
export default {
    props: {
        ExtraButton: Array,
    },
    mounted() {

    },
    methods: {

    }
}
</script>