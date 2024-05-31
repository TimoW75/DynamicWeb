<script setup>
    import { ref } from 'vue'
    import { IconChevronDown, IconChevronUp, IconPencil, IconTrash } from '@tabler/icons-vue'
    import draggable from 'vuedraggable'
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
        <p>Paragraphs</p>
    </div>

    <div class="content" v-if="showPanel">
        <div class="paragraphConfig">
            <div class="fullRow">
                <div class="configRow">
                    <p>Paragraph name</p>
                    <p>Visibility</p>
                </div>
            </div>
            <draggable group="paragraphs" v-model="originalParagraphs" tag="div" class="fullRow" item-key="rows" :animation="150">
                <template #item="{ element: paragraph }">  
                    <div class="fullRow">
                        <div class="configRow" >
                            <div class="rowsInColumn">
                                <p v-html="paragraph?.data?.name || 'Default' "></p>
                                <p>true</p>
                            </div>
                        </div>
                        <div class="configRow editTools">
                            <IconPencil stroke="1.5" @click="submitForm(savedData?.elementId, paragraph.paragraphId)" />
                            <IconTrash stroke="1.5" @click="deleteThisParagraph(paragraph.paragraphId)"/>
                        </div>
                    </div>
                </template>
            </draggable>
            <div class="fullRow add" @click="addParagraph">
                <div class="configRow">
                    <div class="blueCta">
                        Add
                    </div>
                </div>
            </div>
        </div>
    </div>

  </div>

</template>

<script>
export default {
    name: 'Accordion',
    components: {
        draggable,
    },
    props: {
        savedData: Object,
    },
    data() {
        return {
            showPanel: ref(true),
            originalParagraphs: [ ],
        }
    },
    computed : {
        getCount () {
            return this.$store.getters.getCount;
        }
    },
    watch: {
        savedData: {
            handler: function (val) {
                this.originalParagraphs = val?.data?.ParagraphColumns || []
            },
            deep: true,
            immediate: true
        }
    },
    methods : {
        togglePanel() {
           this.showPanel = !this.showPanel
        },
        addParagraph() {
            this.originalParagraphs.push({
                type: "paragraph",
                paragraphId: this.getCount,
                data: {}
            })  
            this.$store.commit('increment')
        },  
        submitForm(id, paragraphId) {
            this.$emit('submitForm', id || this.getCount, paragraphId);
        },
        deleteColumnRow(columnRowId) {
            this.$store.commit('deleteColumnRow', { rowId: this.rowId, columnId: this.columnId, columnRowId: columnRowId });
        },
        deleteThisParagraph() {
            this.originalParagraphs.pop()
        }
    },
}
</script>