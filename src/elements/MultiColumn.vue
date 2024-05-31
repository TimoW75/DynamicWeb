<script setup>
  
    import Image from '$/components/Image.vue';
    import Header from '$/components/Header.vue';
    import Subheader from '$/components/Subheader.vue';
    import Content from '$/components/Content.vue';
    import Button from '$/components/Button.vue';
    import ExtraButton from '$/components/ExtraButton.vue';
    import { IconPencil, IconTrash  } from '@tabler/icons-vue';

    import draggable from 'vuedraggable';
</script>

<template>
  <section class="MultiColumn" :class="getElementData.data.CssClass" v-if="getElementData != null">

    <Header :Header="getElementData?.data?.ParagraphHeader"/>

    <draggable v-model="getElementData.data.ParagraphColumns" v-if="getElementData.data.ParagraphColumns.length > 0" tag="div" class="paragraphs" item-key="visual" :animation="150">
      <template #item="{ element: paragraphs }">  
          <div class="paragraph" :style="styling">
            <div class="ImageContainer" v-if="paragraphs?.data?.Image?.[0]?.ImageUrl">
              <Image :Image="paragraphs?.data.Image"/>
            </div>

            <div class="paragraphContainer" v-if="paragraphs?.data?.Header">

              <Header :Header="paragraphs?.data?.Header"/>
              <Subheader :Subheader="paragraphs?.data?.SubHeader"/>
              <Content :Content="paragraphs?.data?.Content"/>

              <div class="buttons">
                <Button :Button="paragraphs?.data?.Button"/>
                <Extra-button :ExtraButton="paragraphs?.data?.ExtraButton"/>
              </div>

            </div>
          </div>
      </template>
    </draggable>
  </section>
  <div class="editTools">
    <IconPencil stroke="1.5" class="edit" @click="showModal({elementId: getElementData.elementId, formType: 'elementFormFields'})" />
    <IconTrash @click="deleteElement(getElementData.elementId)" stroke="1.5" />
  </div>

  
</template>

<script>
export default {
    emits: ['showModal'],
    props: {
      id: Number,
      rowId: Number,
      columnId: Number,
      columnRowId: Number,
    },
    data() {
      return {
        styling: {},
      }
    },
    methods: {
      showModal(data) {
        this.$emit('showModal', data);
        this.$store.commit('setSelectedElement', {element: 'MultiColumn'});
      },
      deleteElement( elementId) {
        this.$store.commit('deleteElement', { 
          id: this.rowId, 
          columnId: this.columnId, 
          columnRowId:this.columnRowId,
          elementId: elementId 
        });
      },
    },
    computed: {
      getElementData () {
        return this.$store.getters.getElementData(this.id);
      },
    },
    watch: {
      getElementData: {
        handler: function (data) {
          data = data?.data;
          if(!data) return;
          this.styling = ({
            flexBasis: `${(100 / data.ParagraphColumns.length) - 1}%`,
            transition: 'all' + ' ' + data.AnimateDuration +'s' + ' ' + 'cubic-bezier(0.075, 0.82, 0.165, 1)',
            height: data.Height === 0 ? 'auto' : `${data.Height}px`,
            mobileHeight: data.MobileHeight === 0 ? 'auto' : `${data.MobileHeight}px`,
            width: data.Fullwidth ? '100%' : 'auto',
            alignItems: data.CenterVertical ? 'center' : 'flex-start',
            textAlign: data.CenterText ? 'center' : 'left',
          });
        },
        deep: true,
        immediate: true,
      }
    }
}
</script>
