<script setup>
    import { IconGripVertical } from '@tabler/icons-vue';

    import draggable from 'vuedraggable';
    import NestedDraggable from '$/elements/NestedSidebarDraggable.vue';
</script>

<template>

    <section class="inPageSideBarContainer">
        <div class="searchBar">
            <input type="text" placeholder="Zoek hier iets dat je kwijt bent">
            <button class="blueCta">
                Zoeken
            </button>
        </div>

        <div class="devider"></div>

        <div class="pageEditor">
            <div>
                <h2>Page editor</h2>
                <p>
                    s simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer 
                </p>
            </div>
        </div>

        <div class="devider"></div>

        <div class="pageInfo">
            <h3>Page information</h3>
            <p>
                s simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer 
            </p>
            <div>
                <p class="caption">
                    Page name  
                </p>
                <input v-model="pageName" type="text">
            </div>
            <div>
                <select v-model="pageType">
                    <option value="Default">Default</option>
                    <option value="Ecom">Ecom</option>
                    <option value="Checkout">Checkout</option>
                    <option value="Custom">Custom</option>

                </select>

            </div>

        </div>

        <div class="devider"></div>

        <div class="pageRows">
            <div>
                <h3>Paragraph list</h3>
                <p>
                    s simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer 
                </p>
            </div>
            <div>
                <p class="caption">
                    Paragraphs 
                </p>
                <div class="paragraphs">
                    <draggable handle=".handle" v-model="getPageElements" tag="ul" class="AdvancedGrid dragAndDrop" item-key="id">
                        <template #item="{ element: AdvancedGridRows }">
                            <div class="AdvancedGridLayout">
                                <div class="handler">
                                    <IconGripVertical stroke="1.5" class="handle"/> 
                                    <p v-html="AdvancedGridRows.name" class="gridName"></p>
                                </div>
                                <NestedDraggable :id="AdvancedGridRows.rowId" />
                                <div class="paragraphsDevider"></div>
                            </div>
                        </template>
                    </draggable>
                </div>
            </div>

        </div>

    </section>



</template>

<script>
export default {
    data() {
        return {
            pageName: '',
            pageId: 0,
            pageType: 'Default',
        }
    },
    watch: {
        pageName: function() {
            this.$store.commit('pageName', { id: this.pageId, name: this.pageName} );
        },
        pageType: function() {
            this.$store.commit('pageType', { id: this.pageId, type: this.pageType} );
        }
    },
    created() {
        this.pageName = this.getPageData.title; 
        this.pageType = this.getPageData.pagetype; 
        this.pageId = this.getPageData.pageId;  
    },
    computed: {
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
        getPageData: {
            get(){
                return this.$store.getters.getPageData(this.$route.path);
            },
        },
    },

}
</script>