<script setup>
    import vLazyImage from 'v-lazy-image';
</script>

<template>
    <div class="ctaImage"  v-if="Image[0].ImageUrl != '' " v-for="image in Image">
        <v-lazy-image :src="'/assets/img/' + image.ImageUrl" alt="A placeholder image"></v-lazy-image>
    </div>

</template>

<script>
export default {
    props: {
        Image: Array,
    },
    mounted() {

    },
    methods: {

    }
}
</script>