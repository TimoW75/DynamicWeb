<script setup>
    import vLazyImage from 'v-lazy-image';
</script>

<template>
    
    <p class="caption"v-html="data.Name"></p>
    <input type="hidden" v-model="imageName" name="imageName">
    <div>
        <label class="custum-file-upload" for="Image">
            <v-lazy-image :src="image" alt="image" />
            <input type="file" multiple v-on:change="changeImage" id="Image" name="Image">
        </label>
    </div>

</template>

<script>

export default {
    name: 'Image',
    props: {
        data: Object,
        savedData: Object,
    },
    data() {
        return {
            image: '',
            imageName: '',
        }
    },
    watch: {
        savedData: {
            handler() {
                if(this?.savedData[0]?.ImageUrl == null) return;
                this.image = `/assets/img/${this?.savedData[0]?.ImageUrl}` ;
                this.imageName = this?.savedData[0]?.ImageUrl;
            },
            immediate: true
        }
    },
    methods: {
        changeImage(event) {
            const file = event.target.files[0];
            this.imageName = file.name;
            this.image = URL.createObjectURL(file);
        }
    }
}
</script>