<script setup>
    import { ref } from 'vue'
    import { IconChevronDown, IconChevronUp } from '@tabler/icons-vue'
    
    import textField from '$/formfields/Text.vue';
    import radioField from '$/formfields/Radio.vue';
    import checkboxField from '$/formfields/Checkbox.vue';
    import selectField from '$/formfields/Select.vue';
    import numberField from '$/formfields/Text.vue';

    import HeaderField from '$/formfields/Header.vue'
    import SubHeaderField from '$/formfields/SubHeader.vue'
    import ContentField from '$/formfields/Content.vue'
    import ButtonField from '$/formfields/Button.vue'
    import ExtraButtonField from '$/formfields/ExtraButton.vue'
    import ImageField from '$/formfields/Image.vue'
    import PositionField from '$/formfields/Position.vue'
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

        <div class="content" v-if="showPanel">
            <fieldset class="elementFormItems">
                <div v-for="item in data" :class="`${item.SystemName} formItem`">

                    <component :is="`${item.type}Field`" :data="item" :savedData="savedData ? savedData.data[item.SystemName] || {} : {}"/>

                </div>
            </fieldset>  
        </div>
    </div>

</template>

<script>
export default {
    name: 'Accordion',
    props: {
        data: Object, 
        title: String, 
        savedData: Object,
    },    
    components: {
        textField,
        radioField,
        checkboxField,
        selectField,
        numberField,
        HeaderField,
        SubHeaderField,
        ContentField,
        ButtonField,
        ExtraButtonField,
        ImageField,
        PositionField,
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