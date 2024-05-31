<script setup >
    import draggable from 'vuedraggable'
    import { IconGripVertical, IconGridDots, IconPencil, IconSquareToggleHorizontal, IconTrash } from '@tabler/icons-vue';

</script>

<template>

    <draggable handle=".handle" group="nested" v-model="getRowById" tag="div" class="nestedColumns" item-key="id" :animation="150">
        <template #item="{ element: col }">     
            <div class="AdvancedGridColumn">
                <div class="colInfo">
                    <div class="handler">
                        <IconGripVertical stroke="1.5" class="handle"/> 
                        <p v-html="col.name"></p>
                    </div>
                    <p v-html="col.active"></p>
                </div>
                <div v-for="rows in col.rows" class="AdvancedGridColumnRow">
                    <div class="AdvancedGridElement">
                        <div class="rowInfo" v-for="element in rows.element">
                            <div>
                                <p v-if="element.type == 'CTAParagraph'">
                                    <IconSquareToggleHorizontal stroke="1.5" />
                                </p>
                                <p v-if="element.type == 'MultiColumn'">
                                    <IconGridDots stroke="1.5" />
                                </p>                 
                                <p v-html="element.name"></p>
                            </div>
                            <div class="editTools">
                                <IconPencil stroke="1.5" class="edit" @click="showModal({elementId: element.elementId, formType: 'elementFormFields'})" />
                                <IconTrash @click="deleteElement(id, col.columnId, rows.columnRowId,  element.elementId)" stroke="1.5" />
                            </div>
                        </div>
                    </div>                       
                </div>
            </div>
        </template>
    </draggable>
    
</template>


<script>
export default {
    components: {
        draggable
    },
    props: {
        id: Number
    },
    computed: {
        getRowById: {
            get(){
                return this.$store.getters.getRowById(this.id);
            },
            set(value) {
                this.$store.commit('updateColumns', { id: this.id, data: value })
            }
        },
    },
    methods: {
        deleteElement(id, columnId, columnRowId, elementId) {
            this.$store.commit('deleteElement', { id, columnId, columnRowId, elementId });
        },
        showModal(data) {
            this.$store.commit('setSelectedElement', {element: 'CTAParagraph'});
            this.$store.commit('toggleModal');
            this.$store.commit('setModalInfo', { data } );
        },
    }
}
</script>