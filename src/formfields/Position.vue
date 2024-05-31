<script setup>
    import { 
        IconBoxAlignRight, 
        IconBoxAlignLeft,
        IconBoxAlignTop,
        IconBoxAlignBottom 
    } from '@tabler/icons-vue';
</script>

<template>
    <p class="caption" v-html="data.Name"></p>
    <input type="hidden" :name="data.SystemName" :value="selectedOption">
    <div>
        <div v-for="option in data.options" class="radioOptions">
            <label>
                <input
                    type="radio"
                    :name="data.SystemName"
                    v-model="selectedOption"
                    :value="option.SystemName"
                    class="radio-input"
                    :checked="option.SystemName === savedData ? true : false"
                >
                <span class="radio-tile">
                    <span class="radio-icon">
                        <component :is="option.Icon" stroke="1.5"/>
                    </span>
                    <span>{{ option.SystemName }}</span>
                </span>
            </label>
        </div>
    </div>


</template>

<script>
export default {
    props: {
        data: Object,
        savedData: undefined,
    },
    data() {
        return {
            selectedOption: '',
        }
    },
    components: {
        IconBoxAlignRight,
        IconBoxAlignLeft,
        IconBoxAlignTop,
        IconBoxAlignBottom 
    },
}
</script>
