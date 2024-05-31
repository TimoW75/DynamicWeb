<script setup>
    
</script>

<template>
    <div class="ctaHeader" v-for="subheader in Subheader" v-if="Subheader[0].Subheader != ''">
        <component :is="subheader.SubheaderStyle" v-html="subheader.Subheader"></component>
    </div>
</template>

<script>
export default {
    props: {
        Subheader: Array,
    },
    mounted() {

    },
    methods: {

    }
}
</script>