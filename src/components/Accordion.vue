<script setup>
    import { ref } from 'vue'
    import { IconChevronDown, IconChevronUp } from '@tabler/icons-vue'
</script>

<template>               
    <div class="accordion">
        <div @click="togglePanel" class="toggle">
            <div v-if="showPanel">
                <IconChevronUp />
            </div>
            <div v-else>
                <IconChevronDown />
            </div>
            <p v-html="title"></p>
        </div>

        <div v-html="content">
            
        </div>
    </div>

</template>

<script>
export default {
    name: 'Accordion',
    props: {
        title: String, 
        content: String
    },    
    data() {
        return {
            showPanel: ref(true),
        }
    },
    mounted() {
        if (this.active) {
            this.togglePanel()
        }
    },
    methods : {
        togglePanel() {
           this.showPanel = !this.showPanel
        }
    }
}
</script>