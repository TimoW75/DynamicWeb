<script setup>
    
</script>

<template>

    <div class="ctaHeader" v-for="header in Header" v-if="Header[0].ParagraphHeader != ''">
        <component :is="header.HeaderStyle" v-html="header.ParagraphHeader"></component>
    </div>

</template>

<script>
export default {
    props: {
        Header: Array,
    },
    mounted() {

    },
    methods: {

    }
}
</script>