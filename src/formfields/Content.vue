<script setup>


</script>

<template>
    
    <p class="caption"v-html="data.Name"></p>
    <div>
        
        <textarea name="Content" id="" cols="30" rows="10">
            {{ Content }}
        </textarea>

        <QuillEditor name="Content"
        v-model:content="Content"  contentType="html"
        :toolbar="toolbarOptions"
        theme="snow" />


    </div>
    
</template>

<script>
export default {
    name: 'Content',
    props: {
        data: Object,
        savedData: Object,
    },
    data() {
        return {
            Content: '',
            toolbarOptions: [
                [{ 'align': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],

                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['link', 'image'],

                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

                ['clean']                                         // remove formatting button
            ]
        }
    },
    mounted() {
        this.Content = this.savedData[0] ? this.savedData[0].Content : '';
    }
}
</script>
