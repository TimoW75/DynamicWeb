<script setup>
    import Image from '$/components/Image.vue';
    import Header from '$/components/Header.vue';
    import Subheader from '$/components/Subheader.vue';
    import Content from '$/components/Content.vue';
    import Button from '$/components/Button.vue';
    import ExtraButton from '$/components/ExtraButton.vue';
    import { IconPencil, IconTrash } from '@tabler/icons-vue';
</script>

<template>

  <section  :class="`${getElementData.data.CssClass} ${getElementData.data.BackgroundConfigurationID} ctaParagraph`" 
    v-if="getElementData != null" :style="styling">

    <div class="ImageContainer" v-if="getElementData.data.Image[0]?.ImageUrl != '' ">
      <Image :Image="getElementData.data.Image"/>
    </div>
    <div class="paragraphContainer">

      <Header :Header="getElementData.data.Header"/>
      <Subheader :Subheader="getElementData.data.SubHeader"/>
      <Content :Content="getElementData.data.Content"/>

      <div class="buttons">
        <Button :Button="getElementData.data.Button"/>
        <Extra-button :ExtraButton="getElementData.data.ExtraButton"/>
      </div>

    </div>
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
        this.$store.commit('setSelectedElement', {element: 'CTAParagraph'});
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
          if
          (!data) return;
          this.styling = ({
            transition: 'all' + ' ' + data.AnimateDuration +'s' + ' ' + 'cubic-bezier(0.075, 0.82, 0.165, 1)',
            height: data.Height === 0 ? 'auto' : `${data.Height}px`,
            width: data.Fullwidth ? '100%' : 'auto',
            flexDirection: data.ImagePosition === 'Left' ? 'row' : data.ImagePosition === 'Right' ? 'row-reverse' : 
              data.ImagePosition === 'Top' ? 'column' : data.ImagePosition === 'Bottom' ? 'column-reverse' : 'row',
            alignItems: data.CenterVertical ? 'center' : 'flex-start',
          });
        },
        deep: true,
        immediate: true,
      }
    }
}
</script>
