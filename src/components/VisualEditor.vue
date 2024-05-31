<script setup>
    import CTAParagraph from '$/elements/CTAParagraph.vue';
    import MultiColumn from '$/elements/MultiColumn.vue';
    import Modal from '$/elements/Modal.vue';

    import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-vue';

    import draggable from 'vuedraggable';
    import NestedDraggable from '$/elements/NestedColDraggable.vue';
</script>

<template>

    <section v-if="getPageElements.length != 0">
        <draggable v-model="getPageElements" tag="div" class="dragAndDrop" item-key="id" :animation="150">
            <template #item="{ element: AdvancedGridRows }">
                <div :class="`AdvancedGrid focus Grid-${AdvancedGridRows.rowId}`">
                    <div class="meta">
                        <input type="text" :value="AdvancedGridRows.name" 
                            @change.lazy="(event) => editRowName(event.target.value, AdvancedGridRows.rowId)">
                        <div class="editTools">
                            <IconPencil stroke="1.5" @click="focusEvent(`Grid-${AdvancedGridRows.rowId}`)" />
                            <IconTrash stroke="1.5" @click="deleteRow(AdvancedGridRows.rowId)"/>
                            <!-- <button stroke="1.5" @click="deleteRow(AdvancedGridRows.rowId)">
                                Delete
                            </button> -->
                        </div>
                    </div>

                    <div class="AdvancedGridContainer"> 

                        <div class="plusIcon start" >
                            <IconPlus stroke="2" @click="showModal({rowId: AdvancedGridRows.rowId, formType: 'addColumn'})"/>
                        </div>

                        <NestedDraggable :id="AdvancedGridRows.rowId" />

                        <div class="plusIcon end" >
                            <IconPlus stroke="2" @click="showModal({rowId: AdvancedGridRows.rowId, columnId: -1, formType: 'addColumn'})"/>
                        </div>           
                    </div>
                            
                    <div class="addElement" @click="addNewRow(getPageData.pageId, AdvancedGridRows.sorting + 0.1)">
                        <IconPlus stroke="2" />
                    </div>
                </div>
            </template>
        </draggable>

    </section>
    <section v-else>
        <div class="addElement" @click="addNewRow(getPageData.pageId, 1)">
            <IconPlus stroke="2"/>
        </div>
    </section>

    <Modal v-show="modalState" v-bind:class="`${modalState}`" />


</template>

<script>
export default {
    components: {
        Modal,
        CTAParagraph,
        MultiColumn,
        draggable
    },
    data() {    
        return {
            pageId: 0,
        }
    },
    created() {
        this.pageId = this.getPageData.pageId;  
    },
    computed: {
        getPageData () {
            return this.$store.getters.getPageData(this.$route.path);
        },
        getPageElements: {
            get(){
                return this.$store.getters.getPageElements(this.pageId);
            },
            set(value) {
                value.forEach((element, index) => {
                    element.sorting = index;
                });
                this.$store.commit('updateRows', { value })
            }
        },
        getModalInfo () {
            return this.$store.getters.getModalInfo;
        },
        modalState() {
            return this.$store.getters.modalState;
        }
    },
    watch: {
        modalState( value ) {
            if(value)
                document.querySelector('.modal').style.top = `${document.querySelector('.editor').scrollTop}px`;
        }
    },
    methods: {
        addNewRow(id, sorting,) {
            this.$store.commit('addNewRow', {id, sorting});
        },
        editRowName(data, id) {
            this.$store.commit('editRow', { id: id, name: data });
        },
        deleteRow(id) {
            this.$store.commit('deleteRow', { id });
        },
        showModal(data) {
            this.$store.commit('toggleModal');
            this.$store.commit('setModalInfo', { data } );
        },
        focusEvent(target) {
            document.querySelector(`.${target}`).classList.toggle('focus');
        }
    }
}
</script>