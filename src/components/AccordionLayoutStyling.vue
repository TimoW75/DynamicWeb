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
            <p> Layout and Styling</p>
        </div>

        <div class="content" v-if="showPanel">
            <fieldset class="layoutAndStyling"> 
                <div class="row">
                    <div>
                        <h3>Templates</h3>
                        <p>
                            s simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
                        </p>
                    </div>
                </div>
                <div class="col backgroundPadding">
                    <div class="row">
                        <div>
                            <p class="caption">Background</p>
                            <p>s simply dummy text of the printing and typesetting industry. Lo</p>
                            <div class="col">
                                <select name="bgConfig" v-model="layoutStyling.backgroundConfig">
                                    <option value="None">None</option>
                                    <option value="Default">Default</option>
                                    <option value="Test">Test</option>

                                </select>
                                <button type="button" class="blueCta" >Go to backgrounds</button>
                            </div>
                        </div>
                        <div>
                            <p class="caption">Column width</p>
                            <div class="col">
                                <input type="text" v-model="layoutStyling.columnWidth" name="" placeholder="Column width">

                                <select v-model="layoutStyling.widthMinMax" class="widthMinMax">
                                    <option value="max-width">max-width</option>
                                    <option value="min-width">min-width</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="paddingFlexOptions">
                        <div class="paddingOptions">
                            <div class="col">
                                <p class="caption">Padding</p>
                                <label class="switch">
                                    <input type="checkbox" v-model="layoutStyling.paddingActive" >
                                    <span class="slider"></span>
                                </label>
                            </div>
                            <p>Keeps your content comfy inside its container.</p>
                            <div class="paddingRow">
                                <div class="paddingCol">
                                    <p>Top:</p><input type="text" v-model="layoutStyling.padding.top" name="" placeholder="Padding Top">
                                </div>
                                <div class="paddingCol">
                                    <p>Right:</p><input type="text" v-model="layoutStyling.padding.right" name="" placeholder="Padding Right">

                                </div>
                                <div class="paddingCol">
                                    <p>Bottom:</p><input type="text" v-model="layoutStyling.padding.bottom" name="" placeholder="Padding Bottom">
                                </div>
                                <div class="paddingCol">
                                    <p>Left:</p>
                                    <input type="text" v-model="layoutStyling.padding.left"name="" placeholder="Padding Left">
                                </div>
                            </div>
                        </div>
                        
                        <div class="flexOptions">
                            <div class="flexOption">
                                <label class="switch">
                                    <input type="checkbox" v-model="layoutStyling.flexGrow">
                                    <span class="slider"></span>
                                </label>
                                <p>Flex grow</p>
                            </div>
                            <div class="flexOption">
                                <label class="switch">
                                    <input type="checkbox" v-model="layoutStyling.flexShrink">
                                    <span class="slider"></span>
                                </label>
                                <p>Flex shrink</p>
                            </div>
                            <div class="flexOption">
                                <label class="switch" >
                                    <input type="checkbox" v-model="layoutStyling.flexBasis">
                                    <span class="slider"></span>
                                </label>
                                <p>Flex basis</p>
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Accordion',
    props: {
        title: String,
        content: String,
        active: Boolean,
        rowId: Number,
        columnId: Number,
    },
    data() {
        return {
            showPanel: ref(true),
            layoutStyling: {
                flexShrink: false,
                flexGrow: true,
                flexBasis: true,
                columnWidth: '',
                widthMinMax: 'max-width',
                backgroundConfig: 'None',
                paddingActive: false,
                padding: {
                    top: '',
                    right: '',
                    bottom: '',
                    left: ''
                }
            },
        }
    },
    computed: {
        getColumnConfig() {
            return this.$store.getters.getColumnConfig(this.rowId, this.columnId);
        }
    },
    watch: {
        getColumnConfig: {
            handler() {
                const styling = this.getColumnConfig?.styling || {};
                this.layoutStyling.widthMinMax = styling['min-width'] ? 'min-width' : (styling['max-width'] ? 'max-width' : '');
                this.layoutStyling.columnWidth = styling['min-width'] || styling['max-width'] || '';
                this.layoutStyling.flexShrink = styling.flexShrink ?? false;
                this.layoutStyling.flexGrow = styling.flexGrow ?? true;
                this.layoutStyling.flexBasis = styling.flexBasis ?? true;
                this.layoutStyling.paddingActive = !!styling.padding;
                const paddingValues = (styling.padding || '').split('px ');
                this.layoutStyling.padding = {
                    top: paddingValues[0] || '',
                    right: paddingValues[1] || '',
                    bottom: paddingValues[2] || '',
                    left: paddingValues[3] || ''
                 };
                this.layoutStyling.backgroundConfig = styling.backgroundConfig || 'None';
            },
            deep: true,
            immediate: true,  
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
        },
    }
}
</script>