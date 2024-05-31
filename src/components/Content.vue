
<template>

    <div class="ctaContent" v-for="content in Content" v-if="Content[0].Content != '\n            \n        '">
        <p class="ql-editor" v-html="content.Content"></p>
    </div>


</template>

<script>
export default {
    props: {
        Content: Array,
    },    
    mounted() {

    },
    methods: {

    }
}
</script>