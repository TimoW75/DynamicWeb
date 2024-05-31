<script setup>
    import { 
        IconAppWindow,
        IconCarouselHorizontal, 
        IconColumns3, 
        IconComponents, 
        IconMessageQuestion, 
        IconSlideshow, 
        IconSquareToggleHorizontal, 
        IconUserCode,
        IconVideo
    } from '@tabler/icons-vue';

    import Accordion from '$/components/Accordion.vue';
    import AccordionLayoutStyling from '$/components/AccordionLayoutStyling.vue';
    import AccordionRowConfig from '$/components/AccordionRowConfig.vue';
    import AccordionGeneral from '$/components/AccordionGeneral.vue';
    import AccordionParagraphs from '$/components/AccordionParagraphs.vue';

    import axios from 'axios';
</script>

<template>

    <section class="modal">
        <div class="modalContent">
            <form v-if="getModalInfo.formType == 'addElementForm'" class="addElementForm">

                <fieldset class="generalInfo">
                    <div>
                        <h2>
                            Add a column
                        </h2>
                        <div class="buttons">
                            <button type="button" class="btnHelp" >Help</button>
                            <button type="button" class="btnWarning" @click="closeModal">Close</button>
                        </div>

                    </div>
                    <p>
                        s simply dummy text of the printing and typesetting industry. 
                       m has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
                    </p>
                    <div class="devider"></div>

                    <div class="searchBar">
                        <input type="text" placeholder="Zoek hier iets dat je kwijt bent">
                        <button class="blueCta">
                            Zoeken
                        </button>
                    </div>

                </fieldset>

                <fieldset>
                    <div class="devider"></div>
                </fieldset>

                <fieldset class="elementSelector">
                    
                    <div class="templates">
                        <h3>Templates</h3>
                        
                        <Accordion 
                            :title="'CTA Paragraph'" 
                            :content='`
                            s simply dummy text of the printing and typesetting industry.m has been the 
                            industry standard dummy text ever since the 1500s, when an unknown printer`'
                        />
                        

                    </div>
                    <div class="baseElements">
                        <h3>Building Blocks (Developers only)</h3>
                        <div class="baseItem" @click="selectElement('CTAParagraph')">
                            <IconSquareToggleHorizontal stroke="1.5"/>
                            <div>
                                <p class="baseItemHeader">CTA-Paragraph</p>
                                <p>s simply dummy text of the printing and typesetting industry.</p>
                            </div>
                        </div>
                        <div class="baseItem" @click="selectElement('MultiColumn')"> 
                            <IconColumns3 stroke="1.5"/>
                            <div>
                                <p class="baseItemHeader">MultiColumn</p>
                                <p>s simply dummy text of the printing and typesetting industry.</p>
                            </div>
                        </div>
                        <div class="baseItem">
                            <IconSlideshow stroke="1.5"/>
                            <div>
                                <p class="baseItemHeader">Jumbotron</p>
                                <p>s simply dummy text of the printing and typesetting industry.</p>
                            </div>
                        </div>
                        <div class="baseItem">
                            <IconMessageQuestion stroke="1.5"/>
                            <div>
                                <p class="baseItemHeader">FAQ Paragrpah list</p>
                                <p>s simply dummy text of the printing and typesetting industry.</p>
                            </div>
                        </div>
                        <div class="baseItem">
                            <IconCarouselHorizontal stroke="1.5"/>
                            <div>
                                <p class="baseItemHeader">Carousel</p>
                                <p>s simply dummy text of the printing and typesetting industry.</p>
                            </div>
                        </div>
                        <div class="baseItem">
                            <IconUserCode stroke="1.5"/>
                            <div>
                                <p class="baseItemHeader">Developers Block</p>
                                <p>s simply dummy text of the printing and typesetting industry.</p>
                            </div>
                        </div>
                        <div class="baseItem">
                            <IconVideo stroke="1.5"/>
                            <div>
                                <p class="baseItemHeader">Video Paragraph</p>
                                <p>s simply dummy text of the printing and typesetting industry.</p>
                            </div>
                        </div>
                        <div class="baseItem">
                            <IconComponents stroke="1.5"/>
                            <div>
                                <p class="baseItemHeader">Advanced content block</p>
                                <p>s simply dummy text of the printing and typesetting industry.</p>
                            </div>
                        </div>
                        <div class="baseItem">
                            <IconAppWindow stroke="1.5"/>
                            <div>
                                <p class="baseItemHeader">Module only paragraph</p>
                                <p>s simply dummy text of the printing and typesetting industry.</p>
                            </div>
                        </div>
                    </div>

                </fieldset>
                             
            </form>

            <form ref="addColumn" v-if="getModalInfo.formType  == 'addColumn'" @submit.prevent="addColumn" class="addColumn">
                <fieldset>
                    <AccordionRowConfig ref="RowConfig" :rowId="getModalInfo.rowId" :columnId="getModalInfo.columnId"/>
                </fieldset>
                <fieldset>
                    <AccordionLayoutStyling ref="LayoutStyling" :rowId="getModalInfo.rowId" :columnId="getModalInfo.columnId"/>
                </fieldset>
            </form>

            <form ref="elementFormFields" v-if="getModalInfo.formType  == 'elementFormFields'" 
                @submit.prevent="addElementToColumn(getSelectedElement)" class="elementFormFields">      

                <input type="hidden" name="selectedElement" :value="getSelectedElement">

                <fieldset class="generalInfo">
                    <div>
                        <input type="text" :value="getElementData ? getElementData.name : '' " name="name" placeholder="Name">

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

                <fieldset v-if="getSelectedElement == 'MultiColumn'">
                    <AccordionParagraphs @submitForm="submitFormParagraphs" :savedData="getElementData" ref="paragraphColumns" />
                </fieldset>

                <fieldset v-for="(elType, key) in getItemtypes">
                    <AccordionGeneral :savedData="getElementData" :data="elType" :title="key"/>         
                </fieldset>


            </form>

            <form ref="paragraphFormFields" v-if="getModalInfo.formType  == 'paragraphFormFields'" 
                @submit.prevent="addParagraphToMulti(getSelectedElement)" class="paragraphFormFields">
                <input type="hidden" name="selectedElement" :value="getSelectedElement">
                <fieldset class="generalInfo">
                    <div>
                        <h2>
                            <input type="text" name="name" :placeholder='getSelectedElement + " " + "name"'>
                        </h2>
                        <div class="buttons">
                            <button type="button" class="btnHelp">Info</button>
                            <button type="submit" class="blueCta">Save</button>

                            <button type="button" class="btnWarning" @click="closeModal">Cancel</button>
                        </div>

                    </div>
                    <p>
                        simply dummy text of the printing and typesetting industry. 
                        m has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
                    </p>
                    <div class="devider"></div>
                </fieldset>

                <fieldset v-for="(elType, key) in getItemtypes">
                    <AccordionGeneral :savedData="getParagraphData" :data="elType" :title="key"/>         
                </fieldset>


            </form>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Modal',
    data() {
        return {
            activeForm: 'addElementForm',
            multiId: 0,
        }
    },
    computed : {
        getSelectedElement() {
            return this.$store.getters.getSelectedElement;
        },
        getItemtypes() {
            return this.$store.getters.getItemtypes(this.getSelectedElement);
        },
        getModalInfo () {
            return this.$store.getters.getModalInfo;
        },
        getCount () {
            return this.$store.getters.getCount;
        },
        getElementData () {
            return this.$store.getters.getElementData(this.getModalInfo.elementId);
        },
        getParagraphData () {
            return this.$store.getters.getParagraphData(this.getModalInfo.elementId, this.getModalInfo.paragraphId);
        },
    },
    methods: {
        closeModal() {
            this.$store.commit('toggleModal');
        },
        submitFormParagraphs(id, paragraphId) {
            this.multiId = id;
            this.$refs.elementFormFields.dispatchEvent(new Event('submit'));
            let data = {    
                formType: 'paragraphFormFields',
                elementId: id,
                paragraphId: paragraphId,
            };
            this.$store.commit('setModalInfo', { data } );
            this.$store.commit('toggleModal');
            this.$store.commit('setSelectedElement',  {element: 'ParagraphColumns'} );
        },
        selectElement (type) {            
            let data = {
                formType: 'elementFormFields',
            };
            this.$store.commit('setModalInfo', { data } );
            this.activeForm = 'elementFormFields';
            this.$store.commit('setSelectedElement', {element: type});
        },
        async addParagraphToMulti (type) {
            this.$store.commit('addParagraphToMulti', { 
                // name: `${Object.fromEntries(new FormData(event.target)).name}`, 
                elementId: this.multiId,
                data: Object.fromEntries(new FormData(event.target)),
                paragraphId: this.getModalInfo.paragraphId,
            });
            // if(document.querySelector('input[type="file"]') != null){
            //     const form = new FormData();
            //     const files = document.querySelector('input[type="file"]').files
            //     Array.from(files).forEach(file => {
            //         form.append('files', file)
            //     })
            //     await axios.post('/api/images/add', form)
            // }

            let data = {    
                formType: 'elementFormFields',
                elementId: this.multiId,
                paragraphId: -1,
            };
            this.$store.commit('setModalInfo', { data } );
            this.$store.commit('toggleModal');
            this.$store.commit('setSelectedElement',  {element: 'MultiColumn'} );

            this.closeModal();
        },

        addColumn() {
            const layoutStyling = this.$refs.LayoutStyling.$data.layoutStyling;
            const rowConfig = this.$refs.RowConfig.$data.rows;
            if(rowConfig.length == 0) {
                rowConfig.push({
                    type: "AdvancedGridRow",
                    name: "Row",
                    columnRowId: this.getCount,
                    element: [ ]      
                })
            }
            this.$store.commit('addNewColumn', { 
                name: `${Object.fromEntries(new FormData(event.target)).name}`, 
                id: this.getModalInfo.rowId,
                columnId: this.getModalInfo.columnId,
                layoutStyling: layoutStyling,
                rowConfig: rowConfig, 
                data: Object.fromEntries(new FormData(event.target))
            });
            this.closeModal();
        },  

        async addElementToColumn(type) {
            this.$store.commit('addElementToColumn', { 
                name: `${Object.fromEntries(new FormData(event.target)).name}`, 
                element: type, 
                id: this.getModalInfo.rowId, 
                columnId: this.getModalInfo.columnId,
                columnRowId: this.getModalInfo.columnRowId,
                elementId: this.getModalInfo.elementId,
                data: Object.fromEntries(new FormData(event.target)),
                paragraphs: this.$refs.paragraphColumns?.$data?.originalParagraphs || [], 
            });
            // if(document.querySelector('input[type="file"]') != null){
            //     const form = new FormData();
            //     const files = document.querySelector('input[type="file"]').files
            //     Array.from(files).forEach(file => {
            //         form.append('files', file)
            //     })
            //     await axios.post('/api/images/add', form)
            // }
            if(type == 'MultiColumn')
                this.$refs.paragraphColumns.$data.paragraphs = [ ];

            this.$refs.elementFormFields.reset();     
            this.closeModal();
        },

    },
}
</script>