<script setup>
    import { ref } from 'vue'
    import { IconChevronDown, IconChevronUp, IconTrash } from '@tabler/icons-vue'
    import draggable from 'vuedraggable'

</script>

<template>
    <fieldset class="generalInfo">
        <div>
            <h2>
                <input type="text" name="name" :value="getColumnConfig?.name" placeholder="Column name" required>
            </h2>
            <div class="buttons">
                <button type="button" class="btnHelp">Info</button>
                <button type="submit" class="blueCta">Save</button>
                <button type="button" class="btnWarning" @click="closeModal">Cancel</button>
            </div>

        </div>
        <p>
            s simply dummy text of the printing and typesetting industry. 
            m has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
        </p>

        <div class="devider"></div>

    </fieldset>

    <div class="accordion">
        <div @click="togglePanel" class="toggle">
            <div v-if="showPanel">
                <IconChevronUp />
            </div>
            <div v-else>
                <IconChevronDown />
            </div>
            <p>Row configuration</p>
        </div>

        <div class="content" v-if="showPanel">
            <fieldset class="rowConfiguration">
                <div class="row">
                    <div>
                        <h3>Row configuration</h3>
                        <p>
                            s simply dummy text of the printing and typesetting industry. 
                        </p>
                    </div>
                </div>

                <div class="rowConfig">
                    <div class="fullRow">
                        <div class="configRow">
                            <p>Row name</p>
                            <p>Visibility</p>
                        </div>
                    </div>
                    <draggable group="rows" v-model="rows" tag="div" class="" item-key="rows" :animation="150">
                        <template #item="{ element: row }">  
                            <div class="fullRow">
                                <div class="configRow" >
                                    <div class="rowsInColumn">
                                        <p>{{ row.name }}</p>
                                        <p>{{ row.type }}</p>
                                    </div>
                                </div>
                                <div class="configRow" @click="deleteColumnRow(row.columnRowId)">
                                    <IconTrash stroke="1.5"/>
                                </div>
                            </div>
                        </template>
                    </draggable>
                    <div class="fullRow add" @click="addRow">
                        <div class="configRow">
                            <div class="blueCta">
                                Add
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
    components: {
        draggable,
    },
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
            rows: [ ],
        }
    },
    mounted() {
        if (this.active) {
            this.togglePanel()
        }
    },
    computed: {
        getColumnConfig () {
            return this.$store.getters.getColumnConfig(this.rowId, this.columnId);
        },
        getCount () {
            return this.$store.getters.getCount;
        }
    },
    watch: {
        getColumnConfig: {
            handler() {
                if (this.getColumnConfig != undefined)
                    this.rows = this.getColumnConfig.rows
                else
                    this.rows = []
            },
            immediate: true
        }
    },
    methods : {
        togglePanel() {
           this.showPanel = !this.showPanel
        },
        closeModal() {
            this.$store.commit('toggleModal');
        },
        addRow() {
            this.$store.commit('increment')
            this.rows.push({
                type: "AdvancedGridRow",
                name: "Row",
                columnRowId: this.getCount,
                element: [ ]      
            })
        },
        deleteColumnRow(columnRowId) {
            this.$store.commit('deleteColumnRow', { rowId: this.rowId, columnId: this.columnId, columnRowId: columnRowId });
        }
    }
}
</script>