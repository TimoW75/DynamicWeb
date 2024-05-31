<script setup >
    import draggable from 'vuedraggable'
    import { IconPlus, IconPencil, IconTrash } from '@tabler/icons-vue';

    import CTAParagraph from '$/elements/CTAParagraph.vue';
    import MultiColumn from '$/elements/MultiColumn.vue';
</script>

<template>

    <draggable group="visual" v-model="getRowById" tag="div" class="nestedVisualColumns" item-key="visual" :animation="150">
        <template #item="{ element: col }">  
            <div class="AdvancedGridColumnContainer" >
                <div class="colInfo">         
                    <p v-html="col.name"></p>
                    <div class="editTools">
                        <IconPencil stroke="1.5" 
                            @click="showModal({
                                rowId: id, 
                                columnId: col.columnId, 
                                formType: 'addColumn'
                            })"
                        />
                        <IconTrash stroke="1.5" @click="deleteColumn(id, col.columnId )" />
                    </div>
                </div>
                <div class="AdvancedGridColumn" :style="col.styling" :class="col.styling?.backgroundConfig || ''">
                    <div v-for="elements in col.rows" class="AdvancedGridRow"> 
                        <div v-if="elements.element.length == 0" class="emptyRow" 
                            @click="showModal({
                                rowId: id, 
                                columnId: col.columnId, 
                                columnRowId: elements.columnRowId, 
                                elementId: 0,
                                formType: 'addElementForm'
                            })">
                            <IconPlus stroke="2"/>
                        </div>
                        
                        <div v-for="element in elements.element">

                            <component :is="`${element.type}`" :rowId="id" :columnId="col.columnId" 
                            :columnRowId="elements.columnRowId" @showModal="showModal" :id="element.elementId" />

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
        draggable,
        CTAParagraph,
        MultiColumn,
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
        showModal(data) {
            this.$store.commit('toggleModal');
            this.$store.commit('setModalInfo', { data } );
        },
        deleteColumn(id, columnId) {
            this.$store.commit('deleteColumn', { id: id, columnId: columnId });
        }
    }
}
</script>